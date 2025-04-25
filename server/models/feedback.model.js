const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  feedbackText: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["suggestion", "bug report", "feature request", "other"],
    default: "other",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster filtering and sorting
feedbackSchema.index({ category: 1, timestamp: -1 });

module.exports = mongoose.model("Feedback", feedbackSchema);
