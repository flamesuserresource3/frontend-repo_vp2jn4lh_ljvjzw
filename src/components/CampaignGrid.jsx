import React from 'react';
import { Heart, Timer, Target } from 'lucide-react';

const currency = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

const Progress = ({ current, target }) => {
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-2 bg-emerald-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{pct}% tercapai</span>
        <span>{currency(current)} / {currency(target)}</span>
      </div>
    </div>
  );
};

const CampaignCard = ({ item, onDonate, onView }) => {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-2 mt-1">{item.description}</p>
        <div className="mt-3">
          <Progress current={item.raised} target={item.goal} />
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1"><Target size={14}/> Target</div>
          <div className="flex items-center gap-1"><Timer size={14}/> {item.daysLeft} hari lagi</div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onView?.(item)}
            className="text-sm text-emerald-700 hover:underline"
          >Detail</button>
          <button
            onClick={() => onDonate(item)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Heart size={16}/> Donasi
          </button>
        </div>
      </div>
    </div>
  );
};

const CampaignGrid = ({ campaigns, onDonate, onView }) => {
  return (
    <section id="campaigns" className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Kampanye Pilihan</h2>
          <p className="text-slate-600 text-sm">Pilih kampanye yang paling menyentuh hati Anda</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <CampaignCard key={c.id} item={c} onDonate={onDonate} onView={onView} />
        ))}
      </div>
    </section>
  );
};

export default CampaignGrid;
