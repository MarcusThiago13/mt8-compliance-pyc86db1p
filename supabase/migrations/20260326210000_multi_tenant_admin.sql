DO $$ 
BEGIN
    -- Create tenants
    CREATE TABLE IF NOT EXISTS public.tenants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        nature TEXT NOT NULL,
        public_relationship BOOLEAN DEFAULT false,
        areas TEXT[] DEFAULT '{}',
        access_profile TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    -- Create profiles
    CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        email TEXT,
        name TEXT,
        is_super_admin BOOLEAN DEFAULT false,
        active_tenant_id UUID REFERENCES public.tenants(id),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    -- Create tenant_users
    CREATE TABLE IF NOT EXISTS public.tenant_users (
        tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (tenant_id, user_id)
    );
END $$;

-- Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_users ENABLE ROW LEVEL SECURITY;

-- Policies for tenants
DROP POLICY IF EXISTS "super_admin_all_tenants" ON public.tenants;
CREATE POLICY "super_admin_all_tenants" ON public.tenants
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_super_admin = true))
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_super_admin = true));

DROP POLICY IF EXISTS "user_own_tenant" ON public.tenants;
CREATE POLICY "user_own_tenant" ON public.tenants
    FOR SELECT TO authenticated
    USING (EXISTS (SELECT 1 FROM public.tenant_users WHERE tenant_users.user_id = auth.uid() AND tenant_users.tenant_id = tenants.id));

-- Policies for profiles
DROP POLICY IF EXISTS "user_read_own_profile" ON public.profiles;
CREATE POLICY "user_read_own_profile" ON public.profiles
    FOR SELECT TO authenticated
    USING (id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_super_admin = true));

DROP POLICY IF EXISTS "user_update_own_profile" ON public.profiles;
CREATE POLICY "user_update_own_profile" ON public.profiles
    FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Policies for tenant_users
DROP POLICY IF EXISTS "super_admin_tenant_users" ON public.tenant_users;
CREATE POLICY "super_admin_tenant_users" ON public.tenant_users
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_super_admin = true));

DROP POLICY IF EXISTS "user_read_own_tenant_users" ON public.tenant_users;
CREATE POLICY "user_read_own_tenant_users" ON public.tenant_users
    FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()));

-- Seed Super Admin
DO $$
DECLARE
    sa_id UUID;
    t_id UUID;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'marcusthiago.adv@gmail.com') THEN
        sa_id := gen_random_uuid();
        
        INSERT INTO auth.users (
            id, instance_id, email, encrypted_password, email_confirmed_at,
            created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
            is_super_admin, role, aud,
            confirmation_token, recovery_token, email_change_token_new,
            email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token
        ) VALUES (
            sa_id, '00000000-0000-0000-0000-000000000000', 'marcusthiago.adv@gmail.com', crypt('securepassword123', gen_salt('bf')), NOW(),
            NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Super Admin"}',
            false, 'authenticated', 'authenticated',
            '', '', '', '', '', NULL, '', '', ''
        );

        INSERT INTO public.tenants (name, nature, public_relationship, areas, access_profile)
        VALUES ('Tenant Padrão', 'private', false, '{"tech"}', 'A')
        RETURNING id INTO t_id;

        INSERT INTO public.profiles (id, email, name, is_super_admin, active_tenant_id)
        VALUES (sa_id, 'marcusthiago.adv@gmail.com', 'Marcus Thiago', true, t_id)
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO public.tenant_users (tenant_id, user_id, role)
        VALUES (t_id, sa_id, 'admin')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;
