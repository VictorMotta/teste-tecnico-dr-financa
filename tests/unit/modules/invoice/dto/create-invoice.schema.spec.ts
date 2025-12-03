import { createInvoiceSchema } from "@/modules/invoice/dto/create-invoice.schema";
import { CreateInvoiceDto } from "@/modules/invoice/dto/create-invoice.dto";

describe("CreateInvoiceDto / createInvoiceSchema", () => {
  const validPayload: CreateInvoiceDto = {
    cnpjCustomer: "12345678000199",
    municipality: "São Paulo",
    state: "SP",
    serviceValue: 1500.75,
    desiredIssueDate: "2024-07-15T00:00:00.000Z",
    description: "Serviços de consultoria",
  };

  it("should accept a valid CreateInvoiceDto", () => {
    const { error, value } = createInvoiceSchema.validate(validPayload);

    expect(error).toBeUndefined();
    expect(value).toEqual(validPayload);
  });

  it("should require all fields", () => {
    const { state, ...withoutState } = validPayload;

    const { error } = createInvoiceSchema.validate(withoutState);

    expect(error).toBeDefined();
    expect(error!.details[0].message).toMatch(/state/i);
  });

  it("should reject invalid serviceValue type", () => {
    const payload = {
      ...validPayload,
      serviceValue: "not-a-number" as any,
    };

    const { error } = createInvoiceSchema.validate(payload);

    expect(error).toBeDefined();
    expect(error!.details[0].message).toMatch(/serviceValue/i);
  });

  it("should reject empty description", () => {
    const payload = {
      ...validPayload,
      description: "",
    };

    const { error } = createInvoiceSchema.validate(payload);

    expect(error).toBeDefined();
    expect(error!.details[0].message).toMatch(/description/i);
  });
});
