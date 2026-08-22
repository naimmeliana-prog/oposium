import React, { useState } from 'react';
import { useOpposition } from '../context/OppositionContext';
import { BrainCircuit, Calendar, Search, HelpCircle, CheckCircle2, Sparkles, Lightbulb, Zap } from 'lucide-react';

export const PreguntasDificiles: React.FC = () => {
  const { selectedOpposition, difficultConcepts, selectedYears, setSelectedYears } = useOpposition();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [showAnswerMap, setShowAnswerMap] = useState<Record<string, boolean>>({});

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

  const filteredConcepts = difficultConcepts.filter(dc => {
    const matchesYear = selectedYears.includes(dc.year);
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      !query ||
      dc.conceptTitle.toLowerCase().includes(query) ||
      dc.whyFails.toLowerCase().includes(query) ||
      dc.mnemonicRule.acronym.toLowerCase().includes(query);

    return matchesYear && matchesSearch;
  });

  const activeConcept =
    filteredConcepts.find(dc => dc.id === selectedConceptId) || filteredConcepts[0];

  const toggleShowAnswer = (id: string) => {
    setShowAnswerMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-2">
            <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />
            Mnemotecnia IA & Tasa de Acierto &lt;10%
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Preguntas Difíciles Recurrentes y Mnemotecnia - {selectedOpposition.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Estudia los conceptos jurídicos complejos con menos del 10% de aciertos utilizando reglas mnemotécnicas de alto rendimiento.
          </p>
        </div>

        {/* Year filter */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            Años para Conceptos Críticos:
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
                      ? 'bg-purple-600 text-white shadow-sm'
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

      {/* Concept Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="O introduce cualquier artículo o concepto difícil (ej: Plazos del Recurso de Queja, Registro Civil, Execución)..."
          className="w-full text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs text-slate-400 hover:text-slate-600 font-bold px-2"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Main Grid: List of Critical Concepts + Deep Mnemonic Breakdown */}
      {filteredConcepts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <HelpCircle className="w-12 h-12 text-purple-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">No se encontraron conceptos difíciles</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
            Ajuste el buscador o seleccione más años en el filtro superior.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Concept Selector */}
          <div className="space-y-3 lg:col-span-1">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Conceptos Críticos (&lt;10% Tasa de Acierto)
            </h2>

            {filteredConcepts.map(dc => {
              const isSelected = activeConcept?.id === dc.id;
              return (
                <button
                  key={dc.id}
                  onClick={() => setSelectedConceptId(dc.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-purple-500'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-purple-500/30 text-purple-200' : 'bg-rose-100 text-rose-800'
                    }`}>
                      Nivel: {dc.difficultyLevel}
                    </span>
                    <span className="text-xs font-extrabold text-rose-500">
                      Tasa acierto: {dc.accuracyRate}%
                    </span>
                  </div>
                  <h3 className="font-bold text-sm line-clamp-2">{dc.conceptTitle}</h3>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Mnemonic Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            {activeConcept && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                {/* Concept Title & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">
                      Guía de Memorización Rápida
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900">{activeConcept.conceptTitle}</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs border border-rose-200">
                    Concepto Crítico ({activeConcept.accuracyRate}% Acierto)
                  </span>
                </div>

                {/* Why 90% Fails */}
                <div className="bg-rose-50/70 border-l-4 border-rose-500 p-4 rounded-r-xl text-xs md:text-sm space-y-1">
                  <span className="font-extrabold text-rose-950 block">¿Por qué falla el 90% de los estudiantes?</span>
                  <p className="text-slate-700 leading-relaxed">{activeConcept.whyFails}</p>
                </div>

                {/* High Performance Mnemonic Formula */}
                <div className="bg-gradient-to-br from-indigo-900 to-purple-950 text-white p-6 rounded-2xl shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    Fórmulas Mnemotécnicas de Alto Rendimiento
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15">
                    <span className="text-xs font-bold text-indigo-200 block mb-1">Regla 1: Acrónimo Procesal</span>
                    <div className="text-2xl font-black text-amber-300 tracking-widest mb-2">
                      {activeConcept.mnemonicRule.acronym}
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      {activeConcept.mnemonicRule.description}
                    </p>
                  </div>
                </div>

                {/* Ridiculous Association */}
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-xs md:text-sm space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    Asociación Mental Ridícula (Fijación de Memoria)
                  </div>
                  <p className="text-slate-700 italic leading-relaxed">
                    "{activeConcept.ridiculousAssociation}"
                  </p>
                </div>

                {/* Quick Retention Test */}
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Test Rápido de Retención Inmediata
                    </span>
                    <button
                      onClick={() => toggleShowAnswer(activeConcept.id)}
                      className="text-xs font-bold text-purple-600 hover:text-purple-800 underline"
                    >
                      {showAnswerMap[activeConcept.id] ? 'Ocultar Solución' : 'Mostrar Solución'}
                    </button>
                  </div>

                  <p className="text-xs md:text-sm font-semibold text-slate-800">
                    {activeConcept.quickTest.question}
                  </p>

                  {showAnswerMap[activeConcept.id] && (
                    <div className="p-3 bg-emerald-100/80 border border-emerald-300 text-emerald-950 font-bold rounded-xl text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      {activeConcept.quickTest.solution}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
