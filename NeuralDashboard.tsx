import React, { useState, useRef } from 'react';
import type { OrderDetails } from './types';
import Logo from './Logo';
import Card from './ui/Card';
import { GoogleGenAI } from '@google/genai';

interface NeuralDashboardProps {
  details: OrderDetails;
  onLogout: () => void;
}

const NeuralDashboard: React.FC<NeuralDashboardProps> = ({ details, onLogout }) => {
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVeoGenerate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check for API key selection for Veo models
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Proceed assuming success per instructions
    }

    setIsGeneratingVideo(true);
    setUploadProgress('Analyzing visual frequency...');
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        setUploadProgress('Calibrating Neural Vision Model...');
        
        let operation = await ai.models.generateVideos({
          model: 'veo-3.1-fast-generate-preview',
          prompt: `A cinematic manifesting visualization for ${details.goal}: ${details.detailedGoal}. The video should be ethereal, gold-themed, and highly professional.`,
          image: {
            imageBytes: base64Data,
            mimeType: file.type,
          },
          config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio
          }
        });

        const statusUpdates = [
            'Projecting quantum reality...',
            'Encoding neural pathways...',
            'Mastering visual layers...',
            'Finalizing manifestation loop...'
        ];
        let statusIdx = 0;

        while (!operation.done) {
          setUploadProgress(statusUpdates[statusIdx % statusUpdates.length]);
          statusIdx++;
          await new Promise(resolve => setTimeout(resolve, 8000));
          operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
          const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
          const blob = await response.blob();
          setVideoUrl(URL.createObjectURL(blob));
        }
      };
    } catch (error) {
      console.error("Video Generation Error:", error);
      alert("Neural sync error. Please try a different image.");
    } finally {
      setIsGeneratingVideo(false);
      setUploadProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Dashboard Nav */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-3xl px-8 py-6 flex justify-between items-center fixed top-0 w-full z-[100]">
        <Logo className="scale-75 origin-left" />
        <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500/60">Neural ID</span>
                <span className="text-xs font-bold text-white uppercase">{details.email}</span>
            </div>
            <button 
              onClick={onLogout} 
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all active:scale-90"
              title="Logout"
            >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 container mx-auto max-w-7xl animate-fade-in">
        <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2">Command Center</h1>
            <p className="text-amber-500/40 text-[10px] font-black uppercase tracking-[0.4em]">Active Manifestation Protocols for {details.name}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Status */}
            <Card className="lg:col-span-2 p-10 bg-black/40 border-amber-500/10 shadow-[0_0_80px_rgba(245,158,11,0.05)]">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h2 className="text-2xl font-black uppercase mb-1 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{details.plan?.name || 'Quantum Blueprint'}</h2>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Order Status: <span className="text-amber-500/80">Active Calibration</span></p>
                    </div>
                    <span className="bg-amber-500/10 text-amber-500 px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-500/20 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                        Studio Engineering In Progress
                    </span>
                </div>

                {/* Veo Visualizer Section */}
                <div className="mt-8 p-8 border border-white/5 rounded-[2rem] bg-gradient-to-br from-amber-500/[0.03] to-transparent">
                  <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Quantum Vision Lab (Veo)
                  </h3>
                  
                  {videoUrl ? (
                    <div className="space-y-6">
                      <video 
                        src={videoUrl} 
                        controls 
                        className="w-full rounded-2xl border border-amber-500/20 shadow-2xl"
                        autoPlay
                        loop
                      />
                      <button 
                        onClick={() => {setVideoUrl(null); if(fileInputRef.current) fileInputRef.current.value = '';}}
                        className="text-[9px] text-amber-500 uppercase font-black tracking-widest hover:text-white transition-colors"
                      >
                        Reset Engineering Protocol
                      </button>
                    </div>
                  ) : isGeneratingVideo ? (
                    <div className="aspect-video flex flex-col items-center justify-center bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
                      <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-6"></div>
                      <p className="text-amber-500 text-xs font-black uppercase tracking-widest animate-pulse">{uploadProgress}</p>
                      <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] mt-2">Quantum Rendering Cycle: ~120s</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/5 rounded-2xl hover:border-amber-500/20 transition-all group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleVeoGenerate}
                      />
                      
                      <div className="flex gap-4 mb-8">
                        <button 
                            onClick={() => setAspectRatio('16:9')}
                            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${aspectRatio === '16:9' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}
                        >
                            16:9 (Landscape)
                        </button>
                        <button 
                            onClick={() => setAspectRatio('9:16')}
                            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${aspectRatio === '9:16' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}
                        >
                            9:16 (Portrait)
                        </button>
                      </div>

                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-4 group/up"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/up:bg-amber-500/10 group-hover/up:border-amber-500/40 transition-all">
                            <svg className="w-8 h-8 text-white/20 group-hover/up:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-black uppercase tracking-widest text-white mb-1">Upload Subconscious Starting Image</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Veo AI will animate your reality from this frame</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-8 p-10 bg-black/60 rounded-[2.5rem] border border-white/5 italic text-lg md:text-2xl text-gray-300 font-light leading-relaxed shadow-inner">
                    <span className="text-amber-500/30 text-4xl font-serif mr-2">"</span>
                    {details.detailedGoal}
                    <span className="text-amber-500/30 text-4xl font-serif ml-2">"</span>
                </div>
            </Card>

            {/* Sidebar Tools */}
            <div className="space-y-8">
                <Card className="p-8 bg-teal-500/[0.03] border-teal-500/20 shadow-[0_0_60px_rgba(45,212,191,0.05)]">
                    <h3 className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Neural Protocol</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 font-medium">
                        Your frequency code is being calibrated for <strong className="text-teal-400 uppercase tracking-tighter">{details.voice === 'male' ? 'Divine Masculine' : 'Divine Feminine'}</strong> vocal resonance to maximize bypass of the Critical Filter.
                    </p>
                    <div className="flex items-center gap-3 text-[9px] font-black text-teal-500/60 uppercase tracking-[0.2em]">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
                        Direct Link to Studio Lead
                    </div>
                </Card>

                <Card className="p-8 bg-white/[0.02] border-white/5">
                    <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Master Blueprint Specs</h3>
                    <div className="space-y-5">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                            <span className="text-gray-500 uppercase tracking-widest">Audio Format</span>
                            <span className="text-white/80">WAV 24-bit / 48kHz</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-bold">
                            <span className="text-gray-500 uppercase tracking-widest">Visual Quality</span>
                            <span className="text-white/80">4K Cinematic Master</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-bold">
                            <span className="text-gray-500 uppercase tracking-widest">Neural Layer</span>
                            <span className="text-white/80">Binaural Alpha/Theta</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-bold">
                            <span className="text-gray-500 uppercase tracking-widest">Induction</span>
                            <span className="text-white/80">High-Fidelity Neural Voice</span>
                        </div>
                    </div>
                </Card>

                <button className="w-full py-5 rounded-[1.5rem] border border-amber-500/30 bg-amber-500/5 text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-amber-500 hover:text-black transition-all duration-500 shadow-xl">
                    Contact Engineering Lead
                </button>
            </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default NeuralDashboard;