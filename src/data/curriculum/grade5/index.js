/**
 * Curriculum per Grado 5 - Classe Quinta Primaria
 * Struttura completa del curriculum per il quinto grado scolastico
 * Basato sulle Indicazioni Nazionali MIM e Quadri INVALSI
 */

import { nucleoNumeri } from './numeri.js';
import { nucleoSpazioEFigure } from './spazio_e_figure.js';
import { nucleoRelazioniEFunzioni } from './relazioni_e_funzioni.js';
import { nucleoDatiEPrevisoni } from './dati_e_previsioni.js';

/**
 * Informazioni base sul Grado 5
 */
export const grade5Info = {
  grade: 5,
  name: 'Grado 5',
  schoolType: 'primaria',
  className: 'Classe Quinta Primaria',
  year: 5,
  description: 'Quinto anno della Scuola Primaria. Numerazione oltre il milione, numeri relativi, divisibilita, geometria solida, volume e probabilita avanzata.',
  nuclei: ['numeri', 'spazio_e_figure', 'relazioni_e_funzioni', 'dati_e_previsioni'],
  prerequisites: ['grado1', 'grado2', 'grado3', 'grado4'],
  learningObjectives: [
    'Padroneggiare la numerazione oltre il milione',
    'Comprendere numeri relativi e divisibilita',
    'Calcolare aree, perimetri e volumi',
    'Risolvere equivalenze avanzate',
    'Calcolare probabilita come frazione, decimale e percentuale'
  ]
};

/**
 * Curriculum completo per Grado 5
 */
export const grade5Curriculum = {
  grade: grade5Info,
  nucleoNumeri,
  nucleoSpazioEFigure,
  nucleoRelazioniEFunzioni,
  nucleoDatiEPrevisoni,
  learningPath: [
    'grado5_numeri_numerazione_milione',
    'grado5_numeri_relativi',
    'grado5_numeri_divisibilita',
    'grado5_numeri_criteri_divisibilita',
    'grado5_numeri_potenze',
    'grado5_numeri_percentuali_avanzate',
    'grado5_spazio_triangoli_area',
    'grado5_spazio_cerchio',
    'grado5_spazio_poligoni_regolari',
    'grado5_spazio_geometria_solida',
    'grado5_spazio_volume',
    'grado5_relazioni_equivalenze_avanzate',
    'grado5_relazioni_peso_lordo_netto',
    'grado5_relazioni_scala',
    'grado5_relazioni_problemi_complessi',
    'grado5_dati_analisi_statistica',
    'grado5_dati_tabelle_incrociate',
    'grado5_dati_probabilita_frazione_percentuale'
  ],
  dependencies: {
    'grado5_numeri_relativi': { prerequisites: ['grado5_numeri_numerazione_milione'], requiredFor: [] },
    'grado5_numeri_divisibilita': { prerequisites: ['grado5_numeri_numerazione_milione'], requiredFor: ['grado5_numeri_criteri_divisibilita'] },
    'grado5_numeri_criteri_divisibilita': { prerequisites: ['grado5_numeri_divisibilita'], requiredFor: [] },
    'grado5_numeri_potenze': { prerequisites: ['grado5_numeri_numerazione_milione'], requiredFor: [] },
    'grado5_numeri_percentuali_avanzate': { prerequisites: ['grado4_numeri_percentuali'], requiredFor: [] },
    'grado5_spazio_triangoli_area': { prerequisites: ['grado4_spazio_area'], requiredFor: [] },
    'grado5_spazio_cerchio': { prerequisites: ['grado5_spazio_triangoli_area'], requiredFor: [] },
    'grado5_spazio_poligoni_regolari': { prerequisites: ['grado5_spazio_cerchio'], requiredFor: [] },
    'grado5_spazio_geometria_solida': { prerequisites: ['grado5_spazio_poligoni_regolari'], requiredFor: ['grado5_spazio_volume'] },
    'grado5_spazio_volume': { prerequisites: ['grado5_spazio_geometria_solida'], requiredFor: [] },
    'grado5_relazioni_equivalenze_avanzate': { prerequisites: ['grado4_relazioni_sistema_metrico'], requiredFor: [] },
    'grado5_relazioni_peso_lordo_netto': { prerequisites: ['grado5_relazioni_equivalenze_avanzate'], requiredFor: [] },
    'grado5_relazioni_scala': { prerequisites: ['grado5_relazioni_peso_lordo_netto'], requiredFor: [] },
    'grado5_relazioni_problemi_complessi': { prerequisites: ['grado5_relazioni_scala'], requiredFor: [] },
    'grado5_dati_analisi_statistica': { prerequisites: ['grado4_dati_probabilita_rapporto'], requiredFor: ['grado5_dati_tabelle_incrociate'] },
    'grado5_dati_tabelle_incrociate': { prerequisites: ['grado5_dati_analisi_statistica'], requiredFor: ['grado5_dati_probabilita_frazione_percentuale'] },
    'grado5_dati_probabilita_frazione_percentuale': { prerequisites: ['grado5_dati_tabelle_incrociate'], requiredFor: [] }
  }
};

export const grade5Topics = [
  ...nucleoNumeri.topics,
  ...nucleoSpazioEFigure.topics,
  ...nucleoRelazioniEFunzioni.topics,
  ...nucleoDatiEPrevisoni.topics
];

export const grade5TopicMap = grade5Topics.reduce((map, topic) => {
  map[topic.id] = topic;
  return map;
}, {});

export const getGrade5TopicById = (id) => grade5TopicMap[id];

export const getGrade5TopicsByNucleo = (nucleo) => grade5Topics.filter(topic => topic.nucleo === nucleo);

export const grade5Stats = {
  totalTopics: grade5Topics.length,
  topicsByNucleo: {
    numeri: nucleoNumeri.topics.length,
    spazio_e_figure: nucleoSpazioEFigure.topics.length,
    relazioni_e_funzioni: nucleoRelazioniEFunzioni.topics.length,
    dati_e_previsioni: nucleoDatiEPrevisoni.topics.length
  },
  estimatedTime: 200,
  difficultyDistribution: {
    low: grade5Topics.filter(t => t.difficulty === 'low').length,
    mid: grade5Topics.filter(t => t.difficulty === 'mid').length,
    high: grade5Topics.filter(t => t.difficulty === 'high').length
  }
};

export default grade5Curriculum;
