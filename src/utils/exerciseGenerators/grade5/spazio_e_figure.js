/**
 * Generatori di Esercizi per Grado 5 - Nucleo Spazio e Figure
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Aree di triangoli e figure piane
 * - Il cerchio
 * - Poligoni regolari e apotema
 * - Geometria solida
 * - Volume e capacita
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

function makeExercise(topicId, i, { question, answer, difficulty, hints, type = 'calcolo', generator }) {
  return {
    id: `exercise_${topicId}_${i}_${Date.now()}`,
    topicId: topicId,
    type: type,
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
// GENERATORE: AREE DI TRIANGOLI E FIGURE PIANE
// ============================================================================

export function generateTriangoliAreaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const base = randomInt(4, 20);
      const altezza = randomInt(3, 15);
      question = `Un triangolo ha base ${base} cm e altezza ${altezza} cm. Qual e la sua area?`;
      answer = ((base * altezza) / 2).toString() + ' cm2';
      hints = ['Area del triangolo = (base x altezza) / 2'];

    } else if (difficulty === DIFFICULTY.MID) {
      const b1 = randomInt(4, 15);
      const b2 = randomInt(4, 15);
      const altezza = randomInt(3, 12);
      question = `Un trapezio ha base maggiore ${Math.max(b1, b2)} cm, base minore ${Math.min(b1, b2)} cm e altezza ${altezza} cm. Qual e la sua area?`;
      answer = (((b1 + b2) * altezza) / 2).toString() + ' cm2';
      hints = ['Area del trapezio = (base maggiore + base minore) x altezza / 2'];

    } else {
      const d1 = randomInt(4, 20);
      const d2 = randomInt(4, 20);
      question = `Un rombo ha diagonali di ${d1} cm e ${d2} cm. Qual e la sua area?`;
      answer = ((d1 * d2) / 2).toString() + ' cm2';
      hints = ['Area del rombo = (diagonale maggiore x diagonale minore) / 2'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateTriangoliAreaExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: IL CERCHIO
// ============================================================================

export function generateCerchioExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const PI_GRECO = 3.14;

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const raggio = randomInt(2, 15);
      question = `Un cerchio ha raggio ${raggio} cm. Quanto misura il diametro?`;
      answer = (raggio * 2).toString() + ' cm';
      hints = ['Il diametro e il doppio del raggio'];

    } else if (difficulty === DIFFICULTY.MID) {
      const raggio = randomInt(2, 15);
      const circonferenza = (2 * PI_GRECO * raggio).toFixed(2);
      question = `Un cerchio ha raggio ${raggio} cm. Qual e la sua circonferenza (usa pi greco = 3,14)?`;
      answer = circonferenza + ' cm';
      hints = ['Circonferenza = 2 x pi greco x raggio'];

    } else {
      const raggio = randomInt(2, 15);
      const area = (PI_GRECO * raggio * raggio).toFixed(2);
      question = `Un cerchio ha raggio ${raggio} cm. Qual e la sua area (usa pi greco = 3,14)?`;
      answer = area + ' cm2';
      hints = ['Area del cerchio = pi greco x raggio x raggio'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateCerchioExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: POLIGONI REGOLARI E APOTEMA
// ============================================================================

export function generatePoligoniRegolariExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const poligoni = { pentagono: 5, esagono: 6, ottagono: 8 };
  const nomi = Object.keys(poligoni);

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const nome = randomChoice(nomi);
      const lati = poligoni[nome];
      const lato = randomInt(3, 12);
      question = `Un ${nome} regolare ha lato ${lato} cm. Qual e il suo perimetro?`;
      answer = (lati * lato).toString() + ' cm';
      hints = [`Il perimetro e il lato moltiplicato per il numero di lati (${lati})`];

    } else if (difficulty === DIFFICULTY.MID) {
      question = 'Cosa rappresenta l\'apotema di un poligono regolare?';
      answer = 'La distanza dal centro del poligono al punto medio di un lato';
      hints = ['E il segmento perpendicolare da centro a lato'];

    } else {
      const nome = randomChoice(nomi);
      const lati = poligoni[nome];
      const lato = randomInt(4, 10);
      const apotema = randomInt(3, 8);
      const perimetro = lati * lato;
      const area = (perimetro * apotema) / 2;
      question = `Un ${nome} regolare ha lato ${lato} cm e apotema ${apotema} cm. Qual e la sua area? (formula: perimetro x apotema / 2)`;
      answer = area.toString() + ' cm2';
      hints = [`Perimetro = ${lati} x ${lato} = ${perimetro}, poi area = ${perimetro} x ${apotema} / 2`];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generatePoligoniRegolariExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: GEOMETRIA SOLIDA
// ============================================================================

export function generateGeometriaSolidaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  const solidi = {
    cubo: '6 facce quadrate uguali, 12 spigoli, 8 vertici',
    parallelepipedo: '6 facce rettangolari, 12 spigoli, 8 vertici',
    piramide: 'una base poligonale e facce triangolari che si uniscono in un vertice',
    cilindro: 'due basi circolari uguali e una superficie laterale curva',
    sfera: 'tutti i punti della superficie equidistanti dal centro'
  };
  const nomi = Object.keys(solidi);

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const nome = randomChoice(nomi);
      question = `Quale solido ha ${solidi[nome]}?`;
      answer = nome;
      hints = ['Pensa a facce, spigoli, vertici e forma della base'];

    } else if (difficulty === DIFFICULTY.MID) {
      question = 'Quanti vertici, spigoli e facce ha un cubo?';
      answer = '8 vertici, 12 spigoli, 6 facce';
      hints = ['Immagina un dado da gioco'];

    } else {
      const nome = randomChoice(['cubo', 'parallelepipedo']);
      question = `Descrivi come si presenta lo sviluppo piano (la "rete") di un ${nome}.`;
      answer = nome === 'cubo' ? '6 quadrati uguali disposti a croce o in altre configurazioni' : '6 rettangoli (a coppie uguali) disposti a croce';
      hints = ['Immagina di "aprire" il solido lungo gli spigoli e stenderlo su un piano'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, type: 'aperta', generator: 'generateGeometriaSolidaExercises' }));
  }

  return exercises;
}

// ============================================================================
// GENERATORE: VOLUME E CAPACITA
// ============================================================================

export function generateVolumeExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const lato = randomInt(2, 10);
      question = `Un cubo ha lo spigolo di ${lato} cm. Qual e il suo volume?`;
      answer = (lato * lato * lato).toString() + ' cm3';
      hints = ['Volume del cubo = lato x lato x lato'];

    } else if (difficulty === DIFFICULTY.MID) {
      const l = randomInt(2, 10);
      const larg = randomInt(2, 10);
      const h = randomInt(2, 10);
      question = `Un parallelepipedo ha dimensioni ${l} cm x ${larg} cm x ${h} cm. Qual e il suo volume?`;
      answer = (l * larg * h).toString() + ' cm3';
      hints = ['Volume del parallelepipedo = lunghezza x larghezza x altezza'];

    } else {
      const litri = randomInt(1, 20);
      question = `Un contenitore ha una capacita di ${litri} litri. A quanti cm3 (o ml) corrisponde?`;
      answer = (litri * 1000).toString() + ' cm3 (ml)';
      hints = ['1 litro = 1000 cm3 = 1000 ml'];
    }

    exercises.push(makeExercise(topicId, i, { question, answer, difficulty, hints, generator: 'generateVolumeExercises' }));
  }

  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

export function generateGrade5SpazioEFigureExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado5_spazio_triangoli_area': generateTriangoliAreaExercises,
    'grado5_spazio_cerchio': generateCerchioExercises,
    'grado5_spazio_poligoni_regolari': generatePoligoniRegolariExercises,
    'grado5_spazio_geometria_solida': generateGeometriaSolidaExercises,
    'grado5_spazio_volume': generateVolumeExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateTriangoliAreaExercises(topicId, difficulty, count);
}
