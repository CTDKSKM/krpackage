'use client';

import React from 'react';

interface NeumorphicBoxProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

const NeumorphicBox: React.FC<NeumorphicBoxProps> = ({ children, className = '', interactive = true }) => {
  return (
    <div
      className={`
        bg-secondary p-6
        
        ${interactive ? 'neumorphic' : 'neumorphic-static rounded-2xl'}
        transition-all duration-500 ease-in-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default NeumorphicBox;
