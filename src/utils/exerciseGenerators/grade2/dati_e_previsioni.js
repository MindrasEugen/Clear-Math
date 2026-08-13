/**
 * Generatori di Esercizi per Grado 2 - Nucleo Dati e Previsioni
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Tabelle di frequenza
 * - Istogrammi e aerogrammi semplici
 * - Probabilita semplice (probabile/poco probabile)
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

// ============================================================================
// GENERATORE: TABELLE DI FREQUENZA
// ============================================================================

/**
 * Genera esercizi sulle tabelle di frequenza per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateTabelleFrequenzaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const categorie = ['gatto', 'cane', 'coniglio', 'pesce', 'uccellino'];
  const coloriPreferiti = ['rosso', 'blu', 'verde', 'giallo'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const cat = randomChoice(categorie);
      const freq = randomInt(3, 15);
      question = `In un'indagine di classe, ${freq} bambini hanno indicato "${cat}" come animale preferito. Qual e la frequenza di questa risposta?`;
      answer = freq.toString();
      hints = ['La frequenza e il numero di volte che una risposta e stata data'];

    } else if (difficulty === DIFFICULTY.MID) {
      const scelte = coloriPreferiti.slice(0, 3);
      const frequenze = scelte.map(() => randomInt(2, 12));
      const tabellaTesto = scelte.map((c, idx) => `${c}: ${frequenze[idx]}`).join(', ');
      const totale = frequenze.reduce((a, b) => a + b, 0);
      question = `Tabella di frequenza dei colori preferiti: ${tabellaTesto}. Quanti bambini in totale sono stati intervistati?`;
      answer = totale.toString();
      hints = ['Somma tutte le frequenze della tabella'];

    } else {
      const scelte = coloriPreferiti;
      const frequenze = scelte.map(() => randomInt(2, 15));
      const tabellaTesto = scelte.map((c, idx) => `${c}: ${frequenze[idx]}`).join(', ');
      const maxFreq = Math.max(...frequenze);
      const coloreMax = scelte[frequenze.indexOf(maxFreq)];
      question = `Tabella di frequenza: ${tabellaTesto}. Quale colore e stato scelto piu frequentemente?`;
      answer = coloreMax;
      hints = ['Cerca il valore piu alto nella tabella e il colore corrispondente'];
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
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateTabelleFrequenzaExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: ISTOGRAMMI E AEROGRAMMI SEMPLICI
// ============================================================================

/**
 * Genera esercizi su istogrammi e aerogrammi per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateIstogrammiExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const frutti = ['mele', 'banane', 'arance', 'pere'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const frutto = randomChoice(frutti);
      const altezzaBarra = randomInt(2, 10);
      question = `In un istogramma, la barra che rappresenta "${frutto}" e alta ${altezzaBarra} quadretti, dove ogni quadretto vale 1 unita. Quante ${frutto} rappresenta la barra?`;
      answer = altezzaBarra.toString();
      hints = ['L\'altezza della barra corrisponde al valore rappresentato'];

    } else if (difficulty === DIFFICULTY.MID) {
      const valori = frutti.map(() => randomInt(2, 10));
      const tabellaTesto = frutti.map((f, idx) => `${f}: ${valori[idx]}`).join(', ');
      const differenza = Math.abs(valori[0] - valori[1]);
      question = `Istogramma della frutta preferita: ${tabellaTesto}. Quante barre in piu ha "${frutti[0]}" rispetto a "${frutti[1]}" (in valore assoluto)?`;
      answer = differenza.toString();
      hints = [`Calcola la differenza tra ${valori[0]} e ${valori[1]}`];

    } else {
      const valori = frutti.map(() => randomInt(2, 12));
      const tabellaTesto = frutti.map((f, idx) => `${f}: ${valori[idx]}`).join(', ');
      const totale = valori.reduce((a, b) => a + b, 0);
      const percentualeApprox = Math.round((Math.max(...valori) / totale) * 100);
      question = `Istogramma della frutta preferita (totale ${totale} bambini): ${tabellaTesto}. Circa che percentuale del totale rappresenta il frutto piu scelto?`;
      answer = `circa ${percentualeApprox}%`;
      hints = ['Dividi il valore massimo per il totale e moltiplica per 100'];
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
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateIstogrammiExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PROBABILITA SEMPLICE
// ============================================================================

/**
 * Genera esercizi di probabilita semplice per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateProbabilitaSempliceExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const eventi = [
    { testo: 'domani sorgera il sole', livello: 'certo' },
    { testo: 'lanciando una moneta esce testa', livello: 'possibile' },
    { testo: 'un gatto vola come un uccello', livello: 'impossibile' },
    { testo: 'domani piovera in una giornata nuvolosa', livello: 'possibile' },
    { testo: 'un dado a sei facce mostra un numero da 1 a 6', livello: 'certo' },
    { testo: 'un pesce cammina sulla terra senza aiuto', livello: 'impossibile' }
  ];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const evento = randomChoice(eventi);
      question = `L'evento "${evento.testo}" e certo, possibile o impossibile?`;
      answer = evento.livello;
      hints = ['Certo = accade sempre, possibile = puo accadere, impossibile = non puo accadere mai'];

    } else if (difficulty === DIFFICULTY.MID) {
      const palline = { rosse: randomInt(2, 6), blu: randomInt(2, 6) };
      const totale = palline.rosse + palline.blu;
      const piuProbabile = palline.rosse > palline.blu ? 'rossa' : palline.rosse < palline.blu ? 'blu' : 'ugualmente probabili';
      question = `In un sacchetto ci sono ${palline.rosse} palline rosse e ${palline.blu} palline blu. Estraendo una pallina a caso, e piu probabile che sia rossa o blu?`;
      answer = piuProbabile;
      hints = ['E piu probabile il colore con piu palline nel sacchetto'];

    } else {
      const favorevoli = randomInt(1, 4);
      const totale = randomInt(favorevoli + 2, favorevoli + 8);
      question = `In un sacchetto ci sono ${totale} palline in totale, di cui ${favorevoli} sono verdi. Esprimi la probabilita di estrarre una pallina verde come frazione (casi favorevoli su casi possibili).`;
      answer = `${favorevoli}/${totale}`;
      hints = ['La probabilita e il rapporto tra i casi favorevoli e i casi possibili'];
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
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateProbabilitaSempliceExercises',
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
 * Genera esercizi per il nucleo Dati e Previsioni del Grado 2
 *
 * @param {string} topicId - ID specifico dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade2DatiEPrevisoniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado2_dati_tabelle_frequenza': generateTabelleFrequenzaExercises,
    'grado2_dati_istogrammi': generateIstogrammiExercises,
    'grado2_dati_probabilita_semplice': generateProbabilitaSempliceExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateTabelleFrequenzaExercises(topicId, difficulty, count);
}
