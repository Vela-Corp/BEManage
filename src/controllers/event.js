import Event from "../models/event.js";

export const getAllEvents = async (req, res) => {
  const { sort, page, keyword } = req.query;
  const searchOptions = {};
  if (keyword) {
    searchOptions.name = { $regex: keyword, $options: "i" };
  }
  try {
    const options = {
      page: parseInt(page, 10) || 1,
      limit: 10,
      sort: sort || "createdAt",
    };
    const events = await Event.paginate(searchOptions, options);
    if (events.length === 0) {
      return res.status(400).json({ message: "No events found" });
    }
    return res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const event = req.body;
  const newEvent = new Event(event);
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = req.body;

  const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
  res.json(updatedEvent);
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.json({ message: "Event deleted successfully." });
};
