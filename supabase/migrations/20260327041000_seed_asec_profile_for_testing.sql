DO $$
DECLARE
  asec_id uuid;
BEGIN
  -- Popula automaticamente os dados da ASEC conforme solicitado para os testes do ISO Core
  SELECT id INTO asec_id FROM public.tenants WHERE name ILIKE '%ASEC%' LIMIT 1;
  
  IF FOUND THEN
    UPDATE public.tenants
    SET iso_profile_data = '{
      "razaoSocial": "Associação Educacional Comunitária — ASEC",
      "cnpj": "41.732.550/0001-82",
      "repNome": "Marcos Silva",
      "repCargo": "Diretor Executivo",
      "escopoGestao": "O programa abrange todas as atividades educacionais e administrativas da ASEC no município.",
      "profileComplete": true
    }'::jsonb
    WHERE id = asec_id;
  END IF;
END $$;
