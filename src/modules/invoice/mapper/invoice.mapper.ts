import { InvoiceEntity } from "../type";
import { CreateInvoiceDto, InvoiceResponseDTO } from "../dto";
import { Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";


export class InvoiceMapper {
  static toEntity(dto: CreateInvoiceDto): Omit<InvoiceEntity, "id" | "createdAt" | "updatedAt"> {
    return {
      cnpjCustomer: dto.cnpjCustomer,
      municipality: dto.municipality,
      state: dto.state,
      serviceValue: new Decimal(dto.serviceValue),
      desiredIssueDate: new Date(dto.desiredIssueDate),
      description: dto.description,
      status: Status.PENDENTE_EMISSAO,
      numberNF: null,
      emissionDate: null,
    };
  }

  static toResponseDTO(entity: InvoiceEntity): InvoiceResponseDTO {
      return {
      id: entity.id,
      cnpjCustomer: entity.cnpjCustomer,
      municipality: entity.municipality,
      state: entity.state,
      serviceValue: Number(entity.serviceValue),
      desiredIssueDate: entity.desiredIssueDate.toISOString(),
      description: entity.description,
      status: entity.status,
      numberNF: entity.numberNF,
      emissionDate: entity.emissionDate?.toISOString() ?? null,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
