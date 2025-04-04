import { prisma } from "../config/prisma";

export const createFinanceEntry = async (data: {
  type: "income" | "expense";
  category: string;
  amount: number;
  description?: string;
}) => {
  return prisma.finance.create({ data });
};

export const getAllFinance = async () => {
  return prisma.finance.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getFinanceByMonth = async (month: string) => {
  const [year, m] = month.split("-").map(Number);
  const from = new Date(year, m - 1, 1);
  const to = new Date(year, m, 1);

  return prisma.finance.findMany({
    where: {
      createdAt: {
        gte: from,
        lt: to,
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteFinanceEntry = async (id: string) => {
  return prisma.finance.delete({ where: { id } });
};
