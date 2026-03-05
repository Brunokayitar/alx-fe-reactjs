import { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write tests', completed: false },
    { id: 3, text: 'Deploy app', completed: false },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '10px 0',
              padding: '8px',
              backgroundColor: todo.completed ? '#e0ffe0' : '#f0f0f0',
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
            data-testid={`todo-item-${todo.id}`}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ cursor: 'pointer', flex: 1 }}
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-button-${todo.id}`}
              style={{ marginLeft: '10px', background: 'red', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
