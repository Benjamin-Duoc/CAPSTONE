# 🚀 GUÍA RÁPIDA - Configuración de Entornos

## ⚡ Inicio Rápido

### Desarrollo
```bash
# Terminal 1 - Backend
cd backend
./run-dev.sh

# Terminal 2 - Frontend  
cd project
npm run dev
```

### Producción
```bash
# Backend
cd backend
./run-prod.sh

# Frontend (build)
cd project
npm run build
```

## 📝 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `project/.env.development` | Variables frontend desarrollo |
| `project/.env.production` | Variables frontend producción |
| `backend/.env.development` | Variables backend desarrollo |
| `backend/.env.production` | Variables backend producción |
| `project/src/config/env.ts` | Módulo de configuración frontend |
| `backend/app/config.py` | Módulo de configuración backend |

## 🔧 Variables Clave

### Frontend
```env
VITE_API_URL=http://localhost:5000/backendcipress/api
VITE_MEDIA_URL=http://localhost:5000/backendcipress/media
```

### Backend
```env
FLASK_ENV=development
FLASK_DEBUG=True
CORS_ORIGINS=http://localhost:3000
```

## 💻 Uso en Código

### Obtener URL de imagen
```typescript
import { getImageUrl } from '@/utils/mediaUtils';

<img src={getImageUrl('images/logo.png')} />
```

### Verificar ambiente
```typescript
import { ENV } from '@/src/config/env';

if (ENV.isDevelopment) {
  console.log('Desarrollo');
}
```

## 🔍 Verificación
```bash
./test-env-config.sh
```

## 📚 Documentación Completa
- `CONFIGURACION_ENTORNOS.md` - Guía completa
- `ARQUITECTURA_ENTORNOS.md` - Diagramas
- `COMPLETADO_ENTORNOS.md` - Estado del proyecto

## ⚠️ Recordatorios
- ✅ Reiniciar servidores al cambiar `.env`
- ✅ En producción, cambiar `SECRET_KEY`
- ✅ No subir `.env` con credenciales a Git
