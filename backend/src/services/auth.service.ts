import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { generateToken } from "../utils/jwt";
import { Role } from "@prisma/client";

interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: Role;
}

export const registerUser = async (input: RegisterInput) => {
  const { email, password } = input;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw { status: 400, message: "Email already registered" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { ...input, password: hashedPassword },
  });

  const token = generateToken(user.id);

  return { token, user };
};

interface LoginInput {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, message: "User not found" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: "Invalid password" };

  const token = generateToken(user.id);

  return { token, user };
};
