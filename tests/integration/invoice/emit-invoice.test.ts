jest.mock("@/modules/invoice/gateway", () => {
  return {
    DrFinancasProvider: jest.fn().mockImplementation(() => ({
      emitInvoice: jest.fn().mockResolvedValue({
        numeroNF: "321321",
        dataEmissao: "2025-12-02T23:38:38-03:00",
      }),
    })),
  };
});

import app, { init } from "@/app";
import { cleanDb } from "../helpers";
import supertest from "supertest";

const server = supertest(app);

describe("POST /invoice/:id/emit", () => {
  beforeAll(async () => {
    await init();
  });

  beforeEach(async () => {
    await cleanDb();
  });

  it("should respond status 401 if pass wrong token", async () => {
    const response = await server.post("/invoice/1/emit");

    expect(response.status).toBe(401);
  });

  it("should respond status 404 if invoice does not exist", async () => {
    const response = await server
      .post("/invoice/9999/emit")
      .set("Authorization", "test");

    expect(response.status).toBe(404);
  });

  it("should respond status 200 and emit invoice when status is PENDENTE_EMISSAO", async () => {
    const createResponse = await server
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

    expect(createResponse.status).toBe(201);

    const created = createResponse.body;
    const id = created.id; 

    const emitResponse = await server
      .post(`/invoice/${id}/emit`)
      .set("Authorization", "test");

    expect(emitResponse.status).toBe(200);
    expect(emitResponse.body).toEqual(
      expect.objectContaining({
        id,
      }),
    );
  });

  it("should respond status 409 if invoice is already emitted (or not in PENDENTE_EMISSAO)", async () => {
    const createResponse = await server
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

    expect(createResponse.status).toBe(201);

    const created = createResponse.body;
    const id = created.id;

    const firstEmit = await server
      .post(`/invoice/${id}/emit`)
      .set("Authorization", "test");

    expect(firstEmit.status).toBe(200);

    const secondEmit = await server
      .post(`/invoice/${id}/emit`)
      .set("Authorization", "test");

    expect(secondEmit.status).toBe(409);
  });
});