-- Fix infinite recursion in RLS policies (Error 42P17)

-- 1. Create a security definer function to check super admin status
-- This function runs with elevated privileges, bypassing RLS and avoiding recursion loops
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_super_admin FROM public.profiles WHERE id = auth.uid() LIMIT 1),
    false
  );
$$;

-- 2. Drop all recursive and related policies
DROP POLICY IF EXISTS "user_read_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "super_admin_all_tenants" ON public.tenants;
DROP POLICY IF EXISTS "user_own_tenant" ON public.tenants;
DROP POLICY IF EXISTS "super_admin_tenant_users" ON public.tenant_users;
DROP POLICY IF EXISTS "user_read_own_tenant_users" ON public.tenant_users;

-- 3. Recreate Policies for Profiles
-- Breaks the loop by using the security definer function instead of querying profiles again
CREATE POLICY "user_read_own_profile" ON public.profiles
    FOR SELECT TO authenticated
    USING (id = auth.uid() OR public.is_super_admin());

-- 4. Recreate Policies for Tenants
CREATE POLICY "super_admin_all_tenants" ON public.tenants
    FOR ALL TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

CREATE POLICY "user_own_tenant" ON public.tenants
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.tenant_users 
            WHERE tenant_users.user_id = auth.uid() 
            AND tenant_users.tenant_id = tenants.id
        )
    );

-- 5. Recreate Policies for Tenant Users
CREATE POLICY "super_admin_tenant_users" ON public.tenant_users
    FOR ALL TO authenticated
    USING (public.is_super_admin());

-- Fix user_read_own_tenant_users to remove self-reference loop
CREATE POLICY "user_read_own_tenant_users" ON public.tenant_users
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

