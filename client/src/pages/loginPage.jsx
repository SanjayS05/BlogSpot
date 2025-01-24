import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(e)
  {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', 
      { username, password },
      { withCredentials: true} 
    );
      if (response.status === 200) {
        alert('Login successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to login');
    }
  } 
  return (
    <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input type="text" 
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="password" 
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
    </form>
  );
}

