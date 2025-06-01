import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';

export const checkServiceIdsExist = async (req: Request, res: Response, next: NextFunction) => {
  const serviceIds: string[] = req.body.serviceIds;

  if (!Array.isArray(serviceIds) || serviceIds.length === 0) {
    return res.status(400).json({ message: 'Debes proporcionar al menos un serviceId válido' });
  }

  const existingServices = await prisma.service.findMany({
    where: {
      id: { in: serviceIds }
    },
    select: { id: true }
  });

  const foundIds = existingServices.map(service => service.id);
  const missingIds = serviceIds.filter(id => !foundIds.includes(id));

  if (missingIds.length > 0) {
    return res.status(400).json({
      message: 'Algunos serviceIds no existen',
      invalidIds: missingIds
    });
  }

  next();
};
