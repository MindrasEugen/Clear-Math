/**
 * Nucleo: Dati e Previsioni - Grado 3
 * Statistica e Probabilita per la Classe Terza Primaria
 * Basato sulle Indicazioni Nazionali MIM
 */

/**
 * Configurazione del nucleo Dati e Previsioni per Grado 3
 */
export const nucleoDatiEPrevisoni = {
  id: 'dati_e_previsioni',
  name: 'Dati e Previsioni',
  description: 'Lettura e costruzione di grafici a barre, calcolo di moda e media aritmetica semplice, probabilita intuitiva.',
  icon: 'bar_chart',
  color: '#004d5b',
  grades: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  
  /**
   * Argomenti del nucleo Dati e Previsioni per Grado 3
   */
  topics: [
    {
      id: 'grado3_dati_grafici_barre',
      name: 'Grafici a barre',
      nucleo: 'dati_e_previsioni',
      grade: 3,
      description: 'Leggere e costruire grafici a barre.',
      longDescription: 'L\'alunno impara a leggere e costruire grafici a barre per rappresentare dati. Sviluppa la capacità di interpretare le informazioni rappresentate graficamente e di organizzare dati in modo efficace.',
      difficulty: 'low',
      icon: 'bar_chart',
      keywords: ['grafici', 'barre', 'dati', 'rappresentazione', 'interpretazione'],
      prerequisites: [],
      dependencies: [],
      learningObjectives: [
        'Leggere grafici a barre',
        'Costruire grafici a barre',
        'Interpretare informazioni da grafici'
      ],
      invalsiReference: 'INVALSI_G3_DP_01',
      minReference: 'MIM_PRIMARIA_DP_3'
    },
    {
      id: 'grado3_dati_moda_media',
      name: 'Moda e media aritmetica',
      nucleo: 'dati_e_previsioni',
      grade: 3,
      description: 'Calcolare moda e media aritmetica semplice.',
      longDescription: 'L\'alunno impara a calcolare la moda (il valore più frequente) e la media aritmetica semplice (la somma dei valori divisa per il numero di valori) di un insieme di dati. Sviluppa la capacità di applicare questi concetti in contesti reali.',
      difficulty: 'mid',
      icon: 'calculate',
      keywords: ['moda', 'media', 'aritmetica', 'dati', 'calcolo', 'frequenza'],
      prerequisites: ['grado3_dati_grafici_barre'],
      dependencies: [],
      learningObjectives: [
        'Calcolare la moda di un insieme di dati',
        'Calcolare la media aritmetica semplice',
        'Applicare moda e media in contesti reali'
      ],
      invalsiReference: 'INVALSI_G3_DP_02',
      minReference: 'MIM_PRIMARIA_DP_3'
    },
    {
      id: 'grado3_dati_probabilita_intuitiva',
      name: 'Probabilita intuitiva',
      nucleo: 'dati_e_previsioni',
      grade: 3,
      description: 'Quantificare intuitivamente le probabilita in contesti di gioco.',
      longDescription: 'L\'alunno sviluppa la capacità di quantificare intuitivamente le probabilità in contesti semplici di gioco (es. estrazione da un sacchetto). Impara a esprimere le probabilità come "più probabile", "meno probabile", "ugualmente probabile".',
      difficulty: 'high',
      icon: 'casino',
      keywords: ['probabilita', 'intuitiva', 'gioco', 'estrazione', 'sacchetto', 'probabile'],
      prerequisites: ['grado3_dati_grafici_barre'],
      dependencies: [],
      learningObjectives: [
        'Quantificare intuitivamente le probabilità',
        'Utilizzare termini come più probabile, meno probabile',
        'Applicare la probabilità in contesti di gioco'
      ],
      invalsiReference: 'INVALSI_G3_DP_03',
      minReference: 'MIM_PRIMARIA_DP_3'
    }
  ]
};

export default nucleoDatiEPrevisoni;
