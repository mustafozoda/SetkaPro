import { prisma } from "../config/prisma";
import { Role } from "@prisma/client";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    where: { NOT: { role: Role.OWNER } },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      role: true,
      createdAt: true,
    },
  });
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw { status: 404, message: "User not found" };
  return user;
};

export const updateUser = async (id: string, data: any) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};
