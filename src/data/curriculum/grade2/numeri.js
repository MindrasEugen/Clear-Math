/**
 * Nucleo: Numeri - Grado 2
 * Aritmetica e Algebra per la Classe Seconda Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Numeri per Grado 2
 */
export const nucleoNumeri = {
  id: 'numeri',
  name: 'Numeri',
  description: 'Consolidamento della numerazione decimale fino a 100, operazioni in colonna, introduzione a moltiplicazione e divisione.',
  icon: 'numbers',
  color: '#006778',
  grades: [2, 3, 4, 5],
  
  /**
   * Argomenti del nucleo Numeri per Grado 2
   */
  topics: [
    {
      id: 'grado2_numeri_sistema_decimale',
      name: 'Sistema di numerazione decimale',
      nucleo: 'numeri',
      grade: 2,
      description: 'Comprendere il valore posizionale delle cifre fino a 100.',
      longDescription: 'L\'alunno approfondisce la comprensione del sistema decimale, imparando a leggere, scrivere e confrontare numeri fino a 100, comprendendo il valore delle cifre in base alla loro posizione.',
      difficulty: 'low',
      icon: '123',
      keywords: ['sistema decimale', 'valore posizionale', 'centinaia', 'decine', 'unita', '100'],
      prerequisites: ['grado1_numeri_valore_posizionale'],
      dependencies: [],
      learningObjectives: [
        'Leggere e scrivere numeri fino a 100',
        'Comprendere il valore delle cifre in base alla posizione',
        'Confrontare numeri fino a 100'
      ],
      invalsiReference: 'INVALSI_G2_NUM_01',
      minReference: 'MIM_PRIMARIA_NUMERI_2'
    },
    {
      id: 'grado2_numeri_conteggio_100',
      name: 'Conteggio fino a 100',
      nucleo: 'numeri',
      grade: 2,
      description: 'Contare in senso progressivo e regressivo fino a 100.',
      longDescription: 'L\'alunno impara a contare fino a 100 sia in avanti che all\'indietro, con passi di 1, 2, 5 e 10. Sviluppa la capacità di contare a partire da qualsiasi numero entro il 100.',
      difficulty: 'low',
      icon: 'plus',
      keywords: ['conteggio', '100', 'progressivo', 'regressivo', 'passi'],
      prerequisites: ['grado2_numeri_sistema_decimale'],
      dependencies: [],
      learningObjectives: [
        'Contare fino a 100 in senso progressivo',
        'Contare fino a 100 in senso regressivo',
        'Contare con passi di 2, 5, 10'
      ],
      invalsiReference: 'INVALSI_G2_NUM_02',
      minReference: 'MIM_PRIMARIA_NUMERI_2'
    },
    {
      id: 'grado2_numeri_addizione_colonna',
      name: 'Addizione in colonna',
      nucleo: 'numeri',
      grade: 2,
      description: 'Eseguire addizioni in colonna con e senza cambio.',
      longDescription: 'L\'alunno impara a eseguire addizioni in colonna, prima senza cambio (es. 23 + 45) e poi con il cambio (es. 27 + 58). Sviluppa la capacità di allineare correttamente le cifre.',
      difficulty: 'low',
      icon: 'add',
      keywords: ['addizione', 'colonna', 'cambio', 'somma', 'allineamento'],
      prerequisites: ['grado2_numeri_sistema_decimale'],
      dependencies: [],
      learningObjectives: [
        'Eseguire addizioni in colonna senza cambio',
        'Eseguire addizioni in colonna con cambio',
        'Allineare correttamente le cifre'
      ],
      invalsiReference: 'INVALSI_G2_NUM_03',
      minReference: 'MIM_PRIMARIA_NUMERI_2'
    },
    {
      id: 'grado2_numeri_sottrazione_colonna',
      name: 'Sottrazione in colonna',
      nucleo: 'numeri',
      grade: 2,
      description: 'Eseguire sottrazioni in colonna con e senza prestito.',
      longDescription: 'L\'alunno impara a eseguire sottrazioni in colonna, prima senza prestito (es. 45 - 23) e poi con il prestito (es. 52 - 27). Sviluppa la capacità di gestire il prestito tra decine e unità.',
      difficulty: 'mid',
      icon: 'remove',
      keywords: ['sottrazione', 'colonna', 'prestito', 'differenza'],
      prerequisites: ['grado2_numeri_addizione_colonna'],
      dependencies: [],
      learningObjectives: [
        'Eseguire sottrazioni in colonna senza prestito',
        'Eseguire sottrazioni in colonna con prestito',
        'Comprendere il concetto di prestito'
      ],
      invalsiReference: 'INVALSI_G2_NUM_04',
      minReference: 'MIM_PRIMARIA_NUMERI_2'
    },
    {
      id: 'grado2_numeri_moltiplicazione',
      name: 'Moltiplicazione come addizione ripetuta',
      nucleo: 'numeri',
      grade: 2,
      description: 'Comprendere la moltiplicazione come addizione ripetuta.',
      longDescription: 'L\'alunno sviluppa il concetto di moltiplicazione come addizione di quantità uguali. Impara a rappresentare la moltiplicazione come schieramento di oggetti e a risolvere semplici problemi di moltiplicazione.',
      difficulty: 'mid',
      icon: 'close',
      keywords: ['moltiplicazione', 'addizione ripetuta', 'schieramento', 'prodotto'],
      prerequisites: ['grado2_numeri_sistema_decimale', 'grado2_numeri_addizione_colonna'],
      dependencies: [],
      learningObjectives: [
        'Comprendere la moltiplicazione come addizione ripetuta',
        'Rappresentare la moltiplicazione con schieramenti',
        'Risolvere semplici problemi di moltiplicazione'
      ],
      invalsiReference: 'INVALSI_G2_NUM_05',
      minReference: 'MIM_PRIMARIA_NUMERI_2'
    },
    {
      id: 'grado2_numeri_tabelline',
      name: 'Memorizzazione delle tabelline',
      nucleo: 'numeri',
      grade: 2,
      description: 'Memorizzare le tabelline da 0 a 10.',
      longDescription: 'L\'alunno inizia a memorizzare le tabelline da 0 a 10, sviluppando la capacità di richiamare rapidamente i risultati e comprendendo le relazioni tra le diverse tabelline (es. la tabellina del 5 finisce sempre con 0 o 5).',
      difficulty: 'mid',
      icon: 'format_list_numbered',
      keywords: ['tabelline', 'moltiplicazione', 'memorizzazione', '0-10'],
      prerequisites: ['grado2_numeri_moltiplicazione'],
      dependencies: [],
      learningObjectives: [
        'Memorizzare le tabelline da 0 a 5',
        'Memorizzare le tabelline da 6 a 10',
        'Riconoscere pattern nelle tabelline'
      ],
      invalsiReference: 'INVALSI_G2_NUM_06',
      minReference: 'MIM_PRIMARIA_NUMERI_2'
    },
    {
      id: 'grado2_numeri_divisione',
      name: 'Divisione come ripartizione e contenenza',
      nucleo: 'numeri',
      grade: 2,
      description: 'Comprendere la divisione come ripartizione e contenenza.',
      longDescription: 'L\'alunno sviluppa il concetto di divisione come ripartizione di una quantità in parti uguali (es. 12 caramelle divise tra 4 amici) e come contenenza (es. quante scatole da 3 matite servono per 15 matite). Impara a rappresentare la divisione con disegni e simboli.',
      difficulty: 'high',
      icon: 'percent',
      keywords: ['divisione', 'ripartizione', 'contenenza', 'quoto', 'resto'],
      prerequisites: ['grado2_numeri_moltiplicazione'],
      dependencies: [],
      learningObjectives: [
        'Comprendere la divisione come ripartizione',
        'Comprendere la divisione come contenenza',
        'Rappresentare la divisione con disegni'
      ],
      invalsiReference: 'INVALSI_G2_NUM_07',
      minReference: 'MIM_PRIMARIA_NUMERI_2'
    }
  ]
};

export default nucleoNumeri;
