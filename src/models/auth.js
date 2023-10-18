import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
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
schemaAuth.plugin(mongoosePaginate);
const Auth = mongoose.model("Auth", schemaAuth);
export default Auth;
