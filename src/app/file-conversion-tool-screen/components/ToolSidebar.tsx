'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { ConversionTool } from './ConversionWorkspace';

interface ToolSidebarProps {
  tools: ConversionTool[];
  activeToolId: string;
  onToolChange: (id: string) => void;
}

export default function ToolSidebar({ tools, activeToolId, onToolChange }: ToolSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-zinc-800/60">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Conversion Tools</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {tools.map((tool) => {
          const isActive = tool.id === activeToolId;
          return (
            <button
              key={`sidebar-tool-${tool.id}`}
              onClick={() => { onToolChange(tool.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-violet-600/15 text-violet-300 shadow-[0_0_0_1px_rgba(124,58,237,0.25)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <Icon name={tool.icon as 'BoltIcon'} size={16} variant="outline" className={isActive ? 'text-violet-400' : `${tool.iconColor} opacity-70 group-hover:opacity-100`} />
              <span className="flex-1 truncate">{tool.name}</span>
              <div className="flex items-center gap-1 opacity-60">
                <span className="text-xs font-mono">{tool.from}</span>
                <Icon name="ArrowRightIcon" size={10} variant="outline" />
                <span className="text-xs font-mono">{tool.to}</span>
              </div>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-zinc-800/60">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-xs text-emerald-400 font-medium">All tools free · No login</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden px-4 py-3 border-b border-zinc-800/60 bg-[#111113]">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-medium text-zinc-300"
        >
          <Icon name="Bars3Icon" size={18} variant="outline" />
          <span>Tools</span>
          <Icon name={mobileOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={14} variant="outline" className="ml-auto text-zinc-500" />
        </button>
        {mobileOpen && (
          <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-zinc-800 bg-[#111113]">
            <SidebarContent />
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 border-r border-zinc-800/60 bg-[#0e0e10] min-h-[calc(100vh-64px)] sticky top-16 self-start max-h-[calc(100vh-64px)]">
        <SidebarContent />
      </aside>
    </>
  );
}