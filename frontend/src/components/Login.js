import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../api';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            console.log('User logged in successfully', response.data);
            localStorage.setItem('token', response.data.access_token);
            setSuccessMessage('Login bem sucedido!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error logging in', error);
            setErrorMessage('Usuário ou senha inválidos.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <div className="register-link">
                <p>Não possui conta? <Link to="/register">Registrar agora</Link></p>
            </div>
        </div>
    );
};

export default Login;
