/**
 * Generatori di Esercizi per Grado 1 - Nucleo Numeri
 * Basato sul programma ministeriale italiano
 * 
 * Argomenti coperti:
 * - Conteggio progressivo e regressivo (1-20)
 * - Concetto di quantita
 * - Confronto e ordinamento
 * - Addizione e sottrazione
 * - Valore posizionale
 * - Calcolo mentale
 */

import { randomInt, randomChoice, randomShuffle } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

// ============================================================================
// GENERATORE: CONTEGGIO DEI NUMERI
// ============================================================================

/**
 * Genera esercizi di conteggio per Grado 1
 * 
 * @param {string} topicId - ID dell'argomento (es: 'grado1_numeri_conteggio')
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateConteggioExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  for (let i = 0; i < count; i++) {
    let exerciseType, question, answer, options, hints, solution;
    
    // Livello LOW: Conteggio base 1-10
    if (difficulty === DIFFICULTY.LOW) {
      exerciseType = randomChoice(['progressivo', 'regressivo', 'quantita', 'simboli']);
      
      switch (exerciseType) {
        case 'progressivo':
          // Conteggio progressivo: "Conta fino a X"
          const maxForward = randomInt(5, 10);
          question = `Conta in senso progressivo fino a ${maxForward}: 1, ___`;
          answer = Array.from({ length: maxForward }, (_, j) => j + 1).join(', ');
          hints = [
            `Inizia da 1 e continua a contare in avanti`,
            `Dopo 1 viene 2, dopo 2 viene 3, e cosi via`
          ];
          break;
          
        case 'regressivo':
          // Conteggio regressivo: "Conta da X fino a 1"
          const maxBackward = randomInt(5, 10);
          question = `Conta in senso regressivo da ${maxBackward}: ${maxBackward}, ___`;
          answer = Array.from({ length: maxBackward }, (_, j) => maxBackward - j).join(', ');
          hints = [
            `Inizia da ${maxBackward} e continua a contare all'indietro`,
            `Dopo ${maxBackward} viene ${maxBackward - 1}, dopo ${maxBackward - 1} viene ${maxBackward - 2}, e cosi via`
          ];
          break;
          
        case 'quantita':
          // Contare quantità di oggetti
          const numItems = randomInt(3, 10);
          const objects = randomChoice(['mele', 'palle', 'matite', 'libri', 'bambini']);
          question = `Quante ${objects} ci sono? <img src="data:image/svg+xml;base64,${generateObjectSvg(numItems, objects)}" alt="${numItems} ${objects}" style="max-width: 200px; max-height: 100px;" />`;
          answer = numItems.toString();
          hints = [
            `Conta una ${objects} alla volta`,
            `Usa le dita per tenere il conto se ti aiuta`
          ];
          break;
          
        case 'simboli':
          // Contare numeri rappresentati con simboli
          const numSymbols = randomInt(3, 8);
          const symbol = randomChoice(['★', '♥', '◆', '●']);
          question = `Quanti ${symbol} ci sono? ${symbol.repeat(numSymbols)}`;
          answer = numSymbols.toString();
          hints = [
            `Conta ogni ${symbol} uno alla volta`,
            `Se ti aiuta, segna ogni ${symbol} con un pennarello`
          ];
          break;
      }
      
    // Livello MID: Conteggio 1-20 e sequenze
    } else if (difficulty === DIFFICULTY.MID) {
      exerciseType = randomChoice(['progressivo_1_20', 'regressivo_1_20', 'sequenza_mancante', 'completa_sequenza']);
      
      switch (exerciseType) {
        case 'progressivo_1_20':
          const maxMid = randomInt(10, 20);
          question = `Conta fino a ${maxMid}: 1, 2, ___`;
          answer = Array.from({ length: maxMid }, (_, j) => j + 1).join(', ');
          hints = [
            `Continua a contare da dove ti sei fermato`,
            `Ricordati: dopo 9 viene 10, dopo 10 viene 11`
          ];
          break;
          
        case 'regressivo_1_20':
          const startMid = randomInt(10, 20);
          question = `Conta all'indietro da ${startMid}: ${startMid}, ___`;
          answer = Array.from({ length: startMid }, (_, j) => startMid - j).join(', ');
          hints = [
            `Inizia da ${startMid} e sottrai 1 ogni volta`,
            `Dopo 11 viene 10, dopo 10 viene 9`
          ];
          break;
          
        case 'sequenza_mancante':
          const missingPosition = randomInt(1, 4);
          const seqLength = randomInt(5, 8);
          const sequence = Array.from({ length: seqLength }, (_, j) => j + 1);
          sequence[missingPosition] = '___';
          question = `Completa la sequenza: ${sequence.join(', ')}`;
          answer = (missingPosition + 1).toString();
          hints = [
            `Guarda i numeri prima e dopo lo spazio vuoto`,
            `Conta in ordine per trovare il numero mancante`
          ];
          break;
          
        case 'completa_sequenza':
          const startSeq = randomInt(1, 15);
          const seqItems = randomInt(3, 5);
          const fullSequence = Array.from({ length: seqItems }, (_, j) => startSeq + j);
          question = `Completa: ${startSeq}, ___`;
          answer = fullSequence.join(', ');
          hints = [
            `Aggiungi 1 al numero precedente per ogni passaggio`,
            `Pratica: ${startSeq}, ${startSeq + 1}, ${startSeq + 2}`
          ];
          break;
      }
      
    // Livello HIGH: Conteggio avanzato e sequenze complesse
    } else {
      exerciseType = randomChoice(['progressivo_alt', 'regressivo_alt', 'sequenza_decimale']);
      
      switch (exerciseType) {
        case 'progressivo_alt':
          const startHigh = randomInt(15, 19);
          const endHigh = randomInt(startHigh + 2, 21);
          question = `Conta da ${startHigh} fino a ${endHigh}: ${startHigh}, ___`;
          answer = Array.from({ length: endHigh - startHigh + 1 }, (_, j) => startHigh + j).join(', ');
          hints = [
            `Continua da ${startHigh} e aggiungi 1 ogni volta`,
            `Attenzione ai passaggi tra decine: 19, 20`
          ];
          break;
          
        case 'regressivo_alt':
          const startHighDown = randomInt(18, 20);
          const endHighDown = randomInt(15, startHighDown - 2);
          question = `Conta all'indietro da ${startHighDown} fino a ${endHighDown}: ${startHighDown}, ___`;
          answer = Array.from({ length: startHighDown - endHighDown + 1 }, (_, j) => startHighDown - j).join(', ');
          hints = [
            `Inizia da ${startHighDown} e sottrai 1 ogni volta`,
            `Fai attenzione: dopo 20 viene 19, dopo 19 viene 18`
          ];
          break;
          
        case 'sequenza_decimale':
          const decade = randomChoice([10, 20]);
          question = `Quali sono i numeri della decina del ${decade}?`;
          answer = Array.from({ length: 10 }, (_, j) => decade + j).join(', ');
          hints = [
            `La decina del ${decade} include tutti i numeri da ${decade} a ${decade + 9}`,
            `Esempio: la decina del 10 va da 10 a 19`
          ];
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
      solution: solution || `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateConteggioExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: CONCETTO DI QUANTITA
// ============================================================================

/**
 * Genera esercizi sul concetto di quantita per Grado 1
 */
export function generateQuantitaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, solution;
    
    if (difficulty === DIFFICULTY.LOW) {
      const num1 = randomInt(1, 5);
      const num2 = randomInt(1, 5);
      const object = randomChoice(['palle', 'mele', 'stelline', 'cuori']);
      const symbol = object === 'palle' ? '●' : object === 'mele' ? '🍎' : object === 'stelline' ? '★' : '❤';
      
      // 50% di probabilita di domande dirette
      if (randomInt(0, 1) === 0) {
        question = `Quante ${symbol} ci sono? ${symbol.repeat(num1)}`;
        answer = num1.toString();
        hints = [`Conta ogni ${object} uno alla volta`];
      } else {
        // Confronto tra due quantita
        question = `Ci sono più ${symbol} nel primo gruppo o nel secondo gruppo? <br /> Primo: ${symbol.repeat(num1)} <br /> Secondo: ${symbol.repeat(num2)}`;
        answer = num1 > num2 ? 'Primo gruppo' : num1 < num2 ? 'Secondo gruppo' : 'Sono uguali';
        hints = [`Conta le ${object} in ogni gruppo e confrontale`];
      }
      
    } else if (difficulty === DIFFICULTY.MID) {
      const num1 = randomInt(1, 10);
      const num2 = randomInt(1, 10);
      const object1 = randomChoice(['palle rosse', 'mele verdi', 'stelline gialle']);
      const object2 = randomChoice(['palle blu', 'mele rosse', 'stelline argento']);
      
      if (randomInt(0, 1) === 0) {
        // Trova quanti in piu
        question = `Ci sono ${num1} ${object1} e ${num2} ${object2}. Quante ${object1} ci sono in più?`;
        answer = Math.abs(num1 - num2).toString();
        hints = [`Trova la differenza tra i due numeri`];
      } else {
        // Somma di quantita
        question = `Ci sono ${num1} ${object1} e ${num2} ${object2}. Quante ${object1.split(' ')[0]} ci sono in totale?`;
        answer = (num1 + num2).toString();
        hints = [`Aggiungi i due numeri insieme`];
      }
      
    } else {
      const num1 = randomInt(5, 15);
      const num2 = randomInt(5, 15);
      const object = randomChoice(['palle', 'cubi', 'bastoncini']);
      
      question = `Se hai ${num1} ${object} e ne aggiungi ${num2}, quante ${object} hai ora?`;
      answer = (num1 + num2).toString();
      hints = [`Fai l'addizione: ${num1} + ${num2}`];
    }
    
    exercises.push({
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: 'aperta',
      question: question,
      answer: { type: 'number', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 1 : difficulty === DIFFICULTY.MID ? 2 : 3,
      estimatedTime: 2,
      hints: hints || [],
      solution: solution || `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateQuantitaExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: CONFRONTO E ORDINAMENTO
// ============================================================================

/**
 * Genera esercizi di confronto e ordinamento per Grado 1
 */
export function generateConfrontoExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  for (let i = 0; i < count; i++) {
    let question, answer, options, hints;
    
    if (difficulty === DIFFICULTY.LOW) {
      const num1 = randomInt(1, 10);
      const num2 = randomInt(1, 10);
      
      // Scelta tra confronto simbolico o ordinamento
      if (randomInt(0, 1) === 0) {
        // Usa simboli >, <, =
        question = `Metti il simbolo corretto tra ${num1} e ${num2}: ${num1} ⬜ ${num2}`;
        answer = num1 > num2 ? '>' : num1 < num2 ? '<' : '=';
        options = [
          { id: 'gt', label: '>', correct: num1 > num2 },
          { id: 'lt', label: '<', correct: num1 < num2 },
          { id: 'eq', label: '=', correct: num1 === num2 }
        ];
      } else {
        // Ordinamento crescente
        const nums = [randomInt(1, 10), randomInt(1, 10), randomInt(1, 10)];
        question = `Ordina questi numeri dal più piccolo al più grande: ${nums.join(', ')}`;
        const sorted = [...nums].sort((a, b) => a - b);
        answer = sorted.join(', ');
      }
      
    } else if (difficulty === DIFFICULTY.MID) {
      const num1 = randomInt(5, 15);
      const num2 = randomInt(5, 15);
      const num3 = randomInt(5, 15);
      
      if (randomInt(0, 2) === 0) {
        // Confronto multiplo
        question = `Quale numero è il più grande? ${num1}, ${num2}, ${num3}`;
        answer = Math.max(num1, num2, num3).toString();
      } else if (randomInt(0, 2) === 1) {
        // Confronto con domande
        question = `È vero che ${num1} è maggiore di ${num2}?`;
        answer = (num1 > num2).toString();
      } else {
        // Ordinamento decrescente
        const nums = [num1, num2, num3];
        question = `Ordina questi numeri dal più grande al più piccolo: ${nums.join(', ')}`;
        const sorted = [...nums].sort((a, b) => b - a);
        answer = sorted.join(', ');
      }
      
    } else {
      const num1 = randomInt(10, 20);
      const num2 = randomInt(10, 20);
      
      // Confronto con numeri più grandi
      question = `Inserisci il simbolo corretto: ${num1} ⬜ ${num2}`;
      answer = num1 > num2 ? '>' : num1 < num2 ? '<' : '=';
      options = [
        { id: 'gt', label: '>', correct: num1 > num2 },
        { id: 'lt', label: '<', correct: num1 < num2 },
        { id: 'eq', label: '=', correct: num1 === num2 }
      ];
    }
    
    const exercise = {
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: options ? 'multipla' : 'aperta',
      question: question,
      answer: { type: options ? 'multiple_choice' : 'string', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 1 : difficulty === DIFFICULTY.MID ? 2 : 3,
      estimatedTime: 3,
      hints: hints || [],
      solution: `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateConfrontoExercises',
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
// GENERATORE: ADDIZIONE E SOTTRAZIONE
// ============================================================================

/**
 * Genera esercizi di addizione e sottrazione per Grado 1
 */
export function generateAddizioneSottrazioneExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints;
    let isAddition = randomInt(0, 1) === 0;
    
    if (difficulty === DIFFICULTY.LOW) {
      if (isAddition) {
        const num1 = randomInt(1, 5);
        const num2 = randomInt(1, 5);
        question = `Quanto fa ${num1} + ${num2}?`;
        answer = (num1 + num2).toString();
        hints = [`Conta con le dita: parti da ${num1} e aggiungi ${num2}`];
      } else {
        const num1 = randomInt(5, 10);
        const num2 = randomInt(1, num1);
        question = `Quanto fa ${num1} - ${num2}?`;
        answer = (num1 - num2).toString();
        hints = [`Togli ${num2} da ${num1}`];
      }
      
    } else if (difficulty === DIFFICULTY.MID) {
      if (isAddition) {
        const num1 = randomInt(2, 8);
        const num2 = randomInt(2, 8);
        question = `${num1} + ${num2} = ___`;
        answer = (num1 + num2).toString();
        hints = [`Fai l'addizione passo passo`];
      } else {
        const num1 = randomInt(8, 15);
        const num2 = randomInt(2, num1 - 1);
        question = `${num1} - ${num2} = ___`;
        answer = (num1 - num2).toString();
        hints = [`Pensa: ${num1} meno ${num2}`];
      }
      
    } else {
      if (isAddition) {
        const num1 = randomInt(5, 12);
        const num2 = randomInt(5, 12);
        question = `Calcola: ${num1} + ${num2}`;
        answer = (num1 + num2).toString();
        hints = [`Usa la strategia del 10: ${num1} + ${num2} = (${num1} + ${10 - num1}) + (${num2} + ${num1 - 10})`];
      } else {
        const num1 = randomInt(12, 20);
        const num2 = randomInt(5, num1 - 3);
        question = `Calcola: ${num1} - ${num2}`;
        answer = (num1 - num2).toString();
        hints = [`Scomponi: ${num1} - ${num2} = ${num1} - ${num1 - (num1 - num2)}`];
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
      solution: `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateAddizioneSottrazioneExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: VALORE POSIZIONALE
// ============================================================================

/**
 * Genera esercizi sul valore posizionale per Grado 1
 */
export function generateValorePosizionaleExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints;
    
    if (difficulty === DIFFICULTY.LOW) {
      const num = randomInt(10, 20);
      const tens = Math.floor(num / 10);
      const units = num % 10;
      
      if (randomInt(0, 1) === 0) {
        question = `Scomponi il numero ${num} in decine e unità: ___ decine e ___ unità`;
        answer = `${tens}, ${units}`;
        hints = [`${tens} decine = ${tens * 10}, ${units} unità = ${units}`];
      } else {
        const missing = randomInt(0, 1) === 0 ? 'decine' : 'unità';
        const shown = missing === 'decine' ? units : tens;
        question = `Il numero ${num} ha ${shown} ${missing === 'decine' ? 'unità' : 'decine'}. Quante ${missing} ha?`;
        answer = (missing === 'decine' ? tens : units).toString();
        hints = [`Ricordati: ${num} = ${tens} decine + ${units} unità`];
      }
      
    } else if (difficulty === DIFFICULTY.MID) {
      const num = randomInt(21, 50);
      const tens = Math.floor(num / 10);
      const units = num % 10;
      
      if (randomInt(0, 1) === 0) {
        question = `Quante decine ci sono in ${num}?`;
        answer = tens.toString();
        hints = [`${num} = ${tens} decine + ${units} unità`];
      } else {
        question = `Quante unità ci sono in ${num}?`;
        answer = units.toString();
        hints = [`${num} = ${tens} decine + ${units} unità`];
      }
      
    } else {
      const tens = randomInt(2, 5);
      const units = randomInt(1, 9);
      const num = tens * 10 + units;
      
      if (randomInt(0, 1) === 0) {
        question = `Componi il numero con ${tens} decine e ${units} unità`;
        answer = num.toString();
        hints = [`${tens} decine = ${tens * 10}, ${units} unità = ${units}, somma = ${tens * 10 + units}`];
      } else {
        question = `Che numero si ottiene aggiungendo ${tens * 10} e ${units}?`;
        answer = num.toString();
        hints = [`${tens * 10} + ${units} = ${tens * 10 + units}`];
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
      solution: `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateValorePosizionaleExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: CALCOLO MENTALE
// ============================================================================

/**
 * Genera esercizi di calcolo mentale per Grado 1
 */
export function generateCalcoloMentaleExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints;
    
    if (difficulty === DIFFICULTY.LOW) {
      const num = randomInt(2, 5);
      const add = randomInt(1, 3);
      
      question = `Calcola mentalmente: ${num} + ${add}`;
      answer = (num + add).toString();
      hints = [`Usa le dita: parti da ${num} e aggiungi ${add}`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      const strategy = randomChoice(['amici_10', 'doppio', 'quasi_doppio']);
      
      switch (strategy) {
        case 'amici_10':
          const num1 = randomInt(1, 9);
          question = `Quanto manca a ${num1} per arrivare a 10?`;
          answer = (10 - num1).toString();
          hints = [`10 - ${num1} = ${10 - num1}`];
          break;
          
        case 'doppio':
          const num2 = randomInt(2, 5);
          question = `Qual è il doppio di ${num2}?`;
          answer = (num2 * 2).toString();
          hints = [`${num2} + ${num2} = ${num2 * 2}`];
          break;
          
        case 'quasi_doppio':
          const num3 = randomInt(2, 8);
          question = `Quanto fa ${num3} + ${num3 + 1}?`;
          answer = (num3 + (num3 + 1)).toString();
          hints = [`Pensa al doppio di ${num3} più 1`];
          break;
      }
      
    } else {
      const num1 = randomInt(5, 10);
      const num2 = randomInt(5, 10);
      
      question = `Calcola rapidamente: ${num1} + ${num2}`;
      answer = (num1 + num2).toString();
      hints = [`Usa la strategia che preferisci: ${num1} + ${num2} = (${num1} + ${10 - num1}) + (${num2} - ${10 - num1}) = 10 + ${num2 - (10 - num1)} = ${num1 + num2}`];
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
      solution: `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateCalcoloMentaleExercises',
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
 * Genera esercizi per il nucleo Numeri del Grado 1
 * 
 * @param {string} topicId - ID specifico dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade1NumeriExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  // Mappa argomenti -> generatori
  const topicGenerators = {
    'grado1_numeri_conteggio': generateConteggioExercises,
    'grado1_numeri_quantita': generateQuantitaExercises,
    'grado1_numeri_confronto': generateConfrontoExercises,
    'grado1_numeri_addizione': generateAddizioneSottrazioneExercises,
    'grado1_numeri_sottrazione': generateAddizioneSottrazioneExercises,
    'grado1_numeri_valore_posizionale': generateValorePosizionaleExercises,
    'grado1_numeri_calcolo_mentale': generateCalcoloMentaleExercises
  };
  
  const generator = topicGenerators[topicId];
  
  if (generator) {
    return generator(topicId, difficulty, count);
  }
  
  // Se argomento non trovato, genera esercizi generici
  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateConteggioExercises(topicId, difficulty, count);
}

// Esportazione di tutti i generatori
export {
  generateConteggioExercises,
  generateQuantitaExercises,
  generateConfrontoExercises,
  generateAddizioneSottrazioneExercises,
  generateValorePosizionaleExercises,
  generateCalcoloMentaleExercises
};

// Funzione helper per generare SVG di oggetti
function generateObjectSvg(count, objectType) {
  const colors = ['#006778', '#86d2e5', '#6a3a06', '#f8f9fa'];
  const size = Math.min(25, Math.max(15, 50 - count * 3));
  
  let shape;
  switch (objectType) {
    case 'mele':
      shape = 'circle';
      break;
    case 'palle':
      shape = 'circle';
      break;
    case 'libri':
      shape = 'rect';
      break;
    case 'matite':
      shape = 'line';
      break;
    default:
      shape = 'circle';
  }
  
  const shapes = [];
  const spacing = size * 1.5;
  const cols = Math.min(count, 5);
  const rows = Math.ceil(count / cols);
  
  let svg = `<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">`;
  
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * spacing + spacing / 2;
    const y = row * spacing + spacing / 2;
    const color = colors[i % colors.length];
    
    switch (shape) {
      case 'circle':
        svg += `<circle cx="${x}" cy="${y}" r="${size/2}" fill="${color}"/>`;
        break;
      case 'rect':
        svg += `<rect x="${x - size/2}" y="${y - size/2}" width="${size}" height="${size}" fill="${color}"/>`;
        break;
      case 'line':
        svg += `<rect x="${x - 2}" y="${y - size/2}" width="4" height="${size}" fill="${color}"/>`;
        break;
    }
  }
  
  svg += '</svg>';
  return btoa(unescape(encodeURIComponent(svg)));
}
