
-- ==========================================
-- LIMPIEZA DE BASE DE DATOS
-- ==========================================
DROP TABLE IF EXISTS talent_profiles CASCADE;
DROP TABLE IF EXISTS partner_logos CASCADE;
DROP TABLE IF EXISTS sponsored_ads CASCADE;
DROP TABLE IF EXISTS special_ads CASCADE;
DROP TABLE IF EXISTS entrepreneurship_tips CASCADE;
DROP TABLE IF EXISTS short_collaborations CASCADE;
DROP TABLE IF EXISTS legal_faqs CASCADE;
DROP TABLE IF EXISTS legal_topics CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS funding_opportunities CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS shareable_photos CASCADE;
DROP TABLE IF EXISTS specialists CASCADE;
DROP TABLE IF EXISTS photojournalism_posts CASCADE;
DROP TABLE IF EXISTS community_posts CASCADE;
DROP TABLE IF EXISTS promo_videos CASCADE;
DROP TABLE IF EXISTS premium_sponsors CASCADE;
DROP TABLE IF EXISTS community_ads CASCADE;
DROP TABLE IF EXISTS freelance_services CASCADE;
DROP TABLE IF EXISTS ngo_spotlights CASCADE;
DROP TABLE IF EXISTS press_releases CASCADE;
DROP TABLE IF EXISTS news_articles CASCADE;
DROP TABLE IF EXISTS entrepreneurships CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;
DROP TABLE IF EXISTS hero_heading CASCADE;
DROP TABLE IF EXISTS site_stats CASCADE;
DROP TABLE IF EXISTS app_config CASCADE;

-- ==========================================
-- I. MÓDULO CORE / SISTEMA
-- ==========================================

-- 1. Usuarios (Administradores y usuarios registrados)
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    region TEXT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Configuración General (Intervalos, ajustes globales)
CREATE TABLE app_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT
);

-- 3. Hero Heading (Configuración de portada)
CREATE TABLE hero_heading (
    id SERIAL PRIMARY KEY,
    main_text TEXT NOT NULL,
    highlighted_text TEXT,
    sub_text TEXT,
    featured_label TEXT,
    text_color TEXT
);

-- 4. Estadísticas del Sitio (Contadores)
CREATE TABLE site_stats (
    id TEXT PRIMARY KEY, -- 'subscribers', 'visits', 'regions'
    label TEXT NOT NULL,
    end_value INTEGER NOT NULL,
    prefix TEXT
);

-- 5. Logos de Partners (Footer)
CREATE TABLE partner_logos (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- II. MÓDULO EDITORIAL
-- ==========================================

-- 6. Noticias y Análisis
CREATE TABLE news_articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT, -- Industria, Tecnología, Legislación, Tendencias
    author TEXT,
    date_published TEXT, -- Formato texto para display o DATE
    image_url TEXT,
    summary TEXT,
    report_content JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 7. Emprendimientos (Vitrina)
CREATE TABLE entrepreneurships (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT, -- Micromedio, Agencia, Productora
    founder TEXT,
    location TEXT,
    specialty TEXT,
    image_url TEXT,
    description TEXT,
    report_content JSONB,
    report_author TEXT,
    report_date TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Comunicados de Prensa (Periodistas en Acción)
CREATE TABLE press_releases (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    institution TEXT,
    author TEXT,
    date_published TEXT,
    image_url TEXT,
    summary TEXT,
    report_content JSONB,
    report_author TEXT,
    report_date TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 9. Foco ONG
CREATE TABLE ngo_spotlights (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    institution TEXT,
    author TEXT,
    date_published TEXT,
    image_url TEXT,
    summary TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 10. Tips de Emprendimiento
CREATE TABLE entrepreneurship_tips (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    expert_name TEXT,
    expert_title TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- III. MÓDULO LABORAL Y TALENTO
-- ==========================================

-- 11. Oportunidades Laborales
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    type TEXT, -- Completo, Parcial, Freelance
    area TEXT, -- Prensa, TV, Radio, Digital
    date_posted TEXT,
    logo_url TEXT,
    description TEXT,
    apply_email TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 12. Perfiles de Talento
CREATE TABLE talent_profiles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT,
    title TEXT,
    skills TEXT[],
    availability TEXT,
    expected_salary TEXT,
    region TEXT,
    linkedin_url TEXT,
    experience_years INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 13. Servicios Freelance
CREATE TABLE freelance_services (
    id SERIAL PRIMARY KEY,
    service TEXT NOT NULL,
    provider TEXT,
    category TEXT,
    rate TEXT,
    image_url TEXT,
    description TEXT,
    portfolio_url TEXT,
    rating_average DECIMAL(3, 1),
    rating_count INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 14. Colaboraciones Cortas
CREATE TABLE short_collaborations (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    deadline TEXT,
    budget TEXT,
    author TEXT,
    author_avatar_url TEXT,
    whatsapp_contact TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- IV. MÓDULO FORMACIÓN Y EVENTOS
-- ==========================================

-- 15. Cursos y Capacitación
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    level TEXT,
    format TEXT,
    cost TEXT,
    rating DECIMAL(3, 1),
    review_count INTEGER,
    image_url TEXT,
    description TEXT,
    instructor_name TEXT,
    instructor_title TEXT,
    instructor_avatar_url TEXT,
    duration TEXT,
    topics TEXT[],
    enrollment_start_date DATE,
    enrollment_end_date DATE,
    course_start_date DATE,
    course_end_date DATE,
    access_link TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 16. Eventos
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date_display TEXT,
    full_date TEXT,
    location TEXT,
    type TEXT,
    link TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- V. MÓDULO OPORTUNIDADES Y RECURSOS
-- ==========================================

-- 17. Oportunidades de Financiamiento (Fondos, Becas)
CREATE TABLE funding_opportunities (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT,
    deadline TEXT,
    type TEXT, -- Fondo, Beca, Premio
    link TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 18. Recursos (Herramientas, Guías)
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    link TEXT,
    type TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- VI. MÓDULO MULTIMEDIA
-- ==========================================

-- 19. Fotoperiodismo
CREATE TABLE photojournalism_posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT,
    caption TEXT,
    photographer_name TEXT,
    photographer_avatar_url TEXT,
    date_taken TEXT,
    whatsapp_contact TEXT,
    date_added TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 20. Galería Fotográfica Compartida
CREATE TABLE shareable_photos (
    id SERIAL PRIMARY KEY,
    image_url TEXT,
    caption TEXT,
    photographer_name TEXT,
    photographer_avatar_url TEXT,
    whatsapp_contact TEXT,
    keywords TEXT[],
    date_added DATE,
    text_color TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 21. Videos Promocionales
CREATE TABLE promo_videos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 22. Avisos Comunitarios (Clasificados)
CREATE TABLE community_ads (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    author_name TEXT,
    author_avatar_url TEXT,
    whatsapp_contact TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- VII. MÓDULO COMUNIDAD Y LEGAL
-- ==========================================

-- 23. Publicaciones de Comunidad (Muro)
CREATE TABLE community_posts (
    id SERIAL PRIMARY KEY,
    author_name TEXT,
    author_avatar_url TEXT,
    post_title TEXT,
    post_url TEXT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 24. Especialistas (Fuentes Expertas)
CREATE TABLE specialists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    image_url TEXT,
    specialty_description TEXT,
    whatsapp_contact TEXT,
    date_added DATE,
    text_color TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 25. Sponsors Premium
CREATE TABLE premium_sponsors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    image_url TEXT,
    cta_text TEXT,
    cta_link TEXT,
    name_color TEXT,
    cta_color TEXT,
    report_content JSONB,
    report_author TEXT,
    report_date TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 26. Anuncios Patrocinados (Sidebar)
CREATE TABLE sponsored_ads (
    id SERIAL PRIMARY KEY,
    image_url TEXT,
    title TEXT,
    advertiser TEXT,
    cta_text TEXT,
    cta_link TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 27. Anuncios Especiales (Legal, Emprendimiento)
CREATE TABLE special_ads (
    id TEXT PRIMARY KEY, -- 'legal', 'entrepreneurship'
    title TEXT NOT NULL,
    description TEXT,
    cta_text TEXT
);

-- 28. Temas Legales y FAQs
CREATE TABLE legal_topics (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
);

CREATE TABLE legal_faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT
);


-- ==========================================
-- VIII. POBLAMIENTO INICIAL DE DATOS (SEEDING)
-- ==========================================

-- Users
INSERT INTO usuario (first_name, last_name, region, email, password_hash)
VALUES 
('Admin', 'User', 'Metropolitana', 'admin@cipress.cl', 'hash_password_seguro'),
('Periodista', 'Demo', 'Valparaíso', 'demo@cipress.cl', 'hash_password_seguro');

-- Hero Heading
INSERT INTO hero_heading (main_text, highlighted_text, sub_text, featured_label, text_color)
VALUES ('El periodismo chileno está', 'emprendiendo', 'Únete al Círculo de Periodistas Emprendedores e Innovadores de Chile', 'Emprendimiento de la Semana', '#FFFFFF');

-- Site Stats
INSERT INTO site_stats (id, label, end_value, prefix) VALUES
('subscribers', 'suscritos entre los 18 y 64 años de edad', 10000, '+ de '),
('visits', 'Visitas Diarias', 6500, NULL),
('regions', 'Regiones de Chile presentes entre suscritos y usuarios, diariamente', 16, NULL);

-- App Config
INSERT INTO app_config (key, value) VALUES ('rotation_interval', '1');

-- Courses
INSERT INTO courses (title, category, level, format, cost, rating, review_count, image_url, description, instructor_name, instructor_title, instructor_avatar_url, duration, topics, enrollment_start_date, enrollment_end_date, course_start_date, course_end_date, access_link)
VALUES
('Periodismo de Datos: De Cero a Experto', 'Periodismo de Datos', 'Básico', 'Video', '$45.000 CLP', 4.9, 123, 'https://picsum.photos/seed/course1/1200/800', 'Sumérgete en el mundo del periodismo de datos.', 'Isidora Paz', 'Periodista de Datos, La Pública', 'https://i.pravatar.cc/80?u=isidora', '6 Semanas', ARRAY['Introducción', 'Web Scraping', 'Limpieza', 'Visualización'], '2024-07-01', '2024-07-31', '2024-08-05', '2024-09-13', '#');

-- Jobs
INSERT INTO jobs (title, company, location, type, area, date_posted, logo_url, description, apply_email)
VALUES
('Periodista de Investigación', 'CIPER Chile', 'Santiago', 'Completo', 'Prensa', 'Hace 2 días', 'https://picsum.photos/seed/logo1/100/100', 'Buscamos a un periodista riguroso.', 'postulaciones@ciperchile.cl');

-- Entrepreneurships
INSERT INTO entrepreneurships (name, type, founder, location, specialty, image_url, description, report_content, report_author, report_date)
VALUES
('La Pública', 'Micromedio', 'Ana González', 'Santiago', 'Investigación', 'https://picsum.photos/seed/public-square-life/1200/800', 'Medio digital enfocado en investigación.', '[{"type": "paragraph", "text": "En un ecosistema..."}]'::JSONB, 'Catalina Riquelme', '18 de Julio, 2024');

-- Special Ads
INSERT INTO special_ads (id, title, description, cta_text) VALUES
('legal', 'Asesoría Legal y Ética', 'Recurso exclusivo sobre protección de fuentes.', 'Consultar Beneficio'),
('entrepreneurship', '¿Quieres emprender un negocio?', 'Te asesoramos con iniciación de actividades.', 'Saber Más');

-- (Se añadirían el resto de los inserts de la misma manera que en el archivo anterior, cubriendo todas las tablas creadas)
-- Inserts parciales completos para validar esquema:
INSERT INTO partner_logos (name, logo_url, website_url) VALUES ('Colegio de Periodistas', 'https://www.colegiodeperiodistas.cl/logo.png', 'https://www.colegiodeperiodistas.cl/');
INSERT INTO news_articles (title, category) VALUES ('La IA Generativa', 'Tecnología');
INSERT INTO press_releases (title, institution) VALUES ('Gobierno Regional Lanza Plataforma', 'GORE RM');
INSERT INTO ngo_spotlights (title, institution) VALUES ('Reportaje ganador', 'Fundación Terram');
INSERT INTO entrepreneurship_tips (title, expert_name) VALUES ('Marca Personal', 'Ana González');
INSERT INTO talent_profiles (name, title) VALUES ('Javiera Latorre', 'Periodista de datos');
INSERT INTO freelance_services (service, provider) VALUES ('Redacción SEO', 'Camila Rojas');
INSERT INTO short_collaborations (title, author) VALUES ('Periodista evento', 'Agencia Comms');
INSERT INTO funding_opportunities (title, type) VALUES ('Fondo de Medios', 'Fondo');
INSERT INTO resources (name, type) VALUES ('Flourish', 'Herramienta');
INSERT INTO photojournalism_posts (title, photographer_name) VALUES ('El Espejo Roto', 'Ignacio Paredes');
INSERT INTO shareable_photos (caption, photographer_name) VALUES ('Protestas', 'Javiera Latorre');
INSERT INTO promo_videos (title) VALUES ('Por qué unirte');
INSERT INTO community_ads (title, category) VALUES ('Vendo cámara', 'Venta');
INSERT INTO community_posts (author_name, post_title) VALUES ('Javiera Latorre', 'The Guardian model');
INSERT INTO specialists (name, title) VALUES ('Dra. Carolina Vera', 'Climatóloga');
INSERT INTO premium_sponsors (name, tagline) VALUES ('Tech Solutions', 'Transformación digital');
INSERT INTO sponsored_ads (title, advertiser) VALUES ('Transcripciones', 'Verbo.AI');
INSERT INTO legal_topics (title) VALUES ('Protección de Fuentes');
