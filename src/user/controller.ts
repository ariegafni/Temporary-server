import { Response } from "express";
import { UserManager } from "./manager";
import { AuthRequest } from "../auth/authMiddleware";

export class UserController {
  static async getCurrentUser(req: AuthRequest, res: Response) {
    res.json(await UserManager.getCurrentUser(req.user!.id));
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    res.json(await UserManager.updateProfile(req.user!.id, req.body));
  }

  static async changePassword(req: AuthRequest, res: Response) {
    res.json(await UserManager.changePassword(req.user!.id, req.body));
  }

  static async deleteAccount(req: AuthRequest, res: Response) {
    res.json(await UserManager.deleteAccount(req.user!.id));
  }

  static async uploadProfileImage(req: AuthRequest, res: Response) {
    res.json(await UserManager.uploadProfileImage(req.user!.id, req.file));
  }

  static async getActivityHistory(req: AuthRequest, res: Response) {
    res.json(await UserManager.getActivityHistory(req.user!.id));
  }

  static async getUserSettings(req: AuthRequest, res: Response) {
    res.json(await UserManager.getUserSettings(req.user!.id));
  }

  static async updateUserSettings(req: AuthRequest, res: Response) {
    res.json(await UserManager.updateUserSettings(req.user!.id, req.body));
  }

  static async getUserStats(req: AuthRequest, res: Response) {
    res.json(await UserManager.getUserStats(req.user!.id));
  }
}
