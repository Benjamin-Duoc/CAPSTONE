# Arquitectura de Configuración de Entornos

## Flujo de Desarrollo

```
┌─────────────────────────────────────────────────────────────────┐
│                         DESARROLLO                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │   Frontend       │              │    Backend       │        │
│  │  localhost:3000  │◄────────────►│  localhost:5000  │        │
│  └──────────────────┘              └──────────────────┘        │
│          │                                   │                  │
│          │ Lee                              │ Lee              │
│          ▼                                   ▼                  │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │ .env.development │              │ .env.development │        │
│  ├──────────────────┤              ├──────────────────┤        │
│  │ VITE_API_URL=    │              │ FLASK_ENV=dev    │        │
│  │ localhost:5000   │              │ FLASK_DEBUG=True │        │
│  │ VITE_MEDIA_URL=  │              │ CORS_ORIGINS=    │        │
│  │ localhost:5000   │              │ localhost:3000   │        │
│  └──────────────────┘              └──────────────────┘        │
│          │                                   │                  │
│          │ Usa                              │ Usa              │
│          ▼                                   ▼                  │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │ src/config/env.ts│              │  app/config.py   │        │
│  │ - getMediaUrl()  │              │  - Config class  │        │
│  │ - getApiUrl()    │              │  - CORS setup    │        │
│  │ - ENV object     │              │  - Media routes  │        │
│  └──────────────────┘              └──────────────────┘        │
│          │                                   │                  │
│          └───────────────┬───────────────────┘                  │
│                          │                                      │
│                          ▼                                      │
│                  ┌───────────────┐                             │
│                  │  Vite Proxy   │                             │
│                  │  /api → :5000 │                             │
│                  │  /media→:5000 │                             │
│                  └───────────────┘                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Flujo de Producción

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCCIÓN                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │   Frontend       │              │    Backend       │        │
│  │ cipress.cl    │◄────────────►│  cipress.cl   │        │
│  │   (build/dist)   │              │     :5000        │        │
│  └──────────────────┘              └──────────────────┘        │
│          │                                   │                  │
│          │ Lee (build time)                │ Lee              │
│          ▼                                   ▼                  │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │ .env.production  │              │ .env.production  │        │
│  ├──────────────────┤              ├──────────────────┤        │
│  │ VITE_API_URL=    │              │ FLASK_ENV=prod   │        │
│  │ cipress.cl/   │              │ FLASK_DEBUG=False│        │
│  │   backendcipress │              │ CORS_ORIGINS=    │        │
│  │ VITE_MEDIA_URL=  │              │ cipress.cl    │        │
│  │ cipress.cl/   │              └──────────────────┘        │
│  │   backendcipress │                       │                  │
│  └──────────────────┘                       │                  │
│          │                                   │                  │
│          │ Compilado en                    │ Usa              │
│          ▼                                   ▼                  │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │  dist/assets/    │              │  app/config.py   │        │
│  │  (URLs fijas)    │              │  - Config class  │        │
│  │                  │              │  - CORS setup    │        │
│  └──────────────────┘              │  - Media routes  │        │
│                                     └──────────────────┘        │
│                                              │                  │
│                                              ▼                  │
│                                     ┌──────────────────┐        │
│                                     │ Sirve archivos   │        │
│                                     │ /backendcipress/ │        │
│                                     │   media/         │        │
│                                     └──────────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Estructura de Archivos

```
cipress/
├── project/                          # Frontend
│   ├── .env.development             # ✅ Variables de desarrollo
│   ├── .env.production              # ✅ Variables de producción
│   ├── src/
│   │   └── config/
│   │       └── env.ts               # ✅ Módulo de configuración
│   ├── utils/
│   │   ├── db.ts                    # ✅ Modificado para usar ENV
│   │   └── mediaUtils.ts            # ✅ Utilidades de media
│   └── vite.config.ts               # ✅ Configuración de Vite
│
├── backend/                          # Backend
│   ├── .env.development             # ✅ Variables de desarrollo
│   ├── .env.production              # ✅ Variables de producción
│   ├── .env                         # (Opcional) Valores por defecto
│   ├── app/
│   │   ├── __init__.py              # ✅ Modificado con ruta media
│   │   └── config.py                # ✅ Sistema de configuración
│   ├── run.py                       # ✅ Modificado para usar config
│   ├── run-dev.sh                   # ✅ Script de desarrollo
│   └── run-prod.sh                  # ✅ Script de producción
│
└── docs/
    ├── CONFIGURACION_ENTORNOS.md    # ✅ Documentación completa
    ├── CAMBIOS_ENTORNOS.md          # ✅ Resumen de cambios
    ├── COMPLETADO_ENTORNOS.md       # ✅ Estado de completado
    └── test-env-config.sh           # ✅ Script de verificación
```

## Flujo de Datos - Carga de Imagen

### Desarrollo
```
Componente React
    │
    ├─► getImageUrl('images/logo.png')
    │       │
    │       ├─► ENV.mediaUrl = 'http://localhost:5000/backendcipress/media'
    │       │
    │       └─► Retorna: 'http://localhost:5000/backendcipress/media/images/logo.png'
    │
    └─► <img src="http://localhost:5000/backendcipress/media/images/logo.png" />
            │
            ├─► Vite Proxy intercepta
            │       │
            │       └─► Redirige a: localhost:5000/backendcipress/media/images/logo.png
            │
            └─► Flask Backend
                    │
                    └─► Sirve: backend/media/images/logo.png
```

### Producción
```
Componente React (compilado)
    │
    └─► <img src="https://www.cipress.cl/backendcipress/media/images/logo.png" />
            │
            └─► Petición directa al servidor
                    │
                    └─► Flask Backend
                            │
                            └─► Sirve: backend/media/images/logo.png
```

## Variables de Entorno - Tabla Comparativa

| Aspecto | Desarrollo | Producción |
|---------|-----------|------------|
| **Frontend URL** | `http://localhost:3000` | `https://www.cipress.cl` |
| **Backend URL** | `http://localhost:5000` | `https://www.cipress.cl` |
| **API Endpoint** | `/api` (proxy) | `https://www.cipress.cl/backendcipress/api` |
| **Media URL** | `/backendcipress/media` (proxy) | `https://www.cipress.cl/backendcipress/media` |
| **CORS Origins** | `localhost:3000` | `cipress.cl` |
| **Debug Mode** | ✅ Activado | ❌ Desactivado |
| **Hot Reload** | ✅ Activado | ❌ Desactivado |
| **Proxy Vite** | ✅ Activo | ❌ No usado |

## Comandos Rápidos

```bash
# Verificar configuración
./test-env-config.sh

# Desarrollo - Backend
cd backend && ./run-dev.sh

# Desarrollo - Frontend
cd project && npm run dev

# Producción - Backend
cd backend && ./run-prod.sh

# Producción - Frontend (build)
cd project && npm run build

# Ver variables de entorno (Frontend)
cat project/.env.development
cat project/.env.production

# Ver variables de entorno (Backend)
cat backend/.env.development
cat backend/.env.production
```

---

**Leyenda:**
- ✅ = Archivo nuevo o modificado
- ◄─► = Comunicación bidireccional
- ─► = Flujo de datos
- │ = Dependencia
