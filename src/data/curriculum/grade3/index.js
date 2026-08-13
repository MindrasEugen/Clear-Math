/**
 * Curriculum per Grado 3 - Classe Terza Primaria
 * Struttura completa del curriculum per il terzo grado scolastico
 * Basato sulle Indicazioni Nazionali MIM e Quadri INVALSI
 */

import { nucleoNumeri } from './numeri.js';
import { nucleoSpazioEFigure } from './spazio_e_figure.js';
import { nucleoRelazioniEFunzioni } from './relazioni_e_funzioni.js';
import { nucleoDatiEPrevisoni } from './dati_e_previsioni.js';

/**
 * Informazioni base sul Grado 3
 */
export const grade3Info = {
  grade: 3,
  name: 'Grado 3',
  schoolType: 'primaria',
  className: 'Classe Terza Primaria',
  year: 3,
  description: 'Terzo anno della Scuola Primaria. Estensione della numerazione fino a 1000, introduzione alle frazioni, approfondimento della geometria e risoluzione di problemi a due operazioni.',
  nuclei: ['numeri', 'spazio_e_figure', 'relazioni_e_funzioni', 'dati_e_previsioni'],
  prerequisites: ['grado1', 'grado2'],
  learningObjectives: [
    'Padroneggiare la numerazione decimale fino a 1000',
    'Eseguire le quattro operazioni in colonna',
    'Comprendere e operare con frazioni semplici',
    'Riconoscere linee, angoli e poligoni',
    'Risolvere problemi aritmetici a due operazioni',
    'Calcolare moda e media aritmetica semplice'
  ]
};

/**
 * Curriculum completo per Grado 3
 * Organizzato per i 4 nuclei fondanti
 */
export const grade3Curriculum = {
  grade: grade3Info,
  nucleoNumeri,
  nucleoSpazioEFigure,
  nucleoRelazioniEFunzioni,
  nucleoDatiEPrevisoni,
  // Percorso di apprendimento consigliato (ID argomenti)
  learningPath: [
    // Numeri - Base
    'grado3_numeri_numerazione_1000',
    'grado3_numeri_algoritmi_operazioni',
    // Spazio e Figure - Base
    'grado3_spazio_rette',
    'grado3_spazio_angoli',
    'grado3_spazio_poligoni',
    'grado3_spazio_classificazione_triangoli',
    'grado3_spazio_perimetro',
    // Numeri - Avanzato
    'grado3_numeri_frazioni_introduzione',
    'grado3_numeri_frazioni_tipi',
    'grado3_numeri_proprieta_operazioni',
    // Relazioni e Funzioni
    'grado3_relazioni_unita_misura',
    'grado3_relazioni_problemi_due_operazioni',
    'grado3_relazioni_diagrammi_flusso',
    // Dati e Previsioni
    'grado3_dati_grafici_barre',
    'grado3_dati_moda_media',
    'grado3_dati_probabilita_intuitiva'
  ],
  // Dipendenze tra argomenti
  dependencies: {
    'grado3_numeri_algoritmi_operazioni': {
      prerequisites: ['grado3_numeri_numerazione_1000'],
      requiredFor: ['grado3_numeri_proprieta_operazioni']
    },
    'grado3_numeri_frazioni_tipi': {
      prerequisites: ['grado3_numeri_frazioni_introduzione'],
      requiredFor: []
    },
    'grado3_numeri_proprieta_operazioni': {
      prerequisites: ['grado3_numeri_algoritmi_operazioni'],
      requiredFor: []
    },
    'grado3_spazio_angoli': {
      prerequisites: ['grado3_spazio_rette'],
      requiredFor: ['grado3_spazio_poligoni']
    },
    'grado3_spazio_classificazione_triangoli': {
      prerequisites: ['grado3_spazio_poligoni'],
      requiredFor: []
    },
    'grado3_spazio_perimetro': {
      prerequisites: ['grado3_spazio_poligoni'],
      requiredFor: []
    },
    'grado3_relazioni_problemi_due_operazioni': {
      prerequisites: ['grado3_relazioni_unita_misura'],
      requiredFor: ['grado3_relazioni_diagrammi_flusso']
    },
    'grado3_dati_moda_media': {
      prerequisites: ['grado3_dati_grafici_barre'],
      requiredFor: []
    }
  }
};

/**
 * Esportazione di tutti gli argomenti del Grado 3
 */
export const grade3Topics = [
  ...nucleoNumeri.topics,
  ...nucleoSpazioEFigure.topics,
  ...nucleoRelazioniEFunzioni.topics,
  ...nucleoDatiEPrevisoni.topics
];

/**
 * Mappa argomenti per ID per accesso rapido
 */
export const grade3TopicMap = grade3Topics.reduce((map, topic) => {
  map[topic.id] = topic;
  return map;
}, {});

/**
 * Ottieni un argomento per ID
 */
export const getGrade3TopicById = (id) => grade3TopicMap[id];

/**
 * Filtra argomenti per nucleo
 */
export const getGrade3TopicsByNucleo = (nucleo) => {
  return grade3Topics.filter(topic => topic.nucleo === nucleo);
};

/**
 * Statistiche del Grado 3
 */
export const grade3Stats = {
  totalTopics: grade3Topics.length,
  topicsByNucleo: {
    numeri: nucleoNumeri.topics.length,
    spazio_e_figure: nucleoSpazioEFigure.topics.length,
    relazioni_e_funzioni: nucleoRelazioniEFunzioni.topics.length,
    dati_e_previsioni: nucleoDatiEPrevisoni.topics.length
  },
  estimatedTime: 160, // Ore stimate per completare il grado
  difficultyDistribution: {
    low: grade3Topics.filter(t => t.difficulty === 'low').length,
    mid: grade3Topics.filter(t => t.difficulty === 'mid').length,
    high: grade3Topics.filter(t => t.difficulty === 'high').length
  }
};

export default grade3Curriculum;
