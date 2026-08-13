/**
 * Generatori di Esercizi per Grado 2
 * Esportazione unificata di tutti i generatori per il secondo grado scolastico
 */

// Importa tutti i generatori dei nuclei
export * from './numeri.js';
export * from './spazio_e_figure.js';
export * from './relazioni_e_funzioni.js';
export * from './dati_e_previsioni.js';

// Importa i generatori specifici per nucleo
import { generateGrade2NumeriExercises } from './numeri.js';
import { generateGrade2SpazioEFigureExercises } from './spazio_e_figure.js';
import { generateGrade2RelazioniEFunzioniExercises } from './relazioni_e_funzioni.js';
import { generateGrade2DatiEPrevisoniExercises } from './dati_e_previsioni.js';

// Mappa dei prefissi di topicId verso il generatore del nucleo corrispondente
const nucleusPrefixGenerators = [
  { prefix: 'grado2_numeri_', generator: generateGrade2NumeriExercises },
  { prefix: 'grado2_spazio_', generator: generateGrade2SpazioEFigureExercises },
  { prefix: 'grado2_relazioni_', generator: generateGrade2RelazioniEFunzioniExercises },
  { prefix: 'grado2_dati_', generator: generateGrade2DatiEPrevisoniExercises }
];

/**
 * Genera esercizi per qualsiasi argomento del Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade2Exercises(topicId, difficulty = 'low', count = 10) {
  const match = nucleusPrefixGenerators.find(({ prefix }) => topicId.startsWith(prefix));

  if (match) {
    return match.generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateGrade2NumeriExercises(topicId, difficulty, count);
}

/**
 * Genera una sessione di esercizi per un argomento del Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} exerciseCount - Numero di esercizi
 * @returns {Object} Sessione di esercizi con metadata
 */
export function generateGrade2ExerciseSession(topicId, difficulty = 'low', exerciseCount = 5) {
  const exercises = generateGrade2Exercises(topicId, difficulty, exerciseCount);

  return {
    sessionId: `session_${topicId}_${Date.now()}`,
    topicId: topicId,
    difficulty: difficulty,
    exercises: exercises,
    totalPoints: exercises.reduce((sum, exercise) => sum + (exercise.points || 1), 0),
    createdAt: new Date().toISOString(),
    metadata: {
      generatorVersion: '1.0',
      grade: 2
    }
  };
}

export default {
  generateGrade2Exercises,
  generateGrade2ExerciseSession
};
