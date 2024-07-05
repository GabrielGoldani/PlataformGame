import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5014/auth/login', {
                username,
                password,
            });

            if (response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('user', response.data.user);
                setMessageType('success');
                setMessage('Login realizado com sucesso!');
                history.push('/home');
            } else {
                setMessageType('error');
                setMessage('Token não recebido do servidor.');
            }
        } catch (error) {
            setMessageType('error');
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(`Erro ao fazer login: ${error.response.data.message}`);
            } else {
                setMessage('Erro ao fazer login.');
            }
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="auth-title">Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="auth-button">Entrar</button>
                </form>
                {message && <p className={`auth-message ${messageType}`}>{message}</p>}
                <p>Não tem uma conta? <Link to="/register">Cadastre-se aqui</Link></p>
            </div>
        </div>
    );
};

export default Login;
