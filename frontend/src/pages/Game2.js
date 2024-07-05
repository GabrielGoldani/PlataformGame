import React, { useEffect, useState } from 'react';
import styles from '../styles/Game2.module.css';
import cloudImage from '../assets/clouds.png';
import marioImage from '../assets/mario.gif';
import pipeImage from '../assets/pipe.png';
import gameOverImage from '../assets/game-over.png';
import Navbar from "../components/Navbar";

const Game2 = () => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const mario = document.querySelector(`.${styles.mario}`);
        const pipe = document.querySelector(`.${styles.pipe}`);
        const cloud = document.querySelector(`.${styles.cloud}`);
        const gameOver = document.querySelector(`.${styles.gameOver}`);
        const restartButton = document.querySelector(`.${styles.restart}`);
        const scoreElement = document.querySelector(`.${styles.score}`);

        let isGameOver = false;

        const jump = () => {
            if (!isGameOver) {
                mario.classList.add(styles.jump);
                setTimeout(() => {
                    mario.classList.remove(styles.jump);
                }, 500);
            }
        };

        const loop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
            const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

            if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`;

                mario.src = gameOverImage;
                mario.style.width = '70px';
                mario.style.marginLeft = '35px';

                cloud.style.animation = 'none';
                cloud.style.left = `${cloudPosition}px`;

                gameOver.style.visibility = 'visible';

                isGameOver = true;

                clearInterval(loop);
            }

            if (pipePosition < 0 && !isGameOver) {
                setScore((prevScore) => prevScore + 1);
            }
        }, 10);

        const restart = () => {
            isGameOver = false;
            setScore(0);
            gameOver.style.visibility = 'hidden';

            pipe.style.animation = `${styles.pipeAnimations} 1.5s infinite linear`;
            pipe.style.left = '';

            mario.src = marioImage;
            mario.style.width = '130px';
            mario.style.bottom = '0px';
            mario.style.marginLeft = '';
            mario.style.animation = '';

            cloud.style.animation = `${styles.cloud} 20s infinite linear`;
            cloud.style.left = '';

            const newLoop = setInterval(() => {
                const pipePosition = pipe.offsetLeft;
                const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
                const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

                if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
                    pipe.style.animation = 'none';
                    pipe.style.left = `${pipePosition}px`;

                    mario.style.animation = 'none';
                    mario.style.bottom = `${marioPosition}px`;

                    mario.src = gameOverImage;
                    mario.style.width = '70px';
                    mario.style.marginLeft = '35px';

                    cloud.style.animation = 'none';
                    cloud.style.left = `${cloudPosition}px`;

                    gameOver.style.visibility = 'visible';

                    clearInterval(newLoop);
                }

                if (pipePosition < 0 && !isGameOver) {
                    setScore((prevScore) => prevScore + 1);
                }
            }, 10);
        };

        document.addEventListener('keydown', jump);
        document.addEventListener('touchstart', jump);

        restartButton.addEventListener('click', restart);

        return () => {
            document.removeEventListener('keydown', jump);
            document.removeEventListener('touchstart', jump);
            restartButton.removeEventListener('click', restart);
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div className={styles.gameBoard}>
                <img src={cloudImage} className={styles.cloud} alt="Cloud" />
                <img src={marioImage} className={styles.mario} alt="Mario" />
                <img src={pipeImage} className={styles.pipe} alt="Pipe" />
    
                <div className={styles.gameOver}>
                    <div className={styles.scoreDisplay}>
                        Pontuação: {score}
                    </div>
                    <button className={styles.restart}>REINICIAR</button>
                </div>
            </div>
        </div>
    );
};

export default Game2;
