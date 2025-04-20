import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  it('renders form with input and button', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    expect(screen.getByPlaceholderText('Tambahkan tugas baru...')).toBeInTheDocument();
    expect(screen.getByText('Tambah')).toBeInTheDocument();
  });

  it('calls onAddTask with new task when form is submitted', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByPlaceholderText('Tambahkan tugas baru...');
    const button = screen.getByText('Tambah');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);
    
    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
    expect(mockOnAddTask.mock.calls[0][0]).toEqual({
      id: expect.any(Number),
      title: 'New Task',
      completed: false
    });
  });

  it('does not call onAddTask when input is empty', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const button = screen.getByText('Tambah');
    fireEvent.click(button);
    
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('clears input after form submission', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByPlaceholderText('Tambahkan tugas baru...');
    const button = screen.getByText('Tambah');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);
    
    expect(input.value).toBe('');
  });
});

