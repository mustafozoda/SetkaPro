import { prisma } from "../config/prisma";
import { calculateWireUsageKg } from "../utils/calculate";

export const createProduction = async (
  userId: string,
  input: {
    meshTypeId: string;
    quantity: number;
    startedAt: string;
    finishedAt: string;
  }
) => {
  const meshType = await prisma.meshType.findUnique({
    where: { id: input.meshTypeId },
  });
  if (!meshType) throw { status: 404, message: "Mesh type not found" };

  const wireUsedKg = calculateWireUsageKg(
    input.quantity,
    meshType.weightPerPiece
  );

  // Find matching wire to deduct from
  const wires = await prisma.wire.findMany({
    where: { wireType: meshType.wireType },
    orderBy: { createdAt: "asc" },
  });

  let remainingToUse = wireUsedKg;
  for (const wire of wires) {
    const available = wire.quantityKg - wire.usedKg;
    if (available <= 0) continue;

    const deduct = Math.min(available, remainingToUse);
    await prisma.wire.update({
      where: { id: wire.id },
      data: { usedKg: { increment: deduct } },
    });

    remainingToUse -= deduct;
    if (remainingToUse <= 0) break;
  }

  if (remainingToUse > 0)
    throw { status: 400, message: "Not enough wire in stock" };

  // Save production log
  const production = await prisma.production.create({
    data: {
      userId,
      meshTypeId: input.meshTypeId,
      quantity: input.quantity,
      startedAt: new Date(input.startedAt),
      finishedAt: new Date(input.finishedAt),
    },
  });

  // Update mesh stock
  await prisma.meshType.update({
    where: { id: input.meshTypeId },
    data: {
      currentStock: { increment: input.quantity },
    },
  });

  return production;
};

export const getAllProductions = async () => {
  return prisma.production.findMany({
    include: {
      user: true,
      meshType: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getProductionByDate = async (date: string) => {
  const day = new Date(date);
  const nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);

  return prisma.production.findMany({
    where: {
      createdAt: {
        gte: day,
        lt: nextDay,
      },
    },
    include: {
      user: true,
      meshType: true,
    },
  });
};
