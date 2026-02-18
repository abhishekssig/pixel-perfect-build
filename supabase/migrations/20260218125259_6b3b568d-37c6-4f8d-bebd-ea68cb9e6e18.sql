
-- Blogs table
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL DEFAULT 'News',
  cover_image TEXT,
  author TEXT DEFAULT 'Rebel Head',
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published blogs" ON public.blogs FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admin insert blogs" ON public.blogs FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update blogs" ON public.blogs FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete blogs" ON public.blogs FOR DELETE USING (public.is_admin());

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  cover_image TEXT,
  registration_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published events" ON public.events FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admin insert events" ON public.events FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update events" ON public.events FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete events" ON public.events FOR DELETE USING (public.is_admin());

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
