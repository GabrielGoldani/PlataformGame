﻿import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Game1.module.css';

const Game1 = () => {
    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

        let gamePlaying = false;
        const gravity = .25;
        const speed = 2;
        const size = [51, 36];
        const jump = -5;
        const cTenth = (canvas.width / 10);

        let index = 0,
            bestScore = 0,
            flight,
            flyHeight,
            currentScore,
            pipes;

        const pipeWidth = 78;
        const pipeGap = 270;
        const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;

        const setup = () => {
            currentScore = 0;
            flight = jump;
            flyHeight = (canvas.height / 2) - (size[1] / 2);
            pipes = Array(3).fill().map((_, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
        };

        const render = () => {
            index++;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);

            if (gamePlaying) {
                pipes.forEach(pipe => {
                    pipe[0] -= speed;
                    ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
                    ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

                    if (pipe[0] <= -pipeWidth) {
                        currentScore++;
                        bestScore = Math.max(bestScore, currentScore);
                        pipes = [...pipes.slice(1), [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]];
                    }

                    if (pipe[0] <= cTenth + size[0] && pipe[0] + pipeWidth >= cTenth && (pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1])) {
                        gamePlaying = false;
                        setup();
                    }
                });
            }

            if (gamePlaying) {
                ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyHeight, ...size);
                flight += gravity;
                flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
            } else {
                ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, (canvas.width / 2) - (size[0] / 2), flyHeight, ...size);
                flyHeight = (canvas.height / 2) - (size[1] / 2);
                ctx.fillText(`Best score : ${bestScore}`, 85, 245);
                ctx.fillText('Click to play', 90, 535);
                ctx.font = "bold 30px courier";
            }

            document.getElementById('bestScore').innerHTML = `Best : ${bestScore}`;
            document.getElementById('currentScore').innerHTML = `Current : ${currentScore}`;

            window.requestAnimationFrame(render);
        };

        setup();
        img.onload = render;

        const handleClick = () => {
            gamePlaying = true;
            flight = jump;
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div className={styles.game1Container}>
                <header className={styles.header}>
                    <h1 className={styles.h1}>Floppy Bird</h1>
                    <div className={styles.scoreContainer}>
                        <div id="bestScore"></div>
                        <div id="currentScore"></div>
                    </div>
                </header>
                <canvas id="canvas" width="431" height="768"></canvas>
            </div>
        </div>
    );
};

export default Game1;
