/**
 * Generatori di Esercizi per Grado 2 - Nucleo Spazio e Figure
 * Basato sul programma ministeriale italiano
 *
 * Argomenti coperti:
 * - Linee aperte, chiuse, intrecciate, rette, curve e spezzate
 * - Confine e regione (interna/esterna)
 * - Figure geometriche piane elementari
 * - Simmetria e assi di simmetria
 */

import { randomInt, randomChoice } from '../../random.js';
import { DIFFICULTY } from '../../../data/constants.js';

// ============================================================================
// GENERATORE: LINEE APERTE, CHIUSE, INTRECCIATE
// ============================================================================

/**
 * Genera esercizi sulle linee per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateLineeExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const oggettiChiusi = ['un cerchio', 'un quadrato', 'un triangolo', 'un rettangolo', 'un ovale'];
  const oggettiAperti = ['un arco', 'una linea a zig-zag che non ritorna al punto di partenza', 'una mezzaluna aperta', 'un segmento', 'una spirale non chiusa'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['aperta_o_chiusa', 'retta_curva_spezzata']);

      switch (exerciseType) {
        case 'aperta_o_chiusa': {
          const isChiusa = randomChoice([true, false]);
          const oggetto = isChiusa ? randomChoice(oggettiChiusi) : randomChoice(oggettiAperti);
          question = `Osserva ${oggetto}: la linea che lo disegna e aperta o chiusa?`;
          answer = isChiusa ? 'chiusa' : 'aperta';
          hints = ['Una linea chiusa torna al punto di partenza', 'Una linea aperta ha un inizio e una fine distinti'];
          break;
        }
        case 'retta_curva_spezzata': {
          const tipo = randomChoice(['retta', 'curva', 'spezzata']);
          const descrizioni = {
            retta: 'una linea che va sempre nella stessa direzione, senza curve ne angoli',
            curva: 'una linea che cambia direzione in modo morbido, senza angoli',
            spezzata: 'una linea formata da piu segmenti uniti da angoli'
          };
          question = `Che tipo di linea e ${descrizioni[tipo]}?`;
          answer = tipo;
          options = [
            { id: 'retta', label: 'retta', correct: tipo === 'retta' },
            { id: 'curva', label: 'curva', correct: tipo === 'curva' },
            { id: 'spezzata', label: 'spezzata', correct: tipo === 'spezzata' }
          ];
          hints = ['Pensa se la linea ha angoli, curve morbide o va sempre dritta'];
          break;
        }
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['classifica_lista', 'intrecciata']);

      switch (exerciseType) {
        case 'classifica_lista': {
          const forma = randomChoice(oggettiChiusi.concat(oggettiAperti));
          const isChiusa = oggettiChiusi.includes(forma);
          question = `Classifica la linea di ${forma}: e aperta, chiusa o intrecciata?`;
          answer = isChiusa ? 'chiusa' : 'aperta';
          hints = ['Verifica se la linea torna al punto di partenza senza incrociarsi'];
          break;
        }
        case 'intrecciata': {
          question = 'Una linea passa due volte per lo stesso punto, incrociandosi. Come si chiama questo tipo di linea?';
          answer = 'intrecciata';
          hints = ['Il nome indica che la linea si "annoda" su se stessa'];
          break;
        }
      }

    } else {
      const exerciseType = randomChoice(['confronto_multiplo', 'disegna_esempio']);

      switch (exerciseType) {
        case 'confronto_multiplo': {
          const n = randomInt(3, 5);
          question = `Elenca ${n} esempi di linee chiuse che conosci nella vita quotidiana (es. la cornice di un quadro).`;
          answer = `${n} esempi di linee chiuse (es. anello, ruota, cornice, moneta, bottone)`;
          hints = ['Pensa a oggetti che hanno un contorno che si richiude su se stesso'];
          break;
        }
        case 'disegna_esempio': {
          const tipo = randomChoice(['aperta e curva', 'chiusa e spezzata', 'aperta e spezzata', 'chiusa e curva']);
          question = `Descrivi come disegneresti una linea ${tipo}.`;
          answer = `Una linea ${tipo} rispetta entrambe le caratteristiche richieste`;
          hints = ['Ricorda le due caratteristiche insieme: apertura/chiusura e forma (retta, curva o spezzata)'];
          break;
        }
      }
    }

    const exercise = {
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: options ? 'multipla' : 'aperta',
      question: question,
      answer: { type: options ? 'multiple_choice' : 'string', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
      estimatedTime: 3,
      hints: hints || [],
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateLineeExercises',
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
// GENERATORE: CONFINE E REGIONE
// ============================================================================

/**
 * Genera esercizi su confine e regione per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateConfineExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const figure = ['un giardino recintato', 'un\'isola', 'un lago', 'una stanza', 'un campo da calcio', 'un cortile'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['definizione_confine', 'definizione_regione']);

      switch (exerciseType) {
        case 'definizione_confine':
          question = 'Come si chiama la linea che delimita una figura, separando l\'interno dall\'esterno?';
          answer = 'confine';
          hints = ['E la "cornice" della figura'];
          break;
        case 'definizione_regione':
          question = 'Come si chiama lo spazio racchiuso all\'interno del confine di una figura?';
          answer = 'regione interna';
          hints = ['E tutto cio che sta "dentro" alla figura'];
          break;
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['identifica_confine_regione', 'interno_esterno']);

      switch (exerciseType) {
        case 'identifica_confine_regione': {
          const luogo = randomChoice(figure);
          question = `Pensa a ${luogo}. Qual e il confine e qual e la regione interna?`;
          answer = `Il confine e la linea (es. recinto, riva), la regione interna e lo spazio racchiuso dentro`;
          hints = ['Il confine e la linea che delimita, la regione e lo spazio che essa racchiude'];
          break;
        }
        case 'interno_esterno': {
          const punto = randomChoice(['dentro', 'fuori']);
          question = `Un punto si trova ${punto} rispetto al confine di una figura chiusa. In quale regione si trova?`;
          answer = punto === 'dentro' ? 'regione interna' : 'regione esterna';
          hints = ['La regione interna e racchiusa dal confine, quella esterna e tutto il resto dello spazio'];
          break;
        }
      }

    } else {
      const exerciseType = randomChoice(['tre_parti', 'problema_confine']);

      switch (exerciseType) {
        case 'tre_parti':
          question = 'Una figura piana chiusa divide il piano in tre parti. Elenca e descrivi brevemente le tre parti.';
          answer = 'confine (la linea), regione interna (dentro), regione esterna (fuori)';
          hints = ['Pensa al confine come separatore tra due regioni'];
          break;
        case 'problema_confine': {
          const luogo = randomChoice(figure);
          question = `Se disegni ${luogo} su un foglio, quante regioni distinte ottieni contando anche il resto del foglio?`;
          answer = '2 regioni (interna ed esterna), separate dal confine';
          hints = ['Non dimenticare che anche lo spazio fuori dalla figura e una regione'];
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
        generator: 'generateConfineExercises',
        seed: randomInt(1000, 9999)
      }
    });
  }

  return exercises;
}

// ============================================================================
// GENERATORE: FIGURE GEOMETRICHE PIANE ELEMENTARI
// ============================================================================

/**
 * Genera esercizi sulle figure geometriche piane per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateFigurePianeExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const figureInfo = {
    quadrato: { lati: 4, angoli: 4, note: 'tutti i lati uguali e tutti gli angoli retti' },
    rettangolo: { lati: 4, angoli: 4, note: 'lati opposti uguali e tutti gli angoli retti' },
    triangolo: { lati: 3, angoli: 3, note: 'la figura con meno lati tra i poligoni' },
    cerchio: { lati: 0, angoli: 0, note: 'nessun lato ne angolo, e tondo' },
    rombo: { lati: 4, angoli: 4, note: 'tutti i lati uguali ma angoli non retti' },
    trapezio: { lati: 4, angoli: 4, note: 'solo due lati paralleli tra loro' }
  };
  const nomiFigure = Object.keys(figureInfo);

  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['conta_lati', 'riconosci_nome']);

      switch (exerciseType) {
        case 'conta_lati': {
          const figura = randomChoice(nomiFigure);
          question = `Quanti lati ha un ${figura}?`;
          answer = figureInfo[figura].lati.toString();
          hints = [`Pensa alla forma di un ${figura}`];
          break;
        }
        case 'riconosci_nome': {
          const figura = randomChoice(nomiFigure);
          const lati = figureInfo[figura].lati;
          question = `Come si chiama la figura piana con ${lati} lati uguali e tutti gli angoli retti?`;
          answer = 'quadrato';
          hints = ['Ha 4 lati tutti uguali e 4 angoli retti'];
          break;
        }
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['proprieta_figura', 'confronta_figure']);

      switch (exerciseType) {
        case 'proprieta_figura': {
          const figura = randomChoice(nomiFigure);
          question = `Descrivi una proprieta caratteristica del ${figura}.`;
          answer = figureInfo[figura].note;
          hints = [`Pensa a lati e angoli del ${figura}`];
          break;
        }
        case 'confronta_figure': {
          const f1 = randomChoice(nomiFigure);
          let f2 = randomChoice(nomiFigure);
          while (f2 === f1) f2 = randomChoice(nomiFigure);
          question = `Qual e la differenza principale tra un ${f1} e un ${f2}?`;
          answer = `${f1}: ${figureInfo[f1].note}; ${f2}: ${figureInfo[f2].note}`;
          hints = ['Confronta il numero di lati e le caratteristiche degli angoli'];
          break;
        }
      }

    } else {
      const exerciseType = randomChoice(['classificazione_multipla', 'indovinello']);

      switch (exerciseType) {
        case 'classificazione_multipla': {
          const figura = randomChoice(nomiFigure);
          const wrongOptions = nomiFigure.filter(f => f !== figura);
          const opzioni = [figura, randomChoice(wrongOptions)];
          let terzo = randomChoice(wrongOptions);
          while (opzioni.includes(terzo)) terzo = randomChoice(wrongOptions);
          opzioni.push(terzo);

          question = `Quale di queste figure ha questa proprieta: ${figureInfo[figura].note}?`;
          answer = figura;
          options = opzioni.map(f => ({ id: f, label: f, correct: f === figura }));
          hints = ['Confronta ogni figura con la proprieta descritta'];
          break;
        }
        case 'indovinello': {
          const figura = randomChoice(nomiFigure);
          question = `Indovinello: ho ${figureInfo[figura].lati} lati e ${figureInfo[figura].angoli} angoli. Sono un ${figura.includes('r') || figura.includes('t') ? '(usa il proprio nome)' : ''}. Chi sono?`;
          answer = figura;
          hints = [`Conta lati e angoli per capire di quale figura si tratta`];
          break;
        }
      }
    }

    const exercise = {
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: options ? 'multipla' : 'aperta',
      question: question,
      answer: { type: options ? 'multiple_choice' : 'string', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
      estimatedTime: 3,
      hints: hints || [],
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateFigurePianeExercises',
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
// GENERATORE: SIMMETRIA
// ============================================================================

/**
 * Genera esercizi sulla simmetria per Grado 2
 *
 * @param {string} topicId - ID dell'argomento
 * @param {string} difficulty - Livello di difficolta ('low', 'mid', 'high')
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateSimmetriaExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const exercises = [];

  const oggettiSimmetrici = ['una farfalla', 'un cuore', 'una foglia', 'il corpo umano visto di fronte', 'una stella a 5 punte', 'un quadrato'];
  const oggettiNonSimmetrici = ['un numero 7', 'una scarpa sinistra da sola', 'una nuvola qualsiasi', 'un fulmine', 'una lettera F'];

  for (let i = 0; i < count; i++) {
    let question, answer, hints, options;

    if (difficulty === DIFFICULTY.LOW) {
      const exerciseType = randomChoice(['e_simmetrico', 'definizione']);

      switch (exerciseType) {
        case 'e_simmetrico': {
          const isSim = randomChoice([true, false]);
          const oggetto = isSim ? randomChoice(oggettiSimmetrici) : randomChoice(oggettiNonSimmetrici);
          question = `${oggetto.charAt(0).toUpperCase() + oggetto.slice(1)} e una figura simmetrica?`;
          answer = isSim ? 'si' : 'no';
          hints = ['Immagina di piegare la figura a meta: se le due parti coincidono perfettamente, e simmetrica'];
          break;
        }
        case 'definizione':
          question = 'Come si chiama la linea immaginaria che divide una figura simmetrica in due parti identiche e speculari?';
          answer = 'asse di simmetria';
          hints = ['E la linea lungo la quale si potrebbe piegare la figura'];
          break;
      }

    } else if (difficulty === DIFFICULTY.MID) {
      const exerciseType = randomChoice(['conta_assi', 'trova_simmetrico']);

      switch (exerciseType) {
        case 'conta_assi': {
          const figura = randomChoice(['quadrato', 'rettangolo', 'triangolo equilatero', 'cerchio']);
          const assi = { quadrato: 4, rettangolo: 2, 'triangolo equilatero': 3, cerchio: 'infiniti' };
          question = `Quanti assi di simmetria ha un ${figura}?`;
          answer = assi[figura].toString();
          hints = [`Prova a immaginare tutte le pieghe possibili che dividono il ${figura} in due parti uguali`];
          break;
        }
        case 'trova_simmetrico': {
          const oggetto = randomChoice(oggettiSimmetrici);
          question = `Descrivi dove passerebbe l'asse di simmetria in ${oggetto}.`;
          answer = 'L\'asse passa nel mezzo, dividendo la figura in due meta speculari';
          hints = ['Cerca il punto centrale della figura'];
          break;
        }
      }

    } else {
      const exerciseType = randomChoice(['piegamento', 'crea_simmetria']);

      switch (exerciseType) {
        case 'piegamento':
          question = 'Piegando un foglio a meta e tagliando una forma lungo la piega, quale proprieta avra la figura ottenuta una volta aperta?';
          answer = 'Sara simmetrica rispetto alla piega (che diventa l\'asse di simmetria)';
          hints = ['La piega del foglio diventa l\'asse di simmetria della figura ottenuta'];
          break;
        case 'crea_simmetria': {
          const meta = randomChoice(['un triangolo', 'un semicerchio', 'una linea a zig-zag']);
          question = `Se disegni ${meta} su meta foglio e lo rifletti rispetto a una linea verticale, che figura ottieni?`;
          answer = 'Una figura simmetrica composta da entrambe le meta speculari';
          hints = ['La riflessione crea una copia speculare identica dall\'altra parte dell\'asse'];
          break;
        }
      }
    }

    const exercise = {
      id: `exercise_${topicId}_${i}_${Date.now()}`,
      topicId: topicId,
      type: options ? 'multipla' : 'aperta',
      question: question,
      answer: { type: options ? 'multiple_choice' : 'string', value: answer },
      difficulty: difficulty,
      points: difficulty === DIFFICULTY.LOW ? 2 : difficulty === DIFFICULTY.MID ? 3 : 4,
      estimatedTime: 3,
      hints: hints || [],
      solution: `La risposta corretta e: ${answer}`,
      metadata: {
        author: 'ClearMath Generator',
        createdAt: new Date().toISOString(),
        version: '1.0',
        generator: 'generateSimmetriaExercises',
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
 * Genera esercizi per il nucleo Spazio e Figure del Grado 2
 *
 * @param {string} topicId - ID specifico dell'argomento
 * @param {string} difficulty - Livello di difficolta
 * @param {number} count - Numero di esercizi da generare
 * @returns {Array} Array di esercizi generati
 */
export function generateGrade2SpazioEFigureExercises(topicId, difficulty = DIFFICULTY.LOW, count = 10) {
  const topicGenerators = {
    'grado2_spazio_linee': generateLineeExercises,
    'grado2_spazio_confine': generateConfineExercises,
    'grado2_spazio_figure_piane': generateFigurePianeExercises,
    'grado2_spazio_simmetria': generateSimmetriaExercises
  };

  const generator = topicGenerators[topicId];

  if (generator) {
    return generator(topicId, difficulty, count);
  }

  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return generateLineeExercises(topicId, difficulty, count);
}
