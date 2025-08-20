import { Request, Response } from "express";
import { HostManager } from "./manager";

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

  static async createHost(req: Request, res: Response) {
    res.json(await HostManager.createHost(req.body));
  }

  static async updateHost(req: Request, res: Response) {
    res.json(await HostManager.updateHost({ id: req.params.id, ...req.body }));
  }

  static async deleteHost(req: Request, res: Response) {
    res.json(await HostManager.deleteHost(req.params.id));
  }
}
