import { PrismaClient } from "../../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

let prisma: PrismaClient;

export function connectDb(): void {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not set");
  }

  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  prisma = new PrismaClient({ adapter });
}

export function getDb(): PrismaClient {
  if (!prisma) {
    connectDb();
  }
  return prisma;
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export { prisma };
