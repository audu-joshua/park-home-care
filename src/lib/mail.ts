import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SENDER_EMAIL = process.env.SENDER_EMAIL || "no-reply@packhomehealthcareagency.com";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    // leave transporter null so caller can fallback to console logging
    return null as any;
  }
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  } as any);
  return transporter;
}

export async function sendMail(opts: { to: string | string[]; subject: string; html: string; text?: string }) {
  const t = getTransporter();
  if (!t) {
    // dev fallback: log the message and return a fake info object
    console.log("Mail fallback: to=", opts.to, "subject=", opts.subject);
    console.log(opts.html);
    return { accepted: Array.isArray(opts.to) ? opts.to : [opts.to], messageId: "dev-fallback" };
  }
  const info = await t.sendMail({ from: SENDER_EMAIL, to: opts.to, subject: opts.subject, html: opts.html, text: opts.text });
  return info;
}

export default sendMail;
