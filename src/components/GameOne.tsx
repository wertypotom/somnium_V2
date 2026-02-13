import React, { useState, useEffect, useRef } from 'react';

interface GameOneProps {
  onComplete: () => void;
}

const GameOne: React.FC<GameOneProps> = ({ onComplete }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isEscaping, setIsEscaping] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [hideNoButton, setHideNoButton] = useState(false);
  const [firstModalShown, setFirstModalShown] = useState(false);
  const [firstModalDismissed, setFirstModalDismissed] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // First timer - 10 seconds
  useEffect(() => {
    const timer10 = setTimeout(() => {
      setModalMessage('Еще не устала? Ладно ладно, я могу и подождать...');
      setShowModal(true);
      setFirstModalShown(true);
    }, 10000);

    return () => {
      clearTimeout(timer10);
    };
  }, []);

  // Second timer - starts only after first modal is dismissed
  useEffect(() => {
    if (!firstModalDismissed) return;

    const timer20 = setTimeout(() => {
      setModalMessage(
        'Штош,Я устал случайно вместо тебя, больше никакой кнопки "Нет" значит ъыъ',
      );
      setShowModal(true);
      setHideNoButton(true);
    }, 10000);

    return () => {
      clearTimeout(timer20);
    };
  }, [firstModalDismissed]);

  const handleModalClose = () => {
    setShowModal(false);
    if (firstModalShown && !firstModalDismissed) {
      setFirstModalDismissed(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (noButtonRef.current && !hideNoButton) {
        const rect = noButtonRef.current.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) +
            Math.pow(e.clientY - buttonCenterY, 2),
        );

        // Move button when mouse gets within 150px
        if (distance < 150) {
          const maxX = window.innerWidth - 200;
          const maxY = window.innerHeight - 80;

          // Keep trying random positions until we find one far from mouse
          let randomX, randomY, distanceFromMouse;
          do {
            randomX = Math.random() * maxX;
            randomY = Math.random() * maxY;
            distanceFromMouse = Math.sqrt(
              Math.pow(e.clientX - randomX, 2) +
                Math.pow(e.clientY - randomY, 2),
            );
          } while (distanceFromMouse < 300); // Ensure at least 300px away from mouse

          setNoButtonPos({ x: randomX, y: randomY });
          if (!isEscaping) setIsEscaping(true);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isEscaping, hideNoButton]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center p-4'>
      <div className='text-center'>
        <h1 className='text-6xl md:text-8xl font-bold text-white mb-12 drop-shadow-2xl animate-pulse'>
          Будешь моей валентинкой? 💘
        </h1>
        <div className='flex gap-8 justify-center items-center relative'>
          <button
            onClick={onComplete}
            className='bg-green-500 hover:bg-green-600 text-white px-16 py-6 rounded-full text-3xl font-bold shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300'
          >
            Да! 💚
          </button>
          {!hideNoButton && (
            <button
              ref={noButtonRef}
              style={
                isEscaping
                  ? {
                      position: 'fixed',
                      left: `${noButtonPos.x}px`,
                      top: `${noButtonPos.y}px`,
                    }
                  : {}
              }
              className='bg-red-500 hover:bg-red-600 text-white px-16 py-6 rounded-full text-3xl font-bold shadow-2xl'
            >
              Нет 😢
            </button>
          )}
        </div>
      </div>

      {/* Timed Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn'>
          <div className='bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg transform animate-scaleIn'>
            <div className='text-center'>
              <p className='text-2xl md:text-3xl text-gray-800 font-medium mb-8 leading-relaxed'>
                {modalMessage}
              </p>
              <button
                onClick={handleModalClose}
                className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-300'
              >
                Продолжаем
              </button>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes scaleIn {
              from {
                transform: scale(0.8);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
            .animate-scaleIn {
              animation: scaleIn 0.4s ease-out;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default GameOne;
