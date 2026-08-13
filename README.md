# Clear-Math — Piattaforma Educativa di Matematica per Gradi 1-13

> React + Bootstrap 5 | Vite | jsPDF | Context API

## 📋 Descrizione

Clear-Math è una **piattaforma educativa interattiva** che copre l'intero **programma nazionale di matematica italiano** per tutti i gradi scolastici (1-13), seguendo le **Indicazioni Nazionali del MIM** e i **Quadri INVALSI**.

L'applicazione permette di generare **schede di esercizi personalizzate** basate su **4 nuclei fondanti**: Numeri, Spazio e Figure, Relazioni e Funzioni, Dati e Previsioni.

## 🎯 Funzionalità

### ✅ Implementato
- ✅ Selezione multipla argomenti per grado scolastico (Gradi 1-5)
- ✅ 3 livelli di difficoltà (Basso, Medio, Avanzato)
- ✅ Generazione schede personalizzate con esercizi casuali
- ✅ Generatori di esercizi completi per tutti e 4 i nuclei, Gradi 1-5 (Scuola Primaria)
- ✅ Interfaccia responsive con Bootstrap 5
- ✅ Navigazione tra Dashboard, Workspace e Review Center
- ✅ Sistema di Breadcrumbs per navigazione gerarchica
- ✅ Componenti UI modulari (Card, Button, Modal)
- ✅ Validatori per la correttezza delle risposte, con feedback visivo immediato
- ✅ Esportazione PDF della scheda con jsPDF (domande, scelte multiple, risposte)
- ✅ Salvataggio progressi e statistiche (risposte, esercizi risolti, risposte corrette) in localStorage
- ✅ Gestione stato globale con Context API

### 🚧 In Sviluppo
- 🚧 Estensione a Scuola Secondaria (Gradi 6-13)
- 🚧 Spiegazioni teoriche interattive
- 🚧 Autenticazione e sincronizzazione cloud dei progressi

## 🛠 Tecnologie

### Frontend
- **Framework**: React 18 + React Router 6
- **UI Library**: Bootstrap 5.3 + react-bootstrap
- **Build Tool**: Vite 5
- **PDF Export**: jsPDF 2.5.1

### Stato & Dati
- **State Management**: Context API + useState
- **Data Structure**: Curriculum organizzato per grado e nucleo tematico
- **Validation**: Custom validators per esercizi

### Stili & Design
- **CSS Framework**: Bootstrap 5
- **Custom Styles**: CSS Variables per temi personalizzati
- **Font**: Quicksand (headlines), Lexend (body - adatto dislessia)
- **Icons**: Material Symbols + Remix Icons

## 📦 Installazione

### Prerequisiti
- Node.js 18+
- npm 9+

### Passaggi

```bash
cd clear-math
npm install
npm run dev
```

Il progetto si aprirà su `http://localhost:3000`

## 🗂 Struttura del Progetto

```
clear-math/
├── index.html              # Entry point HTML
├── package.json            # Dipendenze npm
├── vite.config.js          # Configurazione Vite
├── pnpm-workspace.yaml     # Workspace pnpm
├── .gitignore              # Esclude node_modules, dist
├── README.md               # Documentazione
├── LICENSE                 # Licenza MIT
├── PLAN.md                 # Piano di sviluppo dettagliato
│
├── /public/                # Asset statici
│
└── /src/                   # Codice sorgente
    ├── main.jsx            # Entry point React
    ├── App.jsx             # Router principale
    │
    ├── /context/           # Context API
    │   └── AppContext.jsx   # Stato globale (argomenti, esercizi, risposte, progressi)
    │
    ├── /data/              # Dati statici
    │   ├── constants.js     # Costanti (difficoltà, colori, ecc.)
    │   ├── topics.js        # Argomenti di matematica (legacy)
    │   ├── schemas.js       # Schemi TypeScript
    │   └── /curriculum/     # Programma scolastico, Gradi 1-5 (dati completi)
    │       ├── /grade1/ ... /grade5/
    │       │   ├── numeri.js
    │       │   ├── spazio_e_figure.js
    │       │   ├── relazioni_e_funzioni.js
    │       │   ├── dati_e_previsioni.js
    │       │   └── index.js
    │       └── index.js     # Entry point unificato (getGradeTopics, getAnyTopicById, ...)
    │
    ├── /components/        # Componenti React
    │   ├── Layout.jsx       # Layout principale
    │   ├── Header.jsx       # Header con navigazione, esportazione PDF
    │   ├── Sidebar.jsx      # Sidebar con argomenti
    │   ├── Footer.jsx       # Footer
    │   ├── GradeSelector.jsx # Selettore grado scolastico (1-5)
    │   ├── TopicCard.jsx    # Card argomento
    │   ├── TopicDifficultySelector.jsx
    │   ├── DifficultySelector.jsx
    │   ├── /common/         # Componenti generici
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   └── Modal.jsx
    │   ├── /exercise/       # Componenti esercizi
    │   │   ├── ExerciseCard.jsx
    │   │   └── ExerciseGeneratorDemo.jsx
    │   └── /navigation/     # Componenti navigazione
    │       └── Breadcrumb.jsx
    │
    ├── /pages/             # Pagine
    │   ├── DashboardPage.jsx
    │   ├── WorkspacePage.jsx # Scheda esercizi, verifica risposte, download PDF
    │   └── ReviewPage.jsx    # Sfida quotidiana, statistiche di progresso
    │
    ├── /services/          # Servizi applicativi
    │   └── pdfService.js    # Generazione ed esportazione PDF della scheda (jsPDF)
    │
    ├── /types/             # TypeScript
    │   └── index.d.ts       # Definizioni tipi
    │
    ├── /utils/             # Utility functions
    │   ├── random.js         # Generatore random (LCG)
    │   ├── answerValidator.js # Confronto risposta studente / risposta attesa
    │   ├── exerciseGenerators.js # legacy
    │   └── /exerciseGenerators/
    │       ├── index.js      # Entry point unificato (generateExercises(grade, ...))
    │       ├── /grade1/ ... /grade5/  # Generatori completi per tutti i nuclei
    │
    └── /styles/            # Stili
        └── index.css       # Custom styles + CSS variables
```

## 🚀 Utilizzo

### Navigazione
1. **Dashboard** (`/dashboard`): Seleziona argomenti per grado e livello di difficoltà
2. **Workspace** (`/workspace`): Visualizza, risolvi e valida esercizi generati
3. **Review Center** (`/review`): Sfida quotidiana, statistiche e revisione progressi

### Flusso Tipico
1. Seleziona il grado scolastico dalla Sidebar
2. Scegli uno o più nuclei tematici (Numeri, Geometria, ecc.)
3. Imposta il livello di difficoltà per ogni argomento
4. Genera la scheda di esercizi personalizzata
5. Risolvi gli esercizi nel Workspace
6. Verifica le risposte con il sistema di validazione
7. Verifica le risposte e consulta i progressi nel Centro Ripasso
8. Esporta la scheda in PDF

## 📝 Componenti Principali

### 🏗 Architettura
- **AppContext**: Gestione stato globale (grado, argomenti, difficoltà, esercizi, risposte, statistiche di progresso)
- **Router**: Navigazione tra Dashboard, Workspace, Review
- **Layout**: Struttura responsiva con Sidebar e Header

### 📊 Dati & Curriculum
- **topics.js**: argomenti legacy (pre multi-grado)
- **constants.js**: Costanti, livelli di difficoltà, colori, font
- **schemas.js**: Definizioni TypeScript per tipizzazione dati
- **/curriculum/**: Programma scolastico organizzato per grado e nucleo tematico
  - `grade1/` ... `grade5/`: Scuola Primaria completa, ognuno con i 4 nuclei fondanti
  - `getGradeTopics(grade)`, `getAnyTopicById(id)`: lookup grado-agnostici

### ⚙️ Utility & Logica
- **random.js**: Generatore LCG per numeri casuali ripetibili (seed-based)
- **answerValidator.js**: Confronto normalizzato tra risposta studente e risposta attesa
- **exerciseGenerators/**: Generatori di esercizi completi per grado (1-5) e nucleo
- **pdfService.js**: Generazione ed esportazione PDF della scheda con jsPDF

### 🎨 Componenti UI
- **Layout**: Struttura principale con Header, Sidebar, Footer
- **Navigation**: Breadcrumb per navigazione gerarchica
- **Common**: Button, Card, Modal (componenti riutilizzabili)
- **Exercise**: ExerciseCard, ExerciseGeneratorDemo
- **Selection**: DifficultySelector, TopicDifficultySelector, TopicCard

## 🎨 Design & Accessibilità

### 🎨 Tema Colori
```css
:root {
  --cm-primary: #004d5b;        /* Blu scuro - Primario */
  --cm-primary-light: #006778;  /* Blu medio - Evidenziazione */
  --cm-background: #f8f9fa;     /* Grigio chiaro - Sfondo */
  --cm-text-primary: #191c1d;  /* Nero - Testo principale */
  --cm-success: #28a745;       /* Verde - Successo */
  --cm-warning: #ffc107;       /* Giallo - Attenzione */
  --cm-danger: #dc3545;        /* Rosso - Errore */
}
```

### 🔤 Tipografia
- **Headlines**: Quicksand (bold, moderno, leggibile)
- **Body**: Lexend (designato per dislessia, alta leggibilità)
- **Code/Monospace**: Font standard monospace

### 🎯 Iconografia
- **Primary**: Material Symbols (set completo)
- **Secondary**: Remix Icons (iconiche matematiche)

### ♿ Accessibilità
- Color contrast ratio > 4.5:1 per WCAG AA
- Font Lexend ottimizzato per DSA (Disturbi Specifici Apprendimento)
- Navigazione tastiera completa
- ARIA labels e semantic HTML

## 📚 Stato di Sviluppo

### ✅ Fasi Completate

#### 🏗 Infrastruttura (100%)
- Struttura progetto React 18 + Vite 5 + Bootstrap 5.3
- Configurazione pnpm workspace
- Routing tra pagine (React Router 6)
- Context API per stato globale
- Sistema di build e development

#### 🎨 Interfaccia Utente (95%)
- Componenti Layout (Header, Sidebar, Footer)
- Componenti di navigazione (Breadcrumb)
- Componenti UI riutilizzabili (Button, Card, Modal)
- Selettore grado scolastico (Gradi 1-5)
- Dashboard con griglia argomenti
- Workspace con visualizzazione schede, verifica risposte e barra di progresso reale
- Review Center con sfida quotidiana e statistiche di progresso reali
- Selezione multipla argomenti
- Gestione difficoltà per argomento

#### 📊 Curriculum & Dati (100% per Scuola Primaria)
- Struttura dati curriculum completa per i Gradi 1-5
- 4 nuclei fondanti implementati per ogni grado
- Generatori di esercizi completi per tutti i nuclei, Gradi 1-5
- Validatori per la correttezza delle risposte, con statistiche persistite
- Esportazione PDF della scheda (jsPDF)
- Schemi TypeScript per tipizzazione

### 🚧 Prossimi Passi

#### Alta Priorità
- Estendere curriculum e generatori alla Scuola Secondaria di I Grado (gradi 6-8)
- Implementare spiegazioni teoriche interattive

#### Media Priorità
- Sistema di autenticazione e sincronizzazione cloud dei progressi (oltre localStorage)
- Responsive design improvements
- Code-splitting del bundle (jsPDF/html2canvas superano i 500kB dopo il minify)

#### Bassa Priorità
- Estendere a Scuola Secondaria di II Grado (gradi 9-13)
- Integrazione con LMS esterni
- Localizzazione multilingua
- Test automatizzati e CI/CD

## 🤝 Contribuire

1. Fai fork del progetto
2. Crea un branch: `git checkout -b feature/nome`
3. Fai commit: `git commit -m 'Aggiunto...'`
4. Push: `git push origin feature/nome`
5. Apri una Pull Request

## 📄 Licenza

**MIT License** - Progetto didattico open source.

Copyright (c) 2024-2026 Clear-Math

Permesso di uso, copia, modifica e distribuzione con le condizioni della licenza MIT.

Vedi il file [LICENSE](LICENSE) per i dettagli completi.

---

## 📖 Documentazione Addizionale

- **[PLAN.md](PLAN.md)**: Piano di sviluppo dettagliato con roadmap completa
- **Programma_Matematica_Italia_Gradi_1_13.md**: Analisi completa del programma ministeriale

---

> **Piattaforma educativa sviluppata con React 18, Bootstrap 5, Vite e Context API**
> 
> *Seguendo le Indicazioni Nazionali del MIM per la matematica italiana*
