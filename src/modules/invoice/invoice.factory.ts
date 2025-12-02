import { InvoiceRepository } from "./invoice.repository";
import { InvoiceController } from "./invoice.controller";
import { CreateInvoiceService, EmitInvoiceService, GetAllInvoicesService, GetOneInvoiceService } from "./service";
import { DrFinancasProvider } from "./gateway";

export function buildCreateInvoiceModule() {
  const repository = new InvoiceRepository();
  
  const AUTH_KEY = process.env.DRFINANCAS_API_KEY || "";
  const drFinancasProvider = new DrFinancasProvider(AUTH_KEY);

  if (!AUTH_KEY) {
      throw new Error("DRFINANCAS_API_KEY não foi carregada no ambiente.");
  }

  const createInvoiceService = new CreateInvoiceService(repository);
  const getAllInvoicesService = new GetAllInvoicesService(repository);
  const getOneInvoiceService = new GetOneInvoiceService(repository);
  const emitInvoiceService = new EmitInvoiceService(repository, drFinancasProvider);

  const controller = new InvoiceController(createInvoiceService, getAllInvoicesService, getOneInvoiceService, emitInvoiceService);

  return controller;
}
