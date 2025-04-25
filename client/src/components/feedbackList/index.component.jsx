import React from "react";
import { FeedbackList as List } from "./index.style";
import FeedbackCard from "../feedbackCard/index.component";

const FeedbackList = ({ feedbackData, expanded, toggleExpand }) => (
  <List>
    {feedbackData.map((feedback) => (
      <FeedbackCard
        key={feedback._id}
        feedback={feedback}
        isExpanded={expanded[feedback._id]}
        toggleExpand={toggleExpand}
      />
    ))}
  </List>
);

export default FeedbackList;
