jest.mock("@/modules/invoice/invoice.factory", () => {
  const { InvoiceController } = jest.requireActual(
    "@/modules/invoice/invoice.controller"
  );
  const { GetAllInvoicesService } = jest.requireActual(
    "@/modules/invoice/service"
  );
  const { InvoiceRepository } = jest.requireActual(
    "@/modules/invoice/invoice.repository"
  );

  return {
    buildCreateInvoiceModule: () => {
      const repoMock = {
        findAll: jest.fn().mockRejectedValue(new Error("Repo failure")),
      } as unknown as InvoiceRepository;

      const createService = { execute: jest.fn() } as any;
      const getAllInvoicesService = new GetAllInvoicesService(repoMock);
      const getOneInvoiceService = { execute: jest.fn() } as any;
      const emitInvoiceService = { execute: jest.fn() } as any;

      return new InvoiceController(
        createService,
        getAllInvoicesService,
        getOneInvoiceService,
        emitInvoiceService
      );
    },
  };
});

import app, { init } from "@/app";
import { InvoiceRepository } from "@/modules/invoice/invoice.repository";
import supertest from "supertest";

const server = supertest(app);

describe("GET /invoice - 500 when repository throws", () => {
  beforeAll(async () => {
    await init();
  });

  it("should respond status 500 if the repository throws a generic error", async () => {
    const response = await server
      .get("/invoice")
      .set("Authorization", "test");

    expect(response.status).toBe(500);
  });
});
