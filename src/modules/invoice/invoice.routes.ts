import { Router } from "express";
import { createInvoiceSchema } from "./dto/create-invoice.schema";
import { validateBody } from "@/shared/middlewares/validate.middleware";
import { buildCreateInvoiceModule } from "./invoice.factory";

const router = Router();

const controllerCreate = buildCreateInvoiceModule();

router
  .post(
    "/",
    validateBody(createInvoiceSchema),
    controllerCreate.create.bind(controllerCreate),
  );

export { router as invoiceRouter };
