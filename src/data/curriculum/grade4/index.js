/**
 * Curriculum per Grado 4 - Classe Quarta Primaria
 * Struttura completa del curriculum per il quarto grado scolastico
 * Basato sulle Indicazioni Nazionali MIM e Quadri INVALSI
 */

import { nucleoNumeri } from './numeri.js';
import { nucleoSpazioEFigure } from './spazio_e_figure.js';
import { nucleoRelazioniEFunzioni } from './relazioni_e_funzioni.js';
import { nucleoDatiEPrevisoni } from './dati_e_previsioni.js';

/**
 * Informazioni base sul Grado 4
 */
export const grade4Info = {
  grade: 4,
  name: 'Grado 4',
  schoolType: 'primaria',
  className: 'Classe Quarta Primaria',
  year: 4,
  description: 'Quarto anno della Scuola Primaria. Numerazione fino alle centinaia di migliaia, numeri decimali, frazioni, geometria avanzata e sistema metrico decimale.',
  nuclei: ['numeri', 'spazio_e_figure', 'relazioni_e_funzioni', 'dati_e_previsioni'],
  prerequisites: ['grado1', 'grado2', 'grado3'],
  learningObjectives: [
    'Padroneggiare la numerazione decimale fino alle centinaia di migliaia',
    'Eseguire operazioni con numeri decimali',
    'Lavorare con frazioni equivalenti e percentuali semplici',
    'Classificare quadrilateri e calcolare aree',
    'Utilizzare il Sistema Metrico Decimale',
    'Rappresentare dati con grafici avanzati'
  ]
};

/**
 * Curriculum completo per Grado 4
 */
export const grade4Curriculum = {
  grade: grade4Info,
  nucleoNumeri,
  nucleoSpazioEFigure,
  nucleoRelazioniEFunzioni,
  nucleoDatiEPrevisoni,
  learningPath: [
    'grado4_numeri_numerazione_100000',
    'grado4_numeri_decimali',
    'grado4_numeri_frazioni_equivalenti',
    'grado4_numeri_frazioni_confronto',
    'grado4_numeri_frazione_numero',
    'grado4_numeri_percentuali',
    'grado4_spazio_quadrilateri',
    'grado4_spazio_superficie',
    'grado4_spazio_area',
    'grado4_spazio_trasformazioni',
    'grado4_relazioni_euro',
    'grado4_relazioni_sistema_metrico',
    'grado4_relazioni_problemi_frazioni',
    'grado4_dati_moda_media_mediana',
    'grado4_dati_grafici_linee',
    'grado4_dati_probabilita_rapporto'
  ],
  dependencies: {
    'grado4_numeri_decimali': { prerequisites: ['grado4_numeri_numerazione_100000'], requiredFor: [] },
    'grado4_numeri_frazioni_equivalenti': { prerequisites: ['grado3_numeri_frazioni_introduzione'], requiredFor: ['grado4_numeri_frazioni_confronto'] },
    'grado4_numeri_frazioni_confronto': { prerequisites: ['grado4_numeri_frazioni_equivalenti'], requiredFor: [] },
    'grado4_numeri_frazione_numero': { prerequisites: ['grado4_numeri_frazioni_confronto'], requiredFor: [] },
    'grado4_numeri_percentuali': { prerequisites: ['grado4_numeri_frazione_numero'], requiredFor: [] },
    'grado4_spazio_superficie': { prerequisites: ['grado4_spazio_quadrilateri'], requiredFor: ['grado4_spazio_area'] },
    'grado4_spazio_area': { prerequisites: ['grado4_spazio_superficie'], requiredFor: [] },
    'grado4_relazioni_sistema_metrico': { prerequisites: ['grado4_relazioni_euro'], requiredFor: [] },
    'grado4_relazioni_problemi_frazioni': { prerequisites: ['grado4_numeri_percentuali'], requiredFor: [] },
    'grado4_dati_moda_media_mediana': { prerequisites: ['grado3_dati_moda_media'], requiredFor: ['grado4_dati_grafici_linee'] },
    'grado4_dati_probabilita_rapporto': { prerequisites: ['grado4_dati_grafici_linee'], requiredFor: [] }
  }
};

export const grade4Topics = [
  ...nucleoNumeri.topics,
  ...nucleoSpazioEFigure.topics,
  ...nucleoRelazioniEFunzioni.topics,
  ...nucleoDatiEPrevisoni.topics
];

export const grade4TopicMap = grade4Topics.reduce((map, topic) => {
  map[topic.id] = topic;
  return map;
}, {});

export const getGrade4TopicById = (id) => grade4TopicMap[id];

export const getGrade4TopicsByNucleo = (nucleo) => grade4Topics.filter(topic => topic.nucleo === nucleo);

export const grade4Stats = {
  totalTopics: grade4Topics.length,
  topicsByNucleo: {
    numeri: nucleoNumeri.topics.length,
    spazio_e_figure: nucleoSpazioEFigure.topics.length,
    relazioni_e_funzioni: nucleoRelazioniEFunzioni.topics.length,
    dati_e_previsioni: nucleoDatiEPrevisoni.topics.length
  },
  estimatedTime: 180,
  difficultyDistribution: {
    low: grade4Topics.filter(t => t.difficulty === 'low').length,
    mid: grade4Topics.filter(t => t.difficulty === 'mid').length,
    high: grade4Topics.filter(t => t.difficulty === 'high').length
  }
};

export default grade4Curriculum;
