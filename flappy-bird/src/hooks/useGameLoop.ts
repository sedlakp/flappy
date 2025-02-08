import { useState, useEffect } from 'react';
import usePipes from './usePipes';
import useBird from './useBird';

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
  windowHeight,
}: UseGameLoopProps) {

  const {pipes, updatePipes} = usePipes({pipeXStart,pipeDistance,pipeHeightRange})
  const {birdY,setBirdY,velocity, jump, updateBird} = useBird({initialBirdY,gravity,jumpVelocity})
  const [localScore, setLocalScore] = useState(0);

  useEffect(() => {
    let gameLoop: number | undefined;

    if (gameStarted) {
      gameLoop = setInterval(() => {
        updateBird()

        updatePipes()

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
          const yOverlapTop = birdY < pipe.height;
          const yOverlapBottom = birdY + birdHeight > pipe.height + gapHeight;

          if (xOverlap && (yOverlapTop || yOverlapBottom)) {
            onEndGame(localScore);
          } else if (birdX > pipe.x + pipeWidth && !pipe.passed) {
            pipe.passed = true;
            setLocalScore((prevScore: number) => prevScore + 1);
            setScore(localScore + 1);
          }
        });
      }, 20);
    }

    return () => clearInterval(gameLoop);
  }, [birdY, velocity, onEndGame, setScore, localScore, gameStarted, gravity, pipeXStart, pipeHeightRange, pipeDistance, pipes, jumpVelocity, setBirdY, windowHeight, gapHeight, setLocalScore, updateBird, updatePipes]);

  return { birdY, velocity, pipes, localScore, jump };
}

export default useGameLoop;