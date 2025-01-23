import {
  LoginGithubServices,
  LoginGithubTenantServices,
  LoginGoogleServices,
  LoginGoogleTenantServices,
} from '@/services/sosmedlogin.service';
import { NextFunction, Request, Response } from 'express';
export class SosmedLoginController {
  async LoginGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, avatar, username } = req.body;
      const { userData, token } = await LoginGoogleServices(
        email,
        avatar,
        username,
      );
      return res.status(200).send({ userData, token });
    } catch (error) {
      next(error);
    }
  }

  async LoginGoogleTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, avatar, username } = req.body;
      const { userData, token } = await LoginGoogleTenantServices(
        email,
        avatar,
        username,
      );
      return res.status(200).send({ userData, token });
    } catch (error) {
      next(error);
    }
  }

  async LoginGithub(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, avatar, username } = req.body;
      const { userData, token } = await LoginGithubServices(email, avatar, username);
      return res.status(200).send({ userData, token });
    } catch (error) {
      next(error);
    }
  }

  async LoginGithubTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, avatar, username } = req.body;
      const { userData, token } = await LoginGithubTenantServices(email, avatar, username);
      return res.status(200).send({ userData, token });
    } catch (error) {
      next(error);
    }
  }
}
