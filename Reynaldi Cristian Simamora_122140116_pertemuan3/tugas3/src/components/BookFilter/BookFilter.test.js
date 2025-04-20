import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';

describe('BookFilter Component', () => {
  const mockFilterChange = jest.fn();
  const mockSearchChange = jest.fn();
  
  beforeEach(() => {
    mockFilterChange.mockClear();
    mockSearchChange.mockClear();
  });
  
  test('renders with initial filter and search values', () => {
    render(
      <BookFilter 
        filter="all" 
        searchTerm="" 
        onFilterChange={mockFilterChange} 
        onSearchChange={mockSearchChange} 
      />
    );
    
    expect(screen.getByLabelText(/filter by/i)).toHaveValue('all');
    expect(screen.getByPlaceholderText(/search books/i)).toHaveValue('');
  });
  
  test('calls onFilterChange when filter value changes', () => {
    render(
      <BookFilter 
        filter="all" 
        searchTerm="" 
        onFilterChange={mockFilterChange} 
        onSearchChange={mockSearchChange} 
      />
    );
    
    fireEvent.change(screen.getByLabelText(/filter by/i), {
      target: { value: 'owned' }
    });
    
    expect(mockFilterChange).toHaveBeenCalledWith('owned');
  });
  
  test('calls onSearchChange when search input changes', () => {
    render(
      <BookFilter 
        filter="all" 
        searchTerm="" 
        onFilterChange={mockFilterChange} 
        onSearchChange={mockSearchChange} 
      />
    );
    
    fireEvent.change(screen.getByPlaceholderText(/search books/i), {
      target: { value: 'test search' }
    });
    
    expect(mockSearchChange).toHaveBeenCalledWith('test search');
  });
  
  test('shows clear button when search term exists', () => {
    render(
      <BookFilter 
        filter="all" 
        searchTerm="existing search" 
        onFilterChange={mockFilterChange} 
        onSearchChange={mockSearchChange} 
      />
    );
    
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });
  
  test('calls onSearchChange with empty string when clear button is clicked', () => {
    render(
      <BookFilter 
        filter="all" 
        searchTerm="existing search" 
        onFilterChange={mockFilterChange} 
        onSearchChange={mockSearchChange} 
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: '×' }));
    
    expect(mockSearchChange).toHaveBeenCalledWith('');
  });
});

