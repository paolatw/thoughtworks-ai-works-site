'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PromptCard } from './PromptCard';

interface PromptCarouselProps {
  questions: string[];
  pageSize?: number;
  onSelect?: (question: string) => void;
}

export const PromptCarousel: React.FC<PromptCarouselProps> = ({
  questions,
  pageSize = 3,
  onSelect,
}) => {
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const gap = 12;
  const maxOffset = Math.max(0, questions.length - pageSize);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const containerWidth = trackRef.current.parentElement?.clientWidth ?? 0;
      setCardWidth((containerWidth - gap * (pageSize - 1)) / pageSize);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [pageSize]);

  const prev = () => setOffset(o => Math.max(0, o - 1));
  const next = () => setOffset(o => Math.min(maxOffset, o + 1));

  const translateX = -(offset * (cardWidth + gap));

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex-1 overflow-hidden relative">
        <div
          ref={trackRef}
          className="flex h-full absolute top-0 left-0"
          style={{
            gap: `${gap}px`,
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            width: `${questions.length * cardWidth + (questions.length - 1) * gap}px`,
          }}
        >
          {questions.map((q, i) => (
            <div key={i} style={{ width: cardWidth, flexShrink: 0 }}>
              <PromptCard question={q} onClick={onSelect ? () => onSelect(q) : undefined} />
            </div>
          ))}
        </div>
      </div>

      {maxOffset > 0 && (
        <div className="flex items-center justify-center gap-2 shrink-0">
          <button
            onClick={prev}
            disabled={offset === 0}
            className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: offset === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(0,229,255,0.15)',
              color: offset === 0 ? 'rgba(255,255,255,0.2)' : '#00e5ff',
              cursor: offset === 0 ? 'default' : 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="flex items-center gap-1.5 mx-2">
            {Array.from({ length: maxOffset + 1 }).map((_, i) => (
              <span
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === offset ? 16 : 6,
                  height: 6,
                  backgroundColor: i === offset ? '#00e5ff' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={offset === maxOffset}
            className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: offset === maxOffset ? 'rgba(255,255,255,0.05)' : 'rgba(0,229,255,0.15)',
              color: offset === maxOffset ? 'rgba(255,255,255,0.2)' : '#00e5ff',
              cursor: offset === maxOffset ? 'default' : 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCarousel;
