import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { CreateInvoiceService, EmitInvoiceService, GetAllInvoicesService, GetOneInvoiceService } from "./service";
import { CreateInvoiceDto } from "./dto";

export class InvoiceController {
  constructor(
    private readonly createInvoiceService: CreateInvoiceService,
    private readonly getAllInvoicesService: GetAllInvoicesService,
    private readonly getOneInvoiceService: GetOneInvoiceService,
    private readonly emitInvoiceService: EmitInvoiceService,
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

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const invoices = await this.getAllInvoicesService.execute();
      return res.status(httpStatus.OK).json(invoices);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const invoice = await this.getOneInvoiceService.execute(Number(id));
      return res.status(httpStatus.OK).json(invoice);
    } catch (error) {
      next(error);
    }
  } 

  async emit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const emittedInvoice = await this.emitInvoiceService.execute(Number(id));
      return res.status(httpStatus.OK).json(emittedInvoice);
    } catch (error) {
      next(error);
    }
  }
}