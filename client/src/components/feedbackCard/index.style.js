import styled, { css } from "styled-components";

export const FeedbackCard = styled.div`
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--secondary-color);
`;

export const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const FeedbackName = styled.div`
  font-weight: 600;
`;

export const FeedbackMeta = styled.div`
  font-size: 0.875rem;
  color: var(--light-text);
`;

export const FeedbackCategory = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;

  ${({ category }) => {
    switch (category?.toLowerCase()) {
      case "bug report":
        return css`
          background-color: rgba(255, 0, 0, 0.1);
          color: red;
        `;
      case "feature request":
        return css`
          background-color: rgba(74, 144, 226, 0.1);
          color: var(--primary-color);
        `;
      case "suggestion":
        return css`
          background-color: rgba(0, 128, 0, 0.1);
          color: green;
        `;
      case "other":
        return css`
          background-color: rgba(255, 165, 0, 0.1);
          color: orange;
        `;
      default:
        return css`
          background-color: rgba(0, 0, 0, 0.05);
          color: black;
        `;
    }
  }}
`;

export const FeedbackText = styled.div`
  line-height: 1.5;
  ${({ expanded }) =>
    !expanded &&
    css`
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    `}
`;

export const ShowMoreLess = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;
