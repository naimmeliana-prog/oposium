import React, { useState } from 'react';
import { useOpposition } from '../context/OppositionContext';
import { Layers, RotateCw, CheckCircle2, XCircle, Brain } from 'lucide-react';

export const FlashcardsLeitner: React.FC = () => {
  const { selectedOpposition, flashcards, setFlashcards } = useOpposition();

  const [activeBoxFilter, setActiveBoxFilter] = useState<number | 'all'>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Filter flashcards for current opposition and active box
  const filteredCards = flashcards.filter(fc => {
    const matchesOpposition = fc.oppositionId === selectedOpposition.id || selectedOpposition.id !== 'tramitacion-procesal';
    const matchesBox = activeBoxFilter === 'all' || fc.box === activeBoxFilter;
    return matchesOpposition && matchesBox;
  });

  const activeCard = filteredCards[currentCardIndex] || filteredCards[0];

  const handleCardResult = (remembered: boolean) => {
    if (!activeCard) return;

    // Move box logic: if remembered -> box + 1 (max 5); if forgotten -> box 1
    const newBox = remembered ? Math.min(5, activeCard.box + 1) : 1;

    setFlashcards(prev =>
      prev.map(c => (c.id === activeCard.id ? { ...c, box: newBox as 1|2|3|4|5 } : c))
    );

    setIsFlipped(false);

    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const getBoxCount = (boxNum: number) => {
    return flashcards.filter(fc => (fc.oppositionId === selectedOpposition.id || selectedOpposition.id !== 'tramitacion-procesal') && fc.box === boxNum).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            Sistema de Memorización Espaciada
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Tarjetas de Repaso Activo (Flashcards Leitner)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Utiliza el sistema de cajas Leitner para repasar conceptos críticos basándote en tu propia autoevaluación. Se generan automáticamente según {selectedOpposition.name}.
          </p>
        </div>
      </div>

      {/* Leitner Boxes Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((bNum) => {
          const count = getBoxCount(bNum);
          const isSelected = activeBoxFilter === bNum;

          return (
            <button
              key={bNum}
              onClick={() => {
                setActiveBoxFilter(isSelected ? 'all' : bNum);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`p-4 rounded-2xl border text-center transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider mb-1 opacity-80">
                Caja {bNum}
              </div>
              <div className="text-xl font-black">{count} tarjetas</div>
              <div className="text-[10px] mt-1 font-medium opacity-75">
                {bNum === 1 && 'Diario (Caja Inicial)'}
                {bNum === 2 && 'Cada 3 Días'}
                {bNum === 3 && 'Cada 7 Días'}
                {bNum === 4 && 'Cada 15 Días'}
                {bNum === 5 && 'Dominado (30 Días)'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Card Deck */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <Brain className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">No hay tarjetas en esta caja</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
            Seleccione otra caja o limpie el filtro para estudiar todas las tarjetas disponibles.
          </p>
          <button
            onClick={() => setActiveBoxFilter('all')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500"
          >
            Ver Todas las Cajas
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500">
            <span>Tarjeta {currentCardIndex + 1} de {filteredCards.length}</span>
            <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700">
              Ubicación: Caja Leitner {activeCard.box}
            </span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group cursor-pointer min-h-[280px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-indigo-800/50 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="flex justify-between items-center text-xs font-bold text-indigo-300 border-b border-indigo-800/50 pb-3">
              <span className="uppercase tracking-widest">
                {isFlipped ? 'Respuesta y Fundamento Legal' : 'Concepto / Pregunta Flashcard'}
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <RotateCw className="w-3.5 h-3.5" />
                Clic para voltear
              </span>
            </div>

            <div className="py-8 text-center my-auto">
              <p className="text-lg md:text-xl font-extrabold leading-relaxed text-white">
                {isFlipped ? activeCard.back : activeCard.front}
              </p>
            </div>

            <div className="text-center text-[11px] text-slate-400 font-medium pt-2 border-t border-indigo-800/50">
              {isFlipped ? 'Evalúa tu nivel de recuerdo a continuación:' : 'Intenta responder mentalmente antes de voltear la tarjeta'}
            </div>
          </div>

          {/* Self-Assessment Grading Buttons */}
          {isFlipped && (
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <button
                onClick={() => handleCardResult(false)}
                className="p-4 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs md:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                No la sabía (Baja a Caja 1)
              </button>

              <button
                onClick={() => handleCardResult(true)}
                className="p-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs md:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                ¡La recordaba! (Sube de Caja)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
