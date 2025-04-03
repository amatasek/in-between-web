# Performance Optimization

## React Optimization
- Memoize expensive calculations with `useMemo`
- Prevent unnecessary re-renders with `React.memo` for components
- Memoize callbacks with `useCallback`
- Use `useCallback` for event handlers passed to child components
- Virtualize long lists with react-window or similar libraries

## Code Splitting
- Use dynamic imports for route-based code splitting
- Lazy load components that aren't needed for initial render
- Split vendor bundles appropriately
- Implement route-based prefetching

## Asset Optimization
- Optimize images using next-gen formats (WebP, AVIF)
- Implement responsive images
- Lazy load images and other media
- Minify CSS and JavaScript
- Use appropriate caching headers

## Network Optimization
- Minimize API calls
- Batch API requests where possible
- Implement client-side caching
- Use server-side rendering for critical pages
- Consider implementing service workers for offline support

## Memory Management
- Clean up event listeners and subscriptions in `useEffect` cleanup functions
- Avoid memory leaks in long-lived components
- Be cautious with closures that capture large objects

## Example

```tsx
// Optimized list component
import React, { useState, useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { Card } from '@/types';

interface ICardListProps {
  cards: Card[];
  onSelectCard: (card: Card) => void;
}

const CardList: React.FC<ICardListProps> = React.memo(({ cards, onSelectCard }) => {
  // Memoize expensive sorting operation
  const sortedCards = useMemo(() => {
    return [...cards].sort((a, b) => a.value - b.value);
  }, [cards]);
  
  // Memoize item renderer
  const renderItem = useCallback(({ index, style }) => {
    const card = sortedCards[index];
    return (
      <div style={style} onClick={() => onSelectCard(card)}>
        {card.suit} {card.value}
      </div>
    );
  }, [sortedCards, onSelectCard]);
  
  return (
    <FixedSizeList
      height={500}
      width={300}
      itemCount={sortedCards.length}
      itemSize={50}
    >
      {renderItem}
    </FixedSizeList>
  );
});

export default CardList;
``` 