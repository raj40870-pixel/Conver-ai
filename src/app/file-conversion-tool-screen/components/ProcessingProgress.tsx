'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { ConversionJob, ConversionTool } from './ConversionWorkspace';

interface ProcessingProgressProps {
  job: ConversionJob;
  tool: ConversionTool;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const steps = [
  { id: 'step-upload', label: 'Uploading', status: 'uploading', icon: 'CloudArrowUpIcon' },
  { id: 'step-process', label: 'Converting', status: 'processing', icon: 'CpuChipIcon' },
  { id: 'step-ready', label: 'Ready', status: 'ready', icon: 'CheckCircleIcon' },
];

export default function ProcessingProgress({ job, tool }: ProcessingProgressProps) {
  const isUploading = job.status === 'uploading';
  const progress = isUploading ? job.uploadProgress : job.processProgress;

  return (
    <div className="flex flex-col gap-8">
      {/* File info card */}
      <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        <div className="w-12 h-12 rounded-xl bg-violet-600/10 flex items-center justify-center flex-shrink-0">
          <Icon name="DocumentIcon" size={22} variant="outline" className="text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-200 truncate">{job.fileName}</p>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">{formatFileSize(job.fileSize)}</p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800">
          <span className="text-xs font-mono text-zinc-500">{tool.from}</span>
          <Icon name="ArrowRightIcon" size={10} variant="outline" className="text-zinc-600" />
          <span className="text-xs font-mono text-violet-400">{tool.to}</span>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-0">
        {steps.map((step, idx) => {
          const isCompleted =
            (step.status === 'uploading' && (job.status === 'processing' || job.status === 'ready')) ||
            (step.status === 'processing' && job.status === 'ready') ||
            (step.status === 'ready' && job.status === 'ready');
          const isActive = step.status === job.status;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500/15 border border-emerald-500/30'
                    : isActive
                    ? 'bg-violet-600/20 border border-violet-500/40 pulse-glow'
                    : 'bg-zinc-800 border border-zinc-700'
                }`}>
                  {isCompleted ? (
                    <Icon name="CheckIcon" size={16} variant="outline" className="text-emerald-400" />
                  ) : (
                    <Icon
                      name={step.icon as 'BoltIcon'}
                      size={16}
                      variant="outline"
                      className={isActive ? 'text-violet-400 spin-slow' : 'text-zinc-600'}
                    />
                  )}
                </div>
                <span className={`text-xs font-medium ${
                  isCompleted ? 'text-emerald-400' : isActive ? 'text-violet-400' : 'text-zinc-600'
                }`}>
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500 ${
                  isCompleted ? 'bg-emerald-500/40' : 'bg-zinc-800'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-400">
            {isUploading ? 'Uploading file...' : 'Converting file...'}
          </span>
          <span className="text-sm font-bold font-mono text-violet-400 tabular-nums">{progress}%</span>
        </div>
        <div className="relative h-3 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-700 to-violet-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 shimmer rounded-full" />
        </div>
        <p className="text-xs text-zinc-600 text-center">
          {isUploading ? 'Securely uploading your file...' : `Running ${tool.name} conversion engine...`}
        </p>
      </div>

      {/* Processing animation */}
      {!isUploading && (
        <div className="flex items-center justify-center gap-3 py-6">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={`proc-bar-${i}`}
                className="w-1.5 rounded-full bg-violet-500"
                style={{
                  height: `${16 + i * 6}px`,
                  animation: `pulse ${0.8 + i * 0.1}s ease-in-out infinite alternate`,
                  opacity: 0.4 + i * 0.12,
                }}
              />
            ))}
          </div>
          <span className="text-sm text-zinc-500">AI processing your {tool.from} file</span>
          <div className="flex gap-1.5">
            {[4, 3, 2, 1, 0].map((i) => (
              <div
                key={`proc-bar-r-${i}`}
                className="w-1.5 rounded-full bg-violet-500"
                style={{
                  height: `${16 + i * 6}px`,
                  animation: `pulse ${0.8 + i * 0.1}s ease-in-out infinite alternate`,
                  opacity: 0.4 + i * 0.12,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}