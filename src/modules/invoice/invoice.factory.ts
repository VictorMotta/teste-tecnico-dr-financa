import { InvoiceRepository } from "./invoice.repository";
import { InvoiceController } from "./invoice.controller";
import { CreateInvoiceService, GetAllInvoicesService } from "./service";

export function buildCreateInvoiceModule() {
  const repository = new InvoiceRepository();
  const createInvoiceService = new CreateInvoiceService(repository);
  const getAllInvoicesService = new GetAllInvoicesService(repository);
  const controller = new InvoiceController(createInvoiceService, getAllInvoicesService);

  return controller;
}
