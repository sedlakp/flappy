interface ScoreScreenProps {
  score: number;
  onRestartGame: () => void;
  onGoToStart: () => void;
}

function ScoreScreen({ score, onRestartGame, onGoToStart }: ScoreScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
      <p className="text-2xl mb-4">Your Score: {score}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={onRestartGame}>
        Restart Game
      </button>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onGoToStart}>
        Go to Start Screen
      </button>
    </div>
  );
}

export default ScoreScreen;