# 🌿 Jardinería Ornamental - Sistema de Microservicios

Este proyecto es un sistema completo para la gestión de citas y usuarios en una empresa de jardinería. Está desarrollado con arquitectura de **microservicios**, utilizando Node.js, Express, Prisma y PostgreSQL, y orquestado con Docker.

---

## 📦 Microservicios Incluidos

| `security/`    | Autenticación, registro de usuarios y gestión de roles mediante JWT.       |
| `appointments/`| Gestión completa de citas (crear, actualizar, listar, eliminar lógicamente).|
| `services/`    | Gestión CRUD de los servicios ofrecidos por la empresa.                    |
| `prisma/`      | Esquema unificado de la base de datos (PostgreSQL) con Prisma ORM

---

## ⚙️ Tecnologías Utilizadas

- **Node.js** + **Express**: Backend de los microservicios.
- **PostgreSQL**: Base de datos relacional.
- **Prisma**: ORM para comunicación con la base de datos.
- **Docker** + **Docker Compose**: Orquestación de servicios.
- **JWT**: Manejo de autenticación y sesiones.
- **Helmet**, **CORS**, **Rate-limit**, **Morgan**: Seguridad, control de acceso y logging.

---

## 🚀 Instalación Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tinocoAlexander/Jardineria-Ornamental-Backend-Web-Page.git
cd jardineria-ornamental
```
### 2. Crear el archivo .env en cada microservicio (security, appointments, services)

# Ejemplo de .env
DATABASE_URL=postgresql://admin:admin123@postgres:5432/ornamentalwebpagedb

### 3. Levantar con Docker Compose

docker-compose up --build

Esto levantará:

- La base de datos PostgreSQL.

- El microservicio de seguridad.

- El microservicio de citas.

- El microservicio de servicios.
