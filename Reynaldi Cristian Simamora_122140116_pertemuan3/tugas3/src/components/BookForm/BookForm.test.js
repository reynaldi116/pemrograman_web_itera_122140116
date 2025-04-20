import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

describe('BookForm Component', () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();
  
  beforeEach(() => {
    mockSubmit.mockClear();
    mockCancel.mockClear();
  });
  
  test('renders add form with empty fields by default', () => {
    render(<BookForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/author/i)).toHaveValue('');
    expect(screen.getByLabelText(/status/i)).toHaveValue('toBuy');
    expect(screen.getByRole('button', { name: /add book/i })).toBeInTheDocument();
  });
  
  test('populates form with book data when editing', () => {
    const bookToEdit = {
      id: '123',
      title: 'Test Book',
      author: 'Test Author',
      status: 'owned'
    };
    
    render(<BookForm book={bookToEdit} onSubmit={mockSubmit} onCancel={mockCancel} />);
    
    expect(screen.getByLabelText(/title/i)).toHaveValue('Test Book');
    expect(screen.getByLabelText(/author/i)).toHaveValue('Test Author');
    expect(screen.getByLabelText(/status/i)).toHaveValue('owned');
    expect(screen.getByRole('button', { name: /update book/i })).toBeInTheDocument();
  });
  
  test('shows validation errors when submitting with empty fields', () => {
    render(<BookForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /add book/i }));
    
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/author is required/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
  
  test('submits the form with valid data', () => {
    render(<BookForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Book' }
    });
    
    fireEvent.change(screen.getByLabelText(/author/i), {
      target: { value: 'New Author' }
    });
    
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'reading' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /add book/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'New Book',
      author: 'New Author',
      status: 'reading'
    });
  });
  
  test('calls onCancel when cancel button is clicked', () => {
    render(<BookForm onSubmit={mockSubmit} onCancel={mockCancel} />);
    
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(mockCancel).toHaveBeenCalled();
  });
});

