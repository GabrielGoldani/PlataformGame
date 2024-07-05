import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.css';
import Bird from '../assets/flappybird.png';
import Mario from '../assets/mario.jpeg';
import Snaky from '../assets/snake-game.png';

const games = [
    { title: 'Floopy Bird', description: 'Um jogo simples feito em HTML, CSS e JS. Inspirado em Flappy Bird', image: Bird, link: '/playing' },
    { title: 'Marryo', description: 'Um jogo simples feito em HTML, CSS e JS. Inspirado no Mario', image: Mario, link: '/playing2' },
    { title: 'Snaky Game', description: 'Um jogo simples feito em HTML, CSS e JS. Inspirado no jogo da cobrinha', image: Snaky, link: '/playing3' }
];

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="main-container">
                <h2>Bem-vindo ao Site de Jogos</h2>
                <p className="educational-message">Este site tem o objetivo educacional e foi desenvolvido para disciplina de Projeto Tecnológico em Desenvolvimento de Sistemas.</p>
                <section>
                    <h2 className="section-title">Jogos Recentes</h2>
                    <div className="games-container">
                        {games.map((game, index) => (
                            <Link to={game.link} key={index} className="game-item">
                                <img src={game.image} alt={game.title} className="game-image" />
                                <div className="game-info">
                                    <h3 className="game-title">{game.title}</h3>
                                    <p className="game-description">{game.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="section-title">Mais Jogados</h2>
                    <div className="games-container">
                        {games.map((game, index) => (
                            <Link to={game.link} key={index} className="game-item">
                                <img src={game.image} alt={game.title} className="game-image" />
                                <div className="game-info">
                                    <h3 className="game-title">{game.title}</h3>
                                    <p className="game-description">{game.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="section-title">Mais Avaliados</h2>
                    <div className="games-container">
                        {games.map((game, index) => (
                            <Link to={game.link} key={index} className="game-item">
                                <img src={game.image} alt={game.title} className="game-image" />
                                <div className="game-info">
                                    <h3 className="game-title">{game.title}</h3>
                                    <p className="game-description">{game.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
            <footer className="footer">
                <p>Este site tem o objetivo educacional e foi desenvolvido para disciplina de Projeto Tecnológico em Desenvolvimento de Sistemas.</p>
            </footer>
        </div>
    );
};

export default Home;
