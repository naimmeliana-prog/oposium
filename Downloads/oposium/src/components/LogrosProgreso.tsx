import React from 'react';
import { useOpposition } from '../context/OppositionContext';
import { Award, Flame, ShieldCheck, CheckCircle2, BookOpen, Clock, HelpCircle, Trophy } from 'lucide-react';

export const LogrosProgreso: React.FC = () => {
  const { selectedOpposition, studyStats, achievements } = useOpposition();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            Motivación & Gamificación Académica
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Logros & Progreso Académico
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Mantenga alta su motivación diaria coleccionando medallas y haciendo seguimiento de sus simulacros históricos en {selectedOpposition.name}.
          </p>
        </div>
      </div>

      {/* Main Stats Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Racha Actual</div>
            <div className="text-2xl font-black text-slate-900">{studyStats.studyStreakDays} Días</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Acierto Promedio</div>
            <div className="text-2xl font-black text-slate-900">{studyStats.averageAccuracy}%</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Horas Estudiadas</div>
            <div className="text-2xl font-black text-slate-900">{studyStats.hoursAccumulated} h</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Simulacros</div>
            <div className="text-2xl font-black text-slate-900">{studyStats.simulacrosCompleted} realizados</div>
          </div>
        </div>
      </div>

      {/* Unlockable Badges Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
          <Trophy className="w-5 h-5 text-amber-500" />
          Medallas y Logros Conseguidos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all ${
                ach.unlocked
                  ? 'bg-amber-50/50 border-amber-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  ach.unlocked ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-200 text-slate-500'
                }`}>
                  {ach.icon === 'Flame' && <Flame className="w-5 h-5" />}
                  {ach.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5" />}
                  {ach.icon === 'BookOpen' && <BookOpen className="w-5 h-5" />}
                  {ach.icon === 'MessageSquare' && <Award className="w-5 h-5" />}
                </div>

                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  ach.unlocked ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-600'
                }`}>
                  {ach.unlocked ? 'Desbloqueado' : 'Bloqueado'}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-sm mb-1">{ach.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{ach.description}</p>

              {ach.unlockedAt && (
                <div className="text-[10px] text-amber-800 font-bold border-t border-amber-200/60 pt-2">
                  Obtenido el {ach.unlockedAt}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
