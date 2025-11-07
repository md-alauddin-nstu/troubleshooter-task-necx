import express from "express";
const router = express.Router();
import * as messageController from "./message.controller.js";

router.post("/", messageController.createMessage);
router.get("/", messageController.getMessages);

export default router;
