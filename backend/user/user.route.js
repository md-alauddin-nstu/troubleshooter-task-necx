import express from "express";
const router = express.Router();
import * as userController from "./user.controller.js";

router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.delete("/", userController.deleteAllUsers);

export default router;
