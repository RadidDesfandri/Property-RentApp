import { responseError } from '@/helper/ResponseError';
import {
  createPropertyServices,
  deletePropertyServices,
  editPropertyServices,
  getPropertyActiveServices,
  getPropertyByidServices,
  getPropertyByTenantIdServices,
  getPropertyDraftServices,
  getPropertyPublishServices,
  publishPropertyServices,
  unpublishServices,
} from '@/services/property.services';
import { NextFunction, Request, Response } from 'express';

export class PropertyControler {
  async getProperty(req: Request, res: Response) {
    try {
      const property = await getPropertyActiveServices();
      return res.status(200).send({
        status: 'OK',
        total: property.length,
        property,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async getPropertyByid(req: Request, res: Response) {
    try {
      const property = await getPropertyByidServices(req.params.id);
      return res.status(200).send({
        status: 'ok',
        property,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createPropertyController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createPropertyServices(
        req.user?.id!,
        req.body,
        req.file?.filename!,
      );
      res.status(200).send({
        status: 'ok',
        msg: 'Property created',
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async publishProperty(req: Request, res: Response, next: NextFunction) {
    try {
      await publishPropertyServices(req.params.id);
      return res.status(200).send({
        status: 'OK',
        msg: 'Property has been published',
      });
    } catch (error) {
      next(error);
    }
  }
  async getPropertyByTenantId(req: Request, res: Response, next: NextFunction) {
    try {
      const property = await getPropertyByTenantIdServices(req.user?.id!);
      return res.status(200).send({
        status: 'OK',
        property,
      });
    } catch (error) {
      next(error);
    }
  }
  async getPropertyActiveTenant(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const property = await getPropertyPublishServices(req.user?.id!);
      return res.status(200).send({
        status: 'OK',
        total: property.length,
        property,
      });
    } catch (error) {
      next(error);
    }
  }
  async getPropertyDraftTenant(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const property = await getPropertyDraftServices(req.user?.id!);
      return res.status(200).send({
        status: 'OK',
        property,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteProperty(req: Request, res: Response, next: NextFunction) {
    try {
      await deletePropertyServices(req.params.id);
      return res.status(200).send({
        status: 'OK',
        msg: 'Property deleted',
      });
    } catch (error) {
      next(error);
    }
  }
  async unPublishProperty(req: Request, res: Response, next: NextFunction) {
    try {
      await unpublishServices(req.params.id);
      return res.status(200).send({
        status: 'OK',
        msg: 'Property is drafted and not published.',
      });
    } catch (error) {
      next(error);
    }
  }
  async editProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const property = await editPropertyServices(
        req.params.id,
        req.user?.id!,
        req.body,
        req.file?.filename!,
      );
      return res.status(200).send({
        status: 'OK',
        msg: 'Property edited',
        property,
      });
    } catch (error) {
      next(error);
    }
  }
}
