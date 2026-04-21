'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { ConversionTool } from './ConversionWorkspace';

interface RelatedToolsProps {
  currentToolId: string;
  tools: ConversionTool[];
  onToolChange: (id: string) => void;
}

export default function RelatedTools({ currentToolId, tools, onToolChange }: RelatedToolsProps) {
  const related = tools.filter((t) => t.id !== currentToolId).slice(0, 4);

  return (
    <div className="mt-10 pt-8 border-t border-zinc-800/60">
      <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-4">More Conversion Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
        {related.map((tool) => (
          <button
            key={`related-${tool.id}`}
            onClick={() => onToolChange(tool.id)}
            className="group flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60 hover:border-violet-500/30 hover:bg-violet-600/5 transition-all duration-200 text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600/10 transition-colors">
              <Icon name={tool.icon as 'BoltIcon'} size={16} variant="outline" className={tool.iconColor} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors truncate">{tool.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs font-mono text-zinc-600">{tool.from}</span>
                <Icon name="ArrowRightIcon" size={8} variant="outline" className="text-zinc-700" />
                <span className="text-xs font-mono text-zinc-600">{tool.to}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}