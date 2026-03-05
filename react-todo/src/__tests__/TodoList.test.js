import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    // Check if initial todos are displayed
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Deploy app')).toBeInTheDocument();
  });

  test('can add a new todo', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New todo')).toBeInTheDocument();
  });

  test('can toggle a todo completion', () => {
    render(<TodoList />);
    // Find the first todo text element and click it
    const todoText = screen.getByTestId('todo-text-1'); // id 1 from initial state
    fireEvent.click(todoText);

    // After click, the todo should have line-through style
    const todoItem = screen.getByTestId('todo-item-1');
    expect(todoItem).toHaveStyle('text-decoration: line-through');
  });

  test('can delete a todo', () => {
    render(<TodoList />);
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
