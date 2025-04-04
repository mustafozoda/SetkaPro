import { prisma } from "../config/prisma";

export const createMachine = async (data: {
  name: string;
  description?: string;
}) => {
  return prisma.machine.create({ data });
};

export const getAllMachines = async () => {
  return prisma.machine.findMany({ orderBy: { createdAt: "desc" } });
};

export const getMachineById = async (id: string) => {
  const machine = await prisma.machine.findUnique({ where: { id } });
  if (!machine) throw { status: 404, message: "Machine not found" };
  return machine;
};

export const updateMachine = async (id: string, data: any) => {
  return prisma.machine.update({ where: { id }, data });
};

export const deleteMachine = async (id: string) => {
  return prisma.machine.delete({ where: { id } });
};

export const createMachineLog = async (
  machineId: string,
  userId: string,
  log: { startedAt: string; endedAt?: string }
) => {
  return prisma.machineLog.create({
    data: {
      machineId,
      userId,
      startedAt: new Date(log.startedAt),
      endedAt: log.endedAt ? new Date(log.endedAt) : null,
    },
  });
};

export const getMachineLogs = async (machineId: string) => {
  return prisma.machineLog.findMany({
    where: { machineId },
    include: { user: true },
    orderBy: { startedAt: "desc" },
  });
};
