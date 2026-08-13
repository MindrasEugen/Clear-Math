/**
 * Nucleo: Dati e Previsioni - Grado 2
 * Statistica e Probabilita per la Classe Seconda Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Dati e Previsioni per Grado 2
 */
export const nucleoDatiEPrevisoni = {
  id: 'dati_e_previsioni',
  name: 'Dati e Previsioni',
  description: 'Rappresentazione di dati tramite tabelle di frequenza, istogrammi e concetti base di probabilita.',
  icon: 'bar_chart',
  color: '#004d5b',
  grades: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  
  /**
   * Argomenti del nucleo Dati e Previsioni per Grado 2
   */
  topics: [
    {
      id: 'grado2_dati_tabelle_frequenza',
      name: 'Tabelle di frequenza',
      nucleo: 'dati_e_previsioni',
      grade: 2,
      description: 'Costruire e leggere tabelle di frequenza.',
      longDescription: 'L\'alunno impara a costruire e leggere tabelle di frequenza per rappresentare dati raccolti. Sviluppa la capacità di contare le occorrenze di ogni categoria e di organizzare i dati in modo sistematico.',
      difficulty: 'low',
      icon: 'table_rows',
      keywords: ['tabelle', 'frequenza', 'dati', 'frequenza', 'categorie', 'conteggio'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Costruire tabelle di frequenza',
        'Leggere tabelle di frequenza',
        'Contare occorrenze di categorie'
      ],
      invalsiReference: 'INVALSI_G2_DP_01',
      minReference: 'MIM_PRIMARIA_DP_2'
    },
    {
      id: 'grado2_dati_istogrammi',
      name: 'Istogrammi e aerogrammi semplici',
      nucleo: 'dati_e_previsioni',
      grade: 2,
      description: 'Rappresentare dati tramite istogrammi e aerogrammi semplici.',
      longDescription: 'L\'alunno impara a rappresentare dati tramite istogrammi (grafici a barre) e aerogrammi (grafici a torta semplici). Sviluppa la capacità di interpretare queste rappresentazioni grafiche e di confrontare le frequenze.',
      difficulty: 'mid',
      icon: 'bar_chart',
      keywords: ['istogrammi', 'aerogrammi', 'grafici', 'barre', 'torta', 'rappresentazione'],
      prerequisites: ['grado2_dati_tabelle_frequenza'],
      dependencies: [],
      learningObjectives: [
        'Rappresentare dati con istogrammi',
        'Interpretare istogrammi',
        'Confrontare frequenze'
      ],
      invalsiReference: 'INVALSI_G2_DP_02',
      minReference: 'MIM_PRIMARIA_DP_2'
    },
    {
      id: 'grado2_dati_probabilita_semplice',
      name: 'Probabilita semplice',
      nucleo: 'dati_e_previsioni',
      grade: 2,
      description: 'Valutare eventi in termini di probabile e poco probabile.',
      longDescription: 'L\'alunno sviluppa la capacità di valutare eventi semplici in termini di probabilità, distinguendo tra eventi probabili e poco probabili. Impara a utilizzare il linguaggio della probabilità in contesti semplici.',
      difficulty: 'high',
      icon: 'question_mark',
      keywords: ['probabilita', 'probabile', 'poco probabile', 'eventi', 'valutazione'],
      prerequisites: ['grado2_dati_tabelle_frequenza'],
      dependencies: [],
      learningObjectives: [
        'Distinguere tra eventi probabili e poco probabili',
        'Utilizzare il linguaggio della probabilità',
        'Valutare la probabilità di eventi semplici'
      ],
      invalsiReference: 'INVALSI_G2_DP_03',
      minReference: 'MIM_PRIMARIA_DP_2'
    }
  ]
};

export default nucleoDatiEPrevisoni;
