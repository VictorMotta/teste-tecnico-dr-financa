import app, { init } from "@/app";
import { cleanDb } from "./helpers";
import supertest from "supertest";

const server = supertest(app);

describe("GET /invoice/:id", () => {
  beforeAll(async () => {
    await init();
  });

  beforeEach(async () => {
    await cleanDb();
  });

  it("should respond status 401 if pass wrong token", async () => {
    const response = await server.get("/invoice/1");
    expect(response.status).toBe(401);
  });

  it("should respond status 404 if invoice does not exist", async () => {
    const response = await server
      .get("/invoice/9999")
      .set("Authorization", "test");

    expect(response.status).toBe(404);
  });

  it("should respond status 200 and return the invoice when it exists", async () => {
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

    const response = await server
      .get(`/invoice/${id}`)
      .set("Authorization", "test");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id,
      }),
    );
  });
});
