export const AGENCY_EMAIL = "info@packhomehealthcareagency.com";
export const VIEW_APPLICATION_URL = "https://www.packhomehealthcareagency.com/admin/login";

/** Agency inbox notices go through Resend HTML mail only. */
export async function notifyAgencyInbox(
  subject: string,
  fields: Record<string, string>
) {
  const res = await fetch("/api/notify-inbox", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, fields }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || `Inbox notify failed (${res.status})`);
  }
}
