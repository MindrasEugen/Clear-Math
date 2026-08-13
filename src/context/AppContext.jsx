import React, { createContext, useState, useContext, useEffect } from 'react';
import { grade1Topics, getGrade1TopicById } from '../data/curriculum/grade1/index.js';
import { getGradeTopics } from '../data/curriculum/index.js';
import { DIFFICULTY, VIEWS } from '../data/constants.js';

/**
 * Contesto principale dell'applicazione ClearMath
 * Gestisce:
 * - Vista corrente
 * - Argomenti selezionati
 * - Difficolt√† globale e per argomento
 * - Schede esercizi generate
 */

const AppContext = createContext();

/**
 * Provider del contesto
 */
export function AppProvider({ children }) {
  // Vista corrente
  const [currentView, setCurrentView] = useState(VIEWS.DASHBOARD);
  
  // Argomenti selezionati (Set per evitare duplicati)
  const [selectedTopics, setSelectedTopics] = useState(() => {
    const saved = localStorage.getItem('selectedTopics');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  // Grado selezionato (1-5)
  const [selectedGrade, setSelectedGradeState] = useState(() => {
    const saved = localStorage.getItem('selectedGrade');
    return saved ? parseInt(saved, 10) : 1;
  });

  // Topics del grado corrente
  const currentGradeTopics = getGradeTopics(selectedGrade);
  

  
  // Difficolt√† globale
  const [globalDiff, setGlobalDiff] = useState(() => {
    const saved = localStorage.getItem('globalDiff');
    return saved || DIFFICULTY.LOW;
  });
  
  // Difficolt√† per ogni argomento
  const [topicDiffs, setTopicDiffs] = useState(() => {
    const saved = localStorage.getItem('topicDiffs');
    if (saved) {
      return JSON.parse(saved);
    }
    // Inizializza tutti a Basso
    const initial = {};
    currentGradeTopics.forEach(topic => {
      initial[topic.id] = DIFFICULTY.LOW;
    });
    return initial;
  });
  
  // Esercizi generati per ogni argomento
  const [exercises, setExercises] = useState({});
  
  // Dati studente per la scheda
  const [studentData, setStudentData] = useState({
    name: '',
    date: new Date().toLocaleDateString('it-IT'),
    grade: ''
  });
  
  // Salva stato in localStorage
  useEffect(() => {
    localStorage.setItem('selectedTopics', JSON.stringify(Array.from(selectedTopics)));
  }, [selectedTopics]);
  
  useEffect(() => {
    localStorage.setItem('globalDiff', globalDiff);
  }, [globalDiff]);
  
  useEffect(() => {
    localStorage.setItem('topicDiffs', JSON.stringify(topicDiffs));
  }, [topicDiffs]);


  // Salva selectedGrade in localStorage
  useEffect(() => {
    localStorage.setItem('selectedGrade', selectedGrade.toString());
  }, [selectedGrade]);
  
  // Numero totale di esercizi
  const totalExercises = Object.values(exercises).reduce(
    (sum, exList) => sum + exList.length, 0
  );
  
  // Numero di argomenti selezionati
  const selectedCount = selectedTopics.size;
  
  // Cambia vista
  const switchView = (view) => {
    setCurrentView(view);
  };
  
  // Seleziona/Deseleziona un argomento
  const toggleTopic = (topicId) => {
    const newSelected = new Set(selectedTopics);
    if (newSelected.has(topicId)) {
      newSelected.delete(topicId);
    } else {
      newSelected.add(topicId);
    }
    setSelectedTopics(newSelected);
  };
  
  // Seleziona tutti gli argomenti
  const selectAllTopics = () => {
    const all = new Set(currentGradeTopics.map(t => t.id));
    setSelectedTopics(all);
  };
  
  // Deseleziona tutti gli argomenti
  const deselectAllTopics = () => {
    setSelectedTopics(new Set());
  };
  
  // Imposta difficolt√† globale
  const setGlobalDifficulty = (diff) => {
    setGlobalDiff(diff);
    // Applica anche a tutti gli argomenti
    const newDiffs = {};
    currentGradeTopics.forEach(topic => {
      newDiffs[topic.id] = diff;
    });
    setTopicDiffs(newDiffs);
  };
  
  // Imposta difficolt√† per un singolo argomento
  const setTopicDifficulty = (topicId, diff) => {
    setTopicDiffs(prev => ({
      ...prev,
      [topicId]: diff
    }));
  };
  
  // Applica difficolt√† globale a tutti gli argomenti SELEZIONATI
  const applyGlobalDiffToAll = () => {
    const newDiffs = { ...topicDiffs };
    selectedTopics.forEach(topicId => {
      newDiffs[topicId] = globalDiff;
    });
    setTopicDiffs(newDiffs);
  };
  
  // Imposta esercizi per un argomento
  const setTopicExercises = (topicId, exerciseList) => {
    setExercises(prev => ({
      ...prev,
      [topicId]: exerciseList
    }));
  };
  
  // Pulisce tutti gli esercizi
  const clearExercises = () => {
    setExercises({});
  };

  // Cambia grado (con reset stato correlato)
  const setSelectedGrade = (gradeNumber) => {
    const gradeNum = parseInt(gradeNumber, 10);
    if (gradeNum < 1 || gradeNum > 5 || isNaN(gradeNum)) return;

    // Reset esercizi
    setExercises({});
    
    // Reset argomenti selezionati
    setSelectedTopics(new Set());
    
    // Reset difficolta per argomento
    setTopicDiffs({});
    
    // Imposta nuovo grado
    setSelectedGradeState(gradeNum);
  };

  
  // Aggiorna dati studente
  const updateStudentData = (field, value) => {
    setStudentData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Verifica se ci sono esercizi generati
  const hasExercises = Object.keys(exercises).length > 0;
  
  // Conta esercizi per argomento
  const exercisesByTopic = currentGradeTopics.map(topic => ({
    topicId: topic.id,
    count: exercises[topic.id] ? exercises[topic.id].length : 0
  }));
  
  const value = {
    // Stato
    currentView,
    selectedTopics,
    selectedGrade,
    currentGradeTopics,
    globalDiff,
    topicDiffs,
    exercises,
    studentData,
    
    // Dati derivati
    totalExercises,
    selectedCount,
    hasExercises,
    exercisesByTopic,
    
    // Funzioni
    switchView,
    toggleTopic,
    selectAllTopics,
    deselectAllTopics,
    setGlobalDifficulty,
    setTopicDifficulty,
    applyGlobalDiffToAll,
    setTopicExercises,
    clearExercises,
    updateStudentData,
    setSelectedGrade
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Hook per accedere al contesto
 */
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve essere usato dentro AppProvider');
  }
  return context;
}

export default AppContext;
