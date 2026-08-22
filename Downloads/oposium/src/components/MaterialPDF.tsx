import React, { useState } from 'react';
import { useOpposition } from '../context/OppositionContext';
import { Download, FileText, CheckSquare, Calendar, Printer, Sparkles, Layers } from 'lucide-react';
import jsPDF from 'jspdf';

export const MaterialPDF: React.FC = () => {
  const { selectedOpposition, blocks, practicalCases, selectedYears, setSelectedYears } = useOpposition();

  const [includeArticles, setIncludeArticles] = useState<boolean>(true);
  const [expandedTheory, setExpandedTheory] = useState<boolean>(true);
  const [includeSolvedExams, setIncludeSolvedExams] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

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

  const handleGeneratePDF = () => {
    setIsGenerating(true);

    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4'
        });

        // Cover Page
        doc.setFillColor(15, 23, 42); // slate-900
        doc.rect(0, 0, 210, 297, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text('OPOSIUM - DOSSIER OFICIAL', 20, 40);

        doc.setFontSize(16);
        doc.setTextColor(129, 140, 248); // indigo-400
        const titleLines = doc.splitTextToSize(selectedOpposition.name, 170);
        doc.text(titleLines, 20, 55);

        doc.setFontSize(11);
        doc.setTextColor(203, 213, 225); // slate-300
        doc.text(`Cuerpo: ${selectedOpposition.cuerpo}`, 20, 80);
        doc.text(`Grupo: ${selectedOpposition.grupo} | Ref: ${selectedOpposition.referencia}`, 20, 88);
        doc.text(`Organismo: ${selectedOpposition.organismo}`, 20, 96);
        doc.text(`Años Seleccionados: ${selectedYears.sort((a,b) => b-a).join(', ')}`, 20, 104);

        doc.setLineWidth(0.5);
        doc.setDrawColor(99, 102, 241);
        doc.line(20, 115, 190, 115);

        doc.setFontSize(10);
        doc.text('Opciones de Compilación Incluidas:', 20, 125);
        doc.text(`• Texto íntegro de artículos legales: ${includeArticles ? 'SÍ' : 'NO'}`, 25, 133);
        doc.text(`• Lección teórica ampliada (conceptos clave): ${expandedTheory ? 'SÍ' : 'NO'}`, 25, 141);
        doc.text(`• Exámenes y Casos Prácticos Resueltos: ${includeSolvedExams ? 'SÍ' : 'NO'}`, 25, 149);

        // Footer Cover
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text('Generado automáticamente por Oposium - Plataforma Corporativa Oficial de Oposiciones', 20, 280);

        // Page 2: Temario Syllabus
        doc.addPage();
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, 'F');

        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('TEMARIO OFICIAL Y COMPILACIÓN LEGISLATIVA', 20, 20);

        let yPos = 32;

        blocks.forEach(b => {
          if (yPos > 260) {
            doc.addPage();
            yPos = 20;
          }

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(67, 56, 202); // indigo-700
          doc.text(`${b.title} (Peso: ${b.weightPercentage}%)`, 20, yPos);
          yPos += 8;

          b.topics.forEach(t => {
            if (yPos > 260) {
              doc.addPage();
              yPos = 20;
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(15, 23, 42);
            doc.text(t.title, 20, yPos);
            yPos += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(51, 65, 85);
            const theoryText = expandedTheory ? t.fullTheory : t.summary;
            const splitTheory = doc.splitTextToSize(theoryText, 170);
            doc.text(splitTheory, 20, yPos);
            yPos += splitTheory.length * 4.5 + 4;

            if (includeArticles && t.officialArticles && t.officialArticles.length > 0) {
              t.officialArticles.forEach(art => {
                if (yPos > 260) {
                  doc.addPage();
                  yPos = 20;
                }
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(8);
                doc.setTextColor(30, 58, 138);
                doc.text(`[Texto Íntegro] ${art.title}`, 22, yPos);
                yPos += 4;

                doc.setFont('helvetica', 'italic');
                doc.setFontSize(8);
                doc.setTextColor(71, 85, 105);
                const splitArt = doc.splitTextToSize(`"${art.text}"`, 165);
                doc.text(splitArt, 22, yPos);
                yPos += splitArt.length * 4 + 4;
              });
            }
          });
          yPos += 6;
        });

        // Practical Cases Page
        if (includeSolvedExams) {
          doc.addPage();
          yPos = 20;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          doc.setTextColor(15, 23, 42);
          doc.text('CASOS PRÁCTICOS Y EXÁMENES OFICIALES RESUELTOS', 20, yPos);
          yPos += 12;

          const filteredCases = practicalCases.filter(pc => selectedYears.includes(pc.year));

          filteredCases.forEach(pc => {
            if (yPos > 250) {
              doc.addPage();
              yPos = 20;
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(67, 56, 202);
            doc.text(`[Año ${pc.year}] ${pc.title}`, 20, yPos);
            yPos += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(51, 65, 85);
            const descLines = doc.splitTextToSize(pc.description, 170);
            doc.text(descLines, 20, yPos);
            yPos += descLines.length * 4.5 + 6;

            pc.questions.forEach((q, idx) => {
              if (yPos > 250) {
                doc.addPage();
                yPos = 20;
              }

              doc.setFont('helvetica', 'bold');
              doc.setFontSize(9);
              doc.setTextColor(15, 23, 42);
              doc.text(`Pregunta ${idx + 1}: ${q.question}`, 20, yPos);
              yPos += 5;

              doc.setFont('helvetica', 'normal');
              doc.setFontSize(8);
              doc.setTextColor(16, 185, 129); // emerald green
              doc.text(`Solución Correcta: ${q.options[q.correctIndex]}`, 22, yPos);
              yPos += 4;

              doc.setFont('helvetica', 'italic');
              doc.setFontSize(8);
              doc.setTextColor(71, 85, 105);
              const expLines = doc.splitTextToSize(`Explicación: ${q.explanation}`, 165);
              doc.text(expLines, 22, yPos);
              yPos += expLines.length * 4 + 6;
            });
          });
        }

        doc.save(`Material_Oficial_${selectedOpposition.id}_${selectedYears.join('_')}.pdf`);
      } catch (err) {
        console.error("Error generating PDF:", err);
      } finally {
        setIsGenerating(false);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Download className="w-3.5 h-3.5 text-indigo-600" />
          Generador de Documento Exhaustivo
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Material Completo en PDF
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Compila el temario oficial seleccionado y los exámenes resueltos en un único archivo consolidado listo para imprimir o guardar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Generator Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Options Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Layers className="w-5 h-5 text-indigo-600" />
              Configuración de Material a Incluir
            </h2>

            {/* 1. Year Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                1. Selección de Años Anteriores para Exámenes y Casos:
              </label>
              <div className="flex flex-wrap gap-2">
                {availableYears.map(yr => {
                  const isSelected = selectedYears.includes(yr);
                  return (
                    <button
                      key={yr}
                      onClick={() => toggleYear(yr)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      <CheckSquare className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      Convocatoria {yr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Toggles for Articles and Extended Theory */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Profundidad del Temario y Legislación:
              </label>

              {/* Toggle Artículos Íntegros */}
              <div
                onClick={() => setIncludeArticles(!includeArticles)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                  includeArticles ? 'bg-indigo-50/60 border-indigo-500' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={includeArticles}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    Incluir Artículos Íntegros Oficiales
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Adjunta el texto legal completo de los artículos mencionados en cada tema de la ley (Constitución, LEC, Ley del Registro Civil, Ley de Vivienda, etc.).
                  </p>
                </div>
              </div>

              {/* Toggle Lección Teórica Ampliada */}
              <div
                onClick={() => setExpandedTheory(!expandedTheory)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                  expandedTheory ? 'bg-indigo-50/60 border-indigo-500' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={expandedTheory}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    Lección Teórica Ampliada de Alto Rendimiento
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Sustituye los resúmenes cortos por un desarrollo exhaustivo de los conceptos teóricos clave exigidos por el tribunal oficial.
                  </p>
                </div>
              </div>

              {/* Toggle Exámenes y Casos Resueltos */}
              <div
                onClick={() => setIncludeSolvedExams(!includeSolvedExams)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                  includeSolvedExams ? 'bg-indigo-50/60 border-indigo-500' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={includeSolvedExams}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    Anexo de Exámenes y Casos Prácticos Resueltos
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Añade al final del dossier todos los supuestos prácticos y preguntas de examen de los años seleccionados con sus soluciones justificadas.
                  </p>
                </div>
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-sm font-extrabold transition-all shadow-lg flex items-center gap-2 active:scale-95"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
                    Compilando Dossier PDF...
                  </>
                ) : (
                  <>
                    <Printer className="w-5 h-5" />
                    Generar y Descargar PDF Completo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Preview Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="font-bold text-lg text-indigo-300 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Resumen del Documento
            </h3>

            <div className="text-xs space-y-3 text-slate-300">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span>Oposición Activa:</span>
                <strong className="text-white text-right">{selectedOpposition.name}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span>Bloques Temáticos:</span>
                <strong className="text-white">{blocks.length} Bloques</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span>Años de Exámenes:</span>
                <strong className="text-indigo-300">{selectedYears.sort((a,b)=>b-a).join(', ')}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span>Artículos Íntegros:</span>
                <strong className={includeArticles ? 'text-emerald-400' : 'text-slate-500'}>
                  {includeArticles ? 'Incluidos' : 'Excluidos'}
                </strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span>Desarrollo Teórico:</span>
                <strong className={expandedTheory ? 'text-emerald-400' : 'text-slate-500'}>
                  {expandedTheory ? 'Ampliado' : 'Resumido'}
                </strong>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-800/50 text-[11px] text-indigo-200 leading-relaxed">
              <strong>Formato de Impresión:</strong> El documento resultante incluye portada oficial corporativa, índice de temas, tipografía legible ajustada y maquetación adaptada para encuadernación.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
