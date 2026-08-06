import React, { useState, useEffect, useCallback } from 'react';
import { Card, Badge, Form, Button as BootstrapButton, Alert } from 'react-bootstrap';
import { COLORS, FONTS, DIFF_LABELS, DIFFICULTY } from '../../data/constants';
import Button from '../common/Button.jsx';

/**
 * Componente ExerciseCard
 * Mostra un esercizio interattivo con domanda, opzioni di risposta e feedback
 * 
 * @param {Object} props - Proprietà del componente
 * @param {Object} props.exercise - Oggetto esercizio da visualizzare
 * @param {Function} props.onAnswer - Callback quando viene data una risposta
 * @param {Function} props.onSkip - Callback per saltare l'esercizio
 * @param {Function} props.onHint - Callback per richiedere un suggerimento
 * @param {boolean} props.showSolution - Se mostrare la soluzione
 * @param {boolean} props.disabled - Se l'esercizio è disabilitato
 * @param {string} props.userAnswer - Risposta corrente dell'utente
 * @param {boolean} props.isCorrect - Se la risposta è corretta
 * @param {boolean} props.isSubmitted - Se la risposta è stata inviata
 * @param {Object} props.style - Stili inline aggiuntivi
 * @param {string} props.className - Classi CSS aggiuntive
 */
export default function ExerciseCard({
  exercise,
  onAnswer,
  onSkip,
  onHint,
  showSolution = false,
  disabled = false,
  userAnswer,
  isCorrect = false,
  isSubmitted = false,
  style = {},
  className = ''
}) {
  // Gestione stato locale se non fornito
  const [localAnswer, setLocalAnswer] = useState(userAnswer || '');
  const [localIsSubmitted, setLocalIsSubmitted] = useState(isSubmitted);
  const [localIsCorrect, setLocalIsCorrect] = useState(isCorrect);
  const [showHintIndex, setShowHintIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  // Aggiorna stato locale quando cambiano le props
  useEffect(() => {
    setLocalAnswer(userAnswer || '');
    setLocalIsSubmitted(isSubmitted);
    setLocalIsCorrect(isCorrect);
  }, [userAnswer, isSubmitted, isCorrect]);

  // Tipi di esercizio gestiti
  const exerciseTypes = {
    'multipla': 'Scelta Multipla',
    'aperta': 'Risposta Aperta',
    'verofalso': 'Vero/Falso',
    'completamento': 'Completamento',
    'calcolo': 'Calcolo',
    'algebrico': 'Algebrico',
    'geometrico': 'Geometrico',
    'grafico': 'Grafico',
    'dimostrazione': 'Dimostrazione',
    'problema': 'Problema',
    'abbinamento': 'Abbinamento',
    'ordinamento': 'Ordinamento'
  };

  // Icone per tipo di esercizio
  const exerciseIcons = {
    'multipla': 'radio_button_checked',
    'aperta': 'edit',
    'verofalso': 'check_circle',
    'completamento': 'text_fields',
    'calcolo': 'calculate',
    'algebrico': 'functions',
    'geometrico': 'shapes',
    'grafico': 'graphic_eq',
    'dimostrazione': 'verified_user',
    'problema': 'help',
    'abbinamento': 'swap_horiz',
    'ordinamento': 'sort'
  };

  // Handler per cambio risposta
  const handleAnswerChange = useCallback((value) => {
    setLocalAnswer(value);
    setShowFeedback(false);
  }, []);

  // Handler per invio risposta
  const handleSubmit = useCallback(() => {
    if (disabled || localIsSubmitted) return;
    
    setLocalIsSubmitted(true);
    
    // Verifica risposta
    const correct = checkAnswer(localAnswer, exercise);
    setLocalIsCorrect(correct);
    setShowFeedback(true);
    
    // Chiamata callback
    if (onAnswer) {
      onAnswer(localAnswer, correct);
    }
  }, [disabled, localIsSubmitted, localAnswer, exercise, onAnswer]);

  // Verifica se la risposta è corretta
  const checkAnswer = (answer, exercise) => {
    if (!answer || !exercise) return false;

    switch (exercise.type) {
      case 'multipla':
        const correctOption = exercise.options?.find(opt => opt.correct);
        return answer === correctOption?.id;
      
      case 'verofalso':
        return answer === exercise.answer.value;
      
      case 'calcolo':
      case 'aperta':
        // Confronto stringhe (per ora semplice)
        return String(answer).toLowerCase().trim() === 
               String(exercise.answer.value).toLowerCase().trim();
      
      default:
        return false;
    }
  };

  // Ottieni il prossimo suggerimento
  const getNextHint = useCallback(() => {
    if (exercise.hints && showHintIndex < exercise.hints.length) {
      setShowHintIndex(prev => Math.min(prev + 1, exercise.hints.length));
      return exercise.hints[Math.min(showHintIndex, exercise.hints.length - 1)];
    }
    return null;
  }, [exercise.hints, showHintIndex]);

  // Handler per richiedere suggerimento
  const handleHintRequest = useCallback(() => {
    if (exercise.hints && showHintIndex < exercise.hints.length) {
      setShowHintIndex(prev => prev + 1);
      if (onHint) {
        onHint(exercise.hints[showHintIndex]);
      }
    }
  }, [exercise.hints, showHintIndex, onHint]);

  // Render badge difficoltà
  const renderDifficultyBadge = () => (
    <Badge 
      bg={exercise.difficulty === DIFFICULTY.LOW ? 'success' : 
           exercise.difficulty === DIFFICULTY.MID ? 'warning' : 'danger'}
      className="px-2 py-1"
      style={{
        fontFamily: FONTS.BODY,
        fontSize: '11px',
        fontWeight: '600'
      }}
    >
      {DIFF_LABELS[exercise.difficulty] || exercise.difficulty}
    </Badge>
  );

  // Render tipo di esercizio
  const renderExerciseType = () => {
    const typeName = exerciseTypes[exercise.type] || exercise.type;
    const icon = exerciseIcons[exercise.type] || 'help';
    
    return (
      <div className="d-flex align-items-center gap-1">
        <span 
          className="material-symbols-outlined"
          style={{
            fontSize: '14px',
            color: COLORS.PRIMARY,
            opacity: '0.8'
          }}
        >
          {icon}
        </span>
        <span 
          style={{
            fontFamily: FONTS.BODY,
            fontSize: '13px',
            color: COLORS.TEXT_SECONDARY,
            opacity: '0.8'
          }}
        >
          {typeName}
        </span>
      </div>
    );
  };

  // Render punti
  const renderPoints = () => (
    <div className="d-flex align-items-center gap-1">
      <span 
        className="material-symbols-outlined"
        style={{
          fontSize: '14px',
          color: COLORS.ACCENT
        }}
      >
        star
      </span>
      <span 
        style={{
          fontFamily: FONTS.BODY,
          fontSize: '13px',
          color: COLORS.TEXT_SECONDARY,
          fontWeight: '600'
        }}
      >
        {exercise.points || 1} pt
      </span>
    </div>
  );

  // Render tempo stimato
  const renderEstimatedTime = () => {
    if (!exercise.estimatedTime) return null;
    
    return (
      <div className="d-flex align-items-center gap-1">
        <span 
          className="material-symbols-outlined"
          style={{
            fontSize: '14px',
            color: COLORS.TEXT_SECONDARY
          }}
        >
          timer
        </span>
        <span 
          style={{
            fontFamily: FONTS.BODY,
            fontSize: '13px',
            color: COLORS.TEXT_SECONDARY
          }}
        >
          {exercise.estimatedTime} min
        </span>
      </div>
    );
  };

  // Render area della domanda
  const renderQuestion = () => {
    return (
      <div 
        className="mb-4"
        style={{
          fontFamily: FONTS.BODY,
          fontSize: '16px',
          lineHeight: '1.7',
          color: COLORS.TEXT_PRIMARY
        }}
      >
        {exercise.mathQuestion ? (
          <div 
            className="d-flex flex-column gap-2"
            style={{
              fontFamily: FONTS.BODY,
              fontSize: '16px',
              lineHeight: '1.7'
            }}
          >
            <span>{exercise.question}</span>
            <div 
              className="math-display"
              style={{
                fontFamily: FONTS.BODY,
                fontSize: '18px',
                lineHeight: '2',
                padding: '10px',
                backgroundColor: 'rgba(0, 77, 91, 0.05)',
                borderRadius: '8px'
              }}
              dangerouslySetInnerHTML={{ __html: exercise.mathQuestion }}
            />
          </div>
        ) : (
          exercise.question
        )}
      </div>
    );
  };

  // Render opzioni per scelta multipla
  const renderMultipleChoiceOptions = () => {
    if (exercise.type !== 'multipla' || !exercise.options) return null;

    return (
      <Form>
        {exercise.options.map((option, index) => {
          const isSelected = localAnswer === option.id;
          const isCorrectOption = option.correct;
          const showResult = localIsSubmitted;
          
          // Determina lo stile del bordo
          let borderColor = '#dee2e6';
          let backgroundColor = 'transparent';
          
          if (showResult) {
            if (isSelected && isCorrectOption) {
              borderColor = '#28a745';
              backgroundColor = 'rgba(40, 167, 69, 0.1)';
            } else if (isSelected && !isCorrectOption) {
              borderColor = '#dc3545';
              backgroundColor = 'rgba(220, 53, 69, 0.1)';
            } else if (isCorrectOption) {
              borderColor = '#28a745';
              backgroundColor = 'rgba(40, 167, 69, 0.05)';
            }
          } else if (isSelected) {
            borderColor = COLORS.PRIMARY;
            backgroundColor = COLORS.PRIMARY_LIGHTER;
          }

          return (
            <Form.Check
              key={option.id}
              type="radio"
              id={`option-${option.id}`}
              name="exercise-answer"
              label={(
                <div 
                  className="d-flex align-items-center gap-2 p-3 rounded-3"
                  style={{
                    border: `2px solid ${borderColor}`,
                    backgroundColor: backgroundColor,
                    cursor: disabled || localIsSubmitted ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: FONTS.BODY,
                    fontSize: '15px'
                  }}
                  onClick={() => !disabled && !localIsSubmitted && handleAnswerChange(option.id)}
                >
                  {option.mathLabel ? (
                    <span 
                      className="math-display"
                      dangerouslySetInnerHTML={{ __html: option.mathLabel }}
                    />
                  ) : (
                    <span style={{ color: COLORS.TEXT_PRIMARY }}>{option.label}</span>
                  )}
                </div>
              )}
              checked={isSelected}
              onChange={() => !disabled && !localIsSubmitted && handleAnswerChange(option.id)}
              disabled={disabled || localIsSubmitted}
              style={{ display: 'none' }}
            />
          );
        })}
      </Form>
    );
  };

  // Render area risposta aperta
  const renderOpenAnswer = () => {
    if (exercise.type !== 'aperta' && exercise.type !== 'calcolo' && exercise.type !== 'algebrico') return null;

    return (
      <Form.Control
        type="text"
        value={localAnswer}
        onChange={(e) => !disabled && !localIsSubmitted && handleAnswerChange(e.target.value)}
        placeholder="Inserisci la tua risposta..."
        disabled={disabled || localIsSubmitted}
        isInvalid={localIsSubmitted && !localIsCorrect}
        isValid={localIsSubmitted && localIsCorrect}
        style={{
          fontFamily: FONTS.BODY,
          fontSize: '16px',
          padding: '12px 16px',
          borderRadius: '8px',
          border: `2px solid ${localIsSubmitted && localIsCorrect ? '#28a745' : 
                                    localIsSubmitted && !localIsCorrect ? '#dc3545' : '#dee2e6'}`
        }}
      />
    );
  };

  // Render vero/falso
  const renderTrueFalse = () => {
    if (exercise.type !== 'verofalso') return null;

    const options = [
      { id: 'true', label: 'Vero', icon: 'check_circle', value: true },
      { id: 'false', label: 'Falso', icon: 'cancel', value: false }
    ];

    return (
      <div className="d-flex gap-3">
        {options.map((option) => {
          const isSelected = localAnswer === option.value;
          const isCorrectOption = exercise.answer?.value === option.value;
          const showResult = localIsSubmitted;
          
          let borderColor = '#dee2e6';
          let backgroundColor = 'transparent';
          let color = COLORS.TEXT_PRIMARY;
          
          if (showResult) {
            if (isSelected && isCorrectOption) {
              borderColor = '#28a745';
              backgroundColor = 'rgba(40, 167, 69, 0.1)';
            } else if (isSelected && !isCorrectOption) {
              borderColor = '#dc3545';
              backgroundColor = 'rgba(220, 53, 69, 0.1)';
              color = '#dc3545';
            } else if (isCorrectOption) {
              borderColor = '#28a745';
              backgroundColor = 'rgba(40, 167, 69, 0.05)';
            }
          } else if (isSelected) {
            borderColor = COLORS.PRIMARY;
            backgroundColor = COLORS.PRIMARY_LIGHTER;
          }

          return (
            <div
              key={option.id}
              onClick={() => !disabled && !localIsSubmitted && handleAnswerChange(option.value)}
              style={{
                flex: 1,
                padding: '12px 20px',
                border: `2px solid ${borderColor}`,
                backgroundColor: backgroundColor,
                borderRadius: '8px',
                cursor: disabled || localIsSubmitted ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                fontFamily: FONTS.BODY,
                fontSize: '16px',
                fontWeight: '600',
                color: color
              }}
            >
              <span 
                className="material-symbols-outlined"
                style={{
                  fontSize: '20px',
                  marginRight: '8px',
                  verticalAlign: 'middle'
                }}
              >
                {option.icon}
              </span>
              {option.label}
            </div>
          );
        })}
      </div>
    );
  };

  // Render feedback
  const renderFeedback = () => {
    if (!showFeedback) return null;

    return (
      <Alert 
        variant={localIsCorrect ? 'success' : 'danger'}
        className="mt-4 mb-0"
        style={{
          borderRadius: '8px',
          border: 'none',
          padding: '12px 16px',
          fontFamily: FONTS.BODY,
          fontSize: '15px',
          lineHeight: '1.5'
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <span 
            className="material-symbols-outlined"
            style={{
              fontSize: '20px',
              flexShrink: 0
            }}
          >
            {localIsCorrect ? 'check_circle' : 'cancel'}
          </span>
          <div>
            {localIsCorrect ? (
              <strong style={{ color: '#155724' }}>Risposta corretta! ✓</strong>
            ) : (
              <strong style={{ color: '#721c24' }}>Risposta sbagliata ✗</strong>
            )}
            {exercise.solution && showSolution && (
              <div 
                className="mt-2"
                style={{
                  fontSize: '14px',
                  opacity: '0.9',
                  padding: '10px',
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  borderRadius: '6px'
                }}
              >
                <strong>Soluzione:</strong> {exercise.solution}
              </div>
            )}
          </div>
        </div>
      </Alert>
    );
  };

  // Render suggerimenti
  const renderHints = () => {
    if (!exercise.hints || exercise.hints.length === 0) return null;

    const currentHint = exercise.hints[showHintIndex - 1];
    const hasMoreHints = showHintIndex < exercise.hints.length;

    return (
      <div 
        className="mt-3"
        style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(134, 210, 229, 0.1)',
          borderRadius: '8px',
          border: `1px solid ${COLORS.PRIMARY_LIGHTER}`
        }}
      >
        {currentHint && (
          <div 
            className="d-flex align-items-start gap-2"
            style={{
              fontFamily: FONTS.BODY,
              fontSize: '14px',
              lineHeight: '1.5',
              color: COLORS.TEXT_SECONDARY
            }}
          >
            <span 
              className="material-symbols-outlined"
              style={{
                fontSize: '16px',
                color: COLORS.PRIMARY,
                flexShrink: 0,
                marginTop: '2px'
              }}
            >
              lightbulb
            </span>
            <div>
              <strong style={{ color: COLORS.PRIMARY, fontSize: '13px' }}>
                Suggerimento {showHintIndex}:
              </strong>
              <span style={{ fontSize: '14px' }}> {currentHint.content}</span>
              {hasMoreHints && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleHintRequest}
                  className="mt-2"
                  style={{
                    fontFamily: FONTS.BODY,
                    fontSize: '12px',
                    padding: '4px 8px',
                    height: '28px'
                  }}
                >
                  Altro suggerimento
                </Button>
              )}
            </div>
          </div>
        )}
        {!currentHint && hasMoreHints && (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleHintRequest}
            className="w-100"
            style={{
              fontFamily: FONTS.BODY,
              fontSize: '13px'
            }}
          >
            <span 
              className="material-symbols-outlined me-2"
              style={{ fontSize: '16px' }}
            >
              help
            </span>
            Richiedi suggerimento
          </Button>
        )}
      </div>
    );
  };

  // Render pulsanti di azione
  const renderActions = () => {
    if (disabled || localIsSubmitted) return null;

    return (
      <div className="d-flex justify-content-between gap-3 mt-4">
        {onSkip && (
          <Button
            variant="outline-secondary"
            onClick={onSkip}
            size="md"
            style={{
              flex: 1,
              fontFamily: FONTS.BODY,
              fontSize: '14px'
            }}
          >
            Salta
          </Button>
        )}
        
        <Button
          variant="primary"
          onClick={handleSubmit}
          size="md"
          disabled={!localAnswer}
          style={{
            flex: 2,
            fontFamily: FONTS.BODY,
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          <span 
            className="material-symbols-outlined me-2"
            style={{ fontSize: '18px' }}
          >
            check_circle
          </span>
          Verifica risposta
        </Button>
      </div>
    );
  };

  // Contenuto principale della card
  const renderContent = () => {
    return (
      <>
        {/* Header con info */}
        <Card.Header 
          className="bg-transparent border-bottom-0 p-3"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div className="d-flex align-items-center gap-3 flex-wrap">
            {renderDifficultyBadge()}
            {renderExerciseType()}
          </div>
          <div className="d-flex align-items-center gap-3">
            {renderPoints()}
            {renderEstimatedTime()}
          </div>
        </Card.Header>

        {/* Body con domanda e risposte */}
        <Card.Body className="p-3">
          {renderQuestion()}
          
          {/* Area di risposta in base al tipo */}
          {renderMultipleChoiceOptions()}
          {renderTrueFalse()}
          {renderOpenAnswer()}
          
          {/* Suggerimenti */}
          {renderHints()}
          
          {/* Feedback */}
          {renderFeedback()}
          
          {/* Pulsanti di azione */}
          {renderActions()}
          
          {/* Soluzione (se richiesto) */}
          {showSolution && !localIsSubmitted && exercise.solution && (
            <div 
              className="mt-4 p-3"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '8px',
                border: `1px solid #dee2e6`,
                fontFamily: FONTS.BODY,
                fontSize: '14px',
                lineHeight: '1.6',
                color: COLORS.TEXT_SECONDARY
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <span 
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '18px',
                    color: COLORS.PRIMARY
                  }}
                >
                  description
                </span>
                <strong style={{ color: COLORS.TEXT_PRIMARY }}>Soluzione:</strong>
              </div>
              {exercise.solution}
            </div>
          )}
        </Card.Body>
      </>
    );
  };

  return (
    <Card
      className={`h-100 ${className}`}
      style={{
        borderRadius: '12px',
        border: `2px solid ${disabled ? '#98a6ad' : '#dee2e6'}`,
        backgroundColor: disabled ? '#f8f9fa' : '#ffffff',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.7 : 1,
        ...style
      }}
    >
      {renderContent()}
    </Card>
  );
}

// Costanti per uso comune
export const ExerciseCardTypes = {
  MULTIPLE_CHOICE: 'multipla',
  OPEN_ANSWER: 'aperta',
  TRUE_FALSE: 'verofalso',
  COMPLETION: 'completamento',
  CALCULATION: 'calcolo',
  ALGEBRAIC: 'algebrico',
  GEOMETRY: 'geometrico',
  GRAPHIC: 'grafico',
  DEMONSTRATION: 'dimostrazione',
  PROBLEM: 'problema',
  MATCHING: 'abbinamento',
  ORDERING: 'ordinamento'
};
