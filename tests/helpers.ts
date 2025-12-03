import { prisma } from '@/shared/configs/database.config';

export async function cleanDb() {
  await prisma.invoice.deleteMany({});
}
