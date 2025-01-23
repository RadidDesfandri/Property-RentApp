import {
  changeEmailTServices,
  editTenantServices,
  forgotPasswordTenantServices,
  loginTenantServices,
  registerServicesTenant,
  resetPasswordTenantServices,
  sendVerificationChangeMailTServices,
  updateDataTenantServices,
  verifyOtpServicesTenant,
} from '@/services/account/tenant.services';
import { NextFunction, Request, Response } from 'express';

export class TenantController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { createTenant, token } = await registerServicesTenant(req.body);
      return res.status(200).send({
        status: 'ok',
        msg: 'Registration is successful, please check your email for verification',
        token,
        createTenant,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new Error('Authorization header is required');
      const token = authHeader.replace('Bearer ', '');
      const { otp } = req.body;
      if (!token || !otp) throw new Error('Otp are required');
      const result = await verifyOtpServicesTenant(token, otp);
      return res.status(200).send({
        status: 'ok',
        msg: 'Verification successful',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateDataTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new Error('Authorization header is required');
      const token = authHeader.replace('Bearer ', '');
      const result = await updateDataTenantServices(req.body, token);
      return res.status(200).send({
        status: 'ok',
        msg: 'Email has been registered, please login',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await loginTenantServices(req.body);
      return res.status(200).send({
        status: 'ok',
        msg: 'Login succes',
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPasswordTenant(req: Request, res: Response, next: NextFunction) {
    try {
      await forgotPasswordTenantServices(req.body.email);
      return res.status(200).send({
        status: 'ok',
        msg: 'Send email success, please check your email',
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPasswordTenant(req: Request, res: Response, next: NextFunction) {
    try {
      await resetPasswordTenantServices(req.user?.id!, req.body.password);
      return res.status(200).send({
        status: 'ok',
        msg: 'Reset password success',
      });
    } catch (error) {
      next(error);
    }
  }

  async editTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await editTenantServices(
        req.body,
        req.user?.id!,
        req.file?.filename!,
      );
      return res.status(200).send({
        msg: 'User edited',
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async sendVerificationChangeMail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await sendVerificationChangeMailTServices(req.user?.email!);
      return res.status(200).send({
        status: 'ok',
        msg: 'Send email success, please check your email',
      });
    } catch (error) {
      next(error);
    }
  }

  async changeEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { newMail, token } = await changeEmailTServices(
        req.user?.id!,
        req.body.email,
      );
      return res.status(200).send({
        status: 'ok',
        msg: 'Change email success,  please check your email for verification',
        token,
        newMail,
      });
    } catch (error) {
      next(error);
    }
  }
}
