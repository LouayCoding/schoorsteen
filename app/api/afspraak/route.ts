import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appointmentSchema } from "@/lib/appointment-schema";
import { COMPANY_NAME, EMAIL } from "@/lib/constants";

export const runtime = "nodejs";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Ongeldig verzoek." }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Controleer de ingevulde gegevens." }, { status: 422 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { naam, email, telefoon, postcode, huisnummer, opmerking, stad } = parsed.data;
  const port = Number(process.env.SMTP_PORT) || 25;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM || EMAIL;
  const to = process.env.MAIL_TO || EMAIL;

  const rows: Array<[string, string]> = [
    ["Naam", naam],
    ["E-mail", email],
    ["Telefoon", telefoon],
    ["Postcode", postcode],
    ["Huisnummer", huisnummer],
  ];
  if (stad) rows.push(["Plaats", stad]);
  if (opmerking) rows.push(["Opmerking", opmerking]);

  const text = [`Nieuwe afspraak aanvraag via ${COMPANY_NAME}`, "", ...rows.map(([label, value]) => `${label}: ${value}`)].join("\n");
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e8622a;">Nieuwe afspraak aanvraag</h2>
      <p>Er is een nieuwe aanvraag binnengekomen via de website.</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        ${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join("")}
      </div>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "autodokter-mail",
      port,
      secure: port === 465,
      auth: user && pass ? { user, pass } : undefined,
      tls: { rejectUnauthorized: false },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Nieuwe afspraak aanvraag - ${naam}`,
      text,
      html,
    });
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error("afspraak mail mislukt", { message: err.message, code: err.code });
    return NextResponse.json(
      { ok: false, message: "Versturen is niet gelukt. Bel ons gerust." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
