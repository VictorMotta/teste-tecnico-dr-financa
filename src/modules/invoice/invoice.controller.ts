import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { CreateInvoiceService } from "./service";
import { CreateInvoiceDto } from "./dto";

export class InvoiceController {
  constructor(private readonly createInvoiceService: CreateInvoiceService
  ) {}  

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data  = req.body as CreateInvoiceDto;
      console.log(data);
      const createdInvoice = await this.createInvoiceService.execute(data);

      return res.status(httpStatus.CREATED).json(createdInvoice);
    } catch (error) {
      next(error);
    }
  }
}