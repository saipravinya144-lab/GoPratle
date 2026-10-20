
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Event = require("./models/Event");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "GoPratle backend is running!" });
});

app.post("/api/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();

    res.status(201).json({
      message: "Event saved successfully!",
      event: savedEvent,
    });
  } catch (error) {
    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        message: "Invalid event data.",
        error: error.message,
      });
    }

    console.error("Error saving event:", error.message);
    res.status(500).json({
      message: "Failed to save event.",
    });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
