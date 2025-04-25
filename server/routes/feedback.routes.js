const express = require("express");
const router = express.Router();
const { validateFeedback } = require("../utils/validater.utils");
const {
  addFeedback,
  getAllFeedback,
} = require("../controllers/feedback.controller");

// Submit feedback
router.post("", validateFeedback, addFeedback);

// Get all feedback with filtering and sorting
router.get("", getAllFeedback);

module.exports = router;
