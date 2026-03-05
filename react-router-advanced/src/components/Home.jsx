import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p>Welcome to the advanced routing demo.</p>
      <ul className="mt-4 space-y-2">
        <li><Link to="/profile" className="text-blue-500">Go to Profile (Protected)</Link></li>
        <li><Link to="/blog/1" className="text-blue-500">View Blog Post 1 (Dynamic)</Link></li>
        <li><Link to="/blog/2" className="text-blue-500">View Blog Post 2</Link></li>
        <li><Link to="/blog/3" className="text-blue-500">View Blog Post 3</Link></li>
      </ul>
    </div>
  );
};

export default Home;
