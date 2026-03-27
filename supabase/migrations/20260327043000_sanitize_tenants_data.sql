DO $$
DECLARE
  asec_id uuid;
  hk_id uuid;
BEGIN
  -- Limpeza rigorosa dos dados fictícios (Zero Mock Data Policy)
  -- ASEC: Mantém estritamente os dados reais solicitados e remove qualquer lixo de teste
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

  -- Hello Kids: Limpeza total, garantindo que nenhum mock anterior persista
  SELECT id INTO hk_id FROM public.tenants WHERE name ILIKE '%Hello Kids%' LIMIT 1;
  IF FOUND THEN
    UPDATE public.tenants
    SET iso_profile_data = '{}'::jsonb
    WHERE id = hk_id;
  END IF;
END $$;
