/**
 * Generatori di Esercizi per Grado 5 - Nucleo Dati e Previsioni
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Analisi critica di indagini statistiche
 * - Tabelle incrociate
 * - Probabilita espressa come frazione/decimale/percentuale
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
// GENERATORE: ANALISI CRITICA DI INDAGINI STATISTICHE
// ============================================================================

export function generateAnalisiStatisticaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const intervistati = randomInt(10, 30);
      const campioneScuola = randomInt(300, 1000);
      question = `Un'indagine su ${intervistati} alunni di una scuola di ${campioneScuola} alunni e rappresentativa dell'intera scuola? Perche?`;
      answer = intervistati / campioneScuola < 0.1 ? 'probabilmente no, il campione e troppo piccolo' : 'potrebbe esserlo, dipende da come e stato scelto il campione';
      hints = ['Un campione troppo piccolo o non scelto a caso puo non rappresentare bene la popolazione'];

    } else if (difficulty === DIFFICULTY.MID) {
      const si = randomInt(10, 40);
      const no = randomInt(10, 40);
      const totale = si + no;
      const percSi = Math.round((si / totale) * 100);
      question = `In un sondaggio, ${si} alunni su ${totale} preferiscono la matematica. Che percentuale rappresenta?`;
      answer = `circa ${percSi}%`;
      hints = [`Calcola ${si}/${totale} x 100`];

    } else {
      question = 'Perche e importante che il campione di un\'indagine statistica sia scelto in modo casuale e rappresentativo?';
      answer = 'Per evitare distorsioni (bias) che renderebbero i risultati non generalizzabili a tutta la popolazione';
      hints = ['Un campione non casuale puo favorire certe risposte e falsare i risultati'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateAnalisiStatisticaExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: TABELLE INCROCIATE
// ============================================================================

export function generateTabelleIncrociateExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const righe = ['maschi', 'femmine'];
  const colonne = ['calcio', 'danza', 'nuoto'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    const valori = {};
    righe.forEach(r => {
      valori[r] = {};
      colonne.forEach(c => {
        valori[r][c] = randomInt(2, 15);
      });
    });
    const tabellaTesto = righe.map(r => `${r}: ` + colonne.map(c => `${c}=${valori[r][c]}`).join(', ')).join(' | ');

    if (difficulty === DIFFICULTY.LOW) {
      const riga = randomChoice(righe);
      const colonna = randomChoice(colonne);
      question = `Tabella incrociata sport-genere: ${tabellaTesto}. Quanti "${riga}" praticano "${colonna}"?`;
      answer = valori[riga][colonna].toString();
      hints = ['Trova la cella dove riga e colonna si incrociano'];

    } else if (difficulty === DIFFICULTY.MID) {
      const colonna = randomChoice(colonne);
      const totaleColonna = righe.reduce((sum, r) => sum + valori[r][colonna], 0);
      question = `Tabella incrociata: ${tabellaTesto}. Quanti alunni in totale praticano "${colonna}" (maschi + femmine)?`;
      answer = totaleColonna.toString();
      hints = [`Somma i valori della colonna "${colonna}" per tutte le righe`];

    } else {
      const totaleGenerale = righe.reduce((sum, r) => sum + colonne.reduce((s, c) => s + valori[r][c], 0), 0);
      const riga = randomChoice(righe);
      const totaleRiga = colonne.reduce((s, c) => s + valori[riga][c], 0);
      const perc = Math.round((totaleRiga / totaleGenerale) * 100);
      question = `Tabella incrociata: ${tabellaTesto}. Che percentuale del totale rappresentano i "${riga}"?`;
      answer = `circa ${perc}%`;
      hints = [`Calcola il totale dei "${riga}" diviso il totale generale, x 100`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateTabelleIncrociateExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PROBABILITA COME FRAZIONE/DECIMALE/PERCENTUALE
// ============================================================================

export function generateProbabilitaFrazionePercentualeExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const totale = randomChoice([4, 5, 10, 20]);
      const favorevoli = randomInt(1, totale - 1);
      question = `Probabilita di ${favorevoli}/${totale}: esprimila come numero decimale`;
      answer = (favorevoli / totale).toString();
      hints = ['Dividi il numeratore per il denominatore'];

    } else if (difficulty === DIFFICULTY.MID) {
      const totale = randomChoice([4, 5, 10, 20, 25]);
      const favorevoli = randomInt(1, totale - 1);
      const perc = (favorevoli / totale) * 100;
      question = `Probabilita di ${favorevoli}/${totale}: esprimila come percentuale`;
      answer = perc.toString() + '%';
      hints = ['Moltiplica la frazione per 100'];

    } else {
      const decimale = randomChoice([0.25, 0.5, 0.75, 0.2, 0.4, 0.1]);
      question = `Una probabilita e ${decimale} in forma decimale. Esprimila sia come frazione (ridotta) che come percentuale`;
      const frazioni = { 0.25: '1/4', 0.5: '1/2', 0.75: '3/4', 0.2: '1/5', 0.4: '2/5', 0.1: '1/10' };
      answer = `${frazioni[decimale]} e ${decimale * 100}%`;
      hints = ['Moltiplica per 100 per la percentuale, semplifica la frazione ai minimi termini'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateProbabilitaFrazionePercentualeExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade5DatiEPrevisoniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado5_dati_analisi_statistica': generateAnalisiStatisticaExercises,
    'grado5_dati_tabelle_incrociate': generateTabelleIncrociateExercises,
    'grado5_dati_probabilita_frazione_percentuale': generateProbabilitaFrazionePercentualeExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateAnalisiStatisticaExercises(topicId, difficulty, count);
}
