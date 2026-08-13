/**
 * Nucleo: Spazio e Figure - Grado 4
 */
export const nucleoSpazioEFigure = {
  id: 'spazio_e_figure',
  name: 'Spazio e Figure',
  description: 'Classificazione quadrilateri, superficie, area, trasformazioni isometriche.',
  icon: 'shape_line',
  color: '#6a3a06',
  grades: [4, 5, 6, 7, 8],
  topics: [
    {
      id: 'grado4_spazio_quadrilateri',
      name: 'Classificazione quadrilateri',
      nucleo: 'spazio_e_figure',
      grade: 4,
      description: 'Classificare trapezi, parallelogrammi, rettangoli, rombi, quadrati.',
      difficulty: 'low',
      icon: 'square_foot',
      keywords: ['quadrilateri', 'trapezi', 'parallelogrammi', 'rettangoli', 'rombi', 'quadrati'],
      learningObjectives: ['Riconoscere trapezi', 'Riconoscere parallelogrammi', 'Riconoscere rettangoli e quadrati']
    },
    {
      id: 'grado4_spazio_superficie',
      name: 'Concetto di superficie',
      nucleo: 'spazio_e_figure',
      grade: 4,
      description: 'Comprendere il concetto di superficie ed estensione piana.',
      difficulty: 'low',
      icon: 'flat',
      keywords: ['superficie', 'estensione', 'piana'],
      prerequisites: ['grado4_spazio_quadrilateri'],
      learningObjectives: ['Comprendere superficie', 'Misurare estensione piana']
    },
    {
      id: 'grado4_spazio_area',
      name: 'Area di rettangolo, quadrato e parallelogramma',
      nucleo: 'spazio_e_figure',
      grade: 4,
      description: 'Calcolare l\'area di rettangolo, quadrato e parallelogramma.',
      difficulty: 'high',
      icon: 'area_chart',
      keywords: ['area', 'rettangolo', 'quadrato', 'parallelogramma', 'formule'],
      prerequisites: ['grado4_spazio_superficie'],
      learningObjectives: ['Calcolare area rettangolo', 'Calcolare area quadrato', 'Calcolare area parallelogramma']
    },
    {
      id: 'grado4_spazio_trasformazioni',
      name: 'Trasformazioni isometriche',
      nucleo: 'spazio_e_figure',
      grade: 4,
      description: 'Comprendere traslazione, rotazione e riflessione.',
      difficulty: 'high',
      icon: 'transform',
      keywords: ['trasformazioni', 'isometriche', 'traslazione', 'rotazione', 'riflessione'],
      learningObjectives: ['Riconoscere traslazione', 'Riconoscere rotazione', 'Riconoscere riflessione']
    }
  ]
};

export default nucleoSpazioEFigure;
