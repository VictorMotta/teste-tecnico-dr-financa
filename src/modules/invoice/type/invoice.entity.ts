import { Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";

export interface InvoiceEntity {
  id: number;
  cnpjCustomer: string;
  municipality: string;
  state: string;
  serviceValue: Decimal;
  desiredIssueDate: Date;
  description: string;
  status: Status;
  numberNF: string | null;
  emissionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type NewInvoiceEntity = Omit<
  InvoiceEntity,
  "id" | "createdAt" | "updatedAt"
>;

export type ListAllInvoiceEntity = Omit<
  InvoiceEntity,
  "state" | "description" | "emissionDate" | "updatedAt"
>;