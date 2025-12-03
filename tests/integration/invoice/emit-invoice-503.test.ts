import axios, { AxiosInstance } from "axios";

jest.mock("axios");

import app, { init } from "@/app";
import { cleanDb } from "../helpers";
import supertest from "supertest";

const server = supertest(app);

const mockedAxios = axios as jest.Mocked<typeof axios>;

function mockAxiosPostRejecting(status: number, externalMessage?: string) {
  const postMock = jest.fn().mockRejectedValue({
    response: {
      status,
      data: { message: externalMessage ?? "External error" },
    },
  });

  mockedAxios.create.mockReturnValue({
    post: postMock,
  } as unknown as AxiosInstance);
}

describe("POST /invoice/:id/emit - external API errors → 503", () => {
  beforeAll(async () => {
    await init();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await cleanDb();
  });

  async function createPendingInvoiceAndEmit() {
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

    const id = createResponse.body.id as number;

    const emitResponse = await server
      .post(`/invoice/${id}/emit`)
      .set("Authorization", "test");

    return emitResponse;
  }

  it("should respond 503 when external API returns 400 (mapping error)", async () => {
    mockAxiosPostRejecting(400, "Invalid payload");

    const response = await createPendingInvoiceAndEmit();

    expect(response.status).toBe(503);
  });

  it("should respond 503 when external API returns 401 (auth error)", async () => {
    mockAxiosPostRejecting(401, "Unauthorized");

    const response = await createPendingInvoiceAndEmit();

    expect(response.status).toBe(503);
  });

  it("should respond 503 when external API returns 500+ (infra/service error)", async () => {
    mockAxiosPostRejecting(503, "Service unavailable");

    const response = await createPendingInvoiceAndEmit();

    expect(response.status).toBe(503);
  });
});
