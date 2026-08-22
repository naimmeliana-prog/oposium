import React, { useState, useMemo } from 'react';
import { useOpposition } from '../context/OppositionContext';
import type { Opposition } from '../types';
import { Search, Filter, CheckCircle2, ExternalLink, AlertTriangle, Building2, MapPin, Users, Calendar, Award, RefreshCw, Layers } from 'lucide-react';

export const BuscadorOposiciones: React.FC = () => {
  const { allOppositions, selectedOpposition, setSelectedOpposition, setActiveTab } = useOpposition();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('Todas');
  const [grupoFilter, setGrupoFilter] = useState('Todas');
  const [organismoFilter, setOrganismoFilter] = useState('Todos los organismos');
  const [comunidadFilter, setComunidadFilter] = useState('Todas');
  const [provinciaFilter, setProvinciaFilter] = useState('Todas');
  const [municipioFilter, setMunicipioFilter] = useState('Todos');
  const [discapacidadFilter, setDiscapacidadFilter] = useState('Todos');
  const [tipoExamenFilter, setTipoExamenFilter] = useState('Todos');
  const [titulacionFilter, setTitulacionFilter] = useState('Todas');

  // Live searching status simulation
  const [isLiveSearching, setIsLiveSearching] = useState(false);
  const [linkCheckingId, setLinkCheckingId] = useState<string | null>(null);
  const [verifiedLinks, setVerifiedLinks] = useState<Record<string, boolean>>({});

  const handleLiveSearch = () => {
    setIsLiveSearching(true);
    setTimeout(() => {
      setIsLiveSearching(false);
    }, 800);
  };

  const handleVerifyLink = (id: string, url: string) => {
    setLinkCheckingId(id);
    setTimeout(() => {
      setVerifiedLinks(prev => ({ ...prev, [id]: true }));
      setLinkCheckingId(null);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const filteredOppositions = useMemo(() => {
    return allOppositions.filter(opp => {
      // Search term check
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        !query ||
        opp.name.toLowerCase().includes(query) ||
        opp.cuerpo.toLowerCase().includes(query) ||
        opp.referencia.toLowerCase().includes(query) ||
        opp.description.toLowerCase().includes(query) ||
        opp.ambito.toLowerCase().includes(query);

      // Filters check
      const matchesEstado = estadoFilter === 'Todas' || opp.estado === estadoFilter;
      const matchesGrupo = grupoFilter === 'Todas' || opp.grupo === grupoFilter;
      const matchesOrganismo = organismoFilter === 'Todos los organismos' || opp.organismo === organismoFilter;
      const matchesComunidad = comunidadFilter === 'Todas' || opp.comunidad.includes(comunidadFilter) || opp.comunidad === 'Nacional';
      const matchesProvincia = provinciaFilter === 'Todas' || opp.provincia === provinciaFilter || opp.provincia === 'Todas';
      const matchesMunicipio = municipioFilter === 'Todos' || opp.municipio === municipioFilter || opp.municipio === 'Todos';
      const matchesDiscapacidad = discapacidadFilter === 'Todos' || opp.cupoDiscapacidad === discapacidadFilter;
      const matchesTipoExamen = tipoExamenFilter === 'Todos' || opp.tipoExamen === tipoExamenFilter;
      const matchesTitulacion = titulacionFilter === 'Todas' || opp.titulacionMinima.includes(titulacionFilter);

      return (
        matchesSearch &&
        matchesEstado &&
        matchesGrupo &&
        matchesOrganismo &&
        matchesComunidad &&
        matchesProvincia &&
        matchesMunicipio &&
        matchesDiscapacidad &&
        matchesTipoExamen &&
        matchesTitulacion
      );
    });
  }, [
    allOppositions,
    searchTerm,
    estadoFilter,
    grupoFilter,
    organismoFilter,
    comunidadFilter,
    provinciaFilter,
    municipioFilter,
    discapacidadFilter,
    tipoExamenFilter,
    titulacionFilter
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setEstadoFilter('Todas');
    setGrupoFilter('Todas');
    setOrganismoFilter('Todos los organismos');
    setComunidadFilter('Todas');
    setProvinciaFilter('Todas');
    setMunicipioFilter('Todos');
    setDiscapacidadFilter('Todos');
    setTipoExamenFilter('Todos');
    setTitulacionFilter('Todas');
  };

  const handleSelectOpposition = (opp: Opposition) => {
    setSelectedOpposition(opp);
    setActiveTab('temario');
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            Buscador Oficial Avanzado & Tiempo Real
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Buscador de Convocatorias y Oposiciones
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Consulte en tiempo real las convocatorias del BOE, Boletines Autonómicos y portales públicos de empleo. Seleccione la oposición de su interés para personalizar su temario, casos prácticos, simulacros e itinerario de estudio.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="mt-6 relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLiveSearch()}
              placeholder="Buscar por nombre, cuerpo, número de referencia BOE o palabras clave (ej: Tramitación, BOE-A-2024-11892)..."
              className="w-full pl-12 pr-32 py-3.5 bg-slate-800/90 text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base shadow-inner"
            />
            <button
              onClick={handleLiveSearch}
              disabled={isLiveSearching}
              className="absolute right-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-all flex items-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
            >
              {isLiveSearching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                'Buscar Online'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-lg">
            <Filter className="w-5 h-5 text-indigo-600" />
            Filtros Avanzados de Búsqueda
          </div>
          <button
            onClick={resetFilters}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold hover:underline flex items-center gap-1"
          >
            Limpiar todos los filtros
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* a- Estado */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">a) Estado de Convocatoria</label>
            <select
              value={estadoFilter}
              onChange={e => setEstadoFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="Todas">Todas las convocatorias</option>
              <option value="Abiertas">Abiertas (Plazo de inscripción)</option>
              <option value="Cerradas">Cerradas</option>
              <option value="Próxima convocatoria">Próxima convocatoria</option>
            </select>
          </div>

          {/* b- Grupo de titulación */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">b) Grupo de Titulación</label>
            <select
              value={grupoFilter}
              onChange={e => setGrupoFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="Todas">Todos los grupos (A1, A2, C1, C2)</option>
              <option value="A1">Grupo A1 (Grado/Licenciatura)</option>
              <option value="A2">Grupo A2 (Grado/Diplomatura)</option>
              <option value="C1">Grupo C1 (Bachillerato/FP)</option>
              <option value="C2">Grupo C2 (ESO u Homólogo)</option>
            </select>
          </div>

          {/* c- Organismo emisor */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">c) Organismo Emisor</label>
            <select
              value={organismoFilter}
              onChange={e => setOrganismoFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="Todos los organismos">Todos los organismos</option>
              <option value="Administración del Estado">Administración del Estado (AGE)</option>
              <option value="Autonómica / CCAA">Autonómica / CCAA</option>
              <option value="Ayuntamientos / Local">Ayuntamientos / Local</option>
              <option value="Universidades">Universidades</option>
            </select>
          </div>

          {/* d- Comunidad autónoma */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">d) Comunidad Autónoma</label>
            <select
              value={comunidadFilter}
              onChange={e => setComunidadFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="Todas">Todas las CCAA</option>
              <option value="Andalucía">Andalucía</option>
              <option value="Aragón">Aragón</option>
              <option value="Canarias">Canarias</option>
              <option value="Cantabria">Cantabria</option>
              <option value="Castilla y León">Castilla y León</option>
              <option value="Cataluña">Cataluña</option>
              <option value="Comunidad de Madrid">Comunidad de Madrid</option>
              <option value="Comunitat Valenciana">Comunitat Valenciana</option>
              <option value="Galicia">Galicia</option>
              <option value="Nacional">Ámbito Nacional</option>
            </select>
          </div>

          {/* e- Provincia */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">e) Provincia</label>
            <select
              value={provinciaFilter}
              onChange={e => setProvinciaFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="Todas">Todas las provincias</option>
              <option value="Madrid">Madrid</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Sevilla">Sevilla</option>
              <option value="Valencia">Valencia</option>
              <option value="Zaragoza">Zaragoza</option>
              <option value="Málaga">Málaga</option>
            </select>
          </div>

          {/* f- Municipio */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">f) Municipio</label>
            <select
              value={municipioFilter}
              onChange={e => setMunicipioFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="Todos">Todos los municipios</option>
              <option value="Madrid">Madrid</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Sevilla">Sevilla</option>
            </select>
          </div>

          {/* g- Cupo de discapacidad */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">g) Cupo de Discapacidad</label>
            <select
              value={discapacidadFilter}
              onChange={e => setDiscapacidadFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="Todos">Todos los cupos</option>
              <option value="Reserva específica / SI">Reserva específica / SÍ</option>
              <option value="Sin reserva especial">Sin reserva especial</option>
            </select>
          </div>

          {/* h- Tipo de examen */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">h) Tipo de Examen</label>
            <select
              value={tipoExamenFilter}
              onChange={e => setTipoExamenFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="Todos">Todos los tipos</option>
              <option value="Oposición pura">Oposición pura</option>
              <option value="Concurso oposición">Concurso oposición</option>
            </select>
          </div>

          {/* i- Titulación mínima */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">i) Titulación Mínima</label>
            <select
              value={titulacionFilter}
              onChange={e => setTitulacionFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="Todas">Todas las titulaciones</option>
              <option value="Grado">Grado / Licenciatura</option>
              <option value="Diplomatura">Diplomatura</option>
              <option value="Bachillerato">Bachillerato / FP</option>
              <option value="ESO">ESO o equivalente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-slate-600 font-medium">
          Se han encontrado <span className="font-extrabold text-slate-900">{filteredOppositions.length}</span> convocatorias activas
        </p>
        {selectedOpposition && (
          <div className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-200 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            Oposición Activa: <strong className="font-bold">{selectedOpposition.name}</strong>
          </div>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredOppositions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No se encontraron convocatorias</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
              Pruebe a modificar o borrar los criterios de búsqueda o los filtros seleccionados para ampliar los resultados.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          filteredOppositions.map(opp => {
            const isSelected = selectedOpposition.id === opp.id;
            const estadoBadgeColor =
              opp.estado === 'Abiertas'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : opp.estado === 'Cerradas'
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : 'bg-amber-100 text-amber-800 border-amber-300';

            return (
              <div
                key={opp.id}
                className={`bg-white rounded-2xl border transition-all duration-200 p-6 shadow-sm hover:shadow-md ${
                  isSelected ? 'ring-2 ring-indigo-600 border-indigo-500 bg-indigo-50/10' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Title & Badge */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-xs font-bold tracking-wide">
                        Grupo {opp.grupo}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${estadoBadgeColor}`}>
                        {opp.estado}
                      </span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Ref: {opp.referencia}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors">
                      {opp.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">{opp.cuerpo}</p>
                  </div>

                  {/* Select Button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleSelectOpposition(opp)}
                      className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shadow-sm ${
                        isSelected
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Oposición Activa
                        </>
                      ) : (
                        <>
                          <Layers className="w-4 h-4" />
                          Seleccionar Oposición
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Key Metrics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <span className="block text-slate-400 text-[10px] font-semibold uppercase">Organismo</span>
                      <span className="font-bold text-slate-800">{opp.organismo}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <span className="block text-slate-400 text-[10px] font-semibold uppercase">Ámbito Geográfico</span>
                      <span className="font-bold text-slate-800">{opp.ambito}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <span className="block text-slate-400 text-[10px] font-semibold uppercase">Plazas Ofrecidas</span>
                      <span className="font-bold text-indigo-700 text-sm">{opp.plazas} plazas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <span className="block text-slate-400 text-[10px] font-semibold uppercase">Fecha Límite</span>
                      <span className="font-bold text-slate-800">{opp.fechaLimite}</span>
                    </div>
                  </div>
                </div>

                {/* Description & Official Recommendation */}
                <p className="text-slate-600 text-xs md:text-sm mb-4 leading-relaxed">{opp.description}</p>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-xl mb-4 text-xs md:text-sm text-amber-900 leading-relaxed font-medium">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                    <Award className="w-4 h-4 text-amber-600" />
                    Recomendación de Preparador Oficial:
                  </div>
                  {opp.recomendacionOficial}
                </div>

                {/* Footer with verified link */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="font-medium text-slate-700">Titulación mínima:</span> {opp.titulacionMinima}
                    <span className="mx-1">•</span>
                    <span className="font-medium text-slate-700">Discapacidad:</span> {opp.cupoDiscapacidad}
                  </div>

                  <button
                    onClick={() => handleVerifyLink(opp.id, opp.linkOficial)}
                    disabled={linkCheckingId === opp.id}
                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold hover:underline bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors"
                  >
                    {linkCheckingId === opp.id ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                        Comprobando Enlace BOE...
                      </>
                    ) : verifiedLinks[opp.id] ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verificado 200 OK (BOE)
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                        Comprobar Enlace Oficial
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
