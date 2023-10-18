import Checkin from "../models/checkin.js";
import Customer from "../models/customer.js";
import Event from "../models/event.js";

export const createCheckin = async (req, res) => {
  const { event_id, customer_id, phone, checked_by, checked_at } = req.body;
  const newCheckin = new Checkin({
    event_id,
    customer_id,
    phone,
    checked_by,
    checked_at,
  });
  try {
    const phones = await Customer.findOne({ phone });
    if (!phones) {
      return res.status(404).json({ message: "Phone not found" });
    }
    const existingCheckin = await Checkin.findOne({ event_id, customer_id });

    if (existingCheckin) {
      return res
        .status(404)
        .json({ message: "Khách hàng đã checkin cho sự kiện này" });
    }

    await newCheckin.save();
    return res.status(201).json(newCheckin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCheckins = async (req, res) => {
  const { sort, page, keyword } = req.query;
  const searchOptions = {};
  if (keyword) {
    const eventIds = await Event.find(
      { name: { $regex: keyword, $options: "i" } },
      "_id"
    );
    searchOptions.$or = [
      { event_id: { $in: eventIds } },
      { phone: { $regex: keyword, $options: "i" } },
    ];
  }
  try {
    const options = {
      page: parseInt(page, 10) || 1,
      limit: 10,
      sort: sort || "createdAt",
    };
    const checkins = await Checkin.paginate(searchOptions, options);
    if (checkins.length === 0) {
      return res.status(400).json({ message: "No checkins found" });
    }
    return res.status(200).json(checkins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCheckin = async (req, res) => {
  const { id } = req.params;
  await Checkin.findByIdAndDelete(id);
  res.json({ message: "Checkin deleted successfully." });
};
