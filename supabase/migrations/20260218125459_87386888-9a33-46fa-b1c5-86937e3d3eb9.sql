
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL DEFAULT 'percentage',
  discount_value NUMERIC(10,2) NOT NULL DEFAULT 0,
  min_order_amount NUMERIC(10,2) DEFAULT 0,
  max_uses INTEGER,
  used_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Public can read active coupons (needed for validation at checkout)
CREATE POLICY "Public read active coupons" ON public.coupons FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin insert coupons" ON public.coupons FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update coupons" ON public.coupons FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete coupons" ON public.coupons FOR DELETE USING (public.is_admin());

CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
