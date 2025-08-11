import React, { useState, useEffect } from 'react';
import { setCardBack, getCurrentCardBack } from '../utils/cardBackManager';

const cardBacks = [
  { id: 'back01', image: '/cards/back01.png' },
  { id: 'back02', image: '/cards/back02.png' },
  { id: 'back03', image: '/cards/back03.png' },
  { id: 'back04', image: '/cards/back04.png' },
  { id: 'back05', image: '/cards/back05.png' },
  { id: 'back06', image: '/cards/back06.png' },
  { id: 'back07', image: '/cards/back07.png' },
  { id: 'back08', image: '/cards/back08.png' }
];

const CardBackSelector = () => {
  const [selectedCardBack, setSelectedCardBack] = useState('back01');

  useEffect(() => {
    // Load saved card back from localStorage
    const savedCardBack = getCurrentCardBack();
    setSelectedCardBack(savedCardBack);
  }, []);

  const handleCardBackSelect = (cardBackId) => {
    setSelectedCardBack(cardBackId);
    setCardBack(cardBackId);
  };

  return (
    <div style={{ 
      display: 'flex',
      gap: '12px',
      overflowX: 'auto',
      overflowY: 'visible',
      paddingTop: '8px',
      paddingBottom: '8px',
      alignItems: 'center',
      minHeight: '100px'
    }}>
      {cardBacks.map((cardBack, index) => (
        <div 
          key={cardBack.id}
          onClick={() => handleCardBackSelect(cardBack.id)}
          tabIndex={0}
          data-gamepad-focusable="true"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardBackSelect(cardBack.id);
            }
          }}
          style={{
            position: 'relative',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'transform 0.2s ease',
            transform: selectedCardBack === cardBack.id ? 'scale(1.1)' : 'scale(1)',
            marginLeft: index === 0 ? '8px' : 0,
            marginRight: index === cardBacks.length - 1 ? '8px' : 0
          }}
        >
          {/* Card image */}
          <div style={{ 
            width: '60px',
            height: '84px',
            backgroundImage: `url(${cardBack.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '6px',
            boxShadow: selectedCardBack === cardBack.id 
              ? '0 0 0 3px var(--btn-tertiary-start), 0 4px 12px rgba(0,0,0,0.3)' 
              : '0 2px 8px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.1)'
          }} />
        </div>
      ))}
    </div>
  );
};

export default CardBackSelector;