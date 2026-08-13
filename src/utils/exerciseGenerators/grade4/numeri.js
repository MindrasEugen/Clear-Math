/**
 * Generatori di Esercizi per Grado 4 - Nucleo Numeri
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Numerazione fino a 100.000
 * - Numeri decimali
 * - Frazioni equivalenti
 * - Confronto tra frazioni
 * - Calcolo della frazione di un numero
 * - Percentuali semplici
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

function makeExercise(topicId, i, { question, answer, difficulty, hints, type = 'aperta', answerType = 'string', generator }) {
  return {
    id: `exercise_${topicId}_${i}_${Date.now()}`,
    topicId: topicId,
    type: type,
    question: question,
    answer: { type: answerType, value: answer },
    difficulty: difficulty,
    points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
    estimatedTime: 3,
    hints: hints || [],
    solution: `La risposta corretta e: ${answer}`,
    metadata: {
      author: 'ClearMath Generator',
      createdAt: new Date().toISOString(),
      version: '1.0',
      generator: generator,
      seed: randomInt(1000, 9999)
    }
  };
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// ============================================================================
// GENERATORE: NUMERAZIONE FINO A 100.000
// ============================================================================

export function generateNumerazione100000Exercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const num = randomInt(1000, 99999);
      question = `Scrivi in cifre il numero: (leggi ad alta voce) "${num}" e indica quante migliaia contiene.`;
      answer = Math.floor(num / 1000).toString() + ' migliaia';
      hints = ['Dividi il numero per 1000 e prendi la parte intera'];

    } else if (difficulty === DIFFICULTY.MID) {
      const a = randomInt(1000, 99999);
      let b = randomInt(1000, 99999);
      while (b === a) b = randomInt(1000, 99999);
      question = `Quale simbolo (>, <) metti tra ${a} e ${b}?`;
      answer = a > b ? '>' : '<';
      hints = ['Confronta prima le decine di migliaia, poi le migliaia, poi le centinaia'];

    } else {
      const num = randomInt(10000, 99999);
      const dm = Math.floor(num / 10000);
      const m = Math.floor((num % 10000) / 1000);
      const h = Math.floor((num % 1000) / 100);
      const t = Math.floor((num % 100) / 10);
      const u = num % 10;
      question = `Scomponi il numero ${num} in decine di migliaia, migliaia, centinaia, decine e unita`;
      answer = `${dm}DM + ${m}M + ${h}C + ${t}D + ${u}U`;
      hints = [`${num} = ${dm * 10000} + ${m * 1000} + ${h * 100} + ${t * 10} + ${u}`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateNumerazione100000Exercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: NUMERI DECIMALI
// ============================================================================

export function generateDecimaliExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const a = (randomInt(10, 500) / 10).toFixed(1);
      const b = (randomInt(10, 500) / 10).toFixed(1);
      question = `Calcola: ${a} + ${b} = ___`;
      answer = (parseFloat(a) + parseFloat(b)).toFixed(1);
      hints = ['Allinea la virgola e somma come nei numeri interi'];

    } else if (difficulty === DIFFICULTY.MID) {
      const a = (randomInt(100, 900) / 10).toFixed(1);
      const b = (randomInt(10, parseFloat(a) * 10 - 10) / 10).toFixed(1);
      question = `Calcola: ${a} - ${b} = ___`;
      answer = (parseFloat(a) - parseFloat(b)).toFixed(1);
      hints = ['Allinea la virgola e sottrai come nei numeri interi'];

    } else {
      const a = (randomInt(10, 99) / 10).toFixed(1);
      const b = randomInt(2, 9);
      question = `Calcola: ${a} x ${b} = ___`;
      answer = (parseFloat(a) * b).toFixed(1);
      hints = ['Moltiplica ignorando la virgola, poi rimettila nel risultato'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, type: 'calcolo', answerType: 'number', generator: 'generateDecimaliExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: FRAZIONI EQUIVALENTI
// ============================================================================

export function generateFrazioniEquivalentiExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const num = randomInt(1, 5);
      const den = randomInt(num + 1, 8);
      const fattore = randomInt(2, 4);
      question = `Trova una frazione equivalente a ${num}/${den} moltiplicando per ${fattore}`;
      answer = `${num * fattore}/${den * fattore}`;
      hints = [`Moltiplica sia numeratore che denominatore per ${fattore}`];

    } else if (difficulty === DIFFICULTY.MID) {
      const baseNum = randomInt(1, 4);
      const baseDen = randomInt(baseNum + 1, 6);
      const fattore = randomInt(2, 5);
      const num = baseNum * fattore;
      const den = baseDen * fattore;
      question = `${num}/${den} e equivalente a ${baseNum}/${baseDen}? Semplifica per verificare.`;
      answer = 'si, sono equivalenti';
      hints = [`Dividi numeratore e denominatore per il MCD (${fattore})`];

    } else {
      const den = randomChoice([4, 6, 8, 9, 12]);
      const num = randomInt(2, den - 1);
      const divisor = gcd(num, den);
      question = `Semplifica la frazione ${num}/${den} ai minimi termini`;
      answer = `${num / divisor}/${den / divisor}`;
      hints = [`Trova il MCD tra ${num} e ${den}, poi dividi entrambi per esso`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateFrazioniEquivalentiExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: CONFRONTO TRA FRAZIONI
// ============================================================================

export function generateFrazioniConfrontoExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const den = randomInt(3, 10);
      const num1 = randomInt(1, den - 1);
      let num2 = randomInt(1, den - 1);
      while (num2 === num1) num2 = randomInt(1, den - 1);
      question = `Confronta ${num1}/${den} e ${num2}/${den}: quale e maggiore?`;
      answer = num1 > num2 ? `${num1}/${den}` : `${num2}/${den}`;
      hints = ['Con lo stesso denominatore, confronta i numeratori'];

    } else if (difficulty === DIFFICULTY.MID) {
      const num = randomInt(1, 5);
      const den1 = randomInt(num + 1, 8);
      let den2 = randomInt(num + 1, 8);
      while (den2 === den1) den2 = randomInt(num + 1, 8);
      question = `Confronta ${num}/${den1} e ${num}/${den2}: quale e maggiore?`;
      answer = den1 < den2 ? `${num}/${den1}` : `${num}/${den2}`;
      hints = ['Con lo stesso numeratore, e maggiore la frazione con denominatore minore'];

    } else {
      const den1 = randomInt(2, 6);
      const den2 = randomInt(2, 6);
      const num1 = randomInt(1, den1 - 1 || 1);
      const num2 = randomInt(1, den2 - 1 || 1);
      const comuneDen = den1 * den2;
      const num1Comune = num1 * den2;
      const num2Comune = num2 * den1;
      question = `Confronta ${num1}/${den1} e ${num2}/${den2} riducendo allo stesso denominatore`;
      answer = `${num1}/${den1} = ${num1Comune}/${comuneDen}, ${num2}/${den2} = ${num2Comune}/${comuneDen} -> ${num1Comune > num2Comune ? `${num1}/${den1} e maggiore` : num1Comune < num2Comune ? `${num2}/${den2} e maggiore` : 'sono uguali'}`;
      hints = ['Trova un denominatore comune moltiplicando i due denominatori'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateFrazioniConfrontoExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: CALCOLO DELLA FRAZIONE DI UN NUMERO
// ============================================================================

export function generateFrazioneNumeroExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const den = randomChoice([2, 4, 5]);
      const num = randomInt(1, den - 1);
      const totale = den * randomInt(2, 10);
      question = `Calcola ${num}/${den} di ${totale}`;
      answer = ((totale / den) * num).toString();
      hints = [`Dividi ${totale} per ${den}, poi moltiplica per ${num}`];

    } else if (difficulty === DIFFICULTY.MID) {
      const den = randomInt(3, 10);
      const num = randomInt(1, den - 1);
      const totale = den * randomInt(3, 15);
      const oggetto = randomChoice(['euro', 'caramelle', 'pagine', 'chilometri']);
      question = `Marco ha ${totale} ${oggetto} e ne usa ${num}/${den}. Quanti ${oggetto} ha usato?`;
      answer = ((totale / den) * num).toString();
      hints = [`Calcola ${totale} : ${den} x ${num}`];

    } else {
      const den = randomInt(3, 8);
      const num = randomInt(1, den - 1);
      const parte = randomInt(2, 20);
      const totale = (parte * den) / num;
      question = `Se ${num}/${den} di un numero e ${parte}, qual e il numero intero?`;
      answer = totale.toString();
      hints = [`Dividi ${parte} per ${num}, poi moltiplica per ${den}`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateFrazioneNumeroExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PERCENTUALI SEMPLICI
// ============================================================================

export function generatePercentualiExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const perc = randomChoice([10, 50]);
      const num = randomInt(1, 20) * 10;
      question = `Calcola il ${perc}% di ${num}`;
      answer = ((num * perc) / 100).toString();
      hints = perc === 10 ? ['Il 10% si trova dividendo per 10'] : ['Il 50% si trova dividendo per 2'];

    } else if (difficulty === DIFFICULTY.MID) {
      const perc = 25;
      const num = randomInt(1, 25) * 4;
      question = `Calcola il ${perc}% di ${num}`;
      answer = ((num * perc) / 100).toString();
      hints = ['Il 25% si trova dividendo per 4'];

    } else {
      const perc = randomChoice([10, 25, 50]);
      const prezzo = randomInt(10, 20) * 10;
      const sconto = (prezzo * perc) / 100;
      question = `Un oggetto costa ${prezzo} euro e ha uno sconto del ${perc}%. Quanto costa dopo lo sconto?`;
      answer = (prezzo - sconto).toString() + ' euro';
      hints = [`Calcola prima lo sconto (${perc}% di ${prezzo}), poi sottrailo dal prezzo`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generatePercentualiExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade4NumeriExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado4_numeri_numerazione_100000': generateNumerazione100000Exercises,
    'grado4_numeri_decimali': generateDecimaliExercises,
    'grado4_numeri_frazioni_equivalenti': generateFrazioniEquivalentiExercises,
    'grado4_numeri_frazioni_confronto': generateFrazioniConfrontoExercises,
    'grado4_numeri_frazione_numero': generateFrazioneNumeroExercises,
    'grado4_numeri_percentuali': generatePercentualiExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateNumerazione100000Exercises(topicId, difficulty, count);
}
