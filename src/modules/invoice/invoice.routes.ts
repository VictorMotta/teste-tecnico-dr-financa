import { Router } from "express";
import { createInvoiceSchema, getOneInvoiceSchema } from "./dto";
import { validateBody, validateParams } from "@/shared/middlewares/validate.middleware";
import { buildCreateInvoiceModule } from "./invoice.factory";

const router = Router();

const controller = buildCreateInvoiceModule();

router
  .get(
    "/",
    controller.findAll.bind(controller),
  )
  .get(
    "/:id",
    validateParams(getOneInvoiceSchema),
    controller.findOne.bind(controller),
  )
  .post(
    "/",
    validateBody(createInvoiceSchema),
    controller.create.bind(controller),
  );

export { router as invoiceRouter };
