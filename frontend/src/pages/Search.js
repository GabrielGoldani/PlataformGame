import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Search.css';

import Bird from '../assets/flappybird.png';
import Mario from '../assets/mario.jpeg';
import Snaky from '../assets/snake-game.png';

const games = [
    { title: 'Floopy Bird', description: 'Um jogo simples feito em html, css e js. Inspirado em Flappy Bird', image: Bird, link: '/playing' },
    { title: 'Marryo', description: 'Um jogo simples feito em html, css e js. Inspirado no Mario', image: Mario, link: '/playing2' },
    { title: 'Snaky Game', description: 'Um jogo simples feito em html, css e js. Inspirado no jogo da cobrinha', image: Snaky, link: '/playing3' }
];

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            setResults([]);
            setNoResults(true);
            return;
        }
        
        const filteredGames = games.filter(game =>
            game.title.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredGames);
        setNoResults(filteredGames.length === 0);
    };

    return (
        <div>
            <Navbar />
            <div className="search-container">
                <h2>Procurar Jogos</h2>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                        placeholder="Digite o nome do jogo"
                    />
                    <button type="submit" className="search-button">Buscar</button>
                </form>
                <div className="search-results">
                    {noResults ? (
                        <p className="no-results">Nenhum resultado encontrado</p>
                    ) : (
                        results.map((game, index) => (
                            <Link to={game.link} key={index} className="game-card">
                                <img src={game.image} alt={game.title} className="game-image" />
                                <div className="game-info">
                                    <h3 className="game-title">{game.title}</h3>
                                    <p className="game-description">{game.description}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
