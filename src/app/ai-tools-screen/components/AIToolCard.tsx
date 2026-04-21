'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { AITool } from './AIToolsWorkspace';

interface AIToolCardProps {
  tool: AITool;
  onSelect: (id: string) => void;
}

export default function AIToolCard({ tool, onSelect }: AIToolCardProps) {
  return (
    <button
      onClick={() => onSelect(tool.id)}
      className={`group relative flex flex-col gap-5 p-7 rounded-2xl bg-gradient-to-br ${tool.color} border border-zinc-800/80 hover:${tool.borderColor} shadow-card hover:shadow-card-hover transition-all duration-250 hover:-translate-y-1 text-left w-full`}
    >
      {/* Badge */}
      <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-full bg-zinc-900/60 border ${tool.borderColor} text-xs font-semibold ${tool.iconColor}`}>
        {tool.badge}
      </span>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
        <Icon name={tool.icon as 'BoltIcon'} size={26} variant="outline" className={tool.iconColor} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors">{tool.name}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed mb-4">{tool.tagline}</p>

        <ul className="space-y-1.5">
          {tool.capabilities.slice(0, 3).map((cap) => (
            <li key={`card-cap-${tool.id}-${cap}`} className="flex items-center gap-2 text-xs text-zinc-500">
              <Icon name="CheckIcon" size={12} variant="outline" className={tool.iconColor} />
              {cap}
            </li>
          ))}
        </ul>
      </div>

      {/* Format info */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60">
        <span className="text-xs text-zinc-600 font-mono">{tool.acceptsLabel}</span>
        <div className={`flex items-center gap-1.5 text-xs font-semibold ${tool.iconColor} group-hover:gap-2 transition-all`}>
          Use Tool
          <Icon name="ArrowRightIcon" size={13} variant="outline" className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </button>
  );
}