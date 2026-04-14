'use client';

import React from 'react';

interface PromptCardProps {
  question: string;
  onClick?: () => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ question, onClick }) => (
  <button
    onClick={onClick}
    className="group text-left w-full h-full rounded-xl p-5 transition-all duration-200"
    style={{
      backgroundColor: 'rgba(13, 38, 50, 0.85)',
      cursor: onClick ? 'pointer' : 'default',
      minHeight: '120px',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(20, 55, 72, 0.95)';
      (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(13, 38, 50, 0.85)';
      (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
    }}
  >
    <span
      className="font-hero text-base md:text-lg font-bold leading-snug"
      style={{ color: '#ffffff' }}
    >
      {question}
    </span>
  </button>
);

export default PromptCard;
