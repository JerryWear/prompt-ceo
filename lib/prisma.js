import { PrismaClient } from "@prisma/client";

let prisma;

export function getPrisma() {
  if (prisma) return prisma;
  prisma = new PrismaClient();
  return prisma;
}
