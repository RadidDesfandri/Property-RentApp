import {
  changeEmailServices,
  editUserServices,
  forgotPasswordUserServices,
  loginUserServices,
  registerServicesUser,
  resetPasswordUserServices,
  sendVerificationChangeMailServices,
  updateDatauserServices,
  verifyOtpServices,
} from '@/services/account/user.services';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { createUser, token } = await registerServicesUser(req.body);
      return res.status(200).send({
        status: 'ok',
        msg: 'Registration is successful, please check your email for verification',
        token,
        createUser,
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
      const result = await verifyOtpServices(token, otp);
      return res.status(200).send({
        status: 'ok',
        msg: 'Verification successful',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateDatauser(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new Error('Authorization header is required');
      const token = authHeader.replace('Bearer ', '');
      const result = await updateDatauserServices(req.body, token);
      return res.status(200).send({
        status: 'ok',
        msg: 'Email has been registered, please login',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await loginUserServices(req.body);
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

  async forgotPasswordUser(req: Request, res: Response, next: NextFunction) {
    try {
      await forgotPasswordUserServices(req.body.email);
      return res.status(200).send({
        status: 'ok',
        msg: 'Send email success, please check your email',
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPasswordUser(req: Request, res: Response, next: NextFunction) {
    try {
      await resetPasswordUserServices(req.user?.id!, req.body.password);
      return res.status(200).send({
        status: 'ok',
        msg: 'Reset password success',
      });
    } catch (error) {
      next(error);
    }
  }

  async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await editUserServices(
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
      await sendVerificationChangeMailServices(req.user?.email!);
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
      const { newMail, token } = await changeEmailServices(
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
