/**
 * Nucleo: Numeri - Grado 4
 */
export const nucleoNumeri = {
  id: 'numeri',
  name: 'Numeri',
  description: 'Numerazione fino a 100.000, numeri decimali, frazioni equivalenti, percentuali.',
  icon: 'numbers',
  color: '#006778',
  grades: [4, 5],
  topics: [
    {
      id: 'grado4_numeri_numerazione_100000',
      name: 'Numerazione fino a 100.000',
      nucleo: 'numeri',
      grade: 4,
      description: 'Leggere, scrivere e confrontare numeri fino alle centinaia di migliaia.',
      difficulty: 'low',
      icon: '123',
      keywords: ['numerazione', '100000', 'centinaia di migliaia'],
      prerequisites: ['grado3_numeri_numerazione_1000'],
      learningObjectives: ['Leggere numeri fino a 100.000', 'Scrivere numeri fino a 100.000', 'Confrontare numeri grandi']
    },
    {
      id: 'grado4_numeri_decimali',
      name: 'Numeri decimali',
      nucleo: 'numeri',
      grade: 4,
      description: 'Addizione, sottrazione, moltiplicazione e divisione con numeri decimali.',
      difficulty: 'mid',
      icon: 'fiber_manual_record',
      keywords: ['decimali', 'virgola', 'operazioni'],
      prerequisites: ['grado4_numeri_numerazione_100000'],
      learningObjectives: ['Eseguire addizioni con decimali', 'Eseguire sottrazioni con decimali', 'Moltiplicare decimali']
    },
    {
      id: 'grado4_numeri_frazioni_equivalenti',
      name: 'Frazioni equivalenti',
      nucleo: 'numeri',
      grade: 4,
      description: 'Riconoscere e generare frazioni equivalenti.',
      difficulty: 'mid',
      icon: 'compare',
      keywords: ['frazioni', 'equivalenti', 'semplificazione'],
      prerequisites: ['grado3_numeri_frazioni_introduzione'],
      learningObjectives: ['Riconoscere frazioni equivalenti', 'Generare frazioni equivalenti', 'Semplificare frazioni']
    },
    {
      id: 'grado4_numeri_frazioni_confronto',
      name: 'Confronto tra frazioni',
      nucleo: 'numeri',
      grade: 4,
      description: 'Confrontare frazioni con denominatori diversi.',
      difficulty: 'mid',
      icon: 'swap_vert',
      keywords: ['frazioni', 'confronto', 'denominatore'],
      prerequisites: ['grado4_numeri_frazioni_equivalenti'],
      learningObjectives: ['Confrontare frazioni', 'Trovare denominatore comune', 'Ordinare frazioni']
    },
    {
      id: 'grado4_numeri_frazione_numero',
      name: 'Calcolo della frazione di un numero',
      nucleo: 'numeri',
      grade: 4,
      description: 'Calcolare la frazione di un numero intero.',
      difficulty: 'high',
      icon: 'percent',
      keywords: ['frazione', 'numero', 'calcolo'],
      prerequisites: ['grado4_numeri_frazioni_confronto'],
      learningObjectives: ['Calcolare frazione di un numero', 'Applicare frazioni a contesti reali']
    },
    {
      id: 'grado4_numeri_percentuali',
      name: 'Percentuali semplici',
      nucleo: 'numeri',
      grade: 4,
      description: 'Calcolare percentuali semplici (10%, 25%, 50%).',
      difficulty: 'high',
      icon: 'pie_chart',
      keywords: ['percentuali', '10%', '25%', '50%'],
      prerequisites: ['grado4_numeri_frazione_numero'],
      learningObjectives: ['Calcolare 10% di un numero', 'Calcolare 25% di un numero', 'Calcolare 50% di un numero']
    }
  ]
};

export default nucleoNumeri;
