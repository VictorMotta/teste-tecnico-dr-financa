import express, { Express, Router } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "@/shared/configs";
import { errorHandler } from "@/shared/middlewares";
import { InvoiceController } from "./modules/invoice/invoice.controller";
import { buildCreateInvoiceModule } from "./modules/invoice/invoice.factory";
import { initializeInvoiceRouter } from "./modules/invoice/invoice.routes";

const app = express();

let invoiceController: InvoiceController;
let invoiceRouter: Router; 

export function init(): Promise<Express> {
	loadEnv();
	invoiceController = buildCreateInvoiceModule();
	invoiceRouter = initializeInvoiceRouter(invoiceController);

	app.use(cors())
		.use(express.json())
		.get("/health", (_req, res) => res.send("OK!"))
		.use("/invoice", invoiceRouter)
		.use(errorHandler);

	connectDb();
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
	await disconnectDB();
}

export default app;
