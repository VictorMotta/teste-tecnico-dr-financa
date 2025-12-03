import { InvoiceEntity, ListAllInvoiceEntity, UpdateEmittedInvoiceEntity } from "../type";
import { CreateInvoiceDto, ExternalInvoiceResponseDto, InvoiceResponseDTO, ListAllInvoiceResponseDto } from "../dto";
import { Status } from "../../../../prisma/generated/client";
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

  static listToResponseDTO(entity: ListAllInvoiceEntity): ListAllInvoiceResponseDto {
        return {
            id: entity.id,
            cnpjCustomer: entity.cnpjCustomer,
            municipality: entity.municipality,
            serviceValue: Number(entity.serviceValue),
            desiredIssueDate: entity.desiredIssueDate.toISOString(),
            status: entity.status,
            numberNF: entity.numberNF,
            createdAt: entity.createdAt.toISOString(),
        };
  }

  static updateEmmitedToEntity(
    invoice: InvoiceEntity, 
    externalResponse: ExternalInvoiceResponseDto
  ): UpdateEmittedInvoiceEntity {
    return {
      id: invoice.id,
      numberNF: externalResponse.numeroNF,
      emissionDate: new Date(externalResponse.dataEmissao),
      status: Status.EMITIDA,
    };
  }
}
