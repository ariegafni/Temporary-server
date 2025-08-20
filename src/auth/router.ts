import { Router } from "express";
import { AuthController } from "./controller";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);
router.post("/refresh", AuthController.refresh);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.post("/google", AuthController.loginWithGoogle);
router.post("/facebook", AuthController.loginWithFacebook);

export default router;
