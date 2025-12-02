export type CreateInvoiceDto = {
  cnpjCustomer: string;
  municipality: string;
  state: string;
  serviceValue: number;
  desiredIssueDate: string;
  description: string;
};
