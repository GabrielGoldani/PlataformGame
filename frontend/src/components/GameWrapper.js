// src/components/GameWrapper.js

import React, { useEffect } from 'react';

const GameWrapper = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/games/Mario/game2.js';
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="game-container"
            dangerouslySetInnerHTML={{
                __html: `
                    <div class="game-board">
                        <img src="/assets/clouds.png" class="cloud">
                        <img src="/assets/mario.gif" class="mario">
                        <img src="/assets/pipe.png" class="pipe">
                    </div>
                    <div class="game-over">
                        <button class="restart">REINICIAR</button>
                    </div>
                `
            }}
        />
    );
};

export default GameWrapper;
