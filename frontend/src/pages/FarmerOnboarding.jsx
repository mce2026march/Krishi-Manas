import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, User, MapPin, CreditCard, Leaf, Calculator, ArrowRight, Loader2, Home } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { useLang } from '../contexts/LanguageContext';
import { calculateDistressScore } from '../utils/scoring';
import { useAuth } from '../contexts/AuthContext';
import { db, fb, doc, updateDoc, serverTimestamp } from '../utils/firebase';

const TALUKS = ['Hassan', 'Alur', 'Sakleshpur', 'Arsikere', 'Belur', 'Channarayapatna', 'Holenarasipur', 'Arakalagudu'];

const VoiceInput = ({ label, field, value, onChange, onResult, lang, type = "text" }) => {
  const { isListening, startListening } = useSpeech(onResult);
  return (
<<<<<<< HEAD
    <div className="mb-6">
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-l-2 border-teal-500 pl-2 ml-1">{label}</label>
      <div className="relative flex items-center group">
        <input 
=======
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative flex items-center">
        <input
>>>>>>> origin/Pragyan
          id={field} type={type} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#0f172a] border border-white/5 rounded-2xl p-4 pr-14 text-white font-bold focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/40 transition-all outline-none"
        />
        <button
          type="button" onClick={() => startListening(lang)}
          className={`absolute right-3 p-2.5 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-slate-500 hover:text-teal-500 hover:bg-white/10'}`}
        >
          <Mic size={20} />
        </button>
      </div>
    </div>
  );
};

export default function FarmerOnboarding() {
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '', village: '', taluk: 'Hassan', aadhaar: '',
    crop: '', cropOutcome: 'Good', landSize: '',
    loanDaysOverdue: 0, marketActivity: 'Active',
    scoreOffset: 0
  });

  const handleVoiceInput = (field, result) => {
    const text = result.toLowerCase();
<<<<<<< HEAD
    
=======
    console.log("Voice recognized:", text);

    // Voice rules
>>>>>>> origin/Pragyan
    if (text.includes('ಬೆಳೆ ಹಾಳಾಯಿತು') || text.includes('crop failed') || text.includes('failed')) {
      setFormData(prev => ({ ...prev, cropOutcome: 'Failed' }));
    }
    else if (text.includes('ಸಾಲ') || text.includes('loan')) {
      if (text.includes('overdue')) setFormData(prev => ({ ...prev, loanDaysOverdue: 60 }));
      document.getElementById('loanDaysOverdue')?.focus();
    }
    else {
      let val = text;
      if (field === 'landSize' || field === 'loanDaysOverdue' || field === 'aadhaar') {
        const numbers = text.match(/\d+(\.\d+)?/g);
        if (numbers) val = numbers.join('');
      }
      setFormData(prev => ({ ...prev, [field]: val }));
    }
  };

<<<<<<< HEAD
  const loadDemo = () => {
    setFormData({
      name: 'Ramesh Kumar', village: 'Alur HQ', taluk: 'Alur', aadhaar: '1234 5678 9012',
      crop: 'Paddy', cropOutcome: 'Failed', landSize: '2.5',
      loanDaysOverdue: 60, marketActivity: 'Inactive', scoreOffset: 8
    });
    setStep(3);
=======
  const { isListening, startListening } = useSpeech();

  const loadDemo = async () => {
    const demoData = {
      name: 'Ramesh Kumar',
      village: 'Alur HQ',
      taluk: 'Alur',
      aadhaar: '1234 5678 9012',
      crop: 'Paddy',
      cropOutcome: 'Failed',
      landSize: '2.5',
      loanDaysOverdue: 60,
      marketActivity: 'Inactive',
      selfCheckin: 'Bad',
      scoreOffset: 0
    };
    setFormData(demoData);
    setLoading(true);
    
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + '/api/farmers',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(demoData)
        }
      );
      const data = await res.json();
      localStorage.setItem(
        'krishimanas_farmer', 
        JSON.stringify(data)
      );
    } catch(e) {
      const score = 78;
      const fallback = {
        farmer: { ...demoData, id: 'f_demo', score },
        score,
        status: 'Red',
        trajectory: 'Worsening',
        schemes: [
          {
            id: 'sc1',
            name: 'PM Fasal Bima Yojana',
            benefit: '₹2 lakh crop insurance',
            deadline: 'March 31 2026',
            documents: ['Aadhaar', 'Land Records', 
                        'Bank Passbook', 'Crop Loss Photo'],
            eligibilityReason: 'Your crop failed this season',
            eligibilityReasonKannada: 
              'ನಿಮ್ಮ ಬೆಳೆ ಈ ಋತುವಿನಲ್ಲಿ ವಿಫಲವಾಗಿದೆ'
          },
          {
            id: 'sc2',
            name: 'Karnataka Raitha Siri',
            benefit: '₹10,000 per hectare',
            deadline: 'April 15 2026',
            documents: ['Aadhaar', 'RTC', 
                        'Bank Passbook'],
            eligibilityReason: 
              'Crop failure confirmed in Karnataka',
            eligibilityReasonKannada: 
              'ಕರ್ನಾಟಕದಲ್ಲಿ ಬೆಳೆ ನಷ್ಟ ದೃಢಪಟ್ಟಿದೆ'
          }
        ],
        mitra: { 
          name: 'Suresh Naik', 
          village: 'Alur',
          assigned: ['Alur'] 
        }
      };
      localStorage.setItem(
        'krishimanas_farmer', 
        JSON.stringify(fallback)
      );
    }
    
    setLoading(false);
    navigate('/farmer/dashboard');
>>>>>>> origin/Pragyan
  };

  const submitForm = async () => {
    if (!currentUser?.uid) return;
    setLoading(true);
    try {
      const score = calculateDistressScore(formData);
      const status = score >= 65 ? 'Red' : score >= 35 ? 'Yellow' : 'Green';
      
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        ...formData,
        score,
        status,
        hasOnboarded: true,
        assignedMitraId: null, // Reset for claim
        lastUpdated: serverTimestamp()
      });

      fb.logActivity('REGISTER', `${formData.name} completed onboarding from ${formData.taluk} sector.`);
      
      // Update local cache
      const updated = { ...currentUser, ...formData, score, status, hasOnboarded: true };
      localStorage.setItem('krishimanas_auth_farmer', JSON.stringify(updated));
      
      navigate('/farmer/dashboard');
    } catch (e) {
<<<<<<< HEAD
      console.error("Submission failed", e);
      setLoading(false);
=======
      console.warn("Backend unavailable, using local fallback");
      const score = calculateDistressScore(formData);

      const mockSchemes = [
        { id: 'sc1', name: 'Raitha Siri', benefit: '₹10,000 / hectare', eligibilityReason: 'Crop failed and loan overdue', eligibilityReasonKannada: 'ಬೆಳೆ ವಿಫಲವಾಗಿದೆ ಮತ್ತು ಸಾಲ ಬಾಕಿ ಇದೆ', documents: ['Aadhaar', 'Bank Passbook'], deadline: '15 Days' },
        { id: 'sc2', name: 'Parihara', benefit: 'Immediate relief fund', eligibilityReason: 'High distress score in Alur taluk', eligibilityReasonKannada: 'ಆಲೂರು ತಾಲೂಕಿನಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಂಕಷ್ಟ ಅಂಕ', documents: ['RTC / Pahani', 'Aadhaar'], deadline: '7 Days' }
      ];

      const fakeData = {
        farmer: { ...formData, id: 'f_local', score }, score, trajectory: 'Worsening', status: score >= 65 ? 'Red' : 'Yellow',
        schemes: mockSchemes, mitra: { name: "Suresh Naik", assigned: ["Alur"] }
      };
      localStorage.setItem('krishimanas_farmer', JSON.stringify(fakeData));
      navigate('/farmer/dashboard');
>>>>>>> origin/Pragyan
    }
  };

  const currentScore = calculateDistressScore(formData);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-teal-500/20 overflow-x-hidden">
      <nav className="h-16 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-[1000]">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-teal-500 font-black text-2xl tracking-tighter transition-all hover:opacity-80">
          <Home size={22} /> KrishiManas
        </button>
        <button onClick={loadDemo} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
          Simulation Mode
        </button>
      </nav>

      <div className="max-w-xl mx-auto mt-12 px-6 pb-20">
        <div className="text-center mb-12">
           <h1 className="text-5xl font-black text-white tracking-tighter mb-2">Initialize Deployment</h1>
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Phase {step} // Data Acquisition</p>
        </div>

        {/* Progress Matrix */}
        <div className="flex justify-between mb-12 relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10"></div>
          <div className="absolute top-1/2 left-0 h-[1px] bg-teal-500 shadow-[0_0_8px_#14b8a6] -z-10 transition-all duration-700" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500 ${step >= s ? 'bg-teal-500 text-[#020617] shadow-xl shadow-teal-500/20' : 'bg-[#0f172a] border border-white/10 text-slate-600'}`}>
              {s}
            </div>
          ))}
        </div>

<<<<<<< HEAD
        <div className="bg-[#0f172a]/50 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 text-teal-500 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
             {step === 1 ? <User size={240} /> : step === 2 ? <Leaf size={240} /> : <Calculator size={240} />}
          </div>

          <div className="relative z-10">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-white mb-8 tracking-tighter flex items-center gap-3">
                   <div className="p-2 bg-teal-500/10 text-teal-500 rounded-xl"><User size={20} /></div>
                   Personal Identity
                </h2>
                <VoiceInput label="Full Name" field="name" value={formData.name} onChange={v => setFormData({...formData, name: v})} onResult={res => handleVoiceInput('name', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />
                
                <div className="mb-6">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-l-2 border-teal-500 pl-2 ml-1">Operational Taluk</label>
                  <select 
                    value={formData.taluk} onChange={e => setFormData({...formData, taluk: e.target.value})}
                    className="w-full bg-[#0f172a] border border-white/5 rounded-2xl p-4 text-white font-bold focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/40 transition-all outline-none appearance-none"
                  >
                    {TALUKS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                
                <VoiceInput label="Village Unit" field="village" value={formData.village} onChange={v => setFormData({...formData, village: v})} onResult={res => handleVoiceInput('village', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />
                <VoiceInput label="Aadhaar ID Index" field="aadhaar" type="tel" value={formData.aadhaar} onChange={v => setFormData({...formData, aadhaar: v})} onResult={res => handleVoiceInput('aadhaar', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />
                
                <button 
                  onClick={() => setStep(2)}
                  className="w-full mt-8 bg-teal-500 text-[#020617] py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex justify-center items-center gap-3 hover:bg-teal-400 shadow-xl shadow-teal-500/10 transition-all hover:scale-[1.02] active:scale-95"
=======
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <User className="text-teal-primary" /> Personal Details
              </h2>
              <VoiceInput label="Full Name" field="name" value={formData.name} onChange={v => setFormData({ ...formData, name: v })} onResult={res => handleVoiceInput('name', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Taluk</label>
                <select
                  value={formData.taluk} onChange={e => setFormData({ ...formData, taluk: e.target.value })}
                  className="w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-teal-primary focus:border-teal-primary"
                >
                  {TALUKS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <VoiceInput label="Village Name" field="village" value={formData.village} onChange={v => setFormData({ ...formData, village: v })} onResult={res => handleVoiceInput('village', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />
              <VoiceInput label="Aadhaar ID" field="aadhaar" type="tel" value={formData.aadhaar} onChange={v => setFormData({ ...formData, aadhaar: v })} onResult={res => handleVoiceInput('aadhaar', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />

              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 bg-teal-primary text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-teal-700 transition"
              >
                Next <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <Leaf className="text-system-green" /> Farm Details
              </h2>
              <VoiceInput label="Crop Grown" field="crop" value={formData.crop} onChange={v => setFormData({ ...formData, crop: v })} onResult={res => handleVoiceInput('crop', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />
              <VoiceInput label="Land Size (Acres)" field="landSize" type="number" value={formData.landSize} onChange={v => setFormData({ ...formData, landSize: v })} onResult={res => handleVoiceInput('landSize', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 border-b pb-1">Last Season Outcome</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Good', 'Partial', 'Failed'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setFormData({ ...formData, cropOutcome: opt })}
                      className={`py-2 rounded-md font-medium text-sm border transition ${formData.cropOutcome === opt ? (opt === 'Failed' ? 'bg-system-red text-white border-system-red' : 'bg-teal-primary text-white border-teal-primary') : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="w-1/3 py-3 rounded-lg font-bold border border-gray-300 text-gray-600 hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(3)} className="w-2/3 bg-teal-primary text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-teal-700">Next <ArrowRight size={18} /></button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
                <CreditCard className="text-system-yellow" /> Financial Status
              </h2>

              <VoiceInput label="Loan Days Overdue" field="loanDaysOverdue" type="number" value={formData.loanDaysOverdue} onChange={v => setFormData({ ...formData, loanDaysOverdue: v })} onResult={res => handleVoiceInput('loanDaysOverdue', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 border-b pb-1">Market Activity</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Active', 'Low', 'Inactive'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setFormData({ ...formData, marketActivity: opt })}
                      className={`py-2 rounded-md font-medium text-sm border transition ${formData.marketActivity === opt ? 'bg-navy text-white border-navy' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* LIVE SCORE PREVIEW */}
              <div className={`mt-6 p-4 rounded-lg border-2 flex items-center justify-between ${currentScore >= 65 ? 'bg-system-red/10 border-system-red' : currentScore >= 35 ? 'bg-system-yellow/10 border-system-yellow' : 'bg-system-green/10 border-system-green'}`}>
                <div className="flex items-center gap-3">
                  <Calculator className={currentScore >= 65 ? 'text-system-red animate-pulse' : 'text-gray-600'} />
                  <div>
                    <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Live Distress Score</div>
                    <div className={`text-2xl font-black ${currentScore >= 65 ? 'text-system-red' : currentScore >= 35 ? 'text-system-yellow' : 'text-system-green'}`}>{currentScore} / 100</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(2)} className="w-1/3 py-3 rounded-lg font-bold border border-gray-300 text-gray-600 hover:bg-gray-50">Back</button>
                <button
                  onClick={submitForm}
                  disabled={loading}
                  className="w-2/3 bg-system-red text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-red-700 shadow-lg shadow-red-200"
>>>>>>> origin/Pragyan
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-white mb-8 tracking-tighter flex items-center gap-3">
                   <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl"><Leaf size={20} /></div>
                   Agrarian Metrics
                </h2>
                <VoiceInput label="Primary Crop Segment" field="crop" value={formData.crop} onChange={v => setFormData({...formData, crop: v})} onResult={res => handleVoiceInput('crop', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />
                <VoiceInput label="Land Magnitude (Acres)" field="landSize" type="number" value={formData.landSize} onChange={v => setFormData({...formData, landSize: v})} onResult={res => handleVoiceInput('landSize', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />
                
                <div className="mb-10">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-l-2 border-emerald-500 pl-2 ml-1">Last Harvest Outcome</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Good', 'Partial', 'Failed'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFormData({...formData, cropOutcome: opt})}
                        className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${formData.cropOutcome === opt ? (opt === 'Failed' ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-teal-500 border-teal-500 text-[#020617]') : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="w-1/3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-white/10 text-slate-400 hover:bg-white/5 transition-all">Back</button>
                  <button onClick={() => setStep(3)} className="w-2/3 bg-teal-500 text-[#020617] py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex justify-center items-center gap-3 hover:bg-teal-400 shadow-xl shadow-teal-500/10">Next Phase <ArrowRight size={18} /></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-white mb-8 tracking-tighter flex items-center gap-3">
                   <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-xl"><Calculator size={20} /></div>
                   Intelligence Synthesis
                </h2>
                
                <VoiceInput label="Loan Days Overdue Index" field="loanDaysOverdue" type="number" value={formData.loanDaysOverdue} onChange={v => setFormData({...formData, loanDaysOverdue: v})} onResult={res => handleVoiceInput('loanDaysOverdue', res)} lang={lang === 'kn' ? 'kn-IN' : 'en-IN'} />
                
                <div className="mb-10">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-l-2 border-yellow-500 pl-2 ml-1">Market Engagement Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Active', 'Low', 'Inactive'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFormData({...formData, marketActivity: opt})}
                        className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${formData.marketActivity === opt ? 'bg-yellow-500 border-yellow-500 text-[#020617] shadow-lg shadow-yellow-500/20' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LIVE PREDICTIVE SCORE */}
                <div className={`mt-10 p-6 rounded-[2rem] border-2 flex items-center justify-between transition-all duration-500 ${currentScore >= 65 ? 'bg-red-500/10 border-red-500 shadow-lg shadow-red-500/10' : currentScore >= 35 ? 'bg-yellow-500/10 border-yellow-500' : 'bg-emerald-500/10 border-emerald-500'}`}>
                  <div className="flex items-center gap-4">
                    <div className={currentScore >= 65 ? 'text-red-500 animate-pulse' : 'text-slate-400'}><Calculator size={32} /></div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Predictive Distress Score</div>
                      <div className={`text-4xl font-black tracking-tighter leading-none ${currentScore >= 65 ? 'text-red-500' : currentScore >= 35 ? 'text-yellow-500' : 'text-emerald-500'}`}>{currentScore} <span className="text-xs uppercase tracking-tighter opacity-40">/ 100</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(2)} className="w-1/3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-white/10 text-slate-400 hover:bg-white/5 transition-all">Back</button>
                  <button 
                    onClick={submitForm}
                    disabled={loading}
                    className="w-2/3 bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex justify-center items-center gap-3 hover:bg-red-500 shadow-xl shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Finalize Deployment'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
