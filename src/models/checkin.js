import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
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
    checked_by: {
      type: mongoose.Types.ObjectId,
      ref: "Auth",
    },
    checked_at: Date,
    phone: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
checkinSchema.plugin(mongoosePaginate);
const Checkin = mongoose.model("Checkin", checkinSchema);
export default Checkin;
