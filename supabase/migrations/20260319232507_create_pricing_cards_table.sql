/*
  # Create Pricing Cards Table

  1. New Tables
    - `pricing_cards`
      - `id` (uuid, primary key)
      - `name` (text) - Package name
      - `price` (text) - Price display text
      - `period` (text) - Pricing period description
      - `features` (jsonb) - Array of feature strings
      - `popular` (boolean) - Whether this package is marked as popular
      - `display_order` (integer) - Order for display
      - `updated_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `pricing_cards` table
    - Add policy for public read access
    - Add policy for authenticated write access

  3. Initial Data
    - Seed with current hardcoded pricing packages
*/

-- Create pricing_cards table
CREATE TABLE IF NOT EXISTS pricing_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price text NOT NULL,
  period text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  popular boolean DEFAULT false,
  display_order integer NOT NULL,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pricing_cards ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read pricing cards (public access)
CREATE POLICY "Public can read pricing cards"
  ON pricing_cards
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Only authenticated users can insert pricing cards
CREATE POLICY "Authenticated users can insert pricing cards"
  ON pricing_cards
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update pricing cards
CREATE POLICY "Authenticated users can update pricing cards"
  ON pricing_cards
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete pricing cards
CREATE POLICY "Authenticated users can delete pricing cards"
  ON pricing_cards
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_pricing_cards_display_order ON pricing_cards(display_order);

-- Seed initial pricing cards
INSERT INTO pricing_cards (name, price, period, features, popular, display_order) VALUES
  (
    'Baslangic',
    '5.000TL',
    'tek seferlik',
    '["5 Sayfa Web Sitesi", "Responsive Tasarim", "Temel SEO Optimizasyonu", "1 Ay Ucretsiz Destek", "Google Analytics Kurulumu"]'::jsonb,
    false,
    1
  ),
  (
    'Sosyal Medya Premium',
    '3.500TL',
    'aylik',
    '["30 Post + Story Tasarimi", "Icerik Stratejisi & Planlama", "Instagram & Facebook Yonetimi", "Community Management", "Aylik Analiz Raporlari", "Reel & Video Duzenleme"]'::jsonb,
    true,
    2
  ),
  (
    'Profesyonel',
    '12.000TL',
    'tek seferlik + aylik destek',
    '["10 Sayfa Web Sitesi", "Ozel Tasarim", "Ileri SEO Optimizasyonu", "3 Ay Dijital Pazarlama", "Aylik Performans Raporlari", "6 Ay Oncelikli Destek"]'::jsonb,
    false,
    3
  ),
  (
    'Kurumsal',
    'Iletisime Gecin',
    'ozel proje',
    '["Sinirsiz Sayfa", "Kurumsal Cozumler", "Full SEO & Pazarlama Paketi", "E-ticaret Entegrasyonu", "Ozel Yazilim Gelistirme", "7/24 Oncelikli Destek"]'::jsonb,
    false,
    4
  )
ON CONFLICT DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_pricing_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pricing_cards_updated_at_trigger
  BEFORE UPDATE ON pricing_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_pricing_cards_updated_at();