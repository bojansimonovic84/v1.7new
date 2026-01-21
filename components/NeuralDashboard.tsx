
import React from 'react';
import type { OrderDetails } from '../types';
import Logo from './Logo';
import Card from './ui/Card';

interface NeuralDashboardProps {
  details: OrderDetails;
  onLogout: () => void;
}

const NeuralDashboard: React.FC<NeuralDashboardProps> = ({ details, onLogout }) => {
  const phases = [
    { name: 'Neural Scripting', status: 'completed', desc: 'Initial AI blueprint finalized.' },
    { name: 'Audio Engineering', status: 'active', desc: 'Senior designers recording vocal layers and binaural beats.' },
    { name: 'Visual Synthesis', status: 'pending', desc: 'Hand-mastering cinematic manifestation video.' },
    { name: 'Final Mastering', status: 'pending', desc: 'Quality control and delivery encryption.' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-3xl px-8 py-6 flex justify-between items-center fixed top-0 w-full z-[100]">
        <Logo className="scale-75 origin-left" />
        <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500/60">Client Neural ID</span>
                <span className="text-xs font-bold text-white uppercase">{details.email}</span>
            </div>
            <button 
              onClick={onLogout} 
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"
            >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 container mx-auto max-w-7xl">
        <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2">Command Center</h1>
            <p className="text-amber-500/40 text-[10px] font-black uppercase tracking-[0.4em]">Active Project Status for {details.name}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-10 bg-black/40 border-amber-500/10 shadow-[0_0_80px_rgba(245,158,11,0.05)]">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h2 className="text-2xl font-black uppercase mb-1 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{details.plan?.name}</h2>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Target: <span className="text-amber-500/80">{details.goal}</span></p>
                    </div>
                    <span className="bg-amber-500/10 text-amber-500 px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-500/20 animate-pulse">
                        Engineering In Progress
                    </span>
                </div>

                <div className="space-y-8">
                  <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-4">Studio Roadmap</h3>
                  <div className="space-y-6 pl-4 border-l border-white/5">
                    {phases.map((p, i) => (
                      <div key={i} className="relative">
                        <div className={`absolute -left-[21px] top-1 w-2 h-2 rounded-full ${p.status === 'completed' ? 'bg-teal-500' : p.status === 'active' ? 'bg-amber-500 animate-ping' : 'bg-white/10'}`} />
                        <h4 className={`text-xs font-black uppercase tracking-widest ${p.status === 'pending' ? 'text-white/20' : 'text-white'}`}>{p.name}</h4>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 p-10 bg-black/60 rounded-[2.5rem] border border-white/5 italic text-lg text-gray-300 font-light leading-relaxed">
                    <p className="text-amber-500/40 text-[9px] font-black uppercase tracking-[0.4em] mb-4 not-italic">Neural Intention (Active Locked)</p>
                    "{details.detailedGoal}"
                </div>
            </Card>

            <div className="space-y-8">
                <Card className="p-8 bg-teal-500/[0.03] border-teal-500/20">
                    <h3 className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Master Architect Message</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                      Your frequency code is being meticulously hand-engineered by our senior team. Expect delivery via encrypted link to <span className="text-teal-400 font-bold">{details.email}</span> within 2-4 business days.
                    </p>
                </Card>

                <Card className="p-8 bg-white/[0.02] border-white/5">
                    <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Specifications</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-gray-500 uppercase">Voice Resonance</span>
                            <span className="text-white/80 uppercase">{details.voice} Tone</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-gray-500 uppercase">Resonance Tier</span>
                            <span className="text-white/80 uppercase">{details.plan?.name}</span>
                        </div>
                    </div>
                </Card>

                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center">
                  <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-4">Question about your order?</p>
                  <button className="w-full py-4 rounded-xl bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                    Open Studio Messenger
                  </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default NeuralDashboard;
