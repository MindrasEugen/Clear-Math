/**
 * Nucleo: Dati e Previsioni - Grado 1
 * Statistica e Probabilità per la Classe Prima Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Dati e Previsioni per Grado 1
 */
export const nucleoDatiEPrevisoni = {
  id: 'dati_e_previsioni',
  name: 'Dati e Previsioni',
  description: 'Introduzione alla raccolta dati, rappresentazione grafica semplice e concetti base di probabilità.',
  icon: 'bar_chart',
  color: '#004d5b',
  grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  
  /**
   * Argomenti del nucleo Dati e Previsioni per Grado 1
   */
  topics: [
    {
      id: 'grado1_dati_raccolta',
      name: 'Raccolta dati',
      nucleo: 'dati_e_previsioni',
      grade: 1,
      description: 'Raccogliere dati tramite indagini di classe.',
      longDescription: 'L\'alunno impara a raccogliere dati attraverso semplici indagini di classe (es: "Qual è il tuo colore preferito?", "Quanti fratelli hai?"). Impara a porre domande, raccogliere risposte e organizzarle in modo sistematico.',
      difficulty: 'low',
      icon: 'assessment',
      keywords: ['dati', 'raccolta', 'indagini', 'domande', 'risposte', 'organizzazione'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Porre domande per raccogliere dati',
        'Raccogliere risposte in modo sistematico',
        'Organizzare dati raccolti'
      ],
      invalsiReference: 'INVALSI_G1_DP_01',
      minReference: 'MIM_PRIMARIA_DP_1'
    },
    {
      id: 'grado1_dati_rappresentazione',
      name: 'Rappresentazione dati',
      nucleo: 'dati_e_previsioni',
      grade: 1,
      description: 'Rappresentare dati attraverso pittogrammi e ideogrammi semplici.',
      longDescription: 'L\'alunno impara a rappresentare i dati raccolti utilizzando pittogrammi (simboli che rappresentano quantità) e ideogrammi (immagini che rappresentano categorie). Questo include la creazione di grafici semplici con simboli.',
      difficulty: 'low',
      icon: 'pie_chart',
      keywords: ['rappresentazione', 'pittogrammi', 'ideogrammi', 'grafici', 'simboli', 'dati'],
      prerequisites: ['grado1_dati_raccolta'],
      dependencies: [],
      learningObjectives: [
        'Creare pittogrammi per rappresentare dati',
        'Creare ideogrammi per rappresentare categorie',
        'Leggere e interpretare rappresentazioni grafiche semplici'
      ],
      invalsiReference: 'INVALSI_G1_DP_02',
      minReference: 'MIM_PRIMARIA_DP_2'
    },
    {
      id: 'grado1_dati_probabilita',
      name: 'Concetti base di probabilità',
      nucleo: 'dati_e_previsioni',
      grade: 1,
      description: 'Comprendere concetti intuitivi di "certo", "possibile", "impossibile".',
      longDescription: 'L\'alunno sviluppa una comprensione intuitiva dei concetti di probabilità. Impara a distinguere tra eventi certi (che sicuramente accadranno), eventi possibili (che potrebbero accadere) e eventi impossibili (che non accadranno mai).',
      difficulty: 'low',
      icon: 'question_mark',
      keywords: ['probabilità', 'certo', 'possibile', 'impossibile', 'eventi', 'intuitivo'],
      prerequisites: ['grado1_dati_raccolta', 'grado1_dati_rappresentazione'],
      dependencies: [],
      learningObjectives: [
        'Distinguere eventi certi',
        'Distinguere eventi possibili',
        'Distinguere eventi impossibili',
        'Usare il linguaggio della probabilità in contesti semplici'
      ],
      invalsiReference: 'INVALSI_G1_DP_03',
      minReference: 'MIM_PRIMARIA_DP_3'
    }
  ]
};

/**
 * Esportazione diretta degli argomenti
 */
export const datiEPrevisioniTopics = nucleoDatiEPrevisoni.topics;

export default nucleoDatiEPrevisoni;
