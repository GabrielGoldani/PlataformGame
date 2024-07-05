import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Game3.module.css';
import Navbar from "../components/Navbar";

const Game3 = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameInterval, setGameInterval] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const tp = 20; 
        const qp = 20; 
        let vx = 0; 
        let vy = 0;
        let px = 10; 
        let py = 15;
        let applex = 15;
        let appley = 15;
        let trail = [];
        let tail = 2;
        let lastKeyPressed = "";

        const game = () => {
            px += vx;
            py += vy;
            
            if (px < 0) px = qp - 1;
            if (px > qp - 1) px = 0;
            if (py < 0) py = qp - 1;
            if (py > qp - 1) py = 0;

            ctx.fillStyle = "#111D4A";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#EA2B1F";
            ctx.fillRect(applex * tp, appley * tp, tp, tp);

            for (let i = 0; i < trail.length; i++) {
                ctx.fillStyle = "#09BC8A";
                ctx.strokeStyle = "#004346";
                ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp, tp);
                ctx.strokeRect(trail[i].x * tp, trail[i].y * tp, tp, tp);
                if (trail[i].x === px && trail[i].y === py) {
                    vx = vy = 0;
                    tail = 2;
                    setScore(0);
                }
            }

            trail.push({ x: px, y: py });
            while (trail.length > tail) {
                trail.shift();
            }

            if (applex === px && appley === py) {
                tail++;
                applex = Math.floor(Math.random() * qp);
                appley = Math.floor(Math.random() * qp);
                setScore((prevScore) => prevScore + 1);
            }
        };

        const keyPush = (e) => {
            switch (e.keyCode) {
                case 37:
                    if (lastKeyPressed !== "right") {
                        vx = -1;
                        vy = 0;
                        lastKeyPressed = "left";
                    }
                    break;
                case 38:
                    if (lastKeyPressed !== "down") {
                        vx = 0;
                        vy = -1;
                        lastKeyPressed = "up";
                    }
                    break;
                case 39:
                    if (lastKeyPressed !== "left") {
                        vx = 1;
                        vy = 0;
                        lastKeyPressed = "right";
                    }
                    break;
                case 40:
                    if (lastKeyPressed !== "up") {
                        vx = 0;
                        vy = 1;
                        lastKeyPressed = "down";
                    }
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", keyPush);

        const interval = setInterval(game, 100);
        setGameInterval(interval);

        return () => {
            document.removeEventListener("keydown", keyPush);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={styles.game3Page}>
            <Navbar />
            <div className={styles.gameContainer}>
                <div className={styles.game}>
                    <div className={styles.gameArea}>
                        <canvas ref={canvasRef} id="area" width="400" height="400"></canvas>
                        <div className={styles.pontuacao}>
                            Pontuação: <span id="pontos">{score}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game3;