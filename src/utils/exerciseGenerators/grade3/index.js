/**
 * Generatori di Esercizi per Grado 3
 * Esportazione unificata di tutti i generatori per il terzo grado scolastico
 */

export * from './numeri.js';
export * from './spazio_e_figure.js';
export * from './relazioni_e_funzioni.js';
export * from './dati_e_previsioni.js';

import { generateGrade3NumeriExercises } from './numeri.js';
import { generateGrade3SpazioEFigureExercises } from './spazio_e_figure.js';
import { generateGrade3RelazioniEFunzioniExercises } from './relazioni_e_funzioni.js';
import { generateGrade3DatiEPrevisoniExercises } from './dati_e_previsioni.js';

const nucleusPrefixGenerators = [
  { prefix: 'grado3_numeri_', generator: generateGrade3NumeriExercises },
  { prefix: 'grado3_spazio_', generator: generateGrade3SpazioEFigureExercises },
  { prefix: 'grado3_relazioni_', generator: generateGrade3RelazioniEFunzioniExercises },
  { prefix: 'grado3_dati_', generator: generateGrade3DatiEPrevisoniExercises }
];

/**
 * Genera esercizi per qualsiasi argomento del Grado 3
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade3Exercises(topicId, difficulty = 'low', count = 10) {
  const match = nucleusPrefixGenerators.find(({ prefix }) => topicId.startsWith(prefix));

  if (match) {
    return match.generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateGrade3NumeriExercises(topicId, difficulty, count);
}

/**
 * Genera una sessione di esercizi per un argomento del Grado 3
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} exerciseCount - Numero di esercizi
 * @returns {Object} Sessione di esercizi con metadata
 */
export function generateGrade3ExerciseSession(topicId, difficulty = 'low', exerciseCount = 5) {
  const exercises = generateGrade3Exercises(topicId, difficulty, exerciseCount);

  return {
    sessionId: `session_${topicId}_${Date.now()}`,
    topicId: topicId,
    difficulty: difficulty,
    exercises: exercises,
    totalPoints: exercises.reduce((sum, exercise) => sum + (exercise.points || 1), 0),
    createdAt: new Date().toISOString(),
    metadata: {
      generatorVersion: '1.0',
      grade: 3
    }
  };
}

export default {
  generateGrade3Exercises,
  generateGrade3ExerciseSession
};
