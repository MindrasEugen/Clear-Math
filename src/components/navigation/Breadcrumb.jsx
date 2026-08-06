import React from 'react';
import { Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../data/constants';

/**
 * Componente Breadcrumb per la navigazione
 * Mostra il percorso corrente e permette di navigare tra le pagine
 * 
 * @param {Object} props - Proprietà del componente
 * @param {Array} props.items - Array di voci del breadcrumb [{label, path, active?}]
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {Object} props.style - Stili inline aggiuntivi
 */
export default function Breadcrumb({ items = [], className = '', style = {} }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Stile base
  const baseStyle = {
    fontFamily: FONTS.BODY,
    backgroundColor: 'transparent',
    padding: '0',
    margin: '0 0 20px 0',
    ...style
  };

  // Stile item
  const itemStyle = {
    color: COLORS.TEXT_SECONDARY,
    fontSize: '14px',
    fontWeight: '500'
  };

  // Stile item attivo
  const activeStyle = {
    color: COLORS.PRIMARY,
    fontWeight: '600'
  };

  // Stile separatore
  const separatorStyle = {
    color: COLORS.TEXT_SECONDARY,
    opacity: '0.6'
  };

  // Handler click su voce
  const handleItemClick = (path, e) => {
    e.preventDefault();
    if (path) {
      navigate(path);
    }
  };

  // Render breadcrumb items
  const renderItems = () => {
    return items.map((item, index) => {
      const isActive = item.active || index === items.length - 1;
      const isLast = index === items.length - 1;

      return (
        <BootstrapBreadcrumb.Item
          key={index}
          active={isActive}
          onClick={(e) => !isLast && handleItemClick(item.path, e)}
          style={isActive ? activeStyle : itemStyle}
          className={!isActive ? 'breadcrumb-link' : ''}
        >
          {item.icon && (
            <span 
              className="material-symbols-outlined"
              style={{
                fontSize: '16px',
                marginRight: '6px',
                verticalAlign: 'middle'
              }}
            >
              {item.icon}
            </span>
          )}
          {item.label}
        </BootstrapBreadcrumb.Item>
      );
    });
  };

  return (
    <nav aria-label="Breadcrumb">
      <BootstrapBreadcrumb
        className={className}
        style={baseStyle}
        listProps={{
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexWrap: 'wrap'
          }
        }}
      >
        {renderItems()}
      </BootstrapBreadcrumb>
    </nav>
  );
}

/**
 * Breadcrumb per navigazione tra gradi
 * Mostra il percorso: Home -> Grado X -> Nucleo -> Argomento
 */
export function GradeBreadcrumb({ grade, nucleo, topic }) {
  // Genera gli items del breadcrumb
  const generateItems = () => {
    const items = [
      { label: 'Home', path: '/', icon: 'home' }
    ];

    if (grade) {
      items.push({
        label: `Grado ${grade}`,
        path: `/grade/${grade}`,
        icon: 'school'
      });
    }

    if (nucleo) {
      const nucleoNames = {
        'numeri': 'Numeri',
        'spazio_e_figure': 'Spazio e Figure',
        'relazioni_e_funzioni': 'Relazioni e Funzioni',
        'dati_e_previsioni': 'Dati e Previsioni'
      };
      items.push({
        label: nucleoNames[nucleo] || nucleo,
        path: `/grade/${grade}/${nucleo}`,
        icon: nucleo
      });
    }

    if (topic) {
      items.push({
        label: topic.name || topic,
        path: null,
        active: true
      });
    }

    return items;
  };

  return (
    <Breadcrumb items={generateItems()} />
  );
}

/**
 * Breadcrumb basato su percorso URL automatico
 */
export function AutoBreadcrumb() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(part => part !== '');

  // Mappa percorsi -> label
  const pathToLabel = (path, index) => {
    const gradeMatch = path.match(/^grade(\d+)$/);
    const nucleoMatch = path.match(/^(numeri|spazio_e_figure|relazioni_e_funzioni|dati_e_previsioni)$/);

    if (gradeMatch) {
      return `Grado ${gradeMatch[1]}`;
    }

    if (nucleoMatch) {
      const nucleoNames = {
        'numeri': 'Numeri',
        'spazio_e_figure': 'Spazio e Figure',
        'relazioni_e_funzioni': 'Relazioni e Funzioni',
        'dati_e_previsioni': 'Dati e Previsioni'
      };
      return nucleoNames[nucleoMatch[0]] || nucleoMatch[0];
    }

    if (path === 'dashboard') return 'Dashboard';
    if (path === 'workspace') return 'Workspace';
    if (path === 'review') return 'Review';
    if (path === 'theory') return 'Teoria';
    if (path === 'exercises') return 'Esercizi';
    if (path === 'tests') return 'Verifiche';

    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  // Genera items dal percorso
  const items = [
    { label: 'Home', path: '/', icon: 'home' },
    ...pathParts.map((part, index) => {
      const path = '/' + pathParts.slice(0, index + 1).join('/');
      return {
        label: pathToLabel(part, index),
        path: path,
        active: index === pathParts.length - 1
      };
    })
  ];

  return (
    <Breadcrumb items={items} />
  );
}
