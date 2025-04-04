import { prisma } from "../config/prisma";

export const createWire = async (data: {
  wireType: string;
  quantityKg: number;
}) => {
  return prisma.wire.create({
    data: {
      wireType: data.wireType,
      quantityKg: data.quantityKg,
    },
  });
};

export const getAllWires = async () => {
  return prisma.wire.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const deleteWire = async (id: string) => {
  return prisma.wire.delete({ where: { id } });
};

export const getRemainingWireByType = async (wireType: string) => {
  const wires = await prisma.wire.findMany({
    where: { wireType },
  });

  const total = wires.reduce((sum, w) => sum + w.quantityKg, 0);
  const used = wires.reduce((sum, w) => sum + w.usedKg, 0);
  return total - used;
};
