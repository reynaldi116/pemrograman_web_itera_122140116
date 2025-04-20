import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('TaskItem Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    completed: false
  };

  const mockOnDelete = jest.fn();
  const mockOnToggleComplete = jest.fn();

  it('renders task title', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onToggleComplete when checkbox is clicked', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnToggleComplete).toHaveBeenCalledWith(1);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
    
    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('shows completed style when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    render(
      <TaskItem 
        task={completedTask} 
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
  
    const taskItem = screen.getByTestId('task-item');
    expect(taskItem).toHaveClass('completed');
  });  
});
