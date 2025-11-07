import express from "express";
const router = express.Router();
import * as userController from "./user.controller.js";

router.post("/", userController.createUser);
router.get("/", userController.getUser);

export default router;
