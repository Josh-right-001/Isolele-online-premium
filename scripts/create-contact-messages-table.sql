-- Create contact_messages table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (contact form is public)
CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admins) can read messages
CREATE POLICY "Allow admin read" ON contact_messages
  FOR SELECT TO authenticated
  USING (true);

-- Only authenticated users (admins) can update message status
CREATE POLICY "Allow admin update" ON contact_messages
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
