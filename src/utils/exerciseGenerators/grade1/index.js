/**
 * Generatori di Esercizi per Grado 1
 * Esportazione unificata di tutti i generatori per il primo grado scolastico
 */

// Importa tutti i generatori dei nuclei
export * from './numeri.js';
export * from './spazio_e_figure.js';
export * from './relazioni_e_funzioni.js';
export * from './dati_e_previsioni.js';

// Importa i generatori specifici per nucleo
import { generateGrade1NumeriExercises } from './numeri.js';
import { generateGrade1SpazioEFigureExercises } from './spazio_e_figure.js';
import { generateGrade1RelazioniEFunzioniExercises } from './relazioni_e_funzioni.js';
import { generateGrade1DatiEPrevisoniExercises } from './dati_e_previsioni.js';

/**
 * Genera esercizi per qualsiasi argomento del Grado 1
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade1Exercises(topicId, difficulty = 'low', count = 10) {
  // Mappa dei prefissi di topicId verso il generatore del nucleo corrispondente
  const nucleusPrefixGenerators = [
    { prefix: 'grado1_numeri_', generator: generateGrade1NumeriExercises },
    { prefix: 'grado1_spazio_', generator: generateGrade1SpazioEFigureExercises },
    { prefix: 'grado1_relazioni_', generator: generateGrade1RelazioniEFunzioniExercises },
    { prefix: 'grado1_dati_', generator: generateGrade1DatiEPrevisoniExercises }
  ];

  const match = nucleusPrefixGenerators.find(({ prefix }) => topicId.startsWith(prefix));

  if (match) {
    return match.generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateGrade1NumeriExercises(topicId, difficulty, count);
}

/**
 * Genera una sessione di esercizi per un argomento del Grado 1
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} exerciseCount - Numero di esercizi
 * @returns {Object} Sessione di esercizi con metadata
 */
export function generateGrade1ExerciseSession(topicId, difficulty = 'low', exerciseCount = 5) {
  const exercises = generateGrade1Exercises(topicId, difficulty, exerciseCount);
  
  return {
    sessionId: `session_${topicId}_${Date.now()}`,
    topicId: topicId,
    difficulty: difficulty,
    exercises: exercises,
    totalPoints: exercises.reduce((sum, exercise) => sum + (exercise.points || 1), 0),
    createdAt: new Date().toISOString(),
    metadata: {
      generatorVersion: '1.0',
      grade: 1
    }
  };
}

export default {
  generateGrade1Exercises,
  generateGrade1ExerciseSession
};
