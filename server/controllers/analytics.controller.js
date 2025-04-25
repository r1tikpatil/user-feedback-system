// analytics.controller.js
import FeedbackModel from "../models/feedback.model.js";

export const getOverviewStats = async (req, res) => {
  try {
    // Get total feedback count
    const totalCount = await FeedbackModel.countDocuments();

    // Get feedback count by category
    const categoryCounts = await FeedbackModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Get daily feedback counts for the past 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyTrends = await FeedbackModel.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      message: "Overview statistics fetched successfully",
      data: {
        totalCount,
        categoryCounts,
        dailyTrends,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching overview statistics",
      error: error.message,
    });
  }
};

export const getKeywordAnalysis = async (req, res) => {
  try {
    const allFeedback = await FeedbackModel.find(
      {},
      { feedbackText: 1, _id: 0 }
    );

    const wordCounts = {};
    const stopWords = [
      "the",
      "a",
      "an",
      "and",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "is",
      "was",
      "are",
      "were",
    ];

    allFeedback.forEach((item) => {
      if (item.feedbackText) {
        const words = item.feedbackText.toLowerCase().match(/\b(\w+)\b/g) || [];
        words.forEach((word) => {
          if (word.length > 2 && !stopWords.includes(word)) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
          }
        });
      }
    });

    const keywordAnalysis = Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30);

    res.status(200).json({
      success: true,
      message: "Keyword analysis completed successfully",
      data: keywordAnalysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error analyzing keywords",
      error: error.message,
    });
  }
};

export const getUserEngagementMetrics = async (req, res) => {
  try {
    const uniqueUsersCount = await FeedbackModel.aggregate([
      { $group: { _id: "$email" } },
      { $count: "uniqueUsers" },
    ]);

    const repeatedUsers = await FeedbackModel.aggregate([
      { $group: { _id: "$email", count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $sort: { count: -1 } },
      { $project: { email: "$_id", count: 1, _id: 0 } },
    ]);

    const avgFeedbackLength = await FeedbackModel.aggregate([
      {
        $addFields: {
          textLength: { $strLenCP: "$feedbackText" },
        },
      },
      {
        $group: {
          _id: null,
          averageLength: { $avg: "$textLength" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "User engagement metrics fetched successfully",
      data: {
        uniqueUsers: uniqueUsersCount[0]?.uniqueUsers || 0,
        repeatedUsers,
        averageFeedbackLength: avgFeedbackLength[0]?.averageLength || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user engagement metrics",
      error: error.message,
    });
  }
};
