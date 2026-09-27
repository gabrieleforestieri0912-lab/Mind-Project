# Supabase Database Schema for Mind Project

## Overview
This directory contains the SQL schema files for the Mind Project database.

## Files

### `complete_schema.sql` (Recommended)
This is the complete, self-contained SQL script that you should run in the Supabase SQL Editor. It includes:
- All table definitions
- Indexes for performance
- Triggers for automatic timestamp updates
- Row Level Security (RLS) policies
- Verification queries

### Migration Files
- `001_initial_schema.sql` - Initial table creation
- `002_rls_policies.sql` - RLS policies setup

## How to Use

### Option 1: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the entire content of `complete_schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" to execute the script

### Option 2: Using Supabase CLI
If you have the Supabase CLI installed:
```bash
supabase db push
```

## Database Schema

### Users Table
- `id` (UUID, Primary Key) - User ID
- `email` (TEXT, Unique) - User email
- `name` (TEXT) - User display name
- `bio` (TEXT) - User biography
- `role` (TEXT) - User role (default: 'user')
- `subscription_type` (TEXT) - Subscription type (default: 'free')
- `is_vip` (BOOLEAN) - VIP status (default: false)
- `image` (TEXT) - Profile image URL
- `mindset_level` (INTEGER) - Mindset level (0-5)
- `workout_progress` (INTEGER) - Workout progress (0-100)
- `challenge_logs` (JSONB) - Challenge completion logs
- `created_at` (TIMESTAMP) - Account creation date
- `updated_at` (TIMESTAMP) - Last update date

### Newsletter Subscribers Table
- `id` (UUID, Primary Key) - Subscriber ID
- `email` (TEXT, Unique) - Subscriber email
- `created_at` (TIMESTAMP) - Subscription date

### Contacts Table
- `id` (UUID, Primary Key) - Contact ID
- `name` (TEXT) - Contact name
- `email` (TEXT) - Contact email
- `message` (TEXT) - Contact message
- `created_at` (TIMESTAMP) - Contact date

## Security

The schema includes Row Level Security (RLS) policies to:
- Allow public read access to users (for authentication sync)
- Allow users to insert/update their own records
- Allow public newsletter subscriptions
- Allow public contact form submissions
- Restrict contact table reads to admin only (via service role)

## Verification

After running the schema, you can verify it was created correctly by running the verification queries included at the bottom of `complete_schema.sql` (uncomment them to run).

## Environment Variables

Make sure your `.env` file contains:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_AUTH_HOOK_SECRET=your_webhook_secret
```
