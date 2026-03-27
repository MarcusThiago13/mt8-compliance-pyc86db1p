DO $$
DECLARE
  asec_id uuid;
BEGIN
  -- Atualiza o profile da ASEC substituindo os dados de teste pelos dados reais solicitados
  -- Campos não listados serão removidos do JSON (ficando vazios no form)
  SELECT id INTO asec_id FROM public.tenants WHERE name ILIKE '%ASEC%' LIMIT 1;
  
  IF FOUND THEN
    UPDATE public.tenants
    SET iso_profile_data = '{
      "razaoSocial": "Associação Educacional Comunitária — ASEC",
      "cnpj": "41.732.550/0001-82",
      "repNome": "José Maria Medeiros",
      "profileComplete": true
    }'::jsonb
    WHERE id = asec_id;
  END IF;
END $$;
