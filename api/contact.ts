import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
const rateLimitMap = new Map();

const RATE_LIMIT = 3;
const WINDOW_MS = 30 * 1000;
const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
export default async function handler(req: any, res: any) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, last: now };

  if (now - userData.last > WINDOW_MS) {
    userData.count = 1;
    userData.last = now;
  } else {
    userData.count += 1;
  }

  rateLimitMap.set(ip, userData);

  if (userData.count > RATE_LIMIT) {
    return res
      .status(429)
      .json({ error: "Çok fazla istek attınız, biraz bekleyin." });
  }
  if (req.method === "GET") {
    const { date } = req.query;

    const { data, error } = await supabase
      .from("meetings")
      .select("meeting_time")
      .eq("meeting_date", date);

    if (error) {
      return res.status(500).json({ error: "Saatler alınamadı" });
    }

    return res.status(200).json(data);
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      phone,
      service,
      message,
      website,
      cfToken,
      meeting_date,
      meeting_time,
    } = req.body;
    if (!cfToken) {
      return res.status(400).json({ error: "Doğrulama yok" });
    }
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: cfToken,
        }),
      },
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return res.status(400).json({ error: "Bot doğrulama başarısız" });
    }
    // aynı saat dolu mu kontrol et
    const { data: existingMeeting, error: meetingCheckError } = await supabase
      .from("meetings")
      .select("id")
      .eq("meeting_date", meeting_date)
      .eq("meeting_time", meeting_time)
      .maybeSingle();

    if (meetingCheckError) {
      return res.status(500).json({ error: "Toplantı kontrolü başarısız" });
    }

    if (existingMeeting) {
      return res.status(400).json({ error: "Bu saat dolu" });
    }
    const { error: meetingInsertError } = await supabase
      .from("meetings")
      .insert([
        {
          name,
          email,
          meeting_date,
          meeting_time,
        },
      ]);

    if (meetingInsertError) {
      return res.status(500).json({ error: "Toplantı kaydı oluşturulamadı" });
    }
    const { error: dbError } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        service,
        message,
        is_read: false,
        status: "new",
      },
    ]);

    if (dbError) {
      console.error("DB ERROR:", dbError);
    }
    if (website) {
      return res.status(400).json({ error: "Spam tespit edildi" });
    }
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Eksik alan var" });
    }

    const { data, error } = await resend.emails.send({
      from: "KatmanLabs <info@katmanlabs.com>",
      to: "info@katmanlabs.com",
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
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${phone || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 700;">Hizmet</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${service || "-"}</td>
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
    });

    console.log("RESEND DATA:", data);
    console.log("RESEND ERROR:", error);

    if (error) {
      return res
        .status(500)
        .json({ error: error.message || "Mail gönderilemedi" });
    }
    await resend.emails.send({
      from: "KatmanLabs <info@katmanlabs.com>",
      to: email,
      subject: "Mesajınız bize ulaştı",
      html: `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6; padding: 24px; background: #f9fafb;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #7c3aed); padding: 20px 24px;">
          <h2 style="margin: 0; color: #ffffff; font-size: 22px;">Mesajınız Alındı</h2>
          <p style="margin: 8px 0 0; color: #e9d5ff; font-size: 14px;">KatmanLabs ile iletişime geçtiğiniz için teşekkür ederiz.</p>
        </div>

        <div style="padding: 24px;">
          <p style="margin-top: 0;">Merhaba ${name},</p>

          <p>Mesajınız bize ulaştı. En kısa sürede dönüş sağlayacağız.</p>

          <div style="margin: 24px 0; padding: 16px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 10px;">
            <div style="font-weight: 700; margin-bottom: 8px;">Gönderdiğiniz bilgiler</div>
            <p style="margin: 6px 0;"><strong>İsim:</strong> ${name}</p>
            <p style="margin: 6px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 6px 0;"><strong>Telefon:</strong> ${phone || "-"}</p>
            <p style="margin: 6px 0;"><strong>Hizmet:</strong> ${service || "-"}</p>
            <p style="margin: 6px 0;"><strong>Mesaj:</strong><br/>${message}</p>
          </div>

          <p style="margin-bottom: 0;">KatmanLabs</p>
        </div>
      </div>
    </div>
  `,
    });
    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
}
