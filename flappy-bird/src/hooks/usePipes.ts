import { useState, useCallback } from 'react';

interface UsePipesProps {
  pipeXStart: number;
  pipeDistance: number;
  pipeHeightRange: [number, number];
}

const usePipes = ({ pipeXStart, pipeDistance, pipeHeightRange }: UsePipesProps) => {
  const [pipes, setPipes] = useState(() => [
    { x: pipeXStart, height: Math.floor(Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])) + pipeHeightRange[0] },
    { x: pipeXStart + pipeDistance, height: Math.floor(Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])) + pipeHeightRange[0] },
    { x: pipeXStart + pipeDistance * 2, height: Math.floor(Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])) + pipeHeightRange[0] },
    { x: pipeXStart + pipeDistance * 3, height: Math.floor(Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])) + pipeHeightRange[0] },
  ]);

  const updatePipes = useCallback(() => {
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
  }, [pipeDistance, pipeHeightRange, pipeXStart, setPipes]);

  return { pipes, updatePipes };
};

export default usePipes;