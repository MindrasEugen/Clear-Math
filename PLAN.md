# Piano di Sviluppo - Clear-Math

**Obiettivo:** Sviluppare un'applicazione educativa completa che copra il programma nazionale di matematica italiano per i gradi 1-13, seguendo le Indicazioni Nazionali del MIM e i Quadri INVALSI.

---

## 📖 Indice
- [Analisi del Programma](#-analisi-del-programma)
- [Obiettivi del Progetto](#-obiettivi-del-progetto)
- [Architettura del Progetto](#-architettura-del-progetto)
- [Fasi di Sviluppo](#-fasi-di-sviluppo)
- [Roadmap per Grado](#-roadmap-per-grado)
- [Aspetti Tecnici](#-aspetti-tecnici)
- [Metriche di Successo](#-metriche-di-successo)
- [Rischi e Mitigazione](#-rischi-e-mitigazione)
- [Prossimi Passi Immediati](#-prossimi-passi-immediati)
- [Programma Ministeriale Dettagliato](#-appendice-programma-ministeriale-dettagliato)
- [Mappatura Programma → Fasi](#-mappatura-programma--fasi-di-sviluppo)
- [Roadmap per Grado (Dettagliata)](#-roadmap-per-grado-dettagliata)
- [Riferimenti](#-riferimenti)

---

## 📋 Analisi del Programma

### Struttura del Curriculum
- **13 gradi** suddivisi in:
  - Scuola Primaria: Gradi 1-5
  - Scuola Secondaria di I Grado: Gradi 6-8  
  - Scuola Secondaria di II Grado: Gradi 9-13

### 4 Nuclei Fondanti
1. **Numeri** (Aritmetica e Algebra)
2. **Spazio e Figure** (Geometria)
3. **Relazioni e Funzioni** (Analisi e Modellizzazione)
4. **Dati e Previsioni** (Statistica e Probabilità)

---

## 🎯 Obiettivi del Progetto

### Obiettivo Principale
Creare una piattaforma interattiva che:
- Generi esercizi personalizzati per ogni grado e nucleo tematico
- Offra spiegazioni teoriche chiare e strutturate
- Fornisca feedback immediato e soluzioni guidate
- Tracci i progressi degli studenti
- Si adatti al livello di difficoltà

### Obiettivi Secondari
- Allineamento completo con il programma ministeriale
- Supporto per insegnanti (generazione verifiche, monitoraggio classe)
- Modalità offline e online
- Accessibilità per DSA

---

## 🏗️ Architettura del Progetto

### Struttura Attuale (da repository, aggiornata 13 Agosto 2026)
```
Clear-math/
├── index.html
├── package.json
├── pnpm-workspace.yaml
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── GradeSelector.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── TopicCard.jsx
│   │   ├── DifficultySelector.jsx
│   │   ├── TopicDifficultySelector.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Modal.jsx
│   │   ├── exercise/
│   │   │   ├── ExerciseCard.jsx
│   │   │   └── ExerciseGeneratorDemo.jsx
│   │   └── navigation/
│   │       └── Breadcrumb.jsx
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ReviewPage.jsx
│   │   └── WorkspacePage.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── data/
│   │   ├── constants.js
│   │   ├── topics.js
│   │   ├── schemas.js
│   │   └── curriculum/
│   │       ├── grade1/ ... grade5/   # numeri, spazio_e_figure, relazioni_e_funzioni, dati_e_previsioni, index.js (dati completi)
│   │       └── index.js
│   ├── types/
│   │   └── index.d.ts
│   ├── styles/
│   │   └── index.css
│   └── utils/
│       ├── random.js
│       ├── exerciseGenerators.js  # legacy
│       ├── exerciseGenerators/
│       │   ├── index.js
│       │   ├── grade1/   # completo (4 nuclei)
│       │   ├── grade2/   # in completamento
│       │   ├── grade3/   # vuoto
│       │   ├── grade4/   # vuoto
│       │   └── grade5/   # vuoto
│       └── validators/
│           └── grade1/
```

**Nota**: i dati di curriculum (`src/data/curriculum/`) sono completi per i gradi 1-5. I generatori di esercizi (`src/utils/exerciseGenerators/`) coprono per intero solo il Grado 1; il Grado 2 è in completamento (vedi task LOGIC-02→07); i Gradi 3-5 sono ancora da iniziare (vedi task LOGIC-08+).

### Struttura Proposta

```
Clear-math/
├── public/
│   └── assets/
│       ├── images/
│       └── fonts/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ...
│   │   ├── navigation/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Breadcrumb.jsx
│   │   ├── exercise/
│   │   │   ├── ExerciseCard.jsx
│   │   │   ├── ExerciseGenerator.jsx
│   │   │   ├── SolutionViewer.jsx
│   │   │   └── HintSystem.jsx
│   │   ├── theory/
│   │   │   ├── TheoryCard.jsx
│   │   │   ├── ConceptViewer.jsx
│   │   │   └── FormulaDisplay.jsx
│   │   ├── progress/
│   │   │   ├── ProgressTracker.jsx
│   │   │   ├── Achievements.jsx
│   │   │   └── StatsDashboard.jsx
│   │   └── settings/
│   │       ├── DifficultySelector.jsx
│   │       └── TopicSelector.jsx
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── TheoryPage.jsx
│   │   ├── ExercisePage.jsx
│   │   ├── TestPage.jsx
│   │   ├── ReviewPage.jsx
│   │   ├── WorkspacePage.jsx
│   │   └── AdminPage.jsx
│   ├── context/
│   │   ├── AppContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── UserContext.jsx
│   │   └── SettingsContext.jsx
│   ├── data/
│   │   ├── curriculum/
│   │   │   ├── grade1/
│   │   │   │   ├── numbers.js
│   │   │   │   ├── geometry.js
│   │   │   │   ├── functions.js
│   │   │   │   └── statistics.js
│   │   │   ├── grade2/
│   │   │   └── ...
│   │   │   └── grade13/
│   │   ├── constants.js
│   │   ├── topics.js
│   │   └── difficultyLevels.js
│   ├── hooks/
│   │   ├── useExercises.js
│   │   ├── useProgress.js
│   │   └── useSettings.js
│   ├── services/
│   │   ├── exerciseService.js
│   │   ├── theoryService.js
│   │   └── storageService.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── components/
│   │   └── themes/
│   ├── utils/
│   │   ├── exerciseGenerators/
│   │   │   ├── arithmetic.js
│   │   │   ├── algebra.js
│   │   │   ├── geometry.js
│   │   │   ├── functions.js
│   │   │   └── statistics.js
│   │   ├── validators/
│   │   │   └── mathValidator.js
│   │   ├── formatters/
│   │   │   └── mathFormatter.js
│   │   └── random.js
│   └── types/
│       └── index.d.ts
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
│   ├── API.md
│   └── CONTRIBUTING.md
└── PLAN.md
```

---

## 📅 Fasi di Sviluppo

### Fase 1: Fondamenta (2-3 settimane)
**Priorità: ALTA**

#### Obiettivi
- [ ] Completare la struttura base del progetto
- [ ] Definire i tipi TypeScript per tutto il curriculum
- [ ] Implementare il sistema di navigazione tra gradi e nuclei
- [ ] Creare il database del curriculum (JSON strutturato)

#### Task Specifici
1. **Struttura Dati**
   - [ ] Creare `src/types/index.d.ts` con tutti i tipi necessari
   - [ ] Strutturare `src/data/curriculum/` con tutti i 13 gradi
   - [ ] Definire interfacce per esercizi, teoria, progressi

2. **Navigazione**
   - [ ] Implementare routing tra gradi (1-13)
   - [ ] Creare selettore nuclei tematici (4 nuclei)
   - [ ] Aggiungere breadcrumb per la navigazione

3. **UI Base**
   - [ ] Completare componenti common (Button, Card, Modal)
   - [ ] Implementare tema scuro/chiaro
   - [ ] Creare layout responsive

4. **Database Curriculum**
   - [ ] Tradurre il programma in struttura JSON
   - [ ] Aggiungere metadata a ogni argomento (difficoltà, prerequisiti)
   - [ ] Creare sistema di dipendenze tra argomenti

---

### Fase 2: Nucleo Numeri (3-4 settimane)
**Priorità: ALTA**

#### Grado 1-5 (Primaria)
- [ ] Conteggio e confronto numeri
- [ ] Addizione e sottrazione
- [ ] Moltiplicazione e divisione
- [ ] Frazioni (introduzione)
- [ ] Numeri decimali
- [ ] Potenze e numeri relativi

#### Grado 6-8 (Secondaria I Grado)
- [ ] Insiemi numerici (N, Q)
- [ ] Operazioni con frazioni
- [ ] Potenze e proprietà
- [ ] Numeri relativi (Z)
- [ ] Calcolo letterale (monomi, polinomi)

#### Grado 9-13 (Secondaria II Grado)
- [ ] Insiemi N, Z, Q, R, C
- [ ] Equazioni e disequazioni
- [ ] Sistemi di equazioni
- [ ] Radicali
- [ ] Logaritmi ed esponenziali

#### Task Tecnici
- [ ] Generatori di esercizi per ogni argomento
- [ ] Validatori di risposte
- [ ] Sistema di hint progressivi
- [ ] Spiegazioni teoriche interattive

---

### Fase 3: Nucleo Spazio e Figure (3-4 settimane)
**Priorità: ALTA**

#### Grado 1-5
- [ ] Orientamento spaziale
- [ ] Figure geometriche piane
- [ ] Perimetro e area
- [ ] Simmetria
- [ ] Geometria solida (introduzione)

#### Grado 6-8
- [ ] Enti geometrici fondamentali
- [ ] Angoli e poligoni
- [ ] Teorema di Pitagora
- [ ] Similitudine
- [ ] Circonferenza e cerchio
- [ ] Geometria solida (prismi, cilindri, ecc.)

#### Grado 9-13
- [ ] Geometria euclidea avanzata
- [ ] Geometria analitica (retta)
- [ ] Coniche (parabola, circonferenza, ellisse, iperbole)
- [ ] Geometria dello spazio 3D
- [ ] Trigonometria

#### Task Tecnici
- [ ] Disegno interattivo di figure geometriche
- [ ] Calcolatori di area, perimetro, volume
- [ ] Animazioni per teoremi (Pitagora, Talete, ecc.)
- [ ] Visualizzatore 3D per solidi

---

### Fase 4: Nucleo Relazioni e Funzioni (3-4 settimane)
**Priorità: MEDIA**

#### Grado 1-5
- [ ] Classificazione e ordinamento
- [ ] Relazioni di equivalenza
- [ ] Misure e unità di misura
- [ ] Problemi aritmetici

#### Grado 6-8
- [ ] Coordinate cartesiane
- [ ] Proporzionalità diretta e inversa
- [ ] Funzioni lineari
- [ ] Equazioni di I grado

#### Grado 9-13
- [ ] Funzioni elementari
- [ ] Funzione esponenziale e logaritmica
- [ ] Funzioni goniometriche
- [ ] Studio di funzione completo
- [ ] Limiti e continuità
- [ ] Calcolo differenziale
- [ ] Calcolo integrale
- [ ] Equazioni differenziali

#### Task Tecnici
- [ ] Grafici interattivi delle funzioni
- [ ] Strumento per lo studio di funzione
- [ ] Calcolatore di limiti e derivate
- [ ] Risolutore di equazioni differenziali

---

### Fase 5: Nucleo Dati e Previsioni (2-3 settimane)
**Priorità: MEDIA**

#### Grado 1-5
- [ ] Raccolta dati
- [ ] Grafici semplici (pittogrammi, istogrammi)
- [ ] Concetti base di probabilità
- [ ] Media, moda, mediana

#### Grado 6-8
- [ ] Statistica descrittiva
- [ ] Probabilità classica
- [ ] Eventi e spazio campionario
- [ ] Probabilità condizionata (cenni)

#### Grado 9-13
- [ ] Statistica avanzata (deviazione standard, varianza)
- [ ] Calcolo combinatorio
- [ ] Probabilità condizionata
- [ ] Teorema di Bayes
- [ ] Schema di Bernoulli
- [ ] Variabili aleatorie

#### Task Tecnici
- [ ] Generatore di dataset per esercizi
- [ ] Strumenti per creazione grafici
- [ ] Calcolatore di probabilità
- [ ] Simulatore di esperimenti aleatori

---

### Fase 6: Funzionalità Avanzate (2-3 settimane)
**Priorità: BASSA**

#### Sistema di Progressi
- [ ] Tracciamento completamento argomenti
- [ ] Sistema di achievement e badge
- [ ] Statistiche di apprendimento
- [ ] Grafici di progresso
- [ ] Report per insegnanti

#### Personalizzazione
- [ ] Profili utente (studente, insegnante, genitore)
- [ ] Piani di studio personalizzati
- [ ] Preferenze di apprendimento
- [ ] Accessibilità (DSA, disabilità visive)

#### Social e Collaborazione
- [ ] Classifiche (opzionale)
- [ ] Condivisione esercizi
- [ ] Commenti e discussioni
- [ ] Sistema di sfide

#### Offline e Sync
- [ ] Modalità offline completa
- [ ] Sincronizzazione cloud
- [ ] Backup locale

---

### Fase 7: Testing e Deployment (1-2 settimane)
**Priorità: ALTA**

#### Testing
- [ ] Test unitari per tutti i generatori di esercizi
- [ ] Test di integrazione tra componenti
- [ ] Test E2E per flussi principali
- [ ] Testing con insegnanti e studenti reali
- [ ] Correzione bug e ottimizzazioni

#### Deployment
- [ ] Configurazione CI/CD
- [ ] Build per produzione
- [ ] Documentazione utente
- [ ] Documentazione tecnica
- [ ] Rilascio versione 1.0

---

## 🎯 Roadmap per Grado

### Priorità Sviluppo per Grado

| Grado | Priorità | Motivazione |
|-------|----------|-------------|
| 1-5   | Alta     | Base per tutti i successivi, più utenti |
| 6-8   | Alta     | Consolidamento, preparazione superiore |
| 9-10  | Media    | Fundamentali per analisi matematica |
| 11    | Media    | Goniometria e trigonometria |
| 12    | Bassa    | Combinatoria e numeri complessi |
| 13    | Bassa    | Analisi matematica avanzata |

### Dipendenze tra Gradi
```
Grado 1 → Grado 2 → Grado 3 → Grado 4 → Grado 5
         ↓
Grado 6 → Grado 7 → Grado 8
         ↓
Grado 9 → Grado 10 → Grado 11 → Grado 12 → Grado 13
```

Ogni grado dipende dal completamento del precedente nello stesso nucleo tematico.

---

## 🔧 Aspetti Tecnici

### Tecnologie Utilizzate
- **Frontend:** React 18 + Vite
- **Styling:** CSS Modules o Tailwind CSS
- **State Management:** React Context + useReducer
- **Matematica:** MathJax o KaTeX per rendering formule
- **Grafici:** Chart.js o D3.js per visualizzazioni
- **Geometria:** SVG o Canvas per disegni interattivi
- **Storage:** LocalStorage + IndexedDB per offline
- **Backend (futuro):** Firebase o Supabase per sync cloud

### Librerie Consigliate
- **Matematica:** mathjs, algebra.js
- **Grafici Funzioni:** function-plot, Chart.js
- **Geometria:** paper.js, p5.js
- **UI:** Material-UI, Chakra UI o componenti custom
- **Animazioni:** framer-motion
- **Internazionalizzazione:** i18next (per futuro multilingua)

### Requisiti di Sistema
- Browser moderni (Chrome, Firefox, Safari, Edge)
- Supporto per touch device (tablet)
- Performance ottimizzata per dispositivi low-end

---

## 📊 Metriche di Successo

### KPI Tecnici
- [ ] Tempo medio generazione esercizio: < 100ms
- [ ] Accuracy validatore risposte: > 99.5%
- [ ] Copertura curriculum: 100%
- [ ] Performance su mobile: > 60 FPS
- [ ] Tempo di caricamento iniziale: < 2s

### KPI Utente
- [ ] Tasso di completamento esercizi: > 80%
- [ ] Tempo medio per argomento: in linea con programma scolastico
- [ ] Feedback positivo: > 4.5/5
- [ ] Retention a 30 giorni: > 70%
- [ ] Numero utenti attivi: > 10,000 (primo anno)

---

## 👥 Ruoli e Responsabilità

### Team Minimo (1 persona - Gino)
- **Architettura e Sviluppo:** 100%
- **Design UI/UX:** 100%
- **Testing:** 100%
- **Documentazione:** 100%
- **Deployment:** 100%

### Ruoli Futuri (se team si espande)
- **Frontend Developer:** Implementazione UI
- **Backend Developer:** API e database
- **Math Expert:** Validazione contenuti matematici
- **UX Designer:** Esperienza utente
- **QA Tester:** Testing e qualità

---

## 💰 Budget e Risorse

### Risorse Gratuite
- GitHub (repository privato gratuitamente per progetti educativi)
- Vercel/Netlify (hosting frontend)
- Firebase (free tier per backend)
- Figma (design UI)

### Risorse a Pagamento (opzionali)
- Dominio personalizzato: ~15€/anno
- Servizio cloud avanzato: ~10-50€/mese
- Asset premium (icone, illustrazioni): ~50-200€

---

## ⚠️ Rischi e Mitigazione

### Rischi Tecnici
| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Complexità matematica | Alta | Alto | Usare librerie esistenti (mathjs) |
| Performance su mobile | Media | Medio | Ottimizzare bundling, lazy loading |
| Compatibilità browser | Bassa | Basso | Usare polyfill, test cross-browser |
| Sync offline/online | Media | Alto | Implementare robusto sistema di sincronizzazione |

### Rischi di Contenuto
| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Errore nei contenuti | Media | Alto | Review con insegnanti, test estesi |
| Copertura incompleta | Media | Medio | Piano dettagliato, milestone per nucleo |
| Linguaggio non adatto | Bassa | Medio | Review con educatori |

### Rischi di Adozione
| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Bassa adozione | Media | Alto | Marketing mirato, collaborazioni con scuole |
| Competizione | Alta | Medio | Differenziazione (allineamento MIM, gratuità) |
| Monetizzazione | Bassa | Basso | Modello freemium futuro |

---

## 📝 Prossimi Passi Immediati

### Questa Settimana (Priorità Assoluta)
1. **Struttura Dati** ✅ **COMPLETATO**
   - [x] Creare `src/types/index.d.ts` con tipi base
   - [x] Iniziare a strutturare `src/data/curriculum/grade1/`
   - [x] Definire schema JSON per argomenti, esercizi, teoria

2. **UI Base** ✅ **COMPLETATO**
   - [x] Completare componenti common mancanti (Button.jsx, Card.jsx, Modal.jsx)
   - [x] Implementare navigazione tra gradi (Breadcrumb.jsx con AutoBreadcrumb e GradeBreadcrumb)
   - [x] Creare prototipo di ExerciseCard

3. **Primo Generatore** ✅ **COMPLETATO**
   - [x] Implementare generatore esercizi per Grado 1 - Numeri (conteggio, quantita, confronto, addizione/sottrazione, valore posizionale, calcolo mentale)
   - [x] Aggiungere validatore semplice (validateGrade1NumeriAnswer con validatori specifici per ogni tipo)
   - [x] Creare UI per visualizzazione e interazione (ExerciseCard, ExerciseGeneratorDemo)

### Prossime 2 Settimane
- Completare Nucleo Numeri per Gradi 1-5
- Implementare sistema di progressi base
- Aggiungere primi contenuti teorici

### Task Correnti - Selettore Grado (Priorità Assoluta)

#### ARCH-01: Aggiornare AppContext per supporto multi-grado
- **Owner**: React Architect
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - `selectedGrade` state aggiunto (default: 1, localStorage)
  - Funzioni `setSelectedGrade`, `currentGradeTopics` esposte
  - `topicDiffs` e `selectedTopics` resettati quando cambia grado
  - `exercisesByTopic` usa topics del grado corrente
- **Files**: `src/context/AppContext.jsx`
- **Notes**: Importare `getGradeTopics` da `../data/curriculum/index.js`
- **Assigned**: 2026-08-06
- **Completed**: 2026-08-06

#### LOGIC-01: Creare generatore unificato per tutti i gradi
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: ARCH-01
- **Acceptance**:
  - Nuovo file `src/utils/exerciseGenerators/index.js`
  - Funzione `generateExercises(grade, topicId, difficulty, count)`
  - Delegazione a generatori specifici per grado
  - Fallback gracefull per gradi senza generatori
- **Files**: `src/utils/exerciseGenerators/index.js`
- **Assigned**: 2026-08-06
- **Completed**: 2026-08-06

#### UI-01: Creare componente GradeSelector
- **Owner**: React Interface
- **Status**: IMPLEMENTED
- **DependsOn**: ARCH-01
- **Acceptance**:
  - Componente `GradeSelector.jsx` in `src/components/`
  - Props: `selectedGrade`, `onGradeChange`, `disabled`
  - Mostra gradi 1-5 con label "Classe Prima/Seconda/..."
  - Stile Bootstrap 5 + tema Clear-Math
  - Accessibilità completa
- **Files**: `src/components/GradeSelector.jsx`
- **Assigned**: 2026-08-06
- **Completed**: 2026-08-06

#### UI-02: Aggiornare DashboardPage per grado selezionato
- **Owner**: React Interface
- **Status**: IMPLEMENTED
- **DependsOn**: ARCH-01, UI-01, LOGIC-01
- **Acceptance**:
  - Usa `currentGradeTopics` invece di `grade1Topics`
  - Mostra `GradeSelector` nell'header
  - `handleGenerateWorksheet` usa `generateExercises(selectedGrade, ...)`
  - Testo aggiornato per grado corrente
- **Files**: `src/pages/DashboardPage.jsx`
- **Assigned**: 2026-08-06
- **Completed**: 2026-08-06

#### UI-03: Aggiornare Sidebar per grado selezionato
- **Owner**: React Interface
- **Status**: IMPLEMENTED
- **DependsOn**: ARCH-01, UI-01, LOGIC-01
- **Acceptance**:
  - Usa `currentGradeTopics` invece di `grade1Topics`
  - `handleSelectAll` usa `currentGradeTopics.length`
  - `handleGenerateWorksheet` usa `generateExercises(selectedGrade, ...)`
- **Files**: `src/components/Sidebar.jsx`
- **Assigned**: 2026-08-06
- **Completed**: 2026-08-06

#### LOGIC-02: Implementare generatori per Grado 2 - Nucleo Numeri
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - File `src/utils/exerciseGenerators/grade2/numeri.js` creato
  - Funzioni generatrici per tutti i 7 topic del nucleo Numeri (sistema decimale, conteggio 100, addizione/sottrazione in colonna, moltiplicazione, tabelline, divisione)
  - Ogni funzione usa `randomInt`, `randomChoice`, `DIFFICULTY`
  - Ogni esercizio ha struttura coerente (id, topicId, type, question, answer, difficulty, points, hints, solution, metadata)
  - Funzione `generateGrade2NumeriExercises` che mappa topicId a generatore specifico
- **Files**: `src/utils/exerciseGenerators/grade2/numeri.js`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-03: Implementare generatori per Grado 2 - Nucleo Spazio e Figure
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - File `src/utils/exerciseGenerators/grade2/spazio_e_figure.js` creato
  - Funzioni generatrici per tutti i 4 topic (linee, confine/regione, figure piane, simmetria)
  - Ogni funzione usa `randomInt`, `randomChoice`, `DIFFICULTY`
  - Ogni esercizio ha struttura coerente (id, topicId, type, question, answer, difficulty, points, hints, solution, metadata)
  - Funzione `generateGrade2SpazioEFigureExercises` che mappa topicId a generatore specifico
- **Files**: `src/utils/exerciseGenerators/grade2/spazio_e_figure.js`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-04: Implementare generatori per Grado 2 - Nucleo Relazioni e Funzioni
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - File `src/utils/exerciseGenerators/grade2/relazioni_e_funzioni.js` creato
  - Funzioni generatrici per tutti i 4 topic (equivalenza, ordine, tabelle doppia entrata, problemi aritmetici)
  - Funzione `generateGrade2RelazioniEFunzioniExercises` che mappa topicId a generatore specifico
- **Files**: `src/utils/exerciseGenerators/grade2/relazioni_e_funzioni.js`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-05: Implementare generatori per Grado 2 - Nucleo Dati e Previsioni
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - File `src/utils/exerciseGenerators/grade2/dati_e_previsioni.js` creato
  - Funzioni generatrici per tutti i 3 topic (tabelle frequenza, istogrammi/aerogrammi, probabilita semplice)
  - Funzione `generateGrade2DatiEPrevisoniExercises` che mappa topicId a generatore specifico
- **Files**: `src/utils/exerciseGenerators/grade2/dati_e_previsioni.js`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-06: Creare entry point unificato per Grado 2
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: LOGIC-02, LOGIC-03, LOGIC-04, LOGIC-05
- **Acceptance**:
  - File `src/utils/exerciseGenerators/grade2/index.js` creato
  - Importa tutti i generatori dei 4 nuclei
  - Esporta `generateGrade2Exercises(topicId, difficulty, count)`
  - Mappa correttamente topicId a nucleo a generatore specifico
- **Files**: `src/utils/exerciseGenerators/grade2/index.js`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-07: Integrare Grado 2 nell'entry point globale
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: LOGIC-06
- **Acceptance**:
  - Aggiorna `src/utils/exerciseGenerators/index.js`
  - Importa `generateGrade2Exercises` da `./grade2/index.js`
  - Rimuovi fallback per Grado 2 in `generateExercises`
  - Aggiungi `case 2: return generateGrade2Exercises(topicId, difficulty, count)`
  - Aggiorna `getGeneratorsStatus()` per Grado 2: `{ implemented: true, message: 'Generatori completi per tutti i nuclei' }`
- **Files**: `src/utils/exerciseGenerators/index.js`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

---

## 🎯 Generatori Gradi 3-5 (Completato)

Il curriculum dati (`src/data/curriculum/grade3|4|5/`) e i generatori di esercizi (`src/utils/exerciseGenerators/grade3|4|5/`) sono ora completi per tutti e 4 i nuclei, sul modello di LOGIC-02→07. Con questo, **tutta la Scuola Primaria (Gradi 1-5) ha generatori di esercizi completi e funzionanti**, verificato con build di produzione e smoke test su tutte le 252 combinazioni argomento/difficolta.

#### LOGIC-08: Implementare generatori per Grado 3 (tutti i nuclei) ed entry point
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - File `src/utils/exerciseGenerators/grade3/{numeri,spazio_e_figure,relazioni_e_funzioni,dati_e_previsioni}.js` creati, con generatori per ogni topic definito in `src/data/curriculum/grade3/`
  - File `src/utils/exerciseGenerators/grade3/index.js` con `generateGrade3Exercises(topicId, difficulty, count)`
  - Struttura esercizio coerente con i generatori di Grado 1-2
- **Files**: `src/utils/exerciseGenerators/grade3/`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-09: Integrare Grado 3 nell'entry point globale
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: LOGIC-08
- **Acceptance**:
  - Aggiorna `src/utils/exerciseGenerators/index.js`: rimuovi fallback per Grado 3, aggiungi `case 3`, aggiorna `getGeneratorsStatus()`
- **Files**: `src/utils/exerciseGenerators/index.js`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-10: Implementare generatori per Grado 4 (tutti i nuclei) ed entry point
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - File `src/utils/exerciseGenerators/grade4/{numeri,spazio_e_figure,relazioni_e_funzioni,dati_e_previsioni}.js` creati, con generatori per ogni topic definito in `src/data/curriculum/grade4/`
  - File `src/utils/exerciseGenerators/grade4/index.js` con `generateGrade4Exercises(topicId, difficulty, count)`
- **Files**: `src/utils/exerciseGenerators/grade4/`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-11: Integrare Grado 4 nell'entry point globale
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: LOGIC-10
- **Acceptance**:
  - Aggiorna `src/utils/exerciseGenerators/index.js`: rimuovi fallback per Grado 4, aggiungi `case 4`, aggiorna `getGeneratorsStatus()`
- **Files**: `src/utils/exerciseGenerators/index.js`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-12: Implementare generatori per Grado 5 (tutti i nuclei) ed entry point
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - File `src/utils/exerciseGenerators/grade5/{numeri,spazio_e_figure,relazioni_e_funzioni,dati_e_previsioni}.js` creati, con generatori per ogni topic definito in `src/data/curriculum/grade5/`
  - File `src/utils/exerciseGenerators/grade5/index.js` con `generateGrade5Exercises(topicId, difficulty, count)`
- **Files**: `src/utils/exerciseGenerators/grade5/`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13

#### LOGIC-13: Integrare Grado 5 nell'entry point globale
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: LOGIC-12
- **Acceptance**:
  - Aggiorna `src/utils/exerciseGenerators/index.js`: rimuovi fallback per Grado 5, aggiungi `case 5`, aggiorna `getGeneratorsStatus()`
  - A questo punto `generateFallbackExercises` non e piu referenziato da nessun grado supportato ed e stato rimosso
- **Files**: `src/utils/exerciseGenerators/index.js`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13
- **Notes**: Trovato e corretto anche un bug pre-esistente in `grade1/index.js`: la mappatura topicId->nucleo usava `split('_')[1]`, che non funzionava per i nuclei con nome composto (spazio_e_figure, relazioni_e_funzioni, dati_e_previsioni), facendo generare esercizi del nucleo sbagliato (numeri) per 12 dei 16 argomenti di Grado 1. Corretto con lo stesso pattern a prefisso usato nei Gradi 2-5.

---

## 🐛 Bug di Navigazione Corretti (13 Agosto 2026)

Durante il test manuale dell'app (`npm run dev` + browser) sono stati trovati e corretti due bug bloccanti non legati ai generatori:

- **Area di Lavoro in crash per Gradi 2-5**: `WorkspacePage.jsx` usava `getGrade1TopicById` (hardcoded al Grado 1) per recuperare i metadati dell'argomento, causando `TypeError: Cannot read properties of undefined (reading 'icon')` per qualsiasi grado diverso da 1. Corretto con `getAnyTopicById` (grado-agnostico, gia presente in `curriculum/index.js`).
- **"Centro Ripasso" irraggiungibile dalla nav bar**: `Header.jsx` passava `item.id` (es. `"review"`) invece di `item.path` (es. `"/review"`) a `navigate()`, causando una risoluzione di path relativa (es. `/workspace/review`) che finiva sempre sulla route di fallback (Dashboard). Corretto passando `item.path`. Anche l'evidenziazione del tab attivo (`currentView`) era rotta perche nessuno chiamava mai `switchView` dal context; ora deriva da `useLocation().pathname` in `Header.jsx`.

---

## 🎯 Esportazione PDF e Salvataggio Progressi (Completato)

Le due funzionalita "Alta Priorita" indicate in README come prossimi passi sono state implementate.

#### FEAT-01: Esportazione PDF reale della scheda
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - Nuovo servizio `src/services/pdfService.js` con `generateWorksheetPdf()` e `downloadWorksheetPdf()`, basato su jsPDF (gia dipendenza del progetto)
  - Genera un PDF multi-pagina con titolo, dati studente, sezioni per argomento, domande numerate (HTML delle domande in colonna convertito in testo semplice) e risposte (scelte multiple elencate A/B/C/D, oppure riga vuota o risposta inserita dallo studente)
  - Collegato sia al pulsante "Scarica PDF" nell'header sia a "Finalizza e Scarica PDF" in Area di Lavoro (prima erano entrambi placeholder `console.log`)
- **Files**: `src/services/pdfService.js`, `src/components/Header.jsx`, `src/pages/WorkspacePage.jsx`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13
- **Notes**: Verificato generando un PDF reale via script Node (header `%PDF-`, multi-pagina, ~13KB per 4 argomenti/22 esercizi). Non verificato il click di download nel browser stesso per non innescare un download non richiesto durante il testing automatico.

#### FEAT-02: Salvataggio progressi (risposte e statistiche)
- **Owner**: React Engine
- **Status**: IMPLEMENTED
- **DependsOn**: -
- **Acceptance**:
  - Input risposta in Area di Lavoro ora e controllato (prima era un `<input>` scollegato, nessuna risposta veniva mai salvata)
  - Nuovo `src/utils/answerValidator.js` per il confronto normalizzato risposta studente / risposta attesa
  - Nuovo pulsante "Verifica Risposte" che marca ogni esercizio con feedback visivo (bordo verde/rosso, icona) e registra i risultati
  - `AppContext` esteso con `studentAnswers`, `progressStats` (totali e giornalieri, reset automatico al cambio data), persistiti in `localStorage`; un esercizio viene conteggiato una sola volta anche se verificato piu volte
  - Barra di progresso in Area di Lavoro ora riflette la percentuale reale di esercizi con risposta inserita (prima era fissa al 50%)
  - "I Tuoi Progressi" nel Centro Ripasso mostra ora "Risolti Oggi" e "Risposte Corrette" reali (prima erano hardcoded a 0)
- **Files**: `src/context/AppContext.jsx`, `src/utils/answerValidator.js`, `src/pages/WorkspacePage.jsx`, `src/pages/ReviewPage.jsx`
- **Assigned**: 2026-08-13
- **Completed**: 2026-08-13
- **Notes**: Verificato nel browser: risposta corretta/sbagliata segnalate correttamente, statistiche persistite correttamente anche dopo un refresh completo della pagina (non solo navigazione client-side). Il confronto risposta e "best effort" (normalizzato ma esatto) coerente con il formato di `exercise.answer.value` gia usato dai generatori; non gestisce equivalenze semantiche (es. "1/2" vs "0.5").
- **Non incluso in questa iterazione**: nome della classe corretto in `WorkspacePage.jsx` (era hardcoded "Classe Quarta Elementare", ora usa `getGradeInfo(selectedGrade)`); la "Sfida Rapida" nel Centro Ripasso resta un mini-gioco a se, non ancora integrata nelle statistiche di progresso persistite.

---

## 📚 Appendice: Programma Ministeriale Dettagliato

*Fonte: Indicazioni Nazionali MIM, Quadri di Riferimento INVALSI*

Questa appendice contiene il programma completo di matematica per tutti i 13 gradi del sistema educativo italiano, organizzato secondo i 4 nuclei fondanti: **Numeri**, **Spazio e Figure**, **Relazioni e Funzioni**, **Dati e Previsioni**.

---

### 🏫 Scuola Primaria (Gradi 1 - 5)

#### Grado 1 (Classe Prima Primaria)

**1. Numeri**
- Conteggio in senso progressivo e regressivo entro il 20
- Concetto di quantità, confronto e ordinamento di numeri (simboli `>`, `<`, `=`)
- Concetto di addizione e sottrazione come unione, separazione e calcolo di differenze
- Valore posizionale delle cifre: decine e unità
- Calcolo mentale entro il 20 e strategie di composizione/scomposizione

**2. Spazio e Figure**
- Orientamento nello spazio (sopra/sotto, destra/sinistra, dentro/fuori, davanti/dietro)
- Individuazione di posizioni e percorsi su reticolati
- Riconoscimento di forme geometriche semplici nello spazio e nel piano (cerchio, quadrato, rettangolo, triangolo)

**3. Relazioni e Funzioni**
- Classificazione di oggetti in base a una o più proprietà
- Ordinamento di oggetti in base a grandezze (lunghezza, peso, capacità)
- Utilizzo di connettivi logici semplici (E, NON)

**4. Dati e Previsioni**
- Raccolta di dati tramite indagini di classe
- Rappresentazione di dati attraverso pittogrammi e ideogrammi semplici
- Concetti intuitivi di "certo", "possibile", "impossibile"

---

#### Grado 2 (Classe Seconda Primaria)

**1. Numeri**
- Il sistema di numerazione decimale fino a 100
- Addizioni e sottrazioni in colonna con e senza cambio
- Concetto di moltiplicazione come addizione ripetuta e schieramento
- Memorizzazione delle tabelline (da 0 a 10)
- Concetto di divisione come ripartizione e contenenza

**2. Spazio e Figure**
- Linee aperte, chiuse, intrecciate, rette, curve e spezzate
- Confine, regione interna ed esterna
- Riconoscimento e disegno di figure geometriche piane elementari
- Concetto intuitivo di simmetria e tracciamento di assi di simmetria interni

**3. Relazioni e Funzioni**
- Relazioni di equivalenza e di ordine
- Tabelle a doppia entrata per rappresentare relazioni
- Risoluzione di problemi aritmetici a una operazione legati all'esperienza quotidiana

**4. Dati e Previsioni**
- Tabelle di frequenza e istogrammi/aerogrammi semplici
- Confronto tra frequenze
- Valutazione di eventi semplici in termini di probabile/poco probabile

---

#### Grado 3 (Classe Terza Primaria)

**1. Numeri**
- Estensione della numerazione decimale fino a 1.000
- Algoritmi delle quattro operazioni in colonna
- Proprietà delle operazioni (commutativa, associativa, distributiva) utilizzate nel calcolo mentale
- Introduzione alle frazioni come parti di un intero
- Frazioni proprie, improprie ed apparenti (primi cenni)

**2. Spazio e Figure**
- Rette incidenti, parallele, perpendicolari
- Gli angoli: retto, acuto, ottuso, piatto, giro
- I poligoni: definizione, vertici, lati, diagonali
- Classificazione dei triangoli in base ai lati e agli angoli
- Concetto di perimetro e misurazione tramite unità non convenzionali e convenzionali

**3. Relazioni e Funzioni**
- Unità di misura convenzionali per lunghezza, peso, capacità
- Problemi aritmetici a due operazioni
- Uso di diagrammi di flusso e schemi a albero per la risoluzione di problemi

**4. Dati e Previsioni**
- Lettura e costruzione di grafici a barre
- Calcolo della moda e della media aritmetica semplice
- Quantificazione intuitiva delle probabilità in contesti di gioco (es. estrazione da un sacchetto)

---

#### Grado 4 (Classe Quarta Primaria)

**1. Numeri**
- Numerazione decimale fino alle centinaia di migliaia (100.000)
- Calcolo con numeri decimali (addizione, sottrazione, moltiplicazione e divisione)
- Relazione tra frazioni e numeri decimali
- Frazioni equivalenti e confronto tra frazioni
- Calcolo della frazione di un numero

**2. Spazio e Figure**
- Classificazione dettagliata dei quadrilateri (trapezi, parallelogrammi, rettangoli, rombi, quadrati)
- Concetto di superficie ed estensione piana
- Formule per il calcolo dell'area di rettangolo, quadrato e parallelogramma
- Trasformazioni isometriche: traslazione, rotazione, riflessione

**3. Relazioni e Funzioni**
- Il Sistema Monetario Europeo (Euro) e calcolo di compravendita (costo unitario, costo totale, spesa, guadagno, ricavo)
- Sistema Metrico Decimale: equivalenze tra unità di misura di lunghezza, massa, capacità
- Problemi con frazioni e percentuali semplici (10%, 25%, 50%)

**4. Dati e Previsioni**
- Moda, media e mediana
- Rappresentazione grafica di dati con aerogrammi e grafici a linee
- Calcolo della probabilità come rapporto tra casi favorevoli e casi possibili in situazioni semplici

---

#### Grado 5 (Classe Quinta Primaria)

**1. Numeri**
- Estensione della numerazione oltre il milione e i miliardi
- Numeri relativi (positivi e negativi) in contesti concreti (temperatura, altitudine)
- Concetto di divisibilità, numeri primi e numeri composti
- Criteri di divisibilità (per 2, 3, 5, 9, 10)
- Calcolo di percentuali e sconti
- Potenze di un numero e potenze di 10

**2. Spazio e Figure**
- Triangoli e quadrilateri: aree e perimetri di tutte le figure piane principali
- Il cerchio: circonferenza, raggio, diametro, pi greco (π) ed area del cerchio
- Poligoni regolari e apotema
- Introduzione alla geometria solida: cubi, parallelepipedi, piramidi, cilindri
- Calcolo di volume e capacità dei solidi fondamentali

**3. Relazioni e Funzioni**
- Equivalenze avanzate e unità di misura di superficie (m²) e volume (m³)
- Peso lordo, peso netto, tara
- Concetto di scala di ingrandimento e riduzione (carte geografiche, mappe)
- Problemi complessi con approccio grafico/modellistico (metodo del segmento)

**4. Dati e Previsioni**
- Analisi critica di indagini statistiche
- Rappresentazione di dati complessi e tabelle incrociate
- Probabilità espressa sotto forma di frazione, decimale e percentuale

---

### 🏫 Scuola Secondaria di Primo Grado (Gradi 6 - 8)

#### Grado 6 (Classe Prima Media)

**1. Numeri**
- **Insiemi e Aritmetica:** Insiemi numerici ℕ e ℚ⁺
- **Operazioni ed Espressioni:** Proprietà avanzate dell'aritmetica e parentesi
- **Teoria dei Numeri:** Divisibilità, numeri primi, scomposizione in fattori primi, M.C.D. e m.c.m.
- **Frazioni:** Operazioni con le frazioni (addizione, sottrazione, moltiplicazione, divisione, potenze), espressioni frazionarie
- **Potenze:** Proprietà delle potenze con base ed esponente naturale

**2. Spazio e Figure**
- **Enti Geometrici Fondamentali:** Punto, retta, piano, semiretta, segmento
- **Operazioni con i Segmenti:** Somma, differenza, multipli e sottomultipli
- **Angoli:** Misura degli angoli (sistema sessagesimale), angoli complementari, supplementari, esplementari
- **Poligoni:** Proprietà generali dei poligoni (somma degli angoli interni ed esterni)
- **Triangoli:** Criteri di congruenza, proprietà, altezze, mediane, bisettrici, assi

**3. Relazioni e Funzioni**
- **Coordinate Cartesiane:** Il piano cartesiano (primo quadrante)
- **Risoluzione di Problemi:** Modelli grafici con segmenti e frazioni
- **Misure:** Unità di misura e conversioni nel SI

**4. Dati e Previsioni**
- **Statistica Descrittiva:** Frequenza assoluta, relativa e percentuale
- **Indici di Posizione:** Media, mediana, moda
- **Rappresentazioni Grafiche:** Istogrammi, diagrammi a barre, aerogrammi

---

#### Grado 7 (Classe Seconda Media)

**1. Numeri**
- **Numeri Razionali (ℚ):** Frazioni generatrici di decimali finiti e periodici (semplici e misti)
- **Estrazione di Radice:** Radice quadrata, proprietà dei radicali, uso delle tavole numeriche e approssimazioni
- **Rapporti e Proporzioni:** Proprietà fondamentale delle proporzioni e proprietà del permutare, invertire, comporre, scomporre; risoluzione di proporzioni ad una o più incognite; catene di rapporti

**2. Spazio e Figure**
- **Equiestensione e Aree:** Superfici piane, equivalenza tra figure, formule per l'area di tutti i poligoni
- **Teorema di Pitagora:** Dimostrazione, formulazione e applicazioni a tutte le figure piane (rettangolo, isoscele, trapezio, rombo)
- **Similitudine:** Teorema di Talete, teoremi di Euclide (primo e secondo), poligoni simili, scala di ingrandimento/riduzione

**3. Relazioni e Funzioni**
- **Proporzionalità:** Funzioni di proporzionalità diretta (y = kx) e inversa (y = k/x); rappresentazione grafica sul piano cartesiano (rette per l'origine ed iperboli equilatere)
- **Applicazioni:** Problemi del tre semplice e del tre composto, ripartizione semplice

**4. Dati e Previsioni**
- **Eventi e Probabilità:** Eventi aleatori, spazio campionario; definizione classica di probabilità: P(E) = casi favorevoli / casi possibili; evento contrario, evento unione ed intersezione (eventi compatibili e incompatibili)

---

#### Grado 8 (Classe Terza Media)

**1. Numeri**
- **Numeri Relativi (ℤ e ℚ):** Operazioni, potenze con esponente intero relativo
- **Calcolo Letterale:** Monomi (grado, operazioni: somma, prodotto, potenza, quoziente); Polinomi (somma e prodotto di polinomi per monomi); Prodotti notevoli base: quadrato di binomio (a+b)², differenza di quadrati (a-b)(a+b)

**2. Spazio e Figure**
- **Circonferenza e Cerchio:** Lunghezza della circonferenza, area del cerchio, archi, settori circolari, posizioni reciproche tra retta e circonferenza
- **Geometria Solida:** Solidi di rotazione (cilindro, cono, sfera) e poliedri (prismi, parallelepipedi, cubi, piramidi); calcolo di aree della superficie (laterale e totale) e volumi; peso specifico, massa e volume

**3. Relazioni e Funzioni**
- **Equazioni di 1° Grado ad una Incognita:** Principi di equivalenza (primo e secondo principio); risoluzione di equazioni lineari intere; risoluzione di problemi applicati tramite equazioni di primo grado
- **Geometria Analitica nel Piano Cartesiano:** Distanza tra due punti, punto medio di un segmento; equazione della retta nel piano cartesiano (y = mx + q)

**4. Dati e Previsioni**
- **Statistica e Modellizzazione:** Variabili discrete e continue; probabilità composta e condizionata (cenni intuitivi); analisi e interpretazione critica dei dati da fonti reali

---

### 🏫 Scuola Secondaria di Secondo Grado (Gradi 9 - 13)

#### Grado 9 (Classe Prima Superiore)

**1. Numeri e Algebra**
- **Insiemi e Logica:** Insiemi, operazioni tra insiemi, logica delle proposizioni, connettivi, tavole di verità
- **Insiemi Numerici:** ℕ, ℤ, ℚ, proprietà, ordinamento e densità
- **Calcolo Letterale:** Monomi e Polinomi; Prodotti Notevoli (quadrato di binomio, cubo di binomio, prodotto della somma per la differenza); Scomposizione di polinomi (raccoglimento parziale/totale, prodotti notevoli, trinomio notevole di 2° grado, regola di Ruffini); Frazioni algebriche: condizioni di esistenza (C.E.) e semplificazione, operazioni

**2. Equazioni e Disequazioni**
- **Equazioni Lineari:** Equazioni di 1° grado intere e fratte, determinate, indeterminate, impossibili
- **Disequazioni Lineari:** Disequazioni di 1° grado, sistemi di disequazioni di 1° grado

**3. Spazio e Figure (Geometria Euclidea)**
- **Fondamenti di Geometria Razionale:** Assiomi, teoremi, definizioni
- **Congruenza nei Triangoli:** Primo, secondo e terzo criterio di congruenza
- **Parallellismo e Perpendicolarità:** V Postulato di Euclide, angoli formati da rette parallele tagliate da una trasversale, somma degli angoli interni di un triangolo
- **Quadrilateri:** Parallelogrammi, rettangoli, rombi, quadrati, trapezi e loro proprietà

**4. Dati e Previsioni**
- Statistica descrittiva: dati raggruppati in classi, deviazione standard e varianza (cenni)

---

#### Grado 10 (Classe Seconda Superiore)

**1. Algebra e Numeri**
- **Sistemi di Equazioni Lineari:** Sistemi di due equazioni in due incognite; metodi di risoluzione: sostituzione, confronto, riduzione, Cramer; interpretazione geometrica di un sistema lineare
- **Insieme dei Numeri Reali (ℝ) e Radicali:** Radicali aritmetici ed algebrici, proprietà invariantiva; operazioni con i radicali, razionalizzazione del denominatore, potenze con esponente razionale

**2. Equazioni e Disequazioni di Secondo Grado**
- **Equazioni di 2° Grado:** Forma canonica ax² + bx + c = 0; formula risolutiva e discriminante (Δ); relazione tra radici e coefficienti, scomposizione del trinomio di secondo grado
- **Disequazioni di 2° Grado:** Risoluzione algebrica e grafica mediante la parabola
- **Sistemi di Disequazioni di Secondo Grado**
- **Equazioni di Grado Superiore al Secondo:** Equazioni biquadratiche, trinomie, per scomposizione
- **Equazioni e Disequazioni con Moduli ed Irrazionali**

**3. Spazio e Figure**
- **Geometria Euclidea:** Circonferenza e cerchio, angoli al centro e alla circonferenza, poligoni inscritti e circoscritti; Teorema di Talete, equiestensione e aree; Similitudine: Criteri di similitudine dei triangoli, Teoremi di Euclide e Teorema di Pitagora
- **Geometria Analitica (La Retta):** Distanza tra due punti, punto medio; equazione della retta in forma esplicita (y = mx+q) ed implicita (ax+by+c=0); condizioni di parallelismo e perpendicolarità (m₁ = m₂, m₁ · m₂ = -1); fascio improprio e proprio di rette, distanza di un punto da una retta

---

#### Grado 11 (Classe Terza Superiore)

**1. Geometria Analitica (Le Coniche)**
- **La Parabola:** Equazione canonica, vertice, fuoco, asse di simmetria, direttrice; intersezioni retta-parabola e rette tangenti
- **La Circonferenza:** Equazione x² + y² + ax + by + c = 0, centro e raggio; rette tangenti
- **L'Ellisse:** Equazione canonica (x²/a² + y²/b² = 1), fuochi, eccentricità
- **L'Iperbole:** Equazione canonica (x²/a² - y²/b² = 1), asintoti, fuochi; iperbole equilatera riferita agli asintoti (xy = k)

**2. Funzioni elementari, Esponenziali e Logaritmi**
- **Concetto di Funzione:** Dominio, codominio, iniettività, suriettività, biettività, funzione inversa e composta
- **Funzione Esponenziale:** Proprietà, grafico di y = aˣ; equazioni e disequazioni esponenziali
- **Funzione Logaritmica:** Definizione di logaritmo, proprietà dei logaritmi, grafico di y = logₐ(x); equazioni e disequazioni logaritmiche

**3. Goniometria e Trigonometria (Inizio)**
- **Misura degli Angoli:** Radianti e gradi sessagesimali
- **Funzioni Goniometriche:** Seno, coseno, tangente, cotangente sulla circonferenza goniometrica
- **Relazioni Fondamentali della Goniometria:** sin²(x) + cos²(x) = 1, tan(x) = sin(x)/cos(x)

---

#### Grado 12 (Classe Quarta Superiore)

**1. Trigonometria**
- **Formule Goniometriche:** Formule di addizione, sottrazione, duplicazione, dimezzamento, prostaferesi, parametriche
- **Equazioni e Disequazioni Goniometriche:** Elementari, omogenee di primo e secondo grado, lineari in seno e coseno
- **Teoremi sui Triangoli:** Triangoli rettangoli: definizione di seno, coseno, tangente; Triangoli qualsiasi: Teorema dei Seni (o della corda), Teorema del Coseno (o di Carnot); risoluzione e applicazioni geometriche e fisiche dei triangoli

**2. Numeri Complessi e Calcolo Combinatorio**
- **Numeri Complessi (ℂ):** Forma algebrica (a+bi), forma trigonometrica ed esponenziale, piano di Argand-Gauss, operazioni, formula di De Moivre
- **Calcolo Combinatorio:** Disposizioni semplici e con ripetizione; permutazioni, fattoriale; combinazioni semplici, coefficiente binomiale, Binomio di Newton
- **Calcolo delle Probabilità Avanzato:** Probabilità condizionata, Teorema delle probabilità totali, Teorema di Bayes; Schema di Bernoulli (prove ripetute)

**3. Geometria dello Spazio (3D)**
- Piani e rette nello spazio, ortogonalità e parallelismo
- Poliedri regolari, solidi di rotazione
- Superfici e volumi nello spazio dei solidi complessi

---

#### Grado 13 (Classe Quinta Superiore)

*(Nota: Programma focalizzato su Analisi Matematica per il Liceo Scientifico e Istituti Tecnici ad indirizzo tecnologico)*

**1. Limiti e Continuità**
- **Topologia di ℝ:** Intorni, punti di accumulazione, insiemi aperti e chiusi
- **Concetto di Limite:** Definizione rigorosa (ε-δ), limite finito e infinito per x → x₀ e x → ∞
- **Calcolo dei Limiti:** Teoremi sui limiti (unicità, permanenza del segno, carabinieri), forme indeterminate (0/0, ∞/∞, ∞ - ∞, 0 · ∞, 1^∞)
- **Limiti Notevoli:** lim(x→0) sin(x)/x = 1, lim(x→∞) (1 + 1/x)ˣ = e, ecc.
- **Funzioni Continue:** Definizione, punti di discontinuità (1ª, 2ª, 3ª specie), Teoremi sulle funzioni continue (Weierstrass, valori intermedi, esistenza degli zeri)
- **Asintoti:** Verticali, orizzontali, obliqui

**2. Calcolo Differenziale**
- **Derivata di una Funzione:** Rapporto incrementale, significato geometrico (pendenza della retta tangente) e fisico (velocità istantanea)
- **Regole di Derivazione:** Derivate fondamentali, derivata della somma, prodotto, quoziente, funzione composta e inversa
- **Teoremi del Calcolo Differenziale:** Teorema di Rolle, Teorema di Lagrange (del valore medio), Teorema di Cauchy, Regola di De L'Hôpital
- **Studio di Funzione:** Crescenza e decrescenza, punti stazionari; massimi e minimi relativi ed assoluti (studio del segno della derivata prima); concavità, convessità e punti di flesso (studio del segno della derivata seconda); schema completo per il tracciamento del grafico di una funzione y = f(x)

**3. Calcolo Integrale**
- **Integrale Indefinito:** Definizione di primitiva, proprietà di linearità, integrali immediati, integrazione per sostituzione, per parti e di funzioni razionali fratte
- **Integrale Definito:** Definizione secondo Riemann, significato geometrico (area del trapezoide)
- **Teorema Fondamentale del Calcolo Integrale:** Torricelli-Barrow, calcolo dell'integrale definito
- **Applicazioni degli Integrali:** Calcolo di aree di superfici piane, volumi dei solidi di rotazione (metodo delle fette e dei gusci cilindrici), lunghezza di un arco di curva
- **Integrali Impropri:** Cenni

**4. Equazioni Differenziali** *(Licei Scientifici / Istituti Tecnici)*
- Definizione di equazione differenziale, ordine, soluzione generale e particolare (problema di Cauchy)
- Equazioni differenziali del 1° ordine a variabili separabili e lineari y' + a(x)y = b(x)
- Equazioni differenziali lineari del 2° ordine a coefficienti costanti omogenee ay'' + by' + cy = 0

---

### 📜 Riferimenti Normativi

1. **D.M. 254/2012:** *Indicazioni nazionali per il curricolo della scuola dell'infanzia e del primo ciclo d'istruzione*
2. **D.P.R. 89/2010 e D.M. 211/2010:** *Indicazioni Nazionali per i Licei*
3. **D.P.R. 88/2010 e Direttiva 57/2010:** *Linee guida per il secondo ciclo degli Istituti Tecnici*
4. **INVALSI:** *Quadri di Riferimento delle prove di Matematica (Gradi 2, 5, 8, 10, 13)*

---

## 🔗 Mappatura Programma → Fasi di Sviluppo

### Nucleo 1: Numeri

| Argomento | Grado | Fase | Priorità | Stato |
|----------|-------|------|----------|-------|
| Conteggio e confronto | 1 | Fase 2 | Alta | [ ] |
| Addizione e sottrazione | 1-2 | Fase 2 | Alta | [ ] |
| Moltiplicazione e divisione | 2-3 | Fase 2 | Alta | [ ] |
| Frazioni (introduzione) | 3-4 | Fase 2 | Alta | [ ] |
| Numeri decimali | 4 | Fase 2 | Alta | [ ] |
| Potenze e numeri relativi | 5 | Fase 2 | Alta | [ ] |
| Insiemi numerici (N, Q) | 6-7 | Fase 2 | Alta | [ ] |
| Operazioni con frazioni | 6-7 | Fase 2 | Alta | [ ] |
| Potenze e proprietà | 6-7 | Fase 2 | Alta | [ ] |
| Numeri relativi (Z) | 8 | Fase 2 | Alta | [ ] |
| Calcolo letterale | 8-9 | Fase 2 | Alta | [ ] |
| Insiemi N, Z, Q, R, C | 9-10 | Fase 2 | Alta | [ ] |
| Equazioni e disequazioni | 9-10 | Fase 2 | Alta | [ ] |
| Sistemi di equazioni | 10 | Fase 2 | Alta | [ ] |
| Radicali | 10 | Fase 2 | Alta | [ ] |
| Logaritmi ed esponenziali | 11 | Fase 2 | Media | [ ] |
| Numeri complessi | 12 | Fase 2 | Bassa | [ ] |

### Nucleo 2: Spazio e Figure

| Argomento | Grado | Fase | Priorità | Stato |
|----------|-------|------|----------|-------|
| Orientamento spaziale | 1-2 | Fase 3 | Alta | [ ] |
| Figure geometriche piane | 1-3 | Fase 3 | Alta | [ ] |
| Perimetro e area | 3-4 | Fase 3 | Alta | [ ] |
| Simmetria | 2-4 | Fase 3 | Alta | [ ] |
| Geometria solida (introduzione) | 5 | Fase 3 | Alta | [ ] |
| Enti geometrici fondamentali | 6 | Fase 3 | Alta | [ ] |
| Angoli e poligoni | 6-7 | Fase 3 | Alta | [ ] |
| Teorema di Pitagora | 7 | Fase 3 | Alta | [ ] |
| Similitudine | 7-8 | Fase 3 | Alta | [ ] |
| Circonferenza e cerchio | 8 | Fase 3 | Alta | [ ] |
| Geometria solida (prismi, cilindri) | 8 | Fase 3 | Alta | [ ] |
| Geometria euclidea avanzata | 9-10 | Fase 3 | Media | [ ] |
| Geometria analitica (retta) | 10 | Fase 3 | Media | [ ] |
| Coniche | 11 | Fase 3 | Media | [ ] |
| Geometria 3D | 12 | Fase 3 | Media | [ ] |
| Trigonometria | 11-12 | Fase 3 | Media | [ ] |

### Nucleo 3: Relazioni e Funzioni

| Argomento | Grado | Fase | Priorità | Stato |
|----------|-------|------|----------|-------|
| Classificazione e ordinamento | 1-2 | Fase 4 | Alta | [ ] |
| Relazioni di equivalenza | 3 | Fase 4 | Alta | [ ] |
| Misure e unità di misura | 3-4 | Fase 4 | Alta | [ ] |
| Problemi aritmetici | 1-5 | Fase 4 | Alta | [ ] |
| Coordinate cartesiane | 6 | Fase 4 | Alta | [ ] |
| Proporzionalità | 6-7 | Fase 4 | Alta | [ ] |
| Funzioni lineari | 7-8 | Fase 4 | Alta | [ ] |
| Equazioni di 1° grado | 8 | Fase 4 | Alta | [ ] |
| Funzioni elementari | 9 | Fase 4 | Media | [ ] |
| Funzione esponenziale e logaritmica | 11 | Fase 4 | Media | [ ] |
| Funzioni goniometriche | 11-12 | Fase 4 | Media | [ ] |
| Studio di funzione | 13 | Fase 4 | Media | [ ] |
| Limiti e continuità | 13 | Fase 4 | Media | [ ] |
| Calcolo differenziale | 13 | Fase 4 | Media | [ ] |
| Calcolo integrale | 13 | Fase 4 | Media | [ ] |
| Equazioni differenziali | 13 | Fase 4 | Bassa | [ ] |

### Nucleo 4: Dati e Previsioni

| Argomento | Grado | Fase | Priorità | Stato |
|----------|-------|------|----------|-------|
| Raccolta dati | 1-2 | Fase 5 | Alta | [ ] |
| Grafici semplici | 1-3 | Fase 5 | Alta | [ ] |
| Concetti base di probabilità | 1-4 | Fase 5 | Alta | [ ] |
| Media, moda, mediana | 3-4 | Fase 5 | Alta | [ ] |
| Statistica descrittiva | 6-7 | Fase 5 | Alta | [ ] |
| Probabilità classica | 7 | Fase 5 | Alta | [ ] |
| Eventi e spazio campionario | 7-8 | Fase 5 | Alta | [ ] |
| Probabilità condizionata (cenni) | 8 | Fase 5 | Media | [ ] |
| Statistica avanzata | 10 | Fase 5 | Media | [ ] |
| Calcolo combinatorio | 12 | Fase 5 | Media | [ ] |
| Probabilità condizionata | 12 | Fase 5 | Media | [ ] |
| Teorema di Bayes | 12 | Fase 5 | Media | [ ] |
| Schema di Bernoulli | 12 | Fase 5 | Media | [ ] |
| Variabili aleatorie | 13 | Fase 5 | Bassa | [ ] |

---

## 🎯 Roadmap per Grado (Dettagliata)

### Grado 1 (Priorità: ALTA)
**Nuclei**: Numeri (conteggio, confronto), Spazio e Figure (orientamento, forme semplici), Relazioni e Funzioni (classificazione), Dati e Previsioni (raccolta dati)
**Dipendenze**: Nessuna
**Fase**: 2, 3, 4, 5

### Grado 2 (Priorità: ALTA)
**Nuclei**: Numeri (sistema decimale, add/sott in colonna, moltiplicazione), Spazio e Figure (linee, simmetria), Relazioni e Funzioni (relazioni, tabelle), Dati e Previsioni (tabelle, istogrammi)
**Dipendenze**: Grado 1
**Fase**: 2, 3, 4, 5

### Grado 3 (Priorità: ALTA)
**Nuclei**: Numeri (numerazione a 1000, 4 operazioni, frazioni), Spazio e Figure (rette, angoli, poligoni), Relazioni e Funzioni (misure, problemi), Dati e Previsioni (grafici, moda, media)
**Dipendenze**: Grado 2
**Fase**: 2, 3, 4, 5

### Grado 4 (Priorità: ALTA)
**Nuclei**: Numeri (numerazione a 100000, decimali), Spazio e Figure (quadrilateri, area, trasformazioni), Relazioni e Funzioni (sistema monetario, equivalenze), Dati e Previsioni (statistica, probabilità semplice)
**Dipendenze**: Grado 3
**Fase**: 2, 3, 4, 5

### Grado 5 (Priorità: ALTA)
**Nuclei**: Numeri (milioni, numeri relativi, divisibilità), Spazio e Figure (aree, cerchio, geometria solida), Relazioni e Funzioni (equivalenze, scala), Dati e Previsioni (analisi indagini)
**Dipendenze**: Grado 4
**Fase**: 2, 3, 4, 5

### Grado 6 (Priorità: ALTA)
**Nuclei**: Numeri (insiemi N e Q+, operazioni, potenze), Spazio e Figure (enti geometici, angoli, poligoni), Relazioni e Funzioni (piano cartesiano), Dati e Previsioni (statistica descrittiva)
**Dipendenze**: Grado 5
**Fase**: 2, 3, 4, 5

### Grado 7 (Priorità: ALTA)
**Nuclei**: Numeri (Q, radicali, proporzioni), Spazio e Figure (equiestensione, Pitagora, similitudine), Relazioni e Funzioni (proporzionalità), Dati e Previsioni (probabilità classica)
**Dipendenze**: Grado 6
**Fase**: 2, 3, 4, 5

### Grado 8 (Priorità: ALTA)
**Nuclei**: Numeri (Z, Q, calcolo letterale), Spazio e Figure (circonferenza, geometria solida), Relazioni e Funzioni (equazioni 1° grado, geometria analitica), Dati e Previsioni (probabilità avanzata)
**Dipendenze**: Grado 7
**Fase**: 2, 3, 4, 5

### Grado 9 (Priorità: MEDIA)
**Nuclei**: Numeri e Algebra (insiemi, logica, calcolo letterale avanzato), Equazioni e Disequazioni (lineari), Spazio e Figure (geometria euclidea, congruenza), Dati e Previsioni (statistica avanzata)
**Dipendenze**: Grado 8
**Fase**: 2, 3, 4, 5

### Grado 10 (Priorità: MEDIA)
**Nuclei**: Algebra (sistemi, radicali), Equazioni e Disequazioni (2° grado), Spazio e Figure (geometria euclidea avanzata, retta analitica), Dati e Previsioni (statistica avanzata)
**Dipendenze**: Grado 9
**Fase**: 2, 3, 4, 5

### Grado 11 (Priorità: MEDIA)
**Nuclei**: Geometria Analitica (coniche), Funzioni (elementari, esponenziali, logaritmi), Goniometria e Trigonometria (inizio)
**Dipendenze**: Grado 10
**Fase**: 3, 4

### Grado 12 (Priorità: BASSA)
**Nuclei**: Trigonometria (formule, equazioni), Numeri Complessi e Calcolo Combinatorio, Geometria dello Spazio 3D
**Dipendenze**: Grado 11
**Fase**: 2, 3, 4, 5

### Grado 13 (Priorità: BASSA)
**Nuclei**: Limiti e Continuità, Calcolo Differenziale, Calcolo Integrale, Equazioni Differenziali
**Dipendenze**: Grado 12
**Fase**: 4

---

## 🎓 Riferimenti

### Documentazione Esterna
- [Indicazioni Nazionali MIM](https://www.miur.gov.it/)
- [Quadri di Riferimento INVALSI](https://www.invalsi.it/)
- [MathJax Documentation](https://docs.mathjax.org/)
- [React Documentation](https://react.dev/)

### Contatti Utili
- Insegnanti di matematica per review contenuti
- Comunità React Italia per supporto tecnico
- Forum matematici per discussioni su esercizi

### Documenti di Riferimento Interni
- [Programma_Matematica_Italia_Gradi_1_13.md](./Programma_Matematica_Italia_Gradi_1_13.md) - Programma ministeriale completo dettagliato

---

**Ultimo Aggiornamento:** 13 Agosto 2026  
**Responsabile:** Gino (con l'aiuto di Cat-Butler)  
**Stato:** Integrazione Programma Ministeriale Completata - Struttura Dati Gradi 1-5 Completata - UI Base Completata - Generatori Esercizi Gradi 1-5 (Scuola Primaria) Completi - Esportazione PDF Completata - Salvataggio Progressi Completato - Prossimo: da definire con Gino (possibile integrazione AI, da confermare)