import { prisma } from "../config/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

export const createSalary = async (input: {
  userId: string;
  month: string;
  amount?: number;
}) => {
  const existing = await prisma.salary.findFirst({
    where: { userId: input.userId, month: input.month },
  });
  if (existing)
    throw { status: 400, message: "Salary already exists for this month" };

  let calculatedAmount = input.amount;

  const user = await prisma.user.findUnique({ where: { id: input.userId } });
  if (!user) throw { status: 404, message: "User not found" };

  if (!input.amount && user.role === "WORKER") {
    const monthStart = startOfMonth(new Date(input.month));
    const monthEnd = endOfMonth(new Date(input.month));

    const productions = await prisma.production.findMany({
      where: {
        userId: input.userId,
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      include: { meshType: true },
    });

    calculatedAmount = productions.reduce((total, prod) => {
      return total + prod.quantity * (prod.meshType?.priceForWorker || 0);
    }, 0);
  }

  return prisma.salary.create({
    data: {
      userId: input.userId,
      month: input.month,
      amount: calculatedAmount || 0,
    },
  });
};

export const getAllSalaries = async () => {
  return prisma.salary.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getSalariesByMonth = async (month: string) => {
  return prisma.salary.findMany({
    where: { month },
    include: { user: true },
  });
};

export const markSalaryAsPaid = async (id: string) => {
  return prisma.salary.update({
    where: { id },
    data: { paid: true },
  });
};
