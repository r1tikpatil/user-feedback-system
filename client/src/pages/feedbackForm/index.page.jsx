import React, { useState } from "react";
import { toast } from "react-toastify";
import { submitFeedback } from "../../services/api.service";
import {
  ErrorMessage,
  FormContainer,
  FormGroup,
  Input,
  Label,
  Textarea,
  Select,
  Button,
} from "./index.style";

const FeedbackForm = () => {
  const defaultFormData = {
    userName: "",
    email: "",
    feedbackText: "",
    category: "other",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName.trim()) {
      newErrors.userName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.feedbackText.trim()) {
      newErrors.feedbackText = "Feedback text is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await submitFeedback(formData);
      toast.success("Feedback submitted successfully!");

      setFormData(defaultFormData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <h2>Submit Your Feedback</h2>
      <p>We value your input to improve our services.</p>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="userName">Your Name</Label>
          <Input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          {errors.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Feedback Category</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="suggestion">Suggestion</option>
            <option value="bug report">Bug Report</option>
            <option value="feature request">Feature Request</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="feedbackText">Your Feedback</Label>
          <Textarea
            id="feedbackText"
            name="feedbackText"
            rows="6"
            value={formData.feedbackText}
            onChange={handleChange}
          />
          {errors.feedbackText && (
            <ErrorMessage>{errors.feedbackText}</ErrorMessage>
          )}
        </FormGroup>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default FeedbackForm;
