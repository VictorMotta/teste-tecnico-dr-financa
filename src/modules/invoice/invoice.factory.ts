import { InvoiceRepository } from "./invoice.repository";
import { InvoiceController } from "./invoice.controller";
import { CreateInvoiceService } from "./service";

export function buildCreateInvoiceModule() {
  const repository = new InvoiceRepository();
  const createInvoiceService = new CreateInvoiceService(repository);
  const controller = new InvoiceController(createInvoiceService);

  return controller;
}
