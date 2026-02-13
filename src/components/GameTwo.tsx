import React, { useState, useEffect, useRef } from 'react';

interface GameTwoProps {
  onComplete: () => void;
}

const GameTwo: React.FC<GameTwoProps> = ({ onComplete }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heartPos] = useState({
    x: Math.random() * (window.innerWidth - 100) + 50,
    y: Math.random() * (window.innerHeight - 100) + 50,
  });
  const [found, setFound] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const distance = Math.sqrt(
        Math.pow(e.clientX - heartPos.x, 2) +
          Math.pow(e.clientY - heartPos.y, 2),
      );

      if (distance < 60 && !found) {
        setFound(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [heartPos, found, onComplete]);

  return (
    <div
      ref={canvasRef}
      className='min-h-screen bg-black relative overflow-hidden cursor-none'
    >
      {/* Flashlight effect */}
      <div
        className='absolute w-64 h-64 rounded-full pointer-events-none'
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 70%)',
          transition: 'none',
        }}
      />

      {/* Hidden heart */}
      <div
        className={`absolute text-6xl transition-all duration-500 ${found ? 'scale-150' : ''}`}
        style={{
          left: heartPos.x - 30,
          top: heartPos.y - 30,
        }}
      >
        ❤️
      </div>

      {/* Instructions */}
      <div className='absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold text-center'>
        <p className='drop-shadow-lg'>Найди сердце в темноте! 🔦</p>
      </div>

      {found && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-white text-6xl font-bold animate-pulse'>
            Нашла! 💖
          </div>
        </div>
      )}
    </div>
  );
};

export default GameTwo;
