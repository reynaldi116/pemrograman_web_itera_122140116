import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';

describe('BookList Component', () => {
  const mockUpdateBook = jest.fn();
  const mockDeleteBook = jest.fn();
  
  const sampleBooks = [
    {
      id: '1',
      title: 'Book One',
      author: 'Author One',
      status: 'owned'
    },
    {
      id: '2',
      title: 'Book Two',
      author: 'Author Two',
      status: 'reading'
    }
  ];
  
  beforeEach(() => {
    mockUpdateBook.mockClear();
    mockDeleteBook.mockClear();
  });
  
  test('renders empty message when no books are provided', () => {
    render(
      <BookList 
        books={[]} 
        onUpdateBook={mockUpdateBook} 
        onDeleteBook={mockDeleteBook} 
      />
    );
    
    expect(screen.getByText(/no books found/i)).toBeInTheDocument();
  });
  
  test('renders list of books correctly', () => {
    render(
      <BookList 
        books={sampleBooks} 
        onUpdateBook={mockUpdateBook} 
        onDeleteBook={mockDeleteBook} 
      />
    );
    
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('by Author One')).toBeInTheDocument();
    expect(screen.getByText('Owned')).toBeInTheDocument();
    
    expect(screen.getByText('Book Two')).toBeInTheDocument();
    expect(screen.getByText('by Author Two')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });
  
  test('calls onDeleteBook when delete button is clicked', () => {
    render(
      <BookList 
        books={sampleBooks} 
        onUpdateBook={mockUpdateBook} 
        onDeleteBook={mockDeleteBook} 
      />
    );
    
    // Get all delete buttons and click the first one
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    expect(mockDeleteBook).toHaveBeenCalledWith('1');
  });
  
  test('shows edit form when edit button is clicked', () => {
    render(
      <BookList 
        books={sampleBooks} 
        onUpdateBook={mockUpdateBook} 
        onDeleteBook={mockDeleteBook} 
      />
    );
    
    // Get all edit buttons and click the first one
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);
    
    // Check if the edit form appears with the correct data
    expect(screen.getByLabelText(/title/i)).toHaveValue('Book One');
    expect(screen.getByLabelText(/author/i)).toHaveValue('Author One');
    expect(screen.getByLabelText(/status/i)).toHaveValue('owned');
    expect(screen.getByRole('button', { name: /update book/i })).toBeInTheDocument();
  });
  
  test('calls onUpdateBook when update button is clicked with valid data', () => {
    render(
      <BookList 
        books={sampleBooks} 
        onUpdateBook={mockUpdateBook} 
        onDeleteBook={mockDeleteBook} 
      />
    );
    
    // Click edit on the first book
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);
    
    // Change the title
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Updated Book Title' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /update book/i }));
    
    // Check if onUpdateBook was called with updated data
    expect(mockUpdateBook).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        title: 'Updated Book Title',
        author: 'Author One',
        status: 'owned'
      })
    );
  });
});

