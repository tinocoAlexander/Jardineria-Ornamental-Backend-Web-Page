# 🐳 Arquitectura de Contenedores - Jardinería Ornamental

Este archivo `docker-compose.yml` orquesta el entorno de microservicios para la aplicación **Jardinería Ornamental**. Aquí se incluyen los servicios para:

- 📦 Seguridad (`security`)
- 🛠️ Servicios (`services`)
- 📅 Citas (`appointments`)
- 🐘 PostgreSQL (Base de datos)

---

## 🔐 Variables de Entorno (.env)

Asegúrate de tener un archivo `.env` en la raíz con:

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=ornamentalwebpagedb
DATABASE_URL=postgresql://admin:admin123@postgres:5432/ornamentalwebpagedb
JWT_SECRET=supersecreto123
```

## 🚀 Levantar los servicios

docker-compose up --build

Esto compilará y levantará todos los servicios definidos. Una vez en marcha:

- 🐘 PostgreSQL: localhost:5432

- 🔐 Auth: http://localhost:3002

- 🛠️ Servicios: http://localhost:3001

- 📅 Citas: http://localhost:3000