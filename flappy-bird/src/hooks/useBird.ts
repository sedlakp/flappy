import { useState, useCallback } from 'react';

interface UseBirdProps {
  initialBirdY: number;
  gravity: number;
  jumpVelocity: number;
}

const useBird = ({ initialBirdY, gravity, jumpVelocity }: UseBirdProps) => {
  const [birdY, setBirdY] = useState(initialBirdY);
  const [velocity, setVelocity] = useState(0);

  const jump = useCallback(() => {
    setVelocity(jumpVelocity);
  }, [jumpVelocity, setVelocity]);

  const updateBird = useCallback(() => {
    setVelocity((prevVelocity) => prevVelocity + gravity);
    setBirdY((prevBirdY) => prevBirdY + velocity);
  }, [gravity, velocity, setVelocity, setBirdY]);

  return { birdY, setBirdY, velocity, jump, updateBird };
};

export default useBird;