import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const pdfTools = [
  {
    id: 'tool-pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF documents to editable DOCX files instantly.',
    from: 'PDF',
    to: 'DOCX',
    icon: 'DocumentTextIcon',
    color: 'from-blue-600/20 to-blue-500/5',
    iconColor: 'text-blue-400',
    borderColor: 'hover:border-blue-500/30',
    href: '/file-conversion-tool-screen?tool=pdf-to-word',
    badge: 'Popular',
    badgeColor: 'bg-blue-500/15 text-blue-400',
  },
  {
    id: 'tool-word-to-pdf',
    name: 'Word to PDF',
    description: 'Transform DOCX documents into professional PDF files.',
    from: 'DOCX',
    to: 'PDF',
    icon: 'DocumentArrowDownIcon',
    color: 'from-violet-600/20 to-violet-500/5',
    iconColor: 'text-violet-400',
    borderColor: 'hover:border-violet-500/30',
    href: '/file-conversion-tool-screen?tool=word-to-pdf',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'tool-image-to-pdf',
    name: 'Image to PDF',
    description: 'Combine JPG, PNG, or WEBP images into a single PDF.',
    from: 'JPG/PNG',
    to: 'PDF',
    icon: 'PhotoIcon',
    color: 'from-pink-600/20 to-pink-500/5',
    iconColor: 'text-pink-400',
    borderColor: 'hover:border-pink-500/30',
    href: '/file-conversion-tool-screen?tool=image-to-pdf',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'tool-pdf-ocr',
    name: 'PDF OCR',
    description: 'Extract copyable, searchable text from scanned PDFs.',
    from: 'PDF',
    to: 'TEXT',
    icon: 'MagnifyingGlassIcon',
    color: 'from-amber-600/20 to-amber-500/5',
    iconColor: 'text-amber-400',
    borderColor: 'hover:border-amber-500/30',
    href: '/file-conversion-tool-screen?tool=pdf-ocr',
    badge: 'AI',
    badgeColor: 'bg-amber-500/15 text-amber-400',
  },
  {
    id: 'tool-zip-to-pdf',
    name: 'ZIP to PDF',
    description: 'Extract files from ZIP and merge contents into PDF.',
    from: 'ZIP',
    to: 'PDF',
    icon: 'ArchiveBoxIcon',
    color: 'from-orange-600/20 to-orange-500/5',
    iconColor: 'text-orange-400',
    borderColor: 'hover:border-orange-500/30',
    href: '/file-conversion-tool-screen?tool=zip-to-pdf',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'tool-pdf-to-zip',
    name: 'PDF to ZIP',
    description: 'Split PDF pages and package them as a ZIP archive.',
    from: 'PDF',
    to: 'ZIP',
    icon: 'FolderArrowDownIcon',
    color: 'from-teal-600/20 to-teal-500/5',
    iconColor: 'text-teal-400',
    borderColor: 'hover:border-teal-500/30',
    href: '/file-conversion-tool-screen?tool=pdf-to-zip',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'tool-pdf-to-ppt',
    name: 'PDF to PPT',
    description: 'Convert PDF slides into editable PowerPoint presentations.',
    from: 'PDF',
    to: 'PPTX',
    icon: 'PresentationChartBarIcon',
    color: 'from-red-600/20 to-red-500/5',
    iconColor: 'text-red-400',
    borderColor: 'hover:border-red-500/30',
    href: '/file-conversion-tool-screen?tool=pdf-to-ppt',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'tool-pdf-to-images',
    name: 'PDF to Images',
    description: 'Export every PDF page as a high-resolution JPG or PNG.',
    from: 'PDF',
    to: 'JPG/PNG',
    icon: 'RectangleStackIcon',
    color: 'from-cyan-600/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
    borderColor: 'hover:border-cyan-500/30',
    href: '/file-conversion-tool-screen?tool=pdf-to-images',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'tool-pdf-share-link',
    name: 'PDF Share Link',
    description: 'Upload a PDF and generate an instant shareable link.',
    from: 'PDF',
    to: 'LINK',
    icon: 'LinkIcon',
    color: 'from-indigo-600/20 to-indigo-500/5',
    iconColor: 'text-indigo-400',
    borderColor: 'hover:border-indigo-500/30',
    href: '/file-conversion-tool-screen?tool=pdf-share-link',
    badge: 'New',
    badgeColor: 'bg-indigo-500/15 text-indigo-400',
  },
];

const aiTools = [
  {
    id: 'tool-ai-logo-removal',
    name: 'Logo Removal',
    description: 'AI removes brand logos from images cleanly.',
    icon: 'NoSymbolIcon',
    color: 'from-violet-600/20 to-purple-500/5',
    iconColor: 'text-violet-400',
    borderColor: 'hover:border-violet-500/30',
    href: '/ai-tools-screen?tool=logo-removal',
    badge: 'AI',
    badgeColor: 'bg-violet-500/15 text-violet-400',
  },
  {
    id: 'tool-ai-image-watermark',
    name: 'Image Watermark Removal',
    description: 'Remove text or image watermarks from photos with AI.',
    icon: 'EyeSlashIcon',
    color: 'from-purple-600/20 to-fuchsia-500/5',
    iconColor: 'text-purple-400',
    borderColor: 'hover:border-purple-500/30',
    href: '/ai-tools-screen?tool=image-watermark',
    badge: 'AI',
    badgeColor: 'bg-purple-500/15 text-purple-400',
  },
  {
    id: 'tool-ai-video-watermark',
    name: 'Video Watermark Removal',
    description: 'Strip watermarks from MP4, MOV, and AVI video files.',
    icon: 'VideoCameraSlashIcon',
    color: 'from-fuchsia-600/20 to-pink-500/5',
    iconColor: 'text-fuchsia-400',
    borderColor: 'hover:border-fuchsia-500/30',
    href: '/ai-tools-screen?tool=video-watermark',
    badge: 'AI',
    badgeColor: 'bg-fuchsia-500/15 text-fuchsia-400',
  },
];

function ToolCard({ tool }: { tool: typeof pdfTools[0] }) {
  return (
    <Link
      href={tool.href}
      className={`group relative flex flex-col gap-4 p-5 rounded-2xl bg-gradient-to-br ${tool.color} border border-zinc-800/80 ${tool.borderColor} shadow-card hover:shadow-card-hover transition-all duration-250 hover:-translate-y-0.5`}
    >
      {tool.badge && (
        <span className={`absolute top-3.5 right-3.5 px-2 py-0.5 rounded-md text-xs font-semibold ${tool.badgeColor}`}>
          {tool.badge}
        </span>
      )}
      <div className={`w-10 h-10 rounded-xl bg-zinc-900/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
        <Icon name={tool.icon as 'BoltIcon'} size={20} variant="outline" className={tool.iconColor} />
      </div>
      <div>
        <h3 className="font-semibold text-zinc-100 text-base mb-1 group-hover:text-white transition-colors">{tool.name}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">{tool.description}</p>
      </div>
      {tool.from && tool.to && (
        <div className="flex items-center gap-1.5 mt-auto">
          <span className="px-2 py-0.5 rounded font-mono text-xs bg-zinc-800 text-zinc-400">{tool.from}</span>
          <Icon name="ArrowRightIcon" size={12} variant="outline" className="text-zinc-600" />
          <span className="px-2 py-0.5 rounded font-mono text-xs bg-zinc-800 text-zinc-400">{tool.to}</span>
        </div>
      )}
    </Link>
  );
}

export default function ToolsGrid() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 mb-24">
      {/* PDF Tools */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-violet-600/15 flex items-center justify-center">
            <Icon name="DocumentIcon" size={16} variant="outline" className="text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">File Conversion Tools</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-500 text-xs font-medium">{pdfTools.length} tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {pdfTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          {/* Spacer to avoid orphan — last item spans 2 on lg when count is 9 */}
        </div>
      </div>

      {/* AI Tools */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-violet-600/15 flex items-center justify-center">
            <Icon name="SparklesIcon" size={16} variant="solid" className="text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">AI-Powered Tools</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-violet-600/15 text-violet-400 text-xs font-medium border border-violet-500/20">{aiTools.length} tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
          {aiTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool as typeof pdfTools[0]} />
          ))}
        </div>
      </div>
    </section>
  );
}