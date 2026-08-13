/**
 * Nucleo: Dati e Previsioni - Grado 5
 */
export const nucleoDatiEPrevisoni = {
  id: 'dati_e_previsioni',
  name: 'Dati e Previsioni',
  description: 'Analisi statistica, tabelle incrociate, probabilita espressa come frazione/decimale/percentuale.',
  icon: 'bar_chart',
  color: '#004d5b',
  grades: [5, 6, 7, 8, 9, 10, 11, 12, 13],
  topics: [
    {
      id: 'grado5_dati_analisi_statistica',
      name: 'Analisi critica di indagini statistiche',
      nucleo: 'dati_e_previsioni',
      grade: 5,
      description: 'Analizzare criticamente indagini statistiche.',
      difficulty: 'low',
      icon: 'insights',
      keywords: ['analisi', 'statistica', 'indagini', 'critica'],
      prerequisites: ['grado4_dati_probabilita_rapporto'],
      learningObjectives: ['Analizzare indagini', 'Valutare attendibilita', 'Interpretare risultati']
    },
    {
      id: 'grado5_dati_tabelle_incrociate',
      name: 'Tabelle incrociate',
      nucleo: 'dati_e_previsioni',
      grade: 5,
      description: 'Rappresentare dati complessi con tabelle incrociate.',
      difficulty: 'mid',
      icon: 'grid_view',
      keywords: ['tabelle', 'incrociate', 'dati complessi', 'rappresentazione'],
      prerequisites: ['grado5_dati_analisi_statistica'],
      learningObjectives: ['Costruire tabelle incrociate', 'Leggere tabelle incrociate', 'Analizzare dati complessi']
    },
    {
      id: 'grado5_dati_probabilita_frazione_percentuale',
      name: 'Probabilita espressa come frazione/decimale/percentuale',
      nucleo: 'dati_e_previsioni',
      grade: 5,
      description: 'Esprimere probabilita in forme diverse.',
      difficulty: 'high',
      icon: 'casino',
      keywords: ['probabilita', 'frazione', 'decimale', 'percentuale'],
      prerequisites: ['grado5_dati_tabelle_incrociate'],
      learningObjectives: ['Esprimere probabilita come frazione', 'Convertire in decimale', 'Convertire in percentuale']
    }
  ]
};

export default nucleoDatiEPrevisoni;
