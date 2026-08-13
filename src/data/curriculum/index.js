/**
 * Curriculum Completo - Clear-Math
 * Esportazione unificata di tutti i curriculum per i gradi 1-5 della Scuola Primaria
 * Basato sulle Indicazioni Nazionali MIM e Quadri INVALSI
 */

// Importa tutto da ogni grado
import * as grade1Exports from './grade1/index.js';
import * as grade2Exports from './grade2/index.js';
import * as grade3Exports from './grade3/index.js';
import * as grade4Exports from './grade4/index.js';
import * as grade5Exports from './grade5/index.js';

// Re-export di tutto per retrocompatibilit√†
export * from './grade1/index.js';
export * from './grade2/index.js';
export * from './grade3/index.js';
export * from './grade4/index.js';
export * from './grade5/index.js';

// Estrai i nomi necessari per allGrades
const grade1Info = grade1Exports.grade1Info;
const grade1Topics = grade1Exports.grade1Topics;
const grade1Curriculum = grade1Exports.grade1Curriculum;
const grade1Stats = grade1Exports.grade1Stats;
const grade1TopicMap = grade1Exports.grade1TopicMap;

const grade2Info = grade2Exports.grade2Info;
const grade2Topics = grade2Exports.grade2Topics;
const grade2Curriculum = grade2Exports.grade2Curriculum;
const grade2Stats = grade2Exports.grade2Stats;
const grade2TopicMap = grade2Exports.grade2TopicMap;

const grade3Info = grade3Exports.grade3Info;
const grade3Topics = grade3Exports.grade3Topics;
const grade3Curriculum = grade3Exports.grade3Curriculum;
const grade3Stats = grade3Exports.grade3Stats;
const grade3TopicMap = grade3Exports.grade3TopicMap;

const grade4Info = grade4Exports.grade4Info;
const grade4Topics = grade4Exports.grade4Topics;
const grade4Curriculum = grade4Exports.grade4Curriculum;
const grade4Stats = grade4Exports.grade4Stats;
const grade4TopicMap = grade4Exports.grade4TopicMap;

const grade5Info = grade5Exports.grade5Info;
const grade5Topics = grade5Exports.grade5Topics;
const grade5Curriculum = grade5Exports.grade5Curriculum;
const grade5Stats = grade5Exports.grade5Stats;
const grade5TopicMap = grade5Exports.grade5TopicMap;

/**
 * Mappa di tutti i gradi disponibili
 */
export const allGrades = {
  1: {
    info: grade1Info,
    topics: grade1Topics,
    curriculum: grade1Curriculum,
    stats: grade1Stats,
    topicMap: grade1TopicMap
  },
  2: {
    info: grade2Info,
    topics: grade2Topics,
    curriculum: grade2Curriculum,
    stats: grade2Stats,
    topicMap: grade2TopicMap
  },
  3: {
    info: grade3Info,
    topics: grade3Topics,
    curriculum: grade3Curriculum,
    stats: grade3Stats,
    topicMap: grade3TopicMap
  },
  4: {
    info: grade4Info,
    topics: grade4Topics,
    curriculum: grade4Curriculum,
    stats: grade4Stats,
    topicMap: grade4TopicMap
  },
  5: {
    info: grade5Info,
    topics: grade5Topics,
    curriculum: grade5Curriculum,
    stats: grade5Stats,
    topicMap: grade5TopicMap
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
