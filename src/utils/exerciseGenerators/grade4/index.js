/**
 * Generatori di Esercizi per Grado 4
 * Esportazione unificata di tutti i generatori per il quarto grado scolastico
 */

export * from './numeri.js';
export * from './spazio_e_figure.js';
export * from './relazioni_e_funzioni.js';
export * from './dati_e_previsioni.js';

import { generateGrade4NumeriExercises } from './numeri.js';
import { generateGrade4SpazioEFigureExercises } from './spazio_e_figure.js';
import { generateGrade4RelazioniEFunzioniExercises } from './relazioni_e_funzioni.js';
import { generateGrade4DatiEPrevisoniExercises } from './dati_e_previsioni.js';

const nucleusPrefixGenerators = [
  { prefix: 'grado4_numeri_', generator: generateGrade4NumeriExercises },
  { prefix: 'grado4_spazio_', generator: generateGrade4SpazioEFigureExercises },
  { prefix: 'grado4_relazioni_', generator: generateGrade4RelazioniEFunzioniExercises },
  { prefix: 'grado4_dati_', generator: generateGrade4DatiEPrevisoniExercises }
];

/**
 * Genera esercizi per qualsiasi argomento del Grado 4
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade4Exercises(topicId, difficulty = 'low', count = 10) {
  const match = nucleusPrefixGenerators.find(({ prefix }) => topicId.startsWith(prefix));

  if (match) {
    return match.generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateGrade4NumeriExercises(topicId, difficulty, count);
}

/**
 * Genera una sessione di esercizi per un argomento del Grado 4
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} exerciseCount - Numero di esercizi
 * @returns {Object} Sessione di esercizi con metadata
 */
export function generateGrade4ExerciseSession(topicId, difficulty = 'low', exerciseCount = 5) {
  const exercises = generateGrade4Exercises(topicId, difficulty, exerciseCount);

  return {
    sessionId: `session_${topicId}_${Date.now()}`,
    topicId: topicId,
    difficulty: difficulty,
    exercises: exercises,
    totalPoints: exercises.reduce((sum, exercise) => sum + (exercise.points || 1), 0),
    createdAt: new Date().toISOString(),
    metadata: {
      generatorVersion: '1.0',
      grade: 4
    }
  };
}

export default {
  generateGrade4Exercises,
  generateGrade4ExerciseSession
};
