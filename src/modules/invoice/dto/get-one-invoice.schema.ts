import Joi from "joi";

export const getOneInvoiceSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
