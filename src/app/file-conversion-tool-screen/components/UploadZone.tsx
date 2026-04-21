'use client';

import React, { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import type { ConversionTool } from './ConversionWorkspace';

interface UploadZoneProps {
  tool: ConversionTool;
  onFileAccepted: (file: File) => void;
}

export default function UploadZone({ tool, onFileAccepted }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): boolean => {
    const acceptedExtensions = tool.accepts.split(',').map((e) => e.trim().toLowerCase());
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedExtensions.includes(fileExt)) {
      toast.error(`Unsupported file type "${fileExt}". ${tool.name} accepts: ${tool.accepts}`);
      return false;
    }
    return true;
  }, [tool]);

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      onFileAccepted(file);
    }
  }, [validateFile, onFileAccepted]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (inputRef.current) inputRef.current.value = '';
  }, [handleFile]);

  return (
    <div className="flex flex-col gap-6">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center min-h-[360px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 group ${
          isDragging
            ? 'upload-zone-active border-violet-500'
            : 'border-zinc-700/60 bg-zinc-900/30 hover:border-violet-500/50 hover:bg-violet-600/5'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={tool.accepts}
          onChange={handleInputChange}
          className="hidden"
          aria-label={`Upload ${tool.from} file`}
        />

        {/* Background pulse on drag */}
        {isDragging && (
          <div className="absolute inset-0 rounded-2xl bg-violet-600/5 animate-pulse" />
        )}

        <div className="relative z-10 flex flex-col items-center gap-5 p-10 text-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isDragging ? 'bg-violet-600/20 scale-110' : 'bg-zinc-800 group-hover:bg-violet-600/10 group-hover:scale-105'
          }`}>
            <Icon
              name="CloudArrowUpIcon"
              size={36}
              variant="outline"
              className={`transition-colors duration-300 ${isDragging ? 'text-violet-400' : 'text-zinc-500 group-hover:text-violet-400'}`}
            />
          </div>

          <div>
            <p className={`text-xl font-semibold mb-2 transition-colors duration-200 ${isDragging ? 'text-violet-300' : 'text-zinc-300 group-hover:text-zinc-100'}`}>
              {isDragging ? 'Drop to convert' : 'Drag & drop your file here'}
            </p>
            <p className="text-sm text-zinc-500">
              or <span className="text-violet-400 font-medium">click to browse</span>
            </p>
          </div>

          {/* Format info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
              <Icon name="DocumentIcon" size={14} variant="outline" className="text-zinc-500" />
              <span className="text-xs font-mono text-zinc-400">Accepts: {tool.accepts}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
              <Icon name="ArrowUpIcon" size={14} variant="outline" className="text-zinc-500" />
              <span className="text-xs font-mono text-zinc-400">Max: {tool.maxSizeMb}MB</span>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { step: '01', icon: 'CloudArrowUpIcon', label: 'Upload your file', desc: `Select a ${tool.from} file from your device` },
          { step: '02', icon: 'CpuChipIcon', label: 'We convert it', desc: `Processed securely in under 10 seconds` },
          { step: '03', icon: 'ArrowDownTrayIcon', label: 'Download result', desc: `Your ${tool.to} file downloads instantly` },
        ].map((step) => (
          <div key={`step-${step.step}`} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-600/15 flex items-center justify-center">
              <span className="text-xs font-bold font-mono text-violet-400">{step.step}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-300 mb-0.5">{step.label}</p>
              <p className="text-xs text-zinc-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}