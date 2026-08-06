import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import { COLORS, FONTS } from '../../data/constants';

/**
 * Componente Button personalizzato
 * Estende Bootstrap Button con stili e funzionalità aggiuntive
 * 
 * @param {Object} props - Proprietà del componente
 * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary' | 'link'} props.variant - Variante del pulsante
 * @param {'sm' | 'md' | 'lg'} props.size - Dimensione del pulsante
 * @param {boolean} props.disabled - Se il pulsante è disabilitato
 * @param {boolean} props.isLoading - Se mostrare lo stato di caricamento
 * @param {string} props.icon - Icona Material Symbols da mostrare
 * @param {'left' | 'right'} props.iconPosition - Posizione dell'icona
 * @param {Function} props.onClick - Handler click
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {React.ReactNode} props.children - Contenuto del pulsante
 * @param {Object} props.style - Stili inline aggiuntivi
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
  children,
  style = {},
  ...props
}) {
  // Mappa delle dimensioni
  const sizeMap = {
    sm: 'sm',
    md: '',
    lg: 'lg'
  };

  // Mappa dei colori personalizzati
  const customColors = {
    'primary': COLORS.PRIMARY,
    'primary-light': COLORS.PRIMARY_LIGHT,
    'primary-lighter': COLORS.PRIMARY_LIGHTER,
    'accent': COLORS.ACCENT,
    'surface': COLORS.SURFACE,
    'text-primary': COLORS.TEXT_PRIMARY,
    'text-secondary': COLORS.TEXT_SECONDARY
  };

  // Stile base
  const baseStyle = {
    fontFamily: FONTS.BODY,
    fontWeight: '600',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    ...style
  };

  // Gestione icone
  const renderIcon = () => {
    if (!icon) return null;
    return (
      <span 
        className="material-symbols-outlined"
        style={{
          fontSize: size === 'sm' ? '16px' : size === 'lg' ? '24px' : '20px',
          marginRight: iconPosition === 'left' ? '8px' : '0',
          marginLeft: iconPosition === 'right' ? '8px' : '0'
        }}
      >
        {icon}
      </span>
    );
  };

  // Contenuto del pulsante
  const buttonContent = isLoading ? (
    <>
      {renderIcon()}
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      {children}
    </>
  ) : (
    <>
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </>
  );

  return (
    <BootstrapButton
      variant={variant}
      size={sizeMap[size]}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`d-inline-flex align-items-center justify-content-center ${className}`}
      style={baseStyle}
      {...props}
    >
      {buttonContent}
    </BootstrapButton>
  );
}

// Varianti predefinite per uso comune
export const ButtonVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline-primary',
  LIGHT: 'light',
  DARK: 'dark',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info'
};

export const ButtonSizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg'
};
