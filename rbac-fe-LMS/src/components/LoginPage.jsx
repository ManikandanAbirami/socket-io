import React, { useState, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", { username, password });
            login(response.data);
        } catch (error) {
            console.error('Login failed!', error);
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginPage