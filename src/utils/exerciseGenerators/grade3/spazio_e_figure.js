/**
 * Generatori di Esercizi per Grado 3 - Nucleo Spazio e Figure
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Rette incidenti, parallele, perpendicolari
 * - Gli angoli (retto, acuto, ottuso, piatto, giro)
 * - I poligoni
 * - Classificazione dei triangoli
 * - Il perimetro
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

function makeExercise(topicId, i, { question, answer, difficulty, hints, type = 'aperta', answerType = 'string', options, generator }) {
  const ex = {
    id: `exercise_${topicId}_${i}_${Date.now()}`,
    topicId: topicId,
    type: options ? 'multipla' : type,
    question: question,
    answer: { type: options ? 'multiple_choice' : answerType, value: answer },
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
  if (options) ex.options = options;
  return ex;
}

// ============================================================================
// GENERATORE: RETTE INCIDENTI, PARALLELE, PERPENDICOLARI
// ============================================================================

export function generateRetteExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const tipo = randomChoice(['incidenti', 'parallele', 'perpendicolari']);
      const definizioni = {
        incidenti: 'due rette che si incontrano in un solo punto',
        parallele: 'due rette che non si incontrano mai, mantenendo sempre la stessa distanza',
        perpendicolari: 'due rette che si incontrano formando un angolo retto (90 gradi)'
      };
      question = `Come si chiamano ${definizioni[tipo]}?`;
      answer = tipo;
      hints = ['Pensa a come si comportano le due rette tra loro'];

    } else if (difficulty === DIFFICULTY.MID) {
      const esempi = ['i binari di un treno', 'le righe di un quaderno', 'i due bracci di una croce', 'i lati opposti di un rettangolo'];
      const esempio = randomChoice(esempi);
      question = `Le rette rappresentate da ${esempio} sono parallele o perpendicolari?`;
      answer = esempio.includes('croce') ? 'perpendicolari' : 'parallele';
      hints = ['Le rette parallele non si incrociano mai, le perpendicolari formano un angolo retto'];

    } else {
      question = 'Disegna due rette perpendicolari e spiega come riconosci l\'angolo retto che formano.';
      answer = 'L\'angolo retto misura 90 gradi ed e riconoscibile con una squadra';
      hints = ['Usa una squadra per verificare che l\'angolo sia di 90 gradi'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateRetteExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: GLI ANGOLI
// ============================================================================

export function generateAngoliExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const angoli = { retto: 90, acuto: null, ottuso: null, piatto: 180, giro: 360 };

  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;

    if (difficulty === DIFFICULTY.LOW) {
      const tipo = randomChoice(['retto', 'piatto', 'giro']);
      question = `Quanti gradi misura un angolo ${tipo}?`;
      answer = angoli[tipo].toString();
      hints = ['Retto = 90°, piatto = 180°, giro = 360°'];

    } else if (difficulty === DIFFICULTY.MID) {
      const gradi = randomInt(1, 359);
      let tipo;
      if (gradi < 90) tipo = 'acuto';
      else if (gradi === 90) tipo = 'retto';
      else if (gradi < 180) tipo = 'ottuso';
      else if (gradi === 180) tipo = 'piatto';
      else tipo = 'giro o concavo';
      question = `Un angolo misura ${gradi} gradi. Che tipo di angolo e?`;
      answer = tipo;
      options = [
        { id: 'acuto', label: 'acuto (< 90°)', correct: tipo === 'acuto' },
        { id: 'retto', label: 'retto (= 90°)', correct: tipo === 'retto' },
        { id: 'ottuso', label: 'ottuso (tra 90° e 180°)', correct: tipo === 'ottuso' },
        { id: 'piatto', label: 'piatto (= 180°)', correct: tipo === 'piatto' }
      ];
      hints = ['Acuto: minore di 90°. Retto: uguale a 90°. Ottuso: tra 90° e 180°. Piatto: uguale a 180°'];

    } else {
      const a1 = randomInt(20, 80);
      question = `Due angoli formano un angolo piatto. Se il primo misura ${a1} gradi, quanto misura il secondo?`;
      answer = (180 - a1).toString();
      hints = ['La somma di due angoli che formano un angolo piatto e 180 gradi'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, options, generator: 'generateAngoliExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: I POLIGONI
// ============================================================================

export function generatePoligoniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const poligoni = { triangolo: 3, quadrilatero: 4, pentagono: 5, esagono: 6, ettagono: 7, ottagono: 8 };
  const nomi = Object.keys(poligoni);

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const nome = randomChoice(nomi);
      question = `Quanti lati ha un ${nome}?`;
      answer = poligoni[nome].toString();
      hints = ['Il nome del poligono spesso indica il numero di lati (es. "penta" = 5)'];

    } else if (difficulty === DIFFICULTY.MID) {
      const nome = randomChoice(nomi);
      const lati = poligoni[nome];
      question = `Un poligono ha ${lati} lati e ${lati} vertici. Come si chiama?`;
      answer = nome;
      hints = ['In un poligono il numero di lati e uguale al numero di vertici'];

    } else {
      const nome = randomChoice(nomi);
      const lati = poligoni[nome];
      const diagonali = Math.round((lati * (lati - 3)) / 2);
      question = `Quante diagonali ha un ${nome} (${lati} lati)? (formula: n(n-3)/2)`;
      answer = diagonali.toString();
      hints = [`Applica la formula: ${lati} x (${lati}-3) / 2`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generatePoligoniExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: CLASSIFICAZIONE DEI TRIANGOLI
// ============================================================================

export function generateClassificazioneTriangoliExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const tipo = randomChoice(['equilatero', 'isoscele', 'scaleno']);
      const definizioni = {
        equilatero: 'tutti e tre i lati uguali',
        isoscele: 'due lati uguali e uno diverso',
        scaleno: 'tutti i lati diversi tra loro'
      };
      question = `Un triangolo con ${definizioni[tipo]} come si chiama (classificazione per lati)?`;
      answer = tipo;
      hints = ['Pensa a quanti lati sono uguali'];

    } else if (difficulty === DIFFICULTY.MID) {
      const tipo = randomChoice(['acutangolo', 'rettangolo', 'ottusangolo']);
      const definizioni = {
        acutangolo: 'tutti gli angoli acuti (minori di 90°)',
        rettangolo: 'un angolo retto (90°)',
        ottusangolo: 'un angolo ottuso (maggiore di 90°)'
      };
      question = `Un triangolo con ${definizioni[tipo]} come si chiama (classificazione per angoli)?`;
      answer = tipo;
      hints = ['Pensa alla misura dei suoi angoli'];

    } else {
      const l1 = randomInt(3, 10);
      const l2 = randomChoice([l1, randomInt(3, 10)]);
      let l3 = randomInt(3, 10);
      while (l1 + l2 <= l3 || l1 + l3 <= l2 || l2 + l3 <= l1) l3 = randomInt(3, 10);
      let tipo;
      if (l1 === l2 && l2 === l3) tipo = 'equilatero';
      else if (l1 === l2 || l2 === l3 || l1 === l3) tipo = 'isoscele';
      else tipo = 'scaleno';
      question = `Un triangolo ha lati di ${l1} cm, ${l2} cm e ${l3} cm. Come si classifica in base ai lati?`;
      answer = tipo;
      hints = ['Confronta le lunghezze dei tre lati'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateClassificazioneTriangoliExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: IL PERIMETRO
// ============================================================================

export function generatePerimetroExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const lato = randomInt(3, 15);
      question = `Un quadrato ha il lato di ${lato} cm. Quanto misura il suo perimetro?`;
      answer = (lato * 4).toString() + ' cm';
      hints = ['Il perimetro del quadrato e lato x 4'];

    } else if (difficulty === DIFFICULTY.MID) {
      const base = randomInt(4, 20);
      const altezza = randomInt(3, 15);
      question = `Un rettangolo ha base ${base} cm e altezza ${altezza} cm. Quanto misura il suo perimetro?`;
      answer = ((base + altezza) * 2).toString() + ' cm';
      hints = ['Il perimetro del rettangolo e (base + altezza) x 2'];

    } else {
      const lati = Array.from({ length: 3 }, () => randomInt(3, 20));
      question = `Un triangolo scaleno ha lati di ${lati.join(' cm, ')} cm. Quanto misura il perimetro?`;
      answer = lati.reduce((a, b) => a + b, 0).toString() + ' cm';
      hints = ['Il perimetro e la somma di tutti i lati'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, type: 'calcolo', generator: 'generatePerimetroExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade3SpazioEFigureExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado3_spazio_rette': generateRetteExercises,
    'grado3_spazio_angoli': generateAngoliExercises,
    'grado3_spazio_poligoni': generatePoligoniExercises,
    'grado3_spazio_classificazione_triangoli': generateClassificazioneTriangoliExercises,
    'grado3_spazio_perimetro': generatePerimetroExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateRetteExercises(topicId, difficulty, count);
}
