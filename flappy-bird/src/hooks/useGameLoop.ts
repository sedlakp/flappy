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

        // if (birdY > 400 || birdY < 0) {
        //   onEndGame(localScore);
        // }

        //Collision detection
        // const birdX = 100;
        // pipes.forEach((pipe) => {
        //   if (pipe.x < birdX + 32 && pipe.x + 50 > birdX) {
        //     if (birdY < pipe.height || birdY + 32 > pipe.height + 100) {
        //       onEndGame(localScore);
        //     }
        //   }
        // });
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