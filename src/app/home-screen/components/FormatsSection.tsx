import React from 'react';
import Icon from '@/components/ui/AppIcon';

const formatGroups = [
  {
    id: 'fmtgrp-documents',
    label: 'Documents',
    icon: 'DocumentTextIcon',
    formats: ['PDF', 'DOCX', 'DOC', 'PPTX', 'PPT', 'TXT'],
    color: 'text-blue-400',
    bg: 'bg-blue-500/8',
  },
  {
    id: 'fmtgrp-images',
    label: 'Images',
    icon: 'PhotoIcon',
    formats: ['JPG', 'PNG', 'WEBP', 'GIF', 'BMP', 'TIFF'],
    color: 'text-pink-400',
    bg: 'bg-pink-500/8',
  },
  {
    id: 'fmtgrp-archives',
    label: 'Archives',
    icon: 'ArchiveBoxIcon',
    formats: ['ZIP', 'RAR', 'TAR', '7Z'],
    color: 'text-orange-400',
    bg: 'bg-orange-500/8',
  },
  {
    id: 'fmtgrp-video',
    label: 'Video',
    icon: 'VideoCameraIcon',
    formats: ['MP4', 'MOV', 'AVI', 'MKV', 'WEBM'],
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/8',
  },
];

export default function FormatsSection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 mb-24">
      <div className="rounded-3xl bg-gradient-to-br from-zinc-900/80 to-[#111113] border border-zinc-800/60 p-8 sm:p-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-3">Supported Formats</h2>
          <p className="text-zinc-500">All the file types you work with, covered.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {formatGroups.map((group) => (
            <div key={group.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-7 h-7 rounded-lg ${group.bg} flex items-center justify-center`}>
                  <Icon name={group.icon as 'PhotoIcon'} size={14} variant="outline" className={group.color} />
                </div>
                <span className={`text-sm font-semibold ${group.color}`}>{group.label}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.formats.map((fmt) => (
                  <span
                    key={`fmt-${group.id}-${fmt}`}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800/60 border border-zinc-700/40 text-xs font-mono text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 transition-colors duration-150"
                  >
                    .{fmt.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}