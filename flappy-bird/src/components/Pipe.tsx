import React from 'react';

interface PipeProps {
  pipeHeight: number;
  pipeX: number;
  windowHeight: number;
  gapHeight: number;
}

function Pipe({ pipeHeight, pipeX, windowHeight, gapHeight }: PipeProps) {
  const bottomPipeHeight = windowHeight - pipeHeight - gapHeight;
  return (
    <>
      <div
        className="absolute bg-green-500"
        style={{
          left: pipeX,
          top: 0,
          width: 50,
          height: pipeHeight,
        }}
      />
      <div
        className="absolute bg-green-500"
        style={{
          left: pipeX,
          top: pipeHeight + gapHeight,
          width: 50,
          height: bottomPipeHeight,
        }}
      />
    </>
  );
}

export default Pipe;