import { prisma } from '../config/prisma';
import { Service } from '../types/service.types';

export const createService = async (data: Service) => {
  const newService = await prisma.service.create({
    data,
  });
  return newService;
};

export const getAllServices = async () => {
  return await prisma.service.findMany();
};

export const getServiceById = async (id: string) => {
  return await prisma.service.findUnique({
    where: { id },
  });
};