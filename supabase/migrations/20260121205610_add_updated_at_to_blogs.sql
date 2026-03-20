/*
  # Add updated_at column to blogs table

  1. Changes
    - Add `updated_at` column to `blogs` table
    - Set default value to now()
    - Create trigger to automatically update `updated_at` on row updates

  2. Notes
    - This allows tracking when blog posts are modified
    - The trigger ensures updated_at is always current when content changes
*/

-- Add updated_at column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blogs' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE blogs ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Create or replace function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();