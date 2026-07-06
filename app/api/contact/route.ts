import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "missing_fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`,
            replyTo: email,
            to: "info@yourluxurysuite.com",
            subject: `[Φόρμα Επικοινωνίας]: ${subject}`,
            html: `<p><strong>Από:</strong> ${name} (${email})</p><p>${message}</p>`,
        });

        await transporter.sendMail({
            from: `"Aegean Luxury Suites" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Λάβαμε το μήνυμά σας",
            html: `<p>Αξιότιμε/η ${name}, ευχαριστούμε για την επικοινωνία. Θα σας απαντήσουμε σύντομα.</p>`,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Nodemailer Error:", error);
        return NextResponse.json({ error: "email_failed" }, { status: 500 });
    }
}