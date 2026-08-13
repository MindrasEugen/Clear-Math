/**
 * Generatori di Esercizi per Grado 5
 * Esportazione unificata di tutti i generatori per il quinto grado scolastico
 */

export * from './numeri.js';
export * from './spazio_e_figure.js';
export * from './relazioni_e_funzioni.js';
export * from './dati_e_previsioni.js';

import { generateGrade5NumeriExercises } from './numeri.js';
import { generateGrade5SpazioEFigureExercises } from './spazio_e_figure.js';
import { generateGrade5RelazioniEFunzioniExercises } from './relazioni_e_funzioni.js';
import { generateGrade5DatiEPrevisoniExercises } from './dati_e_previsioni.js';

const nucleusPrefixGenerators = [
  { prefix: 'grado5_numeri_', generator: generateGrade5NumeriExercises },
  { prefix: 'grado5_spazio_', generator: generateGrade5SpazioEFigureExercises },
  { prefix: 'grado5_relazioni_', generator: generateGrade5RelazioniEFunzioniExercises },
  { prefix: 'grado5_dati_', generator: generateGrade5DatiEPrevisoniExercises }
];

/**
 * Genera esercizi per qualsiasi argomento del Grado 5
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade5Exercises(topicId, difficulty = 'low', count = 10) {
  const match = nucleusPrefixGenerators.find(({ prefix }) => topicId.startsWith(prefix));

  if (match) {
    return match.generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateGrade5NumeriExercises(topicId, difficulty, count);
}

/**
 * Genera una sessione di esercizi per un argomento del Grado 5
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} exerciseCount - Numero di esercizi
 * @returns {Object} Sessione di esercizi con metadata
 */
export function generateGrade5ExerciseSession(topicId, difficulty = 'low', exerciseCount = 5) {
  const exercises = generateGrade5Exercises(topicId, difficulty, exerciseCount);

  return {
    sessionId: `session_${topicId}_${Date.now()}`,
    topicId: topicId,
    difficulty: difficulty,
    exercises: exercises,
    totalPoints: exercises.reduce((sum, exercise) => sum + (exercise.points || 1), 0),
    createdAt: new Date().toISOString(),
    metadata: {
      generatorVersion: '1.0',
      grade: 5
    }
  };
}

export default {
  generateGrade5Exercises,
  generateGrade5ExerciseSession
};
