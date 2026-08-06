/**
 * Curriculum per Grado 1 - Classe Prima Primaria
 * Struttura completa del curriculum per il primo grado scolastico
 * Basato sulle Indicazioni Nazionali MIM e Quadri INVALSI
 */

import { nucleoNumeri } from './numeri.js';
import { nucleoSpazioEFigure } from './spazio_e_figure.js';
import { nucleoRelazioniEFunzioni } from './relazioni_e_funzioni.js';
import { nucleoDatiEPrevisoni } from './dati_e_previsioni.js';

/**
 * Informazioni base sul Grado 1
 */
export const grade1Info = {
  grade: 1,
  name: 'Grado 1',
  schoolType: 'primaria',
  className: 'Classe Prima Primaria',
  year: 1,
  description: 'Primo anno della Scuola Primaria. Introduzione ai concetti fondamentali di matematica: numeri, forme, relazioni e dati.',
  nuclei: ['numeri', 'spazio_e_figure', 'relazioni_e_funzioni', 'dati_e_previsioni'],
  prerequisites: [],
  learningObjectives: [
    'Acquisire il concetto di numero naturale entro il 20',
    'Eseguire addizioni e sottrazioni semplici',
    'Riconoscere e nominare forme geometriche di base',
    'Orientarsi nello spazio fisico',
    'Classificare oggetti secondo criteri dati',
    'Raccogliere e rappresentare dati semplici'
  ]
};

/**
 * Curriculum completo per Grado 1
 * Organizzato per i 4 nuclei fondanti
 */
export const grade1Curriculum = {
  grade: grade1Info,
  nucleoNumeri,
  nucleoSpazioEFigure,
  nucleoRelazioniEFunzioni,
  nucleoDatiEPrevisoni,
  // Percorso di apprendimento consigliato (ID argomenti)
  learningPath: [
    // Numeri - Base
    'grado1_numeri_conteggio',
    'grado1_numeri_quantita',
    'grado1_numeri_confronto',
    // Spazio e Figure - Base
    'grado1_spazio_orientamento',
    'grado1_spazio_posizioni',
    'grado1_spazio_forme',
    // Relazioni e Funzioni - Base
    'grado1_relazioni_classificazione',
    'grado1_relazioni_ordinamento',
    'grado1_relazioni_connettivi',
    // Numeri - Operazioni
    'grado1_numeri_addizione',
    'grado1_numeri_sottrazione',
    'grado1_numeri_valore_posizionale',
    'grado1_numeri_calcolo_mentale',
    // Dati e Previsioni
    'grado1_dati_raccolta',
    'grado1_dati_rappresentazione',
    'grado1_dati_probabilita'
  ],
  // Dipendenze tra argomenti
  dependencies: {
    'grado1_numeri_addizione': {
      prerequisites: ['grado1_numeri_conteggio', 'grado1_numeri_quantita'],
      requiredFor: ['grado1_numeri_sottrazione', 'grado1_numeri_calcolo_mentale']
    },
    'grado1_numeri_sottrazione': {
      prerequisites: ['grado1_numeri_addizione'],
      requiredFor: ['grado1_numeri_calcolo_mentale']
    },
    'grado1_numeri_valore_posizionale': {
      prerequisites: ['grado1_numeri_conteggio'],
      requiredFor: ['grado1_numeri_calcolo_mentale']
    },
    'grado1_spazio_posizioni': {
      prerequisites: ['grado1_spazio_orientamento'],
      requiredFor: []
    },
    'grado1_relazioni_ordinamento': {
      prerequisites: ['grado1_relazioni_classificazione'],
      requiredFor: []
    },
    'grado1_dati_rappresentazione': {
      prerequisites: ['grado1_dati_raccolta'],
      requiredFor: ['grado1_dati_probabilita']
    }
  }
};

/**
 * Esportazione di tutti gli argomenti del Grado 1
 */
export const grade1Topics = [
  ...nucleoNumeri.topics,
  ...nucleoSpazioEFigure.topics,
  ...nucleoRelazioniEFunzioni.topics,
  ...nucleoDatiEPrevisoni.topics
];

/**
 * Mappa argomenti per ID per accesso rapido
 */
export const grade1TopicMap = grade1Topics.reduce((map, topic) => {
  map[topic.id] = topic;
  return map;
}, {});

/**
 * Ottieni un argomento per ID
 */
export const getGrade1TopicById = (id) => grade1TopicMap[id];

/**
 * Filtra argomenti per nucleo
 */
export const getGrade1TopicsByNucleo = (nucleo) => {
  return grade1Topics.filter(topic => topic.nucleo === nucleo);
};

/**
 * Statistiche del Grado 1
 */
export const grade1Stats = {
  totalTopics: grade1Topics.length,
  topicsByNucleo: {
    numeri: nucleoNumeri.topics.length,
    spazio_e_figure: nucleoSpazioEFigure.topics.length,
    relazioni_e_funzioni: nucleoRelazioniEFunzioni.topics.length,
    dati_e_previsioni: nucleoDatiEPrevisoni.topics.length
  },
  estimatedTime: 120, // Ore stimate per completare il grado
  difficultyDistribution: {
    low: grade1Topics.filter(t => t.difficulty === 'low').length,
    mid: grade1Topics.filter(t => t.difficulty === 'mid').length,
    high: grade1Topics.filter(t => t.difficulty === 'high').length
  }
};

export default grade1Curriculum;
