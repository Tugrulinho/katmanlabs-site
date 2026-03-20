/*
  # Add content column to blogs table

  1. Changes
    - Add `content` column to `blogs` table
      - Type: text
      - Nullable: true (for backward compatibility)
      - Will store the full blog post content
    
  2. Notes
    - Existing blog entries will have null content initially
    - Content can be added later via SQL or app interface
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blogs' AND column_name = 'content'
  ) THEN
    ALTER TABLE blogs ADD COLUMN content text;
  END IF;
END $$;
