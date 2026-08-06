/**
 * Validatori di Risposte per Grado 1 - Nucleo Numeri
 * Funzioni per validare le risposte agli esercizi generati
 */

import { DIFFICULTY } from '../../../data/constants.js';

// ============================================================================
// VALIDATORE BASE
// ============================================================================

/**
 * Validatore base per risposte
 * 
 * @param {any} userAnswer - Risposta dell'utente
 * @param {any} correctAnswer - Risposta corretta
 * @param {Object} exercise - Esercizio completo
 * @returns {Object} Risultato della validazione
 */
export function validateAnswer(userAnswer, correctAnswer, exercise) {
  const result = {
    isCorrect: false,
    score: 0,
    message: '',
    correctedAnswer: correctAnswer.value,
    partialCredit: 0
  };

  // Se non ci sono dati, segna come sbagliato
  if (userAnswer === null || userAnswer === undefined || userAnswer === '') {
    result.message = 'Devi fornire una risposta';
    return result;
  }

  // Converte la risposta utente in stringa per confronto
  const userAnswerStr = String(userAnswer).toLowerCase().trim();
  const correctAnswerStr = String(correctAnswer.value).toLowerCase().trim();

  // Validazione in base al tipo di risposta
  switch (correctAnswer.type) {
    case 'string':
      return validateStringAnswer(userAnswerStr, correctAnswerStr, exercise);
      
    case 'number':
      return validateNumberAnswer(userAnswer, correctAnswer.value, exercise);
      
    case 'boolean':
      return validateBooleanAnswer(userAnswer, correctAnswer.value, exercise);
      
    case 'multiple_choice':
      return validateMultipleChoiceAnswer(userAnswer, correctAnswer.value, exercise);
      
    case 'array':
      return validateArrayAnswer(userAnswer, correctAnswer.value, exercise);
      
    default:
      // Confronto diretto
      result.isCorrect = userAnswerStr === correctAnswerStr;
      result.score = result.isCorrect ? (exercise.points || 1) : 0;
      result.message = result.isCorrect ? 'Risposta corretta!' : 'Risposta sbagliata';
      return result;
  }
}

// ============================================================================
// VALIDATORI SPECIFICI PER TIPO
// ============================================================================

/**
 * Validatore per risposte testuali
 */
function validateStringAnswer(userAnswer, correctAnswer, exercise) {
  const result = {
    isCorrect: false,
    score: 0,
    message: '',
    correctedAnswer: correctAnswer
  };

  // Normalizzazione per confronto
  const normalizedUser = normalizeString(userAnswer);
  const normalizedCorrect = normalizeString(correctAnswer);

  // Confronto esatto
  if (normalizedUser === normalizedCorrect) {
    result.isCorrect = true;
    result.score = exercise.points || 1;
    result.message = 'Risposta corretta!';
    return result;
  }

  // Confronto parziale per sequenze numeriche
  if (normalizedUser.includes(normalizedCorrect) || normalizedCorrect.includes(normalizedUser)) {
    result.isCorrect = false; // Non esattamente corretto
    result.partialCredit = 0.5;
    result.score = Math.floor((exercise.points || 1) * 0.5);
    result.message = 'Quasi corretto, controlla la formattazione';
    return result;
  }

  result.message = 'Risposta sbagliata';
  return result;
}

/**
 * Validatore per risposte numeriche
 */
function validateNumberAnswer(userAnswer, correctAnswer, exercise) {
  const result = {
    isCorrect: false,
    score: 0,
    message: '',
    correctedAnswer: correctAnswer
  };

  // Prova a convertire in numero
  const userNumber = parseFloat(userAnswer);
  const correctNumber = parseFloat(correctAnswer);

  if (isNaN(userNumber) || isNaN(correctNumber)) {
    result.message = 'Inserisci un numero valido';
    return result;
  }

  // Confronto esatto
  if (userNumber === correctNumber) {
    result.isCorrect = true;
    result.score = exercise.points || 1;
    result.message = 'Risposta corretta!';
    return result;
  }

  // Controlla se la differenza è minima (tolleranza per errori di calcolo)
  const tolerance = exercise.tolerance || 0.5;
  if (Math.abs(userNumber - correctNumber) <= tolerance) {
    result.isCorrect = true;
    result.score = exercise.points || 1;
    result.message = 'Risposta corretta (con tolleranza)';
    return result;
  }

  result.message = 'Risposta sbagliata';
  return result;
}

/**
 * Validatore per risposte booleane (vero/falso)
 */
function validateBooleanAnswer(userAnswer, correctAnswer, exercise) {
  const result = {
    isCorrect: false,
    score: 0,
    message: '',
    correctedAnswer: correctAnswer
  };

  // Normalizza le risposte
  const userBool = normalizeBoolean(userAnswer);
  const correctBool = normalizeBoolean(correctAnswer);

  if (userBool === correctBool) {
    result.isCorrect = true;
    result.score = exercise.points || 1;
    result.message = 'Risposta corretta!';
    return result;
  }

  result.message = 'Risposta sbagliata';
  return result;
}

/**
 * Validatore per scelta multipla
 */
function validateMultipleChoiceAnswer(userAnswer, correctAnswer, exercise) {
  const result = {
    isCorrect: false,
    score: 0,
    message: '',
    correctedAnswer: correctAnswer
  };

  // Se l'esercizio ha opzioni, controlla l'ID corretto
  if (exercise.options && exercise.options.length > 0) {
    const correctOption = exercise.options.find(opt => opt.correct);
    if (correctOption) {
      result.isCorrect = userAnswer === correctOption.id;
      result.score = result.isCorrect ? (exercise.points || 1) : 0;
      result.message = result.isCorrect ? 'Risposta corretta!' : 'Risposta sbagliata';
      return result;
    }
  }

  // Confronto diretto
  result.isCorrect = userAnswer === correctAnswer;
  result.score = result.isCorrect ? (exercise.points || 1) : 0;
  result.message = result.isCorrect ? 'Risposta corretta!' : 'Risposta sbagliata';
  return result;
}

/**
 * Validatore per risposte array
 */
function validateArrayAnswer(userAnswer, correctAnswer, exercise) {
  const result = {
    isCorrect: false,
    score: 0,
    message: '',
    correctedAnswer: correctAnswer
  };

  // Se userAnswer non è un array, prova a splitterlo
  let userArray = Array.isArray(userAnswer) ? userAnswer : String(userAnswer).split(',');
  let correctArray = Array.isArray(correctAnswer) ? correctAnswer : String(correctAnswer).split(',');

  // Normalizzazione
  userArray = userArray.map(item => normalizeString(item));
  correctArray = correctArray.map(item => normalizeString(item));

  // Controlla se gli array sono uguali (ignorando l'ordine per alcuni casi)
  const areEqual = arraysEqual(userArray, correctArray);
  
  if (areEqual) {
    result.isCorrect = true;
    result.score = exercise.points || 1;
    result.message = 'Risposta corretta!';
    return result;
  }

  // Calcola il punteggio parziale in base agli elementi corretti
  const correctItems = userArray.filter(item => correctArray.includes(item));
  result.partialCredit = correctItems.length / Math.max(userArray.length, correctArray.length);
  result.score = Math.floor((exercise.points || 1) * result.partialCredit);
  result.message = `Hai indovinato ${correctItems.length} su ${correctArray.length}`;
  
  return result;
}

// ============================================================================
// VALIDATORI SPECIFICI PER TIPO DI ESERCIZIO (Grado 1 - Numeri)
// ============================================================================

/**
 * Validatore specifico per esercizi di conteggio
 */
export function validateConteggioAnswer(userAnswer, exercise) {
  const correctAnswer = exercise.answer.value;
  
  // Per il conteggio, accettiamo anche sequenze parzialmente corrette
  if (exercise.type === 'aperta' && exercise.question.includes('Conta')) {
    const result = {
      isCorrect: false,
      score: 0,
      message: '',
      correctedAnswer: correctAnswer
    };

    // Normalizza le risposte
    const userAnswerNormalized = normalizeString(userAnswer);
    const correctAnswerNormalized = normalizeString(correctAnswer);

    // Se è una sequenza di numeri
    if (correctAnswerNormalized.includes(',')) {
      const correctNumbers = correctAnswerNormalized.split(',').map(n => parseInt(n.trim()) || 0);
      const userNumbers = userAnswerNormalized.split(',').map(n => parseInt(n.trim()) || 0);
      
      // Controlla se la sequenza dell'utente corrisponde
      let correctCount = 0;
      for (let i = 0; i < Math.min(userNumbers.length, correctNumbers.length); i++) {
        if (userNumbers[i] === correctNumbers[i]) {
          correctCount++;
        }
      }
      
      // Se tutti i numeri sono corretti
      if (correctCount === correctNumbers.length && userNumbers.length === correctNumbers.length) {
        result.isCorrect = true;
        result.score = exercise.points || 1;
        result.message = 'Sequenza corretta!';
        return result;
      }
      
      // Punteggio parziale
      result.partialCredit = correctCount / correctNumbers.length;
      result.score = Math.floor((exercise.points || 1) * result.partialCredit);
      result.message = `Hai indovinato ${correctCount} numeri su ${correctNumbers.length}`;
      return result;
    }
  }

  // Usa il validatore base
  return validateAnswer(userAnswer, exercise.answer, exercise);
}

/**
 * Validatore specifico per esercizi di confronto
 */
export function validateConfrontoAnswer(userAnswer, exercise) {
  const result = {
    isCorrect: false,
    score: 0,
    message: '',
    correctedAnswer: exercise.answer.value
  };

  // Per i simboli >, <, =
  if (exercise.type === 'multipla' && exercise.question.includes('⬜')) {
    const correctSymbol = exercise.answer.value;
    const userSymbol = String(userAnswer).trim();
    
    if (userSymbol === correctSymbol) {
      result.isCorrect = true;
      result.score = exercise.points || 1;
      result.message = 'Simbolo corretto!';
      return result;
    }
    
    result.message = 'Simbolo sbagliato';
    return result;
  }

  // Per risposte testuali di confronto
  return validateAnswer(userAnswer, exercise.answer, exercise);
}

/**
 * Validatore specifico per addizione e sottrazione
 */
export function validateOperazioneAnswer(userAnswer, exercise) {
  const result = {
    isCorrect: false,
    score: 0,
    message: '',
    correctedAnswer: exercise.answer.value
  };

  // Prova a calcolare
  const userNumber = parseFloat(userAnswer);
  const correctNumber = parseFloat(exercise.answer.value);

  if (isNaN(userNumber) || isNaN(correctNumber)) {
    result.message = 'Inserisci un numero valido';
    return result;
  }

  if (userNumber === correctNumber) {
    result.isCorrect = true;
    result.score = exercise.points || 1;
    result.message = 'Risposta corretta!';
    return result;
  }

  // Risposta sbagliata
  result.message = `Risposta sbagliata. ${userNumber} ≠ ${correctNumber}`;
  return result;
}

/**
 * Validatore specifico per valore posizionale
 */
export function validateValorePosizionaleAnswer(userAnswer, exercise) {
  const result = {
    isCorrect: false,
    score: 0,
    message: '',
    correctedAnswer: exercise.answer.value
  };

  // Se la risposta deve essere in formato "X, Y" (decine, unità)
  if (exercise.question.includes('decine') && exercise.question.includes('unità')) {
    const userAnswerNormalized = normalizeString(userAnswer);
    const correctAnswerNormalized = normalizeString(exercise.answer.value);

    // Accetta anche con "e" invece di ","
    const correctParts = correctAnswerNormalized.replace(/e/g, ',').split(',').map(p => p.trim());
    const userParts = userAnswerNormalized.replace(/e/g, ',').split(',').map(p => p.trim());

    if (userParts.length === 2 && correctParts.length === 2) {
      const userTens = parseInt(userParts[0]);
      const userUnits = parseInt(userParts[1]);
      const correctTens = parseInt(correctParts[0]);
      const correctUnits = parseInt(correctParts[1]);

      if (userTens === correctTens && userUnits === correctUnits) {
        result.isCorrect = true;
        result.score = exercise.points || 1;
        result.message = 'Scomposizione corretta!';
        return result;
      }
    }
  }

  // Usa il validatore base
  return validateAnswer(userAnswer, exercise.answer, exercise);
}

// ============================================================================
// VALIDATORE UNIFICATO PER GRADO 1 - NUMERI
// ============================================================================

/**
 * Validatore unificato per tutti gli esercizi del nucleo Numeri del Grado 1
 * 
 * @param {any} userAnswer - Risposta dell'utente
 * @param {Object} exercise - Oggetto esercizio
 * @returns {Object} Risultato della validazione
 */
export function validateGrade1NumeriAnswer(userAnswer, exercise) {
  // Estrai il topicId dall'esercizio
  const topicId = exercise.topicId || '';
  
  // Validatori specifici per argomento
  const topicValidators = {
    'grado1_numeri_conteggio': validateConteggioAnswer,
    'grado1_numeri_quantita': validateAnswer,
    'grado1_numeri_confronto': validateConfrontoAnswer,
    'grado1_numeri_addizione': validateOperazioneAnswer,
    'grado1_numeri_sottrazione': validateOperazioneAnswer,
    'grado1_numeri_valore_posizionale': validateValorePosizionaleAnswer,
    'grado1_numeri_calcolo_mentale': validateOperazioneAnswer
  };
  
  const validator = topicValidators[topicId];
  
  if (validator) {
    return validator(userAnswer, exercise);
  }
  
  // Usa il validatore base
  return validateAnswer(userAnswer, exercise.answer, exercise);
}

// ============================================================================
// FUNZIONI DI SUPPORTO
// ============================================================================

/**
 * Normalizza una stringa per confronto
 */
function normalizeString(str) {
  if (str === null || str === undefined) return '';
  return String(str).toLowerCase().trim();
}

/**
 * Normalizza una risposta booleana
 */
function normalizeBoolean(value) {
  if (value === true || value === 'true' || value === 'vero' || value === 'si' || value === '1') {
    return true;
  }
  if (value === false || value === 'false' || value === 'falso' || value === 'no' || value === '0') {
    return false;
  }
  return Boolean(value);
}

/**
 * Confronta due array (ignorando l'ordine se necessario)
 */
function arraysEqual(arr1, arr2, ordered = true) {
  if (arr1.length !== arr2.length) return false;
  
  if (ordered) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  } else {
    // Confronta senza ordine
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    return arraysEqual(sorted1, sorted2, true);
  }
}

// Esportazione di tutte le funzioni
export {
  validateAnswer,
  validateStringAnswer,
  validateNumberAnswer,
  validateBooleanAnswer,
  validateMultipleChoiceAnswer,
  validateArrayAnswer,
  validateConteggioAnswer,
  validateConfrontoAnswer,
  validateOperazioneAnswer,
  validateValorePosizionaleAnswer,
  normalizeString,
  normalizeBoolean,
  arraysEqual
};

export default validateGrade1NumeriAnswer;
