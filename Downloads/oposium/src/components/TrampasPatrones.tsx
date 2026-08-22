import React from 'react';
import { useOpposition } from '../context/OppositionContext';
import { AlertTriangle, Calendar, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TrampasPatrones: React.FC = () => {
  const { selectedOpposition, trickPatterns, selectedYears, setSelectedYears } = useOpposition();

  const availableYears = [2024, 2023, 2022, 2021];

  const toggleYear = (yr: number) => {
    if (selectedYears.includes(yr)) {
      if (selectedYears.length > 1) {
        setSelectedYears(selectedYears.filter(y => y !== yr));
      }
    } else {
      setSelectedYears([...selectedYears, yr]);
    }
  };

  const filteredTricks = trickPatterns.filter(tp => selectedYears.includes(tp.year));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Estrategia Anti-Trampas del Tribunal
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Trampas & Patrones de Examen - {selectedOpposition.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Aprenda a decodificar las preguntas capciosas del tribunal según el año legislativo seleccionado y cómo abordarlas con precisión.
          </p>
        </div>

        {/* Year selection filter */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            Año Legislativo / Convocatoria:
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
                      ? 'bg-amber-600 text-white shadow-sm'
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

      {/* Trick Cards List */}
      <div className="space-y-6">
        {filteredTricks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No hay trampas registradas para los años seleccionados</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
              Seleccione más años legislativos en el filtro superior para consultar patrones capciosos del tribunal.
            </p>
            <button
              onClick={() => setSelectedYears([2024, 2023, 2022, 2021])}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-500"
            >
              Seleccionar Todos los Años
            </button>
          </div>
        ) : (
          filteredTricks.map((tp) => (
            <div key={tp.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-bold text-xs">
                    Convocatoria {tp.year}
                  </span>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                    {tp.topicTitle}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-400">Patrón Capcioso Frecuente</span>
              </div>

              <h2 className="text-lg font-extrabold text-slate-900">{tp.trickTitle}</h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{tp.description}</p>

              {/* Example Question Box */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs md:text-sm">
                <span className="font-extrabold text-slate-800 block mb-1">Ejemplo de Pregunta Trampa del Examen:</span>
                <p className="italic text-slate-700">"{tp.exampleQuestion}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Trap Explanation */}
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-extrabold text-rose-900 mb-1">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    ¿Dónde cae el 80% de los opositores?
                  </div>
                  <p className="text-rose-950 leading-relaxed">{tp.trapExplanation}</p>
                </div>

                {/* How to solve */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-extrabold text-emerald-900 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Regla de Solución Inmune
                  </div>
                  <p className="text-emerald-950 leading-relaxed">{tp.howToSolve}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
