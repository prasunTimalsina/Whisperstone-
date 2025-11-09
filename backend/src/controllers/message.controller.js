import Message from "../models/Message.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { io } from "../lib/socket.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;

  const { text } = req.body;

  // Logic to send message
  const newMessage = await new Message({ senderId, text });
  if (!newMessage) {
    throw new ApiError(400, "Failed to send message");
  }
  await newMessage.save();

  const populatedMessage = await newMessage.populate("senderId", "fullname");
  //real time via socket.io
  io.emit("newMessage", populatedMessage);
  res
    .status(201)
    .json(new ApiResponse(201, newMessage, "Message Created Sucessfuly"));
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().populate("senderId", "fullname");
  res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});
