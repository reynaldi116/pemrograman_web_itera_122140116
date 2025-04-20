import React from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';

const BookFilter = ({ filter, searchTerm, onFilterChange, onSearchChange }) => {
  return (
    <div className="book-filter">
      <div className="filter-section">
        <label htmlFor="filter">Filter by:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All Books</option>
          <option value="owned">Owned</option>
          <option value="reading">Reading</option>
          <option value="toBuy">To Buy</option>
        </select>
      </div>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="clear-search" 
            onClick={() => onSearchChange('')}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

BookFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default BookFilter;
