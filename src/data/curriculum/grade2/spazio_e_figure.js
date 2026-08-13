/**
 * Nucleo: Spazio e Figure - Grado 2
 * Geometria per la Classe Seconda Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Spazio e Figure per Grado 2
 */
export const nucleoSpazioEFigure = {
  id: 'spazio_e_figure',
  name: 'Spazio e Figure',
  description: 'Studio delle linee, del confine, delle figure geometriche piane e dei concetti di simmetria.',
  icon: 'shape_line',
  color: '#6a3a06',
  grades: [2, 3, 4, 5, 6, 7, 8],
  
  /**
   * Argomenti del nucleo Spazio e Figure per Grado 2
   */
  topics: [
    {
      id: 'grado2_spazio_linee',
      name: 'Linee aperte, chiuse, intrecciate',
      nucleo: 'spazio_e_figure',
      grade: 2,
      description: 'Riconoscere e classificare diversi tipi di linee.',
      longDescription: 'L\'alunno impara a riconoscere e classificare le linee in base alle loro caratteristiche: aperte, chiuse, intrecciate, rette, curve, spezzate. Sviluppa la capacità di tracciare differenti tipi di linee.',
      difficulty: 'low',
      icon: 'straighten',
      keywords: ['linee', 'aperte', 'chiuse', 'intrecciate', 'rette', 'curve', 'spezzate'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Riconoscere linee aperte e chiuse',
        'Classificare linee rette, curve e spezzate',
        'Tracciare differenti tipi di linee'
      ],
      invalsiReference: 'INVALSI_G2_SP_01',
      minReference: 'MIM_PRIMARIA_SP_2'
    },
    {
      id: 'grado2_spazio_confine',
      name: 'Confine e regione',
      nucleo: 'spazio_e_figure',
      grade: 2,
      description: 'Comprendere il concetto di confine e regione.',
      longDescription: 'L\'alunno impara a distinguere tra il confine di una figura (la linea che la delimita) e la regione (lo spazio interno alla figura). Sviluppa la capacità di tracciare il confine di figure date e di colorare regioni.',
      difficulty: 'low',
      icon: 'border_all',
      keywords: ['confine', 'regione', 'linea', 'spazio', 'figura'],
      prerequisites: ['grado2_spazio_linee'],
      dependencies: [],
      learningObjectives: [
        'Distinguere tra confine e regione',
        'Tracciare il confine di una figura',
        'Colorare regioni'
      ],
      invalsiReference: 'INVALSI_G2_SP_02',
      minReference: 'MIM_PRIMARIA_SP_2'
    },
    {
      id: 'grado2_spazio_figure_piane',
      name: 'Figure geometriche piane elementari',
      nucleo: 'spazio_e_figure',
      grade: 2,
      description: 'Riconoscere e disegnare figure geometriche piane.',
      longDescription: 'L\'alunno impara a riconoscere e disegnare figure geometriche piane elementari come quadrato, rettangolo, triangolo, cerchio, rombo, trapezio. Sviluppa la capacità di descrivere le proprietà delle figure.',
      difficulty: 'mid',
      icon: 'square',
      keywords: ['figure piane', 'geometriche', 'quadrato', 'rettangolo', 'triangolo', 'cerchio', 'disegno'],
      prerequisites: ['grado2_spazio_confine'],
      dependencies: [],
      learningObjectives: [
        'Riconoscere figure geometriche piane',
        'Disegnare figure geometriche piane',
        'Descrivere proprietà delle figure'
      ],
      invalsiReference: 'INVALSI_G2_SP_03',
      minReference: 'MIM_PRIMARIA_SP_2'
    },
    {
      id: 'grado2_spazio_simmetria',
      name: 'Simmetria',
      nucleo: 'spazio_e_figure',
      grade: 2,
      description: 'Comprendere il concetto intuitivo di simmetria.',
      longDescription: 'L\'alunno sviluppa una comprensione intuitiva della simmetria. Impara a riconoscere figure simmetriche, a tracciare assi di simmetria e a creare figure simmetriche attraverso il piegamento della carta.',
      difficulty: 'high',
      icon: 'flip',
      keywords: ['simmetria', 'asse di simmetria', 'figure simmetriche', 'piegamento'],
      prerequisites: ['grado2_spazio_figure_piane'],
      dependencies: [],
      learningObjectives: [
        'Riconoscere figure simmetriche',
        'Tracciare assi di simmetria',
        'Creare figure simmetriche'
      ],
      invalsiReference: 'INVALSI_G2_SP_04',
      minReference: 'MIM_PRIMARIA_SP_2'
    }
  ]
};

export default nucleoSpazioEFigure;
