import React from 'react';
import { Heart, Shield, Sparkles } from 'lucide-react';

const Hero = ({ onDonate }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white" />
      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium mb-4">
              <Sparkles size={14} />
              Donasi yang transparan & berdampak
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Bantu Sesama dengan FundCare
            </h1>
            <p className="mt-4 text-slate-600 md:text-lg">
              Temukan kampanye kebaikan, berdonasi dengan aman, dan pantau dampaknya.
              Bersama, kita wujudkan perubahan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={onDonate}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
              >
                <Heart size={18} /> Donasi Sekarang
              </button>
              <a
                href="#campaigns"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Jelajahi Kampanye
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-600" />
                <span>Keamanan transaksi</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-emerald-600" />
                <span>Biaya platform 0% untuk donatur</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-cover bg-center shadow-inner shadow-emerald-100 border border-emerald-100"
                 style={{backgroundImage: "url('https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1470&auto=format&fit=crop')"}} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
