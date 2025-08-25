import { Response } from "express";
import * as HostingRequestManager from "./manager";
import { AuthRequest } from "../auth/authMiddleware";

export const HostingRequestController = {
  async createHostingRequest(req: AuthRequest, res: Response) {
    try {
      const hostingRequest = await HostingRequestManager.createHostingRequest(
        req.user!.id,
        req.body
      );
      res.status(201).json(hostingRequest);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getMyGuestRequests(req: AuthRequest, res: Response) {
    try {
      const requests = await HostingRequestManager.getMyGuestRequests(
        req.user!.id,
        req.query
      );
      res.json(requests);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getMyHostRequests(req: AuthRequest, res: Response) {
    try {
      const requests = await HostingRequestManager.getMyHostRequests(
        req.user!.id,
        req.query
      );
      console.log(requests);

      res.json(requests);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
