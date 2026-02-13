import React, { useState, useEffect } from 'react';

interface GameThreeProps {
  onComplete: () => void;
}

interface TargetBox {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  openingSide: 'top' | 'right' | 'bottom' | 'left';
}

const generateRandomBox = (): TargetBox => {
  const width = 200;
  const height = 150;
  const x = Math.random() * (window.innerWidth - width - 100) + 50;
  const y = Math.random() * (window.innerHeight - height - 100) + 50;
  const rotation = Math.random() * 360; // Random angle
  const openings: ('top' | 'right' | 'bottom' | 'left')[] = [
    'top',
    'right',
    'bottom',
    'left',
  ];
  const openingSide = openings[Math.floor(Math.random() * openings.length)];

  return { x, y, width, height, rotation, openingSide };
};

const GameThree: React.FC<GameThreeProps> = ({ onComplete }) => {
  const [mousePos, setMousePos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [heartPos, setHeartPos] = useState({
    x: window.innerWidth / 2,
    y: 100,
  });
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [targetBoxes] = useState<TargetBox[]>([
    generateRandomBox(),
    generateRandomBox(),
    generateRandomBox(),
  ]);
  const totalBoxes = 3;

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

          let boundedX = Math.max(30, Math.min(window.innerWidth - 30, newX));
          let boundedY = Math.max(30, Math.min(window.innerHeight - 30, newY));

          // Check collision with current target box (accounting for rotation)
          if (currentBoxIndex < totalBoxes) {
            const box = targetBoxes[currentBoxIndex];

            // Helper function to check if point is inside rotated rectangle
            const isPointInRotatedRect = (px: number, py: number) => {
              // Box center
              const centerX = box.x + box.width / 2;
              const centerY = box.y + box.height / 2;

              // Translate point to origin
              const translatedX = px - centerX;
              const translatedY = py - centerY;

              // Rotate point by negative box rotation
              const angleRad = (-box.rotation * Math.PI) / 180;
              const rotatedX =
                translatedX * Math.cos(angleRad) -
                translatedY * Math.sin(angleRad);
              const rotatedY =
                translatedX * Math.sin(angleRad) +
                translatedY * Math.cos(angleRad);

              // Check if rotated point is within unrotated rectangle bounds
              const halfWidth = box.width / 2;
              const halfHeight = box.height / 2;
              return (
                Math.abs(rotatedX) <= halfWidth &&
                Math.abs(rotatedY) <= halfHeight
              );
            };

            // Helper to determine which edge is being crossed
            const getEntrySide = (
              prevX: number,
              prevY: number,
              newX: number,
              newY: number,
            ) => {
              const centerX = box.x + box.width / 2;
              const centerY = box.y + box.height / 2;

              // Get angle from center to previous position
              const angleRad = (-box.rotation * Math.PI) / 180;
              const translatedX = prevX - centerX;
              const translatedY = prevY - centerY;
              const rotatedX =
                translatedX * Math.cos(angleRad) -
                translatedY * Math.sin(angleRad);
              const rotatedY =
                translatedX * Math.sin(angleRad) +
                translatedY * Math.cos(angleRad);

              const halfWidth = box.width / 2;
              const halfHeight = box.height / 2;

              // Determine which side based on which edge is closest
              // These thresholds might need fine-tuning based on heart size and push strength
              if (Math.abs(rotatedX + halfWidth) < 10) return 'left'; // Close to left edge
              if (Math.abs(rotatedX - halfWidth) < 10) return 'right'; // Close to right edge
              if (Math.abs(rotatedY + halfHeight) < 10) return 'top'; // Close to top edge
              if (Math.abs(rotatedY - halfHeight) < 10) return 'bottom'; // Close to bottom edge

              // Fallback: check which direction point is relative to box if not close to an edge
              if (Math.abs(rotatedX) > Math.abs(rotatedY)) {
                return rotatedX < 0 ? 'left' : 'right';
              } else {
                return rotatedY < 0 ? 'top' : 'bottom';
              }
            };

            const wasInside = isPointInRotatedRect(prev.x, prev.y);
            const isInside = isPointInRotatedRect(boundedX, boundedY);

            // If entering box (was outside, now inside)
            if (!wasInside && isInside) {
              const entrySide = getEntrySide(
                prev.x,
                prev.y,
                boundedX,
                boundedY,
              );

              if (entrySide !== box.openingSide) {
                // Block entry - keep previous position
                boundedX = prev.x;
                boundedY = prev.y;
              }
            }

            // If exiting box (was inside, now outside) - also check if exiting through open side
            if (wasInside && !isInside) {
              const exitSide = getEntrySide(prev.x, prev.y, boundedX, boundedY);

              if (exitSide !== box.openingSide) {
                // Block exit through closed walls - keep previous position
                boundedX = prev.x;
                boundedY = prev.y;
              }
            }

            // If already inside, check if we should advance
            if (wasInside && isInside) {
              const nextIndex = currentBoxIndex + 1;
              if (nextIndex >= totalBoxes) {
                setTimeout(() => onComplete(), 500);
              } else {
                setCurrentBoxIndex(nextIndex);
              }
            }
          }

          return { x: boundedX, y: boundedY };
        }

        return prev;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [mousePos, onComplete, currentBoxIndex, targetBoxes, totalBoxes]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 relative overflow-hidden'>
      {/* Instructions */}
      <div className='absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-center'>
        <h2 className='text-4xl font-bold drop-shadow-lg mb-2'>
          Дотолкай сердце к цели! 💙
        </h2>
        <div className='mt-4 text-2xl font-bold'>
          Коробок: {currentBoxIndex + 1}/{totalBoxes}
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

      {/* Target boxes */}
      {targetBoxes.map((box, index) => {
        if (index !== currentBoxIndex) return null;

        // Define which borders to show based on opening side
        const getBorderStyle = (openingSide: string) => {
          const baseBorder = '4px solid #4ade80';
          switch (openingSide) {
            case 'top':
              return {
                borderRight: baseBorder,
                borderBottom: baseBorder,
                borderLeft: baseBorder,
              };
            case 'right':
              return {
                borderTop: baseBorder,
                borderBottom: baseBorder,
                borderLeft: baseBorder,
              };
            case 'bottom':
              return {
                borderTop: baseBorder,
                borderRight: baseBorder,
                borderLeft: baseBorder,
              };
            case 'left':
              return {
                borderTop: baseBorder,
                borderRight: baseBorder,
                borderBottom: baseBorder,
              };
            default:
              return {};
          }
        };

        return (
          <div
            key={index}
            className='absolute bg-green-400/20 flex items-center justify-center'
            style={{
              left: box.x,
              top: box.y,
              width: box.width,
              height: box.height,
              transform: `rotate(${box.rotation}deg)`,
              ...getBorderStyle(box.openingSide),
            }}
          >
            <div
              className='text-white text-3xl font-bold'
              style={{ transform: `rotate(-${box.rotation}deg)` }}
            >
              🎯 ЦЕЛЬ 🎯
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GameThree;
