/**
 * Nucleo: Relazioni e Funzioni - Grado 4
 */
export const nucleoRelazioniEFunzioni = {
  id: 'relazioni_e_funzioni',
  name: 'Relazioni e Funzioni',
  description: 'Sistema Monetario Europeo, Sistema Metrico Decimale, problemi con frazioni.',
  icon: 'hub',
  color: '#86d2e5',
  grades: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  topics: [
    {
      id: 'grado4_relazioni_euro',
      name: 'Sistema Monetario Europeo',
      nucleo: 'relazioni_e_funzioni',
      grade: 4,
      description: 'Calcoli di compravendita con Euro (costo unitario, totale, spesa, guadagno, ricavo).',
      difficulty: 'low',
      icon: 'euro_symbol',
      keywords: ['Euro', 'compravendita', 'costo', 'guadagno', 'ricavo'],
      learningObjectives: ['Calcolare costo unitario', 'Calcolare costo totale', 'Calcolare guadagno']
    },
    {
      id: 'grado4_relazioni_sistema_metrico',
      name: 'Sistema Metrico Decimale',
      nucleo: 'relazioni_e_funzioni',
      grade: 4,
      description: 'Equivalenze tra unita di misura di lunghezza, massa, capacita.',
      difficulty: 'mid',
      icon: 'ruler',
      keywords: ['metrico', 'decimale', 'equivalenze', 'lunghezza', 'massa', 'capacita'],
      prerequisites: ['grado4_relazioni_euro'],
      learningObjectives: ['Eseguire equivalenze lunghezza', 'Eseguire equivalenze massa', 'Eseguire equivalenze capacita']
    },
    {
      id: 'grado4_relazioni_problemi_frazioni',
      name: 'Problemi con frazioni e percentuali',
      nucleo: 'relazioni_e_funzioni',
      grade: 4,
      description: 'Risolvere problemi con frazioni e percentuali semplici.',
      difficulty: 'high',
      icon: 'psychology',
      keywords: ['problemi', 'frazioni', 'percentuali'],
      prerequisites: ['grado4_numeri_percentuali'],
      learningObjectives: ['Risolvere problemi con frazioni', 'Risolvere problemi con percentuali']
    }
  ]
};

export default nucleoRelazioniEFunzioni;
