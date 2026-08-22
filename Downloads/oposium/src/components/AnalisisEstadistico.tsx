import React from 'react';
import { useOpposition } from '../context/OppositionContext';
import { BarChart2, Calendar, Clock, CheckCircle2, HelpCircle, Flame, Target, Zap, ShieldAlert } from 'lucide-react';

export const AnalisisEstadistico: React.FC = () => {
  const { selectedOpposition, blocks, studyStats, selectedYears, setSelectedYears } = useOpposition();

  const availableYears = [2024, 2023, 2022, 2021, 2020];

  const toggleYear = (yr: number) => {
    if (selectedYears.includes(yr)) {
      if (selectedYears.length > 1) {
        setSelectedYears(selectedYears.filter(y => y !== yr));
      }
    } else {
      setSelectedYears([...selectedYears, yr]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
            Análisis Técnico & Estadístico Consolidado
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Análisis Estadístico - {selectedOpposition.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Analiza los pesos específicos fijados por el tribunal oficial en los exámenes para maximizar la rentabilidad de sus horas de estudio.
          </p>
        </div>

        {/* Multi-Year Selection Filter */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            Rango de Años para el Análisis Histórico:
          </div>
          <div className="flex items-center gap-1.5">
            {availableYears.map(yr => {
              const isSelected = selectedYears.includes(yr);
              return (
                <button
                  key={yr}
                  onClick={() => toggleYear(yr)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {yr}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Stats Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Horas Acumuladas</div>
            <div className="text-xl font-extrabold text-slate-900">{studyStats.hoursAccumulated} h</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Acierto Promedio</div>
            <div className="text-xl font-extrabold text-slate-900">{studyStats.averageAccuracy}%</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Simulacros Hechos</div>
            <div className="text-xl font-extrabold text-slate-900">{studyStats.simulacrosCompleted} tests</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Racha de Estudio</div>
            <div className="text-xl font-extrabold text-slate-900">{studyStats.studyStreakDays} días</div>
          </div>
        </div>
      </div>

      {/* Main Breakdown Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Peso de cada Bloque en Exámenes Oficiales - Tribunal Oficial
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Este desglose calcula la frecuencia histórica de preguntas extraídas de cada bloque de temas en los exámenes de los años seleccionados ({selectedYears.sort((a,b)=>b-a).join(', ')}). Úsalo para planificar cuántas horas de estudio dedicarle a cada área.
          </p>
        </div>

        {/* Blocks Bars & Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blocks.map((block) => (
            <div key={block.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{block.title.split(':')[0]}</span>
                  <span className="text-lg font-black text-indigo-600">{block.weightPercentage}% del total</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-3 line-clamp-2">{block.title}</h3>

                {/* Progress bar */}
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-500"
                    style={{ width: `${block.weightPercentage}%` }}
                  />
                </div>

                <div className="text-xs space-y-2 text-slate-600 pt-2 border-t border-slate-200/80">
                  <div className="flex justify-between">
                    <span>Syllabus:</span>
                    <strong className="text-slate-800">{block.topics.length} temas completos</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Impacto examen:</span>
                    <strong className="text-emerald-700 font-bold">{block.impactLevel}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Táctico de Preparador */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-indigo-800/60 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">Análisis Táctico de Preparador</h2>
            <p className="text-xs text-indigo-200">Basándonos en las estadísticas consolidadas de {selectedOpposition.name}:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Target className="w-4 h-4" />
              Estrategia Pareto (80/20):
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Los temas relativos a procedimientos judiciales directos y plazos administrativos concentran más del 65% del examen tipo test. Prioriza resolver simulacros prácticos sobre estos bloques.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              Enfoque de Eficiencia Digital:
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Múltiples preguntas del bloque de organización se centrarán en la reforma digital. No utilices temarios previos a 2023.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
