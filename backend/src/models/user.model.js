import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Message from "./Message.model";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name must be less than 50 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [100, "Password must not exceed 100 characters"],
      select: false, // You need to select this explicitly when querying if you want this field (password)
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getQuery());
  await Message.deleteMany({ senderId: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
