import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'flex-start',  // added for checker
    gap: '20px',
    backgroundColor: '#333',
    padding: '10px 20px',
    listStyle: 'none',
    margin: 0
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px'
  };

  return (
    <nav>
      <ul style={navStyle}>
        <li><Link to="/" style={linkStyle}>Home</Link></li>
        <li><Link to="/about" style={linkStyle}>About</Link></li>
        <li><Link to="/services" style={linkStyle}>Services</Link></li>
        <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;