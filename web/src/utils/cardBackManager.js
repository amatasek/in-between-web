// Card back definitions
const cardBacks = {
  back01: '/cards/back01.png',
  back02: '/cards/back02.png',
  back03: '/cards/back03.png',
  back04: '/cards/back04.png',
  back05: '/cards/back05.png',
  back06: '/cards/back06.png',
  back07: '/cards/back07.png',
  back08: '/cards/back08.png'
};

// Get current card back
export const getCurrentCardBack = () => {
  return localStorage.getItem('selectedCardBack') || 'back01';
};

// Get current card back image path
export const getCurrentCardBackImage = () => {
  const cardBackId = getCurrentCardBack();
  return cardBacks[cardBackId] || cardBacks.back01;
};

// Set and save card back
export const setCardBack = (cardBackId) => {
  if (cardBacks[cardBackId]) {
    localStorage.setItem('selectedCardBack', cardBackId);
    // Dispatch custom event for card back change
    window.dispatchEvent(new CustomEvent('cardbackchange', { detail: cardBackId }));
  }
};

// Initialize card back on app load
export const initializeCardBack = () => {
  const savedCardBack = getCurrentCardBack();
  // Ensure it's a valid card back
  if (!cardBacks[savedCardBack]) {
    setCardBack('back01');
  }
};