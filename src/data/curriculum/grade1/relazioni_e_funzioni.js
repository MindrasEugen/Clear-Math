/**
 * Nucleo: Relazioni e Funzioni - Grado 1
 * Logica e Relazioni per la Classe Prima Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Relazioni e Funzioni per Grado 1
 */
export const nucleoRelazioniEFunzioni = {
  id: 'relazioni_e_funzioni',
  name: 'Relazioni e Funzioni',
  description: 'Introduzione alla classificazione, ordinamento di oggetti e utilizzo di connettivi logici semplici.',
  icon: 'hub',
  color: '#86d2e5',
  grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  
  /**
   * Argomenti del nucleo Relazioni e Funzioni per Grado 1
   */
  topics: [
    {
      id: 'grado1_relazioni_classificazione',
      name: 'Classificazione',
      nucleo: 'relazioni_e_funzioni',
      grade: 1,
      description: 'Classificare oggetti in base a una o più proprietà.',
      longDescription: 'L\'alunno impara a classificare oggetti, figure o numeri in base a una o più proprietà (colore, forma, dimensione, ecc.). Questo Include la creazione di insiemi e la comprensione delle caratteristiche comuni.',
      difficulty: 'low',
      icon: 'category',
      keywords: ['classificazione', 'oggetti', 'proprietà', 'insiemi', 'caratteristiche', 'gruppi'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Classificare oggetti secondo un criterio dato',
        'Classificare oggetti secondo più criteri',
        'Creare e descrivere insiemi di oggetti'
      ],
      invalsiReference: 'INVALSI_G1_RF_01',
      minReference: 'MIM_PRIMARIA_RF_1'
    },
    {
      id: 'grado1_relazioni_ordinamento',
      name: 'Ordinamento',
      nucleo: 'relazioni_e_funzioni',
      grade: 1,
      description: 'Ordinare oggetti in base a grandezze.',
      longDescription: 'L\'alunno impara a ordinare oggetti, figure o grandezze in base a criteri come lunghezza, peso, capacità, altezza, ecc. Questo include l\'uso di termini come "più grande", "più piccolo", "più pesante", "più leggero".',
      difficulty: 'low',
      icon: 'sort',
      keywords: ['ordinamento', 'grandezze', 'lunghezza', 'peso', 'capacità', 'altezza', 'confronto'],
      prerequisites: ['grado1_relazioni_classificazione'],
      dependencies: [],
      learningObjectives: [
        'Ordinare oggetti per lunghezza',
        'Ordinare oggetti per peso',
        'Ordinare oggetti per capacità',
        'Usare termini comparativi corretti'
      ],
      invalsiReference: 'INVALSI_G1_RF_02',
      minReference: 'MIM_PRIMARIA_RF_2'
    },
    {
      id: 'grado1_relazioni_connettivi',
      name: 'Connettivi logici',
      nucleo: 'relazioni_e_funzioni',
      grade: 1,
      description: 'Utilizzare connettivi logici semplici.',
      longDescription: 'L\'alunno impara a utilizzare i connettivi logici "E" e "NON" per descrivere relazioni tra oggetti, proprietà e insiemi. Questo include la comprensione di frasi come "è rosso E è grande" o "NON è un quadrato".',
      difficulty: 'mid',
      icon: 'and',
      keywords: ['connettivi', 'logici', 'E', 'NON', 'relazioni', 'condizioni'],
      prerequisites: ['grado1_relazioni_classificazione'],
      dependencies: [],
      learningObjectives: [
        'Usare il connettivo logico E',
        'Usare il connettivo logico NON',
        'Combinare connettivi per descrivere proprietà complesse'
      ],
      invalsiReference: 'INVALSI_G1_RF_03',
      minReference: 'MIM_PRIMARIA_RF_3'
    }
  ]
};

/**
 * Esportazione diretta degli argomenti
 */
export const relazioniEFunzioniTopics = nucleoRelazioniEFunzioni.topics;

export default nucleoRelazioniEFunzioni;
