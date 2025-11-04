import React, { useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CampaignGrid from './components/CampaignGrid';
import DonationModal from './components/DonationModal';
import { CheckCircle, History } from 'lucide-react';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const toastRef = useRef(null);

  const campaigns = useMemo(() => [
    {
      id: 'c1',
      title: 'Bantu Pendidikan Anak Desa',
      description: 'Pengadaan buku dan perlengkapan sekolah untuk anak-anak di daerah terpencil.',
      goal: 50000000,
      raised: 17500000,
      daysLeft: 22,
      category: 'Pendidikan',
      image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1470&auto=format&fit=crop',
    },
    {
      id: 'c2',
      title: 'Donasi Pangan untuk Keluarga Rentan',
      description: 'Distribusi paket sembako untuk keluarga terdampak ekonomi.',
      goal: 30000000,
      raised: 21200000,
      daysLeft: 12,
      category: 'Sosial',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1470&auto=format&fit=crop',
    },
    {
      id: 'c3',
      title: 'Bantuan Medis Darurat',
      description: 'Penggalangan dana untuk kebutuhan medis darurat dan ambulans.',
      goal: 70000000,
      raised: 45600000,
      daysLeft: 5,
      category: 'Kesehatan',
      image: 'https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?q=80&w=1470&auto=format&fit=crop',
    },
  ], []);

  const openDonate = (campaign) => {
    setSelectedCampaign(campaign || campaigns[0]);
    setModalOpen(true);
  };

  const handleDonate = ({ amount, method, name }) => {
    // Simulasi donasi sukses + keamanan: validasi minimal dilakukan di modal
    setDonations((prev) => [
      { id: crypto.randomUUID(), campaign: selectedCampaign, amount, method, name, ts: Date.now(), status: 'pending' },
      ...prev,
    ]);
    // Fitur unik: auto fraud-prevent minimal + limit per transaksi (misal 100 juta)
    if (amount > 100_000_000) {
      showToast('Nominal sangat besar. Transaksi dalam peninjauan keamanan.');
    } else {
      showToast('Terima kasih! Donasi Anda tercatat.');
    }
    setModalOpen(false);
  };

  const showToast = (msg) => {
    if (!toastRef.current) return;
    toastRef.current.textContent = msg;
    toastRef.current.classList.remove('opacity-0');
    toastRef.current.classList.add('opacity-100');
    setTimeout(() => {
      toastRef.current?.classList.remove('opacity-100');
      toastRef.current?.classList.add('opacity-0');
    }, 2500);
  };

  const scrollToCampaigns = () => {
    const el = document.getElementById('campaigns');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onDonatePrimary={() => openDonate()} onNavigateCampaigns={scrollToCampaigns} />
      <Hero onDonate={() => openDonate()} />

      <CampaignGrid campaigns={campaigns} onDonate={openDonate} />

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <History size={18} className="text-emerald-600" />
              <h3 className="text-lg font-semibold text-slate-900">Riwayat Donasi Anda</h3>
            </div>
            {donations.length === 0 ? (
              <p className="text-sm text-slate-600">Belum ada donasi. Ayo mulai berbuat kebaikan hari ini!</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {donations.map((d) => (
                  <li key={d.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{d.campaign.title}</p>
                      <p className="text-xs text-slate-500">{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(d.ts)} • {d.method}</p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-700">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(d.amount)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-emerald-50 to-white">
            <h4 className="font-semibold text-slate-900">Panel Admin (Pratinjau)</h4>
            <p className="text-sm text-slate-600 mt-1">Kelola kampanye, pantau donasi, dan ubah status.</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border border-emerald-100 bg-white p-3">
                <p className="text-xs text-slate-500">Kampanye Aktif</p>
                <p className="text-lg font-bold text-emerald-700">{campaigns.length}</p>
              </div>
              <div className="rounded-lg border border-emerald-100 bg-white p-3">
                <p className="text-xs text-slate-500">Donasi (Local)</p>
                <p className="text-lg font-bold text-emerald-700">{donations.length}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50">Tambah Kampanye</button>
              <button className="flex-1 px-3 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Kelola Donasi</button>
            </div>
            <p className="text-xs text-slate-500 mt-3">Masuk sebagai admin untuk akses penuh.</p>
          </div>
        </div>
      </section>

      <DonationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        campaign={selectedCampaign}
        onSubmit={handleDonate}
      />

      <div ref={toastRef} className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg transition-opacity duration-300 opacity-0 flex items-center gap-2">
        <CheckCircle size={16} className="text-emerald-400" />
        <span></span>
      </div>

      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} FundCare — Bersama wujudkan kebaikan.</p>
          <div className="flex items-center gap-4">
            <a href="#campaigns" className="hover:text-emerald-700">Kampanye</a>
            <a href="#" className="hover:text-emerald-700">Kebijakan Privasi</a>
            <a href="#" className="hover:text-emerald-700">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
