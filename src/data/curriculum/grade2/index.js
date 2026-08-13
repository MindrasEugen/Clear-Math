/**
 * Curriculum per Grado 2 - Classe Seconda Primaria
 * Struttura completa del curriculum per il secondo grado scolastico
 * Basato sulle Indicazioni Nazionali MIM e Quadri INVALSI
 */

import { nucleoNumeri } from './numeri.js';
import { nucleoSpazioEFigure } from './spazio_e_figure.js';
import { nucleoRelazioniEFunzioni } from './relazioni_e_funzioni.js';
import { nucleoDatiEPrevisoni } from './dati_e_previsioni.js';

/**
 * Informazioni base sul Grado 2
 */
export const grade2Info = {
  grade: 2,
  name: 'Grado 2',
  schoolType: 'primaria',
  className: 'Classe Seconda Primaria',
  year: 2,
  description: 'Secondo anno della Scuola Primaria. Consolidamento dei concetti di numerazione fino a 100, introduzione alle operazioni in colonna, tabelline e primi concetti geometrici avanzati.',
  nuclei: ['numeri', 'spazio_e_figure', 'relazioni_e_funzioni', 'dati_e_previsioni'],
  prerequisites: ['grado1'],
  learningObjectives: [
    'Padroneggiare il sistema di numerazione decimale fino a 100',
    'Eseguire addizioni e sottrazioni in colonna con e senza cambio',
    'Memorizzare le tabelline fino al 10',
    'Riconoscere linee, angoli e figure geometriche piane',
    'Risolvere problemi aritmetici semplici',
    'Rappresentare dati con tabelle e grafici semplici'
  ]
};

/**
 * Curriculum completo per Grado 2
 * Organizzato per i 4 nuclei fondanti
 */
export const grade2Curriculum = {
  grade: grade2Info,
  nucleoNumeri,
  nucleoSpazioEFigure,
  nucleoRelazioniEFunzioni,
  nucleoDatiEPrevisoni,
  // Percorso di apprendimento consigliato (ID argomenti)
  learningPath: [
    // Numeri - Base
    'grado2_numeri_sistema_decimale',
    'grado2_numeri_conteggio_100',
    // Spazio e Figure - Base
    'grado2_spazio_linee',
    'grado2_spazio_confine',
    'grado2_spazio_figure_piane',
    // Numeri - Operazioni
    'grado2_numeri_addizione_colonna',
    'grado2_numeri_sottrazione_colonna',
    'grado2_numeri_moltiplicazione',
    'grado2_numeri_tabelline',
    'grado2_numeri_divisione',
    // Spazio e Figure - Avanzato
    'grado2_spazio_simmetria',
    // Relazioni e Funzioni
    'grado2_relazioni_equivalenza',
    'grado2_relazioni_ordine',
    'grado2_relazioni_tabelle',
    'grado2_relazioni_problemi',
    // Dati e Previsioni
    'grado2_dati_tabelle_frequenza',
    'grado2_dati_istogrammi',
    'grado2_dati_probabilita_semplice'
  ],
  // Dipendenze tra argomenti
  dependencies: {
    'grado2_numeri_sottrazione_colonna': {
      prerequisites: ['grado2_numeri_addizione_colonna'],
      requiredFor: []
    },
    'grado2_numeri_moltiplicazione': {
      prerequisites: ['grado2_numeri_sistema_decimale', 'grado2_numeri_addizione_colonna'],
      requiredFor: ['grado2_numeri_tabelline', 'grado2_numeri_divisione']
    },
    'grado2_numeri_divisione': {
      prerequisites: ['grado2_numeri_moltiplicazione'],
      requiredFor: []
    },
    'grado2_spazio_confine': {
      prerequisites: ['grado2_spazio_linee'],
      requiredFor: ['grado2_spazio_figure_piane']
    },
    'grado2_relazioni_tabelle': {
      prerequisites: ['grado2_relazioni_equivalenza', 'grado2_relazioni_ordine'],
      requiredFor: []
    },
    'grado2_dati_istogrammi': {
      prerequisites: ['grado2_dati_tabelle_frequenza'],
      requiredFor: []
    }
  }
};

/**
 * Esportazione di tutti gli argomenti del Grado 2
 */
export const grade2Topics = [
  ...nucleoNumeri.topics,
  ...nucleoSpazioEFigure.topics,
  ...nucleoRelazioniEFunzioni.topics,
  ...nucleoDatiEPrevisoni.topics
];

/**
 * Mappa argomenti per ID per accesso rapido
 */
export const grade2TopicMap = grade2Topics.reduce((map, topic) => {
  map[topic.id] = topic;
  return map;
}, {});

/**
 * Ottieni un argomento per ID
 */
export const getGrade2TopicById = (id) => grade2TopicMap[id];

/**
 * Filtra argomenti per nucleo
 */
export const getGrade2TopicsByNucleo = (nucleo) => {
  return grade2Topics.filter(topic => topic.nucleo === nucleo);
};

/**
 * Statistiche del Grado 2
 */
export const grade2Stats = {
  totalTopics: grade2Topics.length,
  topicsByNucleo: {
    numeri: nucleoNumeri.topics.length,
    spazio_e_figure: nucleoSpazioEFigure.topics.length,
    relazioni_e_funzioni: nucleoRelazioniEFunzioni.topics.length,
    dati_e_previsioni: nucleoDatiEPrevisoni.topics.length
  },
  estimatedTime: 140, // Ore stimate per completare il grado
  difficultyDistribution: {
    low: grade2Topics.filter(t => t.difficulty === 'low').length,
    mid: grade2Topics.filter(t => t.difficulty === 'mid').length,
    high: grade2Topics.filter(t => t.difficulty === 'high').length
  }
};

export default grade2Curriculum;
