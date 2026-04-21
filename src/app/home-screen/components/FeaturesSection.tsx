import React from 'react';
import Icon from '@/components/ui/AppIcon';

const features = [
  {
    id: 'feat-free',
    icon: 'GiftIcon',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    title: 'Always Free',
    description: 'Every tool on ConvertAI is completely free. No hidden costs, no premium tier, no paywalls. Convert as many files as you need.',
  },
  {
    id: 'feat-speed',
    icon: 'BoltIcon',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    title: 'Lightning Fast',
    description: 'Our processing pipeline converts files in under 8 seconds on average. No waiting, no queues — your file is ready almost instantly.',
  },
  {
    id: 'feat-privacy',
    icon: 'ShieldCheckIcon',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    title: 'Privacy First',
    description: 'Files are processed in memory and automatically deleted from our servers within 1 hour. We never read or store your content.',
  },
  {
    id: 'feat-nologin',
    icon: 'LockOpenIcon',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    title: 'No Account Needed',
    description: 'Jump straight in — no signup, no email, no account required. Pick a tool, upload your file, and download your result.',
  },
  {
    id: 'feat-quality',
    icon: 'StarIcon',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-500/10',
    title: 'High Quality Output',
    description: 'We preserve formatting, fonts, and layout fidelity during conversion. What you upload is what you get — just in a different format.',
  },
  {
    id: 'feat-ai',
    icon: 'SparklesIcon',
    iconColor: 'text-fuchsia-400',
    iconBg: 'bg-fuchsia-500/10',
    title: 'AI-Enhanced Processing',
    description: 'Our AI tools use computer vision to cleanly remove watermarks and logos — delivering results that look like the mark was never there.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 mb-24">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
          Why ConvertAI
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white mb-4">
          Built for speed. Designed for privacy.
        </h2>
        <p className="text-zinc-500 text-lg max-w-xl mx-auto">
          No bloat, no accounts, no friction. Just upload your file and get your result.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
        {features.map((feat) => (
          <div
            key={feat.id}
            className="group flex flex-col gap-4 p-6 rounded-2xl bg-[#111113] border border-zinc-800/80 hover:border-zinc-700 shadow-card hover:shadow-card-hover transition-all duration-250"
          >
            <div className={`w-11 h-11 rounded-xl ${feat.iconBg} flex items-center justify-center`}>
              <Icon name={feat.icon as 'BoltIcon'} size={22} variant="outline" className={feat.iconColor} />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-100 text-base mb-2">{feat.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}