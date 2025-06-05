# 📅 Microservicio de Citas (`appointments`)

Este microservicio gestiona la creación, consulta, actualización y eliminación lógica de **citas**. Forma parte del sistema de microservicios de **Jardinería Ornamental** y se comunica con una base de datos PostgreSQL mediante Prisma.

---

## 📁 Estructura del Proyecto

appointments/  
├── src/  
│ ├── controllers/  
│ │ └── appointments.controller.ts # Controladores para manejar las citas  
│ ├── routes/  
│ │ └── appointments.routes.ts # Rutas HTTP para las citas  
│ ├── services/  
│ │ └── appointment.service.ts # Lógica del negocio de las citas  
│ ├── middlewares/  
│ │ └── appointment.validation.ts y validateServiceIds.ts # Validaciones  
│ ├── types/  
│ │ └── appointments.types.ts # Tipado de las citas  
│ ├── config/  
│ │ └── prisma.ts # Configuración de Prisma  
│ ├── index.ts # Punto de entrada del microservicio  
├── logs/ # Carpeta para guardar logs de Morgan  
├── Dockerfile  
├── .env  
├── tsconfig.json  
└── package.json  

---

## 🚀 Endpoints Disponibles

Base URL: `/api/appointments`

| Método | Ruta                                   | Descripción                                  |
|--------|----------------------------------------|----------------------------------------------|
| POST   | `/create-appointment`                  | Crea una nueva cita                          |
| GET    | `/appointments`                        | Obtiene todas las citas activas              |
| GET    | `/appointments/:id`                    | Obtiene una cita por su ID                   |
| PUT    | `/update-appointment/:id`              | Actualiza una cita existente                 |
| DELETE | `/delete-appointment/:id`              | Elimina lógicamente una cita (status = "DELETED") |

---

## ⚙️ Instalación

```bash
# Clona el repositorio raíz y entra a la carpeta appointments
cd appointments

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

