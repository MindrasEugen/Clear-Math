/**
 * Schema JSON per la validazione dei dati del curriculum Clear-Math
 * Definizioni degli schema per argomenti, esercizi, teoria e altri contenuti
 * Basato sui tipi TypeScript definiti in src/types/index.d.ts
 */

// ============================================================================
// SCHEMA BASE
// ============================================================================

/**
 * Schema base per un oggetto con ID
 */
export const BaseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    name: { type: 'string', description: 'Nome' },
    description: { type: 'string', description: 'Descrizione breve' }
  },
  required: ['id', 'name']
};

// ============================================================================
// SCHEMA PER ARGOMENTI (TOPICS)
// ============================================================================

/**
 * Schema per un argomento (Topic)
 */
export const TopicSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^grado[1-9][0-3]_[a-z_]+$', description: 'ID nel formato gradoX_nucleo_argomento' },
    name: { type: 'string', minLength: 1, maxLength: 100, description: 'Nome dell\'argomento' },
    nucleo: {
      type: 'string',
      enum: ['numeri', 'spazio_e_figure', 'relazioni_e_funzioni', 'dati_e_previsioni'],
      description: 'Nucleo tematico di appartenenza'
    },
    grade: { type: 'number', minimum: 1, maximum: 13, description: 'Grado scolastico (1-13)' },
    description: { type: 'string', minLength: 1, maxLength: 500, description: 'Descrizione breve' },
    longDescription: { type: 'string', maxLength: 2000, description: 'Descrizione estesa' },
    difficulty: {
      type: 'string',
      enum: ['low', 'mid', 'high'],
      description: 'Livello di difficolta'
    },
    icon: { type: 'string', description: 'Icona Material Symbols' },
    keywords: {
      type: 'array',
      items: { type: 'string' },
      description: 'Parole chiave per ricerca'
    },
    prerequisites: {
      type: 'array',
      items: { type: 'string' },
      description: 'ID argomenti prerequisiti'
    },
    dependencies: {
      type: 'array',
      items: { type: 'string' },
      description: 'Dipendenze da altri argomenti'
    },
    learningObjectives: {
      type: 'array',
      items: { type: 'string' },
      description: 'Obiettivi di apprendimento'
    },
    invalsiReference: { type: 'string', description: 'Riferimento ai Quadri INVALSI' },
    minReference: { type: 'string', description: 'Riferimento alle Indicazioni Nazionali MIM' },
    metadata: {
      type: 'object',
      properties: {
        createdAt: { type: 'string', format: 'date-time', description: 'Data creazione' },
        updatedAt: { type: 'string', format: 'date-time', description: 'Data aggiornamento' },
        author: { type: 'string', description: 'Autore' },
        version: { type: 'string', description: 'Versione' }
      }
    }
  },
  required: ['id', 'name', 'nucleo', 'grade', 'description', 'difficulty', 'icon']
};

/**
 * Schema per validare un array di argomenti
 */
export const TopicsArraySchema = {
  type: 'array',
  items: TopicSchema,
  minItems: 1
};

// ============================================================================
// SCHEMA PER TEORIA
// ============================================================================

/**
 * Schema per una definizione
 */
export const DefinitionSchema = {
  type: 'object',
  properties: {
    term: { type: 'string', description: 'Termine' },
    definition: { type: 'string', description: 'Definizione' },
    notation: { type: 'string', description: 'Notazione matematica' },
    example: { type: 'string', description: 'Esempio' }
  },
  required: ['term', 'definition']
};

/**
 * Schema per una variabile
 */
export const VariableSchema = {
  type: 'object',
  properties: {
    symbol: { type: 'string', description: 'Simbolo' },
    name: { type: 'string', description: 'Nome' },
    unit: { type: 'string', description: 'Unita di misura' },
    description: { type: 'string', description: 'Descrizione' }
  },
  required: ['symbol', 'name', 'description']
};

/**
 * Schema per una formula
 */
export const FormulaSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    name: { type: 'string', description: 'Nome della formula' },
    latex: { type: 'string', description: 'Formula in LaTeX' },
    description: { type: 'string', description: 'Descrizione' },
    variables: {
      type: 'array',
      items: VariableSchema,
      description: 'Variabili'
    },
    example: { type: 'string', description: 'Esempio di applicazione' }
  },
  required: ['id', 'name', 'latex', 'description']
};

/**
 * Schema per un diagramma
 */
export const DiagramSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    title: { type: 'string', description: 'Titolo' },
    svg: { type: 'string', description: 'SVG del diagramma' },
    description: { type: 'string', description: 'Descrizione' },
    interactive: { type: 'boolean', description: 'Se e interattivo' },
    data: { type: 'object', description: 'Dati per generazione dinamica' }
  },
  required: ['id', 'title', 'svg']
};

/**
 * Schema per contenuto teorico
 */
export const TheorySchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    topicId: { type: 'string', description: 'ID dell\'argomento associato' },
    title: { type: 'string', description: 'Titolo' },
    content: { type: 'string', description: 'Contenuto in Markdown/HTML' },
    mathContent: { type: 'string', description: 'Contenuto matematico (LaTeX/MathJax)' },
    summary: { type: 'string', description: 'Riassunto' },
    examples: {
      type: 'array',
      items: { type: 'string' },
      description: 'Esempi esplicativi'
    },
    definitions: {
      type: 'array',
      items: DefinitionSchema,
      description: 'Definizioni formali'
    },
    formulas: {
      type: 'array',
      items: FormulaSchema,
      description: 'Formule associate'
    },
    diagrams: {
      type: 'array',
      items: DiagramSchema,
      description: 'Diagrammi e illustrazioni'
    },
    videoUrl: { type: 'string', format: 'uri', description: 'URL video esplicativo' },
    estimatedReadingTime: { type: 'number', minimum: 0, description: 'Tempo stimato di lettura (minuti)' },
    difficulty: {
      type: 'string',
      enum: ['low', 'mid', 'high'],
      description: 'Livello di difficolta'
    },
    metadata: {
      type: 'object',
      properties: {
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        author: { type: 'string' },
        version: { type: 'string' }
      }
    }
  },
  required: ['id', 'topicId', 'title', 'content', 'summary', 'difficulty']
};

// ============================================================================
// SCHEMA PER ESERCIZI
// ============================================================================

/**
 * Schema per opzione di scelta multipla
 */
export const MultipleChoiceOptionSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    label: { type: 'string', description: 'Testo opzione' },
    mathLabel: { type: 'string', description: 'Testo in LaTeX' },
    correct: { type: 'boolean', description: 'Se e la risposta corretta' },
    explanation: { type: 'string', description: 'Spiegazione' }
  },
  required: ['id', 'label', 'correct']
};

/**
 * Schema per risposta di un esercizio
 */
export const ExerciseAnswerSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['string', 'number', 'boolean', 'array', 'expression', 'multiple_choice', 'matching', 'ordering'],
      description: 'Tipo di risposta'
    },
    value: { description: 'Valore della risposta (dipende dal tipo)' },
    explanation: { type: 'string', description: 'Spiegazione della risposta' }
  },
  required: ['type', 'value']
};

/**
 * Schema per suggerimento progressivo
 */
export const HintSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    level: { type: 'number', minimum: 1, description: 'Livello (1 = piu generico)' },
    content: { type: 'string', description: 'Contenuto del suggerimento' },
    penalty: { type: 'number', minimum: 0, description: 'Penalita per l\'utilizzo (punti)' },
    autoShowAfter: { type: 'number', minimum: 0, description: 'Secondi dopo cui mostrare automaticamente' }
  },
  required: ['id', 'level', 'content']
};

/**
 * Schema per regola di validazione
 */
export const ValidationRuleSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    type: {
      type: 'string',
      enum: ['exact', 'range', 'pattern', 'expression', 'unit', 'function', 'length'],
      description: 'Tipo di validazione'
    },
    pattern: { type: 'string', description: 'Pattern per validazione (regex)' },
    min: { type: 'number', description: 'Valore minimo' },
    max: { type: 'number', description: 'Valore massimo' },
    tolerance: { type: 'number', minimum: 0, description: 'Tolleranza per numeri' },
    required: { type: 'boolean', description: 'Se e obbligatorio' },
    customFunction: { type: 'string', description: 'Nome funzione custom per validazione' },
    message: { type: 'string', description: 'Messaggio di errore' }
  },
  required: ['id', 'type', 'message']
};

/**
 * Schema per metadata di un esercizio
 */
export const ExerciseMetadataSchema = {
  type: 'object',
  properties: {
    author: { type: 'string', description: 'Autore' },
    createdAt: { type: 'string', format: 'date-time', description: 'Data creazione' },
    updatedAt: { type: 'string', format: 'date-time', description: 'Data aggiornamento' },
    tags: {
      type: 'array',
      items: { type: 'string' },
      description: 'Tag'
    },
    source: { type: 'string', description: 'Fonte' },
    invalsiReference: { type: 'string', description: 'Riferimento INVALSI' },
    minReference: { type: 'string', description: 'Riferimento MIM' },
    difficultyOverride: {
      type: 'string',
      enum: ['low', 'mid', 'high'],
      description: 'Sovrascrittura difficolta'
    },
    version: { type: 'string', description: 'Versione' }
  },
  required: ['author', 'createdAt', 'version']
};

/**
 * Schema per passo di un esempio
 */
export const ExampleStepSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    content: { type: 'string', description: 'Contenuto del passaggio' },
    mathContent: { type: 'string', description: 'Contenuto matematico' },
    explanation: { type: 'string', description: 'Spiegazione' },
    visual: { type: 'string', description: 'Visualizzazione (SVG/immagine)' }
  },
  required: ['id', 'content', 'explanation']
};

/**
 * Schema per esempio pratico
 */
export const ExampleSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    title: { type: 'string', description: 'Titolo' },
    description: { type: 'string', description: 'Descrizione' },
    steps: {
      type: 'array',
      items: ExampleStepSchema,
      description: 'Passaggi risolutivi'
    }
  },
  required: ['id', 'title', 'steps']
};

/**
 * Schema per esercizio
 */
export const ExerciseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Identificatore univoco' },
    topicId: { type: 'string', description: 'ID dell\'argomento associato' },
    type: {
      type: 'string',
      enum: ['multipla', 'aperta', 'verofalso', 'completamento', 'calcolo', 'algebrico', 'geometrico', 'grafico', 'dimostrazione', 'problema', 'abbinamento', 'ordinamento'],
      description: 'Tipo di esercizio'
    },
    title: { type: 'string', description: 'Titolo' },
    question: { type: 'string', description: 'Domanda in Markdown/HTML' },
    mathQuestion: { type: 'string', description: 'Domanda matematica (LaTeX/MathJax)' },
    difficulty: {
      type: 'string',
      enum: ['low', 'mid', 'high'],
      description: 'Livello di difficolta'
    },
    points: { type: 'number', minimum: 0, description: 'Punti assegnati' },
    estimatedTime: { type: 'number', minimum: 0, description: 'Tempo stimato (minuti)' },
    answer: ExerciseAnswerSchema,
    solution: { type: 'string', description: 'Soluzione completa in Markdown' },
    hints: {
      type: 'array',
      items: HintSchema,
      description: 'Suggerimenti progressivi'
    },
    validationRules: {
      type: 'array',
      items: ValidationRuleSchema,
      description: 'Regole di validazione'
    },
    options: {
      type: 'array',
      items: MultipleChoiceOptionSchema,
      description: 'Opzioni per scelta multipla'
    },
    metadata: ExerciseMetadataSchema
  },
  required: ['id', 'topicId', 'type', 'question', 'difficulty', 'points', 'answer', 'metadata']
};

/**
 * Schema per validare un array di esercizi
 */
export const ExercisesArraySchema = {
  type: 'array',
  items: ExerciseSchema,
  minItems: 1
};

// ============================================================================
// SCHEMA PER NUCLEI
// ============================================================================

/**
 * Schema per un nucleo tematico
 */
export const NucleoSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      enum: ['numeri', 'spazio_e_figure', 'relazioni_e_funzioni', 'dati_e_previsioni'],
      description: 'ID del nucleo'
    },
    name: { type: 'string', description: 'Nome del nucleo' },
    description: { type: 'string', description: 'Descrizione' },
    icon: { type: 'string', description: 'Icona Material Symbols' },
    color: { type: 'string', description: 'Colore associato' },
    grades: {
      type: 'array',
      items: { type: 'number', minimum: 1, maximum: 13 },
      description: 'Gradi in cui e attivo'
    },
    topics: TopicsArraySchema
  },
  required: ['id', 'name', 'description', 'icon', 'color', 'grades']
};

// ============================================================================
// SCHEMA PER GRADI
// ============================================================================

/**
 * Schema per informazioni di un grado
 */
export const GradeInfoSchema = {
  type: 'object',
  properties: {
    grade: { type: 'number', minimum: 1, maximum: 13, description: 'Numero del grado' },
    name: { type: 'string', description: 'Nome del grado' },
    schoolType: {
      type: 'string',
      enum: ['primaria', 'secondaria_i_grado', 'secondaria_ii_grado'],
      description: 'Tipologia di scuola'
    },
    className: { type: 'string', description: 'Nome della classe' },
    year: { type: 'number', description: 'Anno scolastico corrispondente' },
    description: { type: 'string', description: 'Descrizione' },
    nuclei: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['numeri', 'spazio_e_figure', 'relazioni_e_funzioni', 'dati_e_previsioni']
      },
      description: 'Nuclei attivi in questo grado'
    },
    prerequisites: {
      type: 'array',
      items: { type: 'number', minimum: 1, maximum: 13 },
      description: 'Gradi prerequisiti'
    },
    learningObjectives: {
      type: 'array',
      items: { type: 'string' },
      description: 'Obiettivi di apprendimento'
    }
  },
  required: ['grade', 'name', 'schoolType', 'className']
};

/**
 * Schema per curriculum di un grado
 */
export const GradeCurriculumSchema = {
  type: 'object',
  properties: {
    grade: GradeInfoSchema,
    nuclei: {
      type: 'object',
      additionalProperties: NucleoSchema,
      description: 'Nuclei del grado'
    },
    learningPath: {
      type: 'array',
      items: { type: 'string' },
      description: 'Percorso di apprendimento consigliato'
    },
    dependencies: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        properties: {
          prerequisites: {
            type: 'array',
            items: { type: 'string' }
          },
          requiredFor: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      },
      description: 'Dipendenze tra argomenti'
    }
  },
  required: ['grade']
};

// ============================================================================
// FUNZIONI DI VALIDAZIONE
// ============================================================================

/**
 * Validatore generico basato su schema
 * @param {any} data - Dati da validare
 * @param {object} schema - Schema di validazione
 * @returns {boolean} - True se valido
 */
export function validate(data, schema) {
  try {
    // Implementazione base di validazione
    // In un ambiente reale, si potrebbe usare una librerie come ajv
    if (!data || typeof data !== 'object') {
      return false;
    }

    // Verifica tipo principale
    if (schema.type && typeof data !== schema.type && !(Array.isArray(data) && schema.type === 'array')) {
      return false;
    }

    // Verifica proprietà obbligatorie
    if (schema.required) {
      for (const prop of schema.required) {
        if (!(prop in data)) {
          return false;
        }
      }
    }

    // Verifica proprietà
    if (schema.properties) {
      for (const [prop, propSchema] of Object.entries(schema.properties)) {
        if (prop in data) {
          if (!validate(data[prop], propSchema)) {
            return false;
          }
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Errore di validazione:', error);
    return false;
  }
}

/**
 * Validazione di un argomento
 */
export function validateTopic(topic) {
  return validate(topic, TopicSchema);
}

/**
 * Validazione di un esercizio
 */
export function validateExercise(exercise) {
  return validate(exercise, ExerciseSchema);
}

/**
 * Validazione di contenuto teorico
 */
export function validateTheory(theory) {
  return validate(theory, TheorySchema);
}

/**
 * Schema JSON completi per documentazione
 */
export const schemas = {
  TopicSchema,
  TheorySchema,
  ExerciseSchema,
  NucleoSchema,
  GradeInfoSchema,
  GradeCurriculumSchema
};

export default schemas;
