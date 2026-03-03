import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p style={{ fontSize: '24px' }}>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={buttonStyle}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={buttonStyle}>Decrement</button>
      <button onClick={() => setCount(0)} style={buttonStyle}>Reset</button>
    </div>
  );
}

// Optional inline styles for buttons to make them look nicer
const buttonStyle = {
  margin: '5px',
  padding: '10px 15px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default Counter;