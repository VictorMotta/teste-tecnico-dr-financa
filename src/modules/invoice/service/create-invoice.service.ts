import { CreateInvoiceDto } from "../dto";
import { InvoiceRepository } from "../invoice.repository";
import { InvoiceMapper } from "../mapper";

export class CreateInvoiceService {
  constructor(private readonly repository: InvoiceRepository) {}

  async execute(data: CreateInvoiceDto){
    const toCreate  = InvoiceMapper.toEntity(data);
    const createdInvoice = await this.repository.create(toCreate);
    return InvoiceMapper.toResponseDTO(createdInvoice);
  }
}