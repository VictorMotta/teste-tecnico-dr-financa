import { ExternalServiceError } from "@/shared/errors";
import axios, { AxiosInstance } from "axios";
import { ExternalInvoiceResponseDto } from "../dto";

export class DrFinancasProvider {
  private api: AxiosInstance;
  constructor(authKey: string){
    const baseURL = process.env.DRFINANCAS_API_URL || "https://api.drfinancas.com/testes/";
    const finalBaseURL = baseURL.endsWith('/') ? baseURL : baseURL + '/';

    this.api = axios.create({
      baseURL: finalBaseURL,
      headers: {
        "Authorization": `${authKey}`,
        "Content-Type": "application/json",
      }
    })
  }

  async emitInvoice(): Promise<ExternalInvoiceResponseDto>  {
    try {
      const response = await this.api.post<ExternalInvoiceResponseDto>("/notas-fiscais", {})
      return response.data;
    } catch (error) {
      if(axios.isAxiosError(error)  && error.response) {
        const status = error.response.status;
        const externalMessage = error.response.data?.message || "Error detail not provided.";

        const logMessage = `Dr. Finanças API failure. Status: ${status}. External Details: ${externalMessage}`;

        if(status === 400) {
          console.error('CRITICAL MAPPING ERROR:',  logMessage);
          throw new ExternalServiceError("Internal data error when formatting the Invoice for emission.")
        }

        if(status === 401) {
          console.error('CRITICAL AUTHENTICATION ERROR:',  logMessage);
          throw new ExternalServiceError("Service key authentication failed.");
        }

        if(status >= 500) {
          console.error('EXTERNAL INFRA/SERVICE ERROR:',  logMessage);
          throw new ExternalServiceError("The Invoice emission service is unavailable. Please try again later.");
        }

        console.error('UNEXPECTED API ERROR:', logMessage);
        throw new ExternalServiceError(`The external API returned an unexpected error: ${status}.`);
      }

      throw new ExternalServiceError("Network failure or timeout when connecting to the external API.");
    }
  }
}