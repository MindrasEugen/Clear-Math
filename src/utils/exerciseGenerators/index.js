/**
 * Generatori di Esercizi Unificati
 * Entry point principale per la generazione di esercizi per tutti i gradi
 */

// Generatori Grado 1
import { generateGrade1Exercises } from './grade1/index.js';
// Generatori Grado 2
import { generateGrade2Exercises } from './grade2/index.js';
// Generatori Grado 3
import { generateGrade3Exercises } from './grade3/index.js';
// Generatori Grado 4
import { generateGrade4Exercises } from './grade4/index.js';
// Generatori Grado 5
import { generateGrade5Exercises } from './grade5/index.js';

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
      return generateGrade2Exercises(topicId, difficulty, count);
    case 3:
      return generateGrade3Exercises(topicId, difficulty, count);
    case 4:
      return generateGrade4Exercises(topicId, difficulty, count);
    case 5:
      return generateGrade5Exercises(topicId, difficulty, count);
    default:
      throw new Error(`Grado ${grade} non supportato. Gradi disponibili: 1-5`);
  }
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
    2: { implemented: true, message: 'Generatori completi per tutti i nuclei' },
    3: { implemented: true, message: 'Generatori completi per tutti i nuclei' },
    4: { implemented: true, message: 'Generatori completi per tutti i nuclei' },
    5: { implemented: true, message: 'Generatori completi per tutti i nuclei' }
  };
}

export default {
  generateExercises,
  isPlaceholderExercise,
  getGeneratorsStatus
};
