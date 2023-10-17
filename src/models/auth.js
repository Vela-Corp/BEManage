import mongoose from "mongoose";
import { Schema } from "mongoose";
const schemaAuth = new Schema(
  {
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    role: {
      default: "user",
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Auth = mongoose.model("Auth", schemaAuth);
export default Auth;
