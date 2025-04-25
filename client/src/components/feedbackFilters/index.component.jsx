import React from "react";
import { FilterContainer, FilterItem } from "./index.style";

const FeedbackFilters = ({ filters, onChange }) => (
  <FilterContainer>
    <FilterItem>
      <label htmlFor="category">Category Filter</label>
      <select
        id="category"
        name="category"
        value={filters.category}
        onChange={onChange}
      >
        <option value="">All Categories</option>
        <option value="suggestion">Suggestion</option>
        <option value="bug report">Bug Report</option>
        <option value="feature request">Feature Request</option>
        <option value="other">Other</option>
      </select>
    </FilterItem>

    <FilterItem>
      <label htmlFor="sortBy">Sort By</label>
      <select
        id="sortBy"
        name="sortBy"
        value={filters.sortBy}
        onChange={onChange}
      >
        <option value="timestamp">Date</option>
        <option value="userName">Name</option>
        <option value="category">Category</option>
      </select>
    </FilterItem>

    <FilterItem>
      <label htmlFor="sortOrder">Order</label>
      <select
        id="sortOrder"
        name="sortOrder"
        value={filters.sortOrder}
        onChange={onChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </FilterItem>
  </FilterContainer>
);

export default FeedbackFilters;
