// services/report.service.ts
import { prisma } from "../config/prisma";

export const getTopSellingMeshes = async () => {
  const results = await prisma.invoice.groupBy({
    by: ["meshTypeId"],
    _sum: { quantity: true, total: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: 5,
  });

  const withNames = await Promise.all(
    results.map(async (r) => {
      const mesh = await prisma.meshType.findUnique({
        where: { id: r.meshTypeId },
      });
      return {
        meshType: mesh?.type || "Unknown",
        quantitySold: r._sum.quantity,
        revenue: r._sum.total,
      };
    })
  );

  return withNames;
};

export const getTopClients = async () => {
  const results = await prisma.invoice.groupBy({
    by: ["clientId"],
    _sum: { total: true },
    orderBy: { _sum: { total: "desc" } },
    take: 5,
  });

  const withClients = await Promise.all(
    results.map(async (r) => {
      const client = await prisma.client.findUnique({
        where: { id: r.clientId },
      });
      return {
        clientName: client?.name || "Unknown",
        totalSpent: r._sum.total,
      };
    })
  );

  return withClients;
};

export const getTopWorkers = async () => {
  const results = await prisma.production.groupBy({
    by: ["userId"],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: 5,
  });

  const withNames = await Promise.all(
    results.map(async (r) => {
      const user = await prisma.user.findUnique({ where: { id: r.userId } });
      return {
        workerName: user?.name || "Unknown",
        totalProduced: r._sum.quantity,
      };
    })
  );

  return withNames;
};

export const getCurrentStock = async () => {
  const meshes = await prisma.meshType.findMany({
    select: { type: true, currentStock: true, stockThreshold: true },
  });

  return meshes.map((m) => ({
    type: m.type,
    currentStock: m.currentStock,
    stockThreshold: m.stockThreshold,
    lowStock: m.currentStock <= (m.stockThreshold || 0),
  }));
};

export const getWireEfficiency = async () => {
  const wires = await prisma.wire.findMany();
  const usedKg = wires.reduce((sum, w) => sum + w.usedKg, 0);
  const totalKg = wires.reduce((sum, w) => sum + w.quantityKg, 0);

  const efficiency = totalKg > 0 ? (usedKg / totalKg) * 100 : 0;

  return {
    totalWire: totalKg,
    usedWire: usedKg,
    efficiencyPercent: efficiency.toFixed(2),
  };
};
