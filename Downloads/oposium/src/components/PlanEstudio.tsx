import React, { useState } from 'react';
import { useOpposition } from '../context/OppositionContext';
import { Calendar, BookOpen, Clock, CheckCircle2, Sliders, Sparkles } from 'lucide-react';

export const PlanEstudio: React.FC = () => {
  const { selectedOpposition, blocks } = useOpposition();
  const [totalWeeks, setTotalWeeks] = useState<number>(12); // Variable X introduced by user

  // Total topics calculation
  const allTopics = blocks.flatMap(b => b.topics);
  const totalTopics = allTopics.length;

  // Pace calculation
  const topicsPerWeek = Math.max(1, Math.ceil(totalTopics / totalWeeks));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            Planificador Adaptativo Inteligente
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Plan de Estudio - {selectedOpposition.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Distribución orientativa de <strong>{totalWeeks} semanas</strong> para cubrir el temario completo de la oposición seleccionada.
          </p>
        </div>

        {/* Dynamic Variable X Controller */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-md border border-slate-800 space-y-2 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Semanas Disponibles (Variable X):
            </label>
            <span className="text-lg font-black text-amber-300 font-mono">{totalWeeks} semanas</span>
          </div>

          <input
            type="range"
            min={4}
            max={52}
            value={totalWeeks}
            onChange={e => setTotalWeeks(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>4 semanas (Intensivo)</span>
            <span>26 semanas (Estándar)</span>
            <span>52 semanas (1 año)</span>
          </div>
        </div>
      </div>

      {/* Plan Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Total de Temas</div>
            <div className="text-xl font-extrabold text-slate-900">{totalTopics} temas oficiales</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Ritmo Semanal Estimado</div>
            <div className="text-xl font-extrabold text-slate-900">~{topicsPerWeek} temas / semana</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Repasos Programados</div>
            <div className="text-xl font-extrabold text-slate-900">{Math.floor(totalWeeks / 4)} bloques consolidados</div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule Timeline Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
          <Calendar className="w-5 h-5 text-indigo-600" />
          Cronograma Semanal Orientativo ({totalWeeks} Semanas)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {Array.from({ length: totalWeeks }).map((_, weekIdx) => {
            const weekNumber = weekIdx + 1;
            const startTopicIdx = weekIdx * topicsPerWeek;
            const weekTopics = allTopics.slice(startTopicIdx, startTopicIdx + topicsPerWeek);
            const isReviewWeek = weekNumber % 4 === 0 || weekTopics.length === 0;

            return (
              <div
                key={weekIdx}
                className={`p-5 rounded-2xl border transition-all ${
                  isReviewWeek
                    ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/80">
                  <span className="font-extrabold text-slate-900 text-sm">
                    Semana {weekNumber}
                  </span>
                  {isReviewWeek ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-extrabold uppercase">
                      Semana de Repaso Leitner
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-indigo-600">
                      {weekTopics.length} Temas asignados
                    </span>
                  )}
                </div>

                {isReviewWeek && weekTopics.length === 0 ? (
                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="font-bold text-slate-800">Consolidación intensiva Ebbinghaus:</p>
                    <p>Simulacros de test completos, test de trampas y repaso activo de flashcards de semanas previas.</p>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    {weekTopics.map(t => (
                      <div key={t.id} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800 block line-clamp-1">{t.title}</span>
                          <span className="text-[10px] text-slate-500 line-clamp-1">{t.summary}</span>
                        </div>
                      </div>
                    ))}
                    {isReviewWeek && (
                      <p className="text-[11px] text-amber-800 font-semibold pt-1">
                        + Repaso de consolidación de temas anteriores.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
