/*
  # Create Blogs Table

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key) - Unique identifier for each blog post
      - `title` (text, not null) - Blog post title
      - `slug` (text, unique, not null) - URL-friendly version of title
      - `excerpt` (text) - Short description/summary of the blog post
      - `category` (text, not null) - Blog category (Web Tasarım, Dijital Pazarlama, SEO, Genel)
      - `image_url` (text, not null) - URL to blog post featured image
      - `published_at` (timestamptz) - Publication date and time
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `blogs` table
    - Add policy for public read access (anyone can view published blogs)

  3. Sample Data
    - Insert 12 sample blog posts with various categories
    - Use placeholder images from picsum for visual content
*/

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  category text NOT NULL,
  image_url text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view published blogs"
  ON blogs
  FOR SELECT
  TO anon, authenticated
  USING (published_at IS NOT NULL AND published_at <= now());

-- Insert sample blog data
INSERT INTO blogs (title, slug, excerpt, category, image_url) VALUES
  ('Modern Web Tasarımında 2024 Trendleri', 'modern-web-tasarim-trendleri-2024', 'Kullanıcı deneyimini ön plana çıkaran minimal tasarım yaklaşımları ve animasyon teknikleri.', 'Web Tasarım', 'https://picsum.photos/seed/blog1/800/600'),
  ('SEO Stratejileri: Organik Trafiği 3 Katına Çıkarın', 'seo-stratejileri-organik-trafik', 'Arama motorlarında üst sıralara çıkmak için uygulamanız gereken kanıtlanmış teknikler.', 'SEO', 'https://picsum.photos/seed/blog2/800/600'),
  ('Dijital Pazarlamada ROI Nasıl Artırılır?', 'dijital-pazarlama-roi-artirma', 'Reklam bütçenizi optimize ederek yatırım getirinizi maksimize edin.', 'Dijital Pazarlama', 'https://picsum.photos/seed/blog3/800/600'),
  ('React ve TypeScript ile Modern Web Uygulamaları', 'react-typescript-modern-web', 'Type-safe kod yazarak daha güvenli ve sürdürülebilir projeler geliştirin.', 'Web Tasarım', 'https://picsum.photos/seed/blog4/800/600'),
  ('Google Analytics 4: Kapsamlı Başlangıç Rehberi', 'google-analytics-4-rehber', 'GA4 ile kullanıcı davranışlarını analiz edin ve veri odaklı kararlar alın.', 'SEO', 'https://picsum.photos/seed/blog5/800/600'),
  ('Email Pazarlama: Dönüşüm Oranlarını İkiye Katlayın', 'email-pazarlama-donusum', 'Etkili email kampanyaları oluşturarak müşterilerinizle bağlantıda kalın.', 'Dijital Pazarlama', 'https://picsum.photos/seed/blog6/800/600'),
  ('Responsive Tasarım: Mobil Öncelikli Yaklaşım', 'responsive-tasarim-mobil-oncelik', 'Tüm cihazlarda mükemmel görünen web siteleri tasarlamanın sırları.', 'Web Tasarım', 'https://picsum.photos/seed/blog7/800/600'),
  ('Backlink Stratejileri ve Kaliteli Link Oluşturma', 'backlink-stratejileri', 'Otoritenizi artırmak için doğru web sitelerinden backlink almanın yolları.', 'SEO', 'https://picsum.photos/seed/blog8/800/600'),
  ('Sosyal Medya Reklamcılığında Hedef Kitle Analizi', 'sosyal-medya-hedef-kitle', 'Facebook ve Instagram reklamlarında doğru kişilere ulaşmanın formülü.', 'Dijital Pazarlama', 'https://picsum.photos/seed/blog9/800/600'),
  ('UI/UX Tasarım İlkeleri: Kullanıcı Odaklı Yaklaşım', 'ui-ux-tasarim-ilkeleri', 'Kullanıcıların sevdiği ve kullanmaktan keyif aldığı arayüzler yaratın.', 'Web Tasarım', 'https://picsum.photos/seed/blog10/800/600'),
  ('Teknik SEO: Site Hızı Optimizasyonu', 'teknik-seo-site-hizi', 'Core Web Vitals metriklerini iyileştirerek sıralamanızı yükseltin.', 'SEO', 'https://picsum.photos/seed/blog11/800/600'),
  ('İçerik Pazarlama: Değer Yaratan Hikayeler Anlatın', 'icerik-pazarlama-hikayeler', 'Markanızı öne çıkaran ve kullanıcıları etkileyen içerikler üretin.', 'Dijital Pazarlama', 'https://picsum.photos/seed/blog12/800/600')
ON CONFLICT (slug) DO NOTHING;