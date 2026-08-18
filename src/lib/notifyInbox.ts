export const AGENCY_EMAIL = "info@packhomehealthcareagency.com";
export const VIEW_APPLICATION_URL = "https://www.packhomehealthcareagency.com/admin/login";

/**
 * Prefer a real HTML email (button) via /api/notify-inbox.
 * FormSubmit can only print field text, so HTML must never be sent there.
 */
export async function notifyAgencyInbox(
  subject: string,
  fields: Record<string, string>
) {
  const res = await fetch("/api/notify-inbox", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, fields }),
  });
  if (res.ok) return;

  const safeFields: Record<string, string> = { ...fields };
  delete safeFields["View Application"];

  const fallback = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(AGENCY_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "box",
        _captcha: "false",
        ...safeFields,
      }),
    }
  );
  const data = (await fallback.json().catch(() => ({}))) as {
    success?: boolean | string;
    message?: string;
  };
  if (!fallback.ok || data.success === false || data.success === "false") {
    throw new Error(data.message || `Inbox notify failed (${fallback.status})`);
  }
  return data;
}
