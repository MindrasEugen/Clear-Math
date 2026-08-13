/**
 * Generatori di Esercizi per Grado 2 - Nucleo Numeri
 * Basato sul programma ministeriale italiano
 * 
 * Argomenti coperti:
 * - Sistema decimale e valore posizionale fino a 100
 * - Conteggio progressivo e regressivo fino a 100
 * - Addizione in colonna con e senza cambio
 * - Sottrazione in colonna con e senza prestito
 * - Moltiplicazione come addizione ripetuta e schieramenti
 * - Tabelline 0-10
 * - Divisione come ripartizione e contenenza
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

// ============================================================================
// GENERATORE: SISTEMA DECIMALE E VALORE POSIZIONALE FINO A 100
// ============================================================================

/**
 * Genera esercizi sul sistema decimale e valore posizionale fino a 100 per Grado 2
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateSistemaDecimaleExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const num = randomInt(10, 50);
      const tens = Math.floor(num / 10);
      const units = num % 10;

      const exerciseType = randomChoice(['scomponi', 'componi', 'identifica_decine', 'identifica_unita']);

      switch (exerciseType) {
        case 'scomponi':
          question = `Scomponi il numero ${num} in decine e unita`;
          answer = `${tens} decine e ${units} unita`;
          hints = [`${tens} decine = ${tens * 10}, ${units} unita = ${units}`, `Conta quante decine complete ci sono in ${num}`];
          break;
        case 'componi':
          question = `Componi il numero con ${tens} decine e ${units} unita`;
          answer = num.toString();
          hints = [`${tens} decine = ${tens * 10}`, `Aggiungi ${units} unita a ${tens * 10}`];
          break;
        case 'identifica_decine':
          question = `Quante decine ci sono nel numero ${num}?`;
          answer = tens.toString();
          hints = [`Conta di 10 in 10 fino a ${num}`];
          break;
        case 'identifica_unita':
          question = `Quante unita ci sono nel numero ${num}?`;
          answer = units.toString();
          hints = [`Le unita sono la cifra delle unita in ${num}`];
          break;
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['confronta_valore', 'completa_scomposizione', 'num_dalla_parola']);

      switch (exerciseType) {
        case 'confronta_valore':
          const num1 = randomInt(24, 99);
          const tens1 = Math.floor(num1 / 10);
          const units1 = num1 % 10;
          const num2 = randomInt(24, 99);
          const tens2 = Math.floor(num2 / 10);
          const units2 = num2 % 10;

          question = `Quale numero ha piu decine: ${num1} o ${num2}?`;
          answer = tens1 > tens2 ? num1.toString() : tens1 < tens2 ? num2.toString() : 'Sono uguali';
          hints = [`${num1} ha ${tens1} decine, ${num2} ha ${tens2} decine`];
          break;
        case 'completa_scomposizione':
          const num = randomInt(30, 99);
          const tens = Math.floor(num / 10);
          const units = num % 10;
          const missing = randomChoice(['decine', 'unita']);
          const shownValue = missing === 'decine' ? tens : units;

          question = `Il numero ${num} ha ${shownValue} ${missing}. Completa: ___ ${missing === 'decine' ? 'unita' : 'decine'}`;
          answer = (missing === 'decine' ? units : tens).toString();
          hints = [`${num} = ${tens} decine + ${units} unita`];
          break;
        case 'num_dalla_parola':
          const tensW = randomInt(1, 9);
          const unitsW = randomInt(0, 9);
          question = `Scrivi il numero: ${tensW} decine e ${unitsW} ${unitsW === 1 ? 'unita' : 'unita'}`;
          answer = (tensW * 10 + unitsW).toString();
          hints = [`${tensW} decine = ${tensW * 10}`, `Aggiungi ${unitsW}`];
          break;
      }

    } else {
      const exerciseType = randomChoice(['valore_cifra', 'cambia_cifra', 'confronto_posizionale']);

      switch (exerciseType) {
        case 'valore_cifra': {
          const num = randomInt(10, 99);
          const digitPos = randomChoice(['decine', 'unita']);
          const tens = Math.floor(num / 10);
          const units = num % 10;
          const digitValue = digitPos === 'decine' ? tens * 10 : units;

          question = `Qual e il valore della cifra delle ${digitPos} nel numero ${num}?`;
          answer = digitValue.toString();
          hints = [`Nel numero ${num}, la cifra delle decine e ${tens} e vale ${tens * 10}, la cifra delle unita e ${units} e vale ${units}`];
          break;
        }
        case 'cambia_cifra': {
          const baseNum = randomInt(20, 99);
          const tens = Math.floor(baseNum / 10);
          const units = baseNum % 10;
          const changePos = randomChoice(['decine', 'unita']);
          const newDigit = changePos === 'decine' ? randomInt(1, 9) : randomInt(0, 9);
          const newNum = changePos === 'decine' ? newDigit * 10 + units : tens * 10 + newDigit;

          question = `Se nel numero ${baseNum} cambi la cifra delle ${changePos} con ${newDigit}, qual e il nuovo numero?`;
          answer = newNum.toString();
          hints = [`Numero originale: ${tens} decine + ${units} unita = ${baseNum}`, `Nuovo numero: ${changePos === 'decine' ? newDigit : tens} decine + ${changePos === 'unita' ? newDigit : units} unita`];
          break;
        }
        case 'confronto_posizionale': {
          const num1 = randomInt(50, 99);
          const num2 = randomInt(50, 99);
          const tens1 = Math.floor(num1 / 10);
          const units1 = num1 % 10;
          const tens2 = Math.floor(num2 / 10);
          const units2 = num2 % 10;

          question = `Metti il simbolo corretto: ${num1} ? ${num2}`;
          answer = num1 > num2 ? '>' : num1 < num2 ? '<' : '=';
          hints = [`Confronta prima le decine: ${tens1} vs ${tens2}`, `Se le decine sono uguali, confronta le unita: ${units1} vs ${units2}`];
          break;
        }
      }
    }

    exercises.push({
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: 'aperta',
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
        generator: 'generateSistemaDecimaleExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: CONTEGGIO FINO A 100
// ============================================================================

/**
 * Genera esercizi di conteggio fino a 100 per Grado 2
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateConteggio100Exercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['progressivo_1', 'regressivo_1', 'completa_sequenza']);

      switch (exerciseType) {
        case 'progressivo_1':
          const startLow = randomInt(1, 40);
          const endLow = randomInt(startLow + 5, startLow + 15);
          question = `Conta in senso progressivo da ${startLow} fino a ${endLow}: ${startLow}, ___`;
          answer = Array.from({ length: endLow - startLow + 1 }, (_, j) => startLow + j).join(', ');
          hints = [`Inizia da ${startLow} e aggiungi 1 ogni volta`];
          break;
        case 'regressivo_1':
          const startHigh = randomInt(40, 60);
          const endHigh = randomInt(startHigh - 10, startHigh - 3);
          question = `Conta all'indietro da ${startHigh} fino a ${endHigh}: ${startHigh}, ___`;
          answer = Array.from({ length: startHigh - endHigh + 1 }, (_, j) => startHigh - j).join(', ');
          hints = [`Inizia da ${startHigh} e sottrai 1 ogni volta`];
          break;
        case 'completa_sequenza':
          const startSeq = randomInt(10, 30);
          const missingPos = randomInt(1, 3);
          const sequence = [startSeq, startSeq + 1, startSeq + 2, startSeq + 3];
          sequence[missingPos] = '___';
          question = `Completa la sequenza: ${sequence.join(', ')}`;
          answer = (startSeq + missingPos).toString();
          hints = [`Conta in ordine per trovare il numero mancante`];
          break;
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['passo_2', 'passo_5', 'passo_10']);

      switch (exerciseType) {
        case 'passo_2':
          const start2 = randomInt(10, 50);
          const end2 = randomInt(start2 + 10, start2 + 20);
          const count2 = Math.floor((end2 - start2) / 2);
          question = `Conta di 2 in 2 da ${start2} fino a ${end2}: ${start2}, ___`;
          answer = Array.from({ length: count2 + 1 }, (_, j) => start2 + j * 2).join(', ');
          hints = [`Aggiungi 2 ogni volta: ${start2}, ${start2 + 2}, ${start2 + 4}, ...`];
          break;
        case 'passo_5':
          const start5 = randomInt(5, 60);
          const end5 = randomInt(start5 + 20, start5 + 40);
          const count5 = Math.floor((end5 - start5) / 5);
          question = `Conta di 5 in 5 da ${start5} fino a ${end5}: ${start5}, ___`;
          answer = Array.from({ length: count5 + 1 }, (_, j) => start5 + j * 5).join(', ');
          hints = [`Aggiungi 5 ogni volta`];
          break;
        case 'passo_10':
          const start10 = randomInt(10, 30);
          const end10 = randomInt(start10 + 30, start10 + 60);
          const count10 = Math.floor((end10 - start10) / 10);
          question = `Conta di 10 in 10 da ${start10} fino a ${end10}: ${start10}, ___`;
          answer = Array.from({ length: count10 + 1 }, (_, j) => start10 + j * 10).join(', ');
          hints = [`Aggiungi 10 ogni volta: ${start10}, ${start10 + 10}, ${start10 + 20}, ...`];
          break;
      }

    } else {
      const exerciseType = randomChoice(['misto_passi', 'sequenza_decrescente_passo', 'trova_numero_mancante']);

      switch (exerciseType) {
        case 'misto_passi':
          const step = randomChoice([2, 5, 10]);
          const startMixed = randomInt(10, 70);
          const lengthMixed = randomInt(4, 8);
          question = `Conta di ${step} in ${step} partendo da ${startMixed}: ${startMixed}, ___ (scrivi ${lengthMixed} numeri)`;
          answer = Array.from({ length: lengthMixed }, (_, j) => startMixed + j * step).join(', ');
          hints = [`Aggiungi ${step} ogni volta`];
          break;
        case 'sequenza_decrescente_passo':
          const stepDown = randomChoice([2, 5, 10]);
          const startDown = randomInt(50, 98);
          const lengthDown = randomInt(4, 8);
          question = `Conta all'indietro di ${stepDown} in ${stepDown} da ${startDown}: ${startDown}, ___ (scrivi ${lengthDown} numeri)`;
          answer = Array.from({ length: lengthDown }, (_, j) => startDown - j * stepDown).join(', ');
          hints = [`Sottrai ${stepDown} ogni volta`];
          break;
        case 'trova_numero_mancante':
          const stepMissing = randomChoice([2, 5, 10]);
          const startMissing = randomInt(10, 60);
          const missingIndex = randomInt(1, 5);
          const sequenceMissing = Array.from({ length: 6 }, (_, j) => startMissing + j * stepMissing);
          sequenceMissing[missingIndex] = '___';
          question = `Completa la sequenza: ${sequenceMissing.join(', ')}`;
          answer = (startMissing + missingIndex * stepMissing).toString();
          hints = [`La sequenza aumenta di ${stepMissing} ogni volta`];
          break;
      }
    }

    exercises.push({
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: 'aperta',
      question: question,
      answer: { type: 'string', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 1 : difficulty === DIFFICULTY.MID ? 2 : 3,
      estimatedTime: 2,
      hints: hints || [],
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateConteggio100Exercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: ADDIZIONE IN COLONNA
// ============================================================================

/**
 * Genera esercizi di addizione in colonna per Grado 2
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateAddizioneColonnaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['2_cifre_1_cifra', '2_cifre_2_cifre_senza_cambio']);

      switch (exerciseType) {
        case '2_cifre_1_cifra':
          const num1 = randomInt(10, 40);
          const num2 = randomInt(1, 9);
          const sum1 = num1 + num2;
          question = `Esegui l'addizione in colonna:<br/><pre>${num1}<br/>+ ${num2}<br/>----</pre>`;
          answer = sum1.toString();
          hints = [`Aggiungi le unita: ${num1 % 10} + ${num2} = ${num1 % 10 + num2}`, `Le decine rimangono ${Math.floor(num1 / 10)}`];
          break;
        case '2_cifre_2_cifre_senza_cambio':
          const a = randomInt(10, 30);
          const b = randomInt(10, 30);
          const unitsA = a % 10;
          const unitsB = b % 10;
          if (unitsA + unitsB >= 10) { i--; continue; }
          const sum2 = a + b;
          question = `Esegui l'addizione in colonna:<br/><pre>${a}<br/>+ ${b}<br/>----</pre>`;
          answer = sum2.toString();
          hints = [`Aggiungi le unita: ${unitsA} + ${unitsB} = ${unitsA + unitsB}`, `Aggiungi le decine: ${Math.floor(a / 10)} + ${Math.floor(b / 10)} = ${Math.floor(a / 10) + Math.floor(b / 10)}`];
          break;
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['con_cambio_unita', '2_addendi_con_cambio']);

      switch (exerciseType) {
        case 'con_cambio_unita':
          const num1c = randomInt(15, 45);
          const num2c = randomInt(15, 45);
          const units1 = num1c % 10;
          const units2 = num2c % 10;
          if (units1 + units2 < 10) { i--; continue; }
          const sumc = num1c + num2c;
          question = `Esegui l'addizione in colonna con il cambio:<br/><pre>${num1c}<br/>+ ${num2c}<br/>----</pre>`;
          answer = sumc.toString();
          hints = [`Unita: ${units1} + ${units2} = ${units1 + units2} (scrivi ${units1 + units2 - 10} e riporta 1)`, `Decine: ${Math.floor(num1c / 10)} + ${Math.floor(num2c / 10)} + 1 = ${Math.floor(num1c / 10) + Math.floor(num2c / 10) + 1}`];
          break;
        case '2_addendi_con_cambio':
          const a2 = randomInt(25, 55);
          const b2 = randomInt(25, 55);
          const c2 = randomInt(15, 25);
          if ((a2 % 10 + b2 % 10) < 10 || (a2 % 10 + b2 % 10 + c2 % 10) < 10) { i--; continue; }
          const sum2c = a2 + b2 + c2;
          question = `Esegui l'addizione in colonna:<br/><pre>${a2}<br/>+ ${b2}<br/>+ ${c2}<br/>----</pre>`;
          answer = sum2c.toString();
          hints = [`Somma prima due numeri, poi aggiungi il terzo`, `Ricordati del riporto tra le unita e le decine`];
          break;
      }

    } else {
      const exerciseType = randomChoice(['multiplo_cambio', '3_addendi_cambio']);

      switch (exerciseType) {
        case 'multiplo_cambio':
          const num1m = randomInt(45, 89);
          const num2m = randomInt(45, 89);
          const units1m = num1m % 10;
          const units2m = num2m % 10;
          if (units1m + units2m < 10) { i--; continue; }
          const tens1 = Math.floor(num1m / 10);
          const tens2 = Math.floor(num2m / 10);
          const sumMulti = num1m + num2m;
          question = `Esegui l'addizione in colonna con riporto multiplo:<br/><pre>${num1m}<br/>+ ${num2m}<br/>----</pre>`;
          answer = sumMulti.toString();
          hints = [`Unita: ${units1m} + ${units2m} = ${units1m + units2m} (riporta 1)`, `Decine: ${tens1} + ${tens2} + 1 = ${tens1 + tens2 + 1}`];
          break;
        case '3_addendi_cambio':
          const a3 = randomInt(30, 65);
          const b3 = randomInt(30, 65);
          const c3 = randomInt(30, 65);
          const sum3 = a3 + b3 + c3;
          question = `Esegui l'addizione in colonna con tre addendi:<br/><pre>${a3}<br/>+ ${b3}<br/>+ ${c3}<br/>----</pre>`;
          answer = sum3.toString();
          hints = [`Somma passo dopo passo, ricordando i riporti`];
          break;
      }
    }

    exercises.push({
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: 'calcolo',
      question: question,
      answer: { type: 'number', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
      estimatedTime: 4,
      hints: hints || [],
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateAddizioneColonnaExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: SOTTRAZIONE IN COLONNA
// ============================================================================

/**
 * Genera esercizi di sottrazione in colonna per Grado 2
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateSottrazioneColonnaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['senza_prestito_2cifre', '1cifra_da_2cifre']);

      switch (exerciseType) {
        case 'senza_prestito_2cifre':
          let minuend, subtrahend;
          do {
            minuend = randomInt(30, 70);
            subtrahend = randomInt(10, minuend - 10);
          } while (subtrahend % 10 > minuend % 10);
          const diff = minuend - subtrahend;
          question = `Esegui la sottrazione in colonna:<br/><pre>${minuend}<br/>- ${subtrahend}<br/>----</pre>`;
          answer = diff.toString();
          hints = [`Sottrai le unita: ${minuend % 10} - ${subtrahend % 10} = ${minuend % 10 - subtrahend % 10}`, `Sottrai le decine: ${Math.floor(minuend / 10)} - ${Math.floor(subtrahend / 10)} = ${Math.floor(minuend / 10) - Math.floor(subtrahend / 10)}`];
          break;
        case '1cifra_da_2cifre':
          const num2c = randomInt(20, 50);
          const num1c = randomInt(1, 9);
          if (num1c > num2c % 10) { i--; continue; }
          const diff1c = num2c - num1c;
          question = `Esegui la sottrazione in colonna:<br/><pre>${num2c}<br/>-  ${num1c}<br/>----</pre>`;
          answer = diff1c.toString();
          hints = [`Sottrai le unita: ${num2c % 10} - ${num1c} = ${num2c % 10 - num1c}`, `Le decine rimangono ${Math.floor(num2c / 10)}`];
          break;
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['con_prestito_unita', 'con_prestito_decine']);

      switch (exerciseType) {
        case 'con_prestito_unita':
          let minuendP, subtrahendP;
          do {
            minuendP = randomInt(31, 79);
            subtrahendP = randomInt(11, minuendP - 1);
          } while (subtrahendP % 10 <= minuendP % 10);
          const diffP = minuendP - subtrahendP;
          question = `Esegui la sottrazione in colonna con il prestito:<br/><pre>${minuendP}<br/>- ${subtrahendP}<br/>----</pre>`;
          answer = diffP.toString();
          hints = [`Non puoi sottrarre ${subtrahendP % 10} da ${minuendP % 10}, prendi 1 decina`, `Decine: ${Math.floor(minuendP / 10) - 1} - ${Math.floor(subtrahendP / 10)} = ${Math.floor(minuendP / 10) - 1 - Math.floor(subtrahendP / 10)}`];
          break;
        case 'con_prestito_decine':
          let minuendD, subtrahendD;
          do {
            minuendD = randomInt(100, 199);
            subtrahendD = randomInt(50, minuendD - 1);
          } while ((minuendD % 10 >= subtrahendD % 10) || (Math.floor(minuendD / 10) % 10 >= Math.floor(subtrahendD / 10) % 10));
          const diffD = minuendD - subtrahendD;
          question = `Esegui la sottrazione in colonna con prestito delle decine:<br/><pre>${minuendD}<br/>- ${subtrahendD}<br/>----</pre>`;
          answer = diffD.toString();
          hints = [`Presta 1 decina alle unita, poi se necessario prendi in prestito dalle centinaia`];
          break;
      }

    } else {
      const exerciseType = randomChoice(['prestito_multiplo', '3_numeri_prestito']);

      switch (exerciseType) {
        case 'prestito_multiplo':
          let minuendM, subtrahendM;
          do {
            minuendM = randomInt(100, 199);
            subtrahendM = randomInt(50, minuendM - 1);
          } while (minuendM % 10 >= subtrahendM % 10);
          const diffM = minuendM - subtrahendM;
          question = `Esegui la sottrazione in colonna con prestiti multipli:<br/><pre>${minuendM}<br/>- ${subtrahendM}<br/>----</pre>`;
          answer = diffM.toString();
          hints = [`Fai attenzione ai prestiti a catena tra unita, decine e centinaia`];
          break;
        case '3_numeri_prestito':
          const baseNum = randomInt(100, 150);
          const sub1 = randomInt(20, 50);
          const sub2 = randomInt(20, 50);
          if (baseNum - sub1 - sub2 < 0) { i--; continue; }
          const result = baseNum - sub1 - sub2;
          question = `Esegui la sottrazione in colonna:<br/><pre>${baseNum}<br/>- ${sub1}<br/>- ${sub2}<br/>----</pre>`;
          answer = result.toString();
          hints = [`Sottrai il primo numero, poi sottrai il secondo dal risultato`];
          break;
      }
    }

    exercises.push({
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: 'calcolo',
      question: question,
      answer: { type: 'number', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
      estimatedTime: 4,
      hints: hints || [],
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateSottrazioneColonnaExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: MOLTIPLICAZIONE
// ============================================================================

/**
 * Genera esercizi di moltiplicazione per Grado 2
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateMoltiplicazioneExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['addizione_ripetuta', 'schieramento_semplice']);

      switch (exerciseType) {
        case 'addizione_ripetuta':
          const num = randomInt(2, 5);
          const times = randomInt(2, 6);
          const result = num * times;
          question = `Quanto fa ${num} + ${num} + ... (${times} volte)? Oppure: ${num} x ${times} = ___`;
          answer = result.toString();
          hints = [`${num} aggiunto ${times} volte: ${num} + ${num} = ${num * 2}, + ${num} = ${num * 3}, ...`];
          break;
        case 'schieramento_semplice':
          const rows = randomInt(2, 5);
          const cols = randomInt(2, 5);
          const total = rows * cols;
          question = `In un cartellone ci sono ${rows} righe con ${cols} stelle ciascuna. Quante stelle ci sono in totale?`;
          answer = total.toString();
          hints = [`Moltiplica il numero di righe per il numero di colonne: ${rows} x ${cols}`];
          break;
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['tabelline_fino_5', 'problema_schieramento']);

      switch (exerciseType) {
        case 'tabelline_fino_5':
          const factor1 = randomInt(2, 5);
          const factor2 = randomInt(2, 10);
          const product = factor1 * factor2;
          question = `Calcola: ${factor1} x ${factor2} = ___`;
          answer = product.toString();
          hints = [`${factor1} x ${factor2} = ${factor1} + ${factor1} + ... (${factor2} volte)`];
          break;
        case 'problema_schieramento':
          const objects = randomChoice(['mele', 'palle', 'libri', 'matite']);
          const groups = randomInt(3, 6);
          const itemsPerGroup = randomInt(3, 8);
          const totalItems = groups * itemsPerGroup;
          question = `Ci sono ${groups} scatole, ognuna contiene ${itemsPerGroup} ${objects}. Quante ${objects} ci sono in tutto?`;
          answer = totalItems.toString();
          hints = [`Moltiplica il numero di scatole per gli oggetti in ogni scatola`];
          break;
      }

    } else {
      const exerciseType = randomChoice(['tabelline_fino_10', 'moltiplicazione_proprieta']);

      switch (exerciseType) {
        case 'tabelline_fino_10':
          const f1 = randomInt(2, 10);
          const f2 = randomInt(2, 10);
          const prod = f1 * f2;
          question = `Calcola: ${f1} x ${f2} = ___`;
          answer = prod.toString();
          hints = [`Usa la tabellina del ${f1}: ${f1} x 1 = ${f1}, ${f1} x 2 = ${f1 * 2}, ...`];
          break;
        case 'moltiplicazione_proprieta':
          const base = randomInt(3, 8);
          const multiplier = randomInt(2, 5);
          const prod2 = base * multiplier;
          question = `Se ${base} x ${multiplier} = ${prod2}, quanto fa ${multiplier} x ${base}?`;
          answer = prod2.toString();
          hints = [`La moltiplicazione e commutativa: a x b = b x a`];
          break;
      }
    }

    exercises.push({
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: 'calcolo',
      question: question,
      answer: { type: 'number', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
      estimatedTime: 3,
      hints: hints || [],
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateMoltiplicazioneExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: TABELLINE
// ============================================================================

/**
 * Genera esercizi sulle tabelline per Grado 2
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateTabellineExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['tabellina_diretta', 'sequenza_tabellina', 'tabellina_multipla']);

      switch (exerciseType) {
        case 'tabellina_diretta':
          const tableLow = randomChoice([0, 1, 2, 5, 10]);
          const multiplierLow = randomInt(1, 5);
          question = `Quanto fa ${tableLow} x ${multiplierLow}?`;
          answer = (tableLow * multiplierLow).toString();
          hints = [`${tableLow} x ${multiplierLow} = ${tableLow} + ${tableLow} + ... (${multiplierLow} volte)`];
          break;
        case 'sequenza_tabellina':
          const tableSeq = randomChoice([2, 5, 10]);
          const startSeq = randomInt(1, 5);
          const missingPosSeq = randomInt(0, 4);
          const sequenceSeq = Array.from({ length: 5 }, (_, j) => tableSeq * (startSeq + j));
          sequenceSeq[missingPosSeq] = '___';
          question = `Completa la sequenza della tabellina del ${tableSeq}: ${sequenceSeq.join(', ')}`;
          answer = (tableSeq * (startSeq + missingPosSeq)).toString();
          hints = [`La tabellina del ${tableSeq} aumenta di ${tableSeq} ogni volta`];
          break;
        case 'tabellina_multipla':
          const tableM = randomChoice([1, 2, 5, 10]);
          const multiplierM = randomInt(1, 10);
          const resultM = tableM * multiplierM;
          const wrong1 = resultM + randomInt(1, 3);
          const wrong2 = resultM - randomInt(1, 3);
          const wrong3 = randomInt(1, 20);

          question = `Quanto fa ${tableM} x ${multiplierM}?`;
          answer = resultM.toString();
          options = [
            { id: 'correct', label: resultM.toString(), correct: true },
            { id: 'wrong1', label: wrong1.toString(), correct: false },
            { id: 'wrong2', label: wrong2.toString(), correct: false },
            { id: 'wrong3', label: wrong3.toString(), correct: false }
          ];
          hints = [`Calcola: ${tableM} + ${tableM} + ... (${multiplierM} volte)`];
          break;
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['tabellina_completa', 'trova_moltiplicatore', 'confronto_tabelline']);

      switch (exerciseType) {
        case 'tabellina_completa':
          const tableMid = randomInt(2, 10);
          const multiplierMid = randomInt(1, 10);
          question = `Calcola: ${tableMid} x ${multiplierMid} = ___`;
          answer = (tableMid * multiplierMid).toString();
          hints = [`Usa la tabellina del ${tableMid}`];
          break;
        case 'trova_moltiplicatore':
          const baseT = randomInt(2, 9);
          const resultT = randomInt(2, 10) * baseT;
          question = `Quale numero moltiplicato per ${baseT} da ${resultT}?`;
          answer = (resultT / baseT).toString();
          hints = [`Dividi ${resultT} per ${baseT}`];
          break;
        case 'confronto_tabelline':
          const table1 = randomInt(2, 9);
          const mult1 = randomInt(2, 8);
          const table2 = randomInt(2, 9);
          const mult2 = randomInt(2, 8);
          const result1 = table1 * mult1;
          const result2 = table2 * mult2;
          question = `Quale prodotto e piu grande: ${table1} x ${mult1} o ${table2} x ${mult2}?`;
          answer = result1 > result2 ? `${table1} x ${mult1}` : result1 < result2 ? `${table2} x ${mult2}` : 'Sono uguali';
          hints = [`Calcola entrambi i prodotti: ${table1} x ${mult1} = ${result1}, ${table2} x ${mult2} = ${result2}`];
          break;
      }

    } else {
      const exerciseType = randomChoice(['tabelline_miste', 'problema_tabelline', 'sequenza_inversa']);

      switch (exerciseType) {
        case 'tabelline_miste':
          const factors = [];
          while (factors.length < 3) {
            const f = randomInt(2, 10);
            if (!factors.includes(f)) factors.push(f);
          }
          const multipliers = factors.map(f => randomInt(1, 10));
          question = `Calcola: ${factors[0]} x ${multipliers[0]} = ___ , ${factors[1]} x ${multipliers[1]} = ___ , ${factors[2]} x ${multipliers[2]} = ___`;
          answer = `${factors[0] * multipliers[0]}, ${factors[1] * multipliers[1]}, ${factors[2] * multipliers[2]}`;
          hints = [`Calcola ogni moltiplicazione separatamente`];
          break;
        case 'problema_tabelline':
          const tableP = randomInt(2, 10);
          const groupsP = randomInt(2, 8);
          const totalP = tableP * groupsP;
          question = `In ogni pacco ci sono ${tableP} matite. Se ci sono ${groupsP} pacchi, quante matite ci sono in totale?`;
          answer = totalP.toString();
          hints = [`Moltiplica ${tableP} x ${groupsP}`];
          break;
        case 'sequenza_inversa':
          const tableInv = randomInt(2, 10);
          const startInv = randomInt(5, 10);
          const lengthInv = 5;
          const sequenceInv = Array.from({ length: lengthInv }, (_, j) => tableInv * (startInv - j));
          const missingInv = randomInt(0, lengthInv - 1);
          sequenceInv[missingInv] = '___';
          question = `Completa la sequenza inversa della tabellina del ${tableInv}: ${sequenceInv.join(', ')}`;
          answer = (tableInv * (startInv - missingInv)).toString();
          hints = [`La sequenza diminuisce di ${tableInv} ogni volta`];
          break;
      }
    }

    const exercise = {
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: options ? 'multipla' : 'calcolo',
      question: question,
      answer: { type: options ? 'multiple_choice' : 'number', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
      estimatedTime: 3,
      hints: hints || [],
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateTabellineExercises',
        seed: randomInt(1000, 9999)
      }
    };

    if (options) {
      exercise.options = options;
    }

    exercises.push(exercise);
  }

  return exercises;
}

// ============================================================================
// GENERATORE: DIVISIONE
// ============================================================================

/**
 * Genera esercizi di divisione per Grado 2
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateDivisioneExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['ripartizione_semplice', 'contenenza_semplice']);

      switch (exerciseType) {
        case 'ripartizione_semplice':
          const totalR = randomInt(4, 12);
          const groupsR = randomInt(2, 3);
          if (totalR % groupsR !== 0) { i--; continue; }
          const resultR = totalR / groupsR;
          question = `Se hai ${totalR} caramelle e le vuoi dividere equamente tra ${groupsR} amici, quante caramelle spetta a ciascun amico?`;
          answer = resultR.toString();
          hints = [`Dividi ${totalR} per ${groupsR}`];
          break;
        case 'contenenza_semplice':
          const totalC = randomInt(6, 20);
          const groupSizeC = randomInt(2, 4);
          if (totalC % groupSizeC !== 0) { i--; continue; }
          const resultC = totalC / groupSizeC;
          question = `Quanti gruppi di ${groupSizeC} puoi formare con ${totalC} oggetti?`;
          answer = resultC.toString();
          hints = [`Dividi ${totalC} per ${groupSizeC}`];
          break;
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['divisione_diretta', 'problema_ripartizione', 'divisione_inversa']);

      switch (exerciseType) {
        case 'divisione_diretta':
          const divisorD = randomInt(2, 5);
          const quotientD = randomInt(2, 9);
          const dividendD = divisorD * quotientD;
          question = `Calcola: ${dividendD} : ${divisorD} = ___`;
          answer = quotientD.toString();
          hints = [`Pensa: ${divisorD} x ___ = ${dividendD}`];
          break;
        case 'problema_ripartizione':
          const totalP = randomInt(10, 30);
          const groupsP = randomInt(2, 5);
          if (totalP % groupsP !== 0) { i--; continue; }
          const resultP = totalP / groupsP;
          const objectsP = randomChoice(['mele', 'libri', 'palle']);
          question = `Ci sono ${totalP} ${objectsP} da distribuire equamente in ${groupsP} scatole. Quanti ${objectsP} vanno in ogni scatola?`;
          answer = resultP.toString();
          hints = [`Dividi ${totalP} per ${groupsP}`];
          break;
        case 'divisione_inversa':
          const divisorI = randomInt(2, 5);
          const quotientI = randomInt(2, 8);
          const dividendI = divisorI * quotientI;
          question = `Se ${divisorI} x ${quotientI} = ${dividendI}, allora ${dividendI} : ${divisorI} = ___`;
          answer = quotientI.toString();
          hints = [`La divisione e l'operazione inversa della moltiplicazione`];
          break;
      }

    } else {
      const exerciseType = randomChoice(['divisione_con_resto', 'problema_contenenza', 'divisione_proprieta']);

      switch (exerciseType) {
        case 'divisione_con_resto':
          const divisorResto = randomInt(2, 8);
          const dividendResto = randomInt(divisorResto * 2 + 1, divisorResto * 10);
          const quotientResto = Math.floor(dividendResto / divisorResto);
          const resto = dividendResto % divisorResto;
          question = `Calcola: ${dividendResto} : ${divisorResto} = ___ con resto ___`;
          answer = `${quotientResto}, ${resto}`;
          hints = [`${divisorResto} x ${quotientResto} = ${divisorResto * quotientResto}, resto = ${dividendResto} - ${divisorResto * quotientResto} = ${resto}`];
          break;
        case 'problema_contenenza':
          const totalObj = randomInt(15, 40);
          const perGroup = randomInt(3, 7);
          const numGroups = Math.floor(totalObj / perGroup);
          const remainderObj = totalObj % perGroup;
          question = `Con ${totalObj} caramelle, quante bustine da ${perGroup} caramelle puoi preparare? Quante caramelle avanzano?`;
          answer = `${numGroups} bustine, ${remainderObj} caramelle`;
          hints = [`Dividi ${totalObj} per ${perGroup} per trovare le bustine, il resto sono le caramelle avanzate`];
          break;
        case 'divisione_proprieta':
          const dividendProp = randomInt(10, 50);
          const divisorProp = randomInt(2, 5);
          if (dividendProp % divisorProp !== 0) { i--; continue; }
          const quotientProp = dividendProp / divisorProp;
          question = `Se ${dividendProp} : ${divisorProp} = ${quotientProp}, allora ${dividendProp} : ${quotientProp} = ___`;
          answer = divisorProp.toString();
          hints = [`Se a : b = c, allora a : c = b`];
          break;
      }
    }

    exercises.push({
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: 'calcolo',
      question: question,
      answer: { type: 'string', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
      estimatedTime: 4,
      hints: hints || [],
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateDivisioneExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

/**
 * Genera esercizi per il nucleo Numeri del Grado 2
 * 
 * @param {string} topicId - ID specifico dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade2NumeriExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado2_numeri_sistema_decimale': generateSistemaDecimaleExercises,
    'grado2_numeri_conteggio_100': generateConteggio100Exercises,
    'grado2_numeri_addizione_colonna': generateAddizioneColonnaExercises,
    'grado2_numeri_sottrazione_colonna': generateSottrazioneColonnaExercises,
    'grado2_numeri_moltiplicazione': generateMoltiplicazioneExercises,
    'grado2_numeri_tabelline': generateTabellineExercises,
    'grado2_numeri_divisione': generateDivisioneExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateSistemaDecimaleExercises(topicId, difficulty, count);
}