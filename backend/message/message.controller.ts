import * as messageService from "./message.service.js";
// Message routes
export const createMessage = async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const { content, senderId } = req.body;
    if (
      !(
        typeof content === "string" &&
        content.trim() !== "" &&
        typeof senderId === "number" &&
        senderId > 0
      )
    ) {
      throw new Error("Invalid data");
    }

    const newMessage = await messageService.createMessage({
      content: content.trim(),
      senderId,
    });

    res
      .status(201)
      .json({ message: "Message created successfully", data: newMessage });
  } catch (e) {
    next(e);
  }
};

export const getMessages = async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const messages = await messageService.getMessages();
    res.status(200).json({ message: "success", data: messages });
  } catch (e) {
    next(e);
  }
};
