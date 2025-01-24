import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function login(e)
  {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', 
      { username, password },
      { withCredentials: true} 
    );
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to login');
    }
  } 

  if(redirect){
    return <Navigate to={"/"} />
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

