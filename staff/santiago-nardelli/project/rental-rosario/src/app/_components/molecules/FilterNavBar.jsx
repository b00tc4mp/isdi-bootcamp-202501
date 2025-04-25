import React, { useState } from "react";

const FilterNavBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: "",
    rooms: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <nav className="filter-navbar">
      <div className="filter-item">
        <label htmlFor="type">Property Type:</label>
        <select
          id="type"
          name="type"
          value={filters.type}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="studio">Studio</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="rooms">Rooms:</label>
        <select
          id="rooms"
          name="rooms"
          value={filters.rooms}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>
      </div>
    </nav>
  );
};

export default FilterNavBar;
