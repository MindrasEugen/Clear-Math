/**
 * Generatori di Esercizi per Grado 4 - Nucleo Relazioni e Funzioni
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Sistema Monetario Europeo (Euro)
 * - Sistema Metrico Decimale
 * - Problemi con frazioni e percentuali
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
// GENERATORE: SISTEMA MONETARIO EUROPEO
// ============================================================================

export function generateEuroExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const oggetti = ['quaderni', 'penne', 'zaini', 'giochi'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;
    const oggetto = randomChoice(oggetti);

    if (difficulty === DIFFICULTY.LOW) {
      const prezzoUnitario = randomInt(2, 20);
      const quantita = randomInt(2, 8);
      question = `Un ${oggetto.slice(0, -1)} costa ${prezzoUnitario} euro. Quanto costano ${quantita} ${oggetto}?`;
      answer = (prezzoUnitario * quantita).toString() + ' euro';
      hints = [`Moltiplica il costo unitario per la quantita: ${prezzoUnitario} x ${quantita}`];

    } else if (difficulty === DIFFICULTY.MID) {
      const costoTotale = randomInt(20, 100);
      const quantita = randomInt(2, 10);
      question = `${quantita} ${oggetto} costano in totale ${costoTotale} euro. Qual e il costo unitario?`;
      answer = (costoTotale / quantita).toString() + ' euro';
      hints = [`Dividi il costo totale per la quantita: ${costoTotale} : ${quantita}`];

    } else {
      const costoAcquisto = randomInt(5, 15);
      const costoVendita = costoAcquisto + randomInt(2, 10);
      const quantita = randomInt(5, 20);
      question = `Un negoziante compra ${oggetto} a ${costoAcquisto} euro l'una e le rivende a ${costoVendita} euro l'una. Qual e il guadagno totale vendendo ${quantita} ${oggetto}?`;
      answer = ((costoVendita - costoAcquisto) * quantita).toString() + ' euro';
      hints = [`Il guadagno unitario e ${costoVendita} - ${costoAcquisto}, poi moltiplica per ${quantita}`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateEuroExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: SISTEMA METRICO DECIMALE
// ============================================================================

export function generateSistemaMetricoExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const km = randomInt(1, 20);
      question = `Converti in metri: ${km} km`;
      answer = (km * 1000).toString() + ' m';
      hints = ['1 km = 1000 m'];

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['massa', 'capacita']);
      if (exerciseType === 'massa') {
        const kg = randomInt(1, 20);
        question = `Converti in grammi: ${kg} kg`;
        answer = (kg * 1000).toString() + ' g';
        hints = ['1 kg = 1000 g'];
      } else {
        const hl = randomInt(1, 10);
        question = `Converti in litri: ${hl} hl (ettolitri)`;
        answer = (hl * 100).toString() + ' l';
        hints = ['1 ettolitro = 100 litri'];
      }

    } else {
      const m = randomInt(1, 5);
      const cm = randomInt(10, 99);
      const mm = randomInt(1, 9);
      const totaleInMm = m * 1000 + cm * 10 + mm;
      question = `Converti in millimetri e somma: ${m} m + ${cm} cm + ${mm} mm`;
      answer = totaleInMm.toString() + ' mm';
      hints = ['1 m = 1000 mm, 1 cm = 10 mm'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateSistemaMetricoExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PROBLEMI CON FRAZIONI E PERCENTUALI
// ============================================================================

export function generateProblemiFrazioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const nomi = ['Anna', 'Luca', 'Sara', 'Marco'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;
    const nome = randomChoice(nomi);

    if (difficulty === DIFFICULTY.LOW) {
      const den = randomChoice([2, 4]);
      const totale = den * randomInt(3, 15);
      question = `${nome} ha letto 1/${den} di un libro di ${totale} pagine. Quante pagine ha letto?`;
      answer = (totale / den).toString() + ' pagine';
      hints = [`Dividi ${totale} per ${den}`];

    } else if (difficulty === DIFFICULTY.MID) {
      const perc = randomChoice([10, 25, 50]);
      const totale = randomInt(4, 20) * 10;
      question = `${nome} ha speso il ${perc}% dei suoi ${totale} euro di risparmi. Quanto ha speso?`;
      answer = ((totale * perc) / 100).toString() + ' euro';
      hints = [`Calcola il ${perc}% di ${totale}`];

    } else {
      const perc = randomChoice([10, 25, 50]);
      const totale = randomInt(4, 20) * 10;
      const speso = (totale * perc) / 100;
      question = `${nome} aveva ${totale} euro e ne ha spesi il ${perc}%. Quanti euro gli rimangono?`;
      answer = (totale - speso).toString() + ' euro';
      hints = [`Calcola lo speso (${perc}% di ${totale}), poi sottrai dal totale`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateProblemiFrazioniExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade4RelazioniEFunzioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado4_relazioni_euro': generateEuroExercises,
    'grado4_relazioni_sistema_metrico': generateSistemaMetricoExercises,
    'grado4_relazioni_problemi_frazioni': generateProblemiFrazioniExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateEuroExercises(topicId, difficulty, count);
}
