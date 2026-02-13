import React from 'react';

interface ConsentScreenProps {
  onConsent: () => void;
}

const ConsentScreen: React.FC<ConsentScreenProps> = ({ onConsent }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-red-500 flex items-center justify-center p-4'>
      <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl text-center transform hover:scale-105 transition-all duration-300'>
        <h1 className='text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6'>
          💝 Особое приглашение 💝
        </h1>
        <p className='text-gray-700 text-lg md:text-xl mb-8 leading-relaxed'>
          Прежде чем начать, пожалуйста, дай согласие на следующее:
        </p>
        <div className='space-y-4 text-left mb-10'>
          <div className='flex items-start gap-3 bg-pink-50 p-4 rounded-xl'>
            <span className='text-2xl'>✨</span>
            <p className='text-gray-800'>
              Не манипулировать JavaScript на этой странице
            </p>
          </div>
          <div className='flex items-start gap-3 bg-purple-50 p-4 rounded-xl'>
            <span className='text-2xl'>🎨</span>
            <p className='text-gray-800'>Не изменять CSS стили</p>
          </div>
          <div className='flex items-start gap-3 bg-red-50 p-4 rounded-xl'>
            <span className='text-2xl'>🌐</span>
            <p className='text-gray-800'>Не отключать интернет</p>
          </div>
          <div className='flex items-start gap-3 bg-yellow-50 p-4 rounded-xl'>
            <span className='text-2xl'>🎮</span>
            <p className='text-gray-800'>Не пытаться сломать игры</p>
          </div>
          <div className='flex items-start gap-3 bg-green-50 p-4 rounded-xl'>
            <span className='text-2xl'>💖</span>
            <p className='text-gray-800'>Быть лапочкой (это обязательно!)</p>
          </div>
        </div>
        <button
          onClick={onConsent}
          className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-300'
        >
          Я согласна! 💕
        </button>
      </div>
    </div>
  );
};

export default ConsentScreen;
