import React from 'react';
import { Container } from 'react-bootstrap';
import { SIDEBAR_WIDTH, HEADER_HEIGHT, COLORS, FONTS } from '../data/constants';

/**
 * Componente Footer
 * Footer fisso in basso
 */
export default function Footer() {
  return (
    <footer 
      className="position-fixed bottom-0 start-0 end-0 bg-white border-top border-secondary py-3"
      style={{
        marginLeft: SIDEBAR_WIDTH,
        fontFamily: FONTS.BODY,
        fontSize: '12px',
        color: COLORS.TEXT_SECONDARY,
        opacity: '0.6'
      }}
    >
      <Container fluid className="px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <div className="fw-semibold">
          ClearMath © {new Date().getFullYear()} · Apprendimento Efficace
        </div>
        <div className="text-center text-md-end small">
          <strong>Tutti i diritti riservati.</strong> 
          Proprietà esclusiva di Mindras Eugen Traian. 
          Vietata la riproduzione non autorizzata.
        </div>
      </Container>
    </footer>
  );
}
