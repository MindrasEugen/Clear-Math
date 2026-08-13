/**
 * Nucleo: Relazioni e Funzioni - Grado 3
 * Logica e Relazioni per la Classe Terza Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Relazioni e Funzioni per Grado 3
 */
export const nucleoRelazioniEFunzioni = {
  id: 'relazioni_e_funzioni',
  name: 'Relazioni e Funzioni',
  description: 'Utilizzo di unità di misura convenzionali, risoluzione di problemi a due operazioni e uso di diagrammi.',
  icon: 'hub',
  color: '#86d2e5',
  grades: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  
  /**
   * Argomenti del nucleo Relazioni e Funzioni per Grado 3
   */
  topics: [
    {
      id: 'grado3_relazioni_unita_misura',
      name: 'Unità di misura convenzionali',
      nucleo: 'relazioni_e_funzioni',
      grade: 3,
      description: 'Utilizzare unità di misura convenzionali per lunghezza, peso e capacità.',
      longDescription: 'L\'alunno impara a utilizzare le unità di misura convenzionali: metro, centimetro e millimetro per la lunghezza; grammo e kilogrammo per il peso; litro e millilitro per la capacità. Sviluppa la capacità di convertire tra unità di misura della stessa grandezza.',
      difficulty: 'low',
      icon: 'ruler',
      keywords: ['unita', 'misura', 'lunghezza', 'peso', 'capacita', 'metro', 'grammo', 'litro'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Utilizzare unità di misura per lunghezza',
        'Utilizzare unità di misura per peso',
        'Utilizzare unità di misura per capacità'
      ],
      invalsiReference: 'INVALSI_G3_RF_01',
      minReference: 'MIM_PRIMARIA_RF_3'
    },
    {
      id: 'grado3_relazioni_problemi_due_operazioni',
      name: 'Problemi aritmetici a due operazioni',
      nucleo: 'relazioni_e_funzioni',
      grade: 3,
      description: 'Risolvere problemi aritmetici che richiedono due operazioni.',
      longDescription: 'L\'alunno impara a risolvere problemi aritmetici che richiedono due operazioni consecutive. Sviluppa la capacità di analizzare il problema, identificare le operazioni necessarie e eseguirle nell\'ordine corretto.',
      difficulty: 'mid',
      icon: 'psychology',
      keywords: ['problemi', 'aritmetici', 'due operazioni', 'analisi', 'risoluzione'],
      prerequisites: ['grado3_relazioni_unita_misura'],
      dependencies: [],
      learningObjectives: [
        'Analizzare problemi a due operazioni',
        'Identificare le operazioni necessarie',
        'Eseguire le operazioni nell\'ordine corretto'
      ],
      invalsiReference: 'INVALSI_G3_RF_02',
      minReference: 'MIM_PRIMARIA_RF_3'
    },
    {
      id: 'grado3_relazioni_diagrammi_flusso',
      name: 'Diagrammi di flusso e schemi a albero',
      nucleo: 'relazioni_e_funzioni',
      grade: 3,
      description: 'Utilizzare diagrammi di flusso e schemi a albero per la risoluzione di problemi.',
      longDescription: 'L\'alunno impara a utilizzare diagrammi di flusso e schemi a albero come strumenti visuali per la risoluzione di problemi. Sviluppa la capacità di rappresentare il processo di risoluzione e di seguire passaggi logici.',
      difficulty: 'high',
      icon: 'account_tree',
      keywords: ['diagrammi', 'flusso', 'schemi', 'albero', 'risoluzione', 'problemi'],
      prerequisites: ['grado3_relazioni_problemi_due_operazioni'],
      dependencies: [],
      learningObjectives: [
        'Creare diagrammi di flusso per problemi',
        'Utilizzare schemi a albero per risolvere problemi',
        'Seguire passaggi logici'
      ],
      invalsiReference: 'INVALSI_G3_RF_03',
      minReference: 'MIM_PRIMARIA_RF_3'
    }
  ]
};

export default nucleoRelazioniEFunzioni;
