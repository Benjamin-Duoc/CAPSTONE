# Configuración de Variables de Entorno

Este documento explica cómo el sistema CIPRESS utiliza variables de entorno para configurar diferentes ambientes (desarrollo y producción).

## 📁 Estructura de Archivos de Configuración

### Frontend (project/)
- `.env.development` - Variables para ambiente de desarrollo
- `.env.production` - Variables para ambiente de producción

### Backend (backend/)
- `.env.development` - Variables para ambiente de desarrollo
- `.env.production` - Variables para ambiente de producción
- `.env` - Variables por defecto (opcional, para compatibilidad)

## 🔧 Variables de Entorno

### Frontend

#### `.env.development`
```env
VITE_API_URL=http://localhost:5000/backendcipress/api
VITE_MEDIA_URL=http://localhost:5000/backendcipress/media
```

#### `.env.production`
```env
VITE_API_URL=https://www.cipress.cl/backendcipress/api
VITE_MEDIA_URL=https://www.cipress.cl/backendcipress/media
```

### Backend

#### `.env.development`
```env
FLASK_ENV=development
FLASK_DEBUG=True
GEMINI_API_KEY=tu_api_key
SECRET_KEY=dev-key-cipress
DATABASE_URL=sqlite:///cipress.db
HOST=0.0.0.0
PORT=5000
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
MEDIA_FOLDER=media
UPLOAD_FOLDER=media/uploads
```

#### `.env.production`
```env
FLASK_ENV=production
FLASK_DEBUG=False
GEMINI_API_KEY=tu_api_key
SECRET_KEY=CAMBIAR_ESTO_POR_UNA_CLAVE_SEGURA
DATABASE_URL=sqlite:///cipress.db
HOST=0.0.0.0
PORT=5000
CORS_ORIGINS=https://www.cipress.cl,https://cipress.cl
MEDIA_FOLDER=media
UPLOAD_FOLDER=media/uploads
```

## 🚀 Cómo Ejecutar en Diferentes Ambientes

### Desarrollo

#### Frontend
```bash
cd project
npm run dev
```
Esto automáticamente carga `.env.development` y usa el proxy de Vite para redirigir las peticiones API.

#### Backend
```bash
cd backend
./run-dev.sh
# O manualmente:
export FLASK_ENV=development
python run.py
```

### Producción

#### Frontend
```bash
cd project
npm run build
```
Esto crea una build de producción usando las variables de `.env.production`.

Para previsualizar:
```bash
npm run preview
```

#### Backend
```bash
cd backend
./run-prod.sh
# O manualmente:
export FLASK_ENV=production
python run.py
```

## 🔄 Cómo Funciona

### Frontend

1. **Vite** detecta automáticamente el modo (`development` o `production`)
2. Carga el archivo `.env.{mode}` correspondiente
3. Las variables con prefijo `VITE_` están disponibles en el código mediante `import.meta.env`
4. El módulo `src/config/env.ts` centraliza el acceso a estas variables

#### Uso en el código:
```typescript
import { ENV, getMediaUrl, getApiUrl } from '@/src/config/env';

// Obtener URL completa de una imagen
const imageUrl = getMediaUrl('images/logo.png');
// Resultado en desarrollo: http://localhost:5000/backendcipress/media/images/logo.png
// Resultado en producción: https://www.cipress.cl/backendcipress/media/images/logo.png

// Verificar ambiente
if (ENV.isDevelopment) {
  console.log('Estamos en desarrollo');
}
```

### Backend

1. **Flask** lee la variable de entorno `FLASK_ENV`
2. Carga el archivo `.env.{FLASK_ENV}` correspondiente
3. La clase `Config` en `app/config.py` lee todas las variables
4. La aplicación se configura automáticamente según el ambiente

#### Características por ambiente:

**Desarrollo:**
- Debug activado
- CORS permite localhost
- Logs detallados
- Recarga automática de código

**Producción:**
- Debug desactivado
- CORS solo permite dominios específicos
- Logs mínimos
- Optimizaciones de rendimiento

## 📝 Notas Importantes

### Seguridad

⚠️ **NUNCA** subir archivos `.env` a Git con información sensible.

Los archivos `.env.development` y `.env.production` están incluidos en el repositorio con valores de ejemplo. Para producción real:

1. Cambiar `SECRET_KEY` por una clave segura y aleatoria
2. Proteger las API keys
3. Configurar CORS solo para dominios autorizados

### Proxy en Desarrollo

En desarrollo, Vite actúa como proxy:
- Peticiones a `/api/*` → `http://localhost:5000/backendcipress/api/*`
- Peticiones a `/backendcipress/media/*` → `http://localhost:5000/backendcipress/media/*`

Esto evita problemas de CORS durante el desarrollo.

### Build de Producción

Al hacer build del frontend:
```bash
npm run build
```

Vite:
1. Lee `.env.production`
2. Reemplaza todas las referencias a `import.meta.env.VITE_*` con los valores reales
3. Genera archivos estáticos optimizados en `dist/`

Estos archivos pueden ser servidos por cualquier servidor web (Nginx, Apache, etc.)

## 🔍 Troubleshooting

### El frontend no encuentra el backend

1. Verificar que las URLs en `.env.{mode}` sean correctas
2. En desarrollo, verificar que el backend esté corriendo en el puerto 5000
3. Revisar la configuración del proxy en `vite.config.ts`

### Errores de CORS

1. Verificar que `CORS_ORIGINS` en el backend incluya el origen del frontend
2. En desarrollo: `http://localhost:3000`
3. En producción: `https://www.cipress.cl`

### Las imágenes no se cargan

1. Verificar que `VITE_MEDIA_URL` apunte al servidor correcto
2. Verificar que la carpeta `backend/media` exista y tenga los archivos
3. Verificar que el backend esté sirviendo archivos en `/backendcipress/media/`

### Variables de entorno no se actualizan

1. **Frontend**: Reiniciar el servidor de desarrollo (`npm run dev`)
2. **Backend**: Reiniciar el servidor Python
3. Limpiar caché si es necesario: `rm -rf node_modules/.vite`

## 📚 Referencias

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Flask Configuration](https://flask.palletsprojects.com/en/2.3.x/config/)
- [python-dotenv](https://github.com/theskumar/python-dotenv)
