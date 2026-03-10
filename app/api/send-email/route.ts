import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { naam, email, telefoon, postcode, huisnummer, opmerking } = await req.json();

    const port = Number(process.env.SMTP_PORT) || 587;
    const isSecure = port === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: isSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `Nieuwe afspraak aanvraag - ${naam}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e8622a;">Nieuwe afspraak aanvraag</h2>
          <p>Er is een nieuwe afspraak aanvraag binnengekomen via de website.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Klantgegevens:</h3>
            <p><strong>Naam:</strong> ${naam}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefoon:</strong> ${telefoon}</p>
            <p><strong>Postcode:</strong> ${postcode}</p>
            <p><strong>Huisnummer:</strong> ${huisnummer}</p>
            ${opmerking ? `<p><strong>Opmerking:</strong> ${opmerking}</p>` : ""}
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Neem binnen 24 uur contact op met de klant.
          </p>
        </div>
      `,
      text: `
Nieuwe afspraak aanvraag

Klantgegevens:
Naam: ${naam}
Email: ${email}
Telefoon: ${telefoon}
Postcode: ${postcode}
Huisnummer: ${huisnummer}
${opmerking ? `Opmerking: ${opmerking}` : ""}

Neem binnen 24 uur contact op met de klant.
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email verzonden" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error & { code?: string; responseCode?: number };
    console.error("Email error:", {
      message: err.message,
      code: err.code,
      responseCode: err.responseCode,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? "set" : "MISSING",
      pass: process.env.SMTP_PASS ? "set" : "MISSING",
    });
    return NextResponse.json(
      { message: "Er is iets misgegaan bij het versturen van de email", error: err.message },
      { status: 500 }
    );
  }
}
