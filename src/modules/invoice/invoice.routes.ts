import { Router } from "express";
import { createInvoiceSchema, emitInvoiceSchema, getOneInvoiceSchema } from "./dto";
import { validateBody, validateParams } from "@/shared/middlewares/validate.middleware";
import { InvoiceController } from "./invoice.controller";

export function initializeInvoiceRouter(controller: InvoiceController): Router {
  const router = Router();
  
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
    )
    .post(
      "/:id/emit/",
      validateParams(emitInvoiceSchema),
      controller.emit.bind(controller),
    );

  return router;
}

