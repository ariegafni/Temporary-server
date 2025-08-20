import { Router } from "express";
import { UserController } from "./controller";
import { authMiddleware } from "../auth/authMiddleware";


const router = Router();

// פרופיל משתמש נוכחי
router.get("/me", authMiddleware, UserController.getCurrentUser);
router.put("/me", authMiddleware, UserController.updateProfile);
router.delete("/me", authMiddleware, UserController.deleteAccount);

// שינוי סיסמה
router.put("/change-password", authMiddleware, UserController.changePassword);

// העלאת תמונת פרופיל
router.post("/upload-profile-image", authMiddleware, UserController.uploadProfileImage);

export default router;
