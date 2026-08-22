import React, { createContext, useContext, useState } from 'react';
import type { Opposition, Block, PracticalCase, TrickPattern, DifficultConcept, Flashcard, ForumPost, Achievement, StudyStats, AccessRequirement, ExpectedQuality } from '../types';
import { INITIAL_OPPOSITIONS, MOCK_BLOCKS, ACCESS_REQUIREMENTS, EXPECTED_QUALITIES, MOCK_PRACTICAL_CASES, MOCK_TRICK_PATTERNS, MOCK_DIFFICULT_CONCEPTS, MOCK_FLASHCARDS, MOCK_FORUM_POSTS, MOCK_ACHIEVEMENTS } from '../data/mockData';

interface OppositionContextType {
  selectedOpposition: Opposition;
  setSelectedOpposition: (opp: Opposition) => void;
  allOppositions: Opposition[];
  setAllOppositions: React.Dispatch<React.SetStateAction<Opposition[]>>;
  blocks: Block[];
  accessRequirements: AccessRequirement[];
  expectedQualities: ExpectedQuality[];
  practicalCases: PracticalCase[];
  trickPatterns: TrickPattern[];
  difficultConcepts: DifficultConcept[];
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  forumPosts: ForumPost[];
  setForumPosts: React.Dispatch<React.SetStateAction<ForumPost[]>>;
  achievements: Achievement[];
  studyStats: StudyStats;
  setStudyStats: React.Dispatch<React.SetStateAction<StudyStats>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedYears: number[];
  setSelectedYears: React.Dispatch<React.SetStateAction<number[]>>;
}

const OppositionContext = createContext<OppositionContextType | undefined>(undefined);

export const OppositionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allOppositions, setAllOppositions] = useState<Opposition[]>(INITIAL_OPPOSITIONS);
  const [selectedOpposition, setSelectedOpposition] = useState<Opposition>(INITIAL_OPPOSITIONS[0]);
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [selectedYears, setSelectedYears] = useState<number[]>([2024, 2023, 2022]);

  const [flashcards, setFlashcards] = useState<Flashcard[]>(MOCK_FLASHCARDS);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);
  const [studyStats, setStudyStats] = useState<StudyStats>({
    hoursAccumulated: 1,
    averageAccuracy: 0,
    simulacrosCompleted: 0,
    studyStreakDays: 1,
  });

  const blocks = MOCK_BLOCKS[selectedOpposition.id] || MOCK_BLOCKS['tramitacion-procesal'];
  const accessRequirements = ACCESS_REQUIREMENTS[selectedOpposition.id] || ACCESS_REQUIREMENTS['tramitacion-procesal'];
  const expectedQualities = EXPECTED_QUALITIES[selectedOpposition.id] || EXPECTED_QUALITIES['tramitacion-procesal'];
  
  const practicalCases = MOCK_PRACTICAL_CASES.filter(
    pc => pc.oppositionId === selectedOpposition.id || selectedOpposition.id !== 'tramitacion-procesal'
  );
  
  const trickPatterns = MOCK_TRICK_PATTERNS.filter(
    tp => tp.oppositionId === selectedOpposition.id || selectedOpposition.id !== 'tramitacion-procesal'
  );

  const difficultConcepts = MOCK_DIFFICULT_CONCEPTS.filter(
    dc => dc.oppositionId === selectedOpposition.id || selectedOpposition.id !== 'tramitacion-procesal'
  );

  return (
    <OppositionContext.Provider
      value={{
        selectedOpposition,
        setSelectedOpposition,
        allOppositions,
        setAllOppositions,
        blocks,
        accessRequirements,
        expectedQualities,
        practicalCases,
        trickPatterns,
        difficultConcepts,
        flashcards,
        setFlashcards,
        forumPosts,
        setForumPosts,
        achievements: MOCK_ACHIEVEMENTS,
        studyStats,
        setStudyStats,
        activeTab,
        setActiveTab,
        selectedYears,
        setSelectedYears,
      }}
    >
      {children}
    </OppositionContext.Provider>
  );
};

export const useOpposition = () => {
  const context = useContext(OppositionContext);
  if (!context) {
    throw new Error('useOpposition must be used within an OppositionProvider');
  }
  return context;
};
