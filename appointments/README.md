# Servicio de Citas (Appointments)

Este módulo gestiona el registro, consulta y administración de citas en el sistema.

## Funcionalidades principales

- **Crear cita**: Permite a los visitantes del sitio agendar una cita desde el frontend (React). Las solicitudes pasan por validación y reCAPTCHA.
- **Consultar citas**: Permite al administrador ver todas las citas registradas para su gestión.
- **Editar o eliminar citas**: Solo disponible para el administrador autenticado desde el CMS. Los visitantes no pueden modificar ni cancelar citas por sí mismos.
- **Notificaciones**: Después de haber agendado la cita, se envía al correo electrónico de los usuarios la confirmación de que se ha agendado una cita y se comunicarán con él.

## Seguridad

- La creación de citas está protegida con **Google reCAPTCHA** para evitar spam.
- Las operaciones de edición y eliminación requieren autenticación administrativa.

## Estructura

- `appointments.controller.ts` – Define los endpoints para crear, listar, editar y eliminar citas.
- `appointments.routes.ts` – Rutas públicas y privadas asociadas a este módulo.
- `appointment.model.ts` – Esquema del modelo de cita si se usa un ORM.
- `appointment.service.ts` – Uso de RabbitMQ para poder enviar colas y que los correos electrónicos sean enviados.

