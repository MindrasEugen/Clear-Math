/**
 * Nucleo: Numeri - Grado 5
 */
export const nucleoNumeri = {
  id: 'numeri',
  name: 'Numeri',
  description: 'Numerazione oltre il milione, numeri relativi, divisibilita, potenze.',
  icon: 'numbers',
  color: '#006778',
  grades: [5],
  topics: [
    {
      id: 'grado5_numeri_numerazione_milione',
      name: 'Numerazione oltre il milione',
      nucleo: 'numeri',
      grade: 5,
      description: 'Leggere, scrivere e confrontare numeri oltre il milione e i miliardi.',
      difficulty: 'low',
      icon: '123',
      keywords: ['milione', 'miliardi', 'numerazione', 'grandi numeri'],
      prerequisites: ['grado4_numeri_numerazione_100000'],
      learningObjectives: ['Leggere numeri oltre il milione', 'Scrivere numeri grandi', 'Confrontare numeri grandi']
    },
    {
      id: 'grado5_numeri_relativi',
      name: 'Numeri relativi',
      nucleo: 'numeri',
      grade: 5,
      description: 'Numeri positivi e negativi in contesti concreti (temperatura, altitudine).',
      difficulty: 'mid',
      icon: 'thermostat',
      keywords: ['numeri relativi', 'positivi', 'negativi', 'temperatura', 'altitudine'],
      prerequisites: ['grado5_numeri_numerazione_milione'],
      learningObjectives: ['Comprendere numeri negativi', 'Utilizzare numeri relativi', 'Rappresentare su retta numerica']
    },
    {
      id: 'grado5_numeri_divisibilita',
      name: 'Concetto di divisibilita',
      nucleo: 'numeri',
      grade: 5,
      description: 'Comprendere numeri primi e numeri composti.',
      difficulty: 'mid',
      icon: 'call_split',
      keywords: ['divisibilita', 'numeri primi', 'numeri composti'],
      prerequisites: ['grado5_numeri_numerazione_milione'],
      learningObjectives: ['Distinguere primi da composti', 'Trovare divisori di un numero', 'Comprendere scomposizione']
    },
    {
      id: 'grado5_numeri_criteri_divisibilita',
      name: 'Criteri di divisibilita',
      nucleo: 'numeri',
      grade: 5,
      description: 'Applicare criteri di divisibilita per 2, 3, 5, 9, 10.',
      difficulty: 'high',
      icon: 'checklist',
      keywords: ['criteri', 'divisibilita', '2', '3', '5', '9', '10'],
      prerequisites: ['grado5_numeri_divisibilita'],
      learningObjectives: ['Applicare criterio per 2', 'Applicare criterio per 3', 'Applicare criteri per 5, 9, 10']
    },
    {
      id: 'grado5_numeri_potenze',
      name: 'Potenze',
      nucleo: 'numeri',
      grade: 5,
      description: 'Calcolare potenze di un numero e potenze di 10.',
      difficulty: 'high',
      icon: 'exponent',
      keywords: ['potenze', 'base', 'esponente', 'potenze di 10'],
      prerequisites: ['grado5_numeri_numerazione_milione'],
      learningObjectives: ['Calcolare potenze', 'Comprendere potenze di 10', 'Notazione esponenziale']
    },
    {
      id: 'grado5_numeri_percentuali_avanzate',
      name: 'Percentuali avanzate',
      nucleo: 'numeri',
      grade: 5,
      description: 'Calcolare percentuali e sconti.',
      difficulty: 'high',
      icon: 'percent',
      keywords: ['percentuali', 'sconti', 'calcolo percentuale'],
      prerequisites: ['grado4_numeri_percentuali'],
      learningObjectives: ['Calcolare percentuale di un numero', 'Calcolare sconti', 'Applicare a contesti reali']
    }
  ]
};

export default nucleoNumeri;
