/**
 * Generatori di Esercizi per Grado 4 - Nucleo Dati e Previsioni
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Moda, media e mediana
 * - Grafici a linee
 * - Probabilita come rapporto
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
// GENERATORE: MODA, MEDIA E MEDIANA
// ============================================================================

export function generateModaMediaMedianaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const base = randomInt(1, 10);
      const dati = [base, base, randomInt(1, 10), randomInt(1, 10), randomInt(1, 10)];
      question = `Trova la moda di questi dati: ${dati.join(', ')}`;
      answer = base.toString();
      hints = ['La moda e il valore che si ripete piu spesso'];

    } else if (difficulty === DIFFICULTY.MID) {
      const dati = Array.from({ length: 5 }, () => randomInt(2, 10) * 2);
      const somma = dati.reduce((a, b) => a + b, 0);
      question = `Calcola la media aritmetica di: ${dati.join(', ')}`;
      answer = (somma / dati.length).toString();
      hints = [`Somma tutti i valori (${somma}) e dividi per ${dati.length}`];

    } else {
      const dati = Array.from({ length: 5 }, () => randomInt(1, 30));
      const ordinati = [...dati].sort((a, b) => a - b);
      const mediana = ordinati[Math.floor(ordinati.length / 2)];
      question = `Trova la mediana di questi dati: ${dati.join(', ')}`;
      answer = mediana.toString();
      hints = ['Ordina i dati e prendi il valore centrale'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateModaMediaMedianaExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: GRAFICI A LINEE
// ============================================================================

export function generateGraficiLineeExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const giorni = ['lunedi', 'martedi', 'mercoledi'];
      const temperature = giorni.map(() => randomInt(15, 30));
      const testo = giorni.map((g, idx) => `${g}: ${temperature[idx]}°C`).join(', ');
      const giornoCaldo = giorni[temperature.indexOf(Math.max(...temperature))];
      question = `Grafico a linee delle temperature: ${testo}. In quale giorno la temperatura e stata piu alta?`;
      answer = giornoCaldo;
      hints = ['Cerca il punto piu alto sulla linea del grafico'];

    } else if (difficulty === DIFFICULTY.MID) {
      const giorni = ['lunedi', 'martedi', 'mercoledi', 'giovedi'];
      const temperature = giorni.map(() => randomInt(15, 30));
      const testo = giorni.map((g, idx) => `${g}: ${temperature[idx]}°C`).join(', ');
      const variazione = temperature[temperature.length - 1] - temperature[0];
      question = `Grafico a linee: ${testo}. Di quanti gradi e variata la temperatura da ${giorni[0]} a ${giorni[giorni.length - 1]}?`;
      answer = (variazione >= 0 ? '+' : '') + variazione + '°C';
      hints = [`Sottrai la temperatura di ${giorni[0]} da quella di ${giorni[giorni.length - 1]}`];

    } else {
      const mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio'];
      const vendite = mesi.map(() => randomInt(50, 200));
      const testo = mesi.map((m, idx) => `${m}: ${vendite[idx]}`).join(', ');
      const media = Math.round(vendite.reduce((a, b) => a + b, 0) / vendite.length);
      question = `Grafico a linee delle vendite mensili: ${testo}. Qual e la vendita media mensile?`;
      answer = media.toString();
      hints = ['Somma tutti i valori e dividi per il numero di mesi'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateGraficiLineeExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PROBABILITA COME RAPPORTO
// ============================================================================

export function generateProbabilitaRapportoExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const totale = randomInt(6, 12);
      const favorevoli = randomInt(1, totale - 1);
      question = `In un'urna ci sono ${totale} palline, di cui ${favorevoli} rosse. Qual e la probabilita di estrarre una pallina rossa, come frazione?`;
      answer = `${favorevoli}/${totale}`;
      hints = ['Probabilita = casi favorevoli / casi possibili'];

    } else if (difficulty === DIFFICULTY.MID) {
      const totale = randomInt(8, 20);
      const favorevoli = randomInt(1, totale - 1);
      const perc = Math.round((favorevoli / totale) * 100);
      question = `Con ${favorevoli} casi favorevoli su ${totale} possibili, esprimi la probabilita come percentuale approssimata`;
      answer = `circa ${perc}%`;
      hints = [`Calcola ${favorevoli}/${totale} x 100`];

    } else {
      const facce = 6;
      const numeriPari = 3;
      question = `Lanciando un dado a ${facce} facce, qual e la probabilita di ottenere un numero pari, espressa come frazione ridotta ai minimi termini?`;
      answer = '1/2';
      hints = [`I numeri pari sono ${numeriPari} su ${facce} totali: ${numeriPari}/${facce} si semplifica`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateProbabilitaRapportoExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade4DatiEPrevisoniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado4_dati_moda_media_mediana': generateModaMediaMedianaExercises,
    'grado4_dati_grafici_linee': generateGraficiLineeExercises,
    'grado4_dati_probabilita_rapporto': generateProbabilitaRapportoExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateModaMediaMedianaExercises(topicId, difficulty, count);
}
