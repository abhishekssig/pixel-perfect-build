
-- Site content table for managing hero, sections, etc.
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  content_key text NOT NULL,
  content_value text,
  content_type text NOT NULL DEFAULT 'text',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(section, content_key)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admin insert site content" ON public.site_content FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin update site content" ON public.site_content FOR UPDATE USING (is_admin());
CREATE POLICY "Admin delete site content" ON public.site_content FOR DELETE USING (is_admin());

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Testimonials table
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_title text,
  author_avatar text,
  content text NOT NULL,
  rating integer DEFAULT 5,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (is_active = true OR is_admin());
CREATE POLICY "Admin insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin update testimonials" ON public.testimonials FOR UPDATE USING (is_admin());
CREATE POLICY "Admin delete testimonials" ON public.testimonials FOR DELETE USING (is_admin());

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
