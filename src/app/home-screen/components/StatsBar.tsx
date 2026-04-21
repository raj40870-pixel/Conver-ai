const stats = [
  { value: '4.2M+', label: 'Files Converted', icon: 'DocumentDuplicateIcon', color: 'text-violet-400' },
  { value: '12', label: 'Free Tools', icon: 'WrenchScrewdriverIcon', color: 'text-violet-300' },
  { value: '< 8s', label: 'Avg. Processing Time', icon: 'BoltIcon', color: 'text-amber-400' },
  { value: '100%', label: 'Free Forever', icon: 'GiftIcon', color: 'text-emerald-400' },
];

import Icon from '@/components/ui/AppIcon';

export default function StatsBar() {
  return (
    <section className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 -mt-6 mb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={`stat-${stat.label}`}
            className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-[#111113] border border-zinc-800/80 shadow-card hover:border-zinc-700 transition-all duration-200 group"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center group-hover:bg-violet-600/15 transition-colors duration-200">
              <Icon name={stat.icon as 'BoltIcon'} size={20} variant="outline" className={stat.color} />
            </div>
            <div>
              <div className={`text-2xl font-bold tabular-nums ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-zinc-500 font-medium mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}