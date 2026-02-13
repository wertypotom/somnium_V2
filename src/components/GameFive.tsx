import React, { useState } from 'react';

interface GameFiveProps {
  onComplete: () => void;
}

const GameFive: React.FC<GameFiveProps> = ({ onComplete }) => {
  const [health, setHealth] = useState(100);
  const maxHealth = 100;

  const handleClick = () => {
    setHealth((prev) => {
      const newHealth = prev - 2;
      if (newHealth <= 0) {
        setTimeout(() => onComplete(), 500);
        return 0;
      }
      return newHealth;
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex flex-col items-center justify-center p-4'>
      <div className='text-center mb-12'>
        <h1 className='text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4'>
          ФИНАЛЬНЫЙ БОСС 👹
        </h1>
        <p className='text-2xl text-pink-200'>
          Кликай по сердцу чтобы победить!
        </p>
      </div>

      {/* Health bar */}
      <div className='w-full max-w-2xl mb-12'>
        <div className='flex justify-between text-white text-xl font-bold mb-2'>
          <span>❤️ HP</span>
          <span>
            {health} / {maxHealth}
          </span>
        </div>
        <div className='w-full h-8 bg-gray-800 rounded-full border-4 border-white shadow-lg overflow-hidden'>
          <div
            className='h-full bg-gradient-to-r from-red-500 via-pink-500 to-red-600 transition-all duration-300 ease-out'
            style={{ width: `${(health / maxHealth) * 100}%` }}
          />
        </div>
      </div>

      {/* Giant clickable heart */}
      <button
        onClick={handleClick}
        className='text-9xl md:text-[200px] transform hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer select-none heart-pulse'
        style={{
          filter: health < 30 ? 'grayscale(50%)' : 'none',
        }}
      >
        💖
      </button>

      <div className='mt-8 text-white text-xl'>
        {health > 70 && '💪 Вперёд! Кликай быстрее!'}
        {health <= 70 && health > 40 && '🔥 Отличная работа! Продолжай!'}
        {health <= 40 && health > 10 && '⚡ Почти победа! Не останавливайся!'}
        {health <= 10 && health > 0 && '🎯 ФИНАЛЬНЫЙ УДАР!'}
      </div>
    </div>
  );
};

export default GameFive;
