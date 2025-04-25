import React, { useEffect, useState } from "react";
import { fetchAnalyticsData } from "../../services/api.service";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Card,
  CardTitle,
  ChartSection,
  ChartTitle,
  Container,
  DashboardGrid,
  NoDataMessage,
  PageTitle,
  StatContainer,
  StatNumber,
  StatTitle,
  StatItem,
  ErrorMessage,
  KeywordTag,
  KeywordsContainer,
  LoadingMessage,
  TagCloud,
} from "./index.style";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [overviewStats, setOverviewStats] = useState(null);
  const [keywordData, setKeywordData] = useState(null);
  const [userEngagementData, setUserEngagementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchAnalyticsData();
        setOverviewStats(data.overviewStats?.data || {});
        setKeywordData(data.keywordData?.data || []);
        setUserEngagementData(data.userEngagementData?.data || {});
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <LoadingMessage>Loading analytics data...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  const topKeywords = Array.isArray(keywordData)
    ? keywordData.slice(0, 15)
    : [];

  return (
    <Container>
      <PageTitle>Feedback Analytics Dashboard</PageTitle>
      <DashboardGrid>
        <Card $fullWidth>
          <CardTitle>Overview Statistics</CardTitle>
          <>
            <StatContainer>
              <StatItem>
                <StatTitle>Total Feedback</StatTitle>
                <StatNumber>{overviewStats.totalCount || 0}</StatNumber>
              </StatItem>
            </StatContainer>

            <ChartSection>
              <ChartTitle>Feedback by Category</ChartTitle>
              {overviewStats.categoryCounts &&
              overviewStats.categoryCounts.length > 0 ? (
                <Bar
                  data={{
                    labels: overviewStats.categoryCounts.map(
                      (item) => item._id || "Uncategorized"
                    ),
                    datasets: [
                      {
                        label: "Feedback Count",
                        data: overviewStats.categoryCounts.map(
                          (item) => item.count
                        ),
                        backgroundColor: [
                          "rgba(54, 162, 235, 0.6)",
                          "rgba(255, 99, 132, 0.6)",
                          "rgba(255, 206, 86, 0.6)",
                          "rgba(75, 192, 192, 0.6)",
                          "rgba(153, 102, 255, 0.6)",
                        ],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                      y: { beginAtZero: true, ticks: { precision: 0 } },
                    },
                  }}
                />
              ) : (
                <NoDataMessage>No category data available</NoDataMessage>
              )}
            </ChartSection>

            <ChartSection>
              <ChartTitle>Feedback Trends (Last 30 Days)</ChartTitle>
              {overviewStats.dailyTrends &&
              overviewStats.dailyTrends.length > 0 ? (
                <Line
                  data={{
                    labels: overviewStats.dailyTrends.map((item) => item._id),
                    datasets: [
                      {
                        label: "Daily Feedback Count",
                        data: overviewStats.dailyTrends.map(
                          (item) => item.count
                        ),
                        fill: true,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                      y: { beginAtZero: true, ticks: { precision: 0 } },
                    },
                  }}
                />
              ) : (
                <NoDataMessage>No trend data available</NoDataMessage>
              )}
            </ChartSection>
          </>
        </Card>

        <Card $halfWidth>
          <CardTitle>Common Keywords</CardTitle>
          {topKeywords.length > 0 ? (
            <KeywordsContainer>
              <ChartSection>
                <Bar
                  data={{
                    labels: topKeywords.map((item) => item.word || ""),
                    datasets: [
                      {
                        label: "Keyword Frequency",
                        data: topKeywords.map((item) => item.count || 0),
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    indexAxis: "y",
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            return `Count: ${context.raw}`;
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0,
                        },
                      },
                    },
                  }}
                />
              </ChartSection>
              <TagCloud>
                {topKeywords.map((keyword, index) => {
                  const fontSize = `${Math.max(
                    0.8,
                    Math.min(2, 0.8 + keyword.count / 10)
                  )}rem`;
                  const opacity =
                    0.7 + (keyword.count / (topKeywords[0]?.count || 1)) * 0.3;

                  return (
                    <KeywordTag
                      key={index}
                      $fontSize={fontSize}
                      $opacity={opacity}
                    >
                      {keyword.word}
                    </KeywordTag>
                  );
                })}
              </TagCloud>
            </KeywordsContainer>
          ) : (
            <NoDataMessage>No keyword data available</NoDataMessage>
          )}
        </Card>

        <Card>
          <CardTitle>User Engagement</CardTitle>
          {userEngagementData && (
            <>
              <StatContainer>
                <StatItem>
                  <StatTitle>Unique Users</StatTitle>
                  <StatNumber>{userEngagementData.uniqueUsers || 0}</StatNumber>
                </StatItem>
                <StatItem>
                  <StatTitle>Avg. Length</StatTitle>
                  <StatNumber>
                    {Math.round(userEngagementData.averageFeedbackLength) || 0}
                  </StatNumber>
                </StatItem>
              </StatContainer>

              <ChartSection>
                <ChartTitle>Top Engaged Users</ChartTitle>
                {userEngagementData.repeatedUsers &&
                userEngagementData.repeatedUsers.length > 0 ? (
                  <Bar
                    data={{
                      labels: userEngagementData.repeatedUsers
                        .slice(0, 10)
                        .map(
                          (user) =>
                            user.email?.split("@")[0] + "..." || "Anonymous"
                        ),
                      datasets: [
                        {
                          label: "Feedback Submissions",
                          data: userEngagementData.repeatedUsers
                            .slice(0, 10)
                            .map((user) => user.count || 0),
                          backgroundColor: "rgba(153, 102, 255, 0.6)",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      scales: {
                        y: { beginAtZero: true, ticks: { precision: 0 } },
                      },
                    }}
                  />
                ) : (
                  <NoDataMessage>
                    No user engagement data available
                  </NoDataMessage>
                )}
              </ChartSection>
            </>
          )}
        </Card>
      </DashboardGrid>
    </Container>
  );
};

export default Analytics;
