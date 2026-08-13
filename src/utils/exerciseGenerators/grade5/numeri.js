/**
 * Generatori di Esercizi per Grado 5 - Nucleo Numeri
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Numerazione oltre il milione
 * - Numeri relativi
 * - Concetto di divisibilita
 * - Criteri di divisibilita
 * - Potenze
 * - Percentuali avanzate
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

function makeExercise(topicId, i, { question, answer, difficulty, hints, type = 'aperta', generator }) {
  return {
    id: `exercise_${topicId}_${i}_${Date.now()}`,
    topicId: topicId,
    type: type,
    question: question,
    answer: { type: 'string', value: answer },
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

function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}

// ============================================================================
// GENERATORE: NUMERAZIONE OLTRE IL MILIONE
// ============================================================================

export function generateNumerazioneMilioneExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const milioni = randomInt(1, 999);
      const resto = randomInt(0, 999999);
      const num = milioni * 1000000 + resto;
      question = `Quante volte "un milione" e contenuto nel numero ${num}?`;
      answer = milioni.toString();
      hints = ['Dividi il numero per 1.000.000 e prendi la parte intera'];

    } else if (difficulty === DIFFICULTY.MID) {
      const a = randomInt(1000000, 999999999);
      let b = randomInt(1000000, 999999999);
      while (b === a) b = randomInt(1000000, 999999999);
      question = `Quale simbolo (>, <) metti tra ${a.toLocaleString('it-IT')} e ${b.toLocaleString('it-IT')}?`;
      answer = a > b ? '>' : '<';
      hints = ['Confronta cifra per cifra partendo da sinistra'];

    } else {
      const miliardi = randomInt(1, 9);
      const milioni = randomInt(0, 999);
      question = `Quanti milioni ci sono in ${miliardi} miliardi?`;
      answer = (miliardi * 1000).toString() + ' milioni';
      hints = ['1 miliardo = 1000 milioni'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateNumerazioneMilioneExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: NUMERI RELATIVI
// ============================================================================

export function generateNumeriRelativiExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const temp1 = randomInt(-10, 15);
      const temp2 = randomInt(-10, 15);
      question = `La temperatura ieri era ${temp1}°C e oggi e ${temp2}°C. Qual e la temperatura piu alta?`;
      answer = Math.max(temp1, temp2).toString() + '°C';
      hints = ['Sulla retta numerica, i numeri piu a destra sono maggiori (anche tra i negativi)'];

    } else if (difficulty === DIFFICULTY.MID) {
      const alt1 = randomInt(-200, 2000);
      const alt2 = randomInt(-200, 2000);
      question = `Un\'altitudine di ${alt1} m e una di ${alt2} m: quale delle due e piu vicina al livello del mare (0)?`;
      answer = Math.abs(alt1) < Math.abs(alt2) ? `${alt1} m` : `${alt2} m`;
      hints = ['Confronta la distanza dal valore 0, ignorando il segno'];

    } else {
      const a = randomInt(-20, 20);
      const b = randomInt(-20, 20);
      question = `Calcola: ${a} + (${b}) = ___`;
      answer = (a + b).toString();
      hints = ['Se i segni sono uguali sommi i valori assoluti, se diversi sottrai il minore dal maggiore'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, type: 'calcolo', generator: 'generateNumeriRelativiExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: CONCETTO DI DIVISIBILITA
// ============================================================================

export function generateDivisibilitaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const num = randomInt(2, 50);
      question = `Il numero ${num} e primo o composto?`;
      answer = isPrime(num) ? 'primo' : 'composto';
      hints = ['Un numero primo ha solo 1 e se stesso come divisori'];

    } else if (difficulty === DIFFICULTY.MID) {
      const num = randomChoice([12, 18, 24, 30, 36, 20, 16]);
      const divisori = [];
      for (let d = 1; d <= num; d++) if (num % d === 0) divisori.push(d);
      question = `Elenca tutti i divisori di ${num}`;
      answer = divisori.join(', ');
      hints = ['Prova a dividere il numero per 1, 2, 3, ... fino al numero stesso'];

    } else {
      const num = randomChoice([12, 18, 24, 30, 36, 20, 45, 60]);
      const fattori = [];
      let n = num;
      for (let d = 2; d <= n; d++) {
        while (n % d === 0) {
          fattori.push(d);
          n /= d;
        }
      }
      question = `Scomponi ${num} in fattori primi`;
      answer = fattori.join(' x ');
      hints = ['Dividi ripetutamente per i numeri primi piu piccoli (2, 3, 5, 7, ...)'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateDivisibilitaExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: CRITERI DI DIVISIBILITA
// ============================================================================

export function generateCriteriDivisibilitaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const num = randomInt(10, 500);
      const divisore = randomChoice([2, 5, 10]);
      question = `Il numero ${num} e divisibile per ${divisore}?`;
      answer = num % divisore === 0 ? 'si' : 'no';
      hints = [
        divisore === 2 ? 'Divisibile per 2 se l\'ultima cifra e pari' :
        divisore === 5 ? 'Divisibile per 5 se termina per 0 o 5' :
        'Divisibile per 10 se termina per 0'
      ];

    } else if (difficulty === DIFFICULTY.MID) {
      const num = randomInt(10, 500);
      question = `Il numero ${num} e divisibile per 3? (somma le cifre)`;
      const sommaCifre = num.toString().split('').reduce((sum, c) => sum + parseInt(c), 0);
      answer = sommaCifre % 3 === 0 ? 'si' : 'no';
      hints = [`La somma delle cifre e ${sommaCifre}: e divisibile per 3 se anche la somma lo e`];

    } else {
      const num = randomInt(50, 999);
      question = `Il numero ${num} e divisibile per 9? (somma le cifre e verifica)`;
      const sommaCifre = num.toString().split('').reduce((sum, c) => sum + parseInt(c), 0);
      answer = sommaCifre % 9 === 0 ? 'si' : 'no';
      hints = [`La somma delle cifre e ${sommaCifre}: e divisibile per 9 se anche la somma lo e`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateCriteriDivisibilitaExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: POTENZE
// ============================================================================

export function generatePotenzeExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const base = randomInt(2, 9);
      const esp = 2;
      question = `Calcola: ${base}^${esp} = ___`;
      answer = Math.pow(base, esp).toString();
      hints = [`${base}^2 = ${base} x ${base}`];

    } else if (difficulty === DIFFICULTY.MID) {
      const esp = randomInt(1, 6);
      question = `Calcola: 10^${esp} = ___`;
      answer = Math.pow(10, esp).toString();
      hints = [`10 elevato a ${esp} e un 1 seguito da ${esp} zeri`];

    } else {
      const base = randomInt(2, 5);
      const esp = 3;
      question = `Calcola: ${base}^${esp} = ___`;
      answer = Math.pow(base, esp).toString();
      hints = [`${base}^3 = ${base} x ${base} x ${base}`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, type: 'calcolo', generator: 'generatePotenzeExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PERCENTUALI AVANZATE
// ============================================================================

export function generatePercentualiAvanzateExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const perc = randomChoice([5, 15, 20, 30]);
      const num = randomInt(2, 20) * 10;
      question = `Calcola il ${perc}% di ${num}`;
      answer = ((num * perc) / 100).toString();
      hints = [`Moltiplica ${num} per ${perc} e dividi per 100`];

    } else if (difficulty === DIFFICULTY.MID) {
      const perc = randomChoice([10, 20, 30, 40]);
      const prezzo = randomInt(20, 100);
      const sconto = (prezzo * perc) / 100;
      question = `Un oggetto costa ${prezzo} euro con uno sconto del ${perc}%. Quanto si risparmia?`;
      answer = sconto.toString() + ' euro';
      hints = [`Calcola il ${perc}% di ${prezzo}`];

    } else {
      const prezzoFinale = randomInt(40, 200);
      const perc = randomChoice([10, 20, 25]);
      const prezzoOriginale = Math.round(prezzoFinale / (1 - perc / 100));
      question = `Dopo uno sconto del ${perc}%, un oggetto costa ${prezzoFinale} euro. Qual era il prezzo originale (circa)?`;
      answer = `circa ${prezzoOriginale} euro`;
      hints = [`Il prezzo finale e il (100-${perc})% del prezzo originale`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generatePercentualiAvanzateExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade5NumeriExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado5_numeri_numerazione_milione': generateNumerazioneMilioneExercises,
    'grado5_numeri_relativi': generateNumeriRelativiExercises,
    'grado5_numeri_divisibilita': generateDivisibilitaExercises,
    'grado5_numeri_criteri_divisibilita': generateCriteriDivisibilitaExercises,
    'grado5_numeri_potenze': generatePotenzeExercises,
    'grado5_numeri_percentuali_avanzate': generatePercentualiAvanzateExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateNumerazioneMilioneExercises(topicId, difficulty, count);
}
