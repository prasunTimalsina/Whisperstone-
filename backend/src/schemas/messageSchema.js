import * as z from "zod";

const messageSchema = z.object({
  senderId: z.string({ required_error: "Sender ID is required" }).trim(), // TODO: The string type works but you may need to find other options
  text: z.string().optional(),
});
