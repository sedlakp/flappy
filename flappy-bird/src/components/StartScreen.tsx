interface StartScreenProps {
  onStartGame: () => void;
}

function StartScreen({ onStartGame }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Flappy Bird</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onStartGame}>
        Start Game
      </button>
    </div>
  );
}

export default StartScreen;