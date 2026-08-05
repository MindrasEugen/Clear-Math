# Clear-Math — Generatore di Schede di Matematica per la Quarta Elementare

> React + Bootstrap 5 | Vite | jsPDF

## 📋 Descrizione

Clear-Math è un generatore di schede di matematica per la quarta elementare. Permette di creare esercizi personalizzati su 12 argomenti diversi con 3 livelli di difficoltà.

## 🎯 Funzionalità
- ✅ Selezione multipla argomenti
- ✅ 3 livelli di difficoltà (Basso, Medio, Avanzato)
- ✅ Generazione schede personalizzate
- ✅ Interfaccia responsive con Bootstrap 5
- ✅ Navigation tra Dashboard, Workspace e Review Center
- 🚧 Generazione esercizi automatica (in implementazione)
- 🚧 Esportazione PDF (da implementare)

## 🛠 Tecnologie
- **Frontend**: React 18 + React Router 6
- **UI Framework**: Bootstrap 5.3 + react-bootstrap
- **Build Tool**: Vite 5
- **PDF Export**: jsPDF 2.5
- **Stato**: Context API + useState
- **Stili**: Bootstrap CSS + Custom CSS Variables

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
├── package.json            # Dipendenze
├── vite.config.js          # Config Vite
├── .gitignore              # Esclude node_modules, dist
├── README.md               # Documentazione
│
├── /public/                # Asset statici (favicon, immagini)
│
└── /src/                   # Codice sorgente
    ├── main.jsx            # Entry point React
    ├── App.jsx             # Router principale
    │
    ├── /context/           # Context API
    │   └── AppContext.jsx   # Stato globale
    │
    ├── /data/              # Dati statici
    │   ├── constants.js     # Costanti (difficoltà, colori, ecc.)
    │   └── topics.js        # Argomenti di matematica
    │
    ├── /components/        # Componenti React
    │   ├── Layout.jsx       # Layout principale
    │   ├── Header.jsx       # Header con navigazione
    │   ├── Sidebar.jsx      # Sidebar con argomenti
    │   ├── Footer.jsx       # Footer
    │   ├── DifficultySelector.jsx
    │   └── TopicCard.jsx    # Card argomento
    │
    ├── /pages/             # Pagine
    │   ├── DashboardPage.jsx
    │   ├── WorkspacePage.jsx
    │   └── ReviewPage.jsx
    │
    ├── /utils/             # Utility functions
    │   ├── random.js        # Generatore random (LCG)
    │   └── exerciseGenerators.js  # Generatori esercizi
    │
    └── /styles/            # Stili
        └── index.css       # Custom styles + CSS variables
```

## 🚀 Utilizzo

1. **Dashboard** (`/dashboard`): Seleziona argomenti e difficolt√†
2. **Workspace** (`/workspace`): Visualizza e risolvi esercizi generati
3. **Review Center** (`/review`): Sfida quotidiana e statistiche

## 📝 Componenti Principali

### Context
- `AppContext` - Gestisce stato globale:
  - Argomenti selezionati
  - Difficolt√† globale e per argomento
  - Esercizi generati
  - Vista corrente
  - Dati studente

### Dati
- `topics.js` - 12 argomenti di matematica con descrizioni e icone
- `constants.js` - Costanti, difficult√†, colori, font

### Utility
- `random.js` - Generatore LCG per numeri casuali ripetibili
- `exerciseGenerators.js` - Funzioni generazione esercizi (parzialmente implementato)

## 🎨 Design

### Colori Custom
```css
:root {
  --cm-primary: #004d5b;
  --cm-primary-light: #006778;
  --cm-background: #f8f9fa;
  --cm-text-primary: #191c1d;
}
```

### Font
- **Headlines**: Quicksand (bold, moderno)
- **Body**: Lexend (leggibile, adatto dislessia)
- **Icons**: Material Symbols + Remix Icons

## 📚 Stato di Sviluppo

### ✅ Completato
- Struttura progetto React + Vite + Bootstrap
- Routing tra pagine
- Context API per stato globale
- Componenti UI (Layout, Header, Sidebar, Footer, Card)
- Dashboard con griglia argomenti
- Workspace con visualizzazione schede
- Review Center con sfida quotidiana
- Selezione multipla argomenti
- Gestione difficolt√†

### 🚧 Da Completare
- Generazione esercizi reali per tutti gli argomenti
- Integrazione jsPDF per esportazione
- Salvataggio progressi
- Responsive design improvements
- Test e ottimizzazione

## 🤝 Contribuire

1. Fai fork del progetto
2. Crea un branch: `git checkout -b feature/nome`
3. Fai commit: `git commit -m 'Aggiunto...'`
4. Push: `git push origin feature/nome`
5. Apri una Pull Request

## 📄 Licenza
Progetto didattico open source.

---

> **Progetto creato con React, Bootstrap 5 e Vite per un layout modulare e pulito**
