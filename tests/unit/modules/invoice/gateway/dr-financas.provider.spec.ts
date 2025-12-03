import axios, { AxiosInstance } from "axios";
import { DrFinancasProvider } from "@/modules/invoice/gateway/dr-financas.provider";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("DrFinancasProvider.emitInvoice", () => {
  const authKey = "test-key-0000";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function mockAxiosPostSuccess(data: any) {
    mockedAxios.create.mockReturnValue({
      post: jest.fn().mockResolvedValue({ data }),
    } as unknown as AxiosInstance);

    return { provider: new DrFinancasProvider(authKey) }
  }


  function makeProviderWithNetworkError() {
    const postMock = jest.fn().mockRejectedValue(new Error("Network failure"));

    mockedAxios.create.mockReturnValue({
      post: postMock,
    } as unknown as AxiosInstance);

    mockedAxios.isAxiosError.mockReturnValue(false);

    return { provider: new DrFinancasProvider(authKey), postMock };
  }


  function makeProviderWithError(status: number, message?: string) {
    const postMock = jest.fn().mockRejectedValue({
      response: {
        status,
        data: { message: message ?? "External error" },
      },
    });

    mockedAxios.create.mockReturnValue({
      post: postMock,
    } as unknown as AxiosInstance);

    mockedAxios.isAxiosError.mockReturnValue(true);

    return { provider: new DrFinancasProvider(authKey), postMock };
  }


  it("should return response.data on success", async () => {
    const expectedResponse = { numeroNF: "NF123", dataEmissao: "2025-10-10" };

    const { provider } = mockAxiosPostSuccess(expectedResponse);

    const result = await provider.emitInvoice();
    console.log(result);
    expect(result).toEqual(expectedResponse);
  });

  it("should throw ExternalServiceError (mapping error) when status = 400", async () => {
    const { provider } = makeProviderWithError(400, "Invalid payload");

    await expect(provider.emitInvoice()).rejects.toThrow(
      "Internal data error when formatting the Invoice for emission."
    );
  });

  it("should throw ExternalServiceError (auth error) when status = 401", async () => {
    const { provider } = makeProviderWithError(401, "Unauthorized");

    await expect(provider.emitInvoice()).rejects.toThrow(
      "Service key authentication failed."
    );
  });

  it("should throw ExternalServiceError (infra error) when status >= 500", async () => {
    const { provider } = makeProviderWithError(503, "Service unavailable");

    await expect(provider.emitInvoice()).rejects.toThrow(
      "The Invoice emission service is unavailable. Please try again later."
    );
  });

  it("should throw ExternalServiceError (unexpected) when status is not 400/401/5xx", async () => {
 
    const { provider } = makeProviderWithError(418, "I'm a teapot");

    await expect(provider.emitInvoice()).rejects.toThrow(
      "The external API returned an unexpected error: 418."
    );
  });

  it("should throw ExternalServiceError when axios error has no response (network failure)", async () => {
  const { provider } = makeProviderWithNetworkError();

    await expect(provider.emitInvoice()).rejects.toThrow(
      "Network failure or timeout when connecting to the external API."
    );
  });
});
