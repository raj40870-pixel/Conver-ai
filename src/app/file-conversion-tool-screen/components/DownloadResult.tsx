'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import type { ConversionJob, ConversionTool } from './ConversionWorkspace';

interface DownloadResultProps {
  job: ConversionJob;
  tool: ConversionTool;
  onDownload: () => void;
  onReset: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DownloadResult({ job, tool, onDownload, onReset }: DownloadResultProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    if (job.shareLink) {
      navigator.clipboard.writeText(job.shareLink).then(() => {
        setLinkCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setLinkCopied(false), 3000);
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 fade-in-up">
      {/* Success header */}
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
            <Icon name="CheckCircleIcon" size={36} variant="outline" className="text-emerald-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center">
            <Icon name="CheckIcon" size={12} variant="solid" className="text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-1">Conversion Complete!</h2>
          <p className="text-zinc-500 text-sm">Your {tool.to} file is ready to download.</p>
        </div>
      </div>

      {/* File result card */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
            <Icon name="DocumentArrowDownIcon" size={26} variant="outline" className="text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-zinc-100 truncate">{job.resultFileName}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-mono text-zinc-500">{formatFileSize(job.resultSize)}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-xs font-mono text-zinc-500">{tool.to} format</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <Icon name="ShieldCheckIcon" size={11} variant="outline" />
                Encrypted
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 flex-shrink-0">
            Ready
          </span>
        </div>

        {/* Download button */}
        <button
          onClick={onDownload}
          className="group w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all duration-200 active:scale-[0.98] shadow-glow-sm hover:shadow-glow-md mb-3"
        >
          <Icon name="ArrowDownTrayIcon" size={20} variant="outline" className="group-hover:animate-bounce-slow" />
          Download {tool.to} File
        </button>

        {/* Share link (for pdf-share-link tool) */}
        {job.shareLink && (
          <div className="flex items-center gap-2 mt-3 p-3 rounded-xl bg-indigo-600/8 border border-indigo-500/20">
            <Icon name="LinkIcon" size={16} variant="outline" className="text-indigo-400 flex-shrink-0" />
            <span className="flex-1 text-xs font-mono text-indigo-300 truncate">{job.shareLink}</span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-xs font-medium transition-all duration-200 active:scale-95 flex-shrink-0"
            >
              <Icon name={linkCopied ? 'CheckIcon' : 'ClipboardIcon'} size={13} variant="outline" />
              {linkCopied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        )}
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
        <Icon name="ClockIcon" size={14} variant="outline" className="text-zinc-600 flex-shrink-0" />
        <p className="text-xs text-zinc-600">
          This file will be automatically deleted from our servers in <span className="text-zinc-500 font-medium">1 hour</span>. Download it now to keep it.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-300 text-sm font-medium transition-all duration-200 active:scale-95"
        >
          <Icon name="ArrowPathIcon" size={16} variant="outline" />
          Convert Another File
        </button>
      </div>
    </div>
  );
}