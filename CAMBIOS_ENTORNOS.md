# Resumen de Cambios - Configuración de Entornos

## ✅ Cambios Realizados

### Frontend (project/)

1. **Nuevo módulo de configuración**: `src/config/env.ts`
   - Centraliza el acceso a variables de entorno
   - Proporciona funciones helper: `getMediaUrl()`, `getApiUrl()`
   - Detecta automáticamente el ambiente (desarrollo/producción)

2. **Actualización de `vite.config.ts`**:
   - Carga archivos `.env.{mode}` según el ambiente
   - Configura proxy solo en desarrollo
   - Define variables de entorno disponibles en el cliente

3. **Actualización de `utils/db.ts`**:
   - Usa el módulo de configuración para URLs de API
   - Cambia automáticamente entre proxy local y URL de producción

4. **Archivos de entorno**:
   - `.env.development`: Configuración para desarrollo local
   - `.env.production`: Configuración para producción

### Backend (backend/)

1. **Actualización de `app/config.py`**:
   - Soporte para múltiples ambientes (development/production)
   - Carga automática de `.env.{FLASK_ENV}`
   - Configuración de CORS por ambiente
   - Configuración de rutas de media files

2. **Actualización de `app/__init__.py`**:
   - Usa configuración basada en ambiente
   - CORS configurado según el ambiente
   - Nueva ruta para servir archivos media: `/backendcipress/media/<filename>`

3. **Actualización de `run.py`**:
   - Lee configuración del ambiente
   - Muestra información del ambiente al iniciar
   - Usa host, port y debug del archivo de configuración

4. **Scripts de inicio**:
   - `run-dev.sh`: Inicia el backend en modo desarrollo
   - `run-prod.sh`: Inicia el backend en modo producción

5. **Archivos de entorno**:
   - `.env.development`: Configuración para desarrollo
   - `.env.production`: Configuración para producción

## 🎯 Beneficios

1. **Separación clara de ambientes**: Desarrollo y producción tienen configuraciones independientes
2. **Sin hardcoding**: No hay URLs o configuraciones hardcodeadas en el código
3. **Fácil despliegue**: Cambiar de ambiente es tan simple como cambiar una variable
4. **Seguridad mejorada**: Configuraciones sensibles en archivos de entorno
5. **CORS apropiado**: Diferentes orígenes permitidos según el ambiente
6. **Servicio de media files**: Backend sirve archivos de la carpeta media correctamente

## 🚀 Cómo Usar

### Desarrollo

**Frontend:**
```bash
cd project
npm run dev
```

**Backend:**
```bash
cd backend
./run-dev.sh
```

### Producción

**Frontend:**
```bash
cd project
npm run build
npm run preview  # Para previsualizar
```

**Backend:**
```bash
cd backend
./run-prod.sh
```

## 📝 Variables Importantes

### Frontend
- `VITE_API_URL`: URL base de la API
- `VITE_MEDIA_URL`: URL base para archivos media

### Backend
- `FLASK_ENV`: Ambiente (development/production)
- `FLASK_DEBUG`: Activar/desactivar debug
- `CORS_ORIGINS`: Orígenes permitidos para CORS
- `MEDIA_FOLDER`: Carpeta de archivos media
- `SECRET_KEY`: Clave secreta de Flask
- `GEMINI_API_KEY`: API key de Gemini

## 🔍 Verificación

Para verificar que todo funciona correctamente:

1. **Desarrollo**:
   - Frontend debe conectarse a `http://localhost:5000`
   - Las imágenes deben cargarse desde `http://localhost:5000/backendcipress/media/`
   - CORS debe permitir `http://localhost:3000`

2. **Producción**:
   - Frontend debe conectarse a `https://www.cipress.cl/backendcipress/api`
   - Las imágenes deben cargarse desde `https://www.cipress.cl/backendcipress/media/`
   - CORS debe permitir solo `https://www.cipress.cl`

## ⚠️ Importante

1. **No subir archivos .env con datos sensibles a Git**
2. En producción, cambiar `SECRET_KEY` por una clave segura
3. Verificar que las URLs en `.env.production` sean correctas antes de desplegar
4. Los archivos `.env.development` y `.env.production` están en el repositorio como plantillas

## 📚 Documentación Completa

Ver `CONFIGURACION_ENTORNOS.md` para documentación detallada.
