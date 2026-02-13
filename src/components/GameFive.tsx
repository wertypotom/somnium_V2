import React, { useState, useEffect } from 'react';

interface GameFiveProps {
  onComplete: () => void;
}

const GameFive: React.FC<GameFiveProps> = ({ onComplete }) => {
  const [health, setHealth] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [failed, setFailed] = useState(false);
  const maxHealth = 100;
  const timeLimit = 5;

  useEffect(() => {
    if (!gameStarted || failed || health <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          setFailed(true);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [gameStarted, failed, health]);

  const handleClick = () => {
    if (!gameStarted || failed) return;

    setHealth((prev) => {
      const newHealth = prev - 2;
      if (newHealth <= 0) {
        setTimeout(() => onComplete(), 500);
        return 0;
      }
      return newHealth;
    });
  };

  const handleStart = () => {
    setGameStarted(true);
    setTimeLeft(timeLimit);
  };

  const handleRetry = () => {
    setHealth(100);
    setTimeLeft(timeLimit);
    setFailed(false);
    setGameStarted(false);
  };

  // Ready screen
  if (!gameStarted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex flex-col items-center justify-center p-4'>
        <div className='bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-2xl text-center'>
          <h1 className='text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6'>
            ФИНАЛЬНЫЙ БОСС 👹
          </h1>
          <p className='text-3xl text-pink-200 mb-8'>
            У тебя есть только{' '}
            <span className='text-yellow-300 font-bold'>
              {timeLimit} секунд
            </span>
            !
          </p>
          <p className='text-xl text-white mb-12'>
            Кликай по сердцу как можно быстрее, чтобы победить!
          </p>
          <button
            onClick={handleStart}
            className='bg-gradient-to-r from-green-500 to-emerald-600 text-white px-16 py-6 rounded-full text-3xl font-bold shadow-2xl hover:shadow-green-500/50 hover:from-green-600 hover:to-emerald-700 transform hover:scale-110 transition-all duration-300'
          >
            Готова! 💪
          </button>
        </div>
      </div>
    );
  }

  // Failed screen
  if (failed) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex flex-col items-center justify-center p-4'>
        <div className='bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-2xl text-center'>
          <div className='text-8xl mb-6'>⏰</div>
          <h1 className='text-5xl font-bold text-white drop-shadow-2xl mb-6'>
            Время вышло!
          </h1>
          <p className='text-2xl text-pink-200 mb-12'>
            Осталось HP: {health}/100
          </p>
          <button
            onClick={handleRetry}
            className='bg-gradient-to-r from-orange-500 to-red-600 text-white px-16 py-6 rounded-full text-3xl font-bold shadow-2xl hover:shadow-red-500/50 hover:from-orange-600 hover:to-red-700 transform hover:scale-110 transition-all duration-300'
          >
            Попробовать снова 🔄
          </button>
          <p className='text-lg text-white/80 mt-6'>
            Ну што, кликай быстрее, я сам пробовал: это реально )
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex flex-col items-center justify-center p-4'>
      <div className='text-center mb-12'>
        <h1 className='text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4'>
          ФИНАЛЬНЫЙ БОСС 👹
        </h1>
        {/* Timer display */}
        <div className='text-6xl font-bold text-yellow-300 drop-shadow-2xl animate-pulse'>
          ⏱️ {timeLeft.toFixed(1)}s
        </div>
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
