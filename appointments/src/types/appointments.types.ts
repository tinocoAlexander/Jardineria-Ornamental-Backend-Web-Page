// Esto es lo tipos que se usan en la aplicación para las citas.
export interface Appointment {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    scheduledDate: Date;
    notes?: string;
    serviceIds: string[];
}