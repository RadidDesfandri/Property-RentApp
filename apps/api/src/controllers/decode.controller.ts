import { responseError } from '@/helper/ResponseError';
import { Request, Response } from 'express';

export class DecodeTokenController {
  async DecodeToken(req: Request, res: Response) {
    try {
      res.status(200).send({
        user: req.user,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
