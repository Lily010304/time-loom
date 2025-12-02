import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

import eventRoutes from "./src/routes/eventRoutes.js";
import eraRoutes from "./src/routes/eraRoutes.js";
import storyRoutes from "./src/routes/storyRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/eras", eraRoutes);
app.use("/api/stories", storyRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀 v2");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
