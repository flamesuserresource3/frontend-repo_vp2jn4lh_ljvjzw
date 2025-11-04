import React, { useState } from 'react';
import { Heart, Menu, X, LogOut } from 'lucide-react';

const Header = ({ user, role, tabs, activeTab, onTabChange, onDonatePrimary, onLogout }) => {
  const [open, setOpen] = useState(false);

  const NavTabs = () => (
    <div className="flex items-center gap-6">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => { onTabChange?.(t.key); setOpen(false); }}
          className={`text-sm font-medium transition-colors ${activeTab === t.key ? 'text-emerald-700' : 'text-slate-600 hover:text-emerald-600'}`}
        >
          {t.label}
        </button>
      ))}
      {role === 'donatur' && (
        <button
          onClick={() => { onDonatePrimary?.(); setOpen(false); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Heart size={16} /> Donasi
        </button>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700"><Heart size={18} /></div>
          <span className="font-semibold text-slate-800 tracking-tight">FundCare</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavTabs />
          {user && (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 ml-2">
              <span className="text-sm text-slate-600">{role === 'admin' ? 'Admin' : 'Donatur'}</span>
              <button onClick={onLogout} className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600">
                <LogOut size={16} /> Keluar
              </button>
            </div>
          )}
        </nav>

        <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            <NavTabs />
            {user && (
              <button onClick={() => { onLogout?.(); setOpen(false); }} className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600">
                <LogOut size={16} /> Keluar
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
