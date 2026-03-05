import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = () => {
    auth.login();
    navigate(from, { replace: true });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Login Page</h1>
      <p>You need to log in to access protected pages.</p>
      <button
        onClick={handleLogin}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Log in
      </button>
    </div>
  );
};

export default Login;
