import React, { useState, useEffect } from 'react';
import { useOpposition } from '../context/OppositionContext';
import type { ExamQuestion } from '../types';
import { HelpCircle, Clock, CheckCircle2, XCircle, AlertTriangle, Sparkles, Play, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GeneradorExamenes: React.FC = () => {
  const { blocks, selectedYears, setSelectedYears, setStudyStats } = useOpposition();

  // Generator settings
  const [selectedBlockId, setSelectedBlockId] = useState<string>('todos');
  const [difficulty, setDifficulty] = useState<string>('Todas');
  const [mode, setMode] = useState<'practico' | 'simulacro'>('simulacro');
  const [isResolved, setIsResolved] = useState<boolean>(false); // resueltos vs sin resolver
  const [numQuestions, setNumQuestions] = useState<number>(10);

  // Active exam state
  const [activeExam, setActiveExam] = useState<ExamQuestion[] | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<{
    correctCount: number;
    wrongCount: number;
    blankCount: number;
    netScore: number; // Max 10 or 100
    percentage: number;
  } | null>(null);

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

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timeRemaining > 0 && !isExamSubmitted) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerActive && !isExamSubmitted) {
      handleSubmitExam();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining, isExamSubmitted]);

  // Sample question bank generator
  const generateQuestionsBank = (): ExamQuestion[] => {
    const questions: ExamQuestion[] = [
      {
        id: 'q1',
        blockId: 'b1',
        topicId: 't1',
        questionText: '¿Cuál de los siguientes no es un valor superior del ordenamiento jurídico según el Art. 1.1 de la CE?',
        options: ['La libertad', 'La igualdad', 'La seguridad nacional', 'El pluralismo político'],
        correctIndex: 2,
        explanation: 'El Art. 1.1 CE propugna como valores superiores: la libertad, la justicia, la igualdad y el pluralismo político. La seguridad nacional no figura en este precepto.',
        year: 2024,
        difficulty: 'Fácil'
      },
      {
        id: 'q2',
        blockId: 'b2',
        topicId: 't3',
        questionText: '¿En qué plazo se debe interponer el recurso de queja procesal contra el auto que deniega la tramitación de una apelación?',
        options: ['3 días hábiles', '5 días hábiles', '10 días hábiles', '1 mes natural'],
        correctIndex: 1,
        explanation: 'Aplica la regla QUE-DI-CIN: El recurso de queja de la LEC debe interponerse en el plazo de 5 días hábiles desde la notificación.',
        year: 2024,
        difficulty: 'Ultra Complejo'
      },
      {
        id: 'q3',
        blockId: 'b2',
        topicId: 't3',
        questionText: '¿A partir de qué cuantía económica las demandas civiles se tramitan por el cauce del Juicio Ordinario?',
        options: ['6.000 euros', '10.000 euros', '15.000 euros', '30.000 euros'],
        correctIndex: 2,
        explanation: 'Tras la reforma del RDL 6/2023, el límite del Juicio Verbal es 15.000 euros. Por encima de 15.000€ se tramita por el Juicio Ordinario.',
        year: 2023,
        difficulty: 'Media'
      },
      {
        id: 'q4',
        blockId: 'b3',
        topicId: 't5',
        questionText: 'En el procedimiento de desahucio de vivienda habitual, ¿qué requisito adicional exige la LEC respecto a la vulnerabilidad?',
        options: [
          'Un aval bancario fianza de 6 meses.',
          'Acreditar si la parte demandada se encuentra en situación de vulnerabilidad si el actor es gran tenedor.',
          'Solicitar el lanzamiento en 24 horas sin juicio.',
          'Notificar al Ayuntamiento únicamente después del lanzamiento.'
        ],
        correctIndex: 1,
        explanation: 'El artículo 439.6 LEC exige acreditar el informe de vulnerabilidad social de los servicios sociales si el actor es gran tenedor.',
        year: 2024,
        difficulty: 'Alta'
      },
      {
        id: 'q5',
        blockId: 'b2',
        topicId: 't4',
        questionText: '¿Cuál es el orden legal preferente en el embargo de bienes según el artículo 592 de la LEC?',
        options: [
          'Bienes inmuebles y viviendas.',
          'Dinero y saldos en cuentas bancarias.',
          'Sueldos, salarios y pensiones.',
          'Establecimientos mercantiles e industriales.'
        ],
        correctIndex: 1,
        explanation: 'El Art. 592.2 LEC sitúa en primer lugar del embargo el dinero en efectivo y los saldos en cuentas de entidades de crédito.',
        year: 2022,
        difficulty: 'Media'
      },
      {
        id: 'q6',
        blockId: 'b1',
        topicId: 't2',
        questionText: '¿Quién preside el Consejo General del Poder Judicial (CGPJ) conforme a la LOPJ?',
        options: ['El Ministro de Justicia', 'El Presidente del Tribunal Supremo', 'El Fiscal General del Estado', 'El Defensor del Pueblo'],
        correctIndex: 1,
        explanation: 'El Presidente del Tribunal Supremo preside también el Consejo General del Poder Judicial conforme a la Constitución y la LOPJ.',
        year: 2023,
        difficulty: 'Fácil'
      },
      {
        id: 'q7',
        blockId: 'b3',
        topicId: 't5',
        questionText: '¿Qué estructura desjudicializada introduce la Ley 20/2011 del Registro Civil?',
        options: [
          'Mantiene a los Jueces de Primera Instancia como Encargados Únicos.',
          'Organización electrónica en Oficinas Generales, Consulares y Central.',
          'Traspasa la fe pública a los Ayuntamientos.',
          'Elimina la expedición de certificaciones electrónicas.'
        ],
        correctIndex: 1,
        explanation: 'La Ley 20/2011 configura un Registro Civil único y electrónico estructurado en Oficinas Generales, Consulares y Central.',
        year: 2021,
        difficulty: 'Alta'
      },
      {
        id: 'q8',
        blockId: 'b2',
        topicId: 't3',
        questionText: '¿En qué plazo debe formularse la contestación a la demanda en el Juicio Verbal civil?',
        options: ['5 días hábiles', '10 días hábiles', '20 días hábiles', '15 días naturales'],
        correctIndex: 1,
        explanation: 'El artículo 438.1 LEC otorga un plazo de 10 días hábiles para contestar la demanda por escrito en el Juicio Verbal.',
        year: 2023,
        difficulty: 'Fácil'
      },
      {
        id: 'q9',
        blockId: 'b2',
        topicId: 't4',
        questionText: '¿Qué recurso procede contra el auto del Juez que deniega el despacho de la ejecución forzosa?',
        options: [
          'Únicamente recurso de reposición.',
          'Recurso de apelación directamente o previa reposición.',
          'Recurso de queja en 3 días.',
          'No cabe recurso alguno.'
        ],
        correctIndex: 1,
        explanation: 'Contra el auto que deniegue el despacho de ejecución procede recurso de apelación, sin perjuicio de la reposición potestativa previa (Art. 552.2 LEC).',
        year: 2022,
        difficulty: 'Alta'
      },
      {
        id: 'q10',
        blockId: 'b1',
        topicId: 't1',
        questionText: '¿Cuál es la mayoría requerida para la aprobación o reforma de una Ley Orgánica en el Congreso de los Diputados?',
        options: ['Mayoría simple de los presentes', 'Mayoría absoluta del Congreso en una votación final sobre el conjunto del proyecto', 'Mayoría de 3/5 del Senado', 'Unanimidad'],
        correctIndex: 1,
        explanation: 'El Art. 81.2 CE exige la mayoría absoluta del Congreso de los Diputados en votación final sobre el conjunto del proyecto para las leyes orgánicas.',
        year: 2024,
        difficulty: 'Media'
      }
    ];

    return questions.filter(q => {
      const matchesBlock = selectedBlockId === 'todos' || q.blockId === selectedBlockId;
      const matchesDifficulty = difficulty === 'Todas' || q.difficulty === difficulty;
      const matchesYear = selectedYears.includes(q.year);
      return matchesBlock && matchesDifficulty && matchesYear;
    });
  };

  const handleStartExam = () => {
    const questions = generateQuestionsBank().slice(0, numQuestions);
    if (questions.length === 0) {
      alert('No hay suficientes preguntas disponibles para los filtros seleccionados. Pruebe a ampliar el rango de años o dificultad.');
      return;
    }

    setActiveExam(questions);
    setUserAnswers({});
    setIsExamSubmitted(false);
    setExamScore(null);
    setTimeRemaining(numQuestions * 60); // 1 minute per question
    setIsTimerActive(mode === 'simulacro');
  };

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (isExamSubmitted) return;
    setUserAnswers(prev => {
      if (prev[qIndex] === optionIndex) {
        // Toggle unselect for penalty avoidance
        const copy = { ...prev };
        delete copy[qIndex];
        return copy;
      }
      return { ...prev, [qIndex]: optionIndex };
    });
  };

  const handleSubmitExam = () => {
    if (!activeExam) return;

    setIsTimerActive(false);
    setIsExamSubmitted(true);

    let correctCount = 0;
    let wrongCount = 0;
    let blankCount = 0;

    activeExam.forEach((q, idx) => {
      const ans = userAnswers[idx];
      if (ans === undefined) {
        blankCount++;
      } else if (ans === q.correctIndex) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    // Score calculation: 1 point per correct answer, -0.33 per wrong answer
    const rawScore = correctCount * 1 - wrongCount * 0.3333;
    const maxScore = activeExam.length;
    const netScore = Math.max(0, Math.round((rawScore / maxScore) * 10 * 100) / 100); // Scale to 10
    const percentage = Math.max(0, Math.round((rawScore / maxScore) * 100));

    setExamScore({
      correctCount,
      wrongCount,
      blankCount,
      netScore,
      percentage
    });

    // Update global user stats
    setStudyStats(prev => ({
      ...prev,
      simulacrosCompleted: prev.simulacrosCompleted + 1,
      averageAccuracy: Math.round((prev.averageAccuracy + percentage) / (prev.simulacrosCompleted === 0 ? 1 : 2))
    }));

    if (percentage >= 70) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            Simulador de Exámenes & IA
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Generador de Exámenes & Simulacros
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Realice test interactivos personalizados o simulacros reales del tribunal bajo control de tiempo y penalizaciones.
          </p>
        </div>

        {/* Dynamic Tribunals Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-xl max-w-md text-xs text-amber-900 leading-snug">
          <div className="font-extrabold flex items-center gap-1.5 text-amber-800 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            Dinámica de los Tribunales:
          </div>
          Los exámenes tipo test restan puntuación en base a las respuestas incorrectas (típicamente <strong>-0.33 por error</strong>). Nuestra plataforma replica este filtro psicológico para que aprendas a omitir respuestas si no estás 100% seguro durante un Simulacro.
        </div>
      </div>

      {/* Main Exam Area or Generator Controls */}
      {!activeExam ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Configuración del Examen o Test Inteligente por IA
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Modo */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Modo de Examen</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('practico')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    mode === 'practico'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Modo Práctico (Sin Tiempo)
                </button>
                <button
                  onClick={() => setMode('simulacro')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    mode === 'simulacro'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Modo Simulacro (Con Cronómetro)
                </button>
              </div>
            </div>

            {/* 2. Resuelto / Sin Resolver */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Visualización Soluciones</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsResolved(false)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    !isResolved
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Sin Resolver (Test Normal)
                </button>
                <button
                  onClick={() => setIsResolved(true)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    isResolved
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Examen Resuelto (Guía)
                </button>
              </div>
            </div>

            {/* 3. Bloques */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Bloque Temático</label>
              <select
                value={selectedBlockId}
                onChange={e => setSelectedBlockId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="todos">Todos los Bloques del Syllabus</option>
                {blocks.map(b => (
                  <option key={b.id} value={b.id}>{b.title}</option>
                ))}
              </select>
            </div>

            {/* 4. Dificultad */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Nivel de Dificultad</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Todas">Todas las Dificultades</option>
                <option value="Fácil">Fácil</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Ultra Complejo">Ultra Complejo (&lt;10% Acierto)</option>
              </select>
            </div>

            {/* 5. Años */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Años Anteriores</label>
              <div className="flex flex-wrap gap-1.5">
                {availableYears.map(yr => {
                  const isSelected = selectedYears.includes(yr);
                  return (
                    <button
                      key={yr}
                      onClick={() => toggleYear(yr)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {yr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Número de preguntas */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Número de Preguntas</label>
              <select
                value={numQuestions}
                onChange={e => setNumQuestions(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5 Preguntas (Express)</option>
                <option value={10}>10 Preguntas (Estándar)</option>
                <option value={20}>20 Preguntas (Simulacro Completo)</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleStartExam}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Generar y Comenzar Simulacro
            </button>
          </div>
        </div>
      ) : (
        /* Active Exam View */
        <div className="space-y-6">
          {/* Top Sticky Timer & Bar */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4 sticky top-4 z-20">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                {mode === 'simulacro' ? 'Simulacro de Examen Oficial' : 'Modo Práctico Libre'}
              </span>
              <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                {activeExam.length} Preguntas
              </span>
            </div>

            {mode === 'simulacro' && !isExamSubmitted && (
              <div className="flex items-center gap-2 font-mono text-lg font-bold bg-slate-800 px-4 py-1.5 rounded-xl border border-slate-700 text-amber-400">
                <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                {formatTime(timeRemaining)}
              </div>
            )}

            <button
              onClick={() => {
                setActiveExam(null);
                setIsExamSubmitted(false);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Abandonar / Nuevo Examen
            </button>
          </div>

          {/* Score Results Card if Submitted */}
          {isExamSubmitted && examScore && (
            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-700 space-y-4">
              <div className="flex items-center justify-between border-b border-indigo-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  <h3 className="font-extrabold text-lg text-white">Resultado Oficial del Simulacro</h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Calculado con Penalización -0.33
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                  <span className="block text-[10px] font-bold text-slate-300 uppercase">Nota Final (0-10)</span>
                  <span className="text-2xl font-black text-amber-300">{examScore.netScore} / 10</span>
                </div>

                <div className="bg-emerald-500/20 p-4 rounded-xl border border-emerald-400/30">
                  <span className="block text-[10px] font-bold text-emerald-200 uppercase">Aciertos (+1.0)</span>
                  <span className="text-2xl font-black text-emerald-400">{examScore.correctCount}</span>
                </div>

                <div className="bg-rose-500/20 p-4 rounded-xl border border-rose-400/30">
                  <span className="block text-[10px] font-bold text-rose-200 uppercase">Fallos (-0.33)</span>
                  <span className="text-2xl font-black text-rose-400">{examScore.wrongCount}</span>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
                  <span className="block text-[10px] font-bold text-slate-300 uppercase">Omisiones (0.0)</span>
                  <span className="text-2xl font-black text-slate-300">{examScore.blankCount}</span>
                </div>
              </div>
            </div>
          )}

          {/* Exam Questions List */}
          <div className="space-y-6">
            {activeExam.map((q, idx) => {
              const userAns = userAnswers[idx];
              const isCorrect = userAns === q.correctIndex;

              return (
                <div key={q.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                        {q.questionText}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 shrink-0">
                      {q.difficulty} • Año {q.year}
                    </span>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5 pl-10">
                    {q.options.map((option, optIdx) => {
                      let optionStyle = "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700";

                      if (isExamSubmitted || isResolved) {
                        if (optIdx === q.correctIndex) {
                          optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500";
                        } else if (userAns === optIdx && !isCorrect) {
                          optionStyle = "bg-rose-50 border-rose-500 text-rose-950 font-medium";
                        } else {
                          optionStyle = "bg-slate-50 border-slate-200 opacity-60 text-slate-500";
                        }
                      } else if (userAns === optIdx) {
                        optionStyle = "bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-500";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isExamSubmitted}
                          onClick={() => handleSelectAnswer(idx, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {(isExamSubmitted || isResolved) && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {(isExamSubmitted || isResolved) && userAns === optIdx && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation if submitted or resolved */}
                  {(isExamSubmitted || isResolved) && (
                    <div className="pl-10 pt-2">
                      <div className="bg-indigo-50/70 border-l-4 border-indigo-600 p-4 rounded-r-xl text-xs space-y-1">
                        <span className="font-extrabold text-indigo-950 block">Explicación Oficial del Tribunal:</span>
                        <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Exam Footer */}
          {!isExamSubmitted && (
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmitExam}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs md:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Finalizar y Entregar Simulacro
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
