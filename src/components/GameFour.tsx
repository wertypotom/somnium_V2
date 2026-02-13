import React, { useState } from 'react';

interface GameFourProps {
  onComplete: () => void;
}

const GameFour: React.FC<GameFourProps> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = input.trim().toLowerCase();

    // Check if input contains closing parenthesis FIRST
    if (input.includes(')')) {
      setMessage('Скобочки не считаются ))');
      setInput('');
      setAttempts((prev) => prev + 1);
      return;
    }

    // Then check correct answer
    if (trimmed === 'я' || trimmed === 'me') {
      if (attempts >= 1) {
        setMessage('Ну ты, даешь )');
        setTimeout(() => onComplete(), 1000);
      } else {
        onComplete();
      }
      return;
    }

    if (trimmed === 'тамила' || trimmed === 'tamila') {
      setMessage('не настолько все странно выглядит, чтоб писать свое имя :)');
      setInput('');
      setAttempts((prev) => prev + 1);
      return;
    }

    // Random playful messages for wrong answers
    const wrongMessages = [
      'Попробуй еще раз! 🤔',
      'ага, ага )',
      'ну почти )',
      'ну типо )',
      'Давай еще раз )',
      'капец ты )',
    ];
    const randomMessage =
      wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
    setMessage(randomMessage);
    setInput('');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center p-4'>
      <div className='bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center'>
        <h2 className='text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-8'>
          Кто моя самая любимая мадама? 👑
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full px-6 py-4 text-2xl text-center text-gray-800 border-4 border-pink-300 rounded-2xl focus:border-pink-500 focus:outline-none transition-all duration-300'
            placeholder='Введи ответ...'
            autoFocus
          />
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-2xl text-2xl font-bold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300'
          >
            Ответить 💬
          </button>
        </form>

        {message && (
          <div className='mt-6 p-4 bg-pink-100 border-2 border-pink-300 rounded-2xl'>
            <p className='text-xl text-pink-800 font-medium'>{message}</p>
          </div>
        )}

        <div className='mt-8 text-gray-500 text-sm'>
          Подсказка: подумай... кто читает это сейчас? 😉
        </div>
      </div>
    </div>
  );
};

export default GameFour;
