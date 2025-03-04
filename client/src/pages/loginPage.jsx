import { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import '../styles/Auth.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const url = `${import.meta.env.VITE_API_URL}`;

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(`${url}/login`, 
        { username, password },
        { withCredentials: true }
      );
      
      setUserInfo(response.data);
      setRedirect(true);
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={login}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              className="form-input"
              id="username"
              value={username}
              onChange={ev => setUsername(ev.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              className="form-input"
              id="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button className="auth-button">Sign In</button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

