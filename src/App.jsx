import React, { useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import CampaignGrid from './components/CampaignGrid';
import DonationModal from './components/DonationModal';
import { CheckCircle } from 'lucide-react';

const App = () => {
  // Auth & role management
  const [user, setUser] = useState(null); // { email, role }
  const role = user?.role;

  // Navigation per role
  const donorTabs = [
    { key: 'explore', label: 'Kampanye' },
    { key: 'history', label: 'Riwayat' },
  ];
  const adminTabs = [
    { key: 'campaigns', label: 'Kelola Kampanye' },
    { key: 'donations', label: 'Donasi Masuk' },
  ];
  const [activeTab, setActiveTab] = useState('explore');

  // Data state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donations, setDonations] = useState([]);

  const campaigns = useMemo(() => [
    { id: 'c1', title: 'Pendidikan Anak Desa', description: 'Buku dan perlengkapan sekolah untuk anak-anak di daerah terpencil.', goal: 50000000, raised: 17500000, daysLeft: 22, category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1470&auto=format&fit=crop' },
    { id: 'c2', title: 'Pangan Keluarga Rentan', description: 'Distribusi paket sembako untuk keluarga terdampak ekonomi.', goal: 30000000, raised: 21200000, daysLeft: 12, category: 'Sosial', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1470&auto=format&fit=crop' },
    { id: 'c3', title: 'Bantuan Medis Darurat', description: 'Kebutuhan medis darurat dan ambulans.', goal: 70000000, raised: 45600000, daysLeft: 5, category: 'Kesehatan', image: 'https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?q=80&w=1470&auto=format&fit=crop' },
    { id: 'c4', title: 'Air Bersih untuk Desa', description: 'Pembangunan sumur bor dan filter air bersih.', goal: 40000000, raised: 12000000, daysLeft: 18, category: 'Infrastruktur', image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1470&auto=format&fit=crop' },
    { id: 'c5', title: 'Bantuan Bencana Alam', description: 'Logistik darurat untuk korban bencana.', goal: 90000000, raised: 61500000, daysLeft: 9, category: 'Darurat', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1470&auto=format&fit=crop' },
    { id: 'c6', title: 'Modal UMKM Mikro', description: 'Dukungan modal usaha mikro pasca pandemi.', goal: 60000000, raised: 31000000, daysLeft: 27, category: 'Ekonomi', image: 'https://images.unsplash.com/photo-1731679802944-a063d5f74ee8?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQZW5kaWRpa2FuJTIwQW5hayUyMERlc2F8ZW58MHwwfHx8MTc2MjI2NDMxNHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  ], []);

  // Toast
  const toastRef = useRef(null);
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

  // Auth handlers
  const handleLogin = ({ email, role }) => {
    setUser({ email, role });
    setActiveTab(role === 'admin' ? 'campaigns' : 'explore');
    showToast(`Masuk sebagai ${role === 'admin' ? 'Admin' : 'Donatur'}`);
  };
  const handleLogout = () => {
    setUser(null);
    setActiveTab('explore');
    showToast('Anda telah keluar.');
  };

  // Donation
  const openDonate = (campaign) => {
    setSelectedCampaign(campaign || campaigns[0]);
    setModalOpen(true);
  };
  const handleDonate = ({ amount, method, name }) => {
    setDonations((prev) => [
      { id: crypto.randomUUID(), campaign: selectedCampaign, amount, method, name, ts: Date.now(), status: 'pending' },
      ...prev,
    ]);
    if (amount > 100_000_000) {
      showToast('Nominal besar. Transaksi ditinjau keamanan.');
    } else {
      showToast('Terima kasih! Donasi Anda tercatat.');
    }
    setModalOpen(false);
  };

  // Admin: update status donasi (mock)
  const setDonationStatus = (id, status) => {
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    showToast(`Status donasi diubah menjadi ${status}.`);
  };

  // Admin: kampanye CRUD sederhana (mock)
  const [adminCampaigns, setAdminCampaigns] = useState([]);
  const mergedCampaigns = adminCampaigns.length ? adminCampaigns : campaigns;
  const addCampaign = () => {
    const title = prompt('Judul kampanye baru:');
    if (!title) return;
    const goalStr = prompt('Target dana (contoh 50000000):');
    const goal = Number(goalStr || 0);
    if (!goal || goal < 1000000) return showToast('Target minimal Rp 1.000.000');
    const c = {
      id: crypto.randomUUID(),
      title,
      description: 'Kampanye ditambahkan oleh admin.',
      goal,
      raised: 0,
      daysLeft: 30,
      category: 'Umum',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop',
    };
    setAdminCampaigns((prev) => [c, ...prev]);
    showToast('Kampanye berhasil ditambahkan.');
  };
  const deleteCampaign = (id) => {
    setAdminCampaigns((prev) => prev.filter((c) => c.id !== id));
    showToast('Kampanye dihapus.');
  };

  // Not logged in: show Login screen
  if (!user) {
    return <Login onSubmit={handleLogin} />;
  }

  const tabs = role === 'admin' ? adminTabs : donorTabs;

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        role={role}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onDonatePrimary={() => openDonate()}
        onLogout={handleLogout}
      />

      {/* Content */}
      {role === 'donatur' && (
        <>
          {activeTab === 'explore' && (
            <CampaignGrid campaigns={mergedCampaigns} onDonate={openDonate} onView={(c) => alert(c.description)} />
          )}
          {activeTab === 'history' && (
            <section className="max-w-7xl mx-auto px-4 py-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Riwayat Donasi</h2>
              {donations.length === 0 ? (
                <p className="text-sm text-slate-600">Belum ada donasi. Mulai berbuat kebaikan hari ini!</p>
              ) : (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="text-left px-4 py-2">Kampanye</th>
                        <th className="text-left px-4 py-2">Waktu</th>
                        <th className="text-left px-4 py-2">Metode</th>
                        <th className="text-left px-4 py-2">Nominal</th>
                        <th className="text-left px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((d) => (
                        <tr key={d.id} className="border-t border-slate-100">
                          <td className="px-4 py-2">{d.campaign.title}</td>
                          <td className="px-4 py-2">{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(d.ts)}</td>
                          <td className="px-4 py-2">{d.method}</td>
                          <td className="px-4 py-2 font-medium text-emerald-700">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(d.amount)}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${d.status==='success' ? 'bg-emerald-100 text-emerald-700' : d.status==='pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>{d.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}
        </>
      )}

      {role === 'admin' && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          {activeTab === 'campaigns' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">Kelola Kampanye</h2>
                <button onClick={addCampaign} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Tambah Kampanye</button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mergedCampaigns.map((c) => (
                  <div key={c.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                    <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} />
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-800 line-clamp-1">{c.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2 mt-1">{c.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <button onClick={() => deleteCampaign(c.id)} className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50">Hapus</button>
                        <button onClick={() => alert('Fitur edit dapat ditambahkan.')} className="px-3 py-1.5 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Donasi Masuk</h2>
              {donations.length === 0 ? (
                <p className="text-sm text-slate-600">Belum ada donasi masuk.</p>
              ) : (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="text-left px-4 py-2">Donatur</th>
                        <th className="text-left px-4 py-2">Kampanye</th>
                        <th className="text-left px-4 py-2">Nominal</th>
                        <th className="text-left px-4 py-2">Metode</th>
                        <th className="text-left px-4 py-2">Status</th>
                        <th className="text-left px-4 py-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((d) => (
                        <tr key={d.id} className="border-t border-slate-100">
                          <td className="px-4 py-2">{d.name}</td>
                          <td className="px-4 py-2">{d.campaign.title}</td>
                          <td className="px-4 py-2 font-medium text-emerald-700">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(d.amount)}</td>
                          <td className="px-4 py-2">{d.method}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${d.status==='success' ? 'bg-emerald-100 text-emerald-700' : d.status==='pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>{d.status}</span>
                          </td>
                          <td className="px-4 py-2 flex gap-2">
                            <button onClick={() => setDonationStatus(d.id, 'pending')} className="px-2 py-1 rounded border border-slate-200 text-xs">Pending</button>
                            <button onClick={() => setDonationStatus(d.id, 'success')} className="px-2 py-1 rounded bg-emerald-600 text-white text-xs">Berhasil</button>
                            <button onClick={() => setDonationStatus(d.id, 'cancelled')} className="px-2 py-1 rounded border border-slate-200 text-xs">Batalkan</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </section>
      )}

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

      <footer className="border-t border-slate-100 py-8 mt-10">
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
