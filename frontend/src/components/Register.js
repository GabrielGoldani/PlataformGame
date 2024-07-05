import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../api';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await register(username, password, name);
            console.log('User registered successfully', response.data);
            setSuccessMessage('Registro bem sucedido!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error registering user', error);
            setErrorMessage('Erro ao registrar. Por favor, tente novamente.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-container">
            <h2>Registro</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <button onClick={handleRegister}>Registrar</button>
            <div className="login-link">
                <p>Já possui uma conta? <Link to="/login">Faça login</Link></p>
            </div>
        </div>
    );
};

export default Register;
