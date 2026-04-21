'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const rotatingWords = ['PDFs', 'Images', 'Documents', 'Videos', 'Archives'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 pb-20 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-violet-400/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-700/6 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/10 border border-violet-500/25 mb-8 fade-in-up">
          <Icon name="SparklesIcon" size={14} variant="solid" className="text-violet-400" />
          <span className="text-sm font-medium text-violet-300">Free AI-Powered File Tools — No Account Needed</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-6 fade-in-up">
          <span className="gradient-text-white">Convert Your</span>
          <br />
          <span
            className={`gradient-text transition-all duration-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } inline-block`}
          >
            {rotatingWords[wordIndex]}
          </span>
          <br />
          <span className="gradient-text-white">Instantly</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed fade-in-up">
          12 powerful tools — PDF conversion, AI watermark removal, document processing.
          Free forever. No login. Results in seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in-up">
          <Link
            href="/file-conversion-tool-screen"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all duration-200 active:scale-95 shadow-glow-sm hover:shadow-glow-md"
          >
            <Icon name="DocumentArrowDownIcon" size={20} variant="outline" />
            Convert Files Free
            <Icon name="ArrowRightIcon" size={16} variant="outline" className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/ai-tools-screen"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 hover:border-violet-500/40 text-zinc-200 font-semibold text-base transition-all duration-200 active:scale-95"
          >
            <Icon name="SparklesIcon" size={18} variant="outline" className="text-violet-400" />
            Try AI Tools
          </Link>
        </div>

        {/* Floating file format pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {['PDF', 'DOCX', 'JPG', 'PNG', 'ZIP', 'PPT', 'MP4', 'WEBP', 'OCR'].map((fmt) => (
            <span
              key={`hero-fmt-${fmt}`}
              className="px-3 py-1.5 rounded-lg bg-zinc-800/70 border border-zinc-700/60 text-xs font-mono text-zinc-400 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200"
            >
              .{fmt.toLowerCase()}
            </span>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-zinc-500">
          {[
            { icon: 'ShieldCheckIcon', text: 'Files auto-deleted after 1hr' },
            { icon: 'BoltIcon', text: 'Under 10s processing' },
            { icon: 'LockClosedIcon', text: 'Encrypted transfers' },
          ].map((trust) => (
            <div key={`trust-${trust.text}`} className="flex items-center gap-1.5">
              <Icon name={trust.icon as 'ShieldCheckIcon'} size={15} variant="outline" className="text-violet-400" />
              <span>{trust.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 animate-bounce-slow">
        <span className="text-xs font-medium tracking-widest uppercase">Explore tools</span>
        <Icon name="ChevronDownIcon" size={18} variant="outline" />
      </div>
    </section>
  );
}