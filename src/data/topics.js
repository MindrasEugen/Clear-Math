/**
 * Argomenti di Matematica per la Quarta Elementare
 * Ogni argomento ha: id, nome, descrizione, icona (Material Symbols)
 */

export const TOPICS = [
  {
    id: 'numeri',
    name: 'Numeri fino al milione',
    desc: 'Valore posizionale, scomposizione e arrotondamento dei numeri.',
    icon: 'numbers'
  },
  {
    id: 'addizioni',
    name: 'Addizioni e sottrazioni',
    desc: 'Operazioni in colonna con calcoli, riporti e prestiti per classe 4a.',
    icon: 'add'
  },
  {
    id: 'moltiplicazioni',
    name: 'Moltiplicazioni',
    desc: 'Moltiplicazioni in colonna a due cifre con algoritmo standard.',
    icon: 'close'
  },
  {
    id: 'divisioni',
    name: 'Divisioni',
    desc: 'Divisioni in colonna a una e due cifre con calcolo esatto del resto.',
    icon: 'percent'
  },
  {
    id: 'frazioni',
    name: 'Frazioni',
    desc: 'Frazioni proprie, improprie, apparenti e calcolo di frazioni complementari.',
    icon: 'pie_chart'
  },
  {
    id: 'decimali',
    name: 'Numeri decimali',
    desc: 'Addizioni e sottrazioni con la virgola, equivalenze e ordinamento.',
    icon: 'fiber_manual_record'
  },
  {
    id: 'geometria',
    name: 'Geometria piana',
    desc: 'Calcolo di perimetri e aree per quadrati, rettangoli e triangoli.',
    icon: 'square_foot'
  },
  {
    id: 'misure',
    name: 'Misure e unità',
    desc: 'Equivalenze di lunghezza, capacità, peso e calcolo delle ore.',
    icon: 'straighten'
  },
  {
    id: 'problemi',
    name: 'Problemi aritmetici',
    desc: 'Quesiti pratici a tappe con logica aritmetica e stesura del procedimento.',
    icon: 'psychology'
  },
  {
    id: 'proprieta',
    name: 'Proprietà delle operazioni',
    desc: 'Esercizi guidati su proprietà commutativa, associativa e distributiva.',
    icon: 'rule'
  },
  {
    id: 'logica',
    name: 'Logica e insiemi',
    desc: 'Serie numeriche, crivello di Eratostene, divisori e mcm/MCD.',
    icon: 'hub'
  },
  {
    id: 'dati',
    name: 'Dati e probabilità',
    desc: 'Frequenza, media aritmetica, calcolo di moda, mediana e probabilità.',
    icon: 'bar_chart'
  }
];

/**
 * Ottieni un argomento per ID
 */
export const getTopicById = (id) => TOPICS.find(t => t.id === id);

/**
 * Ottieni icona per un argomento
 */
export const getTopicIcon = (id) => {
  const topic = getTopicById(id);
  return topic ? topic.icon : 'help_outline';
};
