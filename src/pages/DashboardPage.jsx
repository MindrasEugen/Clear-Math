import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { COLORS, FONTS } from '../data/constants';
import DifficultySelector from '../components/DifficultySelector';
import GradeSelector from '../components/GradeSelector';
import TopicCard from '../components/TopicCard';
import { generateExercises } from '../utils/exerciseGenerators/index.js';
import { DIFFICULTY } from '../data/constants';

// Mappa dei label per i gradi
const gradeLabels = {
  1: 'Prima',
  2: 'Seconda',
  3: 'Terza',
  4: 'Quarta',
  5: 'Quinta'
};

/**
 * Pagina Dashboard
 * Mostra la griglia degli argomenti e il selettore difficolt√†
 */
export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    selectedGrade,
    currentGradeTopics,
    selectedTopics,
    selectedCount,
    toggleTopic,
    setTopicExercises,
    clearExercises,
    globalDiff,
    topicDiffs,
    setSelectedGrade
  } = useAppContext();

  // Stato per il banner copyright (mostrato solo una volta)
  const [showCopyrightAlert, setShowCopyrightAlert] = useState(() => {
    const alreadyShown = localStorage.getItem('copyrightAlertShown');
    return !alreadyShown;
  });

  // Nascondi il banner dopo 3 secondi e salva che e stato mostrato
  useEffect(() => {
    if (showCopyrightAlert) {
      const timer = setTimeout(() => {
        setShowCopyrightAlert(false);
        localStorage.setItem('copyrightAlertShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCopyrightAlert]);

  // Gestione click su TopicCard
  const handleTopicClick = (topicId) => {
    toggleTopic(topicId);
  };

  // Genera scheda
  const handleGenerateWorksheet = () => {
    if (selectedCount === 0) return;
    
    // Genera esercizi reali usando il generatore unificato
    selectedTopics.forEach(topicId => {
      const diff = topicDiffs[topicId] || globalDiff || DIFFICULTY.LOW;
      const count = 6; // Numero fisso di esercizi per argomento
      const exercises = generateExercises(selectedGrade, topicId, diff, count);
      setTopicExercises(topicId, exercises);
    });
    
    navigate('/workspace');
  };

  // Calcola layout griglia (Bento style)
  // 12 colonne totali
  // Layout: 2 argomenti grandi (6 colonne) + 2 piccoli (3 colonne) per riga
  const getGridLayout = () => {
    const selectedIds = Array.from(selectedTopics);
    const allIds = currentGradeTopics.map(t => t.id);
    
    // Per ora semplice: 3 colonne per desktop, 2 per tablet, 1 per mobile
    return {
      xs: 12, // 1 colonna su mobile
      sm: 6,  // 2 colonne su tablet
      md: 4,  // 3 colonne su desktop piccolo
      lg: 3   // 3 colonne su desktop
    };
  };

  return (
    <div className="px-4 py-4">
      {/* Welcome Header */}
      <section className="mb-5 text-center pt-2">
        <h1 
          className="mb-3"
          style={{
            fontFamily: FONTS.HEADLINE,
            fontSize: '40px',
            fontWeight: '700',
            color: COLORS.PRIMARY
          }}
        >
          Ciao, Studente!
        </h1>
        <p 
          className="mx-auto mb-0"
          style={{
            fontFamily: FONTS.BODY,
            fontSize: '18px',
            color: COLORS.TEXT_SECONDARY,
            maxWidth: '500px',
            lineHeight: '1.6'
          }}
        >
          Benvenuto nel generatore di schede di matematica. 
          Scegli gli argomenti che preferisci e personalizza la tua esercitazione.
        </p>
        
        {showCopyrightAlert && (
          <Alert 
            variant="warning" 
            dismissible 
            className="mt-3 mx-auto"
            style={{ maxWidth: '600px' }}
            onClose={() => {
              setShowCopyrightAlert(false);
              localStorage.setItem('copyrightAlertShown', 'true');
            }}
          >
            <span className="material-symbols-outlined me-2" style={{ fontSize: '18px' }}>
              copyright
            </span>
            <strong>Propriet√† Intellettuale:</strong> Questo progetto √® di esclusiva propriet√† di Mindras Eugen Traian.
            Tutti i diritti sono riservati. Vietata la riproduzione non autorizzata.
          </Alert>
        )}
      </section>

      {/* Grade Selector */}
      <section className="mb-4">
        <div className="d-flex justify-content-center">
          <GradeSelector
            selectedGrade={selectedGrade}
            onGradeChange={setSelectedGrade}
          />
        </div>
      </section>

      {/* Difficulty Selector */}
      <section className="mb-5">
        <DifficultySelector />
      </section>

      {/* Topics Grid */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 
            className="mb-0"
            style={{
              fontFamily: FONTS.HEADLINE,
              fontSize: '24px',
              fontWeight: '700',
              color: COLORS.PRIMARY
            }}
          >
            Argomenti - Classe {gradeLabels[selectedGrade] || selectedGrade}
          </h2>
          
          <Badge 
            bg="secondary"
            className="px-3 py-2"
            style={{
              fontFamily: FONTS.BODY,
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            {selectedCount} selezionato{selectedCount !== 1 ? 'i' : ''}
          </Badge>
        </div>

        <Row className="g-3">
          {currentGradeTopics.map((topic) => (
            <Col 
              key={topic.id}
              xs={12} sm={6} md={4} lg={3}
            >
              <TopicCard
                topic={topic}
                isSelected={selectedTopics.has(topic.id)}
                onClick={() => handleTopicClick(topic.id)}
              />
            </Col>
          ))}
        </Row>
      </section>

      {/* Bottom Action */}
      <section className="text-center pb-4">
        <Button
          variant="primary"
          className="px-5 py-3 d-inline-flex align-items-center gap-3 shadow-sm"
          onClick={handleGenerateWorksheet}
          disabled={selectedCount === 0}
          style={{
            fontFamily: FONTS.HEADLINE,
            fontSize: '18px',
            fontWeight: '700'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
            task_alt
          </span>
          <span>Genera scheda personalizzata</span>
        </Button>
      </section>
    </div>
  );
}
