/**
 * Nucleo: Dati e Previsioni - Grado 4
 */
export const nucleoDatiEPrevisoni = {
  id: 'dati_e_previsioni',
  name: 'Dati e Previsioni',
  description: 'Moda, media, mediana, grafici a linee, probabilita come rapporto.',
  icon: 'bar_chart',
  color: '#004d5b',
  grades: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  topics: [
    {
      id: 'grado4_dati_moda_media_mediana',
      name: 'Moda, media e mediana',
      nucleo: 'dati_e_previsioni',
      grade: 4,
      description: 'Calcolare moda, media aritmetica e mediana.',
      difficulty: 'mid',
      icon: 'calculate',
      keywords: ['moda', 'media', 'mediana', 'statistica'],
      prerequisites: ['grado3_dati_moda_media'],
      learningObjectives: ['Calcolare moda', 'Calcolare media', 'Calcolare mediana']
    },
    {
      id: 'grado4_dati_grafici_linee',
      name: 'Grafici a linee',
      nucleo: 'dati_e_previsioni',
      grade: 4,
      description: 'Rappresentare dati con grafici a linee.',
      difficulty: 'mid',
      icon: 'show_chart',
      keywords: ['grafici', 'linee', 'andamento', 'tempo'],
      prerequisites: ['grado4_dati_moda_media_mediana'],
      learningObjectives: ['Costruire grafici a linee', 'Leggere grafici a linee', 'Interpretare andamenti']
    },
    {
      id: 'grado4_dati_probabilita_rapporto',
      name: 'Probabilita come rapporto',
      nucleo: 'dati_e_previsioni',
      grade: 4,
      description: 'Calcolare probabilita come rapporto tra casi favorevoli e casi possibili.',
      difficulty: 'high',
      icon: 'casino',
      keywords: ['probabilita', 'rapporto', 'casi favorevoli', 'casi possibili'],
      prerequisites: ['grado4_dati_grafici_linee'],
      learningObjectives: ['Calcolare rapporto fav/poss', 'Esprimere probabilita come frazione', 'Applicare a contesti reali']
    }
  ]
};

export default nucleoDatiEPrevisoni;
