export const AGENCY_EMAIL = "info@packhomehealthcareagency.com";
export const VIEW_APPLICATION_URL = "https://www.packhomehealthcareagency.com/admin/login";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function viewApplicationButton(url: string) {
  const href = escapeHtml(url);
  // Outlook-safe table button. FormSubmit inserts field values into an HTML
  // template, so this renders as a clickable button instead of a raw URL.
  return `
<table border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin: 8px 0;">
  <tr>
    <td align="center" bgcolor="#EE7862" style="background-color:#EE7862; border-radius:50px;">
      <a href="${href}" target="_blank"
        style="display:inline-block; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#ffffff; text-decoration:none; padding:12px 28px; border-radius:50px;">
        View Application
      </a>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Send the agency inbox notice from the browser so FormSubmit sees the live site Origin.
 */
export async function notifyAgencyInbox(
  subject: string,
  fields: Record<string, string>
) {
  const payload: Record<string, string> = {
    _subject: subject,
    _template: "box",
    _captcha: "false",
  };

  for (const [key, value] of Object.entries(fields)) {
    if (key === "View Application") {
      payload[key] = viewApplicationButton(value);
    } else {
      payload[key] = value;
    }
  }

  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(AGENCY_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
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
