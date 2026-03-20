/*
  # Admin Authentication and Security Setup

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique, not null)
      - `full_name` (text)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `failed_login_attempts`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `attempt_count` (integer, default 0)
      - `last_attempt_at` (timestamptz)
      - `locked_until` (timestamptz, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated admin users only
    - Implement brute force protection
    
  3. Important Notes
    - Admin users must be manually added to admin_users table
    - Failed login attempts are tracked to prevent brute force attacks
    - Users are locked for 15 minutes after 5 failed attempts
    - Only active admins can access the admin panel
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create failed_login_attempts table for brute force protection
CREATE TABLE IF NOT EXISTS failed_login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  attempt_count integer DEFAULT 0,
  last_attempt_at timestamptz DEFAULT now(),
  locked_until timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE failed_login_attempts ENABLE ROW LEVEL SECURITY;

-- Policies for admin_users table
CREATE POLICY "Admins can view own data"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update own profile"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policies for failed_login_attempts (service role only for security)
CREATE POLICY "Service role can manage login attempts"
  ON failed_login_attempts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for admin_users
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_failed_login_attempts_email ON failed_login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_failed_login_attempts_locked_until ON failed_login_attempts(locked_until);