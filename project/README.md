<div align="center">
  <img width="1200" height="475" alt="CiPress Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # CiPress

### Círculo de Periodistas Emprendedores e Innovadores de Chile

  [![Status](https://img.shields.io/badge/Status-En_Desarrollo-orange.svg)](#)
  [![Tech](https://img.shields.io/badge/Powered_by-Google_AI_Studio-blue.svg)](#)
  [![Python](https://img.shields.io/badge/Backend-Flask-green)](https://flask.palletsprojects.com/)
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

* **Python 3.8** o superior.
* **Node.js 18** o superior (incluye npm).
* **Git**.

### 2. Configuración del Backend (Flask)

1.  Navega a la carpeta del backend:
    ```bash
    cd backend_flask
    ```

2.  Crea un entorno virtual:
    ```bash
    python3 -m venv venv
    ```

3.  Activa el entorno virtual:
    *   **Linux/Mac:** `source venv/bin/activate`
    *   **Windows:** `venv\Scripts\activate`

4.  Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```

5.  Ejecuta el servidor:
    ```bash
    python run.py
    ```
    El servidor iniciará en `http://localhost:5000`.
    *Nota: La primera ejecución creará automáticamente la base de datos SQLite `cipress.db` y cargará datos de prueba.*

### 3. Configuración del Frontend (React)

1.  Abre una **nueva** terminal en la raíz del proyecto.

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Crea un archivo `.env.local` en la raíz (opcional, para integración Gemini):
    ```
    GEMINI_API_KEY=tu_clave_aqui
    ```

4.  Inicia la aplicación:
    ```bash
    npm run dev
    ```

5.  Abre tu navegador en: [http://localhost:5173](http://localhost:5173)

---

## 🆘 Solución de Problemas Comunes

| Problema | Solución |
| :--- | :--- |
| **Backend no inicia** | Verifica que tengas Python instalado y el entorno virtual activado. Asegúrate de instalar las dependencias con `pip install -r requirements.txt`. |
| **Error de conexión en Frontend** | Asegúrate de que el backend esté corriendo en el puerto 5000 (`http://localhost:5000`) y que el frontend tenga configurado el proxy en `vite.config.ts`. |
| **Base de datos bloqueada** | Si usas SQLite, asegúrate de no tener múltiples instancias del backend corriendo o herramientas externas bloqueando el archivo `cipress.db`. |

---

## 📂 Documentación y Recursos

La carpeta `/docs` centraliza la información técnica y estratégica:

* Requerimientos, perfiles de usuario y diagramas de arquitectura.
* Videos explicativos sobre ejecución en VSCode e integración de API Keys.

### Recursos Externos:

* 📚 [Capacitaciones Triskeledu](https://drive.google.com/open?id=1fzHEnogxmpAsyVEF6oz1IJBLUt3H7yUq&usp=drive_fs) (Material de apoyo y videos).

---

## 👥 Equipo de Desarrollo (Práctica DUOC UC)

| Nombre | Correo | Teléfono | Tipo de Práctica | Periodo |
| :--- | :--- | :--- | :--- | :--- |
| **Benjamín Véliz** | benj.veliz@duocuc.cl | +56 9 4463 8983 | Profesional | 15/12/25 - 24/03/26 |
| **Benjamín Morales** | be.moraleso@duocuc.cl | +56 9 4744 0200 | Laboral | 17/12/25 - 06/02/26 |
| **Luis Galdames** | lu.galdames@duocuc.cl | +56 9 4497 1517 | Profesional | 15/12/25 - 03/03/26 |
| **Sofía Gómez** | so.gomezg@duocuc.cl | +56 9 8220 9357 | Laboral | 05/01/25 - 23/02/26 |

---

## 🎓 Contexto y Licencia

### Contexto Académico:

Este proyecto ha sido desarrollado en el marco de las prácticas académicas del **Instituto Profesional DUOC UC**. Integra formación en interfaces gráficas modernas, desarrollo web con IA y plataformas de impacto social.

> **Nota:** El día 23/01/2026 se realizó capacitación de Antigravity.

### ⚖️ Licencia:

Este repositorio es de carácter **académico y experimental**.
Los contenidos, marca y lineamientos editoriales pertenecen exclusivamente a **CiPress**.

**© 2026 – Círculo de Periodistas Emprendedores e Innovadores de Chile.** Todos los derechos reservados.
