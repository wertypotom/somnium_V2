import React from 'react';

const FinalScreen: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Floating hearts animation */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute text-4xl animate-float'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            {['💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className='bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-3xl text-center relative z-10'>
        <div className='text-8xl mb-6 animate-bounce'>🎉</div>
        <h1 className='text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 mb-6'>
          Поздравляю!
        </h1>
        <div className='text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-relaxed'>
          Я так сильно тебя люблю,
          <br />
          моя Валентинка! 💝
        </div>
        <div className='text-2xl text-gray-700 mb-8 italic'>
          А еще у меня нет денег,
          <br />
          так что,
          <br />
          на свидание приглашаешь ты 🥲
        </div>
        <div className='flex justify-center gap-4 text-6xl'>
          <span className='animate-pulse'>❤️</span>
          <span className='animate-pulse' style={{ animationDelay: '0.2s' }}>
            💕
          </span>
          <span className='animate-pulse' style={{ animationDelay: '0.4s' }}>
            💖
          </span>
          <span className='animate-pulse' style={{ animationDelay: '0.6s' }}>
            💗
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 10s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FinalScreen;
