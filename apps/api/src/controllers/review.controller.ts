import { Request, Response } from 'express';
import { responseError } from '@/helper/ResponseError';
import prisma from '@/prisma';
import { reviewServices } from '@/services/review.service';
import { ICreateReview } from '@/types/review';

export class ReviewController {
  //MEMBUAT REVIEW
  async createReview(req: Request, res: Response) {
    try {
      const { content, ratings } = req.body;
      const { reservation_id } = req.params;
      const payload: ICreateReview = { ratings, content, reservation_id };
      const data = await reviewServices.createReview(payload);
      res.status(201).send({
        status: 'OK',
        data,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        status: 'ERROR',
        message: error.message,
      });
    }
  }
  //GET REVIEW By Tenant
  async getReviewbyTenant(req: Request, res: Response) {
    try {
      const tenant_id = req.user?.id;
      const data = await reviewServices.getReviewbyTenant(tenant_id!);
      res.status(200).send({ status: 'ok', data });
    } catch (error) {
      responseError(res, error);
    }
  }

  //GET REVIEW BY RESERVATION ID
  async getReviewByReservation(req: Request, res: Response) {
    try {
      const { reservation_id } = req.params;
      const data = await reviewServices.getReviewByReservation(reservation_id);
      res.status(200).send({ status: 'ok', data });
    } catch (error) {
      responseError(res, error);
    }
  }
  //GET REVIW BY PROPERTY
  async getReviewByProperty(req: Request, res: Response) {
    try {
      const { reservation_id } = req.params;
      const data = await reviewServices.getReviewByProperty(reservation_id);
      res.status(200).send({ status: 'ok', data });
    } catch (error) {
      responseError(res, error);
    }
  }
  //FEEDBACK
  async feedBackReview(req: Request, res: Response) {
    try {
      const { feedback, review_id } = req.body;
      if (!feedback) throw 'masukan feedback';
      if (!review_id) throw 'masukan id review';
      await reviewServices.feedBackReview(feedback, review_id);
      res.status(201).send({
        status: 'OKE',
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  async getReviewByUser(req: Request, res: Response) {
    try {
      const data = await reviewServices.getReviewByUser(req.user?.id!);
      res.status(200).send({
        status: 'OK',
        data,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
