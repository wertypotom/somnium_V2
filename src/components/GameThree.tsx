import React, { useState, useEffect } from 'react';

interface GameThreeProps {
  onComplete: () => void;
}

const GameThree: React.FC<GameThreeProps> = ({ onComplete }) => {
  const [mousePos, setMousePos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [heartPos, setHeartPos] = useState({
    x: window.innerWidth / 2,
    y: 100,
  });
  const goalY = window.innerHeight - 150;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartPos((prev) => {
        const dx = prev.x - mousePos.x;
        const dy = prev.y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120 && distance > 0) {
          const pushStrength = 8;
          const newX = prev.x + (dx / distance) * pushStrength;
          const newY = prev.y + (dy / distance) * pushStrength;

          const boundedX = Math.max(30, Math.min(window.innerWidth - 30, newX));
          const boundedY = Math.max(
            30,
            Math.min(window.innerHeight - 30, newY),
          );

          if (boundedY >= goalY) {
            setTimeout(() => onComplete(), 500);
          }

          return { x: boundedX, y: boundedY };
        }

        return prev;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [mousePos, onComplete, goalY]);

  const progress = Math.min(
    100,
    Math.max(0, ((heartPos.y - 100) / (goalY - 100)) * 100),
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 relative overflow-hidden'>
      {/* Instructions */}
      <div className='absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-center'>
        <h2 className='text-4xl font-bold drop-shadow-lg mb-2'>
          Подтолкни сердце к цели! 💙
        </h2>
        <p className='text-xl'>Используй мышку как пузырь</p>
        <div className='mt-4 w-64 bg-white/30 rounded-full h-4 mx-auto'>
          <div
            className='bg-pink-500 h-4 rounded-full transition-all duration-300'
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mouse bubble */}
      <div
        className='absolute w-24 h-24 rounded-full border-4 border-white/50 bg-white/10 pointer-events-none'
        style={{
          left: mousePos.x - 48,
          top: mousePos.y - 48,
        }}
      />

      {/* Heart */}
      <div
        className='absolute text-6xl transition-all duration-100'
        style={{
          left: heartPos.x - 30,
          top: heartPos.y - 30,
        }}
      >
        💖
      </div>

      {/* Goal zone */}
      <div
        className='absolute left-0 right-0 border-t-4 border-dashed border-green-400 bg-green-400/20'
        style={{
          top: goalY,
          height: window.innerHeight - goalY,
        }}
      >
        <div className='text-center text-white text-3xl font-bold mt-4'>
          🎯 ЦЕЛЬ 🎯
        </div>
      </div>
    </div>
  );
};

export default GameThree;
