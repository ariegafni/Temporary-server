import { Request, Response } from "express";
import { AuthManager } from "./manager";

export class AuthController {
  static async login(req: Request, res: Response) {
    res.json(await AuthManager.login(req.body));
  }

  static async register(req: Request, res: Response) {
    res.json(await AuthManager.register(req.body));
  }

  static async logout(req: Request, res: Response) {
    res.json(await AuthManager.logout(req.headers.authorization));
  }

  static async refresh(req: Request, res: Response) {
    res.json(await AuthManager.refresh(req.body.refresh_token));
  }

  static async verifyEmail(req: Request, res: Response) {
    res.json(await AuthManager.verifyEmail(req.body.token));
  }

  static async forgotPassword(req: Request, res: Response) {
    res.json(await AuthManager.forgotPassword(req.body.email));
  }

  static async resetPassword(req: Request, res: Response) {
    res.json(await AuthManager.resetPassword(req.body));
  }

  static async loginWithGoogle(req: Request, res: Response) {
    res.json(await AuthManager.loginWithGoogle(req.body.code));
  }

  static async loginWithFacebook(req: Request, res: Response) {
    res.json(await AuthManager.loginWithFacebook(req.body.code));
  }
}
