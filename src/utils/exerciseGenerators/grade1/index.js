/**
 * Generatori di Esercizi per Grado 1
 * Esportazione unificata di tutti i generatori per il primo grado scolastico
 */

export * from './numeri.js';
export * from './spazio_e_figure.js';
export * from './relazioni_e_funzioni.js';
export * from './dati_e_previsioni.js';

/**
 * Genera esercizi per qualsiasi argomento del Grado 1
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade1Exercises(topicId, difficulty = 'low', count = 10) {
  // Importa tutti i generatori disponibili per Grado 1
  const { generateGrade1NumeriExercises } = require('./numeri.js');
  const { generateGrade1SpazioEFigureExercises } = require('./spazio_e_figure.js');
  const { generateGrade1RelazioniEFunzioniExercises } = require('./relazioni_e_funzioni.js');
  const { generateGrade1DatiEPrevisoniExercises } = require('./dati_e_previsioni.js');
  
  // Mappa dei generatori per nucleo
  const nucleusGenerators = {
    'numeri': generateGrade1NumeriExercises,
    'spazio_e_figure': generateGrade1SpazioEFigureExercises,
    'relazioni_e_funzioni': generateGrade1RelazioniEFunzioniExercises,
    'dati_e_previsioni': generateGrade1DatiEPrevisoniExercises
  };
  
  // Estrai il nucleo dall'ID del topic
  const topicParts = topicId.split('_');
  if (topicParts.length >= 2) {
    const nucleo = topicParts[1];
    const generator = nucleusGenerators[nucleo];
    
    if (generator) {
      return generator(topicId, difficulty, count);
    }
  }
  
  // Se non trovato, usa il generatore generico per numeri
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
