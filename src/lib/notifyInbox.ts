export const AGENCY_EMAIL = "info@packhomehealthcareagency.com";
export const VIEW_APPLICATION_URL = "https://www.packhomehealthcareagency.com/admin/login";

/**
 * Send labeled fields to the agency inbox from the browser.
 * FormSubmit needs a real page Origin (the live site), not a spoofed Vercel header.
 */
export async function notifyAgencyInbox(
  subject: string,
  fields: Record<string, string>
) {
  const res = await fetch(
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
        ...fields,
      }),
    }
  );
  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean | string;
    message?: string;
  };
  if (!res.ok || data.success === false || data.success === "false") {
    throw new Error(data.message || `Inbox notify failed (${res.status})`);
  }
  return data;
}
