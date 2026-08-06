import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';
import { getTopicIcon } from '../data/topics';
import { COLORS, FONTS, DIFF_LABELS } from '../data/constants';
import TopicDifficultySelector from './TopicDifficultySelector';

/**
 * Componente Card per gli argomenti (griglia Dashboard)
 */
export default function TopicCard({ topic, onClick, isSelected }) {
  const { topicDiffs } = useAppContext();
  
  const currentDiff = topicDiffs[topic.id] || 'low';
  const diffLabel = DIFF_LABELS[currentDiff] || 'Basso';

  // Stile card basato su stato
  const cardStyle = {
    border: `2px solid ${isSelected ? COLORS.PRIMARY : '#dee2e6'}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    height: '100%'
  };

  return (
    <Card 
      className={`h-100 shadow-sm ${isSelected ? 'bg-light' : 'bg-white'}`}
      style={cardStyle}
      onClick={onClick}
    >
      <Card.Body className="d-flex flex-column p-3">
        {/* Icona e Badge difficolt√° */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span 
            className="material-symbols-outlined"
            style={{
              fontSize: '32px',
              color: COLORS.PRIMARY
            }}
          >
            {getTopicIcon(topic.id)}
          </span>
          
          <Badge 
            bg={isSelected ? 'primary' : 'secondary'}
            className="px-2 py-1"
            style={{
              fontFamily: FONTS.BODY,
              fontSize: '10px',
              fontWeight: '600'
            }}
          >
            {diffLabel}
          </Badge>
        </div>

        {/* Titolo */}
        <Card.Title 
          className="mb-2"
          style={{
            fontFamily: FONTS.HEADLINE,
            fontSize: '16px',
            fontWeight: '700',
            color: COLORS.TEXT_PRIMARY,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {topic.name}
        </Card.Title>

        {/* Selettore difficolt√† per argomento */}
        <div className="mb-2">
          <TopicDifficultySelector 
            topicId={topic.id} 
            currentDiff={currentDiff} 
            size="sm"
          />
        </div>

        {/* Descrizione */}
        <Card.Text 
          className="grow mb-0"
          style={{
            fontFamily: FONTS.BODY,
            fontSize: '13px',
            color: COLORS.TEXT_SECONDARY,
            lineHeight: '1.5'
          }}
        >
          {topic.desc}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
