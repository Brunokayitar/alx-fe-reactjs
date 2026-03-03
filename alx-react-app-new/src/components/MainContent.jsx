function MainContent() {
  const cities = ['New York', 'London', 'Tokyo', 'Paris'];
  return (
    <main style={{ backgroundColor: '#f0f0f0', padding: '20px', margin: '10px', borderRadius: '5px' }}>
      <h2 style={{ color: 'darkgreen' }}>Cities I love:</h2>
      <ul style={{ listStyleType: 'square', fontSize: '18px' }}>
        {cities.map((city, index) => (
          <li key={index} style={{ margin: '5px 0' }}>{city}</li>
        ))}
      </ul>
    </main>
  );
}

export default MainContent;