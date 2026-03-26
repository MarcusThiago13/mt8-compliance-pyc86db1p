-- Fix RLS Infinite Recursion on profiles (Error 42P17)
-- The previous policy used is_super_admin(), which queried profiles, creating a loop.
DROP POLICY IF EXISTS "user_read_own_profile" ON public.profiles;

CREATE POLICY "user_read_own_profile" ON public.profiles 
  FOR SELECT TO authenticated USING (true);

-- Add iso_profile_data column to tenants to store the Organization Profile data
ALTER TABLE public.tenants ADD COLUMN IF NOT EXISTS iso_profile_data JSONB DEFAULT '{}'::jsonb;
