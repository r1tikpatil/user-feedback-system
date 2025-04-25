import { body } from "express-validator";

export const validateFeedback = [
  body("userName").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("feedbackText")
    .trim()
    .notEmpty()
    .withMessage("Feedback text is required"),
  body("category")
    .optional()
    .isIn(["suggestion", "bug report", "feature request", "other"])
    .withMessage("Invalid category"),
];
