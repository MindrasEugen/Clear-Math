/**
 * Nucleo: Spazio e Figure - Grado 5
 */
export const nucleoSpazioEFigure = {
  id: 'spazio_e_figure',
  name: 'Spazio e Figure',
  description: 'Triangoli, cerchio, poligoni regolari, geometria solida, volume.',
  icon: 'shape_line',
  color: '#6a3a06',
  grades: [5, 6, 7, 8],
  topics: [
    {
      id: 'grado5_spazio_triangoli_area',
      name: 'Aree di triangoli e figure piane',
      nucleo: 'spazio_e_figure',
      grade: 5,
      description: 'Calcolare aree e perimetri di tutte le figure piane principali.',
      difficulty: 'low',
      icon: 'change_history',
      keywords: ['aree', 'perimetri', 'triangoli', 'figure piane'],
      prerequisites: ['grado4_spazio_area'],
      learningObjectives: ['Calcolare area triangolo', 'Calcolare perimetro figure', 'Risolvere problemi di area']
    },
    {
      id: 'grado5_spazio_cerchio',
      name: 'Il cerchio',
      nucleo: 'spazio_e_figure',
      grade: 5,
      description: 'Circonferenza, raggio, diametro, pi greco e area del cerchio.',
      difficulty: 'high',
      icon: 'circle',
      keywords: ['cerchio', 'circonferenza', 'raggio', 'diametro', 'pi greco', 'area'],
      prerequisites: ['grado5_spazio_triangoli_area'],
      learningObjectives: ['Comprendere elementi cerchio', 'Calcolare circonferenza', 'Calcolare area cerchio']
    },
    {
      id: 'grado5_spazio_poligoni_regolari',
      name: 'Poligoni regolari e apotema',
      nucleo: 'spazio_e_figure',
      grade: 5,
      description: 'Riconoscere poligoni regolari e comprendere l\'apotema.',
      difficulty: 'high',
      icon: 'hexagon',
      keywords: ['poligoni regolari', 'apotema', 'centro'],
      prerequisites: ['grado5_spazio_cerchio'],
      learningObjectives: ['Riconoscere poligoni regolari', 'Comprendere apotema', 'Calcolare perimetro e area']
    },
    {
      id: 'grado5_spazio_geometria_solida',
      name: 'Geometria solida',
      nucleo: 'spazio_e_figure',
      grade: 5,
      description: 'Cubi, parallelepipedi, piramidi, cilindri.',
      difficulty: 'high',
      icon: 'cube',
      keywords: ['geometria solida', 'cubo', 'parallelepipedo', 'piramide', 'cilindro'],
      prerequisites: ['grado5_spazio_poligoni_regolari'],
      learningObjectives: ['Riconoscere solidi', 'Descrivere elementi solidi', 'Comprendere sviluppo piani']
    },
    {
      id: 'grado5_spazio_volume',
      name: 'Volume e capacita',
      nucleo: 'spazio_e_figure',
      grade: 5,
      description: 'Calcolare volume e capacita dei solidi fondamentali.',
      difficulty: 'high',
      icon: '3d',
      keywords: ['volume', 'capacita', 'solidi', 'cubo', 'parallelepipedo'],
      prerequisites: ['grado5_spazio_geometria_solida'],
      learningObjectives: ['Calcolare volume cubo', 'Calcolare volume parallelepipedo', 'Convertire capacita']
    }
  ]
};

export default nucleoSpazioEFigure;
