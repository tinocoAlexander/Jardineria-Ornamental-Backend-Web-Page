# 🧬 Prisma - ORM y Gestión de Base de Datos

Esta carpeta contiene la configuración del ORM **Prisma** que se utiliza en todos los microservicios para interactuar con la base de datos PostgreSQL compartida. Aquí se define el **esquema de datos**, se gestionan las **migraciones** y se genera el **cliente Prisma** para su uso en el código.

---

## 📁 Estructura de la Carpeta
prisma/
├── schema.prisma # Esquema de datos principal
├── migrations/ # Carpeta donde Prisma guarda las migraciones generadas


---

## 🧪 ¿Qué es Prisma?

[Prisma](https://www.prisma.io/) es un ORM moderno para Node.js y TypeScript. Nos permite:

- Modelar los datos en `schema.prisma`.
- Generar automáticamente consultas SQL.
- Validar tipos en tiempo de compilación.
- Mantener el control de cambios mediante migraciones.

---

## ⚙️ Configuración

El archivo `schema.prisma` contiene dos bloques importantes:

### Datasource

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- provider: Tipo de base de datos (postgresql).

- url: Se obtiene desde la variable de entorno DATABASE_URL.

## 🛠️ Comandos Útiles

Todos los comandos deben ejecutarse desde la carpeta de prisma o indicando el path del schema.

# Generar Cliente Prisma

- npx prisma generate

⚠️ Este comando es obligatorio después de modificar schema.prisma.

# Crear Migración

- npx prisma migrate dev --name nombre-de-la-migracion    

# Visualizar la Base de Datos

- npx prisma studio

## 🧪 Variables de Entorno

Asegúrate de definir en la raíz del proyecto un archivo .env con:

DATABASE_URL=postgresql://admin:admin123@postgres:5432/ornamentalwebpagedb

Esta URL es usada por todos los servicios para conectarse a la base de datos.