/**
 * Generatori di Esercizi per Grado 1 - Nucleo Spazio e Figure
 * Basato sul programma ministeriale italiano
 * 
 * Argomenti coperti:
 * - Orientamento nello spazio (sopra/sotto, destra/sinistra, dentro/fuori)
 * - Posizioni e percorsi su reticolati
 * - Forme geometriche semplici (cerchio, quadrato, rettangolo, triangolo)
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

// ============================================================================
// GENERATORE: ORIENTAMENTO NELLO SPAZIO
// ============================================================================

/**
 * Genera esercizi di orientamento spaziale per Grado 1
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateOrientamentoExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  const relations = [
    { pair: ['sopra', 'sotto'], symbol: '↕' },
    { pair: ['destra', 'sinistra'], symbol: '↔' },
    { pair: ['dentro', 'fuori'], symbol: '⊚' },
    { pair: ['davanti', 'dietro'], symbol: '↦' }
  ];
  
  const objects = ['palla', 'libro', 'matita', 'scatola', 'bambino', 'cane', 'sedia', 'tavolo'];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, solution;
    
    if (difficulty === DIFFICULTY.LOW) {
      // Livello LOW: Identificazione singola
      const rel = randomChoice(relations);
      const obj1 = randomChoice(objects);
      const obj2 = randomChoice(objects.filter(o => o !== obj1));
      
      question = `Dove si trova la ${obj1} rispetto alla ${obj2}? <br /> La ${obj1} è <b>___</b> la ${obj2}.`;
      const position = randomChoice(rel.pair);
      answer = position;
      hints = [`Pensa alle posizioni relative: ${rel.pair.join(' o ')}`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      // Livello MID: Descrizione di scene
      const rel = randomChoice(relations);
      const obj = randomChoice(objects);
      const positions = rel.pair;
      const position = randomChoice(positions);
      
      question = `Se la ${obj} è ${position} il tavolo, dove si trova rispetto al tavolo?`;
      answer = position;
      hints = [`La posizione relativa è ${positions.join(' o ')}`];
      
    } else {
      // Livello HIGH: Relazioni multiple
      const rel1 = randomChoice(relations);
      const rel2 = randomChoice(relations.filter(r => r !== rel1));
      const obj1 = randomChoice(objects);
      const obj2 = randomChoice(objects.filter(o => o !== obj1));
      const obj3 = randomChoice(objects.filter(o => o !== obj1 && o !== obj2));
      
      question = `La ${obj1} è ${randomChoice(rel1.pair)} la ${obj2}. La ${obj2} è ${randomChoice(rel2.pair)} la ${obj3}. Dove si trova la ${obj1} rispetto alla ${obj3}?`;
      // Questo è più complesso, semplifichiamo
      answer = randomChoice([...rel1.pair, ...rel2.pair]);
      hints = [`Analizza ogni relazione separatamente`];
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
        generator: 'generateOrientamentoExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: POSIZIONI E PERCORSI
// ============================================================================

/**
 * Genera esercizi di posizioni e percorsi per Grado 1
 */
export function generatePosizioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, solution;
    
    if (difficulty === DIFFICULTY.LOW) {
      // Livello LOW: Posizione singola su griglia
      const rows = randomInt(3, 5);
      const cols = randomInt(3, 5);
      const row = randomInt(1, rows);
      const col = randomInt(1, cols);
      
      question = `Su una griglia ${rows}x${cols}, in quale posizione si trova l'oggetto in riga ${row}, colonna ${col}?`;
      answer = `Riga ${row}, Colonna ${col}`;
      hints = [`Conta le righe dall'alto e le colonne da sinistra`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      // Livello MID: Percorso semplice
      const directions = ['su', 'giu', 'destra', 'sinistra'];
      const steps = randomInt(3, 5);
      const path = [];
      for (let j = 0; j < steps; j++) {
        path.push(randomChoice(directions));
      }
      
      question = `Segui questo percorso: ${path.join(' → ')}. Descrivi la posizione finale rispetto al punto di partenza.`;
      answer = `Dopo ${steps} passi: ${path.join(', ')}`;
      hints = [`Segui ogni passo nell'ordine`];
      
    } else {
      // Livello HIGH: Percorso con ostacoli
      const size = randomInt(4, 6);
      const startRow = randomInt(1, size);
      const startCol = randomInt(1, size);
      const endRow = randomInt(1, size);
      const endCol = randomInt(1, size);
      
      question = `In una griglia ${size}x${size}, trovi l'oggetto in (${startRow},${startCol}) e vuoi raggiungere (${endRow},${endCol}). Quale percorso devi fare?`;
      const rowDiff = endRow - startRow;
      const colDiff = endCol - startCol;
      const vertical = rowDiff > 0 ? 'giu'.repeat(Math.abs(rowDiff)) : 'su'.repeat(Math.abs(rowDiff));
      const horizontal = colDiff > 0 ? 'destra'.repeat(Math.abs(colDiff)) : 'sinistra'.repeat(Math.abs(colDiff));
      answer = `${vertical && vertical + ' '}${horizontal}`.trim() || 'nessun movimento';
      hints = [`Calcola la differenza tra le coordinate`];
    }
    
    exercises.push({
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: 'aperta',
      question: question,
      answer: { type: 'string', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
      estimatedTime: 3,
      hints: hints || [],
      solution: solution || `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generatePosizioniExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: FORME GEOMETRICHE SEMPLICI
// ============================================================================

/**
 * Genera esercizi di riconoscimento forme geometriche per Grado 1
 */
export function generateFormeExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  const shapes = [
    { id: 'cerchio', name: 'cerchio', sides: 0, description: 'Rotondo, senza angoli' },
    { id: 'quadrato', name: 'quadrato', sides: 4, description: '4 lati uguali, 4 angoli retti' },
    { id: 'rettangolo', name: 'rettangolo', sides: 4, description: '4 lati, 4 angoli retti, lati opposti uguali' },
    { id: 'triangolo', name: 'triangolo', sides: 3, description: '3 lati, 3 angoli' }
  ];
  
  const colors = ['rosso', 'blu', 'verde', 'giallo', 'arancione', 'viola'];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;
    
    if (difficulty === DIFFICULTY.LOW) {
      // Livello LOW: Riconoscimento singola forma
      const shape = randomChoice(shapes);
      
      question = `Quale forma è questa? <br /> <b>${shape.description}</b>`;
      answer = shape.name;
      hints = [`Pensa alle forme geometriche di base`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      // Livello MID: Scelta multipla con descrizione
      const shape = randomChoice(shapes);
      const allShapes = [...shapes];
      
      question = `Quale forma ha ${shape.sides} lati?`;
      answer = shape.name;
      
      options = allShapes.map(s => ({
        id: s.id,
        label: s.name,
        correct: s.id === shape.id
      }));
      hints = [`Conta i lati di ogni forma`];
      
    } else {
      // Livello HIGH: Classificazione
      const shape = randomChoice(shapes);
      const color = randomChoice(colors);
      
      question = `Hai una forma ${color} con ${shape.sides} lati. Che forma è?`;
      answer = shape.name;
      hints = [`Il colore non è rilevante, conta i lati`];
    }
    
    const exercise = {
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: options ? 'multipla' : 'aperta',
      question: question,
      answer: { 
        type: options ? 'multiple_choice' : 'string', 
        value: answer 
      },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 1 : difficulty === DIFFICULTY.MID ? 2 : 3,
      estimatedTime: 2,
      hints: hints || [],
      solution: `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateFormeExercises',
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
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

/**
 * Genera esercizi per il nucleo Spazio e Figure del Grado 1
 * 
 * @param {string} topicId - ID specifico dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade1SpazioEFigureExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  // Mappa argomenti -> generatori
  const topicGenerators = {
    'grado1_spazio_orientamento': generateOrientamentoExercises,
    'grado1_spazio_posizioni': generatePosizioniExercises,
    'grado1_spazio_forme': generateFormeExercises
  };
  
  const generator = topicGenerators[topicId];
  
  if (generator) {
    return generator(topicId, difficulty, count);
  }
  
  // Se argomento non trovato, genera esercizi generici
  console.warn(`Nessun generatore trovato per l'argomento Spazio e Figure: ${topicId}`);
  return generateOrientamentoExercises(topicId, difficulty, count);
}