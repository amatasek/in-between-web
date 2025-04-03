# Testing Conventions

## Test Organization
- Place tests in a `__tests__` directory adjacent to the code being tested
- Name test files with `.test.js` or `.spec.js` suffix
- Group related tests using `describe` blocks
- Name tests descriptively using `it` or `test` functions

## Testing Structure
Follow the Arrange-Act-Assert pattern:
1. **Arrange**: Set up test data and conditions
2. **Act**: Perform the action being tested
3. **Assert**: Verify the results

## Component Testing
- Test component rendering and behavior
- Use React Testing Library for component tests
- Focus on testing component behavior, not implementation details
- Test user interactions using fireEvent or userEvent

## API/Service Testing
- Test API endpoints using supertest or similar
- Mock external dependencies
- Test both successful and error scenarios
- Verify correct status codes, headers, and response bodies

## Unit Testing
- Keep unit tests small and focused
- Mock dependencies to isolate the unit being tested
- Test edge cases and error conditions
- Aim for high code coverage in critical paths

## Mocking
- Use Jest mock functions for dependencies
- Create dedicated mock files for complex dependencies
- Reset mocks between tests

## Example

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import CardHand from '../CardHand';

describe('CardHand component', () => {
  const mockCards = [
    { suit: 'hearts', value: 7 },
    { suit: 'clubs', value: 10 }
  ];
  const mockOnCardSelect = jest.fn();
  
  beforeEach(() => {
    mockOnCardSelect.mockClear();
  });
  
  it('renders the correct number of cards', () => {
    // Arrange
    render(<CardHand cards={mockCards} onCardSelect={mockOnCardSelect} isActive={true} />);
    
    // Act & Assert
    const cardElements = screen.getAllByTestId('card-display');
    expect(cardElements).toHaveLength(2);
  });
  
  it('calls onCardSelect when a card is clicked', () => {
    // Arrange
    render(<CardHand cards={mockCards} onCardSelect={mockOnCardSelect} isActive={true} />);
    
    // Act
    const firstCard = screen.getAllByTestId('card-display')[0];
    fireEvent.click(firstCard);
    
    // Assert
    expect(mockOnCardSelect).toHaveBeenCalledTimes(1);
    expect(mockOnCardSelect).toHaveBeenCalledWith(mockCards[0]);
  });
}); 