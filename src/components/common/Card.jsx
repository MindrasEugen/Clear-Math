import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import { COLORS, FONTS, SIDEBAR_WIDTH } from '../../data/constants';

/**
 * Componente Card personalizzato
 * Estende Bootstrap Card con stili e funzionalità aggiuntive
 * 
 * @param {Object} props - Proprietà del componente
 * @param {React.ReactNode} props.children - Contenuto della card
 * @param {string} props.title - Titolo della card
 * @param {string} props.subtitle - Sottotitolo della card
 * @param {string} props.icon - Icona Material Symbols
 * @param {string} props.variant - Variante di colore ('primary', 'secondary', 'light', 'dark', 'outline')
 * @param {boolean} props.hoverable - Se la card è interattiva al hover
 * @param {boolean} props.selectable - Se la card è selezionabile
 * @param {boolean} props.selected - Se la card è attualmente selezionata
 * @param {Function} props.onClick - Handler click
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {Object} props.style - Stili inline aggiuntivi
 * @param {string} props.header - Contenuto header personalizzato
 * @param {string} props.footer - Contenuto footer personalizzato
 */
export default function Card({
  children,
  title,
  subtitle,
  icon,
  variant = 'light',
  hoverable = false,
  selectable = false,
  selected = false,
  onClick,
  className = '',
  style = {},
  header,
  footer,
  ...props
}) {
  // Mappa delle varianti di colore
  const variantStyles = {
    primary: {
      backgroundColor: COLORS.PRIMARY,
      color: '#ffffff',
      borderColor: COLORS.PRIMARY
    },
    secondary: {
      backgroundColor: COLORS.SURFACE_CONTAINER,
      color: COLORS.TEXT_PRIMARY,
      borderColor: COLORS.SURFACE_CONTAINER
    },
    light: {
      backgroundColor: '#ffffff',
      color: COLORS.TEXT_PRIMARY,
      borderColor: '#dee2e6'
    },
    dark: {
      backgroundColor: COLORS.TEXT_PRIMARY,
      color: '#ffffff',
      borderColor: COLORS.TEXT_PRIMARY
    },
    outline: {
      backgroundColor: 'transparent',
      color: COLORS.TEXT_PRIMARY,
      borderColor: COLORS.PRIMARY,
      borderWidth: '2px'
    }
  };

  // Stile base della card
  const baseStyle = {
    borderRadius: '12px',
    border: '1px solid #dee2e6',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
    fontFamily: FONTS.BODY,
    ...(variantStyles[variant] || {}),
    ...style
  };

  // Stile hover
  const hoverStyle = hoverable ? {
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer'
    }
  } : {};

  // Stile selezione
  const selectedStyle = selectable && selected ? {
    borderColor: COLORS.PRIMARY,
    borderWidth: '2px',
    backgroundColor: COLORS.PRIMARY_LIGHTER
  } : {};

  // Stile combinato
  const cardStyle = {
    ...baseStyle,
    ...selectedStyle,
    cursor: (hoverable || selectable || onClick) ? 'pointer' : 'default'
  };

  // Render header
  const renderHeader = () => {
    if (header) return header;
    
    if (title || icon || subtitle) {
      return (
        <BootstrapCard.Header 
          className="border-bottom-0 bg-transparent p-3"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          {icon && (
            <span 
              className="material-symbols-outlined"
              style={{
                fontSize: '28px',
                color: variant === 'primary' ? '#ffffff' : COLORS.PRIMARY,
                flexShrink: 0
              }}
            >
              {icon}
            </span>
          )}
          <div className="grow">
            {title && (
              <h5 
                className="mb-0"
                style={{
                  fontFamily: FONTS.HEADLINE,
                  fontSize: '18px',
                  fontWeight: '700',
                  color: variantStyles[variant]?.color || COLORS.TEXT_PRIMARY
                }}
              >
                {title}
              </h5>
            )}
            {subtitle && (
              <p 
                className="mb-0 small"
                style={{
                  fontFamily: FONTS.BODY,
                  color: variant === 'primary' ? 'rgba(255,255,255,0.8)' : COLORS.TEXT_SECONDARY,
                  opacity: '0.8'
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </BootstrapCard.Header>
      );
    }
    return null;
  };

  // Render footer
  const renderFooter = () => {
    if (footer) {
      return (
        <BootstrapCard.Footer 
          className="border-top-0 bg-transparent p-3"
          style={{
            fontFamily: FONTS.BODY,
            fontSize: '12px',
            color: COLORS.TEXT_SECONDARY
          }}
        >
          {footer}
        </BootstrapCard.Footer>
      );
    }
    return null;
  };

  return (
    <BootstrapCard
      className={`h-100 ${className}`}
      style={cardStyle}
      onClick={onClick}
      {...props}
    >
      {renderHeader()}
      <BootstrapCard.Body className={title || icon || subtitle ? 'p-3' : 'p-4'}>
        {children}
      </BootstrapCard.Body>
      {renderFooter()}
    </BootstrapCard>
  );
}

// Varianti predefinite
export const CardVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
  OUTLINE: 'outline'
};

export const CardTypes = {
  BASIC: 'basic',
  INTERACTIVE: 'interactive',
  SELECTABLE: 'selectable'
};
