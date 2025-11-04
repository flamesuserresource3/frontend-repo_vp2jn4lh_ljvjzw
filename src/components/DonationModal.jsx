import React, { useEffect, useState } from 'react';
import { X, Shield, CreditCard, Wallet, Landmark } from 'lucide-react';

const currency = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

const DonationModal = ({ open, onClose, campaign, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('ewallet');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setAmount('');
      setMethod('ewallet');
      setName('');
      setError('');
    }
  }, [open]);

  if (!open) return null;

  const min = 1000; // Validasi minimum donasi

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = Number(String(amount).replace(/[^0-9]/g, ''));
    if (!name.trim()) {
      setError('Nama wajib diisi.');
      return;
    }
    if (!val || val < min) {
      setError(`Minimum donasi ${currency(min)}.`);
      return;
    }
    setError('');
    onSubmit({ amount: val, method, name });
  };

  const formatInput = (v) => {
    const num = Number(String(v).replace(/[^0-9]/g, '')) || 0;
    return new Intl.NumberFormat('id-ID').format(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <button className="absolute right-3 top-3 p-2 text-slate-500 hover:text-slate-700" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <h3 className="text-lg font-semibold text-slate-900">Donasi untuk {campaign?.title}</h3>
        <p className="text-sm text-slate-600">Target {currency(campaign?.goal || 0)} • Terkumpul {currency(campaign?.raised || 0)}</p>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Nama Anda"
              required
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Nominal Donasi</label>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-2.5 text-slate-400">Rp</span>
              <input
                value={amount}
                onChange={(e) => setAmount(formatInput(e.target.value))}
                inputMode="numeric"
                className="pl-8 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="1.000"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Minimum {currency(min)}. Nominal akan dibulatkan ke rupiah terdekat.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Metode Pembayaran</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <button type="button" onClick={() => setMethod('ewallet')} className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${method==='ewallet' ? 'border-emerald-600 text-emerald-700 bg-emerald-50' : 'border-slate-300 text-slate-700'}`}>
                <Wallet size={16}/> E-Wallet
              </button>
              <button type="button" onClick={() => setMethod('bank')} className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${method==='bank' ? 'border-emerald-600 text-emerald-700 bg-emerald-50' : 'border-slate-300 text-slate-700'}`}>
                <Landmark size={16}/> Bank
              </button>
              <button type="button" onClick={() => setMethod('card')} className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${method==='card' ? 'border-emerald-600 text-emerald-700 bg-emerald-50' : 'border-slate-300 text-slate-700'}`}>
                <CreditCard size={16}/> Kartu
              </button>
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield size={14} className="text-emerald-600" />
              <span>Transaksi aman & terenkripsi</span>
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
              Konfirmasi Donasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;
