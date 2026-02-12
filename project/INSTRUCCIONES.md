# GUÍA DE INSTALACIÓN Y PUESTA EN MARCHA - CIPRESS

Este documento contiene las instrucciones paso a paso para configurar y ejecutar el proyecto CiPress en un entorno local. Diseñado para nuevos desarrolladores.

## 📋 1. Requisitos Previos

Asegúrate de tener instalado el siguiente software en tu equipo:

*   **Python 3.8** o superior.
*   **Node.js 18** o superior (incluye npm).
*   **Git**.

## 🗄️ 2. Configuración de la Base de Datos

El proyecto ahora utiliza **SQLite** por defecto, lo que simplifica la configuración inicial ya que no requiere un servidor de base de datos externo. La base de datos se creará automáticamente como un archivo `cipress.db` la primera vez que inicies el backend.

## ⚙️ 3. Iniciar el Backend (Flask)

El backend incluye un sistema de inicialización automática.

1.  Abre una terminal y navega a la carpeta `backend_flask`:
    ```bash
    cd backend_flask
    ```

2.  Crea un entorno virtual (recomendado):
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

6.  **Confirmación de Éxito:**
    Espera a que termine de cargar. Deberías ver logs indicando que el servidor inició en `http://127.0.0.1:5000` y el mensaje `Debugger is active!`.

## 💻 4. Iniciar el Frontend (React)

1.  Abre una **nueva** terminal (mantén la del backend corriendo) y ve a la raíz del proyecto.

2.  Instala las dependencias (solo necesario la primera vez):
    ```bash
    npm install
    ```

3.  Inicia la aplicación web:
    ```bash
    npm run dev
    ```

4.  Abre tu navegador y ve a: [http://localhost:5173](http://localhost:5173)

---

## 🆘 Solución de Problemas Comunes

*   **Backend no inicia:**
    *   Verifica que hayas activado el entorno virtual (`source venv/bin/activate`).
    *   Asegúrate de haber instalado todas las dependencias (`pip install -r requirements.txt`).

*   **Error: Datos no cargan en la web:**
    *   Asegúrate de que el Backend siga corriendo en la otra terminal (puerto 5000).
    *   Recarga la página web.

*   **Reiniciar los datos de prueba:**
    *   Si deseas reiniciar todo desde cero: Detén el backend, elimina el archivo `cipress.db` dentro de `backend_flask`, y vuelve a ejecutar `python run.py`. El sistema volverá a crear la base de datos con los datos iniciales.
