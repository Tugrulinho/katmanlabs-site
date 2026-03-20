/*
  # Create Site Content Management Table

  1. New Tables
    - `site_content`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Unique identifier for the content field
      - `value` (text) - The actual content value
      - `type` (text) - Type of content (text, textarea, url, number)
      - `page` (text) - Page identifier (homepage, footer, contact, etc.)
      - `label` (text) - Human-readable label for admin UI
      - `description` (text, nullable) - Optional description for editors
      - `updated_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `site_content` table
    - Add policy for public read access (anyone can view content)
    - Add policy for authenticated admin write access

  3. Initial Data
    - Seed with current hardcoded values from homepage
*/

-- Create site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  type text NOT NULL DEFAULT 'text',
  page text NOT NULL,
  label text NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read site content (public access)
CREATE POLICY "Public can read site content"
  ON site_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Authenticated users can view all content
CREATE POLICY "Authenticated users can read site content"
  ON site_content
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can insert content
CREATE POLICY "Authenticated users can insert site content"
  ON site_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update content
CREATE POLICY "Authenticated users can update site content"
  ON site_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete content
CREATE POLICY "Authenticated users can delete site content"
  ON site_content
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(key);
CREATE INDEX IF NOT EXISTS idx_site_content_page ON site_content(page);

-- Seed initial homepage content
INSERT INTO site_content (key, value, type, page, label, description) VALUES
  -- Hero Section
  ('hero_badge_text', 'Dijital Basari Icin 4 Guclu Hizmet', 'text', 'homepage', 'Hero Badge Text', 'Small badge text above main heading'),
  ('hero_title_line1', 'Dijital Dunyada', 'text', 'homepage', 'Hero Title Line 1', 'First line of hero title'),
  ('hero_title_line2', 'Markanizi Buyutun', 'text', 'homepage', 'Hero Title Line 2', 'Second line of hero title (gradient text)'),
  ('hero_description', 'Sosyal medya, web tasarim, dijital pazarlama ve SEO hizmetleriyle markanizin dijital varligini guclendiriyoruz.', 'textarea', 'homepage', 'Hero Description', 'Main description under hero title'),
  ('hero_cta_primary', 'Hemen Basla', 'text', 'homepage', 'Hero Primary Button', 'Text for main CTA button'),
  ('hero_cta_secondary', 'Hizmetleri Kesfet', 'text', 'homepage', 'Hero Secondary Button', 'Text for secondary button'),
  
  -- Stats Section
  ('stat_1_number', '150+', 'text', 'homepage', 'Stat 1 - Number', 'First statistic number'),
  ('stat_1_label', 'Mutlu Musteri', 'text', 'homepage', 'Stat 1 - Label', 'First statistic label'),
  ('stat_2_number', '%300', 'text', 'homepage', 'Stat 2 - Number', 'Second statistic number'),
  ('stat_2_label', 'Ortalama ROI Artisi', 'text', 'homepage', 'Stat 2 - Label', 'Second statistic label'),
  ('stat_3_number', '50+', 'text', 'homepage', 'Stat 3 - Number', 'Third statistic number'),
  ('stat_3_label', 'Aktif Proje', 'text', 'homepage', 'Stat 3 - Label', 'Third statistic label'),
  ('stat_4_number', '5+', 'text', 'homepage', 'Stat 4 - Number', 'Fourth statistic number'),
  ('stat_4_label', 'Yillik Deneyim', 'text', 'homepage', 'Stat 4 - Label', 'Fourth statistic label'),
  
  -- Services Section
  ('services_badge', 'Profesyonel Hizmetler', 'text', 'homepage', 'Services Badge', 'Badge text above services heading'),
  ('services_title_part1', 'Dijital surecinizi', 'text', 'homepage', 'Services Title Part 1', 'First part of services heading'),
  ('services_title_part2', 'ilerletiyoruz.', 'text', 'homepage', 'Services Title Part 2', 'Last part of services heading'),
  
  -- About Section
  ('about_title', 'Biz ne yapiyoruz ?', 'text', 'homepage', 'About Section Title', 'Title for about section'),
  ('about_text_1', 'Bugun sosyal medya, isletmeler icin sadece bir paylasim alani degil; cogu zaman ilk temas noktasi.', 'textarea', 'homepage', 'About Text - Paragraph 1', 'First paragraph of about section'),
  ('about_text_2', 'Katman Labs olarak amacimiz; kucuk isletmeler icin bu alani rastgele degil, duzenli, anlasilir ve markayi dogru yansitan bir yapiya kavusturmak.', 'textarea', 'homepage', 'About Text - Paragraph 2', 'Second paragraph of about section'),
  ('about_text_3', 'Urun de satsaniz, hizmet de verseniz; sosyal medya profiliniz cogu zaman satistan onceki son durak.', 'textarea', 'homepage', 'About Text - Paragraph 3', 'Third paragraph of about section'),
  ('about_text_4', 'Biz bu butunlugu kuruyor, sosyal medya hesaplarinin sahipsiz kalmadan, duzenli bir sekilde devam etmesini sagliyoruz.', 'textarea', 'homepage', 'About Text - Paragraph 4', 'Fourth paragraph of about section (bold)'),
  ('about_image_url', 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800', 'url', 'homepage', 'About Section Image', 'Image URL for about section'),
  
  -- Process Section
  ('process_title', 'Calisma Surecimiz', 'text', 'homepage', 'Process Section Title', 'Title for process section'),
  ('process_description', 'Basarili projeler icin kanitlanmis 4 adimlik metodolojimiz', 'text', 'homepage', 'Process Section Description', 'Description under process title'),
  
  -- Blog Section
  ('blog_badge', 'Blog & Icerikler', 'text', 'homepage', 'Blog Section Badge', 'Badge text above blog heading'),
  ('blog_title', 'Son Blog Yazilarimiz', 'text', 'homepage', 'Blog Section Title', 'Title for blog section'),
  ('blog_description', 'Dijital dunyadan guncel icerikler, trendler ve ipuclari', 'text', 'homepage', 'Blog Section Description', 'Description under blog title'),
  
  -- Pricing Section
  ('pricing_title', 'Paketlerimiz', 'text', 'homepage', 'Pricing Section Title', 'Title for pricing section'),
  ('pricing_description', 'Her butceye uygun cozumler', 'text', 'homepage', 'Pricing Section Description', 'Description under pricing title'),
  
  -- Testimonials Section
  ('testimonials_badge', 'Referanslarimiz', 'text', 'homepage', 'Testimonials Badge', 'Badge text above testimonials'),
  ('testimonials_title', 'Katmanlabs Tercih Eden Mutlu Musterilerimiz', 'text', 'homepage', 'Testimonials Title', 'Title for testimonials section'),
  ('testimonials_description', 'Bircok basarili markayla calisma firsati bulduk', 'text', 'homepage', 'Testimonials Description', 'Description under testimonials title'),
  
  -- FAQ Section
  ('faq_badge', 'Sikca Sorulan Sorular', 'text', 'homepage', 'FAQ Badge', 'Badge text above FAQ'),
  ('faq_title', 'Merak Ettikleriniz', 'text', 'homepage', 'FAQ Title', 'Title for FAQ section'),
  ('faq_description', 'Size yardimci olmak icin en cok sorulan sorulari yanitladik', 'text', 'homepage', 'FAQ Description', 'Description under FAQ title'),
  ('faq_cta_text', 'Baska sorulariniz mi var?', 'text', 'homepage', 'FAQ CTA Text', 'Text above FAQ contact button'),
  ('faq_button_text', 'Bize Ulasin', 'text', 'homepage', 'FAQ Button Text', 'FAQ contact button text'),
  
  -- Contact Section
  ('contact_title', 'Projenizi Konusalim', 'text', 'homepage', 'Contact Title', 'Title for contact section'),
  ('contact_description', 'Dijital donusumunuze bugun baslayin. Size ozel bir strateji gelistirmek icin heyecanliyiz.', 'textarea', 'homepage', 'Contact Description', 'Description under contact title'),
  ('contact_email', 'info@katmanlabs.com', 'text', 'contact', 'Contact Email', 'Contact email address'),
  ('contact_phone', '+90 500 123 45 67', 'text', 'contact', 'Contact Phone', 'Contact phone number'),
  ('contact_whatsapp', '905001234567', 'text', 'contact', 'WhatsApp Number', 'WhatsApp number (without +)'),
  ('contact_consultation_title', 'Ucretsiz Danismanlik', 'text', 'homepage', 'Free Consultation Title', 'Title for free consultation box'),
  ('contact_consultation_text', 'Ilk gorusme tamamen ucretsiz. Projeniz hakkinda konusalim ve size ozel bir yol haritasi cikaralim.', 'textarea', 'homepage', 'Free Consultation Text', 'Description for free consultation'),
  ('contact_consultation_button', 'WhatsApp ile Iletisime Gec', 'text', 'homepage', 'Consultation Button Text', 'Button text for WhatsApp contact')
ON CONFLICT (key) DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_content_updated_at_trigger
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_site_content_updated_at();