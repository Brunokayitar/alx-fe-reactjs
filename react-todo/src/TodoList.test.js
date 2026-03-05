/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
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
    const todoText = screen.getByTestId('todo-text-1');
    fireEvent.click(todoText);

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
