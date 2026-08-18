function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildInboxHtml(subject: string, fields: Record<string, string>) {
  const buttonUrl = fields["View Application"];
  const rows = Object.entries(fields)
    .filter(([key]) => key !== "View Application")
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:8px 0;color:#64748b;font-weight:600;width:140px;vertical-align:top;">${escapeHtml(key)}</td>
          <td style="padding:8px 0;color:#0f172a;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td>
        </tr>`
    )
    .join("");

  const button = buttonUrl
    ? `
      <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin:28px auto 8px;">
        <tr>
          <td align="center" bgcolor="#EE7862" style="background-color:#EE7862;border-radius:50px;">
            <a href="${escapeHtml(buttonUrl)}" target="_blank"
              style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:50px;">
              View Application
            </a>
          </td>
        </tr>
      </table>`
    : "";

  return `
    <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background-color:#081630;padding:24px;text-align:center;color:#ffffff;">
        <h2 style="margin:0;font-size:20px;font-weight:700;">Pack Home Health Care</h2>
        <p style="margin:4px 0 0 0;font-size:12px;color:#00F0ED;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(subject)}</p>
      </div>
      <div style="padding:28px;color:#1e293b;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
        ${button}
      </div>
      <div style="background-color:#f1f5f9;padding:16px;text-align:center;font-size:11px;color:#64748b;">
        www.packhomehealthcareagency.com
      </div>
    </div>
  `;
}

export function buildApplicationConfirmHtml(opts: { name: string; position: string }) {
  const name = escapeHtml(opts.name || "there");
  const position = escapeHtml(opts.position || "the role");
  const site = "https://www.packhomehealthcareagency.com";

  return `
    <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background-color:#081630;padding:24px;text-align:center;color:#ffffff;">
        <h2 style="margin:0;font-size:20px;font-weight:700;">Pack Home Health Care</h2>
        <p style="margin:4px 0 0 0;font-size:12px;color:#00F0ED;text-transform:uppercase;letter-spacing:1px;">Application Received</p>
      </div>
      <div style="padding:28px;color:#1e293b;font-size:14px;line-height:1.6;">
        <p style="margin:0 0 16px;">Hi ${name},</p>
        <p style="margin:0 0 16px;">Thank you for applying for <strong>${position}</strong> at Pack Home Health Care Agency LLC. We have received your application and our team will review it shortly.</p>
        <p style="margin:0 0 24px;">If we need anything else, we will contact you at this email address.</p>
        <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin:0 auto 8px;">
          <tr>
            <td align="center" bgcolor="#EE7862" style="background-color:#EE7862;border-radius:50px;">
              <a href="${site}/careers" target="_blank"
                style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:50px;">
                Visit Careers
              </a>
            </td>
          </tr>
        </table>
      </div>
      <div style="background-color:#f1f5f9;padding:16px;text-align:center;font-size:11px;color:#64748b;">
        Pack Home Health Care Agency LLC · Raleigh, NC<br/>
        <a href="${site}" style="color:#64748b;text-decoration:none;">www.packhomehealthcareagency.com</a>
      </div>
    </div>
  `;
}
