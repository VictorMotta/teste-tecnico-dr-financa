import Joi from "joi";

export const getOneInvoiceSchema = Joi.object({
  invoice_id: Joi.number().integer().positive().required(),
});
