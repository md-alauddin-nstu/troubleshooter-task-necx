import * as userService from "./user.service.js";

// User routes
export const createUser = async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const { name } = req.body;
    if (!(typeof name === "string" && name.trim() !== "")) {
      console.error("Invalid Data", name);
      throw new Error("Invalid data");
    }

    const newUser = await userService.createUser({ name });
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (e) {
    next(e);
  }
};

export const getUser = async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const users = await userService.getUsers();
    res.status(200).json({ message: "success", data: users });
  } catch (e) {
    next(e);
  }
};

export const deleteAllUsers = async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    await userService.deleteAllUsers();
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (e) {
    next(e);
  }
};
