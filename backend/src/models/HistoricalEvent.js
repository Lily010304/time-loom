import mongoose from "mongoose";

const HistoricalEventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  category: {
    type: String,
    enum: [
      "Wars",
      "Science",
      "Discoveries",
      "Culture",
      "Catastrophes",
      "Architecture",
      "Political"
    ],
    required: true
  },
  continent: {
    type: String,
    enum: ["Africa", "Asia", "Europe", "Americas", "Oceania"],
    required: true
  },
  country: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number
  },
  shortDescription: String,
  fullDescription: String,
  globalImpact: String,
  imageUrl: String,
  era: {
    type: String,
    enum: ["Ancient", "Medieval", "Renaissance", "Industrial", "Modern"],
    required: true
  },
  civilization: String,
  isTopInfluential: Boolean
});

export default mongoose.model("HistoricalEvent", HistoricalEventSchema);
