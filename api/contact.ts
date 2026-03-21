import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Eksik alan var' });
    }

    await resend.emails.send({
      from: 'KatmanLabs <info@katmanlabs.com>',
      to: 'info@katmanlabs.com',
      replyTo: email,
      subject: `Yeni İletişim Formu - ${name}`,
     html: `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6; padding: 24px; background: #f9fafb;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1e3a8a, #7c3aed); padding: 20px 24px;">
        <h2 style="margin: 0; color: #ffffff; font-size: 22px;">Yeni İletişim Talebi</h2>
        <p style="margin: 8px 0 0; color: #e9d5ff; font-size: 14px;">Web sitenizden yeni bir form gönderimi alındı.</p>
      </div>

      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 140px; font-weight: 700;">İsim</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 700;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 700;">Telefon</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${phone || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 700;">Hizmet</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${service || '-'}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <div style="font-weight: 700; margin-bottom: 8px;">Mesaj</div>
          <div style="padding: 16px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 10px; white-space: pre-line;">
            ${message}
          </div>
        </div>
      </div>
    </div>
  </div>
`,
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Mail gönderilemedi' });
  }
}
