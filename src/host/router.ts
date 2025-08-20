import { Router } from "express";
import { HostController } from "./controller";
import { authMiddleware } from "../auth/authMiddleware";


const router = Router();

router.get("/", HostController.getAllHosts);
router.get("/me", authMiddleware, HostController.getMyHost);
router.get("/country/:country_place_id", HostController.getHostsByCountry);
router.get("/:id", HostController.getHostById);
router.post("/", authMiddleware, HostController.createHost);
router.put("/:id", HostController.updateHost);
router.delete("/:id", HostController.deleteHost);

export default router;
