export interface Opposition {
  id: string;
  name: string; // e.g. "Tramitación Procesal y Administrativa"
  cuerpo: string; // e.g. "Cuerpo de Tramitación Procesal"
  referencia: string; // e.g. "BOE-A-2024-11892"
  grupo: 'A1' | 'A2' | 'C1' | 'C2';
  organismo: 'Administración del Estado' | 'Autonómica / CCAA' | 'Ayuntamientos / Local' | 'Universidades';
  comunidad: string;
  provincia: string;
  municipio: string;
  cupoDiscapacidad: 'Reserva específica / SI' | 'Sin reserva especial';
  tipoExamen: 'Oposición pura' | 'Concurso oposición';
  titulacionMinima: 'Grado / Licenciatura' | 'Diplomatura' | 'Bachillerato / FP' | 'ESO o equivalente';
  estado: 'Abiertas' | 'Cerradas' | 'Próxima convocatoria';
  plazas: number;
  fechaLimite: string;
  ambito: string;
  recomendacionOficial: string;
  linkOficial: string;
  description: string;
}

export interface Topic {
  id: string;
  blockId: string;
  title: string;
  summary: string;
  fullTheory: string;
  officialArticles: { title: string; text: string }[];
}

export interface Block {
  id: string;
  title: string;
  weightPercentage: number; // e.g., 35
  impactLevel: 'Muy Alto' | 'Alto' | 'Medio' | 'Bajo';
  topics: Topic[];
}

export interface AccessRequirement {
  id: string;
  title: string;
  description: string;
}

export interface ExpectedQuality {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface PracticalCase {
  id: string;
  oppositionId: string;
  year: number;
  title: string;
  description: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface TrickPattern {
  id: string;
  oppositionId: string;
  year: number;
  topicTitle: string;
  trickTitle: string;
  description: string;
  exampleQuestion: string;
  trapExplanation: string;
  howToSolve: string;
}

export interface DifficultConcept {
  id: string;
  oppositionId: string;
  year: number;
  conceptTitle: string;
  difficultyLevel: 'Ultra Complejo' | 'Muy Complejo' | 'Complejo';
  accuracyRate: number; // e.g. 8
  whyFails: string;
  mnemonicRule: {
    acronym: string;
    description: string;
  };
  ridiculousAssociation: string;
  quickTest: {
    question: string;
    solution: string;
  };
}

export interface ExamQuestion {
  id: string;
  blockId: string;
  topicId: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  year: number;
  difficulty: 'Fácil' | 'Media' | 'Alta' | 'Ultra Complejo';
}

export interface Flashcard {
  id: string;
  oppositionId: string;
  front: string;
  back: string;
  box: 1 | 2 | 3 | 4 | 5; // Leitner box
  lastReviewed?: string;
}

export interface ForumPost {
  id: string;
  oppositionId?: string;
  author: string;
  authorRole: string;
  category: 'Foro Común General' | 'Grupo C2 - Auxilio Judicial' | 'Grupo C1 - Tramitación Procesal' | 'Técnicas de Estudio';
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: {
    id: string;
    author: string;
    authorRole: string;
    content: string;
    createdAt: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'Estudio' | 'Exámenes' | 'Racha' | 'Comunidad';
}

export interface StudyStats {
  hoursAccumulated: number;
  averageAccuracy: number;
  simulacrosCompleted: number;
  studyStreakDays: number;
}
