import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getGradeInfo } from '../data/curriculum/index.js';
import { COLORS, HEADER_HEIGHT, FONTS } from '../data/constants';
import { downloadWorksheetPdf } from '../services/pdfService.js';

/**
 * Componente Header (TopAppBar)
 * Contiene logo, navigazione e bottone PDF
 */
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    hasExercises,
    clearExercises,
    selectedTopics,
    selectedGrade,
    exercises,
    studentData,
    studentAnswers
  } = useAppContext();

  // Vista corrente derivata dal path effettivo, cosi l'evidenziazione del tab
  // resta corretta indipendentemente dallo stato del context
  const currentView = location.pathname.startsWith('/workspace')
    ? 'workspace'
    : location.pathname.startsWith('/review')
      ? 'review'
      : 'dashboard';

  // Nav items
  const navItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard' },
    { id: 'workspace', path: '/workspace', label: 'Area di Lavoro' },
    { id: 'review', path: '/review', label: 'Centro Ripasso' }
  ];

  // Handler per cambiamento vista
  const handleNavClick = (path) => {
    navigate(path);
  };

  // Handler per download PDF
  const handleDownloadPdf = () => {
    if (!hasExercises) return;
    downloadWorksheetPdf({
      studentData,
      gradeLabel: getGradeInfo(selectedGrade)?.info?.className || '',
      selectedTopicIds: Array.from(selectedTopics),
      exercises,
      studentAnswers
    });
  };

  // Handler per generare nuova scheda
  const handleNewWorksheet = () => {
    clearExercises();
    navigate('/dashboard');
  };

  return (
    <header 
      className="shadow-sm position-fixed top-0 start-0 end-0 z-3"
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: 'white',
        borderBottom: '2px solid #dee2e6'
      }}
    >
      <Container fluid className="h-100 d-flex align-items-center justify-content-between px-4">
        {/* Logo e Titolo */}
        <div 
          className="d-flex align-items-center gap-3"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <div 
            className="d-flex align-items-center justify-content-center text-white"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: COLORS.PRIMARY,
              borderRadius: '8px'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
              calculate
            </span>
          </div>
          <h1 
            className="m-0"
            style={{
              fontFamily: FONTS.HEADLINE,
              fontSize: '28px',
              fontWeight: '700',
              color: COLORS.PRIMARY
            }}
          >
            ClearMath
          </h1>
        </div>

        {/* Navigazione */}
        <Nav className="d-none d-md-flex gap-3">
          {navItems.map((item) => (
            <Nav.Link
              key={item.id}
              className={`p-0 ${currentView === item.id ? 'fw-bold border-bottom border-primary pb-1' : 'text-secondary'}`}
              style={{
                fontFamily: FONTS.BODY,
                fontSize: '14px',
                cursor: 'pointer'
              }}
              onClick={() => handleNavClick(item.path)}
            >
              {item.label}
            </Nav.Link>
          ))}
        </Nav>

        {/* Bottone PDF / Nuova Scheda */}
        <div className="d-flex gap-2">
          {hasExercises ? (
            <>
              <Button
                variant="primary"
                className="d-flex align-items-center gap-2 fw-bold"
                onClick={handleDownloadPdf}
              >
                <span className="material-symbols-outlined">download</span>
                <span>Scarica PDF</span>
              </Button>
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center gap-1"
                onClick={handleNewWorksheet}
              >
                <span className="material-symbols-outlined">add_circle</span>
                <span>Nuova</span>
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              className="d-flex align-items-center gap-2 fw-bold"
              disabled
            >
              <span className="material-symbols-outlined">download</span>
              <span>Scarica PDF</span>
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
}
