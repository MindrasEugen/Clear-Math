import React, { createContext, useState, useContext, useEffect } from 'react';
import { getGradeTopics } from '../data/curriculum/index.js';
import { DIFFICULTY, VIEWS } from '../data/constants.js';

/**
 * Contesto principale dell'applicazione ClearMath
 * Gestisce:
 * - Vista corrente
 * - Argomenti selezionati
 * - Difficoltà globale e per argomento
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
  

  
  // Difficoltà globale
  const [globalDiff, setGlobalDiff] = useState(() => {
    const saved = localStorage.getItem('globalDiff');
    return saved || DIFFICULTY.LOW;
  });
  
  // Difficoltà per ogni argomento
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

  // Risposte inserite dallo studente per ogni esercizio (chiave: exercise.id)
  const [studentAnswers, setStudentAnswers] = useState(() => {
    const saved = localStorage.getItem('studentAnswers');
    return saved ? JSON.parse(saved) : {};
  });

  // ID degli esercizi gia conteggiati nelle statistiche di progresso
  // (evita di contare piu volte lo stesso esercizio se l'utente verifica di nuovo)
  const [recordedExerciseIds, setRecordedExerciseIds] = useState(() => {
    const saved = localStorage.getItem('recordedExerciseIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Statistiche di progresso cumulative e giornaliere
  const [progressStats, setProgressStats] = useState(() => {
    const today = new Date().toLocaleDateString('it-IT');
    const saved = localStorage.getItem('progressStats');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.lastActiveDate !== today) {
        return { ...parsed, completedToday: 0, correctToday: 0, lastActiveDate: today };
      }
      return parsed;
    }
    return { totalCompleted: 0, totalCorrect: 0, completedToday: 0, correctToday: 0, lastActiveDate: today };
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

  // Salva risposte studente in localStorage
  useEffect(() => {
    localStorage.setItem('studentAnswers', JSON.stringify(studentAnswers));
  }, [studentAnswers]);

  // Salva ID esercizi conteggiati in localStorage
  useEffect(() => {
    localStorage.setItem('recordedExerciseIds', JSON.stringify(Array.from(recordedExerciseIds)));
  }, [recordedExerciseIds]);

  // Salva statistiche di progresso in localStorage
  useEffect(() => {
    localStorage.setItem('progressStats', JSON.stringify(progressStats));
  }, [progressStats]);
  
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
  
  // Imposta difficoltà globale
  const setGlobalDifficulty = (diff) => {
    setGlobalDiff(diff);
    // Applica anche a tutti gli argomenti
    const newDiffs = {};
    currentGradeTopics.forEach(topic => {
      newDiffs[topic.id] = diff;
    });
    setTopicDiffs(newDiffs);
  };
  
  // Imposta difficoltà per un singolo argomento
  const setTopicDifficulty = (topicId, diff) => {
    setTopicDiffs(prev => ({
      ...prev,
      [topicId]: diff
    }));
  };
  
  // Applica difficoltà globale a tutti gli argomenti SELEZIONATI
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

  // Imposta la risposta data dallo studente per un esercizio
  const setAnswer = (exerciseId, value) => {
    setStudentAnswers(prev => ({
      ...prev,
      [exerciseId]: value
    }));
  };

  // Registra i risultati di una verifica (solo esercizi non ancora conteggiati)
  // results: Array<{ exerciseId: string, correct: boolean }>
  const recordAnswerResults = (results) => {
    const today = new Date().toLocaleDateString('it-IT');
    const newIds = new Set(recordedExerciseIds);
    let newCompleted = 0;
    let newCorrect = 0;

    results.forEach(({ exerciseId, correct }) => {
      if (!newIds.has(exerciseId)) {
        newIds.add(exerciseId);
        newCompleted++;
        if (correct) newCorrect++;
      }
    });

    if (newCompleted === 0) return;

    setRecordedExerciseIds(newIds);
    setProgressStats(prev => {
      const resetToday = prev.lastActiveDate !== today;
      return {
        totalCompleted: prev.totalCompleted + newCompleted,
        totalCorrect: prev.totalCorrect + newCorrect,
        completedToday: (resetToday ? 0 : prev.completedToday) + newCompleted,
        correctToday: (resetToday ? 0 : prev.correctToday) + newCorrect,
        lastActiveDate: today
      };
    });
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
    studentAnswers,
    progressStats,

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
    setSelectedGrade,
    setAnswer,
    recordAnswerResults
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
