import HistoricalEvent from "../models/HistoricalEvent.js";

// Get all events with optional filters
export const getEvents = async (req, res) => {
  try {
    const filters = {};

    if (req.query.category) filters.category = req.query.category;
    if (req.query.era) filters.era = req.query.era;
    if (req.query.continent) filters.continent = req.query.continent;

    if (req.query.yearFrom || req.query.yearTo) {
      filters.year = {};
      if (req.query.yearFrom) filters.year.$gte = Number(req.query.yearFrom);
      if (req.query.yearTo) filters.year.$lte = Number(req.query.yearTo);
    }

    const events = await HistoricalEvent.find(filters);
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await HistoricalEvent.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }
};
