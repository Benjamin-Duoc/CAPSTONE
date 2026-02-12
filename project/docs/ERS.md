# Documento de Especificación de Requerimientos - CiPress

**Empresa**: Triskeledu
**Autor**: Cristián Gómez Vega (Gerente General)
**Fecha inicio**: 01/01/2026
**Actualizado al**: 12/01/2026
**Cliente**: CiPress

## 1. Introducción

CiPress es una plataforma web de periodismo colaborativo y emprendedor, cuyo objetivo es conectar periodistas, medios, empresas y comunidad mediante contenidos editoriales, oportunidades laborales y servicios profesionales, bajo un modelo de roles y suscripciones.

### 1.1 Objetivo general

Construir un portal dinámico de noticias y comunidad periodística donde:
- El contenido se mantenga vivo y actualizado diariamente.
- Parte del contenido sea editorial (controlado por el administrador).
- Parte sea generado por colaboradores externos (gratuitos o pagados).
- Exista un modelo escalable de monetización por suscripción.

## 2. Estructura funcional del sitio

### 1. Tipos de usuarios (perfiles)
- **Administrador**: control total del sitio, portada, secciones editoriales, avisos laborales y moderación.
- **Colaborador**: puede publicar comunicados, fotos, eventos, actividades comunitarias.
- **Cliente**: lo mismo que el gratuito + mayor visibilidad y secciones exclusivas.
- **Empresa**: publica contenidos pagados (noticias auspiciadas, avisos comerciales).

### 2. Secciones principales
(Todas usan una estructura base común: título, bajada, texto, imagen, autor)

**Editorial / Administrador**
- Imagen portada (cambia diariamente)
- Innovación para el periodismo emprendedor (notas internacionales/editoriales)
- Capacitación
- Emprender es mundial (video semanal)
- Apoyan al periodismo emprendedor (Colaborativas)

**Periodistas en acción**
- Actividades para la comunidad
- Agenda / eventos
- Foto-periodismo
- Fuentes destacadas

**Comerciales / Monetización**
- Confían en CiPress (noticias pagadas)
- Avisos comerciales
- Avisos clasificados
- Servicios profesionales (freelance)

**Laboral**
- Oportunidades laborales (ofertas serias, subidas por el administrador)
- Colaboraciones urgentes
- Banco de talentos (perfiles con enlace a LinkedIn → requiere buscador)

### Reglas clave de negocio
- Todo contenido público sigue una plantilla estándar.
- Cada sección define quién puede publicar según perfil.
- El colaborador debe estar registrado para publicar.
- Los contactos siempre dirigen al WhatsApp o datos del colaborador, no al administrador.
- Se requiere una página de planes de suscripción (gratis / premium / empresa).

## 3. Interfaces Gráficas (HomePage)

### Parte 1
- **Encabezado y navegación**: Oportunidades Laborales · Capacitación · Fondos · Galería Fotográfica · Ingresar / Registrarme.
- **Hero / Portada principal**: "El periodismo chileno está emprendiendo" + imagen destacada + "Emprendimiento de la semana".
- **Confían en Cipress**: Noticias de marcas/empresas (Auspiciadas).
- **Innovación para el Periodismo Emprendedor**: Núcleo editorial.
- **Oportunidades Laborales (vitrina)**: Avisos destacados.
- **Colaboraciones Urgentes**: Trabajos rápidos.

### Parte 2
- **Periodistas en Acción**: Comunicados de colaboradores.
- **Capacitación**: Cursos y talleres.
- **Fuentes Destacadas**: Expertos disponibles.

### Parte 3
- **Emprender es Mundial**: Video editorial semanal.
- **Emprendimientos Periodísticos**: Servicios profesionales (Marketplace).
- **Fondos y Becas**: Datos de financiamiento.
- **Actividades de la Comunidad**: Opinión y debates.
- **Próximos Eventos**: Agenda.

### Parte 4
- **Foto-periodismo**: Fotos noticiosas de colaboradores.
- **Avisos Clasificados**: Compra/venta equipos, etc.
- **Contacto Cipress**: Canal abierto.
- **Galería Fotográfica**: Repositorio visual profesional.

### Parte 5
- **Oportunidades Laborales (Bloque Principal)**: Revisar Ofertas, Banco de Talentos, Ofrecer Servicios.
- **Bloque Institucional y Comunidad**: Cifras clave.
- **Suscripción Gratuita**: Llamado al registro.
- **Apoyan al Periodismo Emprendedor**: Logos institucionales.
- **Pie de Página (Footer)**.

## 4. Páginas Individuales
- **Oportunidades Laborales (módulo completo)**: Avisos, Banco de Talentos, Servicios freelance.
- **Suscripciones y Perfiles**: Administrador, Cliente, Colaborador, Empresa.
