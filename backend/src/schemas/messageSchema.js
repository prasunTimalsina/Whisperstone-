import * as z from "zod";

export const messageSchema = z.object({
  text: z.string().optional(),
});
