/**
 * Generatore pseudo-random Linear Congruential Generator (LCG)
 * Usato per generare esercizi ripetibili
 */

let randomSeed = 1;

/**
 * Genera un numero casuale tra min e max (inclusi)
 */
export function randomInt(min, max) {
  randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0;
  return min + (randomSeed % (max - min + 1));
}

/**
 * Resetta il seed con un valore basato sul tempo corrente
 */
export function resetRandomSeed() {
  randomSeed = (Date.now() * Math.random() * 99999) >>> 0 || 1;
}

/**
 * Imposta manualmente il seed
 */
export function setRandomSeed(seed) {
  randomSeed = seed;
}

/**
 * Genera un numero float casuale tra 0 e 1
 */
export function randomFloat() {
  return randomInt(0, 10000) / 10000;
}

/**
 * Sceglie un elemento casuale da un array
 */
export function randomChoice(array) {
  if (array.length === 0) return null;
  return array[randomInt(0, array.length - 1)];
}

/**
 * Mescola un array (shuffle)
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Genera un ID univoco
 */
export function generateId(prefix = 'ex') {
  return `${prefix}-${Date.now()}-${randomInt(0, 9999)}`;
}
