import React from 'react';
import { useOpposition } from '../context/OppositionContext';
import { 
  Search, BookOpen, FileText, Download, BarChart2, AlertCircle, 
  BrainCircuit, HelpCircle, Clock, Calendar, Layers, MessageSquare, Award,
  ArrowRight, ShieldCheck, Sparkles, CheckCircle2
} from 'lucide-react';

export const InicioPanel: React.FC = () => {
  const { selectedOpposition, setActiveTab, studyStats } = useOpposition();

  const navItems = [
    { id: 'buscador', label: 'Buscador de Oposiciones', icon: Search, desc: 'Búsqueda avanzada en tiempo real (BOE, CCAA, Ayuntamientos)' },
    { id: 'temario', label: 'Temario Oficial', icon: BookOpen, desc: 'Temario navegable por bloques y requisitos/cualidades del tribunal' },
    { id: 'casos-practicos', label: 'Casos Prácticos', icon: FileText, desc: 'Casos reales resueltos y ordenados por años anteriores' },
    { id: 'material-pdf', label: 'Material Completo PDF', icon: Download, desc: 'Generador de dossier único para imprimir con leyes íntegras' },
    { id: 'analisis-estadistico', label: 'Análisis Estadístico', icon: BarChart2, desc: 'Pesos del tribunal por bloque y estrategia Pareto 80/20' },
    { id: 'trampas-patrones', label: 'Trampas & Patrones', icon: AlertCircle, desc: 'Decodificación de preguntas capciosas por año legislativo' },
    { id: 'preguntas-dificiles', label: 'Preguntas Difíciles & Mnemotecnia', icon: BrainCircuit, desc: 'Conceptos <10% acierto, reglas IA (QUE-DI-CIN) y test exprés' },
    { id: 'generador-examenes', label: 'Generador de Exámenes', icon: HelpCircle, desc: 'Simulacros con tiempo y penalización -0.33 por respuesta incorrecta' },
    { id: 'tecnicas-estudio', label: 'Técnicas de Estudio', icon: Clock, desc: 'Método Pomodoro, Curva del Olvido y Ley de Pareto 80/20' },
    { id: 'plan-estudio', label: 'Plan de Estudio', icon: Calendar, desc: 'Distribución orientativa de X semanas adaptable' },
    { id: 'flashcards-leitner', label: 'Flashcards Leitner', icon: Layers, desc: 'Tarjetas de memorización activa en 5 cajas de repetición' },
    { id: 'foro-opositores', label: 'Foro de Opositores', icon: MessageSquare, desc: 'Comunidad privada por grupo y técnicas de estudio' },
    { id: 'logros-progreso', label: 'Logros y Progreso', icon: Award, desc: 'Medallas, racha de estudio y estadísticas históricas' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden border border-indigo-800/40">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Plataforma Corporativa Gratúita de Preparación de Oposiciones
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Bienvenido a Oposium <span className="text-indigo-400 font-normal">| Su Centro de Alto Rendimiento</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
            Optimice su preparación con herramientas personalizadas adaptadas a su convocatoria oficial. Seleccione la oposición deseada y acceda al temario navegable, simulacros con penalización real, mnemotecnia IA y dossier en PDF listo para imprimir.
          </p>

          {/* Selected Opposition Badge Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/80 border border-indigo-400/40 flex items-center justify-center text-white shrink-0 shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-indigo-200 font-medium">Oposición Seleccionada Activa:</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  {selectedOpposition.name}
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/40 text-indigo-100 border border-indigo-400/30">
                    Grupo {selectedOpposition.grupo}
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Ref: {selectedOpposition.referencia} • {selectedOpposition.plazas} Plazas • {selectedOpposition.organismo}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('buscador')}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow"
            >
              Cambiar Oposición
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Dashboard Stats */}
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
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Racha de Estudio</div>
            <div className="text-xl font-extrabold text-slate-900">{studyStats.studyStreakDays} días</div>
          </div>
        </div>
      </div>

      {/* Navigable Index Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Índice Navegable de la Plataforma</h2>
          <span className="text-xs text-slate-500 font-medium">14 Apartados Especializados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="group bg-white rounded-2xl border border-slate-200 p-5 text-left transition-all duration-200 hover:border-indigo-500 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 transition-colors flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-400 group-hover:text-indigo-600">
                      0{index + 2}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 text-base mb-1 transition-colors">
                    {item.label}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Acceder al módulo
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
