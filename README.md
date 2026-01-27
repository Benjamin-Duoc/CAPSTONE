<div align="center">
  <img width="1200" height="475" alt="CiPress Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # CiPress

### Círculo de Periodistas Emprendedores e Innovadores de Chile

  [![Status](https://img.shields.io/badge/Status-En_Desarrollo-orange.svg)](#)
  [![Tech](https://img.shields.io/badge/Powered_by-Google_AI_Studio-blue.svg)](#)
  [![Java](https://img.shields.io/badge/Backend-Spring%20Boot-green)](https://spring.io/)
  [![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)

</div>

---

## 📝 Descripción

**CiPress** es una plataforma digital y ecosistema colaborativo diseñado para fortalecer el periodismo chileno. El proyecto integra emprendimiento, innovación y formación continua en un solo entorno técnico, proporcionando vitrinas profesionales y servicios especializados.

Este repositorio contiene la aplicación web desarrollada con el apoyo de **Google AI Studio** y la base técnica necesaria para su ejecución local y escalabilidad.

### 🚀 Acceso Rápido (Demo)

Puedes interactuar con la versión actual de la aplicación en Google AI Studio (requiere inicio de sesión):
👉 [Ver App en Google AI Studio](https://ai.studio/apps/drive/1ISewGcsASRLAj8l45epNgKhCBXQzNIiL)

---

## 🏗️ Alcance y Módulos

CiPress funciona como un hub integral que incluye los siguientes componentes:

* **📰 Editorial:** Portada con "Emprendimiento de la Semana" y análisis periodístico.
* **💼 Laboral:** Bolsa de trabajo, banco de talentos y servicios freelance.
* **🚀 Oportunidades:** Directorio de fondos, becas y agenda de eventos.
* **📸 Multimedia:** Galería de foto-periodismo y avisos clasificados.
* **👥 Comunidad:** Capacitación técnica, foros de actividad y sistema de suscripción (Free, Premium, Corporativo).

---

## 🛠️ Guía de Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.

### 1. Requisitos Previos

Asegúrate de tener instalado el siguiente software:

* **Java JDK 17** o superior.
* **Maven 3.8** o superior (para construir el backend).
* **Node.js 18** o superior (incluye npm).
* **PostgreSQL 14** o superior.

### 2. Configuración de la Base de Datos

El proyecto utiliza PostgreSQL.

1. **Crear Base de Datos:** Abre tu gestor (pgAdmin, DBeaver) y crea una base de datos vacía llamada `cipress_db`.
2. **Configurar Credenciales:** Abre el archivo `backend/src/main/resources/application.properties` y modifica las siguientes líneas:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cipress_db
spring.datasource.username=TU_USUARIO        <-- Reemplazar con tu usuario
spring.datasource.password=TU_CONTRASEÑA     <-- Reemplazar con tu clave
spring.jpa.hibernate.ddl-auto=update         <-- IMPORTANTE: Mantener en 'update'
```

### 3. Variables de Entorno (Frontend)

Crea un archivo llamado `.env.local` en la carpeta raíz del proyecto y añade tu API Key de Gemini:

```bash
GEMINI_API_KEY=tu_clave_aqui
```

### 4. Iniciar el Backend (Spring Boot)

El backend incluye un sistema de **"Auto-Seeding"**. La primera vez, detectará que la base de datos está vacía y creará automáticamente los datos de prueba.

Abre una terminal y ve a la carpeta del backend:

```bash
cd backend
```

Ejecuta el servidor:

```bash
mvn spring-boot:run
```

**Confirmación:** Espera el mensaje `⚡ DataSeeder: Empty database detected...` o logs indicando que inició en el puerto 8080.

### 5. Iniciar el Frontend (React)

Abre una nueva terminal en la raíz del proyecto.

Instala dependencias (solo la primera vez):

```bash
npm install
```

Inicia la aplicación:

```bash
npm run dev
```

Abre tu navegador en: [http://localhost:5173](http://localhost:5173)

---

## 🆘 Solución de Problemas Comunes

| Problema                                 | Solución                                                                                                                   |
| :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **"Connection refused" (Backend)** | Verifica que el servicio de PostgreSQL esté corriendo y que las credenciales en `application.properties` sean correctas. |
| **Datos no cargan en la web**      | Asegúrate de que la terminal del Backend siga corriendo sin errores. Recarga la página web (F5).                          |
| **Reiniciar datos de prueba**      | Borra la base de datos `cipress_db` o sus tablas, reinicia el Backend y el DataSeeder regenerará todo automáticamente.  |

---

## 📂 Documentación y Recursos

La carpeta `/docs` centraliza la información técnica y estratégica:

* Requerimientos, perfiles de usuario y diagramas de arquitectura.
* Videos explicativos sobre ejecución en VSCode e integración de API Keys.

### Recursos Externos:

* 📚 [Capacitaciones Triskeledu](https://drive.google.com/open?id=1fzHEnogxmpAsyVEF6oz1IJBLUt3H7yUq&usp=drive_fs) (Material de apoyo y videos).

---

## 👥 Equipo de Desarrollo (Práctica DUOC UC)

| Nombre                      | Correo                | Teléfono       | Tipo de Práctica | Periodo             |
| :-------------------------- | :-------------------- | :-------------- | :---------------- | :------------------ |
| **Benjamín Véliz**  | benj.veliz@duocuc.cl  | +56 9 4463 8983 | Profesional       | 15/12/25 - 24/03/26 |
| **Benjamín Morales** | be.moraleso@duocuc.cl | +56 9 4744 0200 | Laboral           | 17/12/25 - 06/02/26 |
| **Luis Galdames**     | lu.galdames@duocuc.cl | +56 9 4497 1517 | Profesional       | 15/12/25 - 03/03/26 |
| **Sofía Gómez**     | so.gomezg@duocuc.cl   | +56 9 8220 9357 | Laboral           | 05/01/25 - 23/02/26 |

---

## 🎓 Contexto y Licencia

### Contexto Académico:

Este proyecto ha sido desarrollado en el marco de las prácticas académicas del **Instituto Profesional DUOC UC**. Integra formación en interfaces gráficas modernas, desarrollo web con IA y plataformas de impacto social.

> **Nota:** El día 23/01/2026 se realizó capacitación de Antigravity.

### ⚖️ Licencia:

Este repositorio es de carácter **académico y experimental**.
Los contenidos, marca y lineamientos editoriales pertenecen exclusivamente a **CiPress**.

**© 2026 – Círculo de Periodistas Emprendedores e Innovadores de Chile.** Todos los derechos reservados.
