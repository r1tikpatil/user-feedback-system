const express = require("express");
const router = express.Router();
const { validateFeedback } = require("../utils/validater.utils");
const {
  addFeedback,
  getAllFeedback,
} = require("../controllers/feedback.controller");

// Submit feedback
router.post("/feedback", validateFeedback, addFeedback);

// Get all feedback with filtering and sorting
router.get("/feedback", getAllFeedback);

module.exports = router;
