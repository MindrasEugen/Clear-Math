/**
 * Validazione delle risposte inserite dallo studente
 * Confronto "best effort" tra risposta inserita e risposta attesa dal generatore
 */

/**
 * Normalizza una stringa per il confronto: minuscolo, spazi ridotti, trim
 *
 * @param {string} value
 * @returns {string}
 */
function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/,\s*/g, ', ');
}

/**
 * Verifica se la risposta inserita dallo studente corrisponde alla risposta attesa
 * dell'esercizio. Il confronto e normalizzato (case-insensitive, spazi ridotti)
 * ma esatto sul contenuto, coerentemente con il formato di `exercise.answer.value`.
 *
 * @param {string} userAnswer - Risposta inserita dallo studente
 * @param {Object} exercise - Esercizio con struttura { answer: { value } }
 * @returns {boolean}
 */
export function isAnswerCorrect(userAnswer, exercise) {
  if (!userAnswer || !userAnswer.trim()) return false;
  if (!exercise || !exercise.answer || exercise.answer.value === null || exercise.answer.value === undefined) {
    return false;
  }
  return normalize(userAnswer) === normalize(exercise.answer.value);
}

export default { isAnswerCorrect };
