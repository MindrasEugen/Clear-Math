/**
 * Generatori di Esercizi per Grado 1 - Nucleo Dati e Previsioni
 * Basato sul programma ministeriale italiano
 * 
 * Argomenti coperti:
 * - Raccolta dati tramite indagini
 * - Rappresentazione dati (pittogrammi, ideogrammi)
 * - Concetti base di probabilita (certo, possibile, impossibile)
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

// ============================================================================
// GENERATORE: RACCOLTA DATI
// ============================================================================

/**
 * Genera esercizi di raccolta dati per Grado 1
 * 
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateRaccoltaDatiExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  const surveyTopics = [
    'colore preferito',
    'frutta preferita',
    'animale preferito',
    'numero di fratelli',
    'sport preferito'
  ];
  
  const colors = ['rosso', 'blu', 'verde', 'giallo', 'arancione'];
  const fruits = ['mela', ' banana', 'pera', 'arancia', 'fragola'];
  const animals = ['cane', 'gatto', 'coniglio', 'uccello', 'pesce'];
  const sports = ['calcio', 'basket', 'nuoto', 'corsa', 'pallavolo'];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;
    
    if (difficulty === DIFFICULTY.LOW) {
      // Livello LOW: Raccolta semplice
      const topic = randomChoice(surveyTopics);
      const responses = [];
      const numStudents = randomInt(3, 6);
      
      for (let j = 0; j < numStudents; j++) {
        if (topic === 'colore preferito') responses.push(randomChoice(colors));
        else if (topic === 'frutta preferita') responses.push(randomChoice(fruits));
        else if (topic === 'animale preferito') responses.push(randomChoice(animals));
        else if (topic === 'sport preferito') responses.push(randomChoice(sports));
        else responses.push(randomInt(0, 3));
      }
      
      question = `Hai chiesto a ${numStudents} bambini qual è il loro ${topic}. Le risposte sono: ${responses.join(', ')}. Quante risposte diverse hai ottenuto?`;
      const unique = [...new Set(responses)];
      answer = unique.length.toString();
      hints = [`Conta quante risposte diverse ci sono`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      // Livello MID: Frequenza di una risposta
      const topic = randomChoice(surveyTopics);
      const responses = [];
      const numStudents = randomInt(5, 10);
      const targetValue = topic === 'colore preferito' ? randomChoice(colors) :
                           topic === 'frutta preferita' ? randomChoice(fruits) :
                           topic === 'animale preferito' ? randomChoice(animals) :
                           topic === 'sport preferito' ? randomChoice(sports) : randomInt(0, 3);
      
      // Genera risposte con una certa frequenza
      for (let j = 0; j < numStudents; j++) {
        if (randomInt(0, 1) === 0) responses.push(targetValue);
        else {
          if (topic === 'colore preferito') responses.push(randomChoice(colors.filter(c => c !== targetValue)));
          else if (topic === 'frutta preferita') responses.push(randomChoice(fruits.filter(f => f !== targetValue)));
          else if (topic === 'animale preferito') responses.push(randomChoice(animals.filter(a => a !== targetValue)));
          else if (topic === 'sport preferito') responses.push(randomChoice(sports.filter(s => s !== targetValue)));
          else responses.push(randomInt(0, 3));
        }
      }
      
      question = `Hai chiesto a ${numStudents} bambini qual è il loro ${topic}. Le risposte sono: ${responses.join(', ')}. Quanti hanno risposto "${targetValue}"?`;
      const freq = responses.filter(r => r === targetValue).length;
      answer = freq.toString();
      hints = [`Conta quante volte compare "${targetValue}"`];
      
    } else {
      // Livello HIGH: Domanda di indagine
      const topic = randomChoice(surveyTopics);
      const numStudents = randomInt(8, 12);
      
      question = `Vuoi fare un'indagine su "${topic}" in una classe di ${numStudents} bambini. Che domanda puoi fare?`;
      answer = `Qual è il tuo ${topic}?`;
      hints = [`La domanda deve essere chiara e adatta ai bambini`];
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
        generator: 'generateRaccoltaDatiExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: RAPPRESENTAZIONE DATI
// ============================================================================

/**
 * Genera esercizi di rappresentazione dati per Grado 1
 */
export function generateRappresentazioneExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  const colors = ['rosso', 'blu', 'verde', 'giallo'];
  const fruits = ['mela', ' banana', 'pera', 'arancia'];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;
    
    if (difficulty === DIFFICULTY.LOW) {
      // Livello LOW: Leggere pittogramma semplice
      const fruit = randomChoice(fruits);
      const count = randomInt(2, 5);
      
      question = `Nel pittogramma ci sono ${count} simboli di ${fruit}. Quante ${fruit} sono rappresentate?`;
      answer = count.toString();
      hints = [`Ogni simbolo rappresenta una ${fruit}`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      // Livello MID: Confronto tra pittogrammi
      const fruit1 = randomChoice(fruits);
      const fruit2 = randomChoice(fruits.filter(f => f !== fruit1));
      const count1 = randomInt(2, 6);
      const count2 = randomInt(2, 6);
      
      question = `Nel pittogramma ci sono ${count1} ${fruit1} e ${count2} ${fruit2}. Ci sono più ${fruit1} o più ${fruit2}?`;
      answer = count1 > count2 ? fruit1 : count2 > count1 ? fruit2 : 'uguali';
      hints = [`Conta i simboli di ogni frutta e confrontali`];
      
    } else {
      // Livello HIGH: Creazione di pittogramma
      const data = {};
      const categories = [randomChoice(fruits), randomChoice(fruits.filter(f => f !== Object.keys(data)[0]))];
      categories.forEach(cat => {
        data[cat] = randomInt(2, 6);
      });
      
      const dataString = Object.entries(data).map(([k, v]) => `${v} ${k}`).join(', ');
      question = `Devi rappresentare questi dati con un pittogramma: ${dataString}. Descrivi come lo farebbe.`;
      answer = `Disegnerei ${Object.entries(data).map(([k, v]) => `${v} simboli di ${k}`).join(' e ')}`;
      hints = [`Ogni categoria ha bisogno di un numero di simboli proporzionale ai dati`];
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
        generator: 'generateRappresentazioneExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }
  
  return exercises;
}

// ============================================================================
// GENERATORE: PROBABILITA BASE
// ============================================================================

/**
 * Genera esercizi di probabilita base per Grado 1
 */
export function generateProbabilitaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];
  
  const certainEvents = [
    'Il sole sorge al mattino',
    'Domani sarà un nuovo giorno',
    'Se lancio un dado, uscirà un numero tra 1 e 6',
    'Se pesco una palla rossa da un sacco di sole palle rosse, sarà rossa'
  ];
  
  const possibleEvents = [
    'Domani pioverà',
    'Lancio una moneta e esce testa',
    'Domani farà bel tempo',
    'Se pesco una palla da un sacco con palle rosse e blu, può essere rossa',
    'Vincerò una partita'
  ];
  
  const impossibleEvents = [
    'Il sole non sorge domani',
    'Un cane abbaia e dice "ciao"',
    'Una palla quadrata rotola',
    'Se lancio un dado a 6 facce, esce il numero 7'
  ];
  
  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;
    
    if (difficulty === DIFFICULTY.LOW) {
      // Livello LOW: Classificazione evento
      const category = randomChoice(['certo', 'possibile', 'impossibile']);
      let event;
      
      if (category === 'certo') event = randomChoice(certainEvents);
      else if (category === 'possibile') event = randomChoice(possibleEvents);
      else event = randomChoice(impossibleEvents);
      
      question = `L'evento "${event}" è certo, possibile o impossibile?`;
      answer = category;
      hints = [`Pensa se l'evento può accadere sempre, a volte o mai`];
      
    } else if (difficulty === DIFFICULTY.MID) {
      // Livello MID: Confronto tra eventi
      const event1 = randomChoice(certainEvents);
      const event2 = randomChoice(possibleEvents);
      
      question = `Quale di questi eventi è più probabile che accada: "${event1}" o "${event2}"?`;
      answer = 'Il primo';
      hints = [`Un evento certo è sempre più probabile di un evento possibile`];
      
    } else {
      // Livello HIGH: Scenari complessi
      const event1 = randomChoice(certainEvents);
      const event2 = randomChoice(impossibleEvents);
      
      question = `Se so che "${event1}" è certo e "${event2}" è impossibile, quale dei due accadrà sicuramente?`;
      answer = 'Il primo';
      hints = [`L'evento certo accadrà sicuramente, quello impossibile non accadrà mai`];
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
        generator: 'generateProbabilitaExercises',
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
 * Genera esercizi per il nucleo Dati e Previsioni del Grado 1
 * 
 * @param {string} topicId - ID specifico dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade1DatiEPrevisoniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  // Mappa argomenti -> generatori
  const topicGenerators = {
    'grado1_dati_raccolta': generateRaccoltaDatiExercises,
    'grado1_dati_rappresentazione': generateRappresentazioneExercises,
    'grado1_dati_probabilita': generateProbabilitaExercises
  };
  
  const generator = topicGenerators[topicId];
  
  if (generator) {
    return generator(topicId, difficulty, count);
  }
  
  // Se argomento non trovato, genera esercizi generici
  console.warn(`Nessun generatore trovato per l'argomento Dati e Previsioni: ${topicId}`);
  return generateRaccoltaDatiExercises(topicId, difficulty, count);
}