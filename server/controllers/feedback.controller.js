import { validationResult } from "express-validator";
import FeedbackModel from "../models/feedback.model.js";

/**
 * @desc    Add new feedback
 * @route   POST /api/feedback
 * @access  Public
 */
export const addFeedback = async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      data: errors.array(),
    });
  }

  try {
    const feedback = new FeedbackModel({
      userName: req.body.userName,
      email: req.body.email,
      feedbackText: req.body.feedbackText,
      category: req.body.category || "other",
    });

    const savedFeedback = await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: savedFeedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting feedback",
      data: null,
    });
  }
};

/**
 * @desc    Get all feedback with optional filters, sorting, and pagination
 * @route   GET /api/feedback
 * @access  Public
 */
export const getAllFeedback = async (req, res) => {
  try {
    const { category, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

    const query = {};
    const options = {
      sort: {},
      skip: (page - 1) * limit,
      limit: parseInt(limit),
    };

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    if (sortBy) {
      options.sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    } else {
      options.sort.timestamp = -1;
    }

    const feedback = await FeedbackModel.find(query, null, options);
    const total = await FeedbackModel.countDocuments(query);

    // Return paginated response
    res.status(200).json({
      success: true,
      message: "Feedback fetched successfully",
      data: {
        feedback,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    // Handle server error
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching feedback",
      data: null,
    });
  }
};
