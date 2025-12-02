import Joi from "joi";

export const emitInvoiceSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
