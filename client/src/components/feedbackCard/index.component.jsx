import React from "react";
import {
  FeedbackCard as Card,
  FeedbackCategory,
  FeedbackHeader,
  FeedbackMeta,
  FeedbackName,
  FeedbackText,
  ShowMoreLess,
} from "./index.style";

const FeedbackCard = ({ feedback, isExpanded, toggleExpand }) => {
  const needsToggle = feedback.feedbackText.length > 150;
  const shortText = feedback.feedbackText.slice(0, 150) + "...";

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Card>
      <FeedbackHeader>
        <FeedbackName>{feedback.userName}</FeedbackName>
        <FeedbackMeta>{formatDate(feedback.timestamp)}</FeedbackMeta>
      </FeedbackHeader>
      <FeedbackCategory category={feedback.category}>
        {feedback.category}
      </FeedbackCategory>
      <FeedbackText expanded={isExpanded}>
        {isExpanded || !needsToggle ? feedback.feedbackText : shortText}
      </FeedbackText>
      {needsToggle && (
        <ShowMoreLess onClick={() => toggleExpand(feedback._id)}>
          {isExpanded ? "Show less" : "Show more"}
        </ShowMoreLess>
      )}
    </Card>
  );
};

export default FeedbackCard;
