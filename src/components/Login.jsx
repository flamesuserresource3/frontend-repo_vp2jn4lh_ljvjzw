import React, { useState } from 'react';
import { Lock, Mail, User, Shield } from 'lucide-react';

const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donatur');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }
    // Sangat sederhana: validasi pola email
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      setError('Format email tidak valid.');
      return;
    }
    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }
    onSubmit({ email, role });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-emerald-50 to-white px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700"><User size={18} /></div>
          <h1 className="text-lg font-semibold text-slate-900">Masuk ke FundCare</h1>
        </div>
        <p className="text-sm text-slate-600 mb-6">Pilih peran Anda untuk melanjutkan. Akses Donatur dan Admin dipisahkan untuk keamanan.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <div className="mt-1 relative">
              <Mail size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="anda@mail.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Kata Sandi</label>
            <div className="mt-1 relative">
              <Lock size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Masuk sebagai</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('donatur')}
                className={`rounded-lg border px-3 py-2 text-sm ${role==='donatur' ? 'border-emerald-600 text-emerald-700 bg-emerald-50' : 'border-slate-300 text-slate-700'}`}
              >Donatur</button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`rounded-lg border px-3 py-2 text-sm ${role==='admin' ? 'border-emerald-600 text-emerald-700 bg-emerald-50' : 'border-slate-300 text-slate-700'}`}
              >Admin</button>
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button type="submit" className="w-full rounded-lg bg-emerald-600 text-white py-2.5 hover:bg-emerald-700">Masuk</button>

          <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
            <Shield size={14} className="text-emerald-600" />
            <span>Peran dipisah, otorisasi aman.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
