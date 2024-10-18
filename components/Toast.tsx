'use client';

import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // 페이드 아웃 애니메이션 후 완전히 제거
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white neumorphic p-4 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default Toast;

