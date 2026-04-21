'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import AIToolCard from './AIToolCard';
import AIUploadPanel from './AIUploadPanel';
import BeforeAfterSlider from './BeforeAfterSlider';

export type AITool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accepts: string;
  acceptsLabel: string;
  maxSizeMb: number;
  inputType: 'image' | 'video';
  color: string;
  iconColor: string;
  borderColor: string;
  gradientFrom: string;
  badge: string;
  capabilities: string[];
  processingSteps: string[];
};

export const aiTools: AITool[] = [
  {
    id: 'logo-removal',
    name: 'Logo Removal',
    tagline: 'Remove brand logos from images with AI',
    description: 'Our computer vision model detects and removes brand logos, watermarks, and overlay graphics from photos. Works on product photos, screenshots, and stock images.',
    icon: 'NoSymbolIcon',
    accepts: '.jpg,.jpeg,.png,.webp',
    acceptsLabel: 'JPG, PNG, WEBP',
    maxSizeMb: 20,
    inputType: 'image',
    color: 'from-violet-600/15 to-violet-800/5',
    iconColor: 'text-violet-400',
    borderColor: 'border-violet-500/20',
    gradientFrom: 'from-violet-500',
    badge: 'AI Vision',
    capabilities: [
      'Detects logos automatically',
      'Inpaints background seamlessly',
      'Works on complex backgrounds',
      'Preserves original image quality',
    ],
    processingSteps: ['Detecting logo regions', 'Segmenting logo mask', 'Inpainting background', 'Enhancing output'],
  },
  {
    id: 'image-watermark',
    name: 'Image Watermark Removal',
    tagline: 'Strip text and image watermarks from photos',
    description: 'Remove semi-transparent text watermarks, stock photo overlays, and copyright marks from images. Our AI reconstructs the underlying content as if the watermark was never there.',
    icon: 'EyeSlashIcon',
    accepts: '.jpg,.jpeg,.png,.webp,.bmp',
    acceptsLabel: 'JPG, PNG, WEBP, BMP',
    maxSizeMb: 25,
    inputType: 'image',
    color: 'from-purple-600/15 to-purple-800/5',
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    gradientFrom: 'from-purple-500',
    badge: 'AI Inpaint',
    capabilities: [
      'Removes text watermarks',
      'Handles semi-transparent overlays',
      'Reconstructs hidden content',
      'Batch processing ready',
    ],
    processingSteps: ['Scanning for watermark patterns', 'Building transparency mask', 'Reconstructing content', 'Final cleanup pass'],
  },
  {
    id: 'video-watermark',
    name: 'Video Watermark Removal',
    tagline: 'Remove watermarks from video files frame-by-frame',
    description: 'Process MP4, MOV, and AVI files to remove static or animated watermarks. Our frame-by-frame AI analysis ensures clean, consistent output throughout the entire video.',
    icon: 'VideoCameraSlashIcon',
    accepts: '.mp4,.mov,.avi,.webm',
    acceptsLabel: 'MP4, MOV, AVI, WEBM',
    maxSizeMb: 500,
    inputType: 'video',
    color: 'from-fuchsia-600/15 to-fuchsia-800/5',
    iconColor: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/20',
    gradientFrom: 'from-fuchsia-500',
    badge: 'AI Video',
    capabilities: [
      'Frame-by-frame processing',
      'Static and animated watermarks',
      'Preserves audio track',
      'Output in original format',
    ],
    processingSteps: ['Analyzing video frames', 'Identifying watermark region', 'Processing frame batch', 'Encoding clean output'],
  },
];

export type AIJobStatus = 'idle' | 'uploading' | 'processing' | 'ready' | 'error';

export interface AIJob {
  toolId: string;
  status: AIJobStatus;
  fileName: string;
  fileSize: number;
  uploadProgress: number;
  processProgress: number;
  currentStep: string;
  resultFileName: string;
  resultSize: number;
  errorMessage?: string;
}

export default function AIToolsWorkspace() {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [job, setJob] = useState<AIJob | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const selectedTool = aiTools.find((t) => t.id === selectedToolId);

  const handleSelectTool = (toolId: string) => {
    setSelectedToolId(toolId);
    setJob(null);
    setShowComparison(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedToolId(null);
    setJob(null);
    setShowComparison(false);
  };

  const handleFileAccepted = (file: File, tool: AITool) => {
    if (file.size > tool.maxSizeMb * 1024 * 1024) {
      toast.error(`File too large. Max size for ${tool.name} is ${tool.maxSizeMb}MB.`);
      return;
    }

    // BACKEND INTEGRATION: Replace simulation with POST /api/ai/process
    // with multipart file + toolId, stream progress via SSE

    const newJob: AIJob = {
      toolId: tool.id,
      status: 'uploading',
      fileName: file.name,
      fileSize: file.size,
      uploadProgress: 0,
      processProgress: 0,
      currentStep: 'Uploading file...',
      resultFileName: '',
      resultSize: 0,
    };
    setJob(newJob);

    let uploadPct = 0;
    const uploadInterval = setInterval(() => {
      uploadPct += Math.floor(Math.random() * 20) + 10;
      if (uploadPct >= 100) {
        uploadPct = 100;
        clearInterval(uploadInterval);
        setJob((prev) => prev ? { ...prev, uploadProgress: 100, status: 'processing', currentStep: tool.processingSteps[0] } : null);

        let stepIdx = 0;
        let processPct = 0;
        const processInterval = setInterval(() => {
          processPct += Math.floor(Math.random() * 8) + 4;
          const currentStepIdx = Math.min(Math.floor((processPct / 100) * tool.processingSteps.length), tool.processingSteps.length - 1);
          if (stepIdx !== currentStepIdx) {
            stepIdx = currentStepIdx;
          }

          if (processPct >= 100) {
            processPct = 100;
            clearInterval(processInterval);
            const ext = file.name.split('.').pop() ?? 'jpg';
            const baseName = file.name.replace(/\.[^.]+$/, '');
            const resultName = `${baseName}_cleaned.${ext}`;
            setJob((prev) => prev ? {
              ...prev,
              processProgress: 100,
              status: 'ready',
              currentStep: 'Done!',
              resultFileName: resultName,
              resultSize: Math.floor(file.size * 0.92),
            } : null);
            setShowComparison(tool.inputType === 'image');
            toast.success(`${tool.name} complete! Your cleaned file is ready.`);
          } else {
            setJob((prev) => prev ? {
              ...prev,
              processProgress: processPct,
              currentStep: tool.processingSteps[stepIdx],
            } : null);
          }
        }, 200);
      } else {
        setJob((prev) => prev ? { ...prev, uploadProgress: uploadPct } : null);
      }
    }, 130);
  };

  const handleDownload = () => {
    if (!job) return;
    // BACKEND INTEGRATION: Replace with actual download URL from API response
    toast.success(`Downloading ${job.resultFileName}...`);
    const link = document.createElement('a');
    link.href = '#';
    link.download = job.resultFileName;
    link.click();
  };

  const handleReset = () => {
    setJob(null);
    setShowComparison(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-10 min-h-[calc(100vh-64px)]">
      {/* Page header */}
      <div className="mb-10">
        {selectedTool ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-200 transition-colors mb-5 group"
          >
            <Icon name="ArrowLeftIcon" size={16} variant="outline" className="group-hover:-translate-x-0.5 transition-transform" />
            Back to AI Tools
          </button>
        ) : null}

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
            <Icon name="SparklesIcon" size={22} variant="solid" className="text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold gradient-text-white">
                {selectedTool ? selectedTool.name : 'AI-Powered Tools'}
              </h1>
              <span className="px-2.5 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-violet-400 text-xs font-semibold">
                {selectedTool ? selectedTool.badge : '3 Tools'}
              </span>
            </div>
            <p className="text-zinc-500 text-base">
              {selectedTool ? selectedTool.tagline : 'Remove watermarks, logos, and unwanted overlays using computer vision AI.'}
            </p>
          </div>
        </div>
      </div>

      {/* Tool selection or workspace */}
      {!selectedTool ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          {aiTools.map((tool) => (
            <AIToolCard key={`ai-tool-${tool.id}`} tool={tool} onSelect={handleSelectTool} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {/* Tool info panel */}
          <div className="xl:col-span-2 2xl:col-span-2 flex flex-col gap-5">
            <div className={`p-6 rounded-2xl bg-gradient-to-br ${selectedTool.color} border ${selectedTool.borderColor}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900/60 flex items-center justify-center">
                  <Icon name={selectedTool.icon as 'BoltIcon'} size={20} variant="outline" className={selectedTool.iconColor} />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-100">{selectedTool.name}</h3>
                  <span className="text-xs text-zinc-500">{selectedTool.acceptsLabel}</span>
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-5">{selectedTool.description}</p>
              <ul className="space-y-2">
                {selectedTool.capabilities.map((cap) => (
                  <li key={`cap-${selectedTool.id}-${cap}`} className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon name="CheckCircleIcon" size={14} variant="solid" className={selectedTool.iconColor} />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Processing steps info */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">How the AI works</h4>
              <ol className="space-y-3">
                {selectedTool.processingSteps.map((step, idx) => (
                  <li key={`step-${selectedTool.id}-${idx}`} className="flex items-center gap-3 text-sm text-zinc-500">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-600 flex-shrink-0">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Privacy */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <Icon name="ShieldCheckIcon" size={16} variant="outline" className="text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-zinc-500 leading-relaxed">
                Your file is processed on our secure servers and automatically deleted within 1 hour. We never store or share your content.
              </p>
            </div>
          </div>

          {/* Upload + Result panel */}
          <div className="xl:col-span-3 2xl:col-span-3 flex flex-col gap-6">
            <AIUploadPanel
              tool={selectedTool}
              job={job}
              onFileAccepted={(file) => handleFileAccepted(file, selectedTool)}
              onDownload={handleDownload}
              onReset={handleReset}
            />

            {/* Before/After comparison */}
            {showComparison && job?.status === 'ready' && (
              <BeforeAfterSlider toolName={selectedTool.name} />
            )}
          </div>
        </div>
      )}

      {/* Bottom CTA when no tool selected */}
      {!selectedTool && (
        <div className="mt-16 text-center">
          <p className="text-zinc-600 text-sm">
            All AI tools are free · No account needed · Files deleted after 1 hour
          </p>
        </div>
      )}
    </div>
  );
}