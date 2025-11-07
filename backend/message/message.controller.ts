import * as messageService from "./message.service.js";
import { RequestHandler, CreateMessageInput } from "../types.js";

export const createMessage: RequestHandler = async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const { content, senderId } = req.body;
    if (
      !(
        typeof content === "string" &&
        content.trim() !== "" &&
        typeof senderId === "string" &&
        /^\d+$/.test(senderId)
      )
    ) {
      throw new Error("Invalid data");
    }

    const messageInput: CreateMessageInput = {
      content: content.trim(),
      senderId: parseInt(senderId, 10),
    };
    const newMessage = await messageService.createMessage(messageInput);

    res
      .status(201)
      .json({ message: "Message created successfully", data: newMessage });
  } catch (e) {
    next(e);
  }
};

export const getMessages: RequestHandler = async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const messages = await messageService.getMessages();
    res.status(200).json({ message: "success", data: messages });
  } catch (e) {
    next(e);
  }
};
