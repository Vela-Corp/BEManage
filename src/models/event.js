import mongoose from "mongoose";
import { Schema } from "mongoose";
// Event: id, name, created_by, updated_by, created_at, updated_at
const eventSchema = new Schema(
  {
    name: String,
    created_by: String,
    updated_by: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Event = mongoose.model("Event", eventSchema);
export default Event;
