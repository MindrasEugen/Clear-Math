/**
 * Generatori di Esercizi per Grado 1 - Nucleo Relazioni e Funzioni
 * Basato sul programma ministeriale italiano
 * 
 * Argomenti coperti:
 * - Classificazione di oggetti
 * - Ordinamento per grandezze
 * - Connettivi logici (E, NON)
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

// ============================================================================
// GENERATORE: CLASSIFICAZIONE
// ============================================================================

/**
 * Genera esercizi di classificazione per Grado 1
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateClassificazioneExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  const colors = ['rosso', 'blu', 'verde', 'giallo', 'arancione'];
  const shapes = ['cerchio', 'quadrato', 'triangolo', 'rettangolo'];
  const sizes = ['piccolo', 'medio', 'grande'];
  const categories = ['frutta', 'animale', 'oggetto', 'colore'];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;
    
    if (difficulty === DIFFICULTY.LOW) {
      // Livello LOW: Classificazione per colore
      const color = randomChoice(colors);
      const objects = [
        { name: 'palla', color: randomChoice(colors) },
        { name: 'matita', color: randomChoice(colors) },
        { name: 'libro', color: randomChoice(colors) },
        { name: 'scatola', color: color }
      ];
      
      question = `Quali oggetti sono di colore ${color}? <br /> ${objects.map(o => o.name).join(', ')}`;
      answer = objects.filter(o => o.color === color).map(o => o.name).join(', ');
      hints = [`Guarda il colore di ogni oggetto`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      // Livello MID: Classificazione per più criteri
      const criteria = randomChoice(['colore', 'forma']);
      const value = criteria === 'colore' ? randomChoice(colors) : randomChoice(shapes);
      
      const objects = [
        { name: 'palla', color: randomChoice(colors), shape: randomChoice(shapes) },
        { name: 'cubo', color: randomChoice(colors), shape: randomChoice(shapes) },
        { name: 'cerchio', color: randomChoice(colors), shape: 'cerchio' },
        { name: 'quadrato', color: randomChoice(colors), shape: 'quadrato' }
      ];
      
      question = `Quali oggetti hanno ${criteria} ${value}? <br /> ${objects.map(o => o.name).join(', ')}`;
      answer = objects.filter(o => o[criteria] === value).map(o => o.name).join(', ') || 'nessuno';
      hints = [`Controlla il ${criteria} di ogni oggetto`];
      
    } else {
      // Livello HIGH: Classificazione per due criteri
      const color = randomChoice(colors);
      const size = randomChoice(sizes);
      
      const objects = [
        { name: 'palla rossa piccola', color: 'rosso', size: 'piccola' },
        { name: 'palla blu grande', color: 'blu', size: 'grande' },
        { name: 'cubo verde medio', color: 'verde', size: 'medio' },
        { name: 'palla rossa grande', color: 'rosso', size: 'grande' }
      ];
      
      question = `Quali oggetti sono ${color} e ${size}? <br /> ${objects.map(o => o.name).join(', ')}`;
      answer = objects.filter(o => o.color === color && o.size === size).map(o => o.name).join(', ') || 'nessuno';
      hints = [`L'oggetto deve soddisfare ENTRAMBI i criteri`];
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
      solution: `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateClassificazioneExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: ORDINAMENTO
// ============================================================================

/**
 * Genera esercizi di ordinamento per Grado 1
 */
export function generateOrdinamentoExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;
    
    if (difficulty === DIFFICULTY.LOW) {
      // Livello LOW: Ordinamento di 3 numeri
      const numbers = [];
      for (let j = 0; j < 3; j++) {
        numbers.push(randomInt(1, 10));
      }
      
      question = `Ordina questi numeri dal più piccolo al più grande: ${numbers.join(', ')}`;
      const sorted = [...numbers].sort((a, b) => a - b);
      answer = sorted.join(', ');
      hints = [`Trova il numero più piccolo, poi quello medio, poi il più grande`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      // Livello MID: Ordinamento di oggetti per lunghezza
      const objects = ['matita', 'righello', 'penna', 'libro', 'quaderno'];
      const lengths = objects.map(o => randomInt(5, 20));
      
      const paired = objects.map((obj, idx) => ({ name: obj, length: lengths[idx] }));
      const sorted = [...paired].sort((a, b) => a.length - b.length);
      
      question = `Ordina questi oggetti dal più corto al più lungo: ${paired.map(o => o.name).join(', ')}`;
      answer = sorted.map(o => o.name).join(', ');
      hints = [`Immagina la lunghezza di ogni oggetto`];
      
    } else {
      // Livello HIGH: Ordinamento decrescente con numeri più grandi
      const numbers = [];
      for (let j = 0; j < 4; j++) {
        numbers.push(randomInt(10, 50));
      }
      
      question = `Ordina questi numeri dal più grande al più piccolo: ${numbers.join(', ')}`;
      const sorted = [...numbers].sort((a, b) => b - a);
      answer = sorted.join(', ');
      hints = [`Trova il numero più grande prima`];
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
      solution: `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateOrdinamentoExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: CONNETTIVI LOGICI
// ============================================================================

/**
 * Genera esercizi di connettivi logici per Grado 1
 */
export function generateConnettiviExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  const colors = ['rosso', 'blu', 'verde', 'giallo'];
  const shapes = ['cerchio', 'quadrato', 'triangolo'];
  const properties = ['grande', 'piccolo'];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;
    
    if (difficulty === DIFFICULTY.LOW) {
      // Livello LOW: Connettivo E
      const color = randomChoice(colors);
      const shape = randomChoice(shapes);
      
      question = `Se un oggetto è ${color} E ${shape}, descrivi l'oggetto:`;
      answer = `L'oggetto è ${color} e ${shape}`;
      hints = [`Il connettivo E significa che entrambe le condizioni devono essere vere`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      // Livello MID: Connettivo NON
      const color = randomChoice(colors);
      const wrongColor = randomChoice(colors.filter(c => c !== color));
      
      question = `Se un oggetto NON è ${wrongColor}, può essere ${color}?`;
      answer = 'sì';
      hints = [`NON ${wrongColor} significa che può essere di qualsiasi altro colore`];
      
    } else {
      // Livello HIGH: Combinazione E e NON
      const color = randomChoice(colors);
      const shape = randomChoice(shapes);
      const property = randomChoice(properties);
      
      const isCorrect = randomInt(0, 1) === 1;
      const descColor = isCorrect ? color : randomChoice(colors.filter(c => c !== color));
      const descShape = isCorrect ? shape : randomChoice(shapes.filter(s => s !== shape));
      const descProp = isCorrect ? property : randomChoice(properties.filter(p => p !== property));
      
      question = `Un oggetto è ${descColor}, ${descShape} e ${descProp}. È vero che è ${color} E ${shape}?`;
      answer = isCorrect ? 'sì' : 'no';
      hints = [`Verifica se tutte e tre le descrizioni corrispondono`];
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
      solution: `La risposta corretta è: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateConnettiviExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// FUNZIONE DI ESPORTAZIONE PRINCIPALE
// ============================================================================

/**
 * Genera esercizi per il nucleo Relazioni e Funzioni del Grado 1
 * 
 * @param {string} topicId - ID specifico dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade1RelazioniEFunzioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  // Mappa argomenti -> generatori
  const topicGenerators = {
    'grado1_relazioni_classificazione': generateClassificazioneExercises,
    'grado1_relazioni_ordinamento': generateOrdinamentoExercises,
    'grado1_relazioni_connettivi': generateConnettiviExercises
  };
  
  const generator = topicGenerators[topicId];
  
  if (generator) {
    return generator(topicId, difficulty, count);
  }
  
  // Se argomento non trovato, genera esercizi generici
  console.warn(`Nessun generatore trovato per l'argomento Relazioni e Funzioni: ${topicId}`);
  return generateClassificazioneExercises(topicId, difficulty, count);
}