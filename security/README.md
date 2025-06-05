# 🔐 Microservicio de Seguridad (`security`)

Este microservicio gestiona la autenticación, el registro de usuarios y el control de roles mediante tokens JWT. Forma parte del sistema de microservicios de **Jardinería Ornamental** y se comunica con una base de datos PostgreSQL.

---

## 📁 Estructura del Proyecto
security/
├── src/
│ ├── controllers/
│ │ └── auth.controller.ts # Controladores de login y registro
│ ├── routes/
│ │ └── auth.routes.ts # Rutas HTTP de autenticación
│ ├── services/
│ │ └── auth.service.ts # Lógica del negocio
│ ├── config/
│ │ └── prisma.ts # Configuración de Prisma
│ ├── middlewares/
│ │ └── requireRole.ts y verifyToken.ts # Verifica token y permisos
│ ├── index.ts # Punto de entrada del microservicio
├── Dockerfile
|── .env
├── tsconfig.json
└── package.json

---

## 🚀 Endpoints Disponibles

Base URL: `/api/auth`

| Método | Ruta                     | Descripción                               |
|--------|--------------------------|-------------------------------------------|
| POST   | `/login`                 | Se logea y genera un token                |
| POST   | `/refresh`               | Ruta encargada de refrescar el token      |
| POST   | `/logout`                | Cierra sesión y termina tokens            |
| POST   | `/register-admin`        | Solo registra si no hay usuarios          |
---

## ⚙️ Instalación

```bash
# Clona el repositorio raíz y entra a la carpeta services
cd security

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

Este servicio está listo para ser ejecutado en un entorno Docker. Se comunica internamente con los servicios postgres y services.

docker-compose up --build

## 📌 Notas

- Usa morgan para logs de peticiones HTTP.

- Usa helmet para protección básica contra vulnerabilidades comunes.

- Usa CORS configurado para aceptar solo peticiones desde el frontend.

