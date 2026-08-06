/**
 * Validatori di Risposte per Grado 1
 * Esportazione unificata di tutti i validatori per il primo grado scolastico
 */

export * from './numeriValidator.js';

/**
 * Validatore unificato per tutti gli argomenti del Grado 1
 * 
 * @param {any} userAnswer - Risposta dell'utente
 * @param {Object} exercise - Oggetto esercizio
 * @returns {Object} Risultato della validazione
 */
export function validateGrade1Answer(userAnswer, exercise) {
  // Estrai il nucleo dall'ID del topic
  const topicParts = (exercise.topicId || '').split('_');
  
  if (topicParts.length >= 2) {
    const nucleo = topicParts[1];
    
    // Validatori per nucleo
    const nucleusValidators = {
      'numeri': validateGrade1NumeriAnswer,
      'spazio_e_figure': null, // TODO: implementare
      'relazioni_e_funzioni': null, // TODO: implementare
      'dati_e_previsioni': null // TODO: implementare
    };
    
    const validator = nucleusValidators[nucleo];
    
    if (validator) {
      return validator(userAnswer, exercise);
    }
  }
  
  // Usa il validatore per numeri come default
  return validateGrade1NumeriAnswer(userAnswer, exercise);
}

/**
 * Valida una sessione di esercizi
 * 
 * @param {Array} exercises - Array di esercizi
 * @param {Array} userAnswers - Array di risposte utente
 * @returns {Object} Risultato complessivo della sessione
 */
export function validateExerciseSession(exercises, userAnswers) {
  let totalScore = 0;
  let maxScore = 0;
  let correctCount = 0;
  const results = [];
  
  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];
    const userAnswer = userAnswers[i];
    
    maxScore += exercise.points || 1;
    
    const validationResult = validateGrade1Answer(userAnswer, exercise);
    results.push(validationResult);
    
    totalScore += validationResult.score;
    if (validationResult.isCorrect) {
      correctCount++;
    }
  }
  
  const percentage = Math.round((totalScore / maxScore) * 100);
  const passed = percentage >= 60; // Soglia di superamento al 60%
  
  return {
    sessionId: `validation_${Date.now()}`,
    totalScore: totalScore,
    maxScore: maxScore,
    percentage: percentage,
    correctCount: correctCount,
    totalCount: exercises.length,
    passed: passed,
    results: results,
    createdAt: new Date().toISOString(),
    feedback: getSessionFeedback(percentage, correctCount, exercises.length)
  };
}

/**
 * Genera feedback basato sul risultato della sessione
 */
function getSessionFeedback(percentage, correctCount, totalCount) {
  if (percentage >= 90) {
    return `Ottimo lavoro! Hai risposto correttamente a ${correctCount} su ${totalCount} esercizi. Continua così!`;
  } else if (percentage >= 75) {
    return `Buon lavoro! Hai risposto correttamente a ${correctCount} su ${totalCount} esercizi. Puoi migliorare ancora.`;
  } else if (percentage >= 60) {
    return `Hai superato la sessione con ${correctCount} risposte corrette su ${totalCount}. Prova a rivedere gli errori.`;
  } else if (percentage >= 40) {
    return `Hai risposto correttamente a ${correctCount} su ${totalCount} esercizi. Ripassa gli argomenti e riprova.`;
  } else {
    return `Hai bisogno di più pratica. Hai risposto correttamente solo a ${correctCount} su ${totalCount} esercizi.`;
  }
}

export default {
  validateGrade1Answer,
  validateExerciseSession
};
