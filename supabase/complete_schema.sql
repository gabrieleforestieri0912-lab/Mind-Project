-- ========================================
-- Mind Project - Complete Database Schema
-- ========================================
-- Execute this entire script in Supabase SQL Editor
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- USERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user',
    subscription_type TEXT DEFAULT 'free',
    is_vip BOOLEAN DEFAULT false,
    image TEXT,
    mindset_level INTEGER DEFAULT 0 CHECK (mindset_level >= 0 AND mindset_level <= 5),
    workout_progress INTEGER DEFAULT 0 CHECK (workout_progress >= 0 AND workout_progress <= 100),
    challenge_logs JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- CONTACTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_subscription_type ON users(subscription_type);
CREATE INDEX IF NOT EXISTS idx_users_is_vip ON users(is_vip);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- ========================================
-- TRIGGERS
-- ========================================
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- ROW LEVEL SECURITY
-- ========================================
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- ========================================
-- RLS POLICIES FOR USERS
-- ========================================
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

-- ========================================
-- RLS POLICIES FOR NEWSLETTER SUBSCRIBERS
-- ========================================
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

-- ========================================
-- RLS POLICIES FOR CONTACTS
-- ========================================
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

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- Run these to verify the schema was created correctly

-- Check users table structure
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'users' 
-- ORDER BY ordinal_position;

-- Check newsletter_subscribers table structure
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'newsletter_subscribers' 
-- ORDER BY ordinal_position;

-- Check contacts table structure
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'contacts' 
-- ORDER BY ordinal_position;

-- Check RLS policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies 
-- WHERE tablename IN ('users', 'newsletter_subscribers', 'contacts');
