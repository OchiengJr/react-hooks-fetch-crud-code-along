import React from "react";

function Filter({ category, onCategoryChange }) {
  const handleChange = (e) => {
    onCategoryChange(e.target.value);
  };

  return (
    <div className="Filter">
      <label htmlFor="filter">Filter by category:</label>
      <select
        id="filter"
        name="filter"
        value={category}
        onChange={handleChange}
      >
        <option value="All">All</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
  );
}

export default Filter;
