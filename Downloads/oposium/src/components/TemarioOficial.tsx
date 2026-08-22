import React, { useState } from 'react';
import { useOpposition } from '../context/OppositionContext';
import { BookOpen, Award, ChevronDown, ChevronUp, FileText, CheckCircle2, Building2 } from 'lucide-react';

export const TemarioOficial: React.FC = () => {
  const { selectedOpposition, blocks, accessRequirements, expectedQualities } = useOpposition();
  const [activeSubTab, setActiveSubTab] = useState<'temario' | 'requisitos'>('temario');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const toggleTopic = (id: string) => {
    setExpandedTopicId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            Contenido Oficial Actualizado
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Temario Oficial - {selectedOpposition.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Consulte los bloques navegables, el temario completo con articulado oficial y las cualidades exigidas por el tribunal evaluador.
          </p>
        </div>

        {/* Sub-tabs toggle */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveSubTab('temario')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'temario'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Temario Completo por Bloques
          </button>
          <button
            onClick={() => setActiveSubTab('requisitos')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'requisitos'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            Requisitos & Cualidades Tribunal
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: TEMARIO COMPLETO NAVEGABLE */}
      {activeSubTab === 'temario' && (
        <div className="space-y-6">
          {blocks.map(block => (
            <div key={block.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider">
                    Bloque de Syllabus
                  </div>
                  <h2 className="text-lg font-extrabold text-white">{block.title}</h2>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 font-semibold">
                    Peso Examen: {block.weightPercentage}%
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-semibold">
                    Impacto: {block.impactLevel}
                  </span>
                </div>
              </div>

              {/* Topics list */}
              <div className="p-4 space-y-3">
                {block.topics.map(topic => {
                  const isExpanded = expandedTopicId === topic.id;
                  return (
                    <div
                      key={topic.id}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleTopic(topic.id)}
                        className="w-full p-4 text-left bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between gap-4"
                      >
                        <div>
                          <h3 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2">
                            <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                            {topic.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">{topic.summary}</p>
                        </div>
                        <div className="shrink-0 text-slate-400">
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-5 bg-white border-t border-slate-200 text-sm space-y-4">
                          <div className="prose max-w-none text-slate-700 leading-relaxed text-xs md:text-sm">
                            <h4 className="font-bold text-slate-900 text-sm mb-2">Desarrollo Teórico Completo:</h4>
                            <p className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                              {topic.fullTheory}
                            </p>
                          </div>

                          {topic.officialArticles && topic.officialArticles.length > 0 && (
                            <div>
                              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-indigo-900 mb-2">
                                Articulado Legal Oficial Mencionado:
                              </h4>
                              <div className="space-y-2">
                                {topic.officialArticles.map((art, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-indigo-50/50 border-l-4 border-indigo-600 p-3 rounded-r-xl text-xs"
                                  >
                                    <span className="font-bold text-indigo-950 block mb-0.5">{art.title}</span>
                                    <p className="text-slate-700 italic">"{art.text}"</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 2: REQUISITOS GENERALES & CUALIDADES ESPERADAS */}
      {activeSubTab === 'requisitos' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Requisitos Generales */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-lg pb-4 border-b border-slate-100 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Requisitos Generales de Acceso
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Condiciones imprescindibles que deben reunirse en el momento de finalización del plazo de presentación de solicitudes para {selectedOpposition.name}:
            </p>

            <div className="space-y-3">
              {accessRequirements.map(req => (
                <div key={req.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 text-sm block mb-1">{req.title}</span>
                  <p className="text-slate-600">{req.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cualidades Esperadas por el Tribunal */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-lg pb-4 border-b border-slate-100 mb-4">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Cualidades Esperadas por el Tribunal
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Factores diferenciadores y competencias clave valoradas rigurosamente durante la corrección de los ejercicios oficiales:
            </p>

            <div className="space-y-3">
              {expectedQualities.map(q => (
                <div key={q.id} className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs">
                  <span className="font-bold text-indigo-950 text-sm block mb-1">{q.title}</span>
                  <p className="text-slate-700">{q.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
