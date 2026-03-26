DO $$
DECLARE
    sa_id UUID;
    t_id UUID;
BEGIN
    -- Obter o ID do Super Admin preexistente
    SELECT id INTO sa_id FROM auth.users WHERE email = 'marcusthiago.adv@gmail.com' LIMIT 1;
    
    IF sa_id IS NOT NULL THEN
        -- Verificar e cadastrar a ASEC se ela não existir
        IF NOT EXISTS (SELECT 1 FROM public.tenants WHERE name = 'Associação Educacional Comunitária — ASEC') THEN
            INSERT INTO public.tenants (name, nature, public_relationship, areas, access_profile)
            VALUES ('Associação Educacional Comunitária — ASEC', 'osc', true, '{"education"}', 'B')
            RETURNING id INTO t_id;

            -- Dar permissão explícita ao Super Admin para este tenant
            INSERT INTO public.tenant_users (tenant_id, user_id, role)
            VALUES (t_id, sa_id, 'admin')
            ON CONFLICT DO NOTHING;
        END IF;
    END IF;
END $$;
