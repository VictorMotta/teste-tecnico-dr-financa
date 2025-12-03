import app, { init } from "@/app";
import { cleanDb } from "./helpers";
import supertest from "supertest";

const server = supertest(app);

describe("GET /invoice", () => {
  beforeAll(async () => {
    await init();
  });

  beforeEach(async () => {
    await cleanDb();
  });

  it("should respond status 401 if pass wrong token", async () => {
    const response = await server.get("/invoice");

    expect(response.status).toBe(401);
  });

  it("should respond status 200 and an empty array if there are no invoices", async () => {
    const response = await server
      .get("/invoice")
      .set("Authorization", "test");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(0);
  });

  it("should respond status 200 and return a list of invoices", async () => {
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

    const response = await server
      .get("/invoice")
      .set("Authorization", "test");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
      }),
    );
  });
});
