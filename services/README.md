# 🛠️ Servicio de Servicios (`services`)

Este microservicio forma parte del sistema de gestión de citas para **Jardinería Ornamental**. Su propósito es gestionar los servicios que se pueden agendar, como mantenimiento, poda, limpieza, etc.

## 📂 Estructura del Proyecto

services/
├── src/
│ ├── config/
│ │ └── prisma.ts # Configuración del cliente Prisma
│ ├── controllers/
│ │ └── service.controller.ts
│ ├── routes/
│ │ └── service.routes.ts
│ ├── services/
│ │ └── service.service.ts
│ ├── middlewares/
│ │ └── service.validation.ts
│ ├── index.ts # Configuración del servidor Express
├── .env # Variables de entorno
├── Dockerfile # Imagen del microservicio
├── package.json

---

## 🚀 Endpoints Disponibles

Base URL: `/api/services`

| Método | Ruta                     | Descripción                               |
|--------|--------------------------|-------------------------------------------|
| GET    | `/services`              | Obtener todos los servicios               |
| GET    | `/services/:id`          | Obtener un servicio por ID                |
| POST   | `/create-service`        | Crear un nuevo servicio                   |
| PUT    | `/update-service/:id`    | Actualizar un servicio existente          |
| DELETE | `/delete-service/:id`    | Eliminar lógicamente (cambiar `status`)   |

---

## ⚙️ Instalación

```bash
# Clona el repositorio raíz y entra a la carpeta services
cd services

# Instala dependencias
npm install

# Genera Prisma Client
npx prisma generate

# Inicia el servidor
npm run dev

```
## 🌐 Variables de Entorno

Crea un archivo .env con la siguiente variable:

DATABASE_URL=postgresql://admin:admin123@postgres:5432/ornamentalwebpagedb

## 🧱 Construcción con Docker

Este servicio está listo para ser ejecutado en un entorno Docker. Se comunica internamente con los servicios postgres y security.

docker-compose up --build

## 📌 Notas

- Usa morgan para logs de peticiones HTTP.

- Usa helmet para protección básica contra vulnerabilidades comunes.

- Usa CORS configurado para aceptar solo peticiones desde el frontend.

