import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
<<<<<<< HEAD
import { 
  AlertTriangle, Activity, Users, Phone, Home, TrendingUp, Bell, CheckCircle, 
  Loader2, Map, BarChart3, LineChart as LineIcon, Info, Search, MapPin,
  Globe, Shield, Zap, ChevronRight, MessageSquare, Briefcase
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import { sendSMS, SMS_TEMPLATES } from '../utils/mockTwilio';
import { matchSchemes } from '../utils/matchSchemes';
import { useLang } from '../contexts/LanguageContext';
import { db, collection, onSnapshot, query, orderBy, limit } from '../utils/firebase';

import EcosystemMap from '../components/EcosystemMap';

/* ─── Seeded / Fallback Data ─── */
=======
import {
  AlertTriangle, Activity, Users, Phone, Home, TrendingUp, Bell, CheckCircle,
  Loader2, Map, BarChart3, LineChart as LineIcon, Info, Search, MapPin
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { sendSMS, SMS_TEMPLATES } from '../utils/mockTwilio';
import { matchSchemes } from '../utils/matchSchemes';
import toast, { Toaster } from 'react-hot-toast';

/* ─── Seeded Intelligence Data ─── */
const SEASON_COMPARISON = [
  { taluk: 'Hassan', last: 31, this: 42 },
  { taluk: 'Alur', last: 44, this: 71 },
  { taluk: 'Sakleshpur', last: 29, this: 38 },
  { taluk: 'Arsikere', last: 51, this: 68 },
  { taluk: 'Belur', last: 22, this: 29 },
  { taluk: 'Channarayapatna', last: 40, this: 55 },
];

const CORRELATION_DATA = [
  { rainfall: 2,  score: 28, taluk: 'Belur' },
  { rainfall: 4,  score: 31, taluk: 'Arsikere' },
  { rainfall: 9,  score: 35, taluk: 'Holenarasipur' },
  { rainfall: 12, score: 42, taluk: 'Hassan' },
  { rainfall: 22, score: 48, taluk: 'Arakalagudu' },
  { rainfall: 28, score: 52, taluk: 'Belur' },
  { rainfall: 48, score: 71, taluk: 'Alur' },
  { rainfall: 92, score: 82, taluk: 'Sakleshpur' },
];


>>>>>>> origin/Pragyan
const SEEDED_MITRAS = [
  { id: 'm1', name: 'Ravi Verma', taluk: 'Hassan', lat: 13.010, lng: 76.110, casesResolved: 12, avgResponse: '14m', activeCases: 2, status: 'Active' },
  { id: 'm2', name: 'Priya S.', taluk: 'Sakleshpur', lat: 12.950, lng: 75.800, casesResolved: 34, avgResponse: '8m', activeCases: 0, status: 'Available' },
  { id: 'm3', name: 'Gowda Bros', taluk: 'Belur', lat: 13.170, lng: 75.870, casesResolved: 8, avgResponse: '22m', activeCases: 4, status: 'Overloaded' },
];

const SEEDED_LOGS = [
  { id: 'l1', type: 'SYSTEM', message: 'Command Center Initialized', timestamp: Date.now() - 3600000 },
  { id: 'l2', type: 'SYNC', message: 'Regional Node Pulse Detected', timestamp: Date.now() - 1800000 },
];

const SEEDED_FARMERS = [
<<<<<<< HEAD
  { id: 'f1', name: 'Ramesh Kumar',    taluk: 'Alur',            lat: 13.000, lng: 76.000, score: 78, crop: 'Paddy',     loanDaysOverdue: 60,  status: 'Red'    },
  { id: 'f2', name: 'Savitha Gowda',  taluk: 'Sakleshpur',      lat: 12.942, lng: 75.788, score: 82, crop: 'Coffee',    loanDaysOverdue: 90,  status: 'Red'    },
  { id: 'f3', name: 'Manoj Patil',    taluk: 'Hassan',          lat: 13.007, lng: 76.100, score: 55, crop: 'Ragi',      loanDaysOverdue: 20,  status: 'Yellow' },
  { id: 'f4', name: 'Lakshmi Devi',   taluk: 'Arsikere',        lat: 13.314, lng: 76.258, score: 44, crop: 'Maize',     loanDaysOverdue: 10,  status: 'Yellow' },
=======
  {
    id: 'f1',
    name: 'Ramesh Kumar',
    taluk: 'Alur',
    village: 'Alur HQ',
    lat: 12.9691,
    lng: 76.0450,
    score: 78,
    status: 'Red',
    crop: 'Paddy',
    loanDaysOverdue: 60,
    marketActivity: 'Inactive',
    trajectory: 'Worsening'
  },
  {
    id: 'f2',
    name: 'Kavitha Reddy',
    taluk: 'Arsikere',
    village: 'Arsikere HQ',
    lat: 13.3150,
    lng: 76.2580,
    score: 82,
    status: 'Red',
    crop: 'Sugarcane',
    loanDaysOverdue: 45,
    marketActivity: 'Inactive',
    trajectory: 'Worsening'
  },
  {
    id: 'f3',
    name: 'Prakash N',
    taluk: 'Hassan',
    village: 'Hassan HQ',
    lat: 13.0068,
    lng: 76.1004,
    score: 52,
    status: 'Yellow',
    crop: 'Maize',
    loanDaysOverdue: 0,
    marketActivity: 'Low',
    trajectory: 'Stable'
  },
  {
    id: 'f4',
    name: 'Manjunath S',
    taluk: 'Sakleshpur',
    village: 'Sakleshpur HQ',
    lat: 12.9630,
    lng: 75.7860,
    score: 45,
    status: 'Yellow',
    crop: 'Coffee',
    loanDaysOverdue: 0,
    marketActivity: 'Active',
    trajectory: 'Stable'
  },
  {
    id: 'f5',
    name: 'Suresh Gowda',
    taluk: 'Belur',
    village: 'Belur HQ',
    lat: 13.1610,
    lng: 75.8580,
    score: 18,
    status: 'Green',
    crop: 'Ragi',
    loanDaysOverdue: 0,
    marketActivity: 'Active',
    trajectory: 'Stable'
  }
>>>>>>> origin/Pragyan
];

const STATUS_COLOR = { Red: '#ef4444', Yellow: '#f59e0b', Green: '#10b981' };

const RADAR_DATA = [
  { subject: 'Soil Health', A: 120, B: 110, fullMark: 150 },
  { subject: 'Water Table', A: 98, B: 130, fullMark: 150 },
  { subject: 'Credit Risk', A: 86, B: 130, fullMark: 150 },
  { subject: 'Market Access', A: 99, B: 100, fullMark: 150 },
  { subject: 'Pest Load', A: 85, B: 90, fullMark: 150 },
];

<<<<<<< HEAD
const VELOCITY_DATA = [
  { time: '08:00', v: 40 }, { time: '10:00', v: 75 }, { time: '12:00', v: 60 },
  { time: '14:00', v: 90 }, { time: '16:00', v: 85 }, { time: '18:00', v: 110 },
];

const SidebarNode = ({ id, icon: Icon, label, active, onClick, color = 'teal' }) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-4 px-6 py-4 transition-all relative group ${
      active ? 'bg-white/5 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
    }`}
  >
    {active && <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${color}-500 shadow-[2px_0_10px_rgba(20,184,166,0.5)]`} />}
    <Icon size={20} className={active ? `text-${color}-500` : 'group-hover:text-slate-400'} />
    <span className="text-[12px] font-black uppercase tracking-widest">{label}</span>
    <ChevronRight size={14} className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${active ? 'opacity-100' : ''}`} />
  </button>
=======
const STATUS_COLOR = { Red: '#ff4d4d', Yellow: '#ffaa00', Green: '#00e676' };
const STATUS_BG = { Red: 'bg-red-500/10', Yellow: 'bg-orange-500/10', Green: 'bg-emerald-500/10' };

const StatCard = ({ icon: Icon, value, label, color, sub }) => (
  <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5 flex flex-col gap-1 hover:border-teal-500/30 transition-all relative overflow-hidden group">
    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={80} />
    </div>
    <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
      <Icon size={14} className="text-teal-500" /> {label}
    </div>
    <div className={`text-4xl font-black ${color || 'text-white'} tracking-tighter`}>{value}</div>
    {sub && <div className="text-[10px] text-gray-600 font-bold uppercase">{sub}</div>}
  </div>
>>>>>>> origin/Pragyan
);

export default function AdminDashboard() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState('global'); // global, farmers, mitras
  const [farmers, setFarmers] = useState(SEEDED_FARMERS);
  const [mitras, setMitras] = useState(SEEDED_MITRAS);
  const [logs, setLogs] = useState(SEEDED_LOGS);
  const [selected, setSelected] = useState(null);
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastLog, setBroadcastLog] = useState([]);
  const [criticalAlert, setCriticalAlert] = useState(null); // escalation alert

  // Audit Fix: Re-injecting Firestore onSnapshot listeners
=======
  const [adminData, setAdminData] = useState(null);

  // Guard Route
  useEffect(() => {
    setAdminData({ 
      district: 'Hassan', 
      name: 'District Officer',
      role: 'admin'
    });
  }, []);

  const [viewMode, setViewMode] = useState('farmers'); // 'farmers' | 'mitras'
  const [farmers, setFarmers] = useState(SEEDED_FARMERS);
  const [mitras, setMitras] = useState(SEEDED_MITRAS);
  const [globalLogs, setGlobalLogs] = useState(SEEDED_LOGS);
  const [selected, setSelected] = useState(null);
  const [alerting, setAlerting] = useState(false);
  const [alertLog, setAlertLog] = useState([]);
  const [liveMode, setLiveMode] = useState(false);
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [broadcastTaluk, setBroadcastTaluk] = useState('Alur');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Real-time synchronization for check-ins and SOS
>>>>>>> origin/Pragyan
  useEffect(() => {
    // 1. Listen for new farmers / users
    const qUsers = query(collection(db, 'users'), limit(100));
    const unsubUsers = onSnapshot(qUsers, (snap) => {
      const liveFarmers = [];
      const liveMitras = [];
      snap.forEach(doc => {
        const d = doc.data();
        if (d.roles?.includes('farmer')) liveFarmers.push({ id: doc.id, ...d });
        if (d.roles?.includes('mitra')) liveMitras.push({ id: doc.id, ...d });
      });
      // Merge seeded with live
      setFarmers(prev => {
        const ids = new Set(liveFarmers.map(f => f.id));
        return [...liveFarmers, ...SEEDED_FARMERS.filter(sf => !ids.has(sf.id))];
      });
      setMitras(prev => {
        const ids = new Set(liveMitras.map(m => m.id));
        return [...liveMitras, ...SEEDED_MITRAS.filter(sm => !ids.has(sm.id))];
      });
    });

    // 2. Listen for Global Activities
    const qLogs = query(collection(db, 'global_activities'), orderBy('timestamp', 'desc'), limit(30));
    const unsubLogs = onSnapshot(qLogs, (snap) => {
      const liveLogs = [];
      snap.forEach(doc => {
        const d = doc.data();
        liveLogs.push({ id: doc.id, ...d });
        // Check for urgent escalations
        if (d.type === 'ESCALATION' && (Date.now() - (d.timestamp?.toMillis?.() || d.timestamp) < 5000)) {
          setCriticalAlert(d);
        }
      });
      setLogs(prev => liveLogs.length > 0 ? liveLogs : prev);
    });

    // 3. Fallback for LocalStorage Events (Same browser sync)
    const handleLocal = (e) => {
      const lastEventRaw = localStorage.getItem('krishimanas_last_event');
      if (!lastEventRaw) return;
      try {
        const event = JSON.parse(lastEventRaw);
        if (event.type === 'SOS') {
          setLogs(prev => [{ id: Date.now(), type: 'SOS', message: `${event.farmerName} generated distress signal`, timestamp: Date.now() }, ...prev]);
        }
      } catch (e) {}
    };
    window.addEventListener('storage', handleLocal);
    window.addEventListener('krishimanas_update', handleLocal);

    return () => {
      unsubUsers();
      unsubLogs();
      window.removeEventListener('storage', handleLocal);
      window.removeEventListener('krishimanas_update', handleLocal);
    };
  }, []);

  const handleBroadcast = async () => {
    setBroadcasting(true);
    const redFarmers = farmers.filter(f => f.status === 'Red');
    const newLogs = [];
    for (const f of redFarmers) {
      const msg = SMS_TEMPLATES.distressAlert(f.name, f.score, f.taluk);
      await sendSMS({ to: '+91XXXXXXXXXX', message: msg, farmerName: f.name });
      newLogs.push(`✓ SMS Dispatched: ${f.name}`);
    }
    setBroadcastLog(newLogs);
    setTimeout(() => setBroadcasting(false), 2000);
  };

  const getStats = () => ({
    red: farmers.filter(f => f.status === 'Red').length,
    yellow: farmers.filter(f => f.status === 'Yellow').length,
    activeMitras: mitras.length,
    avgDistress: Math.round(farmers.reduce((s, f) => s + (f.score || 0), 0) / (farmers.length || 1))
  });

<<<<<<< HEAD
  const stats = getStats();
=======
  const talukData = [...new Set(farmers.map(f => f.taluk))].map(t => ({
    name: t,
    Red: farmers.filter(f => f.taluk === t && f.status === 'Red').length,
    Yellow: farmers.filter(f => f.taluk === t && f.status === 'Yellow').length,
    Green: farmers.filter(f => f.taluk === t && f.status === 'Green').length,
  }));

  const handleDemoAlert = async () => {
    setAlerting(true);
    const red = farmers.filter(f => f.status === 'Red');
    const logs = [];
    for (const f of red) {
      const msg = SMS_TEMPLATES.distressAlert(f.name, f.score, f.taluk);
      const res = await sendSMS({ to: '+91XXXXXXXXXX', message: msg, farmerName: f.name });
      logs.push(`✓ ALERT SENT: ${f.name} (SID: ${res.sid.substring(0, 6)})`);
    }
    setAlertLog(logs);
    setAlerting(false);
  };
>>>>>>> origin/Pragyan

  const handleBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastOpen(false);
      setBroadcastSent(false);
      setGlobalLogs(prev => [{
        id: Date.now(),
        type: 'BROADCAST',
        msg: `📻 AIR Hassan broadcast scheduled for ${broadcastTaluk} taluk — 101.4 FM`,
        time: 'Just now'
      }, ...prev]);
      toast.success(
        `✅ Broadcast scheduled — ${broadcastTaluk} taluk — AIR Hassan 101.4 FM`,
        { duration: 4000 }
      );
    }, 1500);
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#020617] text-slate-200 flex h-screen overflow-hidden font-sans selection:bg-teal-500/20">
      
      {/* ─── Mission Control Sidebar (3-Tab) ─── */}
      <aside className="w-64 border-r border-white/5 bg-[#020617] flex flex-col z-[1100]">
        <div className="p-8 pb-12">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 text-teal-500 font-black text-2xl tracking-tighter hover:scale-105 transition-all">
            <Shield size={28} /> {t('adminPortal')}
          </button>
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] mt-2 ml-1 opacity-50">Command Console</div>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarNode id="global" icon={Globe} label={lang === 'kn' ? 'ಜಾಗತಿಕ ಕೇಂದ್ರ' : 'Global Command'} active={activeTab === 'global'} onClick={setActiveTab} />
          <SidebarNode id="farmers" icon={Users} label={lang === 'kn' ? 'ರೈತರ ನೋಂದಣಿ' : 'Farmer Operations'} active={activeTab === 'farmers'} onClick={setActiveTab} />
          <SidebarNode id="mitras" icon={Briefcase} label={lang === 'kn' ? 'ಮಿತ್ರ ಪಡೆಗಳು' : 'Volunteer Network'} active={activeTab === 'mitras'} onClick={setActiveTab} color="blue" />
        </nav>

        <div className="p-6 bg-white/[0.02] border-t border-white/5">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_#14b8a6]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Live</span>
           </div>
           <button onClick={() => { localStorage.removeItem('krishimanas_auth_admin'); navigate('/'); }} className="w-full py-3 bg-red-500/10 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
              Terminate Session
           </button>
        </div>
      </aside>

      {/* ─── Main Content Area ─── */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Top Header Stats */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#020617]/50 backdrop-blur-xl shrink-0">
           <div className="flex gap-10">
              <div className="flex flex-col">
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Regional Priority</span>
                 <span className="text-xl font-black text-red-500 tabular-nums">{stats.red} Critical Cases</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-10">
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Force</span>
                 <span className="text-xl font-black text-blue-500 tabular-nums">{stats.activeMitras} Mitras</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-10">
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Avg Index</span>
                 <span className="text-xl font-black text-teal-400 tabular-nums">{stats.avgDistress} Pt</span>
              </div>
           </div>
           
           {criticalAlert && (
             <div className="mx-4 flex-1 animate-pulse">
                <div className="bg-red-600 px-6 py-3 rounded-full border-2 border-white flex items-center justify-between shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                   <div className="flex items-center gap-3">
                      <AlertTriangle size={20} className="text-white" />
                      <span className="text-white font-black text-xs uppercase tracking-widest">CRITICAL ESCALATION: {criticalAlert.message}</span>
                   </div>
                   <button onClick={() => setCriticalAlert(null)} className="text-white hover:scale-110 transition-transform"><X size={16} /></button>
                </div>
             </div>
           )}

           <div className="text-[11px] font-mono text-slate-500 bg-white/5 px-4 py-2 rounded-xl border border-white/10 uppercase tracking-tighter">
              Telemetry Status: Nominal // Latency 24ms
           </div>
        </header>

        {/* Dynamic Content Scrollbox */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          
          {activeTab === 'global' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="grid xl:grid-cols-12 gap-8 items-start">
                  {/* Map View */}
                  <div className="xl:col-span-8 bg-[#0f172a] rounded-[2.5rem] p-2 border border-white/5 shadow-2xl relative min-h-[540px]">
                    <div className="absolute top-8 left-8 z-[900] bg-black/60 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-4">
                       <Map size={20} className="text-teal-500" />
                       <div className="font-black text-[11px] uppercase tracking-widest leading-none text-white">
                          Tactical Sector Mapping<br/>
                          <span className="text-[8px] opacity-40">Hassan District Area Hub</span>
                       </div>
                    </div>
                    <EcosystemMap 
                      farmers={farmers} 
                      mitras={mitras} 
                      selectedId={selected?.id} 
                      onSelect={setSelected} 
                    />
                  </div>

                  {/* Operations Feed & Tools */}
                  <div className="xl:col-span-4 space-y-8">
                     {/* Radar Analytics Card */}
                     <div className="bg-[#0f172a] border border-white/5 rounded-[2rem] p-8 h-[260px] flex flex-col">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Universal Risk Coverage</div>
                        <div className="flex-1">
                           <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                                 <PolarGrid stroke="#ffffff10" />
                                 <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: '#64748b' }} />
                                 <Radar name="Current" dataKey="A" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
                              </RadarChart>
                           </ResponsiveContainer>
                        </div>
                     </div>

                     {/* Velocity Graph */}
                     <div className="bg-[#0f172a] border border-white/5 rounded-[2rem] p-8 h-[200px] flex flex-col">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Intervention Velocity</div>
                        <div className="flex-1">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={VELOCITY_DATA}>
                                 <defs>
                                    <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                 </defs>
                                 <Area type="monotone" dataKey="v" stroke="#3b82f6" fillOpacity={1} fill="url(#colorV)" />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </div>

                     {/* AIR Broadcast Tool */}
                     <div className="bg-red-500/10 border border-red-500/20 rounded-[2rem] p-8 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 text-red-500 opacity-5 group-hover:rotate-12 transition-all">
                           <Zap size={140} />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                           <AlertTriangle size={20} className="text-red-500 animate-pulse" />
                           <span className="text-[11px] font-black uppercase tracking-widest text-red-500">AIR Broadcast System</span>
                        </div>
                        <p className="text-xs font-bold text-slate-400 mb-6 leading-relaxed">
                           Dispatch encrypted emergency protocols to <span className="text-white">{stats.red} Farmers</span> and assigned Mitra units.
                        </p>
                        <button 
                           onClick={handleBroadcast} 
                           disabled={broadcasting || stats.red === 0}
                           className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 shadow-xl shadow-red-900/40 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                           {broadcasting ? <Loader2 className="animate-spin" /> : <Zap size={16} />} Dispatch Sector Alert
                        </button>
                        {broadcastLog.length > 0 && (
                          <div className="mt-4 max-h-32 overflow-y-auto space-y-1 border-t border-red-500/10 pt-4 font-mono text-[9px] text-red-400 opacity-80">
                             {broadcastLog.map((l, i) => <div key={i}>{l}</div>)}
                          </div>
                        )}
                     </div>

                     {/* Global Activity Feed */}
                     <div className="bg-[#0f172a] border border-white/5 rounded-[2rem] p-8 flex flex-col h-[350px]">
                        <div className="flex items-center justify-between mb-8">
                           <div className="flex items-center gap-2">
                              <Activity size={18} className="text-teal-500" />
                              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Activity Log</span>
                           </div>
                           <span className="bg-teal-500/10 text-teal-400 px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-widest">Real-time</span>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                           {logs.length === 0 ? (
                             <div className="h-full flex items-center justify-center text-slate-600 font-bold text-[10px] uppercase italic">Awaiting telemetry...</div>
                           ) : logs.map(l => (
                             <div key={l.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex gap-4 hover:bg-white/[0.08] transition-all group">
                                <div className={`w-2 h-2 rounded-full mt-1.5 ${l.type === 'SOS' ? 'bg-red-500 animate-ping' : 'bg-teal-500'}`} />
                                <div className="flex-1">
                                   <div className="flex justify-between items-baseline mb-1">
                                      <span className="text-[9px] font-black uppercase text-teal-500">{l.type || 'SYSTEM'}</span>
                                      <span className="text-[8px] font-bold text-slate-600 uppercase">Recent</span>
                                   </div>
                                   <div className="text-xs font-medium text-slate-300 leading-snug">{l.message || l.msg}</div>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'farmers' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
               {/* Tactical Overview Charts */}
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex flex-col h-[300px]">
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Regional Risk Load</div>
                     <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie data={[
                                { name: 'Red', value: farmers.filter(f => f.status === 'Red').length, fill: '#ef4444' },
                                { name: 'Yellow', value: farmers.filter(f => f.status === 'Yellow').length, fill: '#f59e0b' },
                                { name: 'Green', value: farmers.filter(f => f.status === 'Green').length, fill: '#10b981' },
                              ]} innerRadius={60} outerRadius={80} dataKey="value" />
                              <RechartsTooltip />
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
                  <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex flex-col h-[300px]">
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Crop Sector Exposure</div>
                     <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={[
                             { name: 'Paddy', value: farmers.filter(f => f.crop === 'Paddy').length },
                             { name: 'Ragi', value: farmers.filter(f => f.crop === 'Ragi').length },
                             { name: 'Maize', value: farmers.filter(f => f.crop === 'Maize').length },
                             { name: 'Coffee', value: farmers.filter(f => f.crop === 'Coffee').length },
                           ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                              <YAxis axisLine={false} tickLine={false} fontSize={10} />
                              <Bar dataKey="value" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={20} />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
                  <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex flex-col h-[300px]">
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Distress Convergence</div>
                     <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={VELOCITY_DATA}>
                              <Area type="monotone" dataKey="v" stroke="#f59e0b" fill="#f59e0b30" />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               </div>

               <div className="bg-[#0f172a] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                  <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                     <h2 className="text-2xl font-black text-white tracking-tighter">Tactical Farmer Registry</h2>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/10">
                           <Search size={14} className="text-slate-500" />
                           <input type="text" placeholder="Search Entity ID / Name..." className="bg-transparent border-none focus:ring-0 text-xs font-bold text-white uppercase tracking-widest" />
                        </div>
                     </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-black/20 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                             <th className="px-10 py-6">ID Node</th>
                             <th className="px-10 py-6">Operational Zone</th>
                             <th className="px-10 py-6">Resource Segment</th>
                             <th className="px-10 py-6">Distress Index</th>
                             <th className="px-10 py-6">Protocol Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/[0.03]">
                          {[...farmers].sort((a,b) => (b.score || 0) - (a.score || 0)).map(f => (
                            <tr key={f.id} onClick={() => setSelected(f)} className="hover:bg-white/[0.03] transition-colors cursor-pointer group">
                               <td className="px-10 py-8">
                                  <div className="font-black text-white">{f.name}</div>
                                  <div className="text-[9px] font-bold text-slate-600 tracking-widest uppercase">{f.id} // SEC-{f.taluk?.substring(0,3).toUpperCase()}</div>
                               </td>
                               <td className="px-10 py-8 text-xs font-black text-slate-400 uppercase tracking-widest">{f.taluk} District</td>
                               <td className="px-10 py-8 text-xs font-bold text-teal-500 uppercase">{f.crop || 'Paddy'} Sector</td>
                               <td className="px-10 py-8">
                                  <span className={`text-2xl font-black ${STATUS_COLOR[f.status] || 'text-white'} tabular-nums`}>{f.score || 50}</span>
                               </td>
                               <td className="px-10 py-8">
                                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                                     f.status === 'Red' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 
                                     f.status === 'Yellow' ? 'bg-orange-500/10 border-orange-500/30 text-orange-500' : 
                                     'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                                  }`}>
                                     <div className={`w-1.5 h-1.5 rounded-full ${f.status === 'Red' ? 'bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]' : (f.status === 'Yellow' ? 'bg-orange-500' : 'bg-emerald-500')}`} />
                                     {f.status} Risk Level
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'mitras' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               {/* Mitra Summary Stats */}
               <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-2 bg-[#0f172a] p-6 rounded-3xl border border-white/5 flex flex-col">
                     <div className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">Sector Load Balance</div>
                     <div className="flex-1 min-h-[140px]">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={mitras.map(m => ({ name: m.name.split(' ')[0], load: m.activeCases || 0 }))}>
                              <XAxis dataKey="name" fontSize={8} axisLine={false} tickLine={false} />
                              <Bar dataKey="load" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
                  <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5">
                     <div className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Total Force</div>
                     <div className="text-3xl font-black text-white italic">{mitras.length} Units</div>
                  </div>
                  <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5">
                     <div className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1">Active Now</div>
                     <div className="text-3xl font-black text-white italic">{mitras.filter(m => m.status === 'Active' || m.activeCases > 0).length} Units</div>
                  </div>
                  <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5">
                     <div className="text-[9px] font-black text-teal-400 uppercase tracking-[0.2em] mb-1">Avg Resolution</div>
                     <div className="text-3xl font-black text-white italic">14.2m</div>
                  </div>
                  <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5">
                     <div className="text-[9px] font-black text-yellow-500 uppercase tracking-[0.2em] mb-1">Sector Load</div>
                     <div className="text-3xl font-black text-white italic">Nominal</div>
                  </div>
               </div>

               {/* Mitra Table */}
               <div className="bg-[#0f172a] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                  <div className="p-8 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                     <div className="font-black text-sm uppercase tracking-widest text-slate-400">Mitra Deployment Registry</div>
                  </div>
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-white/[0.02]">
                           <th className="px-8 py-4">Unit Name</th>
                           <th className="px-8 py-4">Sector</th>
                           <th className="px-8 py-4">Load</th>
                           <th className="px-8 py-4">Impact</th>
                           <th className="px-8 py-4">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/[0.03]">
                        {mitras.map(m => (
                          <tr key={m.id} onClick={() => setSelected(m)} className="hover:bg-white/[0.03] transition-colors cursor-pointer group">
                             <td className="px-8 py-6">
                                <div className="font-black text-white">{m.name}</div>
                                <div className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">ID: {m.id}</div>
                             </td>
                             <td className="px-8 py-6 text-xs font-black text-blue-400 uppercase tracking-widest">{m.taluk}</td>
                             <td className="px-8 py-6 text-xs font-black text-white">{m.activeCases || 0} Cases</td>
                             <td className="px-8 py-6 text-xs font-black text-emerald-500">{m.casesResolved || 0} Resolved</td>
                             <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                   m.status === 'Overloaded' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                }`}>
                                   {m.status || 'Active'}
                                </span>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* ─── Detail Modal / Overlay ─── */}
      {selected && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-[#0f172a] w-full max-w-4xl border border-white/10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row relative">
              <button onClick={() => setSelected(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-all z-10"><X size={24} /></button>
              
              <div className="md:w-1/2 p-12 bg-black/40 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 left-0 p-12 text-teal-500 opacity-[0.02] -rotate-12 scale-150">
                    <Shield size={340} />
                 </div>
                 <div className="relative z-10">
                    <div className={`px-4 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest inline-block mb-8 ${
                       selected.status === 'Red' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 
                       (selected.status === 'Yellow' ? 'bg-orange-500/10 border-orange-500/30 text-orange-500' : 'bg-blue-500/10 border-blue-500/30 text-blue-400')
                    }`}>
                       {selected.status || 'Active'} Node Security Protocol
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter leading-tight mb-2">{selected.name}</h2>
                    <p className="text-slate-400 font-bold text-lg uppercase tracking-tighter">{selected.taluk} Sector Registry // {selected.id}</p>
                 </div>
                 <div className="relative z-10 pt-10">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Live Performance Telemetry</div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                          <div className="text-3xl font-black text-white tabular-nums">{selected.score ?? selected.casesResolved}</div>
                          <div className="text-[9px] font-black text-slate-500 uppercase">{selected.score !== undefined ? 'Distress Index' : 'Cases Closed'}</div>
                       </div>
                       <div className="space-y-1">
                          <div className="text-3xl font-black text-white tabular-nums">{selected.loanDaysOverdue ?? selected.activeCases}</div>
                          <div className="text-[9px] font-black text-slate-500 uppercase">{selected.loanDaysOverdue !== undefined ? 'Days Overdue' : 'Active Load'}</div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="md:w-1/2 p-12 space-y-8 flex flex-col justify-center">
                 {selected.score !== undefined ? (
                   <>
                     <div className="space-y-4">
                        <div className="text-[10px] font-black text-teal-500 uppercase tracking-[0.3em]">AI-Triggered Interventions</div>
                        <div className="space-y-3">
                           {matchSchemes({ score: selected.score, crop: selected.crop, taluk: selected.taluk }).schemes.slice(0, 2).map(s => (
                             <div key={s.id} className="p-5 bg-white/5 border border-white/5 rounded-[1.5rem] flex items-center justify-between group hover:bg-white/10 transition-all">
                                <div>
                                   <div className="text-sm font-black text-white mb-0.5">{s.name}</div>
                                   <div className="text-[10px] font-bold text-slate-500 uppercase">{s.benefit}</div>
                                </div>
                                <Zap className="text-teal-500 group-hover:scale-125 transition-transform" size={18} />
                             </div>
                           ))}
                        </div>
                     </div>
                     <button onClick={() => { sendSMS({ to: '+91XXXXXXXXXX', message: `KrishiManas Alert: Emergency protocol initiated for ${selected.name}. Assistance is on the way.`, farmerName: selected.name }); setSelected(null); }} className="w-full py-5 bg-teal-500 text-[#020617] rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-teal-500/20 hover:bg-teal-400 hover:scale-[1.02] transition-all">
                        Initiate Rapid Deployment
                     </button>
                   </>
                 ) : (
                   <div className="space-y-8">
                      <div className="p-8 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] text-center">
                         <Activity size={40} className="text-blue-500 mx-auto mb-4" />
                         <p className="text-sm font-medium text-slate-300">Volunteer unit is currently managing <span className="text-blue-500 font-bold">{selected.activeCases || 0} cases</span> in the {selected.taluk} sector.</p>
                      </div>
                      <button onClick={() => setSelected(null)} className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 hover:bg-blue-500 hover:scale-[1.02] transition-all">
                         Assign New Sector Protocol
                      </button>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}

=======
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <Toaster position="top-center" />
      <div className="w-full overflow-hidden bg-[#922B21] py-1.5 relative z-[1001]">
        <div
          className="whitespace-nowrap text-white text-[11px] font-black uppercase tracking-widest"
          style={{
            display: 'inline-block',
            animation: 'ticker 35s linear infinite'
          }}
        >
          🔴 LIVE — KrishiManthan 2026 — Hassan District, 
          Karnataka — Farmer Distress Early Warning System — 
          47 farmers lost every day in India — KrishiManas 
          watches before it is too late 🌾 — 
          Passive Detection. Contextual Intervention. 
          Community Infrastructure. — 
          Build. Innovate. Disrupt. — 
          PS-05 Open Innovation — ME-RIISE Foundation @ 
          MCE Hassan — AIR Hassan 101.4 FM Partner — 
          🔴 LIVE — KrishiManthan 2026 — Hassan District —
        </div>
      </div>
      {/* Header */}
      <nav className="h-16 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-[1000]">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-teal-500 font-black text-2xl tracking-tighter transition-all hover:opacity-80">
            <Home size={22} /> KrishiManas
          </button>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            <MapPin size={12} className="text-teal-500" /> {adminData?.district || 'Hassan'} District Command
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${liveMode ? 'bg-system-green animate-pulse shadow-[0_0_8px_#00e676]' : 'bg-slate-700'}`}></div>
            <button onClick={() => setLiveMode(!liveMode)} className={`text-[10px] font-black uppercase tracking-widest ${liveMode ? 'text-teal-500' : 'text-slate-500 hover:text-slate-300'}`}>
              {liveMode ? 'Live Mode Active' : 'Enable Live Feed'}
            </button>
          </div>
          <div className="text-xs font-mono text-slate-500 tabular-nums bg-white/5 px-3 py-1 rounded-lg border border-white/5">
            {new Date().toLocaleTimeString('en-IN', { hour12: false })}
          </div>
        </div>
      </nav>

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard icon={Users} label="Total Farmers" value={farmers.length} />
          <StatCard icon={AlertTriangle} label="Urgent (Red)" value={stats.red} color="text-red-500" />
          <StatCard icon={TrendingUp} label="Warning (Yellow)" value={stats.yellow} color="text-orange-500" />
          <StatCard icon={CheckCircle} label="Stable (Green)" value={stats.green} color="text-emerald-500" />
          <StatCard icon={Activity} label="Avg Distress" value={stats.avg} color={stats.avg >= 65 ? 'text-red-500' : stats.avg >= 35 ? 'text-orange-500' : 'text-emerald-500'} />
          <StatCard icon={Bell} label="SMS Broadcasts" value={alertLog.length} color="text-teal-500" sub="Sector Alerts Fired" />
        </div>

        {/* Main Workspace */}
        <div className="grid xl:grid-cols-12 gap-6 items-start">

          {/* Left: Map & Charts */}
          <div className="xl:col-span-8 space-y-6">

            {/* Map Container */}
            <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden relative group">
              <div className="absolute top-4 left-4 z-[999] bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-3 px-4 flex items-center gap-4">
                <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-teal-500">
                  <Map size={14} /> Spatial Risk Matrix
                </div>
                <div className="h-4 w-[1px] bg-white/10"></div>
                <div className="flex gap-4 text-[9px] font-bold uppercase text-slate-400">
                  {viewMode === 'farmers' ? (
                    <>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Red</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Yellow</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Green</span>
                    </>
                  ) : (
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span> Mitra Active</span>
                  )}
                </div>
              </div>

              <MapContainer
                center={[13.007, 76.1]}
                zoom={10}
                style={{ height: '520px', background: '#020617' }}
                className="[&_.leaflet-control-zoom]:border-none [&_.leaflet-control-zoom-in]:bg-black/60 [&_.leaflet-control-zoom-out]:bg-black/60 [&_.leaflet-control-zoom-in]:text-white [&_.leaflet-control-zoom-out]:text-white [&_.leaflet-control-attribution]:hidden"
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

                {/* Render Farmers */}
                {viewMode === 'farmers' && farmers.map(f => (
                  <CircleMarker
                    key={f.id}
                    center={[f.lat, f.lng]}
                    radius={f.status === 'Red' ? 12 : f.status === 'Yellow' ? 9 : 7}
                    pathOptions={{
                      fillColor: STATUS_COLOR[f.status],
                      color: '#ffffff',
                      fillOpacity: 0.8,
                      weight: selected?.id === f.id ? 3 : 0.5,
                    }}
                    eventHandlers={{
                      click: () => setSelected(f),
                      mouseover: (e) => e.target.openTooltip()
                    }}
                  >
                    <LeafletTooltip className="!bg-slate-900 !border-slate-800 !text-white !rounded-xl !p-0 !overflow-hidden !shadow-2xl">
                      <div className="p-3 bg-slate-900 min-w-[160px]">
                        <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${f.status === 'Red' ? 'text-red-500' : f.status === 'Yellow' ? 'text-orange-500' : 'text-emerald-500'}`}>
                          {f.status} Risk Zone
                        </div>
                        <div className="font-black text-sm text-white mb-0.5">{f.name}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">{f.taluk} · {f.crop}</div>
                      </div>
                    </LeafletTooltip>
                  </CircleMarker>
                ))}

                {/* Render Mitras */}
                {viewMode === 'mitras' && mitras.map(m => (
                  <CircleMarker
                    key={m.id}
                    center={[m.lat, m.lng]}
                    radius={10}
                    pathOptions={{
                      fillColor: '#3b82f6',
                      color: '#60a5fa',
                      fillOpacity: 0.9,
                      weight: selected?.id === m.id ? 4 : 2,
                    }}
                    eventHandlers={{
                      click: () => setSelected(m),
                      mouseover: (e) => e.target.openTooltip()
                    }}
                  >
                    <LeafletTooltip className="!bg-slate-900 !border-slate-800 !text-white !rounded-xl !p-0 !overflow-hidden !shadow-2xl">
                      <div className="p-3 bg-slate-900 min-w-[160px]">
                        <div className="text-[8px] font-black uppercase tracking-widest mb-1 text-blue-400">
                          Krishi Mitra Unit
                        </div>
                        <div className="font-black text-sm text-white mb-0.5">{m.name}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">{m.taluk} Sector</div>
                      </div>
                    </LeafletTooltip>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>

            {/* Sub Charts */}
            <div className="space-y-6">
              
              {/* Row 1: Trend + Sector side by side */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Trend Chart */}
              <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-6 h-[320px] flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <LineIcon size={16} className="text-teal-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Historical Distress Trend (14D)</span>
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TREND_DATA}>
                      <defs>
                        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="day" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                        itemStyle={{ color: '#14b8a6', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#trendGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-6 h-[320px] flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 size={16} className="text-teal-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sector Risk Distribution</span>
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={talukData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#ffffff30" fontSize={9} width={90} axisLine={false} tickLine={false} />
                      <RechartsTooltip
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                      />
                      <Bar dataKey="Red" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} barSize={10} />
                      <Bar dataKey="Yellow" stackId="a" fill="#f59e0b" />
                      <Bar dataKey="Green" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Row 2: Season Comparison — full width */}
            <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-6">
              
              {/* Alur callout box */}
              <div className="mb-4 px-4 py-3 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center gap-3">
                <span className="text-orange-400 text-lg">⚠️</span>
                <div>
                  <div className="text-orange-400 font-black text-sm">
                    Alur taluk distress up 61% this season
                  </div>
                  <div className="text-orange-300 text-[11px] font-medium">
                    ಅಲೂರು ತಾಲ್ಲೂಕು ತೊಂದರೆ ಕಳೆದ ಋತುವಿಗಿಂತ 61% ಹೆಚ್ಚಾಗಿದೆ
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={16} className="text-teal-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  This Season vs Last Season — Distress by Taluk
                </span>
              </div>

              <div style={{ height: '260px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={SEASON_COMPARISON}
                    margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#ffffff05" 
                      vertical={false} 
                    />
                    <XAxis
                      dataKey="taluk"
                      stroke="#ffffff20"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#ffffff20"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: '#020617',
                        border: '1px solid #ffffff10',
                        borderRadius: '12px',
                        fontSize: '11px'
                      }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Bar 
                      dataKey="last" 
                      name="Last Season" 
                      fill="#64748B" 
                      radius={[4, 4, 0, 0]} 
                      barSize={18}
                    />
                    <Bar 
                      dataKey="this" 
                      name="This Season" 
                      fill="#0D7377" 
                      radius={[4, 4, 0, 0]} 
                      barSize={18}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-3 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#64748B]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Last Season
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#0D7377]" />
                  <span className="text-[10px] font-bold text-teal-500 uppercase">
                    This Season
                  </span>
                </div>
              </div>
            </div>

          </div>
          </div>

          {/* Right: Farmer Details & Actions */}
          <aside className="xl:col-span-4 space-y-6 lg:sticky lg:top-[88px]">

            {/* Intel Panel */}
            <div className={`bg-[#0f172a] border rounded-3xl p-6 transition-all duration-500 relative overflow-hidden ${selected ? 'border-teal-500/30' : 'border-white/5'}`}>
              <div className="absolute -right-8 -top-8 text-teal-500 opacity-[0.03] rotate-12">
                <Info size={240} />
              </div>

              {selected ? (
                <div className="relative z-10 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${selected?.score ? (selected.status === 'Red' ? 'text-red-500' : selected.status === 'Yellow' ? 'text-orange-500' : 'text-emerald-500') : 'text-blue-500'}`}>
                        {selected?.score ? `Priority Entity : ${selected.status} Phase` : 'Krishi Mitra Unit'}
                      </div>
                      <h2 className="text-3xl font-black text-white tracking-tighter">{selected.name}</h2>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Close</button>
                  </div>

                  {selected?.score && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <Activity size={10} /> Live Score
                        </div>
                        <div className={`text-4xl font-black tabular-nums ${selected.status === 'Red' ? 'text-red-500' : selected.status === 'Yellow' ? 'text-orange-500' : 'text-emerald-500'}`}>
                          {selected.score}
                        </div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <TrendingUp size={10} /> Overdue
                        </div>
                        <div className="text-xl font-black text-white mt-1 uppercase tracking-tighter">
                          {selected.loanDaysOverdue} <span className="text-[10px] text-slate-500">Days</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selected?.casesResolved !== undefined && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <CheckCircle size={10} /> Cases Closed
                        </div>
                        <div className="text-4xl font-black tabular-nums text-blue-400">
                          {selected.casesResolved}
                        </div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <Activity size={10} /> Active Load
                        </div>
                        <div className="text-xl font-black text-white mt-1 uppercase tracking-tighter">
                          {selected.activeCases} <span className="text-[10px] text-slate-500">Farmers</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selected?.score && (
                    <div className="space-y-4">
                      <div className="text-[9px] font-black uppercase text-teal-500 tracking-[0.2em] flex items-center gap-2">
                        Matched Scheme Proposals <div className="h-[1px] flex-1 bg-teal-500/10"></div>
                      </div>
                      <div className="grid gap-2">
                        {matchSchemes({ score: selected.score, crop: selected.crop, taluk: selected.taluk, loanDaysOverdue: selected.loanDaysOverdue }).schemes.slice(0, 3).map(s => (
                          <div key={s.id} className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:bg-white/[0.08] transition-colors">
                            <div>
                              <div className="text-[11px] font-bold text-white mb-0.5">{s.name}</div>
                              <div className="text-[9px] text-slate-500 font-bold uppercase">{s.benefit}</div>
                            </div>
                            <div className="text-teal-500"><CheckCircle size={14} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className={`w-full py-4 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all hover:scale-[1.02] shadow-xl ${selected?.score ? 'bg-teal-500 text-[#020617] hover:bg-teal-400 shadow-teal-500/10' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10'}`}>
                    {selected?.score ? 'Deploy Immediate Support' : 'Dispatch Assignment'}
                  </button>
                </div>
              ) : (
                <div className="h-[460px] flex flex-col relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity size={18} className="text-teal-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Global Operations Feed</span>
                    <span className="ml-auto w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_#14b8a6]"></span>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {globalLogs.map((log) => (
                      <div key={log.id} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex gap-4 items-start group hover:bg-white/[0.05] transition-all">
                        <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${log.type === 'SOS' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : log.type === 'CLAIM' ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : log.type === 'CHECKIN' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-teal-500 shadow-[0_0_8px_#14b8a6]'}`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-baseline mb-1">
                            <div className="text-[9px] font-black tracking-widest uppercase text-slate-500">{log.type}</div>
                            <div className="text-[9px] font-bold text-slate-600 uppercase">{log.time}</div>
                          </div>
                          <div className="text-[13px] font-medium text-slate-300 leading-snug">
                            {log.msg}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
                </div>
              )}
            </div>

            {/* Emergency Protocols */}
            <div className={`rounded-3xl p-6 border transition-all duration-1000 ${stats.red > 0 ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-border-white/5'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Bell size={18} className={stats.red > 0 ? 'text-red-500 animate-pulse' : 'text-slate-500'} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Emergency Broadcast Protocol</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed uppercase tracking-tighter mb-6 opacity-70">
                Mass notification system for <span className="text-red-500 font-black">{stats.red} Farmers</span> in critical sectors.
                Encrypted SMS will be dispatched to assigned regional centers.
              </p>
              <button
                onClick={handleDemoAlert}
                disabled={alerting || stats.red === 0}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${stats.red > 0
                    ? 'bg-red-600 text-white hover:bg-red-500 shadow-xl shadow-red-600/20'
                    : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                  }`}
              >
                {alerting ? <><Loader2 className="animate-spin" size={16} /> Firing...</> : <><Bell size={16} /> Broadcast Alert</>}
              </button>
              <button
                onClick={() => setBroadcastOpen(true)}
                className="w-full mt-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all bg-teal-500/10 text-teal-500 hover:bg-teal-500/20 shadow-xl shadow-teal-500/5 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-teal-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">📻 AIR Hassan Broadcast</span>
              </button>
              {alertLog.length > 0 && (
                <div className="mt-4 bg-black/40 rounded-xl p-3 border border-white/5 max-h-32 overflow-y-auto space-y-1">
                  {alertLog.map((log, i) => (
                    <div key={i} className="text-[9px] font-mono text-teal-500 opacity-80">{log}</div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-6">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-teal-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Signal Correlation Analysis
                  </span>
                </div>
                <div className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
                  <span className="text-teal-400 font-black text-sm">
                    ρ = 0.73
                  </span>
                </div>
              </div>

              {/* Correlation stat */}
              <div className="mb-4 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">
                  Weather — Distress Correlation
                </div>
                <div className="text-2xl font-black text-teal-400">
                  0.73
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-1">
                  Hassan District — Last 30 Days
                </div>
              </div>

              {/* Scatter chart */}
              <div style={{ height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                    <XAxis
                      dataKey="rainfall"
                      name="Rainfall"
                      unit="mm"
                      stroke="#ffffff20"
                      fontSize={9}
                      axisLine={false}
                      tickLine={false}
                      label={{
                        value: 'Rainfall (mm)',
                        position: 'insideBottom',
                        offset: -2,
                        fill: '#475569',
                        fontSize: 9
                      }}
                    />
                    <YAxis
                      dataKey="score"
                      name="Distress"
                      stroke="#ffffff20"
                      fontSize={9}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                    />
                    <ZAxis range={[40, 40]} />
                    <RechartsTooltip
                      cursor={{ strokeDasharray: '3 3', stroke: '#ffffff20' }}
                      contentStyle={{
                        backgroundColor: '#020617',
                        border: '1px solid #ffffff10',
                        borderRadius: '8px',
                        fontSize: '10px'
                      }}
                      formatter={(value, name) => [value, name]}
                    />
                    <Scatter
                      data={CORRELATION_DATA}
                      fill="#0D7377"
                      opacity={0.8}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Insight */}
              <div className="mt-3 p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <p className="text-[10px] text-orange-300 font-medium leading-relaxed italic">
                  "Alur taluk — 48mm rain on March 14 — 
                  distress spike detected within 72 hours"
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Tactical Registry Table */}
        <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setViewMode('farmers')}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${viewMode === 'farmers' ? 'text-teal-400' : 'text-slate-500 hover:text-white'}`}
              >
                <Search size={16} /> Farmer Entities
              </button>
              <div className="w-[1px] h-4 bg-white/10" />
              <button
                onClick={() => setViewMode('mitras')}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${viewMode === 'mitras' ? 'text-blue-400' : 'text-slate-500 hover:text-white'}`}
              >
                <Users size={16} /> Mitra Volunteers
              </button>
            </div>
            <span className="bg-white/5 px-2 py-0.5 rounded text-[8px] font-black text-slate-500 uppercase">
              {viewMode === 'farmers' ? farmers.length : mitras.length} Units Active
            </span>
          </div>
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01] text-[9px] uppercase font-black text-slate-500 tracking-widest">
                  <th className="px-6 py-4">Status / Role</th>
                  <th className="px-6 py-4">{viewMode === 'farmers' ? 'Farmer Entity' : 'Volunteer Name'}</th>
                  <th className="px-6 py-4">Operational Sector</th>
                  <th className="px-6 py-4">{viewMode === 'farmers' ? 'Primary Crop' : 'Active Cases'}</th>
                  <th className="px-6 py-4 text-right tabular-nums">{viewMode === 'farmers' ? 'Distress Index' : 'Resolved'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {viewMode === 'farmers' ? (
                  [...farmers].sort((a, b) => b.score - a.score).map(f => (
                    <tr
                      key={f.id}
                      onClick={() => setSelected(f)}
                      className={`cursor-pointer transition-all hover:bg-white/[0.03] group ${selected?.id === f.id ? 'bg-teal-500/5' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ${f.status === 'Red' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : f.status === 'Yellow' ? 'bg-orange-500 shadow-[0_0_8px_#f59e0b]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`}></div>
                          <span className={`text-[10px] font-black uppercase tracking-tighter ${f.status === 'Red' ? 'text-red-500' : f.status === 'Yellow' ? 'text-orange-500' : 'text-emerald-500'}`}>{f.status} Risk</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-black text-sm text-slate-200 group-hover:text-white transition-colors">{f.name}</div>
                        <div className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">HASSAN // {f.id.toUpperCase()}</div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{f.taluk}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[9px] font-black text-slate-400 uppercase tracking-tighter">{f.crop}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-xl font-black tabular-nums transition-colors ${f.status === 'Red' ? 'text-red-500' : f.status === 'Yellow' ? 'text-orange-500' : 'text-emerald-500'}`}>{f.score}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  [...mitras].map(m => (
                    <tr
                      key={m.id}
                      onClick={() => setSelected(m)}
                      className={`cursor-pointer transition-all hover:bg-white/[0.03] group ${selected?.id === m.id ? 'bg-blue-500/5' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ${m.status === 'Available' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : m.status === 'Overloaded' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                          <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Mitra Unit</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-black text-sm text-slate-200 group-hover:text-white transition-colors">{m.name}</div>
                        <div className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">VOLUNTEER // {m.id.toUpperCase()}</div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{m.taluk}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[9px] font-black text-white uppercase tracking-tighter">{m.activeCases} Open</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xl font-black tabular-nums transition-colors text-blue-500">{m.casesResolved}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {broadcastOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2000] flex items-center justify-center p-6">
          <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-xl">
                📻
              </div>
              <div>
                <div className="font-black text-white text-lg">
                  AIR Hassan Broadcast
                </div>
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                  ಆಕಾಶವಾಣಿ ಹಾಸನ ಪ್ರಸಾರ — 101.4 FM
                </div>
              </div>
            </div>

            {/* Taluk Selector */}
            <div className="mb-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                Select Taluk / ತಾಲ್ಲೂಕು ಆಯ್ಕೆ ಮಾಡಿ
              </label>
              <select
                value={broadcastTaluk}
                onChange={e => setBroadcastTaluk(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-sm focus:outline-none focus:border-teal-500/50"
              >
                {['Hassan','Alur','Sakleshpur','Arsikere',
                  'Belur','Channarayapatna',
                  'Holenarasipur','Arakalagudu'].map(t => (
                  <option key={t} value={t} className="bg-[#0f172a]">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Message Preview */}
            <div className="mb-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                Broadcast Message Preview
              </label>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-slate-300 text-sm font-medium leading-relaxed mb-3">
                  ಹಾಸನ್ ಜಿಲ್ಲೆಯ {broadcastTaluk} ತಾಲ್ಲೂಕಿನ ರೈತ 
                  ಬಾಂಧವರೇ — PM ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆಗೆ ಮಾರ್ಚ್ 31 
                  ರೊಳಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ. ಹತ್ತಿರದ CSC ಕೇಂದ್ರಕ್ಕೆ 
                  ಭೇಟಿ ನೀಡಿ. ನಿಮ್ಮ ಕೃಷಿ ಮಿತ್ರರನ್ನು ಸಂಪರ್ಕಿಸಿ.
                </p>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                  Farmers of {broadcastTaluk} taluk, Hassan district — 
                  Apply for PMFBY crop insurance before March 31. 
                  Visit your nearest CSC. Contact your Krishi Mitra.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setBroadcastOpen(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleBroadcast}
                disabled={broadcastSent}
                className="flex-1 py-3 rounded-xl bg-teal-500 text-[#020617] font-black text-xs uppercase tracking-widest hover:bg-teal-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {broadcastSent ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#020617]/30 border-t-[#020617] rounded-full animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  '📻 Confirm Broadcast'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

>>>>>>> origin/Pragyan
    </div>
  );
}

const X = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
