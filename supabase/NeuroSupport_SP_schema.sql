---------- NeuroSupport Schema for Supabase ----------
-- Eliminar tabla usuarios original (si existe)
DROP TABLE IF EXISTS public.usuarios;

-- Tabla perfiles (datos adicionales para auth.users)
CREATE TABLE public.perfiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    nombre TEXT NOT NULL,
    nombre_usuario TEXT NOT NULL UNIQUE,
    rol TEXT NOT NULL DEFAULT 'usuario',
    fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabla categorias_pictogramas
CREATE TABLE public.categorias_pictogramas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL 
);

-- Tabla categorias_guias
CREATE TABLE public.categorias_guias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL
);

-- Tabla pictogramas
CREATE TABLE public.pictogramas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    descripcion TEXT,
    url_imagen TEXT NOT NULL,
    categoria_id UUID NOT NULL REFERENCES categorias_pictogramas(id),
    fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    usuario_id UUID NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE
);

-- Tabla guías 
CREATE TABLE public.guias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    video TEXT,
    descripcion TEXT,
    categoria_id UUID NOT NULL REFERENCES categorias_guias(id),
    fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    usuario_id UUID NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE
);

-- Tabla agenda
CREATE TABLE public.agenda (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha_hora TIMESTAMPTZ NOT NULL,
    fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabla intermedia agenda_pictogramas
CREATE TABLE public.agenda_pictogramas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agenda_id UUID NOT NULL REFERENCES agenda(id) ON DELETE CASCADE,
    pictograma_id UUID NOT NULL REFERENCES pictogramas(id) ON DELETE CASCADE,
    UNIQUE (agenda_id, pictograma_id)
);

---------- Función y Trigger para perfiles ----------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles (id, nombre, nombre_usuario)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre', ''),
    COALESCE(NEW.raw_user_meta_data->>'nombre_usuario', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;  -- ✨ Corrección clave de búsqueda

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

---------- Habilitación RLS y Políticas de Seguridad ----------
-- Habilitar RLS en todas las tablas
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_pictogramas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_guias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pictogramas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_pictogramas ENABLE ROW LEVEL SECURITY;

-- Políticas para perfiles
CREATE POLICY "Lectura perfil propio" ON public.perfiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Actualización perfil propio" ON public.perfiles
FOR UPDATE USING (auth.uid() = id);

-- Políticas para categorias_pictogramas
CREATE POLICY "Lectura pública categorias_pictogramas" 
ON public.categorias_pictogramas 
FOR SELECT USING (true);

-- Políticas para categorias_guias
CREATE POLICY "Lectura pública categorias_guias" 
ON public.categorias_guias 
FOR SELECT USING (true);

-- Políticas para pictogramas
CREATE POLICY "Lectura pictogramas público" ON public.pictogramas
FOR SELECT USING (true);

CREATE POLICY "Escritura pictogramas propio" ON public.pictogramas
FOR ALL USING (auth.uid() = usuario_id);

-- Políticas para guias
CREATE POLICY "Lectura guias público" ON public.guias
FOR SELECT USING (true);

CREATE POLICY "Escritura guias propio" ON public.guias
FOR ALL USING (auth.uid() = usuario_id);

-- Políticas para agenda
CREATE POLICY "Acceso agenda propio" ON public.agenda
FOR ALL USING (auth.uid() = usuario_id);

-- Políticas para agenda_pictogramas
CREATE POLICY "Acceso agenda_pictogramas por dueño agenda"
ON public.agenda_pictogramas
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.agenda a 
    WHERE a.id = agenda_id AND a.usuario_id = auth.uid()
  )
);

---------- Verificación final ----------
-- (Opcional) Comprobar habilitación RLS
SELECT 
    tablename, 
    rowsecurity AS rls_habilitado
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN (
    'perfiles',
    'categorias_pictogramas',
    'categorias_guias',
    'pictogramas',
    'guias',
    'agenda',
    'agenda_pictogramas'
);