import React, { useState } from 'react';
import { Heart, Menu, X, Shield, User } from 'lucide-react';

const Header = ({ onDonatePrimary, onNavigateCampaigns }) => {
  const [open, setOpen] = useState(false);

  const navLink = (label, onClick) => (
    <button
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className="text-slate-600 hover:text-emerald-600 transition-colors"
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
            <Heart size={20} />
          </div>
          <span className="font-semibold text-slate-800 tracking-tight">FundCare</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLink('Explore Campaigns', onNavigateCampaigns)}
          {navLink('How it Works', () => window.alert('FundCare mempermudah donasi: pilih kampanye, masukkan nominal, bayar, selesai.'))}
          {navLink('Admin', () => window.alert('Halaman admin akan tersedia setelah login admin.'))}
          <button
            onClick={onDonatePrimary}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            <Heart size={16} /> Donate
          </button>
        </nav>

        <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {navLink('Explore Campaigns', onNavigateCampaigns)}
            {navLink('How it Works', () => window.alert('FundCare mempermudah donasi: pilih kampanye, masukkan nominal, bayar, selesai.'))}
            {navLink('Admin', () => window.alert('Halaman admin akan tersedia setelah login admin.'))}
            <button
              onClick={() => {
                onDonatePrimary?.();
                setOpen(false);
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Heart size={16} /> Donate
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <Shield size={14} />
              <span>Keamanan transaksi terenkripsi</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <User size={14} />
              <span>Dukungan multi-peran: Donatur & Admin</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
