const express = require("express");
const router = express.Router();
const {
  getOverviewStats,
  getKeywordAnalysis,
  getUserEngagementMetrics,
} = require("../controllers/analytics.controller");

router.get("/overview", getOverviewStats);
router.get("/keywords", getKeywordAnalysis);
router.get("/user-engagement", getUserEngagementMetrics);

module.exports = router;
