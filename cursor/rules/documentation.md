# Documentation Standards

## Code Documentation
- Document all public functions, classes, and interfaces
- Use JSDoc format for JavaScript/TypeScript
- Include parameters, return values, and examples
- Document non-obvious code with inline comments
- Explain complex algorithms or business logic

## README Files
- Include a README.md in the project root and each major directory
- Structure README files with clear sections:
  - Project overview
  - Installation instructions
  - Usage examples
  - Configuration options
  - Contribution guidelines
  - License information

## API Documentation
- Document all API endpoints
- Include:
  - Endpoint URL and method
  - Request parameters and body schema
  - Response schema and status codes
  - Authentication requirements
  - Example requests and responses

## Diagrams
- Include architecture diagrams where helpful
- Use tools like Mermaid.js for flowcharts and sequence diagrams
- Keep diagrams up to date with code changes

## Feature Documentation
- Create dedicated documentation for major features
- Include user-facing documentation where appropriate
- Document business rules and edge cases

## Sample JSDoc Format

```javascript
/**
 * Calculates the score for a player's hand in the game
 * 
 * @param {Array<Card>} cards - The cards in the player's hand
 * @param {boolean} [includeBonus=false] - Whether to include bonus points
 * @returns {number} The calculated score
 * 
 * @example
 * const cards = [{ suit: 'hearts', value: 10 }, { suit: 'clubs', value: 5 }];
 * const score = calculateScore(cards);
 * // score = 15
 */
function calculateScore(cards, includeBonus = false) {
  // Implementation
}
``` 