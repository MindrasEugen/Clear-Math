/**
 * Curriculum Completo - Clear-Math
 * Esportazione unificata di tutti i curriculum per i gradi 1-5 della Scuola Primaria
 * Basato sulle Indicazioni Nazionali MIM e Quadri INVALSI
 */

// Grado 1
export * from './grade1/index.js';

// Grado 2
export * from './grade2/index.js';

// Grado 3
export * from './grade3/index.js';

// Grado 4
export * from './grade4/index.js';

// Grado 5
export * from './grade5/index.js';

/**
 * Mappa di tutti i gradi disponibili
 */
export const allGrades = {
  1: {
    info: grade1Info,
    topics: grade1Topics,
    curriculum: grade1Curriculum,
    stats: grade1Stats
  },
  2: {
    info: grade2Info,
    topics: grade2Topics,
    curriculum: grade2Curriculum,
    stats: grade2Stats
  },
  3: {
    info: grade3Info,
    topics: grade3Topics,
    curriculum: grade3Curriculum,
    stats: grade3Stats
  },
  4: {
    info: grade4Info,
    topics: grade4Topics,
    curriculum: grade4Curriculum,
    stats: grade4Stats
  },
  5: {
    info: grade5Info,
    topics: grade5Topics,
    curriculum: grade5Curriculum,
    stats: grade5Stats
  }
};

/**
 * Ottieni informazioni su un grado specifico
 * @param {number} gradeNumber - Numero del grado (1-5)
 * @returns {Object} Informazioni complete sul grado
 */
export const getGradeInfo = (gradeNumber) => {
  const grade = allGrades[gradeNumber];
  if (!grade) {
    console.warn(`Grado ${gradeNumber} non trovato. Gradi disponibili: 1-5`);
    return null;
  }
  return grade;
};

/**
 * Ottieni tutti gli argomenti di un grado specifico
 * @param {number} gradeNumber - Numero del grado
 * @returns {Array} Array di argomenti
 */
export const getGradeTopics = (gradeNumber) => {
  const grade = getGradeInfo(gradeNumber);
  return grade ? grade.topics : [];
};

/**
 * Ottieni un argomento specifico per ID
 * @param {string} topicId - ID dell'argomento
 * @returns {Object|null} Argomento o null se non trovato
 */
export const getAnyTopicById = (topicId) => {
  for (const gradeNumber of Object.keys(allGrades)) {
    const grade = allGrades[gradeNumber];
    const topic = grade.topicMap[topicId];
    if (topic) return topic;
  }
  console.warn(`Argomento ${topicId} non trovato in nessun grado`);
  return null;
};

/**
 * Ottieni statistiche per tutti i gradi
 * @returns {Object} Statistiche aggregare
 */
export const getAllGradesStats = () => {
  const totalTopics = Object.values(allGrades).reduce((sum, grade) => sum + grade.stats.totalTopics, 0);
  const totalTime = Object.values(allGrades).reduce((sum, grade) => sum + grade.stats.estimatedTime, 0);
  
  return {
    grades: Object.keys(allGrades).length,
    totalTopics,
    totalTime,
    topicsByGrade: Object.fromEntries(
      Object.entries(allGrades).map(([grade, data]) => [grade, data.stats.totalTopics])
    )
  };
};

/**
 * Nuclei fondanti comuni
 */
export const NUCLEI = ['numeri', 'spazio_e_figure', 'relazioni_e_funzioni', 'dati_e_previsioni'];

export default allGrades;
