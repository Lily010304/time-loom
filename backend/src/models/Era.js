import mongoose from "mongoose";

const EraSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  title: String,
  icon: String,
  description: String,
  timeRange: String
});

export default mongoose.model("Era", EraSchema);
