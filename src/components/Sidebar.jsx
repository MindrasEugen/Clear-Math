import React from 'react';
import { Button, Badge, ListGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { grade1Topics, getGrade1TopicById } from '../data/curriculum/grade1/index';
import { DIFFICULTY, DIFF_LABELS, SIDEBAR_WIDTH, HEADER_HEIGHT, COLORS, FONTS } from '../data/constants';
import { generateGrade1Exercises } from '../utils/exerciseGenerators/grade1/index';

/**
 * Componente Sidebar
 * Contiene la lista degli argomenti con selezione e generazione scheda
 */
export default function Sidebar() {
  const navigate = useNavigate();
  const {
    selectedTopics,
    globalDiff,
    topicDiffs,
    selectedCount,
    toggleTopic,
    selectAllTopics,
    deselectAllTopics,
    applyGlobalDiffToAll,
    setTopicDifficulty,
    setTopicExercises,
    clearExercises
  } = useAppContext();

  // Applica a tutti gli argomenti
  const handleSelectAll = () => {
    selectedCount === grade1Topics.length ? deselectAllTopics() : selectAllTopics();
  };

  // Genera scheda
  const handleGenerateWorksheet = () => {
    if (selectedCount === 0) return;
    
    // Clear esercizi precedenti
    clearExercises();
    
    // Genera esercizi per tutti gli argomenti selezionati (Grado 1)
    selectedTopics.forEach(topicId => {
      const diff = topicDiffs[topicId] || globalDiff || DIFFICULTY.LOW;
      const count = 6; // Numero fisso di esercizi per argomento
      const exercises = generateGrade1Exercises(topicId, diff, count);
      setTopicExercises(topicId, exercises);
    });
    
    // Naviga a workspace
    navigate('/workspace');
  };

  // Cambia difficolt√† argomento
  const handleDifficultyChange = (topicId, event) => {
    setTopicDifficulty(topicId, event.target.value);
  };

  return (
    <aside 
      className="position-fixed top-0 start-0 bg-white border-end border-secondary"
      style={{
        height: '100vh',
        width: SIDEBAR_WIDTH,
        paddingTop: HEADER_HEIGHT,
        zIndex: '1000',
        overflowY: 'auto'
      }}
    >
      {/* Intestazione */}
      <div className="px-4 py-3 border-bottom border-secondary">
        <h2 
          className="m-0"
          style={{
            fontFamily: FONTS.HEADLINE,
            fontSize: '20px',
            fontWeight: '700',
            color: COLORS.PRIMARY
          }}
        >
          Argomenti
        </h2>
        <p 
          className="mb-0 text-secondary small"
          style={{ opacity: '0.7' }}
        >
          Seleziona per creare la scheda
        </p>
      </div>

      {/* Seleziona tutti e Applica difficoltà */}
      <div className="px-4 py-2 d-flex gap-2">
        <Button
          variant="link"
          size="sm"
          className="p-0 text-decoration-none"
          style={{
            fontFamily: FONTS.BODY,
            fontSize: '12px',
            fontWeight: '700',
            color: COLORS.PRIMARY
          }}
          onClick={handleSelectAll}
        >
          {selectedCount === grade1Topics.length ? 'Deseleziona tutti' : 'Seleziona tutti'}
        </Button>
        
        {/* Pulsante Applica difficolt√† globale a argomenti selezionati */}
        {selectedCount > 0 && (
          <Button
            variant="outline-primary"
            size="sm"
            className="p-1"
            style={{
              fontFamily: FONTS.BODY,
              fontSize: '11px',
              fontWeight: '600'
            }}
            onClick={applyGlobalDiffToAll}
            title="Applica difficolt√† globale a tutti gli argomenti selezionati"
          >
            <span className="material-symbols-outlined me-1" style={{ fontSize: '14px' }}>
              sync_alt
            </span>
            Applica a tutti
          </Button>
        )}
      </div>

      {/* Lista argomenti */}
      <ListGroup variant="flush" className="border-0">
        {grade1Topics.map((topic) => {
          const isSelected = selectedTopics.has(topic.id);
          const currentDiff = topicDiffs[topic.id] || globalDiff;
          
          return (
            <ListGroup.Item 
              key={topic.id}
              className={`border-0 px-4 py-2 ${isSelected ? 'bg-light' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => toggleTopic(topic.id)}
            >
              <div className="d-flex align-items-center gap-2">
                {/* Icona */}
                <span 
                  className="material-symbols-outlined text-secondary"
                  style={{ fontSize: '20px' }}
                >
                  {topic.icon || 'help_outline'}
                </span>
                
                {/* Testo */}
                <div className="grow">
                  <div 
                    className="fw-semibold"
                    style={{
                      fontFamily: FONTS.BODY,
                      fontSize: '14px',
                      color: COLORS.TEXT_PRIMARY
                    }}
                  >
                    {topic.name}
                  </div>
                  <div 
                    className="small text-secondary"
                    style={{
                      fontFamily: FONTS.BODY,
                      fontSize: '11px'
                    }}
                  >
                    {topic.description?.substring(0, 40) + '...'}
                  </div>
                </div>
                
                {/* Selettore difficolt√† */}
                {isSelected && (
                  <Form.Select
                    size="sm"
                    value={currentDiff}
                    onChange={(e) => handleDifficultyChange(topic.id, e)}
                    onClick={(e) => e.stopPropagation()}
                    className="border-0 shadow-none"
                    style={{
                      width: '100px',
                      fontSize: '11px',
                      padding: '2px 4px'
                    }}
                  >
                    <option value={DIFFICULTY.LOW}>Basso</option>
                    <option value={DIFFICULTY.MID}>Medio</option>
                    <option value={DIFFICULTY.HIGH}>Avanzato</option>
                  </Form.Select>
                )}
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      {/* Footer sidebar */}
      <div className="mt-auto border-top border-secondary p-3 bg-white">
        <div 
          className="text-center text-secondary small mb-2"
          style={{ fontSize: '11px' }}
        >
          {selectedCount === 0 
            ? 'Nessun argomento selezionato' 
            : `${selectedCount} argomento${selectedCount > 1 ? 'i' : ''} selezionato${selectedCount > 1 ? 'i' : ''}`}
        </div>
        <Button
          variant="primary"
          className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2 py-2"
          onClick={handleGenerateWorksheet}
          disabled={selectedCount === 0}
        >
          <span className="material-symbols-outlined">rule</span>
          <span>Genera Scheda</span>
        </Button>
      </div>
    </aside>
  );
}
