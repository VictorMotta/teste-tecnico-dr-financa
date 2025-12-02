import { InvoiceResponseDTO } from "./invoice-response.dto";

type FieldsToOmit = 'state' | 'description' | 'emissionDate' | 'updatedAt';

export type ListAllInvoiceResponseDto = Omit<InvoiceResponseDTO, FieldsToOmit>;
