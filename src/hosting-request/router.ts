import { Router } from "express";
import { HostingRequestController } from "./controller";
import { authMiddleware } from "../auth/authMiddleware";

const router = Router();

router.post("/", authMiddleware, HostingRequestController.createHostingRequest);
router.get(
  "/my-guest-requests",
  authMiddleware,
  HostingRequestController.getMyGuestRequests
);
router.get(
  "/my-host-requests",
  authMiddleware,
  HostingRequestController.getMyHostRequests
);

export default router;
