/**
 * Nucleo: Spazio e Figure - Grado 1
 * Geometria per la Classe Prima Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Spazio e Figure per Grado 1
 */
export const nucleoSpazioEFigure = {
  id: 'spazio_e_figure',
  name: 'Spazio e Figure',
  description: 'Introduzione all\'orientamento nello spazio, posizioni, percorsi e riconoscimento di forme geometriche semplici.',
  icon: 'shape_line',
  color: '#6a3a06',
  grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  
  /**
   * Argomenti del nucleo Spazio e Figure per Grado 1
   */
  topics: [
    {
      id: 'grado1_spazio_orientamento',
      name: 'Orientamento nello spazio',
      nucleo: 'spazio_e_figure',
      grade: 1,
      description: 'Apprendere i concetti base di orientamento spaziale.',
      longDescription: 'L\'alunno impara a orientarsi nello spazio fisico utilizzando termini come sopra/sotto, destra/sinistra, dentro/fuori, davanti/dietro. Sviluppa la capacità di descrivere la posizione di oggetti rispetto a sé stesso e ad altri punti di riferimento.',
      difficulty: 'low',
      icon: 'explore',
      keywords: ['orientamento', 'spazio', 'sopra', 'sotto', 'destra', 'sinistra', 'dentro', 'fuori', 'davanti', 'dietro'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Usare correttamente i termini di orientamento spaziale',
        'Descrivere la posizione di oggetti nello spazio',
        'Comprendere relazioni spaziali di base'
      ],
      invalsiReference: 'INVALSI_G1_SP_01',
      minReference: 'MIM_PRIMARIA_SP_1'
    },
    {
      id: 'grado1_spazio_posizioni',
      name: 'Posizioni e percorsi',
      nucleo: 'spazio_e_figure',
      grade: 1,
      description: 'Individuare posizioni e tracciare percorsi su reticolati.',
      longDescription: 'L\'alunno impara a individuare posizioni specifiche su reticolati (griglie) e a tracciare percorsi seguendo istruzioni. Questo include la comprensione di coordinate semplici in un contesto bidimensionale.',
      difficulty: 'low',
      icon: 'grid_view',
      keywords: ['posizioni', 'percorsi', 'reticolati', 'griglie', 'coordinate', 'tracglio'],
      prerequisites: ['grado1_spazio_orientamento'],
      dependencies: [],
      learningObjectives: [
        'Individuare posizioni su un reticolato',
        'Tracciare percorsi su una griglia',
        'Seguire istruzioni per trovare una posizione'
      ],
      invalsiReference: 'INVALSI_G1_SP_02',
      minReference: 'MIM_PRIMARIA_SP_2'
    },
    {
      id: 'grado1_spazio_forme',
      name: 'Forme geometriche semplici',
      nucleo: 'spazio_e_figure',
      grade: 1,
      description: 'Riconoscere e nominare forme geometriche semplici.',
      longDescription: 'L\'alunno impara a riconoscere e nominare le principali forme geometriche piane: cerchio, quadrato, rettangolo e triangolo. Impara anche a distinguere le forme nello spazio tridimensionale.',
      difficulty: 'low',
      icon: 'square',
      keywords: ['forme', 'geometriche', 'cerchio', 'quadrato', 'rettangolo', 'triangolo', 'riconoscimento'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Riconoscere il cerchio',
        'Riconoscere il quadrato',
        'Riconoscere il rettangolo',
        'Riconoscere il triangolo',
        'Distinguere forme piane da forme solide'
      ],
      invalsiReference: 'INVALSI_G1_SP_03',
      minReference: 'MIM_PRIMARIA_SP_3'
    }
  ]
};

/**
 * Esportazione diretta degli argomenti
 */
export const spazioEFigureTopics = nucleoSpazioEFigure.topics;

export default nucleoSpazioEFigure;
