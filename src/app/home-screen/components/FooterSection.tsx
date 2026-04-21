import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const toolLinks = [
  { label: 'PDF to Word', href: '/file-conversion-tool-screen?tool=pdf-to-word' },
  { label: 'Word to PDF', href: '/file-conversion-tool-screen?tool=word-to-pdf' },
  { label: 'Image to PDF', href: '/file-conversion-tool-screen?tool=image-to-pdf' },
  { label: 'PDF OCR', href: '/file-conversion-tool-screen?tool=pdf-ocr' },
  { label: 'ZIP to PDF', href: '/file-conversion-tool-screen?tool=zip-to-pdf' },
  { label: 'PDF to Images', href: '/file-conversion-tool-screen?tool=pdf-to-images' },
];

const aiLinks = [
  { label: 'Logo Removal', href: '/ai-tools-screen?tool=logo-removal' },
  { label: 'Image Watermark Removal', href: '/ai-tools-screen?tool=image-watermark' },
  { label: 'Video Watermark Removal', href: '/ai-tools-screen?tool=video-watermark' },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-zinc-800/60 bg-[#09090b]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={30} />
              <span className="font-bold text-xl gradient-text">ConvertAI</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-5 max-w-xs">
              Free file conversion and AI-powered tools. No account needed. Files auto-deleted after 1 hour.
            </p>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">All systems operational</span>
            </div>
          </div>

          {/* File Tools */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">File Tools</h4>
            <ul className="space-y-2.5">
              {toolLinks.map((link) => (
                <li key={`footer-tool-${link.label}`}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">AI Tools</h4>
            <ul className="space-y-2.5">
              {aiLinks.map((link) => (
                <li key={`footer-ai-${link.label}`}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-150 flex items-center gap-1.5">
                    <Icon name="SparklesIcon" size={12} variant="outline" className="text-violet-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Privacy & Trust</h4>
            <ul className="space-y-3">
              {[
                { icon: 'ShieldCheckIcon', text: 'Files deleted after 1 hour' },
                { icon: 'LockClosedIcon', text: 'SSL encrypted transfers' },
                { icon: 'EyeSlashIcon', text: 'We never read your files' },
                { icon: 'ServerIcon', text: 'EU-based processing' },
              ].map((item) => (
                <li key={`footer-trust-${item.text}`} className="flex items-center gap-2 text-sm text-zinc-500">
                  <Icon name={item.icon as 'ShieldCheckIcon'} size={14} variant="outline" className="text-violet-500 flex-shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/60 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2026 ConvertAI. Free to use, forever.
          </p>
          <p className="text-xs text-zinc-600">
            Built with speed, security, and simplicity in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}