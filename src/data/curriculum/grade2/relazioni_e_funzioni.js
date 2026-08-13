/**
 * Nucleo: Relazioni e Funzioni - Grado 2
 * Logica e Relazioni per la Classe Seconda Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Relazioni e Funzioni per Grado 2
 */
export const nucleoRelazioniEFunzioni = {
  id: 'relazioni_e_funzioni',
  name: 'Relazioni e Funzioni',
  description: 'Studio delle relazioni di equivalenza e ordine, utilizzo di tabelle a doppia entrata e risoluzione di problemi aritmetici.',
  icon: 'hub',
  color: '#86d2e5',
  grades: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  
  /**
   * Argomenti del nucleo Relazioni e Funzioni per Grado 2
   */
  topics: [
    {
      id: 'grado2_relazioni_equivalenza',
      name: 'Relazioni di equivalenza',
      nucleo: 'relazioni_e_funzioni',
      grade: 2,
      description: 'Comprendere e utilizzare relazioni di equivalenza.',
      longDescription: 'L\'alunno impara a riconoscere e utilizzare relazioni di equivalenza tra insiemi e grandezze. Sviluppa la capacità di determinare se due insiemi hanno lo stesso numero di elementi e di rappresentare l\'equivalenza con simboli.',
      difficulty: 'low',
      icon: 'compare',
      keywords: ['equivalenza', 'relazioni', 'insiemi', 'uguale', 'simboli'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Riconoscere relazioni di equivalenza',
        'Determinare se due insiemi sono equivalenti',
        'Rappresentare l\'equivalenza con simboli'
      ],
      invalsiReference: 'INVALSI_G2_RF_01',
      minReference: 'MIM_PRIMARIA_RF_2'
    },
    {
      id: 'grado2_relazioni_ordine',
      name: 'Relazioni di ordine',
      nucleo: 'relazioni_e_funzioni',
      grade: 2,
      description: 'Comprendere e utilizzare relazioni di ordine.',
      longDescription: 'L\'alunno impara a utilizzare relazioni di ordine come "maggiore di", "minore di", "uguale a" per confrontare numeri, grandezze e quantità. Sviluppa la capacità di ordinare elementi in base a questi criteri.',
      difficulty: 'low',
      icon: 'sort',
      keywords: ['ordine', 'relazioni', 'maggiore', 'minore', 'uguale', 'confrontare'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Utilizzare relazioni di ordine',
        'Confrontare numeri e grandezze',
        'Ordinare elementi in base a criteri'
      ],
      invalsiReference: 'INVALSI_G2_RF_02',
      minReference: 'MIM_PRIMARIA_RF_2'
    },
    {
      id: 'grado2_relazioni_tabelle',
      name: 'Tabelle a doppia entrata',
      nucleo: 'relazioni_e_funzioni',
      grade: 2,
      description: 'Rappresentare relazioni tramite tabelle a doppia entrata.',
      longDescription: 'L\'alunno impara a rappresentare relazioni tra due insiemi utilizzando tabelle a doppia entrata. Sviluppa la capacità di leggere, interpretare e completare tabelle, e di utilizzare le tabelle per risolvere semplici problemi.',
      difficulty: 'mid',
      icon: 'table_chart',
      keywords: ['tabelle', 'doppia entrata', 'relazioni', 'rappresentazione', 'insiemi'],
      prerequisites: ['grado2_relazioni_equivalenza', 'grado2_relazioni_ordine'],
      dependencies: [],
      learningObjectives: [
        'Leggere tabelle a doppia entrata',
        'Completare tabelle a doppia entrata',
        'Utilizzare tabelle per risolvere problemi'
      ],
      invalsiReference: 'INVALSI_G2_RF_03',
      minReference: 'MIM_PRIMARIA_RF_2'
    },
    {
      id: 'grado2_relazioni_problemi',
      name: 'Problemi aritmetici a una operazione',
      nucleo: 'relazioni_e_funzioni',
      grade: 2,
      description: 'Risolvere problemi aritmetici legati all\'esperienza quotidiana.',
      longDescription: 'L\'alunno impara a risolvere problemi aritmetici a una operazione (addizione, sottrazione, moltiplicazione, divisione) legati a situazioni concrete della vita quotidiana. Sviluppa la capacità di individuare i dati, la domanda e l\'operazione appropriata.',
      difficulty: 'high',
      icon: 'psychology',
      keywords: ['problemi', 'aritmetici', 'addizione', 'sottrazione', 'moltiplicazione', 'divisione'],
      prerequisites: ['grado2_relazioni_equivalenza'],
      dependencies: [],
      learningObjectives: [
        'Individuare dati e domanda in un problema',
        'Scegliere l\'operazione appropriata',
        'Risolvere problemi aritmetici a una operazione'
      ],
      invalsiReference: 'INVALSI_G2_RF_04',
      minReference: 'MIM_PRIMARIA_RF_2'
    }
  ]
};

export default nucleoRelazioniEFunzioni;
