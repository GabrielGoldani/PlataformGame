import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Snake from '../assets/snake-game.png';
import SnakePlay from '../assets/snakeplay.png';
import '../styles/Playing.css';

const Playing = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5014/comments/Playing3?page=1&limit=5`);
            setComments(response.data);
        } catch (error) {
            console.error('Erro ao buscar comentários:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:5014/comments', {
                    user: localStorage.getItem('user'),
                    text: newComment,
                    pageId: 'Playing3',
                });
                const updatedComments = [...comments, response.data];
                setComments(updatedComments);
                setNewComment('');
            } catch (error) {
                console.error('Erro ao enviar comentário:', error);
            }
        }
    };

    const handleClearComments = async () => {
        try {
            await axios.delete(`http://localhost:5014/comments/Playing3`);
            setComments([]);
            console.log('Comentários limpos com sucesso.');
        } catch (error) {
            console.error('Erro ao limpar comentários:', error);
        }
    };

    const handleRectangleClick = () => {
        window.location.href = '/game3';
    };

    return (
        <div>
            <Navbar />
            <div className="main-container">
                <div className="game-details">
                    <img src={Snake} alt="Game Preview" className="game-image" />
                    <div className="game-info">
                        <h2>Snaky Game</h2>
                        <p><strong>Desenvolvedor:</strong> Gabriel Augusto</p>
                        <p><strong>Descrição:</strong> Um jogo simples feito html, css e js. Inspirado no jogo da cobrinha.</p>
                        <p><strong>Categorias:</strong> Ação.</p>
                        <p><strong>Avaliações:</strong> ★★★★☆ (4.3)</p>
                    </div>
                </div>
                <div className="separator" onClick={handleRectangleClick}>
                    <div className="rectangle">
                        <img src={SnakePlay} alt="Imagem do jogo"/>
                    </div>
                </div>
                <div className="comments-section">
                    <h2>Comentários</h2>
                    <ul className="comment-list">
                        {comments.map((comment, index) => (
                            <li key={index} className={`comment-item ${comment.user === localStorage.getItem('user') ? 'user-comment' : ''}`}>
                                <p className="comment-text"><strong>{comment.user}:</strong> {comment.text}</p>
                            </li>
                        ))}
                    </ul>
                    
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <textarea
                            className="comment-input"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Deixe seu comentário..."
                            required
                        ></textarea>
                        <button type="submit" className="comment-button">Enviar Comentário</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Playing;
