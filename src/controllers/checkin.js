import Checkin from "../models/checkin.js";
import Customer from "../models/customer.js";

export const createCheckin = async (req, res) => {
  const { event_id, customer_id, phone } = req.body;
  const newCheckin = new Checkin({ event_id, customer_id });
  const phones = await Customer.findOne({ phone });
  const customered = await Checkin.findOne({ phone });
  try {
    if (!phones) {
      return res.status(404).json({ message: "Phone not found" });
    }
    if (customered) {
      return res.status(404).json({ message: "Phone đã checkin" });
    }
    await newCheckin.save();
    return res.status(201).json(newCheckin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
