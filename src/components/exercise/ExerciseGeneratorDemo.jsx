import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button as BootstrapButton, Badge, Alert } from 'react-bootstrap';
import { COLORS, FONTS, DIFFICULTY, DIFF_LABELS } from '../../data/constants';
import ExerciseCard from './ExerciseCard.jsx';
import Button from '../common/Button.jsx';
import { grade1TopicMap } from '../../data/curriculum/grade1/index.js';
import { generateGrade1NumeriExercises } from '../../utils/exerciseGenerators/grade1/numeri.js';
import { validateGrade1NumeriAnswer } from '../../utils/validators/grade1/numeriValidator.js';

/**
 * Demo di Generazione e Visualizzazione Esercizi per Grado 1
 * Componente che mostra l'integrazione tra generatori, visualizzazione e validazione
 */
export default function ExerciseGeneratorDemo({ 
  topicId = 'grado1_numeri_conteggio',
  difficulty = DIFFICULTY.LOW,
  exerciseCount = 3 
}) {
  // Stato del componente
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [sessionStats, setSessionStats] = useState({
    total: 0,
    correct: 0,
    score: 0,
    maxScore: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Ottieni l'argomento corrente
  const topic = grade1TopicMap[topicId];

  // Carica gli esercizi all'avvio
  useEffect(() => {
    generateExercises();
  }, [topicId, difficulty, exerciseCount]);

  // Genera nuovi esercizi
  const generateExercises = useCallback(() => {
    setIsLoading(true);
    
    // Genera esercizi per l'argomento selezionato
    const newExercises = generateGrade1NumeriExercises(topicId, difficulty, exerciseCount);
    
    setExercises(newExercises);
    setCurrentExerciseIndex(0);
    setUserAnswers({});
    setResults({});
    setShowResults(false);
    
    // Calcola il punteggio massimo
    const maxScore = newExercises.reduce((sum, exercise) => sum + (exercise.points || 1), 0);
    setSessionStats({ total: newExercises.length, correct: 0, score: 0, maxScore });
    
    setIsLoading(false);
  }, [topicId, difficulty, exerciseCount]);

  // Gestione risposta utente
  const handleAnswer = useCallback((answer, isCorrect, exercise) => {
    const exerciseId = exercise.id;
    
    // Salva la risposta
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }));
    
    // Valida la risposta
    const validationResult = validateGrade1NumeriAnswer(answer, exercise);
    
    setResults(prev => ({
      ...prev,
      [exerciseId]: validationResult
    }));
    
    // Aggiorna le statistiche
    setSessionStats(prev => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      score: isCorrect ? prev.score + (exercise.points || 1) : prev.score
    }));
  }, []);

  // Cambia esercizio
  const goToExercise = useCallback((index) => {
    if (index >= 0 && index < exercises.length) {
      setCurrentExerciseIndex(index);
    }
  }, [exercises.length]);

  // Passa all'esercizio successivo
  const goToNext = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  }, [currentExerciseIndex, exercises.length]);

  // Torna all'esercizio precedente
  const goToPrevious = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  }, [currentExerciseIndex]);

  // Mostra tutti i risultati
  const showAllResults = useCallback(() => {
    setShowResults(true);
  }, []);

  // Resetta la sessione
  const resetSession = useCallback(() => {
    generateExercises();
  }, [generateExercises]);

  // Ottieni l'esercizio corrente
  const currentExercise = exercises[currentExerciseIndex];
  const currentResult = currentExercise ? results[currentExercise.id] : null;

  // Calcola la percentuale
  const percentage = sessionStats.maxScore > 0 ? 
    Math.round((sessionStats.score / sessionStats.maxScore) * 100) : 0;

  // Gestione selezione argomento
  const [selectedTopicId, setSelectedTopicId] = useState(topicId);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);

  const handleTopicChange = useCallback((newTopicId) => {
    setSelectedTopicId(newTopicId);
    setTopicId(newTopicId);
  }, []);

  const handleDifficultyChange = useCallback((newDifficulty) => {
    setSelectedDifficulty(newDifficulty);
    setDifficulty(newDifficulty);
  }, []);

  // Render selettore argomento
  const renderTopicSelector = () => (
    <Card className="mb-4" style={{ borderRadius: '12px', border: `2px solid ${COLORS.PRIMARY}` }}>
      <Card.Header style={{ backgroundColor: COLORS.PRIMARY, color: 'white' }}>
        <h5 style={{ margin: '0', fontFamily: FONTS.HEADLINE, fontWeight: '600' }}>
          Seleziona Argomento
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {Object.values(grade1TopicMap).filter(t => t.nucleo === 'numeri').map(topic => (
            <Col key={topic.id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                style={{
                  cursor: 'pointer',
                  border: `2px solid ${selectedTopicId === topic.id ? COLORS.PRIMARY : '#dee2e6'}`,
                  backgroundColor: selectedTopicId === topic.id ? COLORS.PRIMARY_LIGHTER : 'white',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => handleTopicChange(topic.id)}
              >
                <Card.Body className="text-center p-3">
                  <span 
                    className="material-symbols-outlined d-block mb-2"
                    style={{
                      fontSize: '32px',
                      color: COLORS.PRIMARY
                    }}
                  >
                    {topic.icon}
                  </span>
                  <h6 style={{ fontFamily: FONTS.HEADLINE, fontWeight: '600', color: COLORS.TEXT_PRIMARY }}>
                    {topic.name}
                  </h6>
                  <Badge 
                    bg={topic.difficulty === DIFFICULTY.LOW ? 'success' : 
                         topic.difficulty === DIFFICULTY.MID ? 'warning' : 'danger'}
                    style={{ fontFamily: FONTS.BODY, fontSize: '12px' }}
                  >
                    {DIFF_LABELS[topic.difficulty]}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );

  // Render selettore difficolta
  const renderDifficultySelector = () => (
    <Card className="mb-4" style={{ borderRadius: '12px', border: `2px solid ${COLORS.ACCENT}` }}>
      <Card.Header style={{ backgroundColor: COLORS.ACCENT, color: 'white' }}>
        <h5 style={{ margin: '0', fontFamily: FONTS.HEADLINE, fontWeight: '600' }}>
          Seleziona Difficoltà
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {Object.values(DIFFICULTY).map(diff => (
            <Col key={diff} xs={12} sm={4}>
              <Card 
                style={{
                  cursor: 'pointer',
                  border: `2px solid ${selectedDifficulty === diff ? COLORS.ACCENT : '#dee2e6'}`,
                  backgroundColor: selectedDifficulty === diff ? 'rgba(106, 58, 6, 0.1)' : 'white',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
                onClick={() => handleDifficultyChange(diff)}
              >
                <Card.Body className="p-3">
                  <Badge 
                    bg={diff === DIFFICULTY.LOW ? 'success' : 
                         diff === DIFFICULTY.MID ? 'warning' : 'danger'}
                    style={{
                      fontFamily: FONTS.BODY,
                      fontSize: '14px',
                      fontWeight: '600',
                      padding: '8px 16px'
                    }}
                  >
                    {DIFF_LABELS[diff]}
                  </Badge>
                  <p 
                    className="mt-2 mb-0"
                    style={{
                      fontFamily: FONTS.BODY,
                      fontSize: '13px',
                      color: COLORS.TEXT_SECONDARY
                    }}
                  >
                    {diff === DIFFICULTY.LOW ? 'Base' : 
                     diff === DIFFICULTY.MID ? 'Intermedio' : 'Avanzato'}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );

  // Render navigazione esercizi
  const renderExerciseNavigation = () => (
    <Card className="mb-4" style={{ borderRadius: '12px' }}>
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h5 style={{ margin: '0', fontFamily: FONTS.HEADLINE, fontWeight: '600' }}>
            Esercizio {currentExerciseIndex + 1} di {exercises.length}
          </h5>
          <p 
            className="mb-0 small"
            style={{ fontFamily: FONTS.BODY, color: COLORS.TEXT_SECONDARY }}
          >
            Punteggio: {sessionStats.score}/{sessionStats.maxScore} ({percentage}%)
          </p>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            onClick={goToPrevious}
            disabled={currentExerciseIndex === 0}
            size="sm"
            icon="chevron_left"
          >
            Precedente
          </Button>
          <Button
            variant="outline-primary"
            onClick={goToNext}
            disabled={currentExerciseIndex === exercises.length - 1}
            size="sm"
            icon="chevron_right"
            iconPosition="right"
          >
            Successivo
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  // Render area principale dell'esercizio
  const renderExerciseArea = () => {
    if (isLoading) {
      return (
        <Card style={{ borderRadius: '12px', border: `2px solid ${COLORS.PRIMARY_LIGHTER}` }}>
          <Card.Body className="text-center p-5">
            <div className="spinner-border" role="status" style={{ color: COLORS.PRIMARY }}>
              <span className="visually-hidden">Caricamento...</span>
            </div>
            <p className="mt-3" style={{ fontFamily: FONTS.BODY, color: COLORS.TEXT_SECONDARY }}>
              Generazione esercizi in corso...
            </p>
          </Card.Body>
        </Card>
      );
    }

    if (!currentExercise) {
      return (
        <Alert variant="info" style={{ borderRadius: '12px', border: 'none' }}>
          <h6 style={{ fontFamily: FONTS.HEADLINE, fontWeight: '600' }}>
            Nessun esercizio disponibile
          </h6>
          <p className="mb-0" style={{ fontFamily: FONTS.BODY }}>
            Seleziona un argomento e una difficolta per generare esercizi.
          </p>
        </Alert>
      );
    }

    return (
      <ExerciseCard
        exercise={currentExercise}
        onAnswer={handleAnswer}
        onSkip={goToNext}
        showSolution={false}
        userAnswer={userAnswers[currentExercise.id]}
        isCorrect={currentResult ? currentResult.isCorrect : false}
        isSubmitted={!!currentResult}
      />
    );
  };

  // Render riepilogo risultati
  const renderResultsSummary = () => (
    <Card className="mb-4" style={{ borderRadius: '12px', border: `2px solid ${percentage >= 60 ? '#28a745' : '#dc3545'}` }}>
      <Card.Header style={{ 
        backgroundColor: percentage >= 60 ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
        borderBottom: `1px solid ${percentage >= 60 ? '#28a745' : '#dc3545'}`
      }}>
        <h5 style={{ margin: '0', fontFamily: FONTS.HEADLINE, fontWeight: '600' }}>
          Riepilogo Sessione
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-4">
          <Col xs={12} md={6}>
            <div className="d-flex align-items-center gap-3">
              <span 
                className="material-symbols-outlined"
                style={{
                  fontSize: '40px',
                  color: percentage >= 60 ? '#28a745' : '#dc3545'
                }}
              >
                {percentage >= 90 ? 'emoji_events' : 
                 percentage >= 75 ? 'sentiment_very_satisfied' :
                 percentage >= 60 ? 'sentiment_satisfied' :
                 percentage >= 40 ? 'sentiment_neutral' : 'sentiment_very_dissatisfied'}
              </span>
              <div>
                <h3 
                  style={{
                    margin: '0',
                    fontFamily: FONTS.HEADLINE,
                    fontWeight: '700',
                    color: percentage >= 60 ? '#28a745' : '#dc3545'
                  }}
                >
                  {percentage}%
                </h3>
                <p 
                  className="mb-0"
                  style={{ fontFamily: FONTS.BODY, color: COLORS.TEXT_SECONDARY }}
                >
                  {sessionStats.correct} su {sessionStats.total} esercizi
                </p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h6 style={{ fontFamily: FONTS.HEADLINE, fontWeight: '600', color: COLORS.TEXT_PRIMARY }}>
                Punteggio
              </h6>
              <div className="d-flex align-items-center gap-2">
                <span 
                  className="material-symbols-outlined"
                  style={{ fontSize: '20px', color: COLORS.ACCENT }}
                >
                  star
                </span>
                <strong style={{ fontFamily: FONTS.BODY, fontSize: '18px' }}>
                  {sessionStats.score}/{sessionStats.maxScore}
                </strong>
              </div>
              <div className="mt-3">
                <Button 
                  variant="primary"
                  onClick={resetSession}
                  size="md"
                  className="w-100"
                >
                  <span 
                    className="material-symbols-outlined me-2"
                    style={{ fontSize: '18px' }}
                  >
                    refresh
                  </span>
                  Nuova Sessione
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        {showResults && (
          <div className="mt-4">
            <h6 style={{ fontFamily: FONTS.HEADLINE, fontWeight: '600', color: COLORS.TEXT_PRIMARY }}>
              Dettaglio Risposte
            </h6>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {exercises.map((exercise, index) => {
                const result = results[exercise.id];
                return (
                  <Card 
                    key={exercise.id}
                    className="mb-2"
                    style={{
                      borderRadius: '8px',
                      border: `2px solid ${result?.isCorrect ? '#28a745' : '#dc3545'}`,
                      backgroundColor: result?.isCorrect ? 'rgba(40, 167, 69, 0.05)' : 'rgba(220, 53, 69, 0.05)'
                    }}
                  >
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="grow">
                          <p 
                            className="mb-1"
                            style={{
                              fontFamily: FONTS.BODY,
                              fontSize: '14px',
                              fontWeight: '600',
                              color: COLORS.TEXT_PRIMARY
                            }}
                            dangerouslySetInnerHTML={{ __html: exercise.question }}
                          />
                          <p 
                            className="mb-0 small"
                            style={{
                              fontFamily: FONTS.BODY,
                              color: COLORS.TEXT_SECONDARY
                            }}
                          >
                            {userAnswers[exercise.id] || 'Non risposto'}
                          </p>
                        </div>
                        <span 
                          className="material-symbols-outlined"
                          style={{
                            fontSize: '20px',
                            color: result?.isCorrect ? '#28a745' : '#dc3545',
                            flexShrink: 0
                          }}
                        >
                          {result?.isCorrect ? 'check_circle' : 'cancel'}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="px-4 py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center gap-3">
            <span 
              className="material-symbols-outlined"
              style={{
                fontSize: '40px',
                color: COLORS.PRIMARY
              }}
            >
              school
            </span>
            <div>
              <h2 style={{ 
                margin: '0',
                fontFamily: FONTS.HEADLINE,
                fontWeight: '700',
                color: COLORS.TEXT_PRIMARY 
              }}>
                ClearMath - Grado 1
              </h2>
              <p 
                className="mb-0"
                style={{ 
                  fontFamily: FONTS.BODY,
                  color: COLORS.TEXT_SECONDARY,
                  fontSize: '14px'
                }}
              >
                Demo Generatore Esercizi - Nucleo Numeri
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Selettori */}
      {renderTopicSelector()}
      {renderDifficultySelector()}

      {/* Navigazione */}
      {exercises.length > 0 && renderExerciseNavigation()}

      {/* Area Esercizio */}
      {renderExerciseArea()}

      {/* Pulsanti di azione */}
      {exercises.length > 0 && currentExerciseIndex === exercises.length - 1 && (
        <div className="d-flex justify-content-center gap-3 mb-4">
          <Button
            variant="outline-secondary"
            onClick={showAllResults}
            size="lg"
            icon="bar_chart"
          >
            Mostra Risultati
          </Button>
          <Button
            variant="primary"
            onClick={resetSession}
            size="lg"
            icon="refresh"
          >
            Nuova Sessione
          </Button>
        </div>
      )}

      {/* Riepilogo */}
      {exercises.length > 0 && renderResultsSummary()}

      {/* Spazio */}
      <div style={{ height: '40px' }} />
    </Container>
  );
}

// Stili aggiuntivi
const styles = {
  card: {
    borderRadius: '12px',
    transition: 'all 0.2s ease'
  }
};

// Esporta componenti utili per il riutilizzo

/**
 * Componente singolo esercizio con gestione completa
 */
export function SingleExercise({ 
  exercise, 
  onAnswer, 
  onSkip,
  showSolution = false,
  disabled = false 
}) {
  return (
    <ExerciseCard
      exercise={exercise}
      onAnswer={onAnswer}
      onSkip={onSkip}
      showSolution={showSolution}
      disabled={disabled}
    />
  );
}

/**
 * Componente sessione completa di esercizi
 */
export function ExerciseSession({ 
  topicId,
  difficulty = DIFFICULTY.LOW,
  count = 5,
  onComplete 
}) {
  const [session, setSession] = useState(null);
  
  // Genera la sessione
  useEffect(() => {
    const newSession = {
      topicId,
      difficulty,
      exercises: generateGrade1NumeriExercises(topicId, difficulty, count),
      answers: {},
      results: {},
      stats: {
        correct: 0,
        total: count,
        score: 0,
        maxScore: 0
      }
    };
    
    setSession(newSession);
    
    if (onComplete) {
      onComplete(newSession);
    }
  }, [topicId, difficulty, count, onComplete]);
  
  if (!session) return null;
  
  return (
    <div>
      {session.exercises.map(exercise => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onAnswer={(answer, isCorrect) => {
            // TODO: gestire risposta
          }}
        />
      ))}
    </div>
  );
}
