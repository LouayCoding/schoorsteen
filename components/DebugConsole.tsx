"use client";

import { useState, useEffect, useCallback } from "react";

interface LogEntry {
  type: "error" | "warn" | "log" | "network";
  message: string;
  timestamp: string;
}

export default function DebugConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const addLog = useCallback((entry: LogEntry) => {
    setLogs((prev) => [entry, ...prev].slice(0, 100));
    if (entry.type === "error" || entry.type === "network") {
      setErrorCount((c) => c + 1);
    }
  }, []);

  useEffect(() => {
    const now = () => new Date().toLocaleTimeString("nl-NL", { hour12: false });

    // Override console.error
    const origError = console.error;
    console.error = (...args: unknown[]) => {
      origError.apply(console, args);
      addLog({ type: "error", message: args.map(String).join(" "), timestamp: now() });
    };

    // Override console.warn
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      origWarn.apply(console, args);
      addLog({ type: "warn", message: args.map(String).join(" "), timestamp: now() });
    };

    // Catch unhandled errors
    const onError = (e: ErrorEvent) => {
      addLog({ type: "error", message: `${e.message} (${e.filename}:${e.lineno})`, timestamp: now() });
    };
    window.addEventListener("error", onError);

    // Catch unhandled promise rejections
    const onRejection = (e: PromiseRejectionEvent) => {
      addLog({ type: "error", message: `Unhandled rejection: ${e.reason}`, timestamp: now() });
    };
    window.addEventListener("unhandledrejection", onRejection);

    // Intercept fetch for network errors
    const origFetch = window.fetch;
    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const url = typeof args[0] === "string" ? args[0] : args[0] instanceof URL ? args[0].toString() : (args[0] as Request).url;
      try {
        const res = await origFetch(...args);
        if (!res.ok) {
          addLog({ type: "network", message: `${res.status} ${res.statusText} — ${url}`, timestamp: now() });
        }
        return res;
      } catch (err) {
        addLog({ type: "network", message: `FETCH FAILED — ${url}: ${err}`, timestamp: now() });
        throw err;
      }
    };

    return () => {
      console.error = origError;
      console.warn = origWarn;
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      window.fetch = origFetch;
    };
  }, [addLog]);

  const typeColor: Record<string, string> = {
    error: "text-red-400",
    warn: "text-yellow-400",
    log: "text-gray-300",
    network: "text-orange-400",
  };

  const typeLabel: Record<string, string> = {
    error: "ERR",
    warn: "WARN",
    log: "LOG",
    network: "NET",
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(!open); setErrorCount(0); }}
        className="fixed right-4 z-[9999] w-12 h-12 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow-lg hover:bg-red-500 transition-colors"
        style={{ bottom: "max(5rem, calc(4rem + env(safe-area-inset-bottom)))" }}
      >
        {errorCount > 0 ? `🐛${errorCount}` : "🐛"}
      </button>

      {/* Console panel */}
      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/90 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-white font-mono text-sm font-bold">Debug Console ({logs.length})</span>
            <div className="flex gap-2">
              <button
                onClick={() => setLogs([])}
                className="text-xs text-gray-400 hover:text-white px-2 py-1 border border-white/20 rounded"
              >
                Clear
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-gray-400 hover:text-white px-2 py-1 border border-white/20 rounded"
              >
                Close
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-1">
            {logs.length === 0 && (
              <p className="text-gray-500 text-center mt-8">No logs yet</p>
            )}
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2 py-1 border-b border-white/5">
                <span className="text-gray-500 shrink-0">{log.timestamp}</span>
                <span className={`shrink-0 font-bold ${typeColor[log.type]}`}>[{typeLabel[log.type]}]</span>
                <span className="text-gray-200 break-all">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
