jest.mock("@/modules/invoice/invoice.factory", () => {
  const { InvoiceController } = jest.requireActual(
    "@/modules/invoice/invoice.controller"
  );

  return {
    buildCreateInvoiceModule: () => {
      return new InvoiceController(
        { execute: jest.fn() } as any, // createInvoiceService
        { execute: jest.fn() } as any, // getAllInvoicesService
        { execute: jest.fn() } as any, // getOneInvoiceService
        {
          // emitInvoiceService
          execute: jest.fn().mockRejectedValue(new Error("Simulated failure")),
        } as any
      );
    },
  };
});


import app, { init } from "@/app";
import supertest from "supertest";

const server = supertest(app);

describe("POST /invoice/:id/emit - 500 when emit service throws generic error", () => {
  beforeAll(async () => {
    await init();
  });

  it("should respond status 500 if EmitInvoiceService throws an untranslated generic error", async () => {
    const response = await server
      .post("/invoice/123/emit") // id qualquer, o service mockado ignora
      .set("Authorization", "test");

    expect(response.status).toBe(500);
  });
});
