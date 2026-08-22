import React, { useState } from 'react';
import { OppositionProvider, useOpposition } from './context/OppositionContext';
import { InicioPanel } from './components/InicioPanel';
import { BuscadorOposiciones } from './components/BuscadorOposiciones';
import { TemarioOficial } from './components/TemarioOficial';
import { CasosPracticos } from './components/CasosPracticos';
import { MaterialPDF } from './components/MaterialPDF';
import { AnalisisEstadistico } from './components/AnalisisEstadistico';
import { TrampasPatrones } from './components/TrampasPatrones';
import { PreguntasDificiles } from './components/PreguntasDificiles';
import { GeneradorExamenes } from './components/GeneradorExamenes';
import { TecnicasEstudio } from './components/TecnicasEstudio';
import { PlanEstudio } from './components/PlanEstudio';
import { FlashcardsLeitner } from './components/FlashcardsLeitner';
import { ForoOpositores } from './components/ForoOpositores';
import { LogrosProgreso } from './components/LogrosProgreso';

import { 
  Search, BookOpen, FileText, Download, BarChart2, AlertCircle, 
  BrainCircuit, HelpCircle, Clock, Calendar, Layers, MessageSquare, Award,
  Home, Bell, User, Menu, X, ShieldCheck
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab, selectedOpposition } = useOpposition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: 'inicio', label: '1. Inicio & Panel', icon: Home },
    { id: 'buscador', label: '2. Buscador de Oposiciones', icon: Search },
    { id: 'temario', label: '3. Temario Oficial', icon: BookOpen },
    { id: 'casos-practicos', label: '4. Casos Prácticos', icon: FileText },
    { id: 'material-pdf', label: '5. Material Completo PDF', icon: Download },
    { id: 'analisis-estadistico', label: '6. Análisis Estadístico', icon: BarChart2 },
    { id: 'trampas-patrones', label: '7. Trampas & Patrones', icon: AlertCircle },
    { id: 'preguntas-dificiles', label: '8. Preguntas Difíciles & Mnemotecnia', icon: BrainCircuit },
    { id: 'generador-examenes', label: '9. Generador de Exámenes', icon: HelpCircle },
    { id: 'tecnicas-estudio', label: '10. Técnicas de Estudio', icon: Clock },
    { id: 'plan-estudio', label: '11. Plan de Estudio', icon: Calendar },
    { id: 'flashcards-leitner', label: '12. Flashcards Leitner', icon: Layers },
    { id: 'foro-opositores', label: '13. Foro de Opositores', icon: MessageSquare },
    { id: 'logros-progreso', label: '14. Logros y Progreso', icon: Award },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio': return <InicioPanel />;
      case 'buscador': return <BuscadorOposiciones />;
      case 'temario': return <TemarioOficial />;
      case 'casos-practicos': return <CasosPracticos />;
      case 'material-pdf': return <MaterialPDF />;
      case 'analisis-estadistico': return <AnalisisEstadistico />;
      case 'trampas-patrones': return <TrampasPatrones />;
      case 'preguntas-dificiles': return <PreguntasDificiles />;
      case 'generador-examenes': return <GeneradorExamenes />;
      case 'tecnicas-estudio': return <TecnicasEstudio />;
      case 'plan-estudio': return <PlanEstudio />;
      case 'flashcards-leitner': return <FlashcardsLeitner />;
      case 'foro-opositores': return <ForoOpositores />;
      case 'logros-progreso': return <LogrosProgreso />;
      default: return <InicioPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Top Corporate Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div
              onClick={() => setActiveTab('inicio')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white shadow-md text-lg group-hover:scale-105 transition-transform">
                O
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block leading-none">
                  OPOSIUM
                </span>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mt-0.5">
                  Plataforma Corporativa
                </span>
              </div>
            </div>
          </div>

          {/* Center Active Opposition Badge */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Oposición Activa:</span>
            <span className="text-white font-bold">{selectedOpposition.name}</span>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
              </button>

              {/* Notifications Popup */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-4 text-xs z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-extrabold text-slate-900">Avisos de Convocatoria</span>
                    <span className="text-[10px] font-bold text-indigo-600">BOE / CCAA</span>
                  </div>
                  <div className="p-2.5 bg-indigo-50/60 rounded-xl border border-indigo-100">
                    <span className="font-bold text-indigo-950 block mb-0.5">BOE-A-2024-11892 Comprobado</span>
                    <p className="text-slate-600">Actualizados los criterios de la Ley de Vivienda en la lista de casos prácticos.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-white block leading-none">Usuario Registrado</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Acceso Premium Gratuito</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6 w-full">
        
        {/* Sidebar Navigation */}
        <aside className={`lg:w-72 shrink-0 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm sticky top-22 space-y-2">
            <div className="px-3 py-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-2">
              Módulos de Preparación
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all text-left ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-indigo-600'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 mt-4 border-t border-slate-100 p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-extrabold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Garantía de Contenido Oficial
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Resultados obtenidos en tiempo real de buscadores públicos de empleo y BOE.
              </p>
            </div>
          </div>
        </aside>

        {/* Workspace Content */}
        <main className="flex-1 min-w-0">
          {renderTabContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-semibold text-slate-300">
            OPOSIUM © 2025 • Plataforma Corporativa Gratúita de Búsqueda y Preparación de Oposiciones
          </p>
          <p className="text-slate-500 text-[11px]">
            Todos los contenidos legislativos y enlaces a convocatorias provienen de fuentes oficiales públicas (BOE, Boletines Autonómicos, Portales de Empleo Público).
          </p>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <OppositionProvider>
      <MainAppContent />
    </OppositionProvider>
  );
}

export default App;
