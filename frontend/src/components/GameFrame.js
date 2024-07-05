// src/components/GameFrame.js

import React from 'react';

const GameFrame = () => {
    return (
        <iframe
            src="/games/index.html"
            title="Jogo Floppy Bird"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
        />
    );
};

export default GameFrame;
