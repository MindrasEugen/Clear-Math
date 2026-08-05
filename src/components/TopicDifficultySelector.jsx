import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';
import { DIFFICULTY, DIFF_LABELS, COLORS, FONTS } from '../data/constants';

/**
 * Componente Selettore Difficoltà per Singolo Argomento
 * Permette di selezionare la difficoltà specifica per un topic
 * Versione compatta per inclusione in TopicCard
 */
export default function TopicDifficultySelector({ topicId, currentDiff, size = 'sm' }) {
  const { setTopicDifficulty } = useAppContext();

  // Stili per i pulsanti compatti
  const getButtonStyle = (diff) => ({
    fontFamily: FONTS.BODY,
    fontSize: size === 'sm' ? '10px' : '12px',
    fontWeight: currentDiff === diff ? '700' : '400',
    padding: size === 'sm' ? '4px 8px' : '6px 12px',
    minWidth: '50px',
    border: '1px solid #dee2e6'
  });

  // Handler cambio difficoltà
  const handleDifficultyChange = (diff) => {
    setTopicDifficulty(topicId, diff);
  };

  return (
    <ButtonGroup 
      size={size} 
      aria-label={`Selettore difficoltà per ${topicId}`}
      className="w-100"
    >
      <Button
        variant={currentDiff === DIFFICULTY.LOW ? 'primary' : 'outline-secondary'}
        active={currentDiff === DIFFICULTY.LOW}
        onClick={() => handleDifficultyChange(DIFFICULTY.LOW)}
        style={getButtonStyle(DIFFICULTY.LOW)}
        title="Livello Basso"
      >
        {DIFF_LABELS[DIFFICULTY.LOW]}
      </Button>
      <Button
        variant={currentDiff === DIFFICULTY.MID ? 'primary' : 'outline-secondary'}
        active={currentDiff === DIFFICULTY.MID}
        onClick={() => handleDifficultyChange(DIFFICULTY.MID)}
        style={getButtonStyle(DIFFICULTY.MID)}
        title="Livello Medio"
      >
        {DIFF_LABELS[DIFFICULTY.MID]}
      </Button>
      <Button
        variant={currentDiff === DIFFICULTY.HIGH ? 'primary' : 'outline-secondary'}
        active={currentDiff === DIFFICULTY.HIGH}
        onClick={() => handleDifficultyChange(DIFFICULTY.HIGH)}
        style={getButtonStyle(DIFFICULTY.HIGH)}
        title="Livello Avanzato"
      >
        {DIFF_LABELS[DIFFICULTY.HIGH]}
      </Button>
    </ButtonGroup>
  );
}
