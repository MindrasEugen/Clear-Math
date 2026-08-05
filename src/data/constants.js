/**
 * Costanti e configurazioni del progetto ClearMath
 */

// Livelli di difficolt√†
export const DIFFICULTY = {
  LOW: 'low',
  MID: 'mid',
  HIGH: 'high'
};

export const DIFF_LABELS = {
  [DIFFICULTY.LOW]: 'Basso',
  [DIFFICULTY.MID]: 'Medio',
  [DIFFICULTY.HIGH]: 'Avanzato'
};

// Numero minimo totale di esercizi
export const MIN_TOTAL_EXERCISES = 20;

// Numero base di esercizi per difficulty
export const BASE_EXERCISE_COUNT = {
  [DIFFICULTY.LOW]: 6,
  [DIFFICULTY.MID]: 5,
  [DIFFICULTY.HIGH]: 4
};

// Viste disponibili
export const VIEWS = {
  DASHBOARD: 'dashboard',
  WORKSPACE: 'workspace',
  REVIEW: 'review'
};

// Colori tema ClearMath
export const COLORS = {
  PRIMARY: '#004d5b',
  PRIMARY_LIGHT: '#006778',
  PRIMARY_LIGHTER: '#86d2e5',
  SURFACE: '#f8f9fa',
  SURFACE_CONTAINER: '#edeeef',
  TEXT_PRIMARY: '#191c1d',
  TEXT_SECONDARY: '#3f484b',
  ACCENT: '#6a3a06',
  BACKGROUND: '#f8f9fa'
};

// Tipografia
export const FONTS = {
  HEADLINE: 'Quicksand, sans-serif',
  BODY: 'Lexend, sans-serif'
};

// Dimensione sidebar
export const SIDEBAR_WIDTH = '256px';
export const HEADER_HEIGHT = '80px';

// Configurazione generatore random (LCG)
export const RANDOM_SEED_MULTIPLIER = 1664525;
export const RANDOM_SEED_INCREMENT = 1013904223;
