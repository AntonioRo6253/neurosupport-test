-- Crear extensión para UUIDs (requiere privilegios de superusuario)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla usuarios
CREATE TABLE public.usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    nombre_usuario TEXT NOT NULL UNIQUE,
    correo TEXT NOT NULL UNIQUE,
    contrasena_hash TEXT NOT NULL,
    rol TEXT NOT NULL,
    fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabla categorias_pictogramas
CREATE TABLE public.categorias_pictogramas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL 
);

-- Tabla categorias_guias
CREATE TABLE public.categorias_guias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL
);

-- Tabla pictogramas
CREATE TABLE public.pictogramas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    descripcion TEXT,
    url_imagen TEXT NOT NULL,
    categoria_id UUID NOT NULL REFERENCES categorias_pictogramas(id),
    fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    usuario_id UUID NOT NULL REFERENCES usuarios(id)
);

-- Tabla guías 
CREATE TABLE public.guias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    video TEXT,
    descripcion TEXT,
    categoria_id UUID NOT NULL REFERENCES categorias_guias(id),
    fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    usuario_id UUID NOT NULL REFERENCES usuarios(id)
);

-- Tabla agenda
CREATE TABLE public.agenda (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id),
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha_hora TIMESTAMPTZ NOT NULL,
    fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabla intermedia agenda_pictogramas
CREATE TABLE public.agenda_pictogramas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agenda_id UUID NOT NULL REFERENCES agenda(id) ON DELETE CASCADE,
    pictograma_id UUID NOT NULL REFERENCES pictogramas(id) ON DELETE CASCADE,
    UNIQUE (agenda_id, pictograma_id)
);