import styled from "styled-components";

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;

  button {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    background-color: white;
    cursor: pointer;
    border-radius: 4px;

    &.active {
      background-color: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
