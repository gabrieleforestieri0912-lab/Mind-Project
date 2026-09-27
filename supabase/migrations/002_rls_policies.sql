-- Users table RLS policies

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to users" ON users;
DROP POLICY IF EXISTS "Allow users to insert their own record" ON users;
DROP POLICY IF EXISTS "Allow users to update own record" ON users;

-- Allow public read access for users (for auth sync)
CREATE POLICY "Allow public read access to users"
ON users FOR SELECT
USING (true);

-- Allow users to insert their own record (for auth sync)
CREATE POLICY "Allow users to insert their own record"
ON users FOR INSERT
WITH CHECK (true);

-- Allow users to update their own record
CREATE POLICY "Allow users to update own record"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Newsletter subscribers table RLS policies

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert for newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public read for newsletter" ON newsletter_subscribers;

-- Allow public insert for newsletter subscriptions
CREATE POLICY "Allow public insert for newsletter"
ON newsletter_subscribers FOR INSERT
WITH CHECK (true);

-- Allow public read for newsletter (optional)
CREATE POLICY "Allow public read for newsletter"
ON newsletter_subscribers FOR SELECT
USING (true);

-- Contacts table RLS policies

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert for contacts" ON contacts;
DROP POLICY IF EXISTS "Allow read access for contacts" ON contacts;

-- Allow public insert for contact forms
CREATE POLICY "Allow public insert for contacts"
ON contacts FOR INSERT
WITH CHECK (true);

-- Allow read access for contacts (admin only via service role)
CREATE POLICY "Allow read access for contacts"
ON contacts FOR SELECT
USING (false);
