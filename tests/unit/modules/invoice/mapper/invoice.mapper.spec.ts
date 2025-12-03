import { InvoiceMapper } from "@/modules/invoice/mapper/invoice.mapper";
import { Status } from "../../../../../prisma/generated/client";
import { Decimal } from "@prisma/client/runtime/client";

describe("InvoiceMapper", () => {
  const now = new Date("2024-01-01T12:00:00.000Z");

  const invoiceEntity = {
    id: 1,
    cnpjCustomer: "12345678000199",
    municipality: "São Paulo",
    state: "SP",
    serviceValue: new Decimal(1500.75),
    desiredIssueDate: new Date("2024-07-15"),
    description: "Serviços de consultoria",
    status: Status.PENDENTE_EMISSAO,
    numberNF: null,
    emissionDate: null,
    createdAt: now,
    updatedAt: now,
  };


  it("should map CreateInvoiceDto to an InvoiceEntity without id/timestamps", () => {
    const dto = {
      cnpjCustomer: "12345678000199",
      municipality: "São Paulo",
      state: "SP",
      serviceValue: 1500.75,
      desiredIssueDate: "2024-07-15",
      description: "Descrição teste",
    };

    const result = InvoiceMapper.toEntity(dto);

    expect(result).toEqual({
      cnpjCustomer: dto.cnpjCustomer,
      municipality: dto.municipality,
      state: dto.state,
      serviceValue: new Decimal(dto.serviceValue),
      desiredIssueDate: new Date(dto.desiredIssueDate),
      description: dto.description,
      status: Status.PENDENTE_EMISSAO,
      numberNF: null,
      emissionDate: null,
    });
  });


  it("should map InvoiceEntity to InvoiceResponseDTO correctly", () => {
    const result = InvoiceMapper.toResponseDTO(invoiceEntity as any);

    expect(result).toEqual({
      id: invoiceEntity.id,
      cnpjCustomer: invoiceEntity.cnpjCustomer,
      municipality: invoiceEntity.municipality,
      state: invoiceEntity.state,
      serviceValue: 1500.75, // Decimal → number
      desiredIssueDate: invoiceEntity.desiredIssueDate.toISOString(),
      description: invoiceEntity.description,
      status: invoiceEntity.status,
      numberNF: null,
      emissionDate: null,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  });

  it("should convert emissionDate to ISO string when not null", () => {
    const emittedInvoice = {
      ...invoiceEntity,
      emissionDate: new Date("2024-08-01T10:00:00.000Z"),
    };

    const result = InvoiceMapper.toResponseDTO(emittedInvoice as any);

    expect(result.emissionDate).toBe(
      emittedInvoice.emissionDate.toISOString()
    );
  });


  it("should map ListAllInvoiceEntity to ListAllInvoiceResponseDto correctly", () => {
    const listEntity = {
      id: 1,
      cnpjCustomer: "12345678000199",
      municipality: "São Paulo",
      serviceValue: new Decimal(1500.75),
      desiredIssueDate: new Date("2024-07-15T00:00:00Z"),
      status: Status.PENDENTE_EMISSAO,
      numberNF: null,
      createdAt: now,
    };

    const result = InvoiceMapper.listToResponseDTO(listEntity as any);

    expect(result).toEqual({
      id: listEntity.id,
      cnpjCustomer: listEntity.cnpjCustomer,
      municipality: listEntity.municipality,
      serviceValue: 1500.75,
      desiredIssueDate: listEntity.desiredIssueDate.toISOString(),
      status: listEntity.status,
      numberNF: listEntity.numberNF,
      createdAt: now.toISOString(),
    });
  });

  it("should map emitted invoice to UpdateEmittedInvoiceEntity correctly", () => {
    const external = {
      numeroNF: "NF123",
      dataEmissao: "2025-12-02T23:38:38-03:00",
    };

    const result = InvoiceMapper.updateEmmitedToEntity(
      invoiceEntity as any,
      external
    );

    expect(result).toEqual({
      id: invoiceEntity.id,
      numberNF: external.numeroNF,
      emissionDate: new Date(external.dataEmissao),
      status: Status.EMITIDA,
    });
  });
});
