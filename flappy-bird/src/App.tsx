import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ScoreScreen from './components/ScoreScreen';

function App() {
  const [gameState, setGameState] = useState<'start' | 'game' | 'score'>('start');
  const [score, setScore] = useState(0);

  const handleStartGame = () => {
    setGameState('game');
    setScore(0);
  };

  const handleEndGame = (finalScore: number) => {
    setGameState('score');
    setScore(finalScore);
  };

  const handleRestartGame = () => {
    setGameState('game');
    setScore(0);
  };

  const handleGoToStart = () => {
    setGameState('start');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {gameState === 'start' && (
        <StartScreen onStartGame={handleStartGame} />
      )}
      {gameState === 'game' && (
        <GameScreen onEndGame={handleEndGame} setScore={setScore} />
      )}
      {gameState === 'score' && (
        <ScoreScreen score={score} onRestartGame={handleRestartGame} onGoToStart={handleGoToStart} />
      )}
    </div>
  );
}

export default App;
