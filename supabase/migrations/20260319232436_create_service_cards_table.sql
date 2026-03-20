/*
  # Create Service Cards Table

  1. New Tables
    - `service_cards`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Service card title
      - `description` (text) - Service card description
      - `features` (jsonb) - Array of feature strings
      - `icon_name` (text) - Icon identifier (instagram, globe, trendingup, barchart3)
      - `color` (text) - Color theme (featured, primary, secondary, accent)
      - `featured` (boolean) - Whether this card is featured
      - `display_order` (integer) - Order for display
      - `updated_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `service_cards` table
    - Add policy for public read access
    - Add policy for authenticated write access

  3. Initial Data
    - Seed with current hardcoded service cards
*/

-- Create service_cards table
CREATE TABLE IF NOT EXISTS service_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  icon_name text NOT NULL,
  color text NOT NULL,
  featured boolean DEFAULT false,
  display_order integer NOT NULL,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE service_cards ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read service cards (public access)
CREATE POLICY "Public can read service cards"
  ON service_cards
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Only authenticated users can insert service cards
CREATE POLICY "Authenticated users can insert service cards"
  ON service_cards
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update service cards
CREATE POLICY "Authenticated users can update service cards"
  ON service_cards
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete service cards
CREATE POLICY "Authenticated users can delete service cards"
  ON service_cards
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_service_cards_slug ON service_cards(slug);
CREATE INDEX IF NOT EXISTS idx_service_cards_display_order ON service_cards(display_order);

-- Seed initial service cards
INSERT INTO service_cards (slug, title, description, features, icon_name, color, featured, display_order) VALUES
  (
    'sosyal-medya-tasarim',
    'Sosyal Medya & Tasarim',
    'Markanizi sosyal medyada one cikaran yaratici tasarimlar. Instagram, Facebook, LinkedIn icin profesyonel icerik yonetimi.',
    '["Instagram Yonetimi", "Gorsel Tasarim", "Icerik Stratejisi", "Community Management"]'::jsonb,
    'instagram',
    'featured',
    true,
    1
  ),
  (
    'web-tasarim',
    'Web Tasarim & Gelistirme',
    'Modern, hizli ve kullanici dostu web siteleri. Markanizi dijital dunyada en iyi sekilde temsil eden, donusum odakli platformlar.',
    '["Responsive Tasarim", "SEO Optimize", "Hizli Yukleme", "Guvenli Altyapi"]'::jsonb,
    'globe',
    'primary',
    false,
    2
  ),
  (
    'dijital-pazarlama',
    'Dijital Pazarlama',
    'Hedef kitlenize ulasin, marka bilinirliginizi artirin. Veri odakli stratejilerle satislarinizi maksimize edin.',
    '["Google Ads", "Meta Reklamlari", "Icerik Pazarlama", "Email Marketing"]'::jsonb,
    'trendingup',
    'secondary',
    false,
    3
  ),
  (
    'seo-analitik',
    'SEO & Analitik',
    'Arama motorlarinda ust siralarda yer alin. Detayli analizlerle performansinizi surekli iyilestirin.',
    '["Anahtar Kelime Analizi", "Teknik SEO", "Link Building", "Performans Raporlari"]'::jsonb,
    'barchart3',
    'accent',
    false,
    4
  )
ON CONFLICT (slug) DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_service_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_service_cards_updated_at_trigger
  BEFORE UPDATE ON service_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_service_cards_updated_at();