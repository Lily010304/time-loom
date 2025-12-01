import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  icon: String,
  relatedEvents: [String]
});

export default mongoose.model("Story", StorySchema);
