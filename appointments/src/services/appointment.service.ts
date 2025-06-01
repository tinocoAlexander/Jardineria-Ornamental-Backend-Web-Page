// Este servicio es responsable de manejar la lógica de negocio relacionada con las citas, como crear, actualizar y eliminar citas.
// Esto no se debe hacer en el controlador, ya que el controlador solo debe manejar las solicitudes y respuestas HTTP.
import { prisma } from '../config/prisma';
import { Appointment } from '../types/appointments.types'; // Trae el tipo de Appointment

export const createAppointment = async (data: Appointment) => {
    const { serviceIds, ...appointmentData } = data; // Desestructuramos los datos para separar los serviceIds del resto de la cita

    const newAppointment = await prisma.appointment.create({
        data: {
        ...appointmentData,
        services: {
            create: serviceIds.map((serviceId) => ({
            service: {
                connect: { id: serviceId },
            },
            })),
        },
        },
        include: {
        services: true,
        },
    });

    return newAppointment;
};
