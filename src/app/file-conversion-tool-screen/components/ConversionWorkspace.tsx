'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import ToolSidebar from './ToolSidebar';
import UploadZone from './UploadZone';
import ProcessingProgress from './ProcessingProgress';
import DownloadResult from './DownloadResult';
import RelatedTools from './RelatedTools';

export type ConversionTool = {
  id: string;
  name: string;
  from: string;
  to: string;
  fromLabel: string;
  toLabel: string;
  accepts: string;
  description: string;
  icon: string;
  iconColor: string;
  maxSizeMb: number;
};

export const conversionTools: ConversionTool[] = [
  { id: 'pdf-to-word', name: 'PDF to Word', from: 'PDF', to: 'DOCX', fromLabel: '.pdf', toLabel: '.docx', accepts: '.pdf', description: 'Convert PDF documents to editable Word files, preserving formatting and layout.', icon: 'DocumentTextIcon', iconColor: 'text-blue-400', maxSizeMb: 50 },
  { id: 'word-to-pdf', name: 'Word to PDF', from: 'DOCX', to: 'PDF', fromLabel: '.docx', toLabel: '.pdf', accepts: '.doc,.docx', description: 'Transform Word documents into professional, universally compatible PDF files.', icon: 'DocumentArrowDownIcon', iconColor: 'text-violet-400', maxSizeMb: 50 },
  { id: 'image-to-pdf', name: 'Image to PDF', from: 'JPG/PNG', to: 'PDF', fromLabel: '.jpg, .png', toLabel: '.pdf', accepts: '.jpg,.jpeg,.png,.webp,.bmp', description: 'Combine one or more images into a single, clean PDF document.', icon: 'PhotoIcon', iconColor: 'text-pink-400', maxSizeMb: 30 },
  { id: 'pdf-ocr', name: 'PDF OCR', from: 'PDF', to: 'TEXT', fromLabel: '.pdf', toLabel: '.txt / searchable pdf', accepts: '.pdf', description: 'Use AI OCR to extract copyable, searchable text from scanned PDF documents.', icon: 'MagnifyingGlassIcon', iconColor: 'text-amber-400', maxSizeMb: 25 },
  { id: 'zip-to-pdf', name: 'ZIP to PDF', from: 'ZIP', to: 'PDF', fromLabel: '.zip', toLabel: '.pdf', accepts: '.zip', description: 'Unpack a ZIP archive and merge its document contents into one PDF.', icon: 'ArchiveBoxIcon', iconColor: 'text-orange-400', maxSizeMb: 100 },
  { id: 'pdf-to-zip', name: 'PDF to ZIP', from: 'PDF', to: 'ZIP', fromLabel: '.pdf', toLabel: '.zip', accepts: '.pdf', description: 'Split a PDF into individual pages and package them in a downloadable ZIP.', icon: 'FolderArrowDownIcon', iconColor: 'text-teal-400', maxSizeMb: 50 },
  { id: 'pdf-to-ppt', name: 'PDF to PPT', from: 'PDF', to: 'PPTX', fromLabel: '.pdf', toLabel: '.pptx', accepts: '.pdf', description: 'Convert PDF slides into an editable PowerPoint presentation file.', icon: 'PresentationChartBarIcon', iconColor: 'text-red-400', maxSizeMb: 50 },
  { id: 'pdf-to-images', name: 'PDF to Images', from: 'PDF', to: 'JPG/PNG', fromLabel: '.pdf', toLabel: '.jpg / .png', accepts: '.pdf', description: 'Export each page of a PDF as a high-resolution image file.', icon: 'RectangleStackIcon', iconColor: 'text-cyan-400', maxSizeMb: 50 },
  { id: 'pdf-share-link', name: 'PDF Share Link', from: 'PDF', to: 'LINK', fromLabel: '.pdf', toLabel: 'shareable link', accepts: '.pdf', description: 'Upload a PDF and instantly generate a shareable link or image preview.', icon: 'LinkIcon', iconColor: 'text-indigo-400', maxSizeMb: 30 },
];

export type JobStatus = 'idle' | 'uploading' | 'processing' | 'ready' | 'error';

export interface ConversionJob {
  status: JobStatus;
  fileName: string;
  fileSize: number;
  uploadProgress: number;
  processProgress: number;
  resultFileName: string;
  resultSize: number;
  shareLink?: string;
  errorMessage?: string;
}

export default function ConversionWorkspace() {
  const searchParams = useSearchParams();
  const toolParam = searchParams.get('tool') ?? 'pdf-to-word';

  const [activeTool, setActiveTool] = useState<string>(toolParam);
  const [job, setJob] = useState<ConversionJob>({
    status: 'idle',
    fileName: '',
    fileSize: 0,
    uploadProgress: 0,
    processProgress: 0,
    resultFileName: '',
    resultSize: 0,
  });

  const currentTool = conversionTools.find((t) => t.id === activeTool) ?? conversionTools[0];

  const handleToolChange = useCallback((toolId: string) => {
    setActiveTool(toolId);
    setJob({ status: 'idle', fileName: '', fileSize: 0, uploadProgress: 0, processProgress: 0, resultFileName: '', resultSize: 0 });
  }, []);

  const simulateConversion = useCallback((file: File) => {
    // BACKEND INTEGRATION: Replace this simulation with actual API call to /api/convert
    // POST multipart/form-data with file + tool ID, stream progress via SSE or polling
    setJob({
      status: 'uploading',
      fileName: file.name,
      fileSize: file.size,
      uploadProgress: 0,
      processProgress: 0,
      resultFileName: '',
      resultSize: 0,
    });

    // Simulate upload progress
    let uploadPct = 0;
    const uploadInterval = setInterval(() => {
      uploadPct += Math.floor(Math.random() * 18) + 8;
      if (uploadPct >= 100) {
        uploadPct = 100;
        clearInterval(uploadInterval);
        setJob((prev) => ({ ...prev, uploadProgress: 100, status: 'processing' }));

        // Simulate processing progress
        let processPct = 0;
        const processInterval = setInterval(() => {
          processPct += Math.floor(Math.random() * 12) + 6;
          if (processPct >= 100) {
            processPct = 100;
            clearInterval(processInterval);

            const ext = currentTool.toLabel.split('/')[0].trim().replace('.', '');
            const baseName = file.name.replace(/\.[^.]+$/, '');
            const resultName = `${baseName}_converted.${ext === 'TEXT' ? 'txt' : ext}`;

            setJob((prev) => ({
              ...prev,
              processProgress: 100,
              status: 'ready',
              resultFileName: resultName,
              resultSize: Math.floor(file.size * 0.85),
              shareLink: currentTool.id === 'pdf-share-link' ? `https://convertai.io/share/f8k2x9q` : undefined,
            }));
            toast.success('Conversion complete! Your file is ready to download.');
          } else {
            setJob((prev) => ({ ...prev, processProgress: processPct }));
          }
        }, 180);
      } else {
        setJob((prev) => ({ ...prev, uploadProgress: uploadPct }));
      }
    }, 120);
  }, [currentTool]);

  const handleFileAccepted = useCallback((file: File) => {
    if (file.size > currentTool.maxSizeMb * 1024 * 1024) {
      toast.error(`File too large. Maximum size for ${currentTool.name} is ${currentTool.maxSizeMb}MB.`);
      return;
    }
    simulateConversion(file);
  }, [currentTool, simulateConversion]);

  const handleReset = useCallback(() => {
    setJob({ status: 'idle', fileName: '', fileSize: 0, uploadProgress: 0, processProgress: 0, resultFileName: '', resultSize: 0 });
  }, []);

  const handleDownload = useCallback(() => {
    // BACKEND INTEGRATION: Replace with actual download URL from API response
    toast.success(`Downloading ${job.resultFileName}...`);
    
    // Fix: Using .txt extension for simulation to prevent "Corrupted Word File" errors.
    const baseName = job.resultFileName.split('.')[0];
    const downName = `${baseName}.txt`;
    
    const content = `CONVERTAI - SIMULATED CONVERSION REPORT\n` +
                    `======================================\n` +
                    `Tool Type: ${currentTool.name}\n` +
                    `Original File: ${job.fileName}\n` +
                    `Status: SUCCESS (Simulated)\n\n` +
                    `Notice: This is a frontend prototype. Real file conversion requires\n` +
                    `a backend processing server to generate valid ${currentTool.to} binaries.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = downName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, [job.resultFileName, job.fileName, currentTool]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
      {/* Sidebar */}
      <ToolSidebar
        tools={conversionTools}
        activeToolId={activeTool}
        onToolChange={handleToolChange}
      />

      {/* Main workspace */}
      <div className="flex-1 flex flex-col min-w-0 px-4 sm:px-6 lg:px-8 xl:px-10 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <span className={`${currentTool.iconColor} text-xl`}>
                {/* Icon rendered via CSS class trick since we need dynamic icon */}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-zinc-100">{currentTool.name}</h1>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded font-mono text-xs bg-zinc-800 text-zinc-400 border border-zinc-700">{currentTool.fromLabel}</span>
                  <span className="text-zinc-600 text-xs">→</span>
                  <span className="px-2 py-0.5 rounded font-mono text-xs bg-violet-600/15 text-violet-400 border border-violet-500/20">{currentTool.toLabel}</span>
                </div>
              </div>
              <p className="text-zinc-500 text-sm">{currentTool.description}</p>
              <p className="text-xs text-zinc-600 mt-1.5 font-mono">Max file size: {currentTool.maxSizeMb}MB · Accepts: {currentTool.accepts}</p>
            </div>
          </div>
        </div>

        {/* Workspace body */}
        <div className="flex-1">
          {job.status === 'idle' && (
            <UploadZone
              tool={currentTool}
              onFileAccepted={handleFileAccepted}
            />
          )}

          {(job.status === 'uploading' || job.status === 'processing') && (
            <ProcessingProgress job={job} tool={currentTool} />
          )}

          {job.status === 'ready' && (
            <DownloadResult
              job={job}
              tool={currentTool}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          )}

          {job.status === 'error' && (
            <div className="flex flex-col items-center justify-center min-h-[340px] gap-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-10">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-400 mb-2">Conversion failed</h3>
                <p className="text-zinc-500 text-sm">{job.errorMessage ?? 'An unexpected error occurred. Please try again with a different file.'}</p>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-all duration-200 active:scale-95"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Related tools */}
        <RelatedTools currentToolId={activeTool} tools={conversionTools} onToolChange={handleToolChange} />
      </div>
    </div>
  );
}