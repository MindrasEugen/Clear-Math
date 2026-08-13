import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';
import { DIFFICULTY, DIFF_LABELS, COLORS, FONTS } from '../data/constants';

/**
 * Componente Selettore Difficoltà Globale
 * Permette di selezionare la difficoltà globale predefinita
 */
export default function DifficultySelector() {
  const {
    globalDiff,
    setGlobalDifficulty,
    applyGlobalDiffToAll
  } = useAppContext();

  // Stili per i pulsanti
  const getButtonStyle = (diff) => ({
    fontFamily: FONTS.BODY,
    fontSize: '13px',
    fontWeight: globalDiff === diff ? '700' : '400',
    padding: '8px 16px',
    border: '1px solid #dee2e6'
  });

  // Handler cambio difficoltà
  const handleDifficultyChange = (diff) => {
    setGlobalDifficulty(diff);
  };

  // Handler applica a tutti
  const handleApplyToAll = () => {
    applyGlobalDiffToAll();
  };

  return (
    <div className="bg-white border border-secondary rounded-3 p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        {/* Testo descrittivo */}
        <div className="text-start">
          <h3 
            className="mb-1"
            style={{
              fontFamily: FONTS.HEADLINE,
              fontSize: '18px',
              fontWeight: '700',
              color: COLORS.PRIMARY
            }}
          >
            Difficoltà globale predefinita
          </h3>
          <p 
            className="mb-0 text-secondary small"
            style={{ opacity: '0.7' }}
          >
            Applica un livello standard a tutte le schede con un clic
          </p>
        </div>

        {/* Pulsanti difficoltà */}
        <div className="d-flex align-items-center gap-2">
          <ButtonGroup aria-label="Selettore difficoltà">
            <Button
              variant={globalDiff === DIFFICULTY.LOW ? 'primary' : 'outline-secondary'}
              active={globalDiff === DIFFICULTY.LOW}
              onClick={() => handleDifficultyChange(DIFFICULTY.LOW)}
              style={getButtonStyle(DIFFICULTY.LOW)}
            >
              {DIFF_LABELS[DIFFICULTY.LOW]}
            </Button>
            <Button
              variant={globalDiff === DIFFICULTY.MID ? 'primary' : 'outline-secondary'}
              active={globalDiff === DIFFICULTY.MID}
              onClick={() => handleDifficultyChange(DIFFICULTY.MID)}
              style={getButtonStyle(DIFFICULTY.MID)}
            >
              {DIFF_LABELS[DIFFICULTY.MID]}
            </Button>
            <Button
              variant={globalDiff === DIFFICULTY.HIGH ? 'primary' : 'outline-secondary'}
              active={globalDiff === DIFFICULTY.HIGH}
              onClick={() => handleDifficultyChange(DIFFICULTY.HIGH)}
              style={getButtonStyle(DIFFICULTY.HIGH)}
            >
              {DIFF_LABELS[DIFFICULTY.HIGH]}
            </Button>
          </ButtonGroup>
          
          {/* Bottone Applica */}
          <Button
            variant="primary"
            size="sm"
            className="fw-bold"
            onClick={handleApplyToAll}
            style={{
              fontFamily: FONTS.BODY,
              fontSize: '12px'
            }}
          >
            Applica
          </Button>
        </div>
      </div>
    </div>
  );
}
