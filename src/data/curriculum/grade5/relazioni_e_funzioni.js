/**
 * Nucleo: Relazioni e Funzioni - Grado 5
 */
export const nucleoRelazioniEFunzioni = {
  id: 'relazioni_e_funzioni',
  name: 'Relazioni e Funzioni',
  description: 'Equivalenze avanzate, peso lordo/netto, scala, problemi complessi.',
  icon: 'hub',
  color: '#86d2e5',
  grades: [5, 6, 7, 8, 9, 10, 11, 12, 13],
  topics: [
    {
      id: 'grado5_relazioni_equivalenze_avanzate',
      name: 'Equivalenze avanzate',
      nucleo: 'relazioni_e_funzioni',
      grade: 5,
      description: 'Equivalenze tra unita di misura di superficie e volume.',
      difficulty: 'low',
      icon: 'square_meter',
      keywords: ['equivalenze', 'superficie', 'volume', 'm2', 'm3'],
      prerequisites: ['grado4_relazioni_sistema_metrico'],
      learningObjectives: ['Eseguire equivalenze superficie', 'Eseguire equivalenze volume', 'Convertire tra unita']
    },
    {
      id: 'grado5_relazioni_peso_lordo_netto',
      name: 'Peso lordo, netto e tara',
      nucleo: 'relazioni_e_funzioni',
      grade: 5,
      description: 'Comprendere e calcolare peso lordo, netto e tara.',
      difficulty: 'mid',
      icon: 'weight',
      keywords: ['peso lordo', 'peso netto', 'tara', 'calcoli'],
      prerequisites: ['grado5_relazioni_equivalenze_avanzate'],
      learningObjectives: ['Calcolare peso lordo', 'Calcolare peso netto', 'Calcolare tara']
    },
    {
      id: 'grado5_relazioni_scala',
      name: 'Scala di ingrandimento e riduzione',
      nucleo: 'relazioni_e_funzioni',
      grade: 5,
      description: 'Comprendere scala in carte geografiche e mappe.',
      difficulty: 'mid',
      icon: 'map',
      keywords: ['scala', 'ingrandimento', 'riduzione', 'carte geografiche'],
      prerequisites: ['grado5_relazioni_peso_lordo_netto'],
      learningObjectives: ['Leggere scala', 'Calcolare distanze reali', 'Applicare a mappe']
    },
    {
      id: 'grado5_relazioni_problemi_complessi',
      name: 'Problemi complessi',
      nucleo: 'relazioni_e_funzioni',
      grade: 5,
      description: 'Risolvere problemi complessi con approccio grafico/modellistico.',
      difficulty: 'high',
      icon: 'psychology',
      keywords: ['problemi', 'complessi', 'grafico', 'modellistico'],
      prerequisites: ['grado5_relazioni_scala'],
      learningObjectives: ['Risolvere problemi complessi', 'Usare metodo del segmento', 'Modellizzare situazioni']
    }
  ]
};

export default nucleoRelazioniEFunzioni;
