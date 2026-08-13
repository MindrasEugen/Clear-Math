/**
 * Generatori di Esercizi per Grado 4 - Nucleo Spazio e Figure
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Classificazione quadrilateri
 * - Concetto di superficie
 * - Area di rettangolo, quadrato e parallelogramma
 * - Trasformazioni isometriche
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

// ============================================================================
// GENERATORE: CLASSIFICAZIONE QUADRILATERI
// ============================================================================

export function generateQuadrilateriExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const quadrilateri = {
    quadrato: 'quattro lati uguali e quattro angoli retti',
    rettangolo: 'lati opposti uguali e quattro angoli retti',
    rombo: 'quattro lati uguali ma angoli non retti',
    parallelogramma: 'lati opposti paralleli e uguali',
    trapezio: 'solo una coppia di lati paralleli'
  };
  const nomi = Object.keys(quadrilateri);

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const nome = randomChoice(nomi);
      question = `Quale quadrilatero ha ${quadrilateri[nome]}?`;
      answer = nome;
      hints = ['Pensa a lati e angoli caratteristici'];

    } else if (difficulty === DIFFICULTY.MID) {
      const n1 = randomChoice(nomi);
      let n2 = randomChoice(nomi);
      while (n2 === n1) n2 = randomChoice(nomi);
      question = `Qual e la differenza tra ${n1} e ${n2}?`;
      answer = `${n1}: ${quadrilateri[n1]}; ${n2}: ${quadrilateri[n2]}`;
      hints = ['Confronta lati e angoli delle due figure'];

    } else {
      question = 'Il quadrato e un caso particolare di quale altro quadrilatero (in realta di due)?';
      answer = 'rettangolo (ha angoli retti) e rombo (ha lati uguali)';
      hints = ['Il quadrato eredita proprieta sia dal rettangolo che dal rombo'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateQuadrilateriExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: CONCETTO DI SUPERFICIE
// ============================================================================

export function generateSuperficieExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const lato = randomInt(2, 8);
      question = `Un quadratino ha il lato di 1 cm. Se copri una superficie con ${lato * lato} quadratini disposti in una griglia ${lato}x${lato}, quanti cm² misura la superficie?`;
      answer = (lato * lato).toString() + ' cm2';
      hints = ['Ogni quadratino da 1 cm di lato copre 1 cm2 di superficie'];

    } else if (difficulty === DIFFICULTY.MID) {
      const righe = randomInt(3, 10);
      const colonne = randomInt(3, 10);
      question = `Una superficie e coperta da una griglia di ${righe} righe e ${colonne} colonne di quadratini da 1 cm2. Qual e l'estensione totale?`;
      answer = (righe * colonne).toString() + ' cm2';
      hints = [`Moltiplica righe x colonne: ${righe} x ${colonne}`];

    } else {
      question = 'Spiega la differenza tra perimetro e superficie (area) di una figura piana.';
      answer = 'Il perimetro misura il contorno (in cm o m), la superficie misura l\'estensione interna (in cm2 o m2)';
      hints = ['Il perimetro e una lunghezza, la superficie e un\'area'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateSuperficieExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: AREA DI RETTANGOLO, QUADRATO E PARALLELOGRAMMA
// ============================================================================

export function generateAreaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const lato = randomInt(3, 15);
      question = `Un quadrato ha il lato di ${lato} cm. Qual e la sua area?`;
      answer = (lato * lato).toString() + ' cm2';
      hints = ['Area del quadrato = lato x lato'];

    } else if (difficulty === DIFFICULTY.MID) {
      const base = randomInt(4, 20);
      const altezza = randomInt(3, 15);
      question = `Un rettangolo ha base ${base} cm e altezza ${altezza} cm. Qual e la sua area?`;
      answer = (base * altezza).toString() + ' cm2';
      hints = ['Area del rettangolo = base x altezza'];

    } else {
      const base = randomInt(5, 20);
      const altezza = randomInt(3, 15);
      question = `Un parallelogramma ha base ${base} cm e altezza (relativa alla base) ${altezza} cm. Qual e la sua area?`;
      answer = (base * altezza).toString() + ' cm2';
      hints = ['Area del parallelogramma = base x altezza (come il rettangolo)'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, type: 'calcolo', generator: 'generateAreaExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: TRASFORMAZIONI ISOMETRICHE
// ============================================================================

export function generateTrasformazioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const tipo = randomChoice(['traslazione', 'rotazione', 'riflessione']);
      const definizioni = {
        traslazione: 'una figura viene spostata senza ruotare ne cambiare forma',
        rotazione: 'una figura viene fatta ruotare attorno a un punto fisso',
        riflessione: 'una figura viene "ribaltata" come in uno specchio'
      };
      question = `Come si chiama la trasformazione in cui ${definizioni[tipo]}?`;
      answer = tipo;
      hints = ['Pensa a come si muove la figura'];

    } else if (difficulty === DIFFICULTY.MID) {
      question = 'Quali proprieta della figura originale restano invariate in tutte le trasformazioni isometriche (traslazione, rotazione, riflessione)?';
      answer = 'forma e dimensioni (lunghezze dei lati e ampiezza degli angoli)';
      hints = ['"Isometrico" significa che le misure non cambiano'];

    } else {
      const oggetto = randomChoice(['una lancetta dell\'orologio', 'un\'immagine riflessa in uno specchio', 'un pezzo degli scacchi spostato in avanti']);
      let tipo;
      if (oggetto.includes('lancetta')) tipo = 'rotazione';
      else if (oggetto.includes('specchio')) tipo = 'riflessione';
      else tipo = 'traslazione';
      question = `Che trasformazione descrive il movimento di ${oggetto}?`;
      answer = tipo;
      hints = ['Osserva se il movimento e uno spostamento, una rotazione o un ribaltamento'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateTrasformazioniExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade4SpazioEFigureExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado4_spazio_quadrilateri': generateQuadrilateriExercises,
    'grado4_spazio_superficie': generateSuperficieExercises,
    'grado4_spazio_area': generateAreaExercises,
    'grado4_spazio_trasformazioni': generateTrasformazioniExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateQuadrilateriExercises(topicId, difficulty, count);
}
