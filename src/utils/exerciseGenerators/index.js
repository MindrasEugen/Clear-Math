/**
 * Generatori di Esercizi Unificati
 * Entry point principale per la generazione di esercizi per tutti i gradi
 */

// Generatori Grado 1
import { generateGrade1Exercises } from './grade1/index.js';

/**
 * Genera esercizi per qualsiasi grado e argomento
 * 
 * @param {number} grade - Numero del grado (1-5)
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 * @throws {Error} Se il grado non e supportato
 */
export function generateExercises(grade, topicId, difficulty = 'low', count = 10) {
  switch (grade) {
    case 1:
      return generateGrade1Exercises(topicId, difficulty, count);
    case 2:
      // TODO: Implementare generatori per Grado 2
      return generateFallbackExercises(grade, topicId, count);
    case 3:
      // TODO: Implementare generatori per Grado 3
      return generateFallbackExercises(grade, topicId, count);
    case 4:
      // TODO: Implementare generatori per Grado 4
      return generateFallbackExercises(grade, topicId, count);
    case 5:
      // TODO: Implementare generatori per Grado 5
      return generateFallbackExercises(grade, topicId, count);
    default:
      throw new Error(`Grado ${grade} non supportato. Gradi disponibili: 1-5`);
  }
}

/**
 * Genera esercizi placeholder per gradi non ancora implementati
 * Restituisce una lista di esercizi placeholder con messaggio informativo
 * 
 * @param {number} grade - Numero del grado
 * @param {string} topicId - ID dell'argomento
 * @param {number} count - Numero di esercizi
 * @returns {Array} Array di esercizi placeholder
 */
function generateFallbackExercises(grade, topicId, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    exercises.push({
      id: `placeholder_${topicId}_${grade}_${i}`,
      type: 'placeholder',
      question: `Esercizio per argomento "${topicId}" (Grado ${grade}) - Generatore non ancora implementato`,
      answer: null,
      options: [],
      points: 1,
      difficulty: 'low',
      grade: grade,
      topicId: topicId,
      isPlaceholder: true,
      metadata: {
        generatedAt: new Date().toISOString(),
        note: 'Generatore specifico per questo grado/argomento non ancora implementato'
      }
    });
  }
  return exercises;
}

/**
 * Verifica se un esercizio e un placeholder
 * 
 * @param {Object} exercise - Esercizio da verificare
 * @returns {boolean} True se e un placeholder
 */
export function isPlaceholderExercise(exercise) {
  return exercise && exercise.isPlaceholder === true;
}

/**
 * Ottieni lo stato di implementazione dei generatori per grado
 * 
 * @returns {Object} Oggetto con lo stato di implementazione per ogni grado
 */
export function getGeneratorsStatus() {
  return {
    1: { implemented: true, message: 'Generatori completi per tutti i nuclei' },
    2: { implemented: false, message: 'Generatori non ancora implementati' },
    3: { implemented: false, message: 'Generatori non ancora implementati' },
    4: { implemented: false, message: 'Generatori non ancora implementati' },
    5: { implemented: false, message: 'Generatori non ancora implementati' }
  };
}

export default {
  generateExercises,
  isPlaceholderExercise,
  getGeneratorsStatus
};
