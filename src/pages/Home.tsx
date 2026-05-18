import React from 'react';
import { useNavigate } from 'react-router-dom';
import { emails } from '../data/mockData.js';
import { TopBar } from '../components/TopBar.tsx';
import { BottomNav } from '../components/BottomNav.tsx';
import { SVGIcon } from '../components/SVGIcon.tsx';
import { useApp } from '../AppContext.tsx';

export default function Home() {
  const navigate = useNavigate();
  const { tasks, user } = useApp();

  return (
    <div className="page-transition premium-gradient min-h-screen">
      <TopBar title="ScholarHub" />
      
      <main className="p-6 pt-[100px] pb-[120px] max-w-lg mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="space-y-1">
          <h2 className="text-text-muted text-[15px] font-medium">Monday, May 18</h2>
          <h1 className="text-[32px] font-bold font-display tracking-tight text-white leading-tight">
            Focus on your <span className="text-forest-accent">Lab Report</span>
          </h1>
        </div>

        {/* AI Briefing - Premium Bento Style */}
        <section className="ios-card overflow-hidden group">
          <div className="bg-forest-accent/5 p-5 border-b border-white/5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-forest-accent/20 flex items-center justify-center">
                  <SVGIcon name="terminal" className="w-4 h-4 text-forest-accent" />
                </div>
                <span className="text-[12px] font-bold text-forest-accent uppercase tracking-widest">Briefing</span>
              </div>
              <span className="font-mono text-[10px] text-text-faint bg-white/5 px-2 py-1 rounded">SYS_READY</span>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-[17px] leading-relaxed text-text-primary font-medium">
              Good morning, {user?.displayName?.split(' ')[0] || 'Scholar'}. Your <span className="text-forest-critical">Physics Lab</span> is priority one. 
              Atmosphere is currently <span className="text-forest-accent">optimal</span> for deep work.
            </p>
            <div className="flex gap-2">
               <button 
                onClick={() => navigate('/focus')}
                className="flex-1 h-12 bg-forest-accent text-forest-bg ios-button hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
              >
                Start focus session
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid - Bento Style */}
        <div className="grid grid-cols-2 gap-4">
          <div className="ios-card p-5 space-y-3 bg-gradient-to-br from-forest-card to-forest-card/40">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
              <SVGIcon name="calendar" className="w-5 h-5 text-text-muted" />
            </div>
            <div>
              <div className="text-[28px] font-bold font-display">3</div>
              <div className="text-[12px] text-text-muted font-semibold uppercase tracking-wider">Classes</div>
            </div>
          </div>
          <div className="ios-card p-5 space-y-3 border-forest-critical/20 bg-forest-crit-bg/40">
            <div className="w-10 h-10 rounded-2xl bg-forest-critical/10 flex items-center justify-center">
              <SVGIcon name="alert-triangle" className="w-5 h-5 text-forest-critical" />
            </div>
            <div>
              <div className="text-[28px] font-bold font-display text-forest-critical">1</div>
              <div className="text-[12px] text-forest-critical/70 font-semibold uppercase tracking-wider">Urgent</div>
            </div>
          </div>
        </div>

        {/* Timeline Matrix - Premium List */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[20px] font-bold font-display text-white">Timeline Matrix</h3>
            <button onClick={() => navigate('/tasks')} className="text-forest-accent text-[14px] font-bold">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 3).map((task) => (
              <div 
                key={task.id} 
                className="ios-card p-4 flex items-center gap-4 group cursor-pointer hover:bg-white/5"
                onClick={() => navigate('/tasks')}
              >
                <div className={`w-1 shadow-[0_0_15px_rgba(0,0,0,0.5)] h-12 rounded-full ${
                  task.priority === 'critical' ? 'bg-forest-critical' : 
                  task.priority === 'high' ? 'bg-forest-amber' : 'bg-forest-accent'
                }`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[12px] font-bold text-text-muted uppercase tracking-wider">{task.course.split(' - ')[0]}</span>
                    <span className="text-[11px] text-text-faint font-medium">{task.dueIn}</span>
                  </div>
                  <h4 className="text-[16px] font-bold text-text-primary">{task.title}</h4>
                </div>
                <SVGIcon name="check" className="w-5 h-5 text-text-faint group-hover:text-forest-accent transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* Comms Hub - Floating Style */}
        <section className="ios-card overflow-hidden">
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-[16px] font-bold text-white flex items-center gap-2">
              <SVGIcon name="mail" className="w-4 h-4 text-forest-accent" />
              Comms Hub
            </h3>
            <span className="text-[11px] font-bold text-text-faint uppercase">3 UNREAD</span>
          </div>
          <div className="divide-y divide-white/5">
            {emails.map(email => (
              <div key={email.id} className="p-5 hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-forest-accent/10 border border-forest-accent/20 flex items-center justify-center text-[12px] font-bold text-forest-accent">
                      {email.sender[0]}
                    </div>
                    <div>
                      <div className="text-[14px] font-bold">{email.sender}</div>
                      <div className="text-[11px] text-text-muted">{email.time}</div>
                    </div>
                  </div>
                </div>
                <div className="text-[14px] font-semibold text-forest-accent mb-1 truncate">{email.subject}</div>
                <p className="text-[13px] text-text-muted line-clamp-1">{email.preview}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
