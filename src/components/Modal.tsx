import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn'>
      <div className='bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg transform animate-scaleIn'>
        <div className='text-center'>
          <div className='text-7xl mb-6 animate-bounce'>💝</div>
          <p className='text-2xl md:text-3xl text-gray-800 font-medium mb-8 leading-relaxed'>
            {message}
          </p>
          <button
            onClick={onClose}
            className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-300'
          >
            Продолжить 💕
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
  );
};

export default Modal;
