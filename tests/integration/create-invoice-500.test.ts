jest.mock("@/modules/invoice/invoice.factory", () => {
  const { InvoiceController } = jest.requireActual(
    "@/modules/invoice/invoice.controller"
  );

  return {
    buildCreateInvoiceModule: () => {
      return new InvoiceController(
        {
          // createInvoiceService
          execute: jest.fn().mockRejectedValue(new Error("Simulated failure")),
        } as any,
        { execute: jest.fn() } as any, // getAllInvoicesService
        { execute: jest.fn() } as any, // getOneInvoiceService
        { execute: jest.fn() } as any  // emitInvoiceService
      );
    },
  };
});

import app, { init } from "@/app";
import supertest from "supertest";

const server = supertest(app);

describe("POST /invoice - 500 error", () => {
  beforeAll(async () => {
    await init();
  });

  it("should respond status 500 if the Service throws an untranslated generic error", async () => {
    const response = await server
      .post("/invoice")
      .set("Authorization", "test")
      .send({
        cnpjCustomer: "12345678000199",
        municipality: "São Paulo",
        state: "SP",
        serviceValue: 1500.75,
        desiredIssueDate: "2024-07-15",
        description: "Serviços de consultoria",
      });

    expect(response.status).toBe(500);
  });
});
