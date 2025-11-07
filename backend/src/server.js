import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { ENV } from "./lib/env.js";

const __dirname = path.resolve();
const app = express();

const PORT = ENV.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
console.log(ENV.NODE_ENV === "production");
console.log(ENV.PORT);
// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
