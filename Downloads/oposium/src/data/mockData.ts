import type { Opposition, Block, PracticalCase, TrickPattern, DifficultConcept, Flashcard, ForumPost, Achievement, AccessRequirement, ExpectedQuality } from '../types';

export const INITIAL_OPPOSITIONS: Opposition[] = [
  {
    id: 'tramitacion-procesal',
    name: 'Tramitación Procesal y Administrativa (Justicia)',
    cuerpo: 'Cuerpo de Tramitación Procesal y Administrativa',
    referencia: 'BOE-A-2024-11892',
    grupo: 'C1',
    organismo: 'Administración del Estado',
    comunidad: 'Nacional / Varias CCAA',
    provincia: 'Todas',
    municipio: 'Todos',
    cupoDiscapacidad: 'Reserva específica / SI',
    tipoExamen: 'Concurso oposición',
    titulacionMinima: 'Bachillerato / FP',
    estado: 'Abiertas',
    plazas: 1050,
    fechaLimite: '2025-05-30',
    ambito: 'Estatal / Ministerio de Justicia',
    recomendacionOficial: 'Recomendación Legislativa: Atención: La Ley 20/2011 de Registro Civil transformó las Oficinas de Registro Civil y las funciones de Auxilio en los juzgados de paz. Los lanzamientos procesales se han adaptado recientemente a las exigencias habitacionales de la Ley de Vivienda de 2023, introduciendo filtros de vulnerabilidad esenciales.',
    linkOficial: 'https://www.boe.es/diario_boe/xml.php?id=BOE-A-2024-11892',
    description: 'Gestión y tramitación de expedientes judiciales, redacción de diligencias, actas y notificaciones en juzgados y tribunales de toda España.'
  },
  {
    id: 'auxilio-judicial',
    name: 'Auxilio Judicial (Administración de Justicia)',
    cuerpo: 'Cuerpo de Auxilio Judicial',
    referencia: 'BOE-A-2024-15430',
    grupo: 'C2',
    organismo: 'Administración del Estado',
    comunidad: 'Nacional',
    provincia: 'Madrid',
    municipio: 'Madrid',
    cupoDiscapacidad: 'Reserva específica / SI',
    tipoExamen: 'Oposición pura',
    titulacionMinima: 'ESO o equivalente',
    estado: 'Abiertas',
    plazas: 820,
    fechaLimite: '2025-06-15',
    ambito: 'Estatal / Juzgados de Instrucción y Primera Instancia',
    recomendacionOficial: 'Recomendación Especial: Modificaciones urgentes introducidas por el RDL 6/2023 en materia de eficiencia digital en el servicio público de Justicia. Prestar atención a las notificaciones telemáticas y actos de comunicación.',
    linkOficial: 'https://www.boe.es/diario_boe/xml.php?id=BOE-A-2024-15430',
    description: 'Ejecución de embargos, lanzamientos, notificaciones judiciales y mantenimiento del orden en las salas de vistas.'
  },
  {
    id: 'administrativo-estado',
    name: 'Administrativo de la Administración General del Estado (AGE)',
    cuerpo: 'Cuerpo General Administrativo de la Administración del Estado',
    referencia: 'BOE-A-2024-09821',
    grupo: 'C1',
    organismo: 'Administración del Estado',
    comunidad: 'Madrid',
    provincia: 'Madrid',
    municipio: 'Madrid',
    cupoDiscapacidad: 'Sin reserva especial',
    tipoExamen: 'Oposición pura',
    titulacionMinima: 'Bachillerato / FP',
    estado: 'Próxima convocatoria',
    plazas: 3150,
    fechaLimite: '2025-09-10',
    ambito: 'Ministerios y Subdelegaciones del Gobierno',
    recomendacionOficial: 'Recomendación Clave: La Ley 39/2015 del Procedimiento Administrativo Común y la Ley 40/2015 de Régimen Jurídico constituyen más del 40% de las preguntas globales del examen.',
    linkOficial: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-09821',
    description: 'Tratamiento de expedientes administrativos, atención e información al ciudadano, gestión financiera y de personal en los ministerios.'
  },
  {
    id: 'auxiliar-andalucia',
    name: 'Auxiliar Administrativo Junta de Andalucía',
    cuerpo: 'Cuerpo General de Auxiliares Administrativos (C2.1000)',
    referencia: 'BOJA-2024-00129',
    grupo: 'C2',
    organismo: 'Autonómica / CCAA',
    comunidad: 'Andalucía',
    provincia: 'Sevilla',
    municipio: 'Sevilla',
    cupoDiscapacidad: 'Reserva específica / SI',
    tipoExamen: 'Concurso oposición',
    titulacionMinima: 'ESO o equivalente',
    estado: 'Abiertas',
    plazas: 450,
    fechaLimite: '2025-04-20',
    ambito: 'Autonómico / Junta de Andalucía',
    recomendacionOficial: 'Recomendación Autonómica: Dominar el Estatuto de Autonomía de Andalucía (Ley Orgánica 2/2007) y las competencias exclusivas en materia de organización institucional.',
    linkOficial: 'https://www.juntadeandalucia.es/boja/2024/129/1',
    description: 'Atención presencial y telemática al público, grabación de datos, archivo documental y tramitación básica de subvenciones de la Junta.'
  },
  {
    id: 'gestion-procesal',
    name: 'Gestión Procesal y Administrativa',
    cuerpo: 'Cuerpo de Gestión Procesal y Administrativa',
    referencia: 'BOE-A-2024-22104',
    grupo: 'A2',
    organismo: 'Administración del Estado',
    comunidad: 'Nacional',
    provincia: 'Barcelona',
    municipio: 'Barcelona',
    cupoDiscapacidad: 'Sin reserva especial',
    tipoExamen: 'Concurso oposición',
    titulacionMinima: 'Grado / Licenciatura',
    estado: 'Cerradas',
    plazas: 680,
    fechaLimite: '2025-01-15',
    ambito: 'Tribunales Superiores de Justicia y Audiencias Provinciales',
    recomendacionOficial: 'Atención Procesal: El tercer ejercicio consiste en un caso práctico escrito redactado en un máximo de 45 minutos. Estudiar los modelos procesales de la LEC y LECrim.',
    linkOficial: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-22104',
    description: 'Colaboración directa en la gestión de la oficina judicial, expedición de copias certificadas y firma de diligencias de ordenación.'
  },
  {
    id: 'tecnico-hacienda',
    name: 'Técnico de Hacienda (AEAT)',
    cuerpo: 'Cuerpo Técnico de Hacienda',
    referencia: 'BOE-A-2024-04122',
    grupo: 'A2',
    organismo: 'Administración del Estado',
    comunidad: 'Nacional',
    provincia: 'Madrid',
    municipio: 'Madrid',
    cupoDiscapacidad: 'Sin reserva especial',
    tipoExamen: 'Oposición pura',
    titulacionMinima: 'Grado / Licenciatura',
    estado: 'Próxima convocatoria',
    plazas: 700,
    fechaLimite: '2025-10-01',
    ambito: 'Agencia Estatal de Administración Tributaria',
    recomendacionOficial: 'Recomendación Contable: El segundo examen requiere un dominio absoluto de la Contabilidad Financiera y Matemáticas Financieras. Priorizar resolución de ejercicios numéricos.',
    linkOficial: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-04122',
    description: 'Inspección de tributos, gestión aduanera, comprobación de liquidaciones fiscales e investigación del fraude tributario.'
  }
];

export const MOCK_BLOCKS: Record<string, Block[]> = {
  'tramitacion-procesal': [
    {
      id: 'b1',
      title: 'Bloque I: Derecho Constitucional, Derechos Humanos y Organización del Estado',
      weightPercentage: 25,
      impactLevel: 'Muy Alto',
      topics: [
        {
          id: 't1',
          blockId: 'b1',
          title: 'Tema 1: La Constitución Española de 1978',
          summary: 'Estructura, principios rectores, derechos fundamentales y libertades públicas. Garantías y suspensión.',
          fullTheory: 'La Constitución Española de 1978 es la norma suprema del ordenamiento jurídico español. Consta de 169 artículos, 4 disposiciones adicionales, 9 transitorias, 1 derogatoria y 1 final. Su Título Preliminar define los valores superiores: libertad, justicia, igualdad y pluralismo político.',
          officialArticles: [
            { title: 'Art. 1.1 CE', text: 'España se constituye en un Estado social y democrático de Derecho, que propugna como valores superiores de su ordenamiento jurídico la libertad, la justicia, la igualdad y el pluralismo político.' },
            { title: 'Art. 9.3 CE', text: 'La Constitución garantiza el principio de legalidad, la jerarquía normativa, la publicidad de las normas, la irretroactividad de las disposiciones sancionadoras no favorables o restrictivas de derechos individuales, la seguridad jurídica, la responsabilidad y la interdicción de la arbitrariedad de los poderes públicos.' }
          ]
        },
        {
          id: 't2',
          blockId: 'b1',
          title: 'Tema 2: El Poder Judicial en la Constitución',
          summary: 'Principios constitucionales de la Justicia. El Consejo General del Poder Judicial. El Ministerio Fiscal.',
          fullTheory: 'El Poder Judicial emana del pueblo y se administra en nombre del Rey por Jueces y Magistrados integrantes del poder judicial, independientes, inamovibles, responsables y sometidos únicamente al imperio de la ley.',
          officialArticles: [
            { title: 'Art. 117.1 CE', text: 'La justicia emana del pueblo y se administra en nombre del Rey por Jueces y Magistrados integrantes del poder judicial, independientes, inamovibles, responsables y sometidos únicamente al imperio de la ley.' },
            { title: 'Art. 122 CE', text: 'La Ley Orgánica del Poder Judicial determinará la constitución, funcionamiento y gobierno de los Juzgados y Tribunales, así como el estatuto jurídico de los Jueces y Magistrados de carrera.' }
          ]
        }
      ]
    },
    {
      id: 'b2',
      title: 'Bloque II: Organización de la Administración de Justicia y Procedimientos Judiciales',
      weightPercentage: 35,
      impactLevel: 'Muy Alto',
      topics: [
        {
          id: 't3',
          blockId: 'b2',
          title: 'Tema 3: Procedimiento Civil Ordinario y Juicio Verbal',
          summary: 'Fases procesales, demanda, contestación, audiencia previa, vista y sentencia conforme a la LEC 1/2000.',
          fullTheory: 'El Juicio Ordinario se decide en razón de la materia o por cuantía superior a 15.000 euros. Consta de demanda, contestación (20 días), audiencia previa y juicio oral. El Juicio Verbal tramita demandas de cuantía hasta 15.000 euros con demanda sucinta o cumplimentada en formulario.',
          officialArticles: [
            { title: 'Art. 249 LEC', text: 'Se decidirán en el juicio ordinario las demandas cualquiera que sea su cuantía cuyo interés económico rebase los 15.000 euros y las materias específicas expresadas en este artículo.' },
            { title: 'Art. 438 LEC', text: 'El juicio verbal principiará por demanda, con el contenido y forma previstos para el juicio ordinario, contestándose en el plazo de diez días.' }
          ]
        },
        {
          id: 't4',
          blockId: 'b2',
          title: 'Tema 4: Recursos Procesales en la Administración de Justicia',
          summary: 'Recursos de reposición, revisión, apelación, queja, infracción procesal y casación.',
          fullTheory: 'Contra las resoluciones judiciales de los Letrados de la Administración de Justicia y los Tribunales proceden los recursos regulados en la LEC. Destaca el recurso de queja contra la denegación de la tramitación del recurso de apelación.',
          officialArticles: [
            { title: 'Art. 494 LEC', text: 'Procederá el recurso de queja contra los autos en que el tribunal que haya dictado la resolución recurrida deniegue la tramitación de un recurso de apelación, de infracción procesal o de casación.' }
          ]
        }
      ]
    },
    {
      id: 'b3',
      title: 'Bloque III: Registro Civil, Registro de la Propiedad y Eficiencia Digital Judicial',
      weightPercentage: 40,
      impactLevel: 'Muy Alto',
      topics: [
        {
          id: 't5',
          blockId: 'b3',
          title: 'Tema 5: La Ley 20/2011 del Registro Civil y Eficiencia Digital (RDL 6/2023)',
          summary: 'Nueva estructura desjudicializada del Registro Civil, LexNET, expediente judicial electrónico y la Ley de Vivienda de 2023.',
          fullTheory: 'El Registro Civil se configura como un registro público único, electrónico y organizado en Oficinas Generales, Consulares y Central. La entrada en vigor del RDL 6/2023 introduce la tramitación digital prioritaria de escritos y notificaciones telemáticas.',
          officialArticles: [
            { title: 'Art. 3 Ley 20/2011', text: 'El Registro Civil es un registro público dependiente del Ministerio de Justicia. Todos los ciudadanos tienen acceso universal a sus datos de estado civil.' },
            { title: 'Art. 439.6 LEC (vivienda)', text: 'En los casos de demanda de desahucio por falta de pago, no se admitirá la demanda si no se indica si la finca constituye vivienda habitual y la condición de vulnerabilidad social del demandado.' }
          ]
        },
        {
          id: 't6',
          blockId: 'b3',
          title: 'Tema 6: Ejecución Forzosa y Embargo de Bienes',
          summary: 'Despacho de ejecución, oposición a la ejecución, orden de los embargos y subasta judicial electrónica.',
          fullTheory: 'El embargo se traba sobre bienes del ejecutado suficientes para cubrir la suma fijada en el auto de despacho de ejecución. Se respeta el orden de liquidez salvo acuerdo distinto de las partes.',
          officialArticles: [
            { title: 'Art. 592 LEC', text: 'Si las partes no hubieren acordado otra cosa, el Secretario judicial embargará los bienes del ejecutado teniendo en cuenta la mayor facilidad de su enajenación y la menor onerosidad para aquél.' }
          ]
        }
      ]
    }
  ]
};

export const ACCESS_REQUIREMENTS: Record<string, AccessRequirement[]> = {
  'tramitacion-procesal': [
    { id: 'req1', title: 'Nacionalidad', description: 'Tener la nacionalidad española.' },
    { id: 'req2', title: 'Edad', description: 'Tener cumplidos dieciséis años y no exceder de la edad máxima de jubilación forzosa.' },
    { id: 'req3', title: 'Titulación Titular', description: 'Estar en posesión o en condiciones de obtener el título de Bachiller o Técnico Superior (FP de Grado Superior) al finalizar el plazo de presentación de instancias.' },
    { id: 'req4', title: 'Capacidad Funcional', description: 'Poseer la capacidad funcional necesaria para el desempeño de las tareas propias del cuerpo de Tramitación Procesal.' },
    { id: 'req5', title: 'Habilitación Sanitaria y Penal', description: 'No haber sido condenado por delito doloso a penas privativas de libertad superiores a tres años, ni hallarse inhabilitado para el ejercicio de funciones públicas.' }
  ]
};

export const EXPECTED_QUALITIES: Record<string, ExpectedQuality[]> = {
  'tramitacion-procesal': [
    { id: 'q1', title: 'Rigor Procesal y Exactitud en Plazos', description: 'Capacidad para computar plazos judiciales con precisión matemática respetando días hábiles, in hábiles y festivos procesales.' },
    { id: 'q2', title: 'Dominio de Herramientas de Gestión Judicial Digital', description: 'Manejo fluido del expediente judicial electrónico, LexNET, Minerva y firma digital avanzada.' },
    { id: 'q3', title: 'Resistencia al Estrés y Gestión del Volumen de Causa', description: 'Destreza para clasificar y dar salida procesal a decenas de notificaciones, autos y providencias de forma simultánea.' },
    { id: 'q4', title: 'Ética y Confidencialidad Judicial', description: 'Mantenimiento del secreto profesional estricto respecto a los datos protegidos de las partes procesales conforme al RGPD.' }
  ]
};

export const MOCK_PRACTICAL_CASES: PracticalCase[] = [
  {
    id: 'pc1',
    oppositionId: 'tramitacion-procesal',
    year: 2024,
    title: 'Caso Práctico 1: Lanzamiento por Desahucio de Vivienda Habitual y Aplicación de la Ley de Vivienda 2023',
    description: 'En el Juzgado de Primera Instancia nº 4 de Madrid se tramita un juicio verbal de desahucio por falta de pago promovido por la arrendadora María contra el arrendatario Juan sobre la vivienda situada en la C/ Gran Vía nº 12. La actora solicita el lanzamiento inmediato.',
    questions: [
      {
        question: '¿Qué requisito de admisibilidad previo de la demanda impone el artículo 439.6 de la LEC tras las reformas legislativas recientes si el demandante es un gran tenedor?',
        options: [
          'Presentar únicamente la copia del contrato de arrendamiento privado firmado.',
          'Acreditar si la parte demandada se encuentra o no en situación de vulnerabilidad económica mediante informe del órgano de servicios sociales competente.',
          'Aportar un depósito judicial fianza previa de 3.000 euros.',
          'Solicitar el señalamiento inmediato del juicio sin oír previamente a la parte demandada.'
        ],
        correctIndex: 1,
        explanation: 'Conforme al art. 439.6 LEC (modificado por la Ley de Vivienda 12/2023), no se admitirán las demandas de desahucio si no se especifica si la finca constituye vivienda habitual y si la parte demandante acredita haber sometido la situación a procedimiento de conciliación/intermediación cuando el actor sea gran tenedor y el demandado esté en vulnerabilidad.'
      },
      {
        question: '¿Cuál es el plazo del que dispone el demandado para contestar a la demanda en el Juicio Verbal de desahucio?',
        options: [
          '5 días hábiles.',
          '10 días hábiles.',
          '20 días hábiles.',
          '15 días naturales.'
        ],
        correctIndex: 1,
        explanation: 'El artículo 438.1 de la LEC establece que en los juicios verbales, la contestación a la demanda se realizará en el plazo de 10 días hábiles.'
      }
    ]
  },
  {
    id: 'pc2',
    oppositionId: 'tramitacion-procesal',
    year: 2023,
    title: 'Caso Práctico 2: Embargo de Bienes y Orden de Liquidez en Ejecución de Título Judicial',
    description: 'Ante el impago de un título judicial que condena al ejecutado a abonar 45.000 euros, la representación procesal del ejecutante solicita el embargo directo de la vivienda familiar del deudor habiendo saldo bancario suficiente en sus cuentas de depósito a plazo fijo.',
    questions: [
      {
        question: 'Conforme al artículo 592 de la LEC, ¿es correcto proceder al embargo de la vivienda habitual existiendo saldos bancarios y liquidez inmediata?',
        options: [
          'Sí, porque el ejecutante tiene libre elección absoluta de los bienes a embargar.',
          'No, porque el Secretario judicial (LAJ) debe embargar conforme al orden de prelación legal priorizando dinero y saldos en cuentas bancarias para minimizar la onerosidad al ejecutado.',
          'Sí, siempre que lo autorice el Juez por auto motivado en 24 horas.',
          'No, la vivienda habitual no se puede embargar en ningún caso en el ordenamiento español.'
        ],
        correctIndex: 1,
        explanation: 'El art. 592 LEC determina que, a falta de acuerdo entre las partes, el embargo se sujetará a la mayor facilidad de enajenación y menor onerosidad, fijando el dinero y saldos en cuentas en la primera posición del orden legal.'
      }
    ]
  }
];

export const MOCK_TRICK_PATTERNS: TrickPattern[] = [
  {
    id: 'tp1',
    oppositionId: 'tramitacion-procesal',
    year: 2024,
    topicTitle: 'Tema 4: Recursos Procesales',
    trickTitle: 'Confusión del Plazo del Recurso de Queja con la Queja Administrativa',
    description: 'El tribunal intenta que el opositor marque 1 mes (propio del recurso de alzada o queja administrativa) en lugar de los 5 días procesales del recurso de queja de la LEC.',
    exampleQuestion: '¿De qué plazo se dispone para interponer el recurso de queja contra la resolución que deniega la admisión a trámite de un recurso de apelación?',
    trapExplanation: 'La respuesta trampa suele ser "1 mes" o "10 días". El opositor confunde el concepto con la queja por retraso o inactividad de la Administración.',
    howToSolve: 'Aplica la regla nemotécnica QUE-DI-CIN: QUEja procesal = DIctado de inadmisión = CINco días hábiles.'
  },
  {
    id: 'tp2',
    oppositionId: 'tramitacion-procesal',
    year: 2023,
    topicTitle: 'Tema 3: Procedimientos Civiles',
    trickTitle: 'Umbral de Cuantía entre Juicio Verbal y Juicio Ordinario',
    description: 'El tribunal suele incluir preguntas actualizadas sobre la modificación del umbral económico introducido en reformas procesales.',
    exampleQuestion: '¿A partir de qué cuantía económica las demandas civiles no asignadas por materia específica se tramitan por el cauce del Juicio Ordinario?',
    trapExplanation: 'Antiguamente el límite era 6.000 euros. Muchas colecciones de test obsoletas siguen señalando 6.000 euros.',
    howToSolve: 'Memoriza el nuevo umbral legal actualizado a 15.000 euros (RDL 6/2023). Hasta 15.000€ es Juicio Verbal; por encima de 15.000€ es Juicio Ordinario.'
  }
];

export const MOCK_DIFFICULT_CONCEPTS: DifficultConcept[] = [
  {
    id: 'dc1',
    oppositionId: 'tramitacion-procesal',
    year: 2024,
    conceptTitle: 'Plazos del Recurso de Queja',
    difficultyLevel: 'Ultra Complejo',
    accuracyRate: 8,
    whyFails: 'La queja procesal tiene plazos muy estrictos y varía según si se trata de recurrir la inadmisión de apelación o de casación, confundiéndose fácilmente con la queja administrativa de 1 mes.',
    mnemonicRule: {
      acronym: 'QUE-DI-CIN',
      description: 'QUEja - DIctado de inadmisión - CINco días. El plazo general para interponer el recurso de queja contra el auto que deniega la tramitación de una apelación es de 5 días.'
    },
    ridiculousAssociation: 'Imagina un juez que grita "¡QUE se canse de CINco saltos!" mientras rechaza tu recurso con cara de pocos amigos.',
    quickTest: {
      question: '¿De cuántos días dispones para interponer el recurso de queja general ante el órgano superior?',
      solution: 'Solución: 5 días hábiles.'
    }
  },
  {
    id: 'dc2',
    oppositionId: 'tramitacion-procesal',
    year: 2023,
    conceptTitle: 'Competencia de las Oficinas del Registro Civil',
    difficultyLevel: 'Ultra Complejo',
    accuracyRate: 8,
    whyFails: 'La desjudicialización total de 2021 redistribuyó competencias de forma compleja entre consulados y oficinas generales sin juzgados de paz como encargados.',
    mnemonicRule: {
      acronym: 'OF-GEN-CON',
      description: 'OFicinas GENerales y CONsulares son las encargadas exclusivas de la práctica de asientos directos.'
    },
    ridiculousAssociation: 'Un cónsul firmando partidas de nacimiento en la cubierta de un barco con sello oficial gigante.',
    quickTest: {
      question: '¿Quién Ostenta la Encargaduría de la Oficina Central del Registro Civil?',
      solution: 'Solución: Los Encargados designados por la Dirección General de Fe Pública y Seguridad Jurídica.'
    }
  },
  {
    id: 'dc3',
    oppositionId: 'tramitacion-procesal',
    year: 2022,
    conceptTitle: 'Excepciones al Despacho de Ejecución Civil',
    difficultyLevel: 'Ultra Complejo',
    accuracyRate: 8,
    whyFails: 'Requiere citar artículos correlativos de la LEC y diferenciar plazos de oposición de fondo vs. forma.',
    mnemonicRule: {
      acronym: 'OP-DIEZ-FON',
      description: 'OPosición a la ejecución = DIEZ días hábiles tanto por defectos de FONdo como de forma.'
    },
    ridiculousAssociation: 'Un ejecutado levantando un escudo de 10 metros de altura frente a la comitiva judicial.',
    quickTest: {
      question: '¿En qué plazo formal se formula la oposición al despacho de ejecución en la LEC?',
      solution: 'Solución: Dentro de los 10 días siguientes a la notificación del auto despachando ejecución.'
    }
  }
];

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc1',
    oppositionId: 'tramitacion-procesal',
    front: '¿Cuál es el plazo de caducidad de la instancia en primera instancia si el proceso permanece paralizado por causa imputable a las partes?',
    back: '2 años (Art. 237.1 LEC). En segunda instancia o recursos extraordinarios es de 1 año.',
    box: 1
  },
  {
    id: 'fc2',
    oppositionId: 'tramitacion-procesal',
    front: '¿Qué día de la semana vence el plazo para presentar escritos de término mediante el día de gracia?',
    back: 'Hasta las 15:00 horas del día hábil siguiente al del vencimiento del plazo (Art. 135.5 LEC).',
    box: 2
  },
  {
    id: 'fc3',
    oppositionId: 'tramitacion-procesal',
    front: '¿Qué mayoría se requiere para la adopción de acuerdos en el Pleno del Tribunal Constitucional?',
    back: 'Mayoría de los miembros presentes que asistan a la sesión (quórum mínimo 2/3). En caso de empate decide el voto de calidad del Presidente.',
    box: 3
  },
  {
    id: 'fc4',
    oppositionId: 'tramitacion-procesal',
    front: '¿Cuál es la cuantía máxima autorizada para interponer demanda verbal sin necesidad de abogado ni procurador?',
    back: 'Demandas cuya cuantía no exceda de 2.000 euros (Art. 23.2 y 31.2 LEC).',
    box: 4
  },
  {
    id: 'fc5',
    oppositionId: 'tramitacion-procesal',
    front: '¿Qué pena privativa de derechos inhabilita para ser miembro de un jurado popular conforme a la LOTJ?',
    back: 'Estar privado por resolución judicial firme de los derechos políticos o estar suspendido de empleo o cargo público.',
    box: 5
  }
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: 'fp1',
    author: 'Carlos_Opositor92',
    authorRole: 'Opositor Tramitación Procesal',
    category: 'Grupo C1 - Tramitación Procesal',
    title: '¿Creéis que afectará la Ley de Eficiencia Digital al número de preguntas del examen de 2025?',
    content: 'Hola a todos. Leyendo las recomendaciones del preparador en el Análisis Estadístico, mencionan que el RDL 6/2023 va a concentrar muchas preguntas en el bloque de organización. ¿Alguien tiene esquemas comparativos de la citación telemática vs presencial?',
    createdAt: 'Hace 2 horas',
    likes: 14,
    replies: [
      {
        id: 'fpr1',
        author: 'Elena_Preparadora',
        authorRole: 'Preparadora Oficial',
        content: 'Totalmente Carlos. El tribunal en los últimos años ha premiado las novedades legislativas de los 2 años anteriores al examen. Revisa la lección ampliada del Tema 5 en la pestaña de Material PDF.',
        createdAt: 'Hace 1 hora'
      }
    ]
  },
  {
    id: 'fp2',
    author: 'Maria_Justicia',
    authorRole: 'Opositora Auxilio Judicial',
    category: 'Grupo C2 - Auxilio Judicial',
    title: 'Duda con el cómputo de plazos en agosto y días in hábiles',
    content: 'Tengo un lío con el mes de agosto en actuaciones urgentes. ¿El procedimiento para la protección de derechos fundamentales se tramita durante el mes de agosto?',
    createdAt: 'Ayer',
    likes: 8,
    replies: [
      {
        id: 'fpr2',
        author: 'Javier_Juez',
        authorRole: 'Opositor Experto',
        content: 'Sí, el mes de agosto es inhábil salvo para actuaciones declaradas urgentes por la ley, como las de amparo, protección de derechos fundamentales y procedimientos cautelares.',
        createdAt: 'Ayer'
      }
    ]
  }
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach1',
    title: 'Constancia de Acero',
    description: 'Estudia 7 días seguidos y mantén tu racha activa en la plataforma.',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: '2025-02-18',
    category: 'Racha'
  },
  {
    id: 'ach2',
    title: 'Decodificador de Trampas',
    description: 'Completa 5 test del apartado Trampas & Patrones sin cometer errores.',
    icon: 'ShieldCheck',
    unlocked: true,
    unlockedAt: '2025-02-20',
    category: 'Exámenes'
  },
  {
    id: 'ach3',
    title: 'Dominio de Leyes',
    description: 'Revisa el 100% de los temas del syllabus oficial de tu oposición.',
    icon: 'BookOpen',
    unlocked: false,
    category: 'Estudio'
  },
  {
    id: 'ach4',
    title: 'Colaborador de la Comunidad',
    description: 'Publica o responde 3 dudas en el Foro de Opositores.',
    icon: 'MessageSquare',
    unlocked: false,
    category: 'Comunidad'
  }
];
