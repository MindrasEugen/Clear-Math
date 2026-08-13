/**
 * Generatori di Esercizi per Grado 2 - Nucleo Relazioni e Funzioni
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Relazioni di equivalenza
 * - Relazioni di ordine
 * - Tabelle a doppia entrata
 * - Problemi aritmetici a una operazione
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

// ============================================================================
// GENERATORE: RELAZIONI DI EQUIVALENZA
// ============================================================================

/**
 * Genera esercizi sulle relazioni di equivalenza per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateEquivalenzaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const oggetti = ['mele', 'palloncini', 'matite', 'quaderni', 'caramelle', 'stelline'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['stesso_numero', 'simbolo_uguale']);

      switch (exerciseType) {
        case 'stesso_numero': {
          const n = randomInt(3, 10);
          const oggetto1 = randomChoice(oggetti);
          let oggetto2 = randomChoice(oggetti);
          while (oggetto2 === oggetto1) oggetto2 = randomChoice(oggetti);
          question = `Anna ha ${n} ${oggetto1}, Luca ha ${n} ${oggetto2}. I due insiemi sono equivalenti (hanno lo stesso numero di elementi)?`;
          answer = 'si';
          hints = ['Conta gli elementi di entrambi gli insiemi e confrontali'];
          break;
        }
        case 'simbolo_uguale': {
          const n1 = randomInt(2, 10);
          const n2 = randomChoice([n1, randomInt(2, 10)]);
          question = `Un insieme ha ${n1} elementi, un altro ne ha ${n2}. Quale simbolo usi per confrontarli: = oppure ≠?`;
          answer = n1 === n2 ? '=' : '≠';
          hints = ['Se i due numeri sono uguali, gli insiemi sono equivalenti'];
          break;
        }
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['confronta_due_insiemi', 'completa_insieme']);

      switch (exerciseType) {
        case 'confronta_due_insiemi': {
          const n1 = randomInt(4, 12);
          const n2 = randomInt(4, 12);
          const oggetto1 = randomChoice(oggetti);
          let oggetto2 = randomChoice(oggetti);
          while (oggetto2 === oggetto1) oggetto2 = randomChoice(oggetti);
          question = `Un cesto ha ${n1} ${oggetto1}, un altro ha ${n2} ${oggetto2}. Sono insiemi equivalenti?`;
          answer = n1 === n2 ? 'si, sono equivalenti' : 'no, non sono equivalenti';
          hints = [`Confronta ${n1} con ${n2}`];
          break;
        }
        case 'completa_insieme': {
          const n1 = randomInt(3, 10);
          const oggetto = randomChoice(oggetti);
          question = `Un insieme ha ${n1} ${oggetto}. Quanti elementi deve avere un secondo insieme per essere equivalente al primo?`;
          answer = n1.toString();
          hints = ['Due insiemi equivalenti hanno lo stesso numero di elementi'];
          break;
        }
      }

    } else {
      const exerciseType = randomChoice(['corrispondenza_biunivoca', 'problema_equivalenza']);

      switch (exerciseType) {
        case 'corrispondenza_biunivoca': {
          const n = randomInt(4, 8);
          question = `Se ogni bambino di una classe di ${n} alunni riceve esattamente 1 penna, e vengono usate tutte le ${n} penne disponibili, l'insieme dei bambini e equivalente all'insieme delle penne?`;
          answer = 'si, perche c\'e una corrispondenza uno a uno tra i due insiemi';
          hints = ['Se ogni elemento del primo insieme corrisponde a uno e un solo elemento del secondo, gli insiemi sono equivalenti'];
          break;
        }
        case 'problema_equivalenza': {
          const n1 = randomInt(5, 15);
          const diff = randomInt(1, 4);
          const n2 = n1 + diff;
          const oggetto1 = randomChoice(oggetti);
          let oggetto2 = randomChoice(oggetti);
          while (oggetto2 === oggetto1) oggetto2 = randomChoice(oggetti);
          question = `Marco ha ${n1} ${oggetto1}, Sara ha ${n2} ${oggetto2}. Quanti ${oggetto1} in piu deve trovare Marco per avere un insieme equivalente a quello di Sara?`;
          answer = diff.toString();
          hints = [`Calcola la differenza: ${n2} - ${n1}`];
          break;
        }
      }
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
        generator: 'generateEquivalenzaExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: RELAZIONI DI ORDINE
// ============================================================================

/**
 * Genera esercizi sulle relazioni di ordine per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateOrdineExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['confronta_due', 'simbolo_confronto']);

      switch (exerciseType) {
        case 'confronta_due': {
          const a = randomInt(1, 50);
          let b = randomInt(1, 50);
          while (b === a) b = randomInt(1, 50);
          question = `Quale numero e maggiore: ${a} o ${b}?`;
          answer = Math.max(a, b).toString();
          hints = ['Confronta prima le decine, poi le unita se necessario'];
          break;
        }
        case 'simbolo_confronto': {
          const a = randomInt(1, 60);
          const b = randomInt(1, 60);
          question = `Inserisci il simbolo corretto (>, < oppure =): ${a} ___ ${b}`;
          answer = a > b ? '>' : a < b ? '<' : '=';
          hints = ['> significa maggiore, < significa minore, = significa uguale'];
          break;
        }
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['ordina_crescente', 'ordina_decrescente']);

      switch (exerciseType) {
        case 'ordina_crescente': {
          const numeri = Array.from({ length: 4 }, () => randomInt(1, 80));
          question = `Ordina questi numeri dal piu piccolo al piu grande: ${numeri.join(', ')}`;
          answer = [...numeri].sort((x, y) => x - y).join(', ');
          hints = ['Cerca prima il numero piu piccolo, poi il successivo'];
          break;
        }
        case 'ordina_decrescente': {
          const numeri = Array.from({ length: 4 }, () => randomInt(1, 80));
          question = `Ordina questi numeri dal piu grande al piu piccolo: ${numeri.join(', ')}`;
          answer = [...numeri].sort((x, y) => y - x).join(', ');
          hints = ['Cerca prima il numero piu grande, poi il successivo'];
          break;
        }
      }

    } else {
      const exerciseType = randomChoice(['ordina_grandezze', 'catena_confronti']);

      switch (exerciseType) {
        case 'ordina_grandezze': {
          const nomi = ['Anna', 'Luca', 'Sara', 'Marco'];
          const altezze = Array.from({ length: 4 }, () => randomInt(100, 150));
          const persone = nomi.map((nome, idx) => ({ nome, altezza: altezze[idx] }));
          const descrizione = persone.map(p => `${p.nome} e alto ${p.altezza} cm`).join(', ');
          const ordinati = [...persone].sort((a, b) => a.altezza - b.altezza).map(p => p.nome);
          question = `${descrizione}. Ordina i bambini dal piu basso al piu alto.`;
          answer = ordinati.join(', ');
          hints = ['Confronta le altezze in centimetri, dalla piu piccola alla piu grande'];
          break;
        }
        case 'catena_confronti': {
          const a = randomInt(10, 30);
          const b = a + randomInt(1, 10);
          const c = b + randomInt(1, 10);
          question = `Sapendo che ${a} < ${b} e ${b} < ${c}, quale relazione c'e tra ${a} e ${c}?`;
          answer = `${a} < ${c}`;
          hints = ['Se a < b e b < c, allora a < c (proprieta transitiva)'];
          break;
        }
      }
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
        generator: 'generateOrdineExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: TABELLE A DOPPIA ENTRATA
// ============================================================================

/**
 * Genera esercizi sulle tabelle a doppia entrata per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateTabelleDoppiaEntrataExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const righe = ['rosso', 'blu', 'verde'];
  const colonne = ['piccolo', 'medio', 'grande'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const riga = randomChoice(righe);
      const colonna = randomChoice(colonne);
      const valore = randomInt(1, 9);
      question = `In una tabella a doppia entrata, la riga "${riga}" incrocia la colonna "${colonna}" nella cella con il valore ${valore}. Qual e il valore per un oggetto ${colonna} di colore ${riga}?`;
      answer = valore.toString();
      hints = ['Il valore si trova nella cella dove riga e colonna si incrociano'];

    } else if (difficulty === DIFFICULTY.MID) {
      const valori = {};
      righe.forEach(r => {
        valori[r] = {};
        colonne.forEach(c => {
          valori[r][c] = randomInt(1, 10);
        });
      });
      const tabellaTesto = righe.map(r => `${r}: ` + colonne.map(c => `${c}=${valori[r][c]}`).join(', ')).join(' | ');
      const rigaScelta = randomChoice(righe);
      const totaleRiga = colonne.reduce((sum, c) => sum + valori[rigaScelta][c], 0);
      question = `Tabella a doppia entrata (righe=colore, colonne=taglia): ${tabellaTesto}. Qual e il totale della riga "${rigaScelta}"?`;
      answer = totaleRiga.toString();
      hints = [`Somma i valori di tutte le celle della riga "${rigaScelta}"`];

    } else {
      const valori = {};
      righe.forEach(r => {
        valori[r] = {};
        colonne.forEach(c => {
          valori[r][c] = randomInt(1, 10);
        });
      });
      const tabellaTesto = righe.map(r => `${r}: ` + colonne.map(c => `${c}=${valori[r][c]}`).join(', ')).join(' | ');
      const totaleGenerale = righe.reduce((sum, r) => sum + colonne.reduce((s, c) => s + valori[r][c], 0), 0);
      question = `Tabella a doppia entrata (righe=colore, colonne=taglia): ${tabellaTesto}. Qual e il totale generale di tutta la tabella?`;
      answer = totaleGenerale.toString();
      hints = ['Somma tutti i valori di tutte le celle della tabella'];
    }

    exercises.push({
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: 'calcolo',
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
        generator: 'generateTabelleDoppiaEntrataExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: PROBLEMI ARITMETICI A UNA OPERAZIONE
// ============================================================================

/**
 * Genera problemi aritmetici a una operazione per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateProblemiExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const nomi = ['Anna', 'Luca', 'Sara', 'Marco', 'Giulia', 'Paolo'];
  const oggetti = ['figurine', 'biglie', 'caramelle', 'matite', 'palloncini'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['addizione', 'sottrazione']);
      const nome = randomChoice(nomi);
      const oggetto = randomChoice(oggetti);

      switch (exerciseType) {
        case 'addizione': {
          const a = randomInt(5, 20);
          const b = randomInt(5, 20);
          question = `${nome} ha ${a} ${oggetto}. Il suo amico gliene regala altre ${b}. Quante ${oggetto} ha adesso ${nome}?`;
          answer = (a + b).toString();
          hints = [`Somma le due quantita: ${a} + ${b}`];
          break;
        }
        case 'sottrazione': {
          const a = randomInt(15, 40);
          const b = randomInt(1, a - 1);
          question = `${nome} ha ${a} ${oggetto} e ne regala ${b} a un amico. Quante ${oggetto} gli rimangono?`;
          answer = (a - b).toString();
          hints = [`Sottrai: ${a} - ${b}`];
          break;
        }
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['moltiplicazione', 'divisione']);
      const nome = randomChoice(nomi);
      const oggetto = randomChoice(oggetti);

      switch (exerciseType) {
        case 'moltiplicazione': {
          const gruppi = randomInt(3, 8);
          const perGruppo = randomInt(2, 9);
          question = `${nome} ha ${gruppi} sacchetti con ${perGruppo} ${oggetto} ciascuno. Quante ${oggetto} ha in totale?`;
          answer = (gruppi * perGruppo).toString();
          hints = [`Moltiplica: ${gruppi} x ${perGruppo}`];
          break;
        }
        case 'divisione': {
          const perGruppo = randomInt(2, 6);
          const gruppi = randomInt(2, 8);
          const totale = perGruppo * gruppi;
          question = `${nome} ha ${totale} ${oggetto} e le vuole dividere equamente in ${gruppi} sacchetti. Quante ${oggetto} mette in ogni sacchetto?`;
          answer = perGruppo.toString();
          hints = [`Dividi: ${totale} : ${gruppi}`];
          break;
        }
      }

    } else {
      const exerciseType = randomChoice(['scegli_operazione', 'problema_con_dato_mancante']);
      const nome = randomChoice(nomi);
      const oggetto = randomChoice(oggetti);

      switch (exerciseType) {
        case 'scegli_operazione': {
          const a = randomInt(10, 50);
          const b = randomInt(2, 10);
          const opType = randomChoice(['add', 'sub', 'mul']);
          if (opType === 'add') {
            question = `${nome} aveva ${a} ${oggetto} e ne ha ricevute altre ${b}. Quale operazione usi e quante ${oggetto} ha ora?`;
            answer = `addizione: ${a} + ${b} = ${a + b}`;
          } else if (opType === 'sub') {
            const bb = Math.min(b, a - 1);
            question = `${nome} aveva ${a} ${oggetto} e ne ha perse ${bb}. Quale operazione usi e quante ${oggetto} gli restano?`;
            answer = `sottrazione: ${a} - ${bb} = ${a - bb}`;
          } else {
            question = `${nome} ha ${b} scatole con ${a % 10 || 2} ${oggetto} ciascuna. Quale operazione usi per trovare il totale?`;
            const perScatola = a % 10 || 2;
            answer = `moltiplicazione: ${b} x ${perScatola} = ${b * perScatola}`;
          }
          hints = ['Individua prima i dati e la domanda, poi scegli l\'operazione corretta'];
          break;
        }
        case 'problema_con_dato_mancante': {
          const totale = randomInt(20, 60);
          const parte1 = randomInt(5, totale - 5);
          const parte2 = totale - parte1;
          question = `${nome} aveva un certo numero di ${oggetto}. Ne ha date ${parte1} a un amico e gliene sono rimaste ${parte2}. Quante ${oggetto} aveva all'inizio?`;
          answer = totale.toString();
          hints = [`Il totale iniziale e la somma di quelle date e quelle rimaste: ${parte1} + ${parte2}`];
          break;
        }
      }
    }

    exercises.push({
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
        generator: 'generateProblemiExercises',
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
 * Genera esercizi per il nucleo Relazioni e Funzioni del Grado 2
 *
 * @param {string} topicId - ID specifico dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade2RelazioniEFunzioniExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado2_relazioni_equivalenza': generateEquivalenzaExercises,
    'grado2_relazioni_ordine': generateOrdineExercises,
    'grado2_relazioni_tabelle': generateTabelleDoppiaEntrataExercises,
    'grado2_relazioni_problemi': generateProblemiExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateEquivalenzaExercises(topicId, difficulty, count);
}
