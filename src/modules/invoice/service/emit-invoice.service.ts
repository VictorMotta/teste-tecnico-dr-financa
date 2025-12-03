import { ConflictError, NotFoundError } from "@/shared/errors";
import { InvoiceRepository } from "../invoice.repository";
import { DrFinancasProvider } from "../gateway/dr-financas.provider";
import { InvoiceMapper } from "../mapper";

export class EmitInvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly drFinancasProvider: DrFinancasProvider
  ) {}

  async execute(invoiceId: number) {
    const invoice = await this.invoiceRepository.findById(invoiceId);
    if (!invoice) {
      throw new NotFoundError(`Invoice with ID ${invoiceId} not found.`);
    }

    if(invoice.status !== 'PENDENTE_EMISSAO') {
      throw new ConflictError('Invoice cannot be emitted in its current status.');
    }

    const externalResponse = await this.drFinancasProvider.emitInvoice();

    const payload = InvoiceMapper.updateEmmitedToEntity(invoice, externalResponse);

    const updatedInvoice = await this.invoiceRepository.updateEmittedInvoice(payload);
    console.log(updatedInvoice);

    return InvoiceMapper.toResponseDTO(updatedInvoice);
  }   
}