import { responseError } from '@/helper/ResponseError';
import { reportSalesServices } from '@/services/report.service';
import { Request, Response } from 'express';
export class SalesReportController {
  async getReportByProperty(req: Request, res: Response) {
    const tenant_id = req.user?.id!;
    try {
      const data = await reportSalesServices.getReportByProperty({
        tenant_id,
      });
      res.status(200).send(data);
    } catch (error) {
      responseError(res, error);
    }
  }
  async getReportByUser(req: Request, res: Response) {
    const tenant_id = req.user?.id!;
    try {
      const data = await reportSalesServices.getReportByUser(tenant_id);
      res.status(200).send(data);
    } catch (error) {
      responseError(res, error);
    }
  }
  async getReportByReservation(req: Request, res: Response) {
    const tenant_id = req.user?.id!;
    try {
      const data = await reportSalesServices.getReportByReservation(tenant_id);
      res.status(200).send(data);
    } catch (error) {
      responseError(res, error);
    }
  }
  async getReportCalendar(req: Request, res: Response) {
    const tenant_id = req.user?.id!;
    try {
      const data = await reportSalesServices.getPropertyReportCalendar(tenant_id);
      res.status(200).send(data);
    } catch (error) {
      responseError(res, error);
    }
  }
}
