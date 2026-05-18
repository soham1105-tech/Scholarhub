import React, { useState, useEffect } from 'react';
import { TopBar } from '../components/TopBar.tsx';
import { BottomNav } from '../components/BottomNav.tsx';
import { SVGIcon } from '../components/SVGIcon.tsx';

export default function Focus() {
  const [secondsLeft, setSecondsLeft] = useState(85 * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [monkMode, setMonkMode] = useState(true);
  const [activeSound, setActiveSound] = useState('rain');

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const totalSeconds = 90 * 60;
  const progress = 1 - secondsLeft / totalSeconds;
  const circumference = 2 * Math.PI * 120;
  const dashOffset = circumference * (1 - progress);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const sounds = [
    { id: 'rain', label: 'Rain', icon: 'volume-high' },
    { id: 'library', label: 'Library', icon: 'volume-high' },
    { id: 'noise', label: 'Noise', icon: 'volume-high' },
    { id: 'lofi', label: 'Lo-fi', icon: 'headphones' },
  ];

  return (
    <div className={`page-transition premium-gradient min-h-screen transition-all duration-1000 ${monkMode ? 'brightness-[0.8] saturate-[1.2]' : ''}`}>
      <TopBar title="Deep Focus" />
      
      <main className="p-6 pt-[100px] pb-[120px] max-w-lg mx-auto space-y-6">
        {/* Goal Indicator */}
        <div className="flex justify-center">
          <div className="ios-glass px-5 py-2 rounded-full border border-forest-accent/20 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-forest-accent animate-pulse" />
            <span className="text-[13px] font-bold text-text-primary tracking-wide uppercase">Goal: 180 / 300 min</span>
          </div>
        </div>

        {/* Timer UI - Premium Circular Progress */}
        <section className="ios-card p-10 flex flex-col items-center relative overflow-hidden">
          {monkMode && (
            <div className="absolute inset-0 bg-forest-accent/5 transition-opacity duration-1000" />
          )}
          
          <div className="relative w-64 h-64 mb-10">
            <svg viewBox="0 0 280 280" className="w-full h-full drop-shadow-[0_0_20px_rgba(74,222,128,0.2)]">
              <circle
                cx="140"
                cy="140"
                r="120"
                stroke="rgba(74, 222, 128, 0.05)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="140"
                cy="140"
                r="120"
                stroke="#4ade80"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                transform="rotate(-90 140 140)"
                strokeDasharray={circumference}
                style={{ strokeDashoffset: dashOffset, transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[56px] font-light text-white tabular-nums tracking-tighter font-display leading-none">
                {formatTime(secondsLeft)}
              </span>
              <span className="text-[12px] font-bold tracking-[0.2em] text-text-muted uppercase mt-2">REMAINING</span>
            </div>
          </div>

          <div className="text-center w-full space-y-1">
            <h2 className="text-[20px] font-bold text-white tracking-tight">Physics Lab Report</h2>
            <p className="text-[14px] text-forest-accent font-semibold uppercase tracking-widest opacity-80">Phase 02: Analysis</p>
          </div>

          <div className="flex gap-4 w-full mt-8">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 h-14 ios-button font-bold text-[16px] shadow-lg ${
                isRunning ? 'bg-white/5 text-white border border-white/10' : 'bg-forest-accent text-forest-bg'
              }`}
            >
              {isRunning ? 'Pause session' : 'Resume focus'}
            </button>
            <button 
              onClick={() => {
                setSecondsLeft(90 * 60);
                setIsRunning(false);
              }}
              className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ios-button border border-white/10"
            >
              <SVGIcon name="stop" className="w-5 h-5 text-text-muted" />
            </button>
          </div>
        </section>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 gap-4">
          <section className="ios-card p-5 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${monkMode ? 'bg-forest-accent/20 text-forest-accent shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 'bg-white/5 text-text-faint'}`}>
                <SVGIcon name="lock" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-white">Monk Mode</h3>
                <p className="text-[12px] text-text-muted font-medium">{monkMode ? 'Isolation active' : 'Notifications enabled'}</p>
              </div>
            </div>
            <button 
              onClick={() => setMonkMode(!monkMode)}
              className={`w-14 h-7 rounded-full transition-all flex items-center px-1 ${monkMode ? 'bg-forest-accent shadow-[0_0_10px_rgba(74,222,128,0.4)]' : 'bg-white/10'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${monkMode ? 'translate-x-7' : 'translate-x-0'} shadow-md`} />
            </button>
          </section>

          <section className="ios-card p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-bold text-white flex items-center gap-2">
                <SVGIcon name="headphones" className="w-4 h-4 text-forest-accent" />
                Adaptive Sound
              </h3>
              <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-forest-accent" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sounds.map(sound => (
                <button
                  key={sound.id}
                  onClick={() => setActiveSound(sound.id)}
                  className={`py-3 rounded-xl transition-all flex flex-col items-center gap-1 ios-button ${
                    activeSound === sound.id 
                    ? 'bg-forest-accent/20 text-forest-accent border border-forest-accent/30' 
                    : 'bg-white/5 text-text-muted border border-transparent'
                  }`}
                >
                  <SVGIcon name={sound.id === 'lofi' ? 'headphones' : 'volume-high'} className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{sound.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
