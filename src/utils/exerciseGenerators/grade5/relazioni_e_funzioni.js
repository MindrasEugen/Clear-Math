/**
 * Generatori di Esercizi per Grado 5 - Nucleo Relazioni e Funzioni
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Equivalenze avanzate (superficie, volume)
 * - Peso lordo, netto e tara
 * - Scala di ingrandimento e riduzione
 * - Problemi complessi
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
// GENERATORE: EQUIVALENZE AVANZATE
// ============================================================================

export function generateEquivalenzeAvanzateExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const m2 = randomInt(1, 20);
      question = `Converti in cm2: ${m2} m2`;
      answer = (m2 * 10000).toString() + ' cm2';
      hints = ['1 m2 = 10.000 cm2'];

    } else if (difficulty === DIFFICULTY.MID) {
      const m3 = randomInt(1, 10);
      question = `Converti in cm3: ${m3} m3`;
      answer = (m3 * 1000000).toString() + ' cm3';
      hints = ['1 m3 = 1.000.000 cm3'];

    } else {
      const ha = randomInt(1, 20);
      question = `Converti in m2: ${ha} ettari (1 ettaro = 10.000 m2)`;
      answer = (ha * 10000).toString() + ' m2';
      hints = ['1 ettaro = 10.000 m2 (un quadrato di 100m x 100m)'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateEquivalenzeAvanzateExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PESO LORDO, NETTO E TARA
// ============================================================================

export function generatePesoLordoNettoExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const netto = randomInt(500, 5000);
      const tara = randomInt(50, 500);
      question = `Un pacco ha peso netto ${netto} g e tara ${tara} g. Qual e il peso lordo?`;
      answer = (netto + tara).toString() + ' g';
      hints = ['Peso lordo = peso netto + tara'];

    } else if (difficulty === DIFFICULTY.MID) {
      const lordo = randomInt(1000, 6000);
      const tara = randomInt(50, 500);
      question = `Un pacco ha peso lordo ${lordo} g e tara ${tara} g. Qual e il peso netto?`;
      answer = (lordo - tara).toString() + ' g';
      hints = ['Peso netto = peso lordo - tara'];

    } else {
      const lordo = randomInt(1000, 6000);
      const netto = randomInt(500, lordo - 100);
      question = `Un pacco ha peso lordo ${lordo} g e peso netto ${netto} g. Qual e la tara?`;
      answer = (lordo - netto).toString() + ' g';
      hints = ['Tara = peso lordo - peso netto'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generatePesoLordoNettoExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: SCALA DI INGRANDIMENTO E RIDUZIONE
// ============================================================================

export function generateScalaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const scala = randomChoice([100, 1000, 10000]);
      const cmMappa = randomInt(2, 20);
      const distanzaRealeCm = cmMappa * scala;
      question = `Su una mappa in scala 1:${scala}, una distanza misura ${cmMappa} cm. Quanti cm rappresenta nella realta?`;
      answer = distanzaRealeCm.toString() + ' cm';
      hints = [`Moltiplica ${cmMappa} per ${scala}`];

    } else if (difficulty === DIFFICULTY.MID) {
      const scala = randomChoice([1000, 5000, 10000, 100000]);
      const cmMappa = randomInt(2, 20);
      const distanzaRealeM = (cmMappa * scala) / 100;
      question = `Su una mappa in scala 1:${scala}, una distanza misura ${cmMappa} cm. Quanti metri rappresenta nella realta?`;
      answer = distanzaRealeM.toString() + ' m';
      hints = [`Calcola prima i cm reali (${cmMappa} x ${scala}), poi converti in metri dividendo per 100`];

    } else {
      const scala = randomChoice([25000, 50000, 100000]);
      const distanzaRealeKm = randomInt(1, 20);
      const cmMappa = (distanzaRealeKm * 100000) / scala;
      question = `Su una mappa in scala 1:${scala}, quanti cm rappresentano una distanza reale di ${distanzaRealeKm} km?`;
      answer = cmMappa.toString() + ' cm';
      hints = [`Converti ${distanzaRealeKm} km in cm (x 100.000), poi dividi per ${scala}`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateScalaExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PROBLEMI COMPLESSI
// ============================================================================

export function generateProblemiComplessiExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const nomi = ['Anna', 'Luca', 'Sara', 'Marco'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;
    const nome = randomChoice(nomi);

    if (difficulty === DIFFICULTY.LOW) {
      const parti = randomInt(2, 4);
      const totale = parti * randomInt(5, 20);
      question = `${nome} deve dividere ${totale} euro in ${parti} parti uguali per i suoi amici. Quanto riceve ciascuno?`;
      answer = (totale / parti).toString() + ' euro';
      hints = [`Dividi ${totale} per ${parti}`];

    } else if (difficulty === DIFFICULTY.MID) {
      const velocita = randomInt(40, 100);
      const tempo = randomInt(2, 6);
      question = `${nome} viaggia a ${velocita} km/h per ${tempo} ore. Quanti km percorre?`;
      answer = (velocita * tempo).toString() + ' km';
      hints = ['Distanza = velocita x tempo'];

    } else {
      const partenza = randomInt(50, 200);
      const rate = randomInt(3, 8);
      const importoRata = randomInt(10, 30);
      const totalePagato = rate * importoRata;
      question = `${nome} deve pagare un debito di ${partenza + totalePagato} euro in ${rate} rate da ${importoRata} euro l'una piu un acconto iniziale. Quanto vale l'acconto iniziale?`;
      answer = partenza.toString() + ' euro';
      hints = [`Il totale meno le rate pagate (${rate} x ${importoRata}) da l'acconto`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateProblemiComplessiExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade5RelazioniEFunzioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado5_relazioni_equivalenze_avanzate': generateEquivalenzeAvanzateExercises,
    'grado5_relazioni_peso_lordo_netto': generatePesoLordoNettoExercises,
    'grado5_relazioni_scala': generateScalaExercises,
    'grado5_relazioni_problemi_complessi': generateProblemiComplessiExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateEquivalenzeAvanzateExercises(topicId, difficulty, count);
}
