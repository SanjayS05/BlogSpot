import {useState} from 'react';

function registerPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function register(e){
        e.preventDefault();
        await fetch('https://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
            })
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

export default registerPage;