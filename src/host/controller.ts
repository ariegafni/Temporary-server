import { Request, Response } from "express";
import { HostManager } from "./manager";
import { AuthRequest } from "../auth/authMiddleware";

export class HostController {
  static async getAllHosts(req: Request, res: Response) {
    res.json(await HostManager.getAllHosts());
  }

  static async getHostsByCountry(req: Request, res: Response) {
    res.json(await HostManager.getHostsByCountry(req.params.country_place_id));
  }

  static async getHostById(req: Request, res: Response) {
    res.json(await HostManager.getHostById(req.params.id));
  }

  static async getMyHost(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const host = await HostManager.getHostByUserId(userId);
    if (!host) return res.status(404).json({ message: "Host not found" });
    res.json(host);
  }

  static async createHost(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const host = await HostManager.createHost(userId, req.body);
    res.json(host);
  }

  static async updateHost(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const updated = await HostManager.updateHost({
      id: req.params.id,
      userId,
      ...req.body,
    });
    res.json(updated);
  }

  static async deleteHost(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    await HostManager.deleteHost(req.params.id, userId);
    res.json({ message: "Host deleted" });
  }
}
