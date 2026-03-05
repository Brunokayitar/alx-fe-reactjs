import { useState } from 'react';

const AddTodoForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
        data-testid="todo-input"
        style={{ padding: '8px', width: '70%', marginRight: '10px' }}
      />
      <button type="submit" data-testid="add-button">Add</button>
    </form>
  );
};

export default AddTodoForm;
