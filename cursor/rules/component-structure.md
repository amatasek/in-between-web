# React Component Structure

## Component Organization
Organize component code in the following order:
1. Import statements
2. Type/Interface definitions
3. Helper functions/constants specific to the component
4. Main component definition
5. Export statement

## Function Components
- Use function components with hooks rather than class components
- Define prop types with TypeScript interfaces
- Destructure props in the function parameters
- Extract complex logic into custom hooks

## Hooks
- Follow React hooks naming convention (`useSomething`)
- Follow hooks rules (only call at top level, only call in React functions)
- Create custom hooks for reusable stateful logic

## Example

```tsx
import React, { useState, useEffect } from 'react';
import { Card } from '@/types';
import CardDisplay from './CardDisplay';

interface ICardHandProps {
  cards: Card[];
  onCardSelect: (card: Card) => void;
  isActive: boolean;
}

// Helper function specific to this component
const sortCards = (cards: Card[]): Card[] => {
  return [...cards].sort((a, b) => a.value - b.value);
};

const CardHand: React.FC<ICardHandProps> = ({ cards, onCardSelect, isActive }) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const sortedCards = sortCards(cards);
  
  useEffect(() => {
    // Effect logic here
  }, [cards]);
  
  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    onCardSelect(card);
  };
  
  return (
    <div className={`card-hand ${isActive ? 'active' : ''}`}>
      {sortedCards.map(card => (
        <CardDisplay 
          key={`${card.suit}-${card.value}`}
          card={card}
          isSelected={selectedCard?.value === card.value && selectedCard?.suit === card.suit}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
};

export default CardHand;
``` 