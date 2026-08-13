/**
 * Generatori di Esercizi per Grado 3 - Nucleo Numeri
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Numerazione decimale fino a 1000
 * - Algoritmi delle quattro operazioni in colonna
 * - Proprieta delle operazioni (commutativa, associativa, distributiva)
 * - Introduzione alle frazioni
 * - Frazioni proprie, improprie e apparenti
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

// ============================================================================
// GENERATORE: NUMERAZIONE DECIMALE FINO A 1000
// ============================================================================

export function generateNumerazione1000Exercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['scomponi', 'confronta']);
      if (exerciseType === 'scomponi') {
        const num = randomInt(100, 999);
        const h = Math.floor(num / 100);
        const t = Math.floor((num % 100) / 10);
        const u = num % 10;
        question = `Scomponi il numero ${num} in centinaia, decine e unita`;
        answer = `${h} centinaia, ${t} decine, ${u} unita`;
        hints = [`${num} = ${h * 100} + ${t * 10} + ${u}`];
      } else {
        const a = randomInt(100, 999);
        let b = randomInt(100, 999);
        while (b === a) b = randomInt(100, 999);
        question = `Quale simbolo (>, <, =) metti tra ${a} e ${b}?`;
        answer = a > b ? '>' : '<';
        hints = ['Confronta prima le centinaia, poi le decine, poi le unita'];
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['componi', 'successivo_precedente']);
      if (exerciseType === 'componi') {
        const h = randomInt(1, 9);
        const t = randomInt(0, 9);
        const u = randomInt(0, 9);
        question = `Componi il numero con ${h} centinaia, ${t} decine e ${u} unita`;
        answer = (h * 100 + t * 10 + u).toString();
        hints = [`${h} centinaia = ${h * 100}`, `Aggiungi ${t * 10} e ${u}`];
      } else {
        const num = randomInt(101, 998);
        question = `Qual e il numero precedente e successivo di ${num}?`;
        answer = `${num - 1}, ${num + 1}`;
        hints = ['Il precedente e -1, il successivo e +1'];
      }

    } else {
      const exerciseType = randomChoice(['ordina', 'numero_mancante']);
      if (exerciseType === 'ordina') {
        const numeri = Array.from({ length: 4 }, () => randomInt(100, 999));
        question = `Ordina in senso crescente: ${numeri.join(', ')}`;
        answer = [...numeri].sort((a, b) => a - b).join(', ');
        hints = ['Confronta le centinaia, poi le decine, poi le unita'];
      } else {
        const start = randomInt(100, 900);
        const step = randomChoice([10, 50, 100]);
        const seq = [start, start + step, start + 2 * step, '___', start + 4 * step];
        question = `Completa la sequenza: ${seq.join(', ')}`;
        answer = (start + 3 * step).toString();
        hints = [`La sequenza aumenta di ${step} ogni volta`];
      }
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateNumerazione1000Exercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: ALGORITMI DELLE QUATTRO OPERAZIONI
// ============================================================================

export function generateAlgoritmiOperazioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['addizione', 'sottrazione']);
      if (exerciseType === 'addizione') {
        const a = randomInt(100, 400);
        const b = randomInt(100, 400);
        question = `Esegui in colonna:<br/><pre>${a}<br/>+ ${b}<br/>----</pre>`;
        answer = (a + b).toString();
        hints = ['Somma unita, poi decine, poi centinaia, gestendo i riporti'];
      } else {
        const a = randomInt(400, 900);
        const b = randomInt(100, a - 1);
        question = `Esegui in colonna:<br/><pre>${a}<br/>- ${b}<br/>----</pre>`;
        answer = (a - b).toString();
        hints = ['Sottrai unita, poi decine, poi centinaia, gestendo i prestiti'];
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['moltiplicazione', 'divisione']);
      if (exerciseType === 'moltiplicazione') {
        const a = randomInt(20, 200);
        const b = randomInt(2, 9);
        question = `Esegui in colonna: ${a} x ${b} = ___`;
        answer = (a * b).toString();
        hints = [`Moltiplica ${a} per ${b}, gestendo i riporti`];
      } else {
        const divisor = randomInt(2, 9);
        const quotient = randomInt(10, 100);
        const dividend = divisor * quotient;
        question = `Esegui: ${dividend} : ${divisor} = ___`;
        answer = quotient.toString();
        hints = [`Pensa: ${divisor} x ___ = ${dividend}`];
      }

    } else {
      const exerciseType = randomChoice(['divisione_resto', 'operazione_mista']);
      if (exerciseType === 'divisione_resto') {
        const divisor = randomInt(3, 9);
        const dividend = randomInt(divisor * 10 + 1, divisor * 111);
        const quotient = Math.floor(dividend / divisor);
        const resto = dividend % divisor;
        question = `Esegui: ${dividend} : ${divisor} = ___ con resto ___`;
        answer = `${quotient}, resto ${resto}`;
        hints = [`${divisor} x ${quotient} = ${divisor * quotient}, resto = ${dividend} - ${divisor * quotient}`];
      } else {
        const a = randomInt(100, 300);
        const b = randomInt(2, 5);
        const c = randomInt(50, 150);
        question = `Calcola: (${a} x ${b}) - ${c} = ___`;
        answer = (a * b - c).toString();
        hints = ['Esegui prima la moltiplicazione, poi la sottrazione'];
      }
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, type: 'calcolo', answerType: 'number', generator: 'generateAlgoritmiOperazioniExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PROPRIETA DELLE OPERAZIONI
// ============================================================================

export function generateProprietaOperazioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const a = randomInt(10, 90);
      const b = randomInt(10, 90);
      question = `Se ${a} + ${b} = ${a + b}, quanto fa ${b} + ${a}? (proprieta commutativa)`;
      answer = (a + b).toString();
      hints = ['La proprieta commutativa dice che l\'ordine degli addendi non cambia il risultato'];

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['associativa', 'commutativa_moltiplicazione']);
      if (exerciseType === 'associativa') {
        const a = randomInt(5, 30);
        const b = randomInt(5, 30);
        const c = randomInt(5, 30);
        question = `Usa la proprieta associativa per calcolare piu facilmente: ${a} + ${b} + ${c}`;
        answer = (a + b + c).toString();
        hints = [`Puoi raggruppare come (${a} + ${b}) + ${c} oppure ${a} + (${b} + ${c})`];
      } else {
        const a = randomInt(2, 12);
        const b = randomInt(2, 12);
        question = `Se ${a} x ${b} = ${a * b}, quanto fa ${b} x ${a}?`;
        answer = (a * b).toString();
        hints = ['Anche la moltiplicazione e commutativa: a x b = b x a'];
      }

    } else {
      const a = randomInt(2, 9);
      const b = randomInt(10, 30);
      const c = randomInt(10, 30);
      question = `Usa la proprieta distributiva per calcolare: ${a} x (${b} + ${c})`;
      answer = `${a * (b + c)} (= ${a}x${b} + ${a}x${c} = ${a * b} + ${a * c})`;
      hints = [`a x (b + c) = a x b + a x c`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateProprietaOperazioniExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: INTRODUZIONE ALLE FRAZIONI
// ============================================================================

export function generateFrazioniIntroduzioneExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const den = randomInt(2, 8);
      const num = randomInt(1, den - 1);
      question = `Una pizza e divisa in ${den} fette uguali. Se ne mangi ${num}, quale frazione della pizza hai mangiato?`;
      answer = `${num}/${den}`;
      hints = ['Il numeratore e le parti prese, il denominatore le parti totali'];

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['leggi_frazione', 'numeratore_denominatore']);
      if (exerciseType === 'leggi_frazione') {
        const den = randomInt(2, 10);
        const num = randomInt(1, den - 1);
        question = `Come si legge la frazione ${num}/${den}?`;
        const decimi = ['zero', 'un', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci'];
        answer = `${num} ${den === 2 ? 'mezzi' : den === 4 ? 'quarti' : den === 10 ? 'decimi' : `/${den}`}`;
        hints = ['Il denominatore indica il nome delle parti (mezzi, terzi, quarti...)'];
      } else {
        const den = randomInt(3, 9);
        const num = randomInt(1, den - 1);
        question = `Nella frazione ${num}/${den}, quale numero e il numeratore e quale il denominatore?`;
        answer = `numeratore = ${num}, denominatore = ${den}`;
        hints = ['Il numeratore sta sopra la linea di frazione, il denominatore sotto'];
      }

    } else {
      const den = randomInt(4, 10);
      const num = randomInt(1, den - 1);
      const totale = randomInt(2, 5) * den;
      question = `Calcola ${num}/${den} di ${totale}`;
      answer = ((totale / den) * num).toString();
      hints = [`Dividi ${totale} per ${den}, poi moltiplica per ${num}`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateFrazioniIntroduzioneExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: FRAZIONI PROPRIE, IMPROPRIE E APPARENTI
// ============================================================================

export function generateFrazioniTipiExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const tipo = randomChoice(['propria', 'impropria', 'apparente']);
      let num, den;
      if (tipo === 'propria') {
        den = randomInt(3, 10);
        num = randomInt(1, den - 1);
      } else if (tipo === 'impropria') {
        den = randomInt(2, 8);
        num = randomInt(den + 1, den * 2);
        if (num === den) num++;
      } else {
        den = randomInt(2, 8);
        num = den * randomInt(1, 3);
      }
      question = `La frazione ${num}/${den} e propria, impropria o apparente?`;
      answer = tipo;
      hints = ['Propria: numeratore < denominatore. Impropria: numeratore > denominatore (ma non multiplo). Apparente: numeratore multiplo del denominatore'];

    } else if (difficulty === DIFFICULTY.MID) {
      const den = randomInt(2, 6);
      const num1 = randomInt(1, den - 1);
      const num2 = randomInt(1, den - 1);
      question = `Confronta le frazioni ${num1}/${den} e ${num2}/${den} (stesso denominatore). Quale e maggiore?`;
      answer = num1 > num2 ? `${num1}/${den}` : num1 < num2 ? `${num2}/${den}` : 'sono uguali';
      hints = ['Con lo stesso denominatore, e maggiore la frazione con il numeratore piu grande'];

    } else {
      const num = randomInt(2, 8);
      const den1 = randomInt(2, 6);
      const den2 = randomInt(2, 6);
      if (den1 === den2) {
        exercises.push(makeExercise(topicId, i, { question: `Confronta ${num}/${den1} e ${num}/${den1}: sono uguali?`, answer: 'si, sono uguali', difficulty, hints: ['Stesso numeratore e denominatore'], generator: 'generateFrazioniTipiExercises' }));
        continue;
      }
      question = `Confronta le frazioni ${num}/${den1} e ${num}/${den2} (stesso numeratore). Quale e maggiore?`;
      answer = den1 < den2 ? `${num}/${den1}` : `${num}/${den2}`;
      hints = ['Con lo stesso numeratore, e maggiore la frazione con il denominatore piu piccolo (le parti sono piu grandi)'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateFrazioniTipiExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade3NumeriExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado3_numeri_numerazione_1000': generateNumerazione1000Exercises,
    'grado3_numeri_algoritmi_operazioni': generateAlgoritmiOperazioniExercises,
    'grado3_numeri_proprieta_operazioni': generateProprietaOperazioniExercises,
    'grado3_numeri_frazioni_introduzione': generateFrazioniIntroduzioneExercises,
    'grado3_numeri_frazioni_tipi': generateFrazioniTipiExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateNumerazione1000Exercises(topicId, difficulty, count);
}
