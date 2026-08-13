import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { COLORS, FONTS } from '../data/constants';

/**
 * Componente GradeSelector
 * Permette di selezionare il grado scolastico (1-5)
 * 
 * @param {number} selectedGrade - Grado attualmente selezionato (1-5)
 * @param {function} onGradeChange - Callback quando cambia il grado
 * @param {boolean} disabled - Disabilita il selettore
 */
export default function GradeSelector({ selectedGrade, onGradeChange, disabled = false }) {
  const gradeLabels = {
    1: 'Classe Prima',
    2: 'Classe Seconda',
    3: 'Classe Terza',
    4: 'Classe Quarta',
    5: 'Classe Quinta'
  };

  const handleGradeChange = (event) => {
    const grade = parseInt(event.target.value, 10);
    if (!isNaN(grade) && grade >= 1 && grade <= 5) {
      onGradeChange(grade);
    }
  };

  return (
    <div className="grade-selector mb-4">
      <label 
        htmlFor="grade-select"
        className="form-label d-block"
        style={{
          fontFamily: FONTS.HEADLINE,
          fontSize: '16px',
          fontWeight: '600',
          color: COLORS.TEXT_PRIMARY,
          marginBottom: '8px'
        }}
      >
        Seleziona il grado scolastico
      </label>
      
      <Form.Select
        id="grade-select"
        value={selectedGrade}
        onChange={handleGradeChange}
        disabled={disabled}
        className="shadow-sm"
        style={{
          fontFamily: FONTS.BODY,
          fontSize: '14px',
          maxWidth: '250px'
        }}
        aria-label="Seleziona grado scolastico"
      >
        {Object.entries(gradeLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
