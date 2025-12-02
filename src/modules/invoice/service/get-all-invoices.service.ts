import { InvoiceRepository } from "../invoice.repository";
import { InvoiceMapper } from "../mapper";

export class GetAllInvoicesService {
  constructor(private readonly repository: InvoiceRepository) {}

  async execute(){
    const invoices = await this.repository.findAll();
    return invoices.map(InvoiceMapper.listToResponseDTO);
  }
}