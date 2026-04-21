'use client';

import React, { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import type { AITool, AIJob } from './AIToolsWorkspace';

interface AIUploadPanelProps {
  tool: AITool;
  job: AIJob | null;
  onFileAccepted: (file: File) => void;
  onDownload: () => void;
  onReset: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function AIUploadPanel({ tool, job, onFileAccepted, onDownload, onReset }: AIUploadPanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const acceptedExtensions = tool.accepts.split(',').map((e) => e.trim().toLowerCase());
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedExtensions.includes(fileExt)) {
      toast.error(`Unsupported file type "${fileExt}". ${tool.name} accepts: ${tool.acceptsLabel}`);
      return;
    }
    onFileAccepted(file);
  }, [tool, onFileAccepted]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (!job || job.status === 'idle') {
    return (
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center min-h-[340px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 group ${
          isDragging
            ? 'upload-zone-active border-violet-500'
            : 'border-zinc-700/60 bg-zinc-900/20 hover:border-violet-500/50 hover:bg-violet-600/5'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={tool.accepts}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); if (inputRef.current) inputRef.current.value = ''; }}
          className="hidden"
          aria-label={`Upload file for ${tool.name}`}
        />
        {isDragging && <div className="absolute inset-0 rounded-2xl bg-violet-600/5 animate-pulse" />}
        <div className="relative z-10 flex flex-col items-center gap-5 p-10 text-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isDragging ? 'bg-violet-600/20 scale-110' : 'bg-zinc-800 group-hover:bg-violet-600/10 group-hover:scale-105'
          }`}>
            <Icon name={tool.icon as 'BoltIcon'} size={36} variant="outline" className={`transition-colors duration-300 ${isDragging ? 'text-violet-400' : `${tool.iconColor} opacity-60 group-hover:opacity-100`}`} />
          </div>
          <div>
            <p className={`text-xl font-semibold mb-2 transition-colors ${isDragging ? 'text-violet-300' : 'text-zinc-300 group-hover:text-zinc-100'}`}>
              {isDragging ? 'Drop to process with AI' : `Upload your ${tool.inputType}`}
            </p>
            <p className="text-sm text-zinc-500 mb-1">
              or <span className="text-violet-400 font-medium">click to browse</span>
            </p>
            <p className="text-xs text-zinc-600 font-mono">{tool.acceptsLabel} · Max {tool.maxSizeMb}MB</p>
          </div>
        </div>
      </div>
    );
  }

  // Uploading / Processing state
  if (job.status === 'uploading' || job.status === 'processing') {
    const isUploading = job.status === 'uploading';
    const progress = isUploading ? job.uploadProgress : job.processProgress;

    return (
      <div className="flex flex-col gap-6 p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800">
        {/* File info */}
        <div className="flex items-center gap-3 pb-5 border-b border-zinc-800/60">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <Icon name={tool.inputType === 'video' ? 'VideoCameraIcon' : 'PhotoIcon'} size={18} variant="outline" className={tool.iconColor} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-200 truncate">{job.fileName}</p>
            <p className="text-xs text-zinc-600 font-mono">{formatFileSize(job.fileSize)}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-600/15 flex items-center justify-center flex-shrink-0">
            <Icon name="CpuChipIcon" size={16} variant="outline" className="text-violet-400 spin-slow" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-300 mb-1">{job.currentStep}</p>
            <div className="relative h-2.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-700 to-violet-400 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 shimmer rounded-full" />
            </div>
          </div>
          <span className="text-sm font-bold font-mono text-violet-400 tabular-nums flex-shrink-0">{progress}%</span>
        </div>

        {/* Processing steps */}
        <div className="space-y-2">
          {tool.processingSteps.map((step, idx) => {
            const stepPct = ((idx + 1) / tool.processingSteps.length) * 100;
            const isDone = isUploading ? false : job.processProgress >= stepPct;
            const isCurrentStep = !isUploading && job.currentStep === step;
            return (
              <div key={`proc-step-${tool.id}-${idx}`} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isDone
                    ? 'bg-emerald-500/15 border border-emerald-500/30'
                    : isCurrentStep
                    ? 'bg-violet-600/20 border border-violet-500/40'
                    : 'bg-zinc-800 border border-zinc-700'
                }`}>
                  {isDone ? (
                    <Icon name="CheckIcon" size={10} variant="outline" className="text-emerald-400" />
                  ) : isCurrentStep ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  )}
                </div>
                <span className={`text-xs transition-colors duration-200 ${
                  isDone ? 'text-emerald-400' : isCurrentStep ? 'text-violet-300' : 'text-zinc-600'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* AI visual indicator */}
        <div className="flex items-center justify-center gap-2 py-4">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={`ai-bar-${i}`}
                className="w-1 rounded-full"
                style={{
                  height: `${12 + Math.sin(i * 0.8) * 10}px`,
                  backgroundColor: '#7c3aed',
                  opacity: 0.3 + (i % 3) * 0.2,
                  animation: `pulse ${0.6 + i * 0.08}s ease-in-out ${i * 0.05}s infinite alternate`,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-zinc-600 mx-2">AI processing</span>
          <div className="flex gap-1">
            {[6, 5, 4, 3, 2, 1, 0].map((i) => (
              <div
                key={`ai-bar-r-${i}`}
                className="w-1 rounded-full"
                style={{
                  height: `${12 + Math.sin(i * 0.8) * 10}px`,
                  backgroundColor: '#a78bfa',
                  opacity: 0.3 + (i % 3) * 0.2,
                  animation: `pulse ${0.6 + i * 0.08}s ease-in-out ${i * 0.05}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Ready state
  if (job.status === 'ready') {
    return (
      <div className="flex flex-col gap-5 fade-in-up">
        {/* Success header */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <Icon name="CheckCircleIcon" size={24} variant="outline" className="text-emerald-400" />
          </div>
          <div>
            <p className="text-base font-semibold text-emerald-300">AI processing complete!</p>
            <p className="text-xs text-zinc-500 mt-0.5">{tool.name} finished — your cleaned file is ready.</p>
          </div>
        </div>

        {/* Result file card */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
              <Icon name={tool.inputType === 'video' ? 'FilmIcon' : 'PhotoIcon'} size={22} variant="outline" className="text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-100 truncate">{job.resultFileName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono text-zinc-500">{formatFileSize(job.resultSize)}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <Icon name="SparklesIcon" size={11} variant="solid" />
                  AI cleaned
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 flex-shrink-0">
              Ready
            </span>
          </div>

          <button
            onClick={onDownload}
            className="group w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all duration-200 active:scale-[0.98] shadow-glow-sm hover:shadow-glow-md"
          >
            <Icon name="ArrowDownTrayIcon" size={20} variant="outline" className="group-hover:animate-bounce-slow" />
            Download Cleaned {tool.inputType === 'video' ? 'Video' : 'Image'}
          </button>
        </div>

        {/* Privacy note */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
          <Icon name="ClockIcon" size={13} variant="outline" className="text-zinc-600 flex-shrink-0" />
          <p className="text-xs text-zinc-600">
            Auto-deleted from our servers in <span className="text-zinc-500 font-medium">1 hour</span>. Download now to keep it.
          </p>
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm font-medium transition-all duration-200 active:scale-95"
        >
          <Icon name="ArrowPathIcon" size={15} variant="outline" />
          Process Another {tool.inputType === 'video' ? 'Video' : 'Image'}
        </button>
      </div>
    );
  }

  // Error state
  return (
    <div className="flex flex-col items-center justify-center min-h-[280px] gap-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
        <Icon name="ExclamationTriangleIcon" size={26} variant="outline" className="text-red-400" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-red-400 mb-1.5">AI processing failed</h3>
        <p className="text-sm text-zinc-500">{job.errorMessage ?? 'An unexpected error occurred. Please try again with a different file.'}</p>
      </div>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-all duration-200 active:scale-95"
      >
        Try Again
      </button>
    </div>
  );
}