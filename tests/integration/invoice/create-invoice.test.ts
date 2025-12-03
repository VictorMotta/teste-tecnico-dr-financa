import app, { init } from "@/app"
import { cleanDb } from "../helpers";
import supertest from "supertest";


const server = supertest(app);

describe("POST /invoice", () => {

  beforeAll(async ()   => {
  await init();
  })

  beforeEach(async () => {
    await cleanDb();
  });

  it("should respond status 401 if pass wrong token", async () => {
    const response = await server.post("/invoice");

    expect(response.status).toBe(401);
  });

  it("should respond status 400 if body is invalid", async () => {
    const response = await server.post("/invoice")
      .set("Authorization", "test")
      .send({
        cnpjCustomer: "12345678000199",
        municipality: "São Paulo",
        // state is missing
        serviceValue: 1500.75,
        desiredIssueDate: "2024-07-15",
        description: "Serviços de consultoria",
      }); 
    expect(response.status).toBe(400);
  });

  it("should respond status 201 if pass correct token", async () => {
    const response = await server.post("/invoice")
      .set("Authorization", "test")
      .send({
        cnpjCustomer: "12345678000199",
        municipality: "São Paulo",
        state: "SP",
        serviceValue: 1500.75,
        desiredIssueDate: "2024-07-15",
        description: "Serviços de consultoria",
      }); 
    expect(response.status).toBe(201);
  }); 
});