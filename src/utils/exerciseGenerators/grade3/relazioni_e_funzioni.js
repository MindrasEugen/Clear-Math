/**
 * Generatori di Esercizi per Grado 3 - Nucleo Relazioni e Funzioni
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Unita di misura convenzionali (lunghezza, peso, capacita)
 * - Problemi aritmetici a due operazioni
 * - Diagrammi di flusso e schemi a albero
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

function makeExercise(topicId, i, { question, answer, difficulty, hints, generator }) {
  return {
    id: `exercise_${topicId}_${i}_${Date.now()}`,
    topicId: topicId,
    type: 'aperta',
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
      generator: generator,
      seed: randomInt(1000, 9999)
    }
  };
}

// ============================================================================
// GENERATORE: UNITA DI MISURA CONVENZIONALI
// ============================================================================

export function generateUnitaMisuraExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const unita = randomChoice([
        { grandezza: 'lunghezza', unitaBase: 'metro', simbolo: 'm' },
        { grandezza: 'peso', unitaBase: 'grammo', simbolo: 'g' },
        { grandezza: 'capacita', unitaBase: 'litro', simbolo: 'l' }
      ]);
      question = `Qual e l'unita di misura convenzionale base per la ${unita.grandezza}?`;
      answer = `${unita.unitaBase} (${unita.simbolo})`;
      hints = ['Pensa alle unita che usi per misurare distanze, pesi o liquidi'];

    } else if (difficulty === DIFFICULTY.MID) {
      const metri = randomInt(1, 20);
      question = `Quanti centimetri ci sono in ${metri} metri?`;
      answer = (metri * 100).toString() + ' cm';
      hints = ['1 metro = 100 centimetri'];

    } else {
      const exerciseType = randomChoice(['kg_g', 'l_ml']);
      if (exerciseType === 'kg_g') {
        const kg = randomInt(1, 10);
        const g = randomInt(0, 9) * 100;
        question = `Converti in grammi: ${kg} kg e ${g} g`;
        answer = (kg * 1000 + g).toString() + ' g';
        hints = ['1 kg = 1000 g'];
      } else {
        const l = randomInt(1, 10);
        const ml = randomInt(0, 9) * 100;
        question = `Converti in millilitri: ${l} l e ${ml} ml`;
        answer = (l * 1000 + ml).toString() + ' ml';
        hints = ['1 litro = 1000 ml'];
      }
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateUnitaMisuraExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PROBLEMI A DUE OPERAZIONI
// ============================================================================

export function generateProblemiDueOperazioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const nomi = ['Anna', 'Luca', 'Sara', 'Marco', 'Giulia'];
  const oggetti = ['figurine', 'biglie', 'caramelle', 'matite'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;
    const nome = randomChoice(nomi);
    const oggetto = randomChoice(oggetti);

    if (difficulty === DIFFICULTY.LOW) {
      const a = randomInt(10, 30);
      const b = randomInt(5, 15);
      const c = randomInt(5, 15);
      question = `${nome} ha ${a} ${oggetto}. Ne regala ${b} a un amico e ne compra altre ${c}. Quante ${oggetto} ha alla fine?`;
      answer = (a - b + c).toString();
      hints = [`Prima sottrai ${b}, poi aggiungi ${c}`];

    } else if (difficulty === DIFFICULTY.MID) {
      const gruppi = randomInt(3, 8);
      const perGruppo = randomInt(3, 9);
      const regalate = randomInt(2, gruppi * perGruppo - 5);
      question = `${nome} compra ${gruppi} pacchetti da ${perGruppo} ${oggetto} ciascuno, poi ne regala ${regalate}. Quante ${oggetto} gli restano?`;
      answer = (gruppi * perGruppo - regalate).toString();
      hints = ['Prima moltiplica per trovare il totale, poi sottrai le regalate'];

    } else {
      const prezzoUnitario = randomInt(2, 10);
      const quantita = randomInt(3, 8);
      const pagato = randomInt(50, 100);
      const spesa = prezzoUnitario * quantita;
      question = `${nome} compra ${quantita} ${oggetto} a ${prezzoUnitario} euro l'una. Se paga con ${pagato} euro, quanto resto riceve?`;
      answer = (pagato - spesa).toString() + ' euro';
      hints = [`Calcola prima la spesa totale: ${quantita} x ${prezzoUnitario}, poi sottrai da ${pagato}`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateProblemiDueOperazioniExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: DIAGRAMMI DI FLUSSO E SCHEMI A ALBERO
// ============================================================================

export function generateDiagrammiFlussoExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const num = randomInt(2, 10);
      const add = randomInt(2, 10);
      question = `Segui il diagramma di flusso: INIZIO -> prendi il numero ${num} -> aggiungi ${add} -> FINE. Qual e il risultato?`;
      answer = (num + add).toString();
      hints = ['Segui le frecce del diagramma in ordine'];

    } else if (difficulty === DIFFICULTY.MID) {
      const num = randomInt(2, 10);
      const mul = randomInt(2, 5);
      const sub = randomInt(1, 5);
      question = `Diagramma di flusso: INIZIO -> prendi ${num} -> moltiplica per ${mul} -> sottrai ${sub} -> FINE. Qual e il risultato?`;
      answer = (num * mul - sub).toString();
      hints = ['Esegui i passaggi nell\'ordine indicato dalle frecce'];

    } else {
      const num = randomInt(10, 30);
      question = `In uno schema ad albero, un numero ${num} si divide in due rami: uno raddoppia il valore, l'altro lo dimezza (se possibile). Quali sono i due risultati?`;
      answer = `${num * 2} e ${num % 2 === 0 ? num / 2 : (num / 2).toFixed(1)}`;
      hints = ['Un ramo moltiplica per 2, l\'altro divide per 2'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateDiagrammiFlussoExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade3RelazioniEFunzioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado3_relazioni_unita_misura': generateUnitaMisuraExercises,
    'grado3_relazioni_problemi_due_operazioni': generateProblemiDueOperazioniExercises,
    'grado3_relazioni_diagrammi_flusso': generateDiagrammiFlussoExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateUnitaMisuraExercises(topicId, difficulty, count);
}
