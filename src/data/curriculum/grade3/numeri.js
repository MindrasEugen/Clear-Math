/**
 * Nucleo: Numeri - Grado 3
 * Aritmetica e Algebra per la Classe Terza Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Numeri per Grado 3
 */
export const nucleoNumeri = {
  id: 'numeri',
  name: 'Numeri',
  description: 'Estensione della numerazione decimale fino a 1000, operazioni in colonna, introduzione alle frazioni.',
  icon: 'numbers',
  color: '#006778',
  grades: [3, 4, 5],
  
  /**
   * Argomenti del nucleo Numeri per Grado 3
   */
  topics: [
    {
      id: 'grado3_numeri_numerazione_1000',
      name: 'Numerazione decimale fino a 1000',
      nucleo: 'numeri',
      grade: 3,
      description: 'Leggere, scrivere e confrontare numeri fino a 1000.',
      longDescription: 'L\'alunno estende la comprensione del sistema di numerazione decimale fino a 1000, imparando a leggere, scrivere, confrontare e ordinare numeri di tre cifre. Sviluppa la capacità di scomporre numeri in centinaia, decine e unità.',
      difficulty: 'low',
      icon: '123',
      keywords: ['numerazione', 'decimale', '1000', 'mille', 'centinaia', 'decine', 'unita'],
      prerequisites: ['grado2_numeri_sistema_decimale'],
      dependencies: [],
      learningObjectives: [
        'Leggere e scrivere numeri fino a 1000',
        'Confrontare numeri fino a 1000',
        'Scomporre numeri in centinaia, decine, unita'
      ],
      invalsiReference: 'INVALSI_G3_NUM_01',
      minReference: 'MIM_PRIMARIA_NUMERI_3'
    },
    {
      id: 'grado3_numeri_algoritmi_operazioni',
      name: 'Algoritmi delle quattro operazioni',
      nucleo: 'numeri',
      grade: 3,
      description: 'Eseguire le quattro operazioni in colonna con numeri fino a 1000.',
      longDescription: 'L\'alunno imparare a eseguire addizioni, sottrazioni, moltiplicazioni e divisioni in colonna con numeri fino a 1000, applicando correttamente gli algoritmi e gestendo cambio/prestito.',
      difficulty: 'mid',
      icon: 'calculate',
      keywords: ['algoritmi', 'operazioni', 'colonna', 'addizione', 'sottrazione', 'moltiplicazione', 'divisione'],
      prerequisites: ['grado3_numeri_numerazione_1000'],
      dependencies: [],
      learningObjectives: [
        'Eseguire addizioni in colonna con numeri fino a 1000',
        'Eseguire sottrazioni in colonna con numeri fino a 1000',
        'Eseguire moltiplicazioni in colonna con numeri fino a 1000',
        'Eseguire divisioni in colonna con numeri fino a 1000'
      ],
      invalsiReference: 'INVALSI_G3_NUM_02',
      minReference: 'MIM_PRIMARIA_NUMERI_3'
    },
    {
      id: 'grado3_numeri_proprieta_operazioni',
      name: 'Proprieta delle operazioni',
      nucleo: 'numeri',
      grade: 3,
      description: 'Applicare le proprietà commutativa, associativa e distributiva nel calcolo mentale.',
      longDescription: 'L\'alunno impara a riconoscere e applicare le proprietà delle operazioni (commutativa, associativa, distributiva) per semplificare i calcoli mentali e risparmiare tempo nelle operazioni.',
      difficulty: 'mid',
      icon: 'rule',
      keywords: ['proprieta', 'commutativa', 'associativa', 'distributiva', 'calcolo mentale'],
      prerequisites: ['grado3_numeri_algoritmi_operazioni'],
      dependencies: [],
      learningObjectives: [
        'Applicare la proprietà commutativa',
        'Applicare la proprietà associativa',
        'Applicare la proprietà distributiva'
      ],
      invalsiReference: 'INVALSI_G3_NUM_03',
      minReference: 'MIM_PRIMARIA_NUMERI_3'
    },
    {
      id: 'grado3_numeri_frazioni_introduzione',
      name: 'Introduzione alle frazioni',
      nucleo: 'numeri',
      grade: 3,
      description: 'Comprendere le frazioni come parti di un intero.',
      longDescription: 'L\'alunno sviluppa il concetto di frazione come parte di un intero, imparando a rappresentare frazioni graficamente, a leggere e scrivere frazioni, e a comprendere il significato di numeratore e denominatore.',
      difficulty: 'mid',
      icon: 'pie_chart',
      keywords: ['frazioni', 'parti', 'intero', 'numeratore', 'denominatore'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Comprendere le frazioni come parti di un intero',
        'Rappresentare frazioni graficamente',
        'Leggere e scrivere frazioni'
      ],
      invalsiReference: 'INVALSI_G3_NUM_04',
      minReference: 'MIM_PRIMARIA_NUMERI_3'
    },
    {
      id: 'grado3_numeri_frazioni_tipi',
      name: 'Frazioni proprie, improprie e apparenti',
      nucleo: 'numeri',
      grade: 3,
      description: 'Distinguere tra frazioni proprie, improprie e apparenti.',
      longDescription: 'L\'alunno impara a distinguere tra frazioni proprie (numeratore < denominatore), frazioni improprie (numeratore > denominatore) e frazioni apparenti (numeratore = denominatore). Sviluppa la capacità di confrontare frazioni semplici.',
      difficulty: 'high',
      icon: 'donut_small',
      keywords: ['frazioni', 'proprie', 'improprie', 'apparenti', 'confrontare'],
      prerequisites: ['grado3_numeri_frazioni_introduzione'],
      dependencies: [],
      learningObjectives: [
        'Distinguere frazioni proprie, improprie e apparenti',
        'Confrontare frazioni con lo stesso denominatore',
        'Confrontare frazioni con lo stesso numeratore'
      ],
      invalsiReference: 'INVALSI_G3_NUM_05',
      minReference: 'MIM_PRIMARIA_NUMERI_3'
    }
  ]
};

export default nucleoNumeri;
