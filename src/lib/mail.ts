// SMTP via Microsoft 365 is disabled for this tenant (535 5.7.139).
// Kept commented until Authenticated SMTP is turned on.
// import nodemailer from "nodemailer";

export const AGENCY_EMAIL = "info@packhomehealthcareagency.com";

const SENDER_EMAIL = process.env.SENDER_EMAIL || AGENCY_EMAIL;

export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://www.packhomehealthcareagency.com"
  ).replace(/\/$/, "");
}

export function agencyInbox() {
  return process.env.CONTACT_EMAIL || process.env.NOTIFY_EMAIL || AGENCY_EMAIL;
}

function extractEmail(value: string) {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] || value).trim().toLowerCase();
}

/** Mail to info@ must not also come from info@ — Outlook often hides those. */
export function agencyMailFrom() {
  if (process.env.RESEND_NOTIFY_FROM) return process.env.RESEND_NOTIFY_FROM;
  const from = process.env.RESEND_FROM || "";
  const domain = extractEmail(from).split("@")[1] || "packhomehealthcareagency.com";
  return `Pack Home Health Care <noreply@${domain}>`;
}

// const SMTP_HOST = process.env.SMTP_HOST;
// const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
// const SMTP_USER = process.env.SMTP_USER;
// const SMTP_PASS = process.env.SMTP_PASS;
// let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;
//
// function getTransporter() {
//   if (transporter) return transporter;
//   if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
//     return null as ReturnType<typeof nodemailer.createTransport> | null;
//   }
//   transporter = nodemailer.createTransport({
//     host: SMTP_HOST,
//     port: SMTP_PORT,
//     secure: SMTP_PORT === 465,
//     requireTLS: SMTP_PORT === 587,
//     auth: { user: SMTP_USER, pass: SMTP_PASS },
//   });
//   return transporter;
// }

function toPlainText(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

/** True HTML email. FormSubmit cannot render buttons — it prints tags as text. */
export async function sendViaResend(opts: {
  to: string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  bcc?: string[];
  from?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  let from =
    opts.from ||
    process.env.RESEND_FROM ||
    "Pack Home Health Care <onboarding@resend.dev>";
  const fromEmail = extractEmail(from);
  if (!opts.from && opts.to.some((addr) => extractEmail(addr) === fromEmail)) {
    from = agencyMailFrom();
  }

  const payload: Record<string, unknown> = {
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  };
  if (opts.text) payload.text = opts.text;
  if (opts.replyTo) payload.reply_to = opts.replyTo;
  if (opts.bcc?.length) payload.bcc = opts.bcc;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { message?: string };
  if (!res.ok) {
    throw new Error(data.message || `Resend failed (${res.status})`);
  }
  return true;
}

/**
 * Deliver TO the agency inbox without Microsoft SMTP AUTH.
 * FormSubmit requires Origin/Referer as if the request came from the website.
 */
async function deliverToInbox(opts: {
  to: string[];
  subject: string;
  html: string;
  text?: string;
  fields?: Record<string, string>;
}) {
  const inbox = agencyInbox();
  const origin = siteUrl();
  const payload: Record<string, string> = {
    _subject: opts.subject,
    _template: "box",
    _captcha: "false",
    _replyto: SENDER_EMAIL,
    ...(opts.fields || {
      Message: opts.text || toPlainText(opts.html),
    }),
  };

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: `${origin}/`,
      "User-Agent": "Mozilla/5.0 (compatible; PackHomeHealthCare/1.0)",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean | string;
    message?: string;
  };
  if (!res.ok || data.success === "false" || data.success === false) {
    throw new Error(data.message || `Inbox relay failed (${res.status})`);
  }

  console.log("Form delivered to", inbox, data.message || "ok");
  return {
    accepted: [inbox],
    messageId: "inbox-relay",
    response: data.message || "delivered via inbox relay",
  };
}

export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  bcc?: string | string[];
  fields?: Record<string, string>;
  replyTo?: string;
}) {
  const to = (Array.isArray(opts.to) ? opts.to : [opts.to]).filter(Boolean);
  const bcc = opts.bcc
    ? (Array.isArray(opts.bcc) ? opts.bcc : [opts.bcc]).filter(Boolean)
    : undefined;

  try {
    const sent = await sendViaResend({
      to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo,
      bcc,
    });
    if (sent) {
      return { accepted: to, messageId: "resend", response: "delivered via Resend" };
    }
  } catch (err) {
    console.error("Resend send failed, delivering to agency inbox instead:", err);
  }

  // SMTP is commented out until Microsoft 365 Authenticated SMTP is enabled.
  // const t = getTransporter();
  // if (t) {
  //   try {
  //     return await t.sendMail({
  //       from: `"Pack Home Health Care" <${SENDER_EMAIL}>`,
  //       to,
  //       bcc: opts.bcc,
  //       subject: opts.subject,
  //       html: opts.html,
  //       text: opts.text,
  //     });
  //   } catch (err) {
  //     console.error("SMTP send failed, delivering to agency inbox instead:", err);
  //   }
  // }

  return deliverToInbox({
    to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    fields: opts.fields,
  });
}

export default sendMail;
