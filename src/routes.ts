import { Router } from "express";
import authRouter from "./auth/router";
import hostRouter from "./host/router";
import locationRouter from "./location/router";
import messageRouter from "./message/router";
import userRouter from "./user/router";

const router = Router();

router.use("/auth", authRouter);
router.use("/hosts", hostRouter);
router.use("/locations", locationRouter);
router.use("/message", messageRouter);
router.use("/users", userRouter);

export default router;
