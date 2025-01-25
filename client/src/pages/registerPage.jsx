import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function register(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://blogspot-g6zd.onrender.com/register', {
                username,
                password,
            });
            if (response.status === 200) {
                alert('Registered successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register');
        }
    }


    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
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
            <button>Register</button>
        </form>
    );
}
