import { useState,useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../components/userContext';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function login(e)
  {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', 
      { username, password },
      { withCredentials: true} 
    );
    if (response.status === 200) {
      const userInfo = response.data;
      setUserInfo(userInfo);
      setRedirect(true);
    }
    } catch (error) {
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
