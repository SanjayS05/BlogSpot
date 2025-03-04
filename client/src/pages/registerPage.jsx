import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    const url = `${import.meta.env.VITE_API_URL}`;

    async function register(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post(`${url}/register`, 
                { username, password },
                { withCredentials: true }
            );
            setRedirect(true);
        } catch (error) {
            setError(error.response?.data?.error || 'Registration failed');
        }
    }

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join our community of developers</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="auth-form" onSubmit={register}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-input"
                            id="username"
                            value={username}
                            onChange={ev => setUsername(ev.target.value)}
                            placeholder="Choose a username"
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
                            placeholder="Choose a strong password"
                        />
                    </div>

                    <button className="auth-button">Create Account</button>
                </form>

                <div className="auth-footer">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
