
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    venue: { type: String, default: "" },

    category: {
      type: String,
      required: true,
      enum: ["Event Planner", "Performer", "Crew"],
    },

    role: { type: String, required: true },
    description: { type: String, default: "" },
    budget: { type: Number, default: null },
    audience: { type: Number, default: null },
    duration: { type: Number, default: null },
    requirements: { type: String, default: "" },
    experience: { type: String, default: "" },
    availability: { type: String, default: "" },
    rate: { type: Number, default: null },

    contactName: { type: String, required: true, trim: true },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
