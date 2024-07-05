import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5014/auth/register', {
                name,
                username,
                password,
            });
            setMessageType('success');
            setMessage('Cadastro realizado com sucesso!');
            console.log('Usuário registrado:', response.data);
        } catch (error) {
            setMessageType('error');
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(`Erro ao fazer cadastro: ${error.response.data.message}`);
            } else {
                setMessage('Erro ao fazer cadastro.');
            }
            console.error('Erro ao fazer cadastro:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="auth-title">Cadastro</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="auth-button">Cadastrar</button>
                </form>
                {message && <p className={`auth-message ${messageType}`}>{message}</p>}
                <p>Já tem uma conta? <Link to="/login">Faça login aqui</Link></p>
            </div>
        </div>
    );
};

export default Register;
