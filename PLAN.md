# Piano di Sviluppo - Clear-Math

**Obiettivo:** Sviluppare un'applicazione educativa completa che copra il programma nazionale di matematica italiano per i gradi 1-13, seguendo le Indicazioni Nazionali del MIM e i Quadri INVALSI.

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

### Struttura Attuale (da repository)
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
│   │   ├── DifficultySelector.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TopicCard.jsx
│   │   └── TopicDifficultySelector.jsx
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ReviewPage.jsx
│   │   └── WorkspacePage.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── data/
│   │   ├── constants.js
│   │   └── topics.js
│   ├── styles/
│   │   └── index.css
│   └── utils/
│       ├── exerciseGenerators.js
│       └── random.js
```

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
1. **Struttura Dati**
   - [ ] Creare `src/types/index.d.ts` con tipi base
   - [ ] Iniziare a strutturare `src/data/curriculum/grade1/`
   - [ ] Definire schema JSON per argomenti, esercizi, teoria

2. **UI Base**
   - [ ] Completare componenti common mancanti
   - [ ] Implementare navigazione tra gradi
   - [ ] Creare prototipo di ExerciseCard

3. **Primo Generatore**
   - [ ] Implementare generatore esercizi per Grado 1 - Numeri (conteggio)
   - [ ] Aggiungere validatore semplice
   - [ ] Creare UI per visualizzazione e interazione

### Prossime 2 Settimane
- Completare Nucleo Numeri per Gradi 1-5
- Implementare sistema di progressi base
- Aggiungere primi contenuti teorici

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

---

**Ultimo Aggiornamento:** 05 Agosto 2026  
**Responsabile:** Gino (con l'aiuto di Cat-Butler)  
**Stato:** Iniziale - Da Revisionare con Team