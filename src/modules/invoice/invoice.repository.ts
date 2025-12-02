import { prisma } from "@/shared/config";
import { InvoiceEntity, NewInvoiceEntity } from "./type";

export class InvoiceRepository {
  async create(data: NewInvoiceEntity): Promise<InvoiceEntity> {
    const created = await prisma.invoice.create({ data });
    return created; // Prisma já retorna com id, createdAt, updatedAt
  }

  async findById(id: number): Promise<InvoiceEntity | null> {
    return prisma.invoice.findUnique({ where: { id } });
  }
}