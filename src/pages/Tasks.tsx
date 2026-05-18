import React, { useState } from 'react';
import { coursework } from '../data/mockData.js';
import { TopBar } from '../components/TopBar.tsx';
import { BottomNav } from '../components/BottomNav.tsx';
import { SVGIcon } from '../components/SVGIcon.tsx';
import { useApp } from '../AppContext.tsx';
import { AddTaskModal } from '../components/AddTaskModal.tsx';

const SectionHeader = ({ label, rightLabel, rightAction, rightIcon }: { 
  label: string; 
  rightLabel?: string; 
  rightAction?: () => void; 
  rightIcon?: string; 
}) => (
  <div className="flex justify-between items-end mb-4 px-1">
    <span className="text-[14px] font-bold uppercase tracking-widest text-text-muted">{label}</span>
    {rightLabel && (
      <button onClick={rightAction} className="flex items-center gap-1.5 text-forest-accent text-[14px] font-bold">
        {rightIcon && <SVGIcon name={rightIcon} className="w-3.5 h-3.5" />}
        {rightLabel}
      </button>
    )}
  </div>
);

export default function Tasks() {
  const { tasks, toggleTaskDone } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="page-transition premium-gradient min-h-screen">
      <TopBar title="Academic" />
      
      <main className="p-6 pt-[100px] pb-[120px] max-w-lg mx-auto space-y-8">
        {/* Course Overview Pill Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none px-1">
          {['All Tasks', 'Physics', 'Computing', 'Math'].map((tab, i) => (
            <button key={tab} className={`px-5 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${
              i === 0 ? 'bg-forest-accent text-forest-bg shadow-lg shadow-forest-accent/20' : 'bg-white/5 text-text-muted hover:bg-white/10'
            }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Upcoming Deadlines */}
        <section>
          <SectionHeader label="Active Priorities" />
          <div className="space-y-4">
            {tasks.map(task => {
              const isChecked = task.done;
              let priorityStyles = "bg-forest-card";
              let badgeColor = "bg-forest-accent/10 text-forest-accent";
              let dotColor = "bg-forest-accent";

              if (task.priority === 'critical') {
                priorityStyles = "bg-forest-crit-bg/40 border-forest-critical/10";
                badgeColor = "bg-forest-critical/10 text-forest-critical";
                dotColor = "bg-forest-critical";
              } else if (task.priority === 'high') {
                priorityStyles = "bg-forest-high-bg/40 border-forest-amber/10";
                badgeColor = "bg-forest-amber/10 text-forest-amber";
                dotColor = "bg-forest-amber";
              }

              return (
                <div 
                  key={task.id} 
                  className={`ios-card p-5 group transition-all duration-500 overflow-hidden relative ${isChecked ? 'opacity-40 scale-[0.98]' : 'hover:scale-[1.02]'} ${priorityStyles}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                       <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                        <span className={`text-[11px] font-bold tracking-widest uppercase ${badgeColor} px-2 py-0.5 rounded-md bg-opacity-10`}>
                          {task.dueIn} REMAINING
                        </span>
                      </div>
                      <h3 className={`text-[19px] font-bold text-white transition-all ${isChecked ? 'line-through decoration-forest-accent decoration-2' : ''}`}>
                        {task.title}
                      </h3>
                      <p className="text-[13px] text-text-muted font-medium">{task.course.split(' - ')[0]}</p>
                    </div>
                    
                    <button 
                      onClick={() => toggleTaskDone(task.id, task.done)}
                      className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        isChecked 
                        ? 'bg-forest-accent border-forest-accent scale-110' 
                        : 'border-white/10 bg-white/5 hover:border-forest-accent/30'
                      }`}
                    >
                      {isChecked && <SVGIcon name="check" className="w-5 h-5 text-forest-bg" strokeWidth={3} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Synced Coursework */}
        <section>
          <SectionHeader 
            label="Classroom Sync" 
            rightLabel="Refresh" 
            rightIcon="sync"
          />
          <div className="space-y-4">
            {coursework.map(course => (
              <div key={course.id} className="ios-card p-5 border-l-4 border-l-forest-accent/30">
                <div className="flex justify-between items-center mb-4">
                  <div className={`px-3 py-1 rounded-full text-[11px] font-bold ${course.color === 'accent' ? 'bg-forest-accent text-forest-bg' : 'bg-white/5 text-text-muted'}`}>
                    {course.course}
                  </div>
                  <div className="flex items-center gap-2 text-text-muted bg-white/5 px-2 py-1 rounded-lg">
                    <SVGIcon name={course.metaIcon === 'comment' ? 'comment' : 'file'} className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">{course.meta.toUpperCase()}</span>
                  </div>
                </div>
                <h4 className="text-[17px] font-bold text-white mb-2">{course.title}</h4>
                <p className="text-[13px] text-text-muted leading-relaxed font-medium">{course.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Add Button - Premium Styled */}
      <div className="fixed bottom-28 right-6 flex items-center justify-center">
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="w-16 h-16 bg-forest-accent text-forest-bg rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(74,222,128,0.4)] active:scale-90 transition-all hover:scale-105"
        >
          <SVGIcon name="plus" className="w-8 h-8" strokeWidth={2.5} />
        </button>
      </div>

      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <BottomNav />
    </div>
  );
}
