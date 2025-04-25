// src/services/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post("/feedback", feedbackData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to submit feedback";
    throw new Error(errorMessage);
  }
};

export const getFeedback = async (params = {}) => {
  try {
    const response = await api.get("/feedback", { params });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch feedback";
    throw new Error(errorMessage);
  }
};

export const fetchAnalyticsData = async () => {
  try {
    const [overviewRes, keywordRes, userEngagementRes] = await Promise.all([
      api.get("/analytics/overview"),
      api.get("/analytics/keywords"),
      api.get("/analytics/user-engagement"),
    ]);

    return {
      overviewStats: overviewRes.data,
      keywordData: keywordRes.data,
      userEngagementData: userEngagementRes.data,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to load analytics data"
    );
  }
};

export default api;
