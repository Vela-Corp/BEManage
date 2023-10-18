import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

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
eventSchema.plugin(mongoosePaginate);
const Event = mongoose.model("Event", eventSchema);
export default Event;
