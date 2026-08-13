import React, { useState } from 'react';
import { Button, Card, Form, ProgressBar, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getAnyTopicById, getGradeInfo } from '../data/curriculum/index.js';
import { COLORS, FONTS, SIDEBAR_WIDTH } from '../data/constants';
import { isAnswerCorrect } from '../utils/answerValidator.js';
import { downloadWorksheetPdf } from '../services/pdfService.js';

/**
 * Pagina Area di Lavoro
 * Mostra la scheda generata con gli esercizi
 */
export default function WorkspacePage() {
  const navigate = useNavigate();
  const {
    selectedTopics,
    selectedGrade,
    exercises,
    studentData,
    studentAnswers,
    updateStudentData,
    setAnswer,
    recordAnswerResults,
    totalExercises
  } = useAppContext();

  // Risultati dell'ultima verifica (exerciseId -> boolean), solo per feedback visivo
  const [checkedResults, setCheckedResults] = useState({});

  // Se non ci sono esercizi, mostra messaggio
  if (totalExercises === 0) {
    return (
      <div 
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ 
          minHeight: `calc(100vh - ${SIDEBAR_WIDTH})`,
          padding: '40px'
        }}
      >
        <div 
          className="text-center p-5 bg-white rounded-3 shadow-sm"
          style={{ maxWidth: '500px' }}
        >
          <div 
            className="mb-4"
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: COLORS.PRIMARY + '20',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}
          >
            <span 
              className="material-symbols-outlined text-primary"
              style={{ fontSize: '40px' }}
            >
              auto_stories
            </span>
          </div>
          
          <h3 
            className="mb-3"
            style={{
              fontFamily: FONTS.HEADLINE,
              fontSize: '24px',
              fontWeight: '700',
              color: COLORS.PRIMARY
            }}
          >
            Nessuna scheda generata
          </h3>
          
          <p 
            className="text-secondary mb-4"
            style={{
              fontFamily: FONTS.BODY,
              fontSize: '14px',
              maxWidth: '400px',
              margin: '0 auto'
            }}
          >
            Seleziona gli argomenti nella barra laterale o nella dashboard principale 
            e clicca su "Genera scheda" per iniziare.
          </p>
          
          <Button
            variant="primary"
            className="d-inline-flex align-items-center gap-2"
            onClick={() => navigate('/dashboard')}
          >
            <span className="material-symbols-outlined">explore</span>
            <span>Scegli argomenti</span>
          </Button>
        </div>
      </div>
    );
  }

  // Calcola progresso (esercizi con una risposta inserita / totali)
  const answeredCount = Object.entries(studentAnswers).filter(([exerciseId, value]) => {
    return value && value.trim() && Object.values(exercises).some(list => list.some(ex => ex.id === exerciseId));
  }).length;
  const progress = totalExercises > 0 ? Math.round((answeredCount / totalExercises) * 100) : 0;

  const gradeLabel = getGradeInfo(selectedGrade)?.info?.className || '';

  // Handler change input studente
  const handleStudentInputChange = (field, value) => {
    updateStudentData(field, value);
  };

  // Handler change risposta esercizio
  const handleAnswerChange = (exerciseId, value) => {
    setAnswer(exerciseId, value);
  };

  // Verifica tutte le risposte inserite finora
  const handleVerifyAnswers = () => {
    const results = [];
    const newCheckedResults = {};

    Object.values(exercises).forEach((topicExercises) => {
      topicExercises.forEach((exercise) => {
        const userAnswer = studentAnswers[exercise.id];
        if (userAnswer && userAnswer.trim()) {
          const correct = isAnswerCorrect(userAnswer, exercise);
          results.push({ exerciseId: exercise.id, correct });
          newCheckedResults[exercise.id] = correct;
        }
      });
    });

    setCheckedResults(newCheckedResults);
    recordAnswerResults(results);
  };

  // Handler download PDF
  const handleDownloadPdf = () => {
    downloadWorksheetPdf({
      studentData,
      gradeLabel,
      selectedTopicIds: Array.from(selectedTopics),
      exercises,
      studentAnswers
    });
  };

  return (
    <div className="px-4 py-4">
      {/* Progress Bar */}
      <div className="mb-4">
        <div 
          className="bg-light rounded-3 p-1"
          style={{ height: '8px' }}
        >
          <ProgressBar
            now={progress}
            variant="primary"
            animated
            striped
            className="rounded-2"
            style={{ height: '6px' }}
          />
        </div>
      </div>

      {/* Printable Sheet */}
      <div 
        className="bg-white border border-primary border-opacity-25 rounded-3 p-4 p-md-5"
        id="printable-sheet"
      >
        {/* Sheet Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start pb-4 mb-4 border-bottom border-2 border-primary border-opacity-25 gap-4">
          <div className="text-start">
            <h2 
              className="mb-1"
              style={{
                fontFamily: FONTS.HEADLINE,
                fontSize: '28px',
                fontWeight: '700',
                color: COLORS.PRIMARY,
                lineHeight: '1.2'
              }}
            >
              Scheda Esercitazioni di Matematica
            </h2>
            <p
              className="mb-0 text-secondary small"
              style={{ fontWeight: '600' }}
            >
              {gradeLabel}
            </p>
          </div>

          <div className="grow" style={{ minWidth: '250px' }}>
            {/* Studente */}
            <div className="d-flex align-items-center gap-2 mb-2">
              <span 
                className="text-secondary small fw-semibold"
                style={{ width: '60px', textAlign: 'right' }}
              >
                Studente:
              </span>
              <Form.Control
                type="text"
                placeholder="Nome dello studente..."
                value={studentData.name}
                onChange={(e) => handleStudentInputChange('name', e.target.value)}
                className="border-0 border-bottom border-2 border-secondary rounded-0 p-1"
                style={{
                  fontFamily: FONTS.BODY,
                  fontSize: '14px',
                  width: '100%'
                }}
              />
            </div>

            {/* Data */}
            <div className="d-flex align-items-center gap-2 mb-2">
              <span 
                className="text-secondary small fw-semibold"
                style={{ width: '60px', textAlign: 'right' }}
              >
                Data:
              </span>
              <Form.Control
                type="text"
                placeholder="gg/mm/aaaa"
                value={studentData.date}
                onChange={(e) => handleStudentInputChange('date', e.target.value)}
                className="border-0 border-bottom border-2 border-secondary rounded-0 p-1"
                style={{
                  fontFamily: FONTS.BODY,
                  fontSize: '14px',
                  width: '100%'
                }}
              />
            </div>

            {/* Valutazione */}
            <div className="d-flex align-items-center gap-2">
              <span 
                className="text-secondary small fw-semibold"
                style={{ width: '60px', textAlign: 'right' }}
              >
                Valutazione:
              </span>
              <Form.Control
                type="text"
                placeholder="Voto o giudizio..."
                value={studentData.grade}
                onChange={(e) => handleStudentInputChange('grade', e.target.value)}
                className="border-0 border-bottom border-2 border-secondary rounded-0 p-1"
                style={{
                  fontFamily: FONTS.BODY,
                  fontSize: '14px',
                  width: '100%'
                }}
              />
            </div>
          </div>
        </div>

        {/* Exercises Sections */}
        <div className="space-y-4" id="exercises-container">
          {Array.from(selectedTopics).map((topicId) => {
            const topic = getAnyTopicById(topicId);
            const topicExercises = exercises[topicId] || [];
            
            return (
              <div key={topicId} className="mb-5">
                {/* Section Header */}
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <h4 
                    className="mb-0"
                    style={{
                      fontFamily: FONTS.HEADLINE,
                      fontSize: '18px',
                      fontWeight: '700',
                      color: COLORS.PRIMARY
                    }}
                  >
                    <span className="material-symbols-outlined me-2" style={{ fontSize: '20px' }}>
                      {topic?.icon || 'help'}
                    </span>
                    {topic?.name || topicId}
                  </h4>
                  <Badge bg="primary" className="px-2 py-1">
                    {topicExercises.length} esercizi
                  </Badge>
                </div>

                {/* Exercise List */}
                <ListGroup variant="flush" className="border-0">
                  {topicExercises.map((exercise, index) => (
                    <ListGroup.Item 
                      key={exercise.id}
                      className="border-0 px-0 py-3"
                    >
                      <div className="d-flex align-items-start gap-3">
                        {/* Numero esercizio */}
                        <span 
                          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '28px',
                            height: '28px',
                            fontFamily: FONTS.BODY,
                            fontSize: '12px',
                            fontWeight: '700',
                            flexShrink: '0'
                          }}
                        >
                          {index + 1}
                        </span>

                        {/* Domanda */}
                        <div 
                          className="grow"
                          style={{
                            fontFamily: FONTS.BODY,
                            fontSize: '15px',
                            color: COLORS.TEXT_PRIMARY,
                            lineHeight: '1.6'
                          }}
                          dangerouslySetInnerHTML={{ __html: exercise.question }}
                        />
                      </div>

                      {/* Risposta */}
                      <div className="mt-2 ms-2 d-flex align-items-center gap-2">
                        <input
                          type="text"
                          placeholder="Inserisci risposta..."
                          value={studentAnswers[exercise.id] || ''}
                          onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
                          className={`border-0 border-bottom border-2 rounded-0 p-1 w-100 ${
                            checkedResults[exercise.id] === true
                              ? 'border-success'
                              : checkedResults[exercise.id] === false
                                ? 'border-danger'
                                : 'border-secondary'
                          }`}
                          style={{
                            fontFamily: FONTS.BODY,
                            fontSize: '14px',
                            minWidth: '200px'
                          }}
                        />
                        {checkedResults[exercise.id] === true && (
                          <span className="material-symbols-outlined text-success" style={{ fontSize: '20px' }}>
                            check_circle
                          </span>
                        )}
                        {checkedResults[exercise.id] === false && (
                          <span
                            className="material-symbols-outlined text-danger"
                            style={{ fontSize: '20px' }}
                            title={`Risposta corretta: ${exercise.answer?.value}`}
                          >
                            cancel
                          </span>
                        )}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-4 border-top border-secondary">
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
            <Button
              variant="success"
              className="d-inline-flex align-items-center gap-2 px-4 py-3"
              onClick={handleVerifyAnswers}
              disabled={answeredCount === 0}
              style={{
                fontFamily: FONTS.HEADLINE,
                fontSize: '16px',
                fontWeight: '700'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                fact_check
              </span>
              <span>Verifica Risposte</span>
            </Button>

            <Button
              variant="primary"
              className="d-inline-flex align-items-center gap-2 px-4 py-3"
              onClick={handleDownloadPdf}
              style={{
                fontFamily: FONTS.HEADLINE,
                fontSize: '16px',
                fontWeight: '700'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                download_for_offline
              </span>
              <span>Finalizza e Scarica PDF</span>
            </Button>
            
            <Button
              variant="outline-primary"
              className="d-inline-flex align-items-center gap-2 px-4 py-3"
              onClick={() => navigate('/dashboard')}
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Aggiungi Capitoli</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
