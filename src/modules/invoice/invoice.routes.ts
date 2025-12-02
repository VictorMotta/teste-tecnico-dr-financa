import { Router } from "express";
import { createInvoiceSchema } from "./dto/create-invoice.schema";
import { validateBody } from "@/shared/middlewares/validate.middleware";
import { buildCreateInvoiceModule } from "./invoice.factory";

const router = Router();

const controller = buildCreateInvoiceModule();

router
  .get(
    "/",
    controller.findAll.bind(controller),
  )
  .post(
    "/",
    validateBody(createInvoiceSchema),
    controller.create.bind(controller),
  );

export { router as invoiceRouter };
