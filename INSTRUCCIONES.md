# GUÍA DE INSTALACIÓN Y PUESTA EN MARCHA - CIPRESS

Este documento contiene las instrucciones paso a paso para configurar y ejecutar el proyecto CiPress en un entorno local. Diseñado para nuevos desarrolladores.

## 📋 1. Requisitos Previos

Asegúrate de tener instalado el siguiente software en tu equipo:

*   **Java JDK 17** o superior.
*   **Maven 3.8** o superior (para construir el backend).
*   **Node.js 18** o superior (incluye npm).
*   **PostgreSQL 14** o superior.

## 🗄️ 2. Configuración de la Base de Datos

El proyecto utiliza PostgreSQL. Sigue estos pasos para configurarlo:

1.  **Crear Base de Datos:**
    Abre tu gestor de base de datos (pgAdmin, DBeaver, terminal) y crea una base de datos vacía llamada `cipress_db`.

2.  **Configurar Credenciales:**
    Abre el archivo `backend/src/main/resources/application.properties` en el proyecto.
    Modifica las siguientes líneas con tu usuario y contraseña de PostgreSQL local:

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/cipress_db
    spring.datasource.username=TU_USUARIO       <-- Reemplazar
    spring.datasource.password=TU_CONTRASEÑA    <-- Reemplazar
    spring.jpa.hibernate.ddl-auto=update        <-- IMPORTANTE: Mantenlo en 'update'
    ```

## ⚙️ 3. Iniciar el Backend (Spring Boot)

El backend incluye un sistema de **"Auto-Seeding"**. La primera vez que lo inicies, detectará que la base de datos está vacía y creará automáticamente los usuarios y datos de prueba.

1.  Abre una terminal y navega a la carpeta `backend`:
    ```bash
    cd backend
    ```

2.  Ejecuta el servidor:
    ```bash
    mvn spring-boot:run
    ```

3.  **Confirmación de Éxito:**
    Espera a que termine de cargar. Deberías ver logs indicando que el servidor inició en el puerto 8080.
    *Si es la primera vez, verás el mensaje:* `⚡ DataSeeder: Empty database detected. Initializing default data...`.

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

*   **Error: "Connection refused" en el Backend:**
    *   Verifica que el servicio de PostgreSQL esté corriendo en tu PC.
    *   Revisa que el usuario y contraseña en `application.properties` sean correctos.

*   **Error: Datos no cargan en la web:**
    *   Asegúrate de que el Backend siga corriendo en la otra terminal.
    *   Recarga la página web.

*   **Reiniciar los datos de prueba:**
    *   Si dsea reiniciar todo desde cero: Borra las tablas o la base de datos `cipress_db`, reinicia el Backend, y el `DataSeeder` volverá a crear todo automáticamente.
