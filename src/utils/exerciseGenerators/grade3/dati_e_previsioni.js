/**
 * Generatori di Esercizi per Grado 3 - Nucleo Dati e Previsioni
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Grafici a barre
 * - Moda e media aritmetica
 * - Probabilita intuitiva
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
// GENERATORE: GRAFICI A BARRE
// ============================================================================

export function generateGraficiBarreExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const animali = ['cane', 'gatto', 'coniglio', 'pesce'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const animale = randomChoice(animali);
      const altezza = randomInt(2, 12);
      question = `In un grafico a barre, la barra dell'animale "${animale}" e alta ${altezza} quadretti (1 quadretto = 1 voto). Quanti voti ha ricevuto?`;
      answer = altezza.toString();
      hints = ['L\'altezza della barra rappresenta il valore'];

    } else if (difficulty === DIFFICULTY.MID) {
      const valori = animali.map(() => randomInt(2, 10));
      const testo = animali.map((a, idx) => `${a}: ${valori[idx]}`).join(', ');
      const totale = valori.reduce((a, b) => a + b, 0);
      question = `Grafico a barre dei voti: ${testo}. Quanti voti in totale sono stati espressi?`;
      answer = totale.toString();
      hints = ['Somma tutti i valori delle barre'];

    } else {
      const valori = animali.map(() => randomInt(2, 12));
      const testo = animali.map((a, idx) => `${a}: ${valori[idx]}`).join(', ');
      const max = Math.max(...valori);
      const min = Math.min(...valori);
      question = `Grafico a barre: ${testo}. Qual e la differenza tra la barra piu alta e quella piu bassa?`;
      answer = (max - min).toString();
      hints = ['Trova il valore massimo e il valore minimo, poi sottrai'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateGraficiBarreExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: MODA E MEDIA ARITMETICA
// ============================================================================

export function generateModaMediaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const base = randomInt(1, 8);
      const dati = [base, base, randomInt(1, 8), randomInt(1, 8)];
      while (dati.filter(d => d === base).length < 2) dati[2] = base;
      question = `Trova la moda di questi dati: ${dati.join(', ')}`;
      answer = base.toString();
      hints = ['La moda e il valore che compare piu spesso'];

    } else if (difficulty === DIFFICULTY.MID) {
      const dati = Array.from({ length: 4 }, () => randomInt(2, 10) * 2);
      const somma = dati.reduce((a, b) => a + b, 0);
      question = `Calcola la media aritmetica di: ${dati.join(', ')}`;
      answer = (somma / dati.length).toString();
      hints = [`Somma tutti i valori (${somma}) e dividi per il numero di dati (${dati.length})`];

    } else {
      const n = 3;
      const media = randomInt(5, 20);
      const dati = [media - randomInt(1, 4), media, media + randomInt(1, 4)];
      const somma = dati.reduce((a, b) => a + b, 0);
      const mediaReale = somma / dati.length;
      question = `Tre bambini hanno raccolto ${dati.join(', ')} figurine. Qual e il numero medio di figurine raccolte?`;
      answer = mediaReale.toString();
      hints = [`Somma: ${somma}, dividi per ${n}`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateModaMediaExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PROBABILITA INTUITIVA
// ============================================================================

export function generateProbabilitaIntuitivaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const rosse = randomInt(1, 8);
      const blu = randomInt(1, 8);
      question = `In un sacchetto ci sono ${rosse} palline rosse e ${blu} palline blu. E' piu probabile, meno probabile o ugualmente probabile estrarre una pallina rossa rispetto a una blu?`;
      answer = rosse > blu ? 'piu probabile' : rosse < blu ? 'meno probabile' : 'ugualmente probabile';
      hints = ['Confronta il numero di palline rosse con quello delle palline blu'];

    } else if (difficulty === DIFFICULTY.MID) {
      const facce = 6;
      const favorevoli = randomInt(1, 5);
      question = `Lanciando un dado a ${facce} facce, quanti sono i casi favorevoli per ottenere un numero minore o uguale a ${favorevoli}?`;
      answer = favorevoli.toString();
      hints = [`I numeri da 1 a ${favorevoli} sono i casi favorevoli`];

    } else {
      const totale = randomInt(6, 15);
      const favorevoli = randomInt(1, totale - 1);
      question = `In un'urna ci sono ${totale} palline numerate da 1 a ${totale}. Qual e la probabilita di estrarre un numero minore o uguale a ${favorevoli}, espressa come frazione?`;
      answer = `${favorevoli}/${totale}`;
      hints = ['La probabilita e casi favorevoli su casi possibili'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateProbabilitaIntuitivaExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade3DatiEPrevisoniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado3_dati_grafici_barre': generateGraficiBarreExercises,
    'grado3_dati_moda_media': generateModaMediaExercises,
    'grado3_dati_probabilita_intuitiva': generateProbabilitaIntuitivaExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateGraficiBarreExercises(topicId, difficulty, count);
}
