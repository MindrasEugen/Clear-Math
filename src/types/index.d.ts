/**
 * Tipi TypeScript per Clear-Math
 * Definizioni dei tipi per il curriculum, esercizi, teoria e progressi
 */

// ============================================================================
// TIPI BASE
// ============================================================================

/**
 * Livelli di difficolta per esercizi e argomenti
 */
export type DifficultyLevel = 'low' | 'mid' | 'high';

/**
 * Tipi di nucleo tematico (4 nuclei fondanti del programma ministeriale)
 */
export type NucleoType = 'numeri' | 'spazio_e_figure' | 'relazioni_e_funzioni' | 'dati_e_previsioni';

/**
 * Tipi di contenuto
 */
export type ContentType = 'teoria' | 'esercizio' | 'verifica' | 'gioco';

// ============================================================================
// TIPI PER GRADI E CURRICULUM
// ============================================================================

/**
 * Grado scolastico (1-13 secondo il sistema educativo italiano)
 */
export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

/**
 * Tipologia di scuola
 */
export type SchoolType = 'primaria' | 'secondaria_i_grado' | 'secondaria_ii_grado';

/**
 * Informazioni base su un grado scolastico
 */
export interface GradeInfo {
  id: Grade;
  name: string; // es: "Grado 1" o "Classe Prima Primaria"
  schoolType: SchoolType;
  className: string; // es: "Prima Primaria", "Prima Media", "Prima Superiore"
  year: number; // Anno scolastico corrispondente
  nuclei: NucleoType[]; // Nuclei attivi in questo grado
  prerequisites: Grade[]; // Gradi prerequisiti
}

/**
 * Mappa dei gradi scolastici
 */
export type GradeMap = {
  [key: number]: GradeInfo;
};

// ============================================================================
// TIPI PER NUCLEI TEMATICI
// ============================================================================

/**
 * Informazioni su un nucleo tematico
 */
export interface NucleoInfo {
  id: NucleoType;
  name: string;
  description: string;
  icon: string; // Icona Material Symbols
  color: string; // Colore associato
  grades: Grade[]; // Gradi in cui e attivo
}

/**
 * Mappa dei nuclei tematici
 */
export type NucleoMap = {
  [key in NucleoType]: NucleoInfo;
};

// ============================================================================
// TIPI PER ARGOMENTI (TOPICS)
// ============================================================================

/**
 * Argomento di matematica (Topic)
 * Rappresenta un argomento specifico all'interno di un nucleo e grado
 */
export interface Topic {
  id: string; // Identificatore univoco (es: "grado1_numeri_conteggio")
  name: string; // Nome dell'argomento
  nucleo: NucleoType; // Nucleo di appartenenza
  grade: Grade; // Grado in cui viene trattato
  description: string; // Descrizione breve
  longDescription?: string; // Descrizione estesa
  difficulty: DifficultyLevel; // Livello di difficolta
  icon: string; // Icona Material Symbols
  keywords: string[]; // Parole chiave per ricerca
  prerequisites: string[]; // ID argomenti prerequisiti
  dependencies: string[]; // Dipendenze da altri argomenti
  learningObjectives: string[]; // Obiettivi di apprendimento
  invalsiReference?: string; // Riferimento ai Quadri INVALSI
  minReference?: string; // Riferimento alle Indicazioni Nazionali MIM
}

/**
 * Argomento con contenuti associati
 */
export interface TopicWithContent extends Topic {
  theory: Theory[]; // Contenuti teorici
  exercises: Exercise[]; // Esercizi associati
  examples: Example[]; // Esempi pratici
}

/**
 * Mappa degli argomenti per grado e nucleo
 */
export type TopicMap = {
  [grade: number]: {
    [nucleo in NucleoType]?: Topic[];
  };
};

// ============================================================================
// TIPI PER TEORIA
// ============================================================================

/**
 * Contenuto teorico
 */
export interface Theory {
  id: string; // Identificatore univoco
  topicId: string; // ID dell'argomento associato
  title: string; // Titolo
  content: string; // Contenuto in Markdown/HTML
  mathContent?: string; // Contenuto matematico (LaTeX/MathJax)
  summary: string; // Riassunto
  examples: string[]; // Esempi esplicativi
  definitions: Definition[]; // Definizioni formali
  formulas: Formula[]; // Formule associate
  diagrams?: Diagram[]; // Diagrammi e illustrazioni
  videoUrl?: string; // URL video esplicativo (opzionale)
  estimatedReadingTime: number; // Tempo stimato di lettura (minuti)
  difficulty: DifficultyLevel;
}

/**
 * Definizione formale
 */
export interface Definition {
  term: string; // Termine
  definition: string; // Definizione
  notation?: string; // Notazione matematica
  example?: string; // Esempio
}

/**
 * Formula matematica
 */
export interface Formula {
  id: string;
  name: string; // Nome della formula
  latex: string; // Formula in LaTeX
  description: string; // Descrizione
  variables: Variable[]; // Variabili
  example?: string; // Esempio di applicazione
}

/**
 * Variabile in una formula
 */
export interface Variable {
  symbol: string; // Simbolo
  name: string; // Nome
  unit?: string; // Unita di misura
  description: string; // Descrizione
}

/**
 * Diagramma/Illustrazione
 */
export interface Diagram {
  id: string;
  title: string;
  svg: string; // SVG del diagramma
  description: string;
  interactive?: boolean; // Se e interattivo
  data?: any; // Dati per generazione dinamica
}

// ============================================================================
// TIPI PER ESERCIZI
// ============================================================================

/**
 * Esercizio
 */
export interface Exercise {
  id: string; // Identificatore univoco
  topicId: string; // ID dell'argomento associato
  type: ExerciseType; // Tipo di esercizio
  title: string; // Titolo
  question: string; // Domanda in Markdown/HTML
  mathQuestion?: string; // Domanda matematica (LaTeX/MathJax)
  difficulty: DifficultyLevel;
  points: number; // Punti assegnati
  estimatedTime: number; // Tempo stimato (minuti)
  answer: ExerciseAnswer; // Risposta corretta
  solution?: string; // Soluzione completa in Markdown
  hints: Hint[]; // Suggerimenti progressivi
  validationRules: ValidationRule[]; // Regole di validazione
  metadata: ExerciseMetadata;
}

/**
 * Tipi di esercizio
 */
export type ExerciseType = 
  | 'multipla' // Scelta multipla
  | 'aperta' // Risposta aperta
  | 'verofalso' // Vero/Falso
  | 'completamento' // Completamento
  | 'calcolo' // Calcolo numerico
  | 'algebrico' // Esercizio algebrico
  | 'geometrico' // Esercizio geometria
  | 'grafico' // Esercizio su grafici
  | 'dimostrazione' // Dimostrazione
  | 'problema' // Problema applicato
  | 'abbinamento' // Abbinamento
  | 'ordinamento'; // Ordinamento

/**
 * Risposta di un esercizio
 */
export interface ExerciseAnswer {
  type: AnswerType;
  value: any; // Valore dipende dal tipo
  explanation?: string; // Spiegazione della risposta
}

/**
 * Tipi di risposta
 */
export type AnswerType = 
  | 'string' // Risposta testuale
  | 'number' // Numero
  | 'boolean' // Vero/Falso
  | 'array' // Array di valori
  | 'expression' // Espressione matematica
  | 'multiple_choice' // ID opzione corretta
  | 'matching' // Mappa di abbinamenti
  | 'ordering'; // Ordine corretto

/**
 * Opzione per scelta multipla
 */
export interface MultipleChoiceOption {
  id: string;
  label: string; // Testo opzione
  mathLabel?: string; // Testo in LaTeX
  correct: boolean; // Se e la risposta corretta
  explanation?: string; // Spiegazione
}

/**
 * Suggerimento progressivo
 */
export interface Hint {
  id: string;
  level: number; // Livello (1 = piu generico, piu alto = piu specifico)
  content: string; // Contenuto del suggerimento
  penalty?: number; // Penalita per l'utilizzo (punti)
  autoShowAfter?: number; // Secondi dopo cui mostrare automaticamente
}

/**
 * Regola di validazione per le risposte
 */
export interface ValidationRule {
  id: string;
  type: ValidationType;
  pattern?: string | RegExp; // Pattern per validazione
  min?: number; // Valore minimo
  max?: number; // Valore massimo
  tolerance?: number; // Tolleraenza per numeri
  required?: boolean; // Se e obbligatorio
  customFunction?: string; // Nome funzione custom per validazione
  message: string; // Messaggio di errore
}

/**
 * Tipi di validazione
 */
export type ValidationType = 
  | 'exact' // Valore esatto
  | 'range' // Intervallo
  | 'pattern' // Pattern regex
  | 'expression' // Espressione matematica
  | 'unit' // Unita di misura
  | 'function' // Funzione custom
  | 'length'; // Lunghezza stringa

/**
 * Metadata dell'esercizio
 */
export interface ExerciseMetadata {
  author: string; // Autore
  createdAt: string; // Data creazione (ISO)
  updatedAt: string; // Data aggiornamento (ISO)
  tags: string[]; // Tag
  source?: string; // Fonte
  invalsiReference?: string; // Riferimento INVALSI
  difficultyOverride?: DifficultyLevel; // Sovrascrittura difficolta
  version: string; // Versione
}

/**
 * Esempio pratico
 */
export interface Example {
  id: string;
  title: string;
  description: string;
  steps: ExampleStep[]; // Passaggi risolutivi
}

/**
 * Passaggio di un esempio
 */
export interface ExampleStep {
  id: string;
  content: string; // Contenuto del passaggio
  mathContent?: string; // Contenuto matematico
  explanation: string; // Spiegazione
  visual?: string; // Visualizzazione (SVG/immagine)
}

// ============================================================================
// TIPI PER VERIFICHE E TEST
// ============================================================================

/**
 * Verifica/Test
 * Raccolta di esercizi per valutazione
 */
export interface Test {
  id: string;
  name: string;
  description: string;
  topicIds: string[]; // Argomenti coperti
  grade: Grade;
  nucleo?: NucleoType;
  exercises: TestExercise[]; // Esercizi nella verifica
  totalPoints: number; // Punti totali
  passingScore: number; // Punteggio minimo per superare
  duration: number; // Durata in minuti
  difficulty: DifficultyLevel;
  shuffle: boolean; // Mescolare esercizi
  randomSelection?: {
    count: number;
    from: string[];
  }; // Selezione casuale
}

/**
 * Esercizio in una verifica (con peso specifico)
 */
export interface TestExercise {
  exerciseId: string; // ID dell'esercizio
  weight: number; // Peso (moltiplicatore punti)
  order?: number; // Ordine (se non shuffle)
}

/**
 * Risultato di una verifica
 */
export interface TestResult {
  testId: string;
  userId: string;
  startedAt: string; // Ora inizio (ISO)
  completedAt: string; // Ora completamento (ISO)
  answers: TestAnswer[]; // Risposte date
  score: number; // Punteggio ottenuto
  maxScore: number; // Punteggio massimo
  percentage: number; // Percentuale
  passed: boolean; // Superato?
  timeSpent: number; // Tempo impiegato (secondi)
  feedback: string; // Feedback generale
}

/**
 * Risposta data in una verifica
 */
export interface TestAnswer {
  exerciseId: string;
  answer: any; // Risposta data
  correct: boolean; // Corretta?
  points: number; // Punti assegnati
  hintsUsed: string[]; // Suggerimenti utilizzati
  timeSpent: number; // Tempo per questo esercizio
}

// ============================================================================
// TIPI PER PROGRESSI UTENTE
// ============================================================================

/**
 * Progresso utente su un argomento
 */
export interface UserTopicProgress {
  topicId: string;
  startedAt: string; // Quando e stato iniziato
  completed: boolean; // Completato?
  completedAt?: string; // Quando completato
  exercisesAttempted: number; // Esercizi tentati
  exercisesCompleted: number; // Esercizi completati
  exercisesCorrect: number; // Esercizi corretti
  score: number; // Punteggio medio (%)
  timeSpent: number; // Tempo totale (minuti)
  lastAccessed: string; // Ultimo accesso
  difficultyLevel?: DifficultyLevel; // Livello di difficolta attuale
  mastery: MasteryLevel; // Livello di padronanza
}

/**
 * Livello di padronanza
 */
export type MasteryLevel = 'non_iniziato' | 'in_corso' | 'base' | 'intermedio' | 'avanzato' | 'padronanza';

/**
 * Progresso utente su un grado
 */
export type UserGradeProgress = {
  grade: Grade;
  startedAt: string;
  completed: boolean;
  completedAt?: string;
  topics: {
    [topicId: string]: UserTopicProgress;
  };
  totalTimeSpent: number; // Tempo totale (minuti)
  averageScore: number; // Punteggio medio (%)
  lastAccessed: string;
};

/**
 * Progresso utente completo
 */
export type UserProgress = {
  userId: string;
  grades: {
    [grade in Grade]?: UserGradeProgress;
  };
  totalTimeSpent: number; // Tempo totale (minuti)
  exercisesCompleted: number; // Esercizi completati
  achievements: Achievement[]; // Achievement sbloccati
  lastAccessed: string;
  streak: number; // Striscia giorni consecutivi
};

/**
 * Achievement (badges, premi)
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  type: AchievementType;
  data?: any; // Dati aggiuntivi
}

/**
 * Tipi di achievement
 */
export type AchievementType = 
  | 'completamento_grado' // Completato un grado
  | 'padronanza_argomento' // Padronanza di un argomento
  | 'striscia' // Striscia di giorni
  | 'punteggio_perfetto' // Punteggio perfetto
  | 'velocita' // Risolto velocemente
  | 'primo_accesso' // Primo accesso
  | 'custom'; // Custom

// ============================================================================
// TIPI PER CURRICULUM
// ============================================================================

/**
 * Struttura del curriculum per un grado
 */
export type GradeCurriculum = {
  grade: Grade;
  name: string;
  description: string;
  nuclei: {
    [nucleo in NucleoType]?: NucleoCurriculum;
  };
};

/**
 * Struttura del curriculum per un nucleo
 */
export interface NucleoCurriculum {
  id: NucleoType;
  name: string;
  description: string;
  topics: Topic[];
  learningPath: string[]; // Ordine consigliato argomenti
}

/**
 * Curriculum completo
 */
export interface FullCurriculum {
  version: string;
  lastUpdated: string;
  grades: GradeCurriculum[];
  dependencies: DependencyMap; // Mappa dipendenze
}

/**
 * Mappa delle dipendenze tra argomenti
 */
export type DependencyMap = {
  [topicId: string]: {
    prerequisites: string[];
    requiredFor: string[];
  };
};

// ============================================================================
// TIPI PER GENERATORI DI ESERCIZI
// ============================================================================

/**
 * Configurazione di un generatore di esercizi
 */
export type ExerciseGeneratorConfig = {
  topicId: string;
  exerciseType: ExerciseType;
  difficulty: DifficultyLevel;
  parameters: {
    [key: string]: any;
  };
  constraints: {
    min?: number;
    max?: number;
    exclude?: any[];
    include?: any[];
  };
};

/**
 * Risultato di un generatore di esercizi
 */
export interface GeneratedExercise {
  exercise: Exercise;
  seed: number; // Semence per riproducibilita
  metadata: {
    generatedAt: string;
    generatorVersion: string;
  };
}

// ============================================================================
// TIPI PER IMPOSTAZIONI
// ============================================================================

/**
 * Impostazioni utente
 */
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  language: string; // Codice lingua (es: 'it', 'en')
  notifications: boolean;
  sound: boolean;
  animation: boolean;
  accessibility: AccessibilitySettings;
  preferences: UserPreferences;
}

/**
 * Impostazioni di accessibilita
 */
export interface AccessibilitySettings {
  highContrast: boolean;
  dyslexiaFriendly: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  textToSpeech: boolean;
}

/**
 * Preferenze utente
 */
export interface UserPreferences {
  defaultDifficulty: DifficultyLevel;
  showHints: boolean;
  autoCheck: boolean;
  progressTracking: boolean;
  favoriteTopics: string[];
}

// ============================================================================
// TIPI PER STATISTICHE
// ============================================================================

/**
 * Statistiche utente
 */
export type UserStatistics = {
  userId: string;
  grades: {
    [grade in Grade]?: GradeStatistics;
  };
  topics: {
    [topicId: string]: TopicStatistics;
  };
  overall: OverallStatistics;
};

/**
 * Statistiche per grado
 */
export interface GradeStatistics {
  exercisesAttempted: number;
  exercisesCompleted: number;
  averageScore: number;
  timeSpent: number; // minuti
  topicsCompleted: number;
  topicsTotal: number;
}

/**
 * Statistiche per argomento
 */
export interface TopicStatistics {
  exercisesAttempted: number;
  exercisesCompleted: number;
  exercisesCorrect: number;
  averageScore: number;
  timeSpent: number; // minuti
  bestScore: number;
  worstScore: number;
}

/**
 * Statistiche generali
 */
export interface OverallStatistics {
  totalTimeSpent: number; // minuti
  totalExercises: number;
  averageScore: number;
  longestStreak: number;
  currentStreak: number;
  gradesCompleted: number;
}

// ============================================================================
// TIPI PER API E SINCRONIZZAZIONE
// ============================================================================

/**
 * Risposta API generica
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
}

/**
 * Errore API
 */
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

/**
 * Stato di sincronizzazione
 */
export interface SyncStatus {
  lastSync: string;
  synced: boolean;
  pending: string[]; // ID elementi in attesa di sync
  conflicts: SyncConflict[]; // Conflitti
}

/**
 * Conflitto di sincronizzazione
 */
export interface SyncConflict {
  id: string;
  type: 'local' | 'remote';
  localVersion: string;
  remoteVersion: string;
  resolved: boolean;
  resolution?: 'local' | 'remote' | 'merged';
}

// ============================================================================
// ESPORTI
// ============================================================================
// Tutti i tipi e le interfacce sono gia stati esportati individualmente sopra.
// Non e necessario riesportarli qui.
