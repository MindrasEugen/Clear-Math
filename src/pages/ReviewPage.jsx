import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Badge, Form, ListGroup } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';
import { TOPICS } from '../data/topics';
import { COLORS, FONTS } from '../data/constants';
import { randomInt, randomChoice } from '../utils/random';

/**
 * Pagina Centro Ripasso
 * Contiene sfida quotidiana, statistiche e consigli di studio
 */
export default function ReviewPage() {
  const { selectedCount, totalExercises } = useAppContext();
  
  // Stato locale per la sfida
  const [challenge, setChallenge] = useState({
    question: '24 × 5 = ?',
    answer: '120'
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Genera nuova sfida
  const generateNewChallenge = () => {
    const operations = ['+', '-', '×', '÷'];
    const op = randomChoice(operations);
    let question, answer;
    
    if (op === '+' || op === '-') {
      const a = randomInt(10, 100);
      const b = randomInt(10, 100);
      if (op === '+') {
        question = `${a} + ${b} = ?`;
        answer = String(a + b);
      } else {
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        question = `${max} - ${min} = ?`;
        answer = String(max - min);
      }
    } else if (op === '×') {
      const a = randomInt(2, 12);
      const b = randomInt(2, 12);
      question = `${a} × ${b} = ?`;
      answer = String(a * b);
    } else {
      const a = randomInt(2, 12);
      const b = randomInt(2, 12);
      question = `${a * b} ÷ ${a} = ?`;
      answer = String(b);
    }
    
    setChallenge({ question, answer });
    setUserAnswer('');
    setFeedback(null);
    setIsCorrect(null);
  };

  // Verifica risposta
  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    
    const isCorrect = userAnswer.trim() === challenge.answer;
    setIsCorrect(isCorrect);
    setFeedback(isCorrect ? 'Corretto! ✓' : `Sbagliato. La risposta corretta è: ${challenge.answer}`);
  };

  // Handler change input
  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Handler key press (Enter)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  // Genera sfida iniziale
  useEffect(() => {
    generateNewChallenge();
  }, []);

  // Statistiche
  const stats = {
    selectedTopics: selectedCount,
    totalExercises: totalExercises,
    completedToday: 0, // TODO: Implementare tracking
    correctAnswers: 0 // TODO: Implementare tracking
  };

  // Consigli di studio
  const studyTips = [
    {
      title: 'Esegui i calcoli con calma',
      description: 'La precisione è molto più importante della velocità quando risolvi problemi complessi.'
    },
    {
      title: 'Rileggi i problemi',
      description: 'Nei testi delle domande, individua sempre i numeri chiave (dati) ed evidenzia bene la domanda finale.'
    },
    {
      title: 'Frazioni visive',
      description: 'Quando lavori con le frazioni, prova a immaginare una torta divisa in fette. Ti aiuterà a confrontarle!'
    },
    {
      title: 'Tabelline a memoria',
      description: 'Conoscere le tabelline fino al 10 a memoria ti farà risparmiare molto tempo.'
    },
    {
      title: 'Verifica sempre',
      description: 'Dopo aver risolto un problema, rileggilo e verifica che la risposta abbia senso.'
    }
  ];

  return (
    <div className="px-4 py-4">
      {/* Page Header */}
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
          Centro di Ripasso
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
          Allena la mente con sfide rapide e scopri utili consigli per lo studio quotidiano.
        </p>
      </section>

      {/* Main Grid */}
      <Row className="g-4">
        {/* Left Column - Challenge */}
        <Col lg={7}>
          <Card className="h-100 border-secondary">
            <Card.Body className="d-flex flex-column h-100">
              {/* Challenge Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span 
                  className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill text-xs font-bold"
                  style={{
                    fontFamily: FONTS.BODY,
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}
                >
                  SFIDA RAPIDA
                </span>
                <span className="text-secondary text-xs">Risolvi a mente</span>
              </div>

              <h3 
                className="mb-3"
                style={{
                  fontFamily: FONTS.HEADLINE,
                  fontSize: '20px',
                  fontWeight: '700',
                  color: COLORS.PRIMARY
                }}
              >
                La Sfida del Giorno
              </h3>
              
              <p 
                className="text-secondary mb-4"
                style={{
                  fontFamily: FONTS.BODY,
                  fontSize: '14px'
                }}
              >
                Metti alla prova le tue abilità aritmetiche inserendo la risposta corretta. 
                Clicca su "Verifica" per controllare.
              </p>

              {/* Challenge Box */}
              <div className="bg-light rounded-3 p-4 grow d-flex flex-column justify-content-center mb-4">
                <div className="text-center mb-4">
                  <div 
                    className="text-primary mb-3"
                    style={{
                      fontFamily: FONTS.HEADLINE,
                      fontSize: '32px',
                      fontWeight: '700'
                    }}
                  >
                    {challenge.question}
                  </div>
                  
                  <div className="d-flex gap-2 justify-content-center">
                    <Form.Control
                      type="text"
                      placeholder="Tua risposta..."
                      value={userAnswer}
                      onChange={handleAnswerChange}
                      onKeyPress={handleKeyPress}
                      className="text-center"
                      style={{
                        width: '200px',
                        fontFamily: FONTS.BODY,
                        fontSize: '20px',
                        fontWeight: '700',
                        border: '2px solid #dee2e6',
                        borderRadius: '8px'
                      }}
                    />
                    <Button
                      variant="primary"
                      onClick={checkAnswer}
                      className="px-4 py-2"
                      style={{
                        fontFamily: FONTS.BODY,
                        fontSize: '14px',
                        fontWeight: '700'
                      }}
                    >
                      Verifica
                    </Button>
                  </div>
                  
                  {/* Feedback */}
                  {feedback && (
                    <div 
                      className={`mt-3 p-2 rounded-2 ${isCorrect ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}
                      style={{
                        fontFamily: FONTS.BODY,
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      {feedback}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-end">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none text-primary"
                  onClick={generateNewChallenge}
                  style={{
                    fontFamily: FONTS.BODY,
                    fontSize: '13px',
                    fontWeight: '600'
                  }}
                >
                  Prossima sfida
                  <span className="material-symbols-outlined ms-1" style={{ fontSize: '16px' }}>
                    arrow_forward
                  </span>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Stats and Tips */}
        <Col lg={5}>
          <div className="d-flex flex-column gap-4 h-100">
            {/* Stats Widget */}
            <Card className="border-secondary">
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>
                    insights
                  </span>
                  <span 
                    className="mb-0"
                    style={{
                      fontFamily: FONTS.HEADLINE,
                      fontSize: '16px',
                      fontWeight: '700',
                      color: COLORS.PRIMARY
                    }}
                  >
                    I Tuoi Progressi
                  </span>
                </Card.Title>
                
                <Row className="g-3">
                  <Col xs={6}>
                    <Card className="border-0 bg-light">
                      <Card.Body className="text-center p-3">
                        <div 
                          className="text-primary"
                          style={{
                            fontFamily: FONTS.HEADLINE,
                            fontSize: '28px',
                            fontWeight: '700'
                          }}
                        >
                          {stats.selectedTopics}
                        </div>
                        <div 
                          className="text-secondary small"
                          style={{
                            fontFamily: FONTS.BODY,
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          Capitoli Scelti
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={6}>
                    <Card className="border-0 bg-light">
                      <Card.Body className="text-center p-3">
                        <div 
                          className="text-primary"
                          style={{
                            fontFamily: FONTS.HEADLINE,
                            fontSize: '28px',
                            fontWeight: '700'
                          }}
                        >
                          {stats.totalExercises}
                        </div>
                        <div 
                          className="text-secondary small"
                          style={{
                            fontFamily: FONTS.BODY,
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          Esercizi Generati
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Tips Widget */}
            <Card className="border-secondary grow">
              <Card.Body className="d-flex flex-column h-100">
                <Card.Title className="d-flex align-items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>
                    lightbulb
                  </span>
                  <span 
                    className="mb-0"
                    style={{
                      fontFamily: FONTS.HEADLINE,
                      fontSize: '16px',
                      fontWeight: '700',
                      color: COLORS.PRIMARY
                    }}
                  >
                    Consigli di Studio
                  </span>
                </Card.Title>
                
                <ListGroup variant="flush" className="grow overflow-y-auto">
                  {studyTips.map((tip, index) => (
                    <ListGroup.Item 
                      key={index}
                      className="border-0 px-0 py-2"
                    >
                      <div className="d-flex gap-2">
                        <span 
                          className="text-primary"
                          style={{
                            fontWeight: '700',
                            fontSize: '16px'
                          }}
                        >
                          •
                        </span>
                        <div>
                          <strong 
                            style={{
                              fontFamily: FONTS.BODY,
                              fontSize: '14px',
                              color: COLORS.TEXT_PRIMARY
                            }}
                          >
                            {tip.title}
                          </strong>
                          <span 
                            className="ms-1"
                            style={{
                              fontFamily: FONTS.BODY,
                              fontSize: '14px',
                              color: COLORS.TEXT_SECONDARY,
                              lineHeight: '1.5'
                            }}
                          >
                            {tip.description}
                          </span>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
