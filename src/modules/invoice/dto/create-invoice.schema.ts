import Joi from "joi";

export const createInvoiceSchema = Joi.object({
  cnpjCustomer: Joi.string().length(14).required(),
  municipality: Joi.string().min(2).required(),
  state: Joi.string().length(2).required(),
  serviceValue: Joi.number().positive().required(),
  desiredIssueDate: Joi.string().isoDate().required(),
  description: Joi.string().min(3).required(),
});
