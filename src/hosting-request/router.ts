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
router.put("/:id/respond", authMiddleware, HostingRequestController.respondToHostingRequest);
router.put("/:id/cancel", authMiddleware, HostingRequestController.cancelHostingRequest);
router.delete("/:id", authMiddleware, HostingRequestController.deleteHostingRequest);


export default router;
