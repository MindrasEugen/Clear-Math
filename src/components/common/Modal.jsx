import React, { useState, useEffect } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { COLORS, FONTS } from '../../data/constants';
import ButtonComponent from './Button.jsx';

/**
 * Componente Modal personalizzato
 * Estende Bootstrap Modal con stili e funzionalità aggiuntive
 * 
 * @param {Object} props - Proprietà del componente
 * @param {boolean} props.show - Se il modal è visibile
 * @param {Function} props.onHide - Funzione per chiudere il modal
 * @param {string} props.title - Titolo del modal
 * @param {React.ReactNode} props.children - Contenuto del modal
 * @param {string} props.size - Dimensione del modal ('sm', 'md', 'lg', 'xl', 'fullscreen')
 * @param {boolean} props.centered - Se il modal è centrato verticalmente
 * @param {boolean} props.scrollable - Se il modal ha scroll interno
 * @param {boolean} props.closable - Se il modal può essere chiuso
 * @param {Function} props.onConfirm - Funzione per confermare (pulsante conferma)
 * @param {Function} props.onCancel - Funzione per annullare (pulsante annulla)
 * @param {string} props.confirmText - Testo pulsante conferma
 * @param {string} props.cancelText - Testo pulsante annulla
 * @param {string} props.confirmVariant - Variante pulsante conferma
 * @param {string} props.cancelVariant - Variante pulsante annulla
 * @param {boolean} props.showFooter - Se mostrare il footer con i pulsanti
 * @param {boolean} props.showHeader - Se mostrare l'intestazione
 * @param {string} props.headerIcon - Icona nell'intestazione
 * @param {React.ReactNode} props.footer - Footer personalizzato
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {Object} props.style - Stili inline aggiuntivi
 */
export default function Modal({
  show = false,
  onHide,
  title,
  children,
  size = 'lg',
  centered = true,
  scrollable = false,
  closable = true,
  onConfirm,
  onCancel,
  confirmText = 'Conferma',
  cancelText = 'Annulla',
  confirmVariant = 'primary',
  cancelVariant = 'secondary',
  showFooter = true,
  showHeader = true,
  headerIcon,
  footer,
  className = '',
  style = {},
  ...props
}) {
  // Dimensioni disponibili
  const validSizes = ['sm', 'md', 'lg', 'xl', 'fullscreen-sm-down', 'fullscreen-md-down', 'fullscreen-lg-down', 'fullscreen-xl-down', 'fullscreen-xxl-down', 'fullscreen'];
  
  // Usa la dimensione specificata o 'lg' come default
  const modalSize = validSizes.includes(size) ? size : 'lg';

  // Stile del modal
  const modalStyle = {
    fontFamily: FONTS.BODY,
    ...style
  };

  // Stile del content
  const contentStyle = {
    borderRadius: '12px',
    border: 'none',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
  };

  // Stile header
  const headerStyle = {
    borderBottom: `1px solid #dee2e6`,
    padding: '20px 24px',
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px'
  };

  // Stile body
  const bodyStyle = {
    padding: '24px',
    maxHeight: scrollable ? '60vh' : 'none',
    overflowY: scrollable ? 'auto' : 'visible'
  };

  // Stile footer
  const footerStyle = {
    borderTop: `1px solid #dee2e6`,
    padding: '16px 24px',
    backgroundColor: COLORS.SURFACE,
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px'
  };

  // Render header
  const renderHeader = () => {
    if (!showHeader) return null;
    
    return (
      <BootstrapModal.Header 
        style={headerStyle}
        closeButton={closable}
        onHide={closable ? onHide : undefined}
      >
        <div className="d-flex align-items-center gap-3">
          {headerIcon && (
            <span 
              className="material-symbols-outlined"
              style={{
                fontSize: '28px',
                color: COLORS.PRIMARY,
                flexShrink: 0
              }}
            >
              {headerIcon}
            </span>
          )}
          <BootstrapModal.Title 
            className="m-0"
            style={{
              fontFamily: FONTS.HEADLINE,
              fontSize: '20px',
              fontWeight: '700',
              color: COLORS.TEXT_PRIMARY
            }}
          >
            {title}
          </BootstrapModal.Title>
        </div>
      </BootstrapModal.Header>
    );
  };

  // Render footer
  const renderFooter = () => {
    if (!showFooter) {
      if (footer) {
        return (
          <BootstrapModal.Footer style={footerStyle}>
            {footer}
          </BootstrapModal.Footer>
        );
      }
      return null;
    }

    return (
      <BootstrapModal.Footer style={footerStyle}>
        <div className="d-flex justify-content-end gap-3">
          {onCancel && (
            <ButtonComponent
              variant={cancelVariant}
              onClick={onCancel}
              size="md"
            >
              {cancelText}
            </ButtonComponent>
          )}
          {onConfirm && (
            <ButtonComponent
              variant={confirmVariant}
              onClick={onConfirm}
              size="md"
            >
              {confirmText}
            </ButtonComponent>
          )}
        </div>
      </BootstrapModal.Footer>
    );
  };

  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      size={modalSize}
      centered={centered}
      scrollable={scrollable}
      backdrop={closable ? true : 'static'}
      keyboard={closable}
      className={className}
      style={modalStyle}
      contentClassName="border-0"
      dialogClassName="modal-dialog-centered"
      {...props}
    >
      <div style={contentStyle}>
        {renderHeader()}
        <BootstrapModal.Body style={bodyStyle}>
          {children}
        </BootstrapModal.Body>
        {renderFooter()}
      </div>
    </BootstrapModal>
  );
}

// Costanti per dimensioni
export const ModalSizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
  FULLSCREEN: 'fullscreen'
};

// Modal predefiniti per uso comune

/**
 * Modal di conferma semplice
 */
export function ConfirmModal({
  show,
  onHide,
  onConfirm,
  title = 'Conferma',
  message = 'Sei sicuro di voler procedere?',
  confirmText = 'Conferma',
  cancelText = 'Annulla'
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      title={title}
      onConfirm={onConfirm}
      onCancel={onHide}
      confirmText={confirmText}
      cancelText={cancelText}
      size="md"
    >
      <p 
        className="mb-0"
        style={{
          fontFamily: FONTS.BODY,
          fontSize: '16px',
          color: COLORS.TEXT_SECONDARY,
          lineHeight: '1.6'
        }}
      >
        {message}
      </p>
    </Modal>
  );
}

/**
 * Modal di informazione
 */
export function InfoModal({
  show,
  onHide,
  title = 'Informazione',
  message,
  icon = 'info'
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      title={title}
      headerIcon={icon}
      showFooter={false}
      size="md"
      onCancel={onHide}
      cancelText="Chiudi"
    >
      <div 
        className="d-flex align-items-start gap-3"
        style={{
          fontFamily: FONTS.BODY,
          fontSize: '16px',
          color: COLORS.TEXT_SECONDARY,
          lineHeight: '1.6'
        }}
      >
        {message}
      </div>
    </Modal>
  );
}

/**
 * Modal di errore
 */
export function ErrorModal({
  show,
  onHide,
  title = 'Errore',
  message,
  icon = 'error'
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      title={title}
      headerIcon={icon}
      showFooter={false}
      size="md"
      onCancel={onHide}
      cancelText="Chiudi"
    >
      <div 
        className="d-flex align-items-start gap-3"
        style={{
          fontFamily: FONTS.BODY,
          fontSize: '16px',
          color: COLORS.TEXT_SECONDARY,
          lineHeight: '1.6'
        }}
      >
        <span 
          className="material-symbols-outlined"
          style={{
            fontSize: '24px',
            color: '#dc3545',
            flexShrink: 0
          }}
        >
          {icon}
        </span>
        <div>{message}</div>
      </div>
    </Modal>
  );
}
