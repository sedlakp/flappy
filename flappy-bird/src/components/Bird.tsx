import React from 'react';

interface BirdProps {
  birdY: number;
}

function Bird({ birdY }: BirdProps) {
  return (
    <div
      className="w-8 h-8 bg-yellow-500 rounded-full"
      style={{
        top: birdY,
        left: 100,
      }}
    />
  );
}

export default Bird;