import { useState } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import useGameLoop from '../hooks/useGameLoop';

interface GameScreenProps {
  onEndGame: (score: number) => void;
  setScore: (score: number) => void;
}

function GameScreen({ onEndGame, setScore }: GameScreenProps) {
  const initialBirdY = 350;
  const gravity = 0.9;
  const jumpVelocity = -10;
  const pipeXStart = 300;
  const pipeDistance = 200;
  const pipeHeightRange: [number, number] = [100, 300];
  const windowHeight = 700;
  const gapHeight = 350;

  const [gameStarted, setGameStarted] = useState(false);

  const { birdY, pipes, localScore, jump } = useGameLoop({
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
  });

  const handleJump = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    jump();
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-sky-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 text-2xl p-4 z-[999]">Score: {localScore}</div>
      
        <>
          <Bird birdY={birdY} />
          {pipes.map((pipe, index) => (
            <Pipe
              key={index}
              pipeHeight={pipe.height}
              pipeX={pipe.x}
              windowHeight={windowHeight}
              gapHeight={gapHeight}
            />
          ))}
        </>
    
      <button
        className="absolute bottom-0 mb-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 px-8 rounded-full"
        onClick={handleJump}
      >
        Jump
      </button>
    
    </div>
  );
}

export default GameScreen;