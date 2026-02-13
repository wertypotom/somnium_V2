import React, { useState, useEffect, useRef } from 'react';

interface GameTwoProps {
  onComplete: () => void;
}

const GameTwo: React.FC<GameTwoProps> = ({ onComplete }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heartPos, setHeartPos] = useState({
    x: Math.random() * (window.innerWidth - 100) + 50,
    y: Math.random() * (window.innerHeight - 100) + 50,
  });
  const [foundCount, setFoundCount] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (foundCount >= 3 || showVictory) return;

      const distance = Math.sqrt(
        Math.pow(e.clientX - heartPos.x, 2) +
          Math.pow(e.clientY - heartPos.y, 2),
      );

      // Trigger at 100px so heart is more visible before jumping
      if (distance < 100) {
        const newFoundCount = foundCount + 1;
        setFoundCount(newFoundCount);

        if (newFoundCount >= 3) {
          // Found 3 times - win!
          setShowVictory(true);
          setTimeout(() => {
            onComplete();
          }, 1500);
        } else {
          // Jump to new position (far from mouse)
          let randomX, randomY, distanceFromMouse;
          do {
            randomX = Math.random() * (window.innerWidth - 100) + 50;
            randomY = Math.random() * (window.innerHeight - 100) + 50;
            distanceFromMouse = Math.sqrt(
              Math.pow(e.clientX - randomX, 2) +
                Math.pow(e.clientY - randomY, 2),
            );
          } while (distanceFromMouse < 300);

          setHeartPos({ x: randomX, y: randomY });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [heartPos, foundCount, showVictory, onComplete]);

  // Check if heart is in flashlight radius to show it
  const distanceToFlashlight = Math.sqrt(
    Math.pow(mousePos.x - heartPos.x, 2) + Math.pow(mousePos.y - heartPos.y, 2),
  );

  // Calculate opacity based on distance - closer = more visible
  const maxVisibleDistance = 200;
  let heartOpacity = 0;
  if (distanceToFlashlight < maxVisibleDistance) {
    heartOpacity = 1 - distanceToFlashlight / maxVisibleDistance;
  }

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

      {/* Hidden heart - gradually revealed by flashlight */}
      {!showVictory && (
        <div
          className='absolute text-6xl'
          style={{
            left: heartPos.x - 30,
            top: heartPos.y - 30,
            opacity: heartOpacity,
            filter: `brightness(${0.5 + heartOpacity * 0.5})`,
            transition: 'none',
          }}
        >
          ❤️
        </div>
      )}

      {/* Instructions */}
      <div className='absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-center'>
        <p className='text-2xl font-bold drop-shadow-lg mb-2'>
          Найди сердце в темноте! 🔦
        </p>
        <p className='text-lg drop-shadow-lg'>Найдено: {foundCount}/3</p>
      </div>

      {showVictory && (
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
