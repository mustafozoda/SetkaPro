import { prisma } from "../config/prisma";

export const createMeshType = async (data: any) => {
  return prisma.meshType.create({ data });
};

export const getAllMeshTypes = async () => {
  return prisma.meshType.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getMeshTypeById = async (id: string) => {
  const mesh = await prisma.meshType.findUnique({ where: { id } });
  if (!mesh) throw { status: 404, message: "Mesh type not found" };
  return mesh;
};

export const updateMeshType = async (id: string, data: any) => {
  return prisma.meshType.update({ where: { id }, data });
};

export const deleteMeshType = async (id: string) => {
  return prisma.meshType.delete({ where: { id } });
};
