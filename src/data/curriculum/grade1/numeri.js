/**
 * Nucleo: Numeri - Grado 1
 * Aritmetica e Algebra per la Classe Prima Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Numeri per Grado 1
 */
export const nucleoNumeri = {
  id: 'numeri',
  name: 'Numeri',
  description: 'Introduzione ai numeri naturali, concetto di quantità, confronto, ordinamento e prime operazioni.',
  icon: 'numbers',
  color: '#006778',
  grades: [1, 2, 3, 4, 5],
  
  /**
   * Argomenti del nucleo Numeri per Grado 1
   */
  topics: [
    {
      id: 'grado1_numeri_conteggio',
      name: 'Conteggio dei numeri',
      nucleo: 'numeri',
      grade: 1,
      description: 'Apprendere a contare in senso progressivo e regressivo entro il 20.',
      longDescription: 'L\'alunno impara a contare fino a 20 sia in avanti che all\'indietro, acquisendo familiarità con la sequenza numerica. Questo include il riconoscimento dei simboli numerici e la capacità di associarli alle quantità corrispondenti.',
      difficulty: 'low',
      icon: '123',
      keywords: ['conteggio', 'numeri', 'progressivo', 'regressivo', 'sequenza', '20'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Contare fino a 20 in senso progressivo',
        'Contare fino a 20 in senso regressivo',
        'Associare il numero alla quantità corrispondente'
      ],
      invalsiReference: 'INVALSI_G1_NUM_01',
      minReference: 'MIM_PRIMARIA_NUMERI_1'
    },
    {
      id: 'grado1_numeri_quantita',
      name: 'Concetto di quantità',
      nucleo: 'numeri',
      grade: 1,
      description: 'Comprendere e rappresentare il concetto di quantità.',
      longDescription: 'L\'alunno sviluppa la capacità di quantificare oggetti, insieme e collezione, comprendendo che i numeri rappresentano quantità specifiche.',
      difficulty: 'low',
      icon: 'filter_list',
      keywords: ['quantità', 'conteggio', 'oggetti', 'insieme', 'collezione'],
      prerequisites: ['grado1_numeri_conteggio'],
      dependencies: [],
      learningObjectives: [
        'Associare numeri a quantità di oggetti',
        'Contare il numero di elementi in un insieme',
        'Comprendere il concetto di zero'
      ],
      invalsiReference: 'INVALSI_G1_NUM_02',
      minReference: 'MIM_PRIMARIA_NUMERI_2'
    },
    {
      id: 'grado1_numeri_confronto',
      name: 'Confronto e ordinamento',
      nucleo: 'numeri',
      grade: 1,
      description: 'Imparare a confrontare e ordinare numeri naturali fino a 20.',
      longDescription: 'L\'alunno impara a usare i simboli di maggiore (>), minore (<) e uguale (=) per confrontare numeri e quantità, e a ordinare numeri in ordine crescente e decrescente.',
      difficulty: 'low',
      icon: 'compare_arrows',
      keywords: ['confronto', 'ordinamento', 'maggiore', 'minore', 'uguale', 'crescente', 'decrescente'],
      prerequisites: ['grado1_numeri_conteggio', 'grado1_numeri_quantita'],
      dependencies: [],
      learningObjectives: [
        'Usare i simboli >, <, = per confrontare numeri',
        'Ordinare numeri in ordine crescente',
        'Ordinare numeri in ordine decrescente'
      ],
      invalsiReference: 'INVALSI_G1_NUM_03',
      minReference: 'MIM_PRIMARIA_NUMERI_3'
    },
    {
      id: 'grado1_numeri_addizione',
      name: 'Addizione',
      nucleo: 'numeri',
      grade: 1,
      description: 'Introduzione al concetto di addizione come unione di quantità.',
      longDescription: 'L\'alunno riguarda l\'addizione come operazione di unione di due o più insiemi e come calcolo della somma di due o più numeri. Vengono introdotti i simboli + e =.',
      difficulty: 'low',
      icon: 'add',
      keywords: ['addizione', 'somma', 'unione', 'insiemi', 'più'],
      prerequisites: ['grado1_numeri_conteggio', 'grado1_numeri_quantita'],
      dependencies: [],
      learningObjectives: [
        'Comprendere l\'addizione come unione di insiemi',
        'Eseguire addizioni con numeri fino a 10',
        'Usare i simboli + e ='
      ],
      invalsiReference: 'INVALSI_G1_NUM_04',
      minReference: 'MIM_PRIMARIA_NUMERI_4'
    },
    {
      id: 'grado1_numeri_sottrazione',
      name: 'Sottrazione',
      nucleo: 'numeri',
      grade: 1,
      description: 'Introduzione al concetto di sottrazione come separazione e differenza.',
      longDescription: 'L\'alunno impara la sottrazione come operazione di separazione di un sottoinsieme da un insieme e come calcolo della differenza tra due numeri. Viene introdotto il simbolo -.',
      difficulty: 'low',
      icon: 'remove',
      keywords: ['sottrazione', 'differenza', 'separazione', 'meno'],
      prerequisites: ['grado1_numeri_addizione'],
      dependencies: [],
      learningObjectives: [
        'Comprendere la sottrazione come separazione',
        'Eseguire sottrazioni con numeri fino a 10',
        'Usare il simbolo -'
      ],
      invalsiReference: 'INVALSI_G1_NUM_05',
      minReference: 'MIM_PRIMARIA_NUMERI_5'
    },
    {
      id: 'grado1_numeri_valore_posizionale',
      name: 'Valore posizionale',
      nucleo: 'numeri',
      grade: 1,
      description: 'Introduzione al valore posizionale delle cifre: decine e unità.',
      longDescription: 'L\'alunno impara che i numeri a due cifre sono composti da decine e unità, e che il valore di una cifra dipende dalla sua posizione nel numero.',
      difficulty: 'mid',
      icon: 'pin',
      keywords: ['valore posizionale', 'decine', 'unità', 'cifre', 'posizione'],
      prerequisites: ['grado1_numeri_conteggio'],
      dependencies: [],
      learningObjectives: [
        'Riconoscere decine e unità in un numero',
        'Comporre numeri con decine e unità',
        'Scomporre numeri in decine e unità'
      ],
      invalsiReference: 'INVALSI_G1_NUM_06',
      minReference: 'MIM_PRIMARIA_NUMERI_6'
    },
    {
      id: 'grado1_numeri_calcolo_mentale',
      name: 'Calcolo mentale',
      nucleo: 'numeri',
      grade: 1,
      description: 'Sviluppo di strategie di calcolo mentale entro il 20.',
      longDescription: 'L\'alunno impara strategie per eseguire addizioni e sottrazioni mentalmente, come l\'uso dei numeri amici (10), la scomposizione e la composizione di numeri.',
      difficulty: 'mid',
      icon: 'psychology',
      keywords: ['calcolo mentale', 'strategie', 'numeri amici', 'scomposizione', 'composizione'],
      prerequisites: ['grado1_numeri_addizione', 'grado1_numeri_sottrazione', 'grado1_numeri_valore_posizionale'],
      dependencies: [],
      learningObjectives: [
        'Eseguire addizioni mentalmente fino a 20',
        'Eseguire sottrazioni mentalmente fino a 20',
        'Usare strategie di scomposizione e composizione'
      ],
      invalsiReference: 'INVALSI_G1_NUM_07',
      minReference: 'MIM_PRIMARIA_NUMERI_7'
    }
  ]
};

/**
 * Esportazione diretta degli argomenti
 */
export const numeriTopics = nucleoNumeri.topics;

export default nucleoNumeri;
