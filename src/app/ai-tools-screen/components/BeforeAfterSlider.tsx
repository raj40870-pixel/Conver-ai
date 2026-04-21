'use client';

import React, { useState, useRef, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BeforeAfterSliderProps {
  toolName: string;
}

export default function BeforeAfterSlider({ toolName }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  }, [updateSlider]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) updateSlider(e.clientX);
  }, [isDragging, updateSlider]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  }, [updateSlider]);

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 fade-in-up">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="ArrowsRightLeftIcon" size={16} variant="outline" className="text-violet-400" />
        <h3 className="text-sm font-semibold text-zinc-300">Before / After Comparison</h3>
        <span className="text-xs text-zinc-600 ml-auto">Drag the slider to compare</span>
      </div>

      {/* Comparison container */}
      <div
        ref={containerRef}
        className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden cursor-ew-resize select-none bg-zinc-800"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* BEFORE — mock gradient placeholder representing original image with watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-zinc-700 via-zinc-600 to-zinc-800 flex items-center justify-center relative">
            {/* Simulated image content */}
            <div className="absolute inset-0 opacity-30 bg-grid-pattern" />
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-24 h-24 rounded-2xl bg-zinc-500/40 border border-zinc-500/30" />
              <div className="w-32 h-3 rounded bg-zinc-500/40" />
              <div className="w-20 h-2 rounded bg-zinc-500/30" />
            </div>
            {/* Simulated watermark overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="rotate-[-25deg] text-zinc-400/40 text-3xl font-bold tracking-widest select-none">
                WATERMARK
              </div>
            </div>
            {/* BEFORE label */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-700 text-xs font-semibold text-zinc-400">
              Before
            </div>
          </div>
        </div>

        {/* AFTER — clean image (clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20 bg-grid-pattern" />
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-24 h-24 rounded-2xl bg-zinc-600/40 border border-zinc-500/30" />
              <div className="w-32 h-3 rounded bg-zinc-600/40" />
              <div className="w-20 h-2 rounded bg-zinc-600/30" />
            </div>
            {/* No watermark in AFTER */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                <Icon name="SparklesIcon" size={14} variant="solid" className="text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">AI Cleaned</span>
              </div>
            </div>
            {/* AFTER label */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-emerald-500/25 text-xs font-semibold text-emerald-400">
              After
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.4)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        />

        {/* Handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-[0_2px_16px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none transition-transform duration-100 ${isDragging ? 'scale-110' : ''}`}
          style={{ left: `${sliderPos}%` }}
        >
          <Icon name="ArrowsRightLeftIcon" size={16} variant="outline" className="text-zinc-800" />
        </div>
      </div>

      <p className="text-xs text-zinc-600 text-center mt-3">
        Comparison preview for <span className="text-zinc-500">{toolName}</span> — actual results may vary by image content
      </p>
    </div>
  );
}