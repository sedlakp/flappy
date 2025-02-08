import { useState, useEffect, useCallback } from 'react';

interface UseGameLoopProps {
  initialBirdY: number;
  gravity: number;
  jumpVelocity: number;
  pipeXStart: number;
  pipeDistance: number;
  pipeHeightRange: [number, number];
  onEndGame: (score: number) => void;
  setScore: (score: number) => void;
  gameStarted: boolean;
  gapHeight: number
  windowHeight: number
}

function useGameLoop({
  initialBirdY,
  gravity,
  jumpVelocity,
  pipeXStart,
  pipeDistance,
  pipeHeightRange,
  onEndGame,
  setScore,
  gameStarted,
  gapHeight,
  windowHeight
}: UseGameLoopProps) {
  const [birdY, setBirdY] = useState(initialBirdY);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState(() => [
    { x: pipeXStart, height: Math.floor(Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])) + pipeHeightRange[0] },
    { x: pipeXStart + pipeDistance, height: Math.floor(Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])) + pipeHeightRange[0] },
    { x: pipeXStart + pipeDistance * 2, height: Math.floor(Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])) + pipeHeightRange[0] },
    { x: pipeXStart + pipeDistance * 3, height: Math.floor(Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])) + pipeHeightRange[0] },
  ]);
  const [localScore] = useState(0);
  const jump = useCallback(() => {
    setVelocity(jumpVelocity);
    setBirdY((prevBirdY) => prevBirdY + jumpVelocity);
  }, [jumpVelocity, setVelocity, setBirdY]);

  useEffect(() => {
    let gameLoop: number | undefined;

    if (gameStarted) {
      gameLoop = setInterval(() => {
        setVelocity((prevVelocity) => prevVelocity + gravity);
        setBirdY((prevBirdY) => prevBirdY + velocity);

        setPipes((prevPipes) =>
          prevPipes.map((pipe) => {
            const newX = pipe.x - 2;
            if (newX < -50) {
              return {
                x: pipeXStart + pipeDistance * (prevPipes.length - 1), // Keep pipes evenly spaced
                height: Math.floor(
                  Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])
                ) + pipeHeightRange[0],
              };
            }
            return { ...pipe, x: newX };
          })
        );

        //Collision detection
        const birdX = 100;
        const birdWidth = 32;
        const birdHeight = 32;

        if (birdY > windowHeight || birdY < 0) {
          onEndGame(localScore);
        }

        pipes.forEach((pipe) => {
          const pipeWidth = 50;
          const xOverlap = birdX < pipe.x + pipeWidth && birdX + birdWidth > pipe.x;
          const yOverlapTop = birdY < pipe.height && birdY + birdHeight > 0;
          const yOverlapBottom = birdY + birdHeight > pipe.height + gapHeight && birdY < 400;

          if (xOverlap && (yOverlapTop || yOverlapBottom)) {
            onEndGame(localScore);
          }
        });
      }, 20);
    }

    return () => clearInterval(gameLoop);
  }, [
    birdY,
    velocity,
    onEndGame,
    setScore,
    localScore,
    gameStarted,
    gravity,
    pipeXStart,
    pipeHeightRange,
    pipeDistance,
    pipes,
    jumpVelocity,
    setBirdY,
    setVelocity
  ]);

  return { birdY, velocity, pipes, localScore, jump };
}

export default useGameLoop;