import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CtaSection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 mb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700/30 via-violet-600/15 to-violet-900/10 border border-violet-500/25 p-10 sm:p-16 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full bg-violet-600/20 blur-[80px]" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/15 border border-violet-500/25 mb-6">
            <Icon name="BoltIcon" size={14} variant="solid" className="text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Ready in seconds</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold gradient-text-white mb-5">
            Your file. Your format.
            <br />Right now.
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-10">
            Pick any tool from our collection and convert your first file in under 30 seconds — no account, no credit card, no catch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/file-conversion-tool-screen"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all duration-200 active:scale-95 shadow-glow-sm hover:shadow-glow-md"
            >
              <Icon name="DocumentArrowDownIcon" size={20} variant="outline" />
              Convert a File Now
              <Icon name="ArrowRightIcon" size={16} variant="outline" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-tools-screen"
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 hover:border-violet-500/40 text-zinc-200 font-semibold text-base transition-all duration-200 active:scale-95"
            >
              <Icon name="SparklesIcon" size={18} variant="outline" className="text-violet-400" />
              Explore AI Tools
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}