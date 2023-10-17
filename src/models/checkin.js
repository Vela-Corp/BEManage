import mongoose from "mongoose";
import { Schema } from "mongoose";
const checkinSchema = new Schema(
  {
    event_id: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
    },
    customer_id: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
    },
    phone: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Checkin = mongoose.model("Checkin", checkinSchema);
export default Checkin;
