import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
`;

export const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;

  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
  }

  select {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }
`;
