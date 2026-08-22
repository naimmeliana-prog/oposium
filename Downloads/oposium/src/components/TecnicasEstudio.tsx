import React, { useState, useEffect } from 'react';
import { useOpposition } from '../context/OppositionContext';
import { Clock, Play, Pause, RotateCcw, TrendingUp, Target, Award, BellOff } from 'lucide-react';

export const TecnicasEstudio: React.FC = () => {
  const { setActiveTab } = useOpposition();
  const [activeTabSub, setActiveTabSub] = useState<'pomodoro' | 'curva' | 'pareto'>('pomodoro');

  // Pomodoro state
  const [selectedMinutes, setSelectedMinutes] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);

  useEffect(() => {
    setTimeLeft(selectedMinutes * 60);
    setIsRunning(false);
  }, [selectedMinutes]);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setPomodoroCount(prev => prev + 1);
      alert('¡Bloque Pomodoro completado! Tómate un descanso de 5 minutos.');
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSelectMinutes = (mins: number) => {
    setSelectedMinutes(mins);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedMinutes * 60);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const commonFooterNote = (
    <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 border border-slate-800 text-xs md:text-sm leading-relaxed space-y-2 mt-6">
      <div className="flex items-center gap-2 font-bold text-amber-400">
        <Award className="w-4 h-4 text-amber-400" />
        Filosofía de Preparación Eficiente Oposium:
      </div>
      <p>
        El éxito en oposiciones estatales y autonómicas no depende del número bruto de horas sentado en la mesa, sino de la intensidad neuro-cognitiva durante las sesiones de estudio. Integrar Pomodoro, la Curva de Ebbinghaus y la Ley de Pareto garantiza la retención a largo plazo minimizando el desgaste mental.
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            Metodología de Alto Rendimiento
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Técnicas de Estudio para Opositores
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Optimice la retención activa de leyes con intervalos Pomodoro, repetición espaciada Ebbinghaus y focalización 80/20.
          </p>
        </div>

        {/* 3 Tabs Header */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTabSub('pomodoro')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTabSub === 'pomodoro'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Método Pomodoro
          </button>
          <button
            onClick={() => setActiveTabSub('curva')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTabSub === 'curva'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Curva del Olvido
          </button>
          <button
            onClick={() => setActiveTabSub('pareto')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTabSub === 'pareto'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Ley de Pareto (80/20)
          </button>
        </div>
      </div>

      {/* TAB 1: METODO POMODORO */}
      {activeTabSub === 'pomodoro' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-2">
              El Enfoque Pomodoro
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Estudiar oposiciones requiere períodos de concentración pura libres de fatiga mental. Estudia intensamente durante 10, 15 o 25 minutos y descansa de forma absoluta durante 5 minutos.
            </p>
          </div>

          {/* Interactive Timer Widget */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 max-w-xl mx-auto text-center space-y-6 shadow-2xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Intervalo de Enfoque Activo
            </span>

            {/* Time selection buttons */}
            <div className="flex justify-center gap-3">
              {[10, 15, 25].map(mins => (
                <button
                  key={mins}
                  onClick={() => handleSelectMinutes(mins)}
                  className={`px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all ${
                    selectedMinutes === mins
                      ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {mins}:00 min
                </button>
              ))}
            </div>

            {/* Timer Display */}
            <div className="text-6xl md:text-7xl font-black font-mono tracking-wider text-amber-300 py-4">
              {formatTimer(timeLeft)}
            </div>

            {/* Play & Reset controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                {isRunning ? 'Pausar' : 'Play'}
              </button>

              <button
                onClick={handleResetTimer}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
            </div>

            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
              Pomodoros Completados Hoy: <strong className="text-emerald-400">{pomodoroCount} bloques</strong>
            </div>
          </div>

          {/* Key Rules */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <BellOff className="w-4 h-4 text-indigo-600" />
              Reglas clave para oposiciones:
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                Apaga las notificaciones de tu móvil por completo.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                No consultes el correo ni abras el BOE fuera del bloque designado.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                Al cabo de 4 Pomodoros, haz un descanso extendido de 20-30 minutos.
              </li>
            </ul>
          </div>

          {commonFooterNote}
        </div>
      )}

      {/* TAB 2: CURVA DEL OLVIDO */}
      {activeTabSub === 'curva' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-2">
              La Curva del Olvido de Ebbinghaus
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tu mente olvida el 50% de lo estudiado a las 24 horas si no realizas repasos programados. Para consolidar a largo plazo, el sistema te forzará repasos estratégicos a intervalos fijos.
            </p>
          </div>

          {/* Timeline chart cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs space-y-2">
              <div className="flex items-center justify-between text-indigo-800 font-extrabold">
                <span>Repaso 1</span>
                <span className="px-2 py-0.5 rounded bg-indigo-200 text-indigo-900">A las 24 horas</span>
              </div>
              <div className="text-2xl font-black text-indigo-900">Sube al 90%</div>
              <p className="text-slate-600">Primer impacto de rescate inmediato en la memoria de trabajo.</p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs space-y-2">
              <div className="flex items-center justify-between text-indigo-800 font-extrabold">
                <span>Repaso 2</span>
                <span className="px-2 py-0.5 rounded bg-indigo-200 text-indigo-900">A los 7 días</span>
              </div>
              <div className="text-2xl font-black text-indigo-900">Sube al 95%</div>
              <p className="text-slate-600">Reconsolidación tras la primera semana de estudio.</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-800 font-extrabold">
                <span>Repaso 3</span>
                <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">A los 15 días</span>
              </div>
              <div className="text-2xl font-black text-emerald-900">Fijación permanente</div>
              <p className="text-slate-600">Paso del conocimiento a la memoria a largo plazo.</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-800 font-extrabold">
                <span>Repaso 4</span>
                <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">Al mes</span>
              </div>
              <div className="text-2xl font-black text-emerald-900">Consolidación examen</div>
              <p className="text-slate-600">Inmunidad a bloqueos durante la prueba oficial.</p>
            </div>
          </div>

          {/* Implementation Box */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3 shadow-lg">
            <h3 className="font-extrabold text-indigo-300 text-sm flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              ¿Cómo lo aplica la plataforma?:
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Cuando marcas un tema como "En Repaso" en tu syllabus, el sistema lo coloca en tu algoritmo Leitner de tarjetas de memorización activa, asegurándose de programarlo para tu repaso preventivo del olvido.
            </p>
            <button
              onClick={() => setActiveTab('flashcards-leitner')}
              className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5"
            >
              Ir a Tarjetas Flashcards Leitner
            </button>
          </div>

          {commonFooterNote}
        </div>
      )}

      {/* TAB 3: LEY DE PARETO (80/20) */}
      {activeTabSub === 'pareto' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-2">
              Ley de Pareto (El Principio 80/20)
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ley de Pareto (El Principio 80/20) dice que el 20% de los temas legislativos generará el 80% de las preguntas reales del examen. No todos los temas se valoran de igual forma por el tribunal examinador.
            </p>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-2xl space-y-2 text-xs md:text-sm">
            <span className="font-extrabold text-indigo-950 block text-base">Ejemplo de estrategia en Oposiciones Judiciales:</span>
            <p className="text-slate-700 leading-relaxed">
              En Tramitación Procesal, los bloques de procedimientos civiles de ejecución y los recursos procesales concentran más de la mitad de las preguntas capciosas del examen.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Visualiza los pesos exactos en tiempo real</h3>
              <p className="text-xs text-slate-500">
                Usa nuestro módulo de Análisis Técnico Consolidado para ver exactamente la gráfica de peso relativo de cada bloque.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('analisis-estadistico')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl transition-all shadow shrink-0 flex items-center gap-1.5"
            >
              <Target className="w-4 h-4" />
              Ver Análisis Técnico Consolidado
            </button>
          </div>

          {commonFooterNote}
        </div>
      )}
    </div>
  );
};
