import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
const customerSchema = new Schema(
  // list of fields
  {
    name: String,
    phone: String,
    address: String,
    note: String,
    created_by: String,
    updated_by: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
customerSchema.plugin(mongoosePaginate);
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
