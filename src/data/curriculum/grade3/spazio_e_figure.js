/**
 * Nucleo: Spazio e Figure - Grado 3
 * Geometria per la Classe Terza Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Spazio e Figure per Grado 3
 */
export const nucleoSpazioEFigure = {
  id: 'spazio_e_figure',
  name: 'Spazio e Figure',
  description: 'Studio delle rette, angoli, poligoni, classificazione dei triangoli e concetto di perimetro.',
  icon: 'shape_line',
  color: '#6a3a06',
  grades: [3, 4, 5, 6, 7, 8],
  
  /**
   * Argomenti del nucleo Spazio e Figure per Grado 3
   */
  topics: [
    {
      id: 'grado3_spazio_rette',
      name: 'Rette incidenti, parallele, perpendicolari',
      nucleo: 'spazio_e_figure',
      grade: 3,
      description: 'Riconoscere e tracciare rette incidenti, parallele e perpendicolari.',
      longDescription: 'L\'alunno impara a riconoscere e tracciare diversi tipi di rette: incidenti (che si intersecano), parallele (che non si intersecano mai) e perpendicolari (che si intersecano formando angoli retti). Sviluppa la capacità di identificare queste relazioni in figure complesse.',
      difficulty: 'low',
      icon: 'horizontal_rule',
      keywords: ['rette', 'incidenti', 'parallele', 'perpendicolari', 'angoli'],
      prerequisites: ['grado2_spazio_linee'],
      dependencies: [],
      learningObjectives: [
        'Riconoscere rette incidenti, parallele e perpendicolari',
        'Tracciare rette incidenti, parallele e perpendicolari',
        'Identificare relazioni tra rette in figure complesse'
      ],
      invalsiReference: 'INVALSI_G3_SP_01',
      minReference: 'MIM_PRIMARIA_SP_3'
    },
    {
      id: 'grado3_spazio_angoli',
      name: 'Gli angoli',
      nucleo: 'spazio_e_figure',
      grade: 3,
      description: 'Riconoscere e classificare angoli (retto, acuto, ottuso, piatto, giro).',
      longDescription: 'L\'alunno impara a riconoscere e classificare diversi tipi di angoli: retto (90°), acuto (minore di 90°), ottuso (maggiore di 90°), piatto (180°) e giro (360°). Sviluppa la capacità di misurare angoli con il goniometro e di costruire angoli dati.',
      difficulty: 'low',
      icon: 'angle',
      keywords: ['angoli', 'retto', 'acuto', 'ottuso', 'piatto', 'giro'],
      prerequisites: ['grado3_spazio_rette'],
      dependencies: [],
      learningObjectives: [
        'Riconoscere e classificare angoli',
        'Misurare angoli con il goniometro',
        'Costruire angoli dati'
      ],
      invalsiReference: 'INVALSI_G3_SP_02',
      minReference: 'MIM_PRIMARIA_SP_3'
    },
    {
      id: 'grado3_spazio_poligoni',
      name: 'I poligoni',
      nucleo: 'spazio_e_figure',
      grade: 3,
      description: 'Riconoscere e descrivere poligoni in base a vertici, lati e diagonali.',
      longDescription: 'L\'alunno impara a riconoscere e descrivere i poligoni, figure piane chiuse con lati retti. Sviluppa la capacità di identificare vertici, lati e diagonali, e di classificare poligoni in base al numero di lati.',
      difficulty: 'mid',
      icon: 'pentagon',
      keywords: ['poligoni', 'vertici', 'lati', 'diagonali', 'classificazione'],
      prerequisites: ['grado3_spazio_angoli'],
      dependencies: [],
      learningObjectives: [
        'Riconoscere e descrivere poligoni',
        'Identificare vertici, lati e diagonali',
        'Classificare poligoni in base al numero di lati'
      ],
      invalsiReference: 'INVALSI_G3_SP_03',
      minReference: 'MIM_PRIMARIA_SP_3'
    },
    {
      id: 'grado3_spazio_classificazione_triangoli',
      name: 'Classificazione dei triangoli',
      nucleo: 'spazio_e_figure',
      grade: 3,
      description: 'Classificare i triangoli in base ai lati e agli angoli.',
      longDescription: 'L\'alunno impara a classificare i triangoli in base ai lati (equilatero, isoscele, scaleno) e in base agli angoli (acutangolo, rettangolo, ottusangolo). Sviluppa la capacità di riconoscere queste caratteristiche in figure geometriche.',
      difficulty: 'mid',
      icon: 'change_history',
      keywords: ['triangoli', 'classificazione', 'lati', 'angoli', 'equilatero', 'isoscele', 'scaleno'],
      prerequisites: ['grado3_spazio_poligoni'],
      dependencies: [],
      learningObjectives: [
        'Classificare triangoli in base ai lati',
        'Classificare triangoli in base agli angoli',
        'Riconoscere triangoli in figure complesse'
      ],
      invalsiReference: 'INVALSI_G3_SP_04',
      minReference: 'MIM_PRIMARIA_SP_3'
    },
    {
      id: 'grado3_spazio_perimetro',
      name: 'Il perimetro',
      nucleo: 'spazio_e_figure',
      grade: 3,
      description: 'Calcolare il perimetro di figure piane.',
      longDescription: 'L\'alunno impara a calcolare il perimetro di figure piane, cioè la lunghezza del confine. Sviluppa la capacità di misurare con unità non convenzionali (es. matite, passi) e convenzionali (cm, m).',
      difficulty: 'high',
      icon: 'straighten',
      keywords: ['perimetro', 'misurazione', 'unita', 'convenzionali', 'non convenzionali'],
      prerequisites: ['grado3_spazio_poligoni'],
      dependencies: [],
      learningObjectives: [
        'Comprendere il concetto di perimetro',
        'Calcolare il perimetro con unità non convenzionali',
        'Calcolare il perimetro con unità convenzionali'
      ],
      invalsiReference: 'INVALSI_G3_SP_05',
      minReference: 'MIM_PRIMARIA_SP_3'
    }
  ]
};

export default nucleoSpazioEFigure;
