import { prisma } from "../config/prisma";

export const createClient = async (data: any) => {
  return prisma.client.create({ data });
};

export const getAllClients = async () => {
  return prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getClientById = async (id: string) => {
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) throw { status: 404, message: "Client not found" };
  return client;
};

export const updateClient = async (id: string, data: any) => {
  return prisma.client.update({ where: { id }, data });
};

export const deleteClient = async (id: string) => {
  return prisma.client.delete({ where: { id } });
};
