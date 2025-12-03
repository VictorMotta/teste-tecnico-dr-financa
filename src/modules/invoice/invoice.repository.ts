import { prisma } from "@/shared/configs";
import { InvoiceEntity, ListAllInvoiceEntity, NewInvoiceEntity, UpdateEmittedInvoiceEntity } from "./type";

export class InvoiceRepository {
  async create(data: NewInvoiceEntity): Promise<InvoiceEntity> {
    const created = await prisma.invoice.create({ data });
    return created;
  }

  async findAll(): Promise<ListAllInvoiceEntity[]> {
    return prisma.invoice.findMany({
      select: {
      id: true,
      cnpjCustomer: true,
      municipality: true,
      serviceValue: true,
      desiredIssueDate: true,
      status: true,
      numberNF: true,
      createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  }

  async findById(id: number): Promise<InvoiceEntity | null> {
    return prisma.invoice.findUnique({ where: { id } });
  }

  async updateEmittedInvoice(data: UpdateEmittedInvoiceEntity): Promise<InvoiceEntity> {
    return prisma.invoice.update({
      where: { id: data.id },
      data: {
        numberNF: data.numberNF,
        emissionDate: data.emissionDate,
        status: data.status,
      },
    });
  }
}