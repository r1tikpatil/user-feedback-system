import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getFeedback } from "../../services/api.service";
import { DashboardContainer, Loading, NoData, Title } from "./index.style";
import FeedbackFilters from "../../components/feedbackFilters/index.component";
import FeedbackList from "../../components/feedbackList/index.component";
import PaginationControls from "../../components/paginationControls/index.component";

const Dashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [filters, setFilters] = useState({
    category: "",
    sortBy: "timestamp",
    sortOrder: "desc",
    page: 1,
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
  });

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const data = await getFeedback(filters);
      setFeedbackData(data.data.feedback);
      setPagination({
        totalPages: data.data.totalPages,
        currentPage: data.data.currentPage,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <DashboardContainer>
      <Title>Feedback Dashboard</Title>

      <FeedbackFilters filters={filters} onChange={handleFilterChange} />

      {loading ? (
        <Loading>Loading feedback data...</Loading>
      ) : feedbackData.length === 0 ? (
        <NoData>No feedback found. Try changing filters.</NoData>
      ) : (
        <FeedbackList
          feedbackData={feedbackData}
          expanded={expanded}
          toggleExpand={toggleExpand}
        />
      )}

      <PaginationControls
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </DashboardContainer>
  );
};

export default Dashboard;
