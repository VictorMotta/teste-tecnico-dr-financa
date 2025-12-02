import { Status } from "@prisma/client";

export interface InvoiceResponseDTO {
  id: number;
  cnpjCustomer: string;
  municipality: string;
  state: string;
  serviceValue: number;
  desiredIssueDate: string;
  description: string;
  status: Status;
  numberNF: string | null;
  emissionDate: string | null;
  createdAt: string;
  updatedAt: string;
}

