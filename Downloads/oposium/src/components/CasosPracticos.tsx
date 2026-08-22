import React, { useState, useMemo } from 'react';
import { useOpposition } from '../context/OppositionContext';
import { FileText, Calendar, CheckCircle2, XCircle, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';

export const CasosPracticos: React.FC = () => {
  const { selectedOpposition, practicalCases, selectedYears, setSelectedYears } = useOpposition();

  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

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

  const filteredCases = useMemo(() => {
    return practicalCases.filter(pc => selectedYears.includes(pc.year));
  }, [practicalCases, selectedYears]);

  const activeCase = filteredCases[activeCaseIndex] || filteredCases[0];

  const handleSelectOption = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qIndex]: optionIndex
    }));
  };

  const handleSubmitCase = () => {
    setSubmitted(true);
  };

  const handleResetCase = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            Simulación de Casos Reales
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Casos Prácticos Oficiales - {selectedOpposition.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Resuelva supuestos prácticos de convocatorias oficiales anteriores con análisis paso a paso y fundamentación jurídica.
          </p>
        </div>

        {/* Multi-year Filter */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            Años Anteriores Incluidos:
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

      {filteredCases.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">No hay casos prácticos para los años seleccionados</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
            Seleccione más años en el filtro superior para visualizar supuestos prácticos anteriores.
          </p>
          <button
            onClick={() => setSelectedYears([2024, 2023, 2022, 2021])}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500"
          >
            Seleccionar Todos los Años
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: List of cases */}
          <div className="space-y-3 lg:col-span-1">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Supuestos Prácticos Disponibles ({filteredCases.length})
            </h2>

            {filteredCases.map((c, index) => {
              const isActive = index === activeCaseIndex;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCaseIndex(index);
                    handleResetCase();
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-500'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Convocatoria {c.year}
                    </span>
                    <span className={`text-xs font-semibold ${isActive ? 'text-indigo-300' : 'text-indigo-600'}`}>
                      {c.questions.length} Preguntas
                    </span>
                  </div>
                  <h3 className="font-bold text-sm line-clamp-2 leading-snug">{c.title}</h3>
                </button>
              );
            })}
          </div>

          {/* Right Column: Case text and interactive questions */}
          <div className="lg:col-span-2 space-y-6">
            {activeCase && (
              <>
                {/* Case Scenario Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-indigo-600" />
                      <span className="font-extrabold text-slate-900 text-base">Enunciado Oficial del Caso</span>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      Año {activeCase.year}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mb-3">{activeCase.title}</h3>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 text-xs md:text-sm leading-relaxed font-mono">
                    {activeCase.description}
                  </div>
                </div>

                {/* Questions list */}
                <div className="space-y-6">
                  {activeCase.questions.map((q, qIdx) => {
                    const userSelected = selectedAnswers[qIdx];
                    const isCorrect = userSelected === q.correctIndex;

                    return (
                      <div key={qIdx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                            Q{qIdx + 1}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm md:text-base leading-snug pt-0.5">
                            {q.question}
                          </h4>
                        </div>

                        {/* Options */}
                        <div className="space-y-2.5 pl-10">
                          {q.options.map((option, optIdx) => {
                            let optionStyle = "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700";

                            if (submitted) {
                              if (optIdx === q.correctIndex) {
                                optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500";
                              } else if (userSelected === optIdx && !isCorrect) {
                                optionStyle = "bg-rose-50 border-rose-500 text-rose-950 font-medium";
                              } else {
                                optionStyle = "bg-slate-50 border-slate-200 opacity-60 text-slate-500";
                              }
                            } else if (userSelected === optIdx) {
                              optionStyle = "bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-500";
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={submitted}
                                onClick={() => handleSelectOption(qIdx, optIdx)}
                                className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                              >
                                <span>{option}</span>
                                {submitted && optIdx === q.correctIndex && (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                )}
                                {submitted && userSelected === optIdx && !isCorrect && (
                                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Box when submitted */}
                        {submitted && (
                          <div className="pl-10 pt-2">
                            <div className="bg-indigo-50/70 border-l-4 border-indigo-600 p-4 rounded-r-xl text-xs space-y-1">
                              <span className="font-extrabold text-indigo-950 block">Fundamentación Jurídica Oficial:</span>
                              <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Actions Bar */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    {submitted ? (
                      <button
                        onClick={handleResetCase}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reiniciar Caso Práctico
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitCase}
                        disabled={Object.keys(selectedAnswers).length === 0}
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-2 shadow"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Comprobar Respuestas
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
