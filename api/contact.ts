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
        <h2>Yeni iletişim formu</h2>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || '-'}</p>
        <p><strong>Hizmet:</strong> ${service || '-'}</p>
        <p><strong>Mesaj:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Mail gönderilemedi' });
  }
}
