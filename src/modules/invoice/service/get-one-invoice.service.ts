import { NotFoundError } from "@/shared/errors/not-found.error";
import { InvoiceRepository } from "../invoice.repository";
import { InvoiceMapper } from "../mapper";

export class GetOneInvoiceService {
  constructor(private readonly repository: InvoiceRepository) {}

  async execute(id: number){
    const invoice = await this.repository.findById(id);
    if (!invoice) throw new NotFoundError("Invoice not found");
    return InvoiceMapper.toResponseDTO(invoice);
  }
}