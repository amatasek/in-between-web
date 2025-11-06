/**
 * Check if two dates are the same UTC day
 * @param {Date|string} date1 First date
 * @param {Date|string} date2 Second date
 * @returns {boolean} True if same UTC day
 */
export const isSameUTCDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return d1.getUTCFullYear() === d2.getUTCFullYear() &&
         d1.getUTCMonth() === d2.getUTCMonth() &&
         d1.getUTCDate() === d2.getUTCDate();
};

/**
 * Check if user is eligible for daily reward
 * @param {Object} dailyRewards User's daily rewards data from auth
 * @returns {boolean} True if eligible to claim today
 */
export const isEligibleForDailyReward = (dailyRewards) => {
  // If dailyRewards doesn't exist, user has never claimed - eligible
  if (!dailyRewards) {
    return true;
  }

  const { lastClaimDate } = dailyRewards;

  // If never claimed, eligible
  if (!lastClaimDate) {
    return true;
  }

  // Check if last claim was a different UTC day
  const now = new Date();
  const lastClaim = new Date(lastClaimDate);

  // Eligible if it's a different UTC day
  return !isSameUTCDay(lastClaim, now);
};

/**
 * Calculate the expected day for next claim
 * @param {Object} dailyRewards User's daily rewards data
 * @returns {number} Expected day (1-7)
 */
export const calculateExpectedDay = (dailyRewards) => {
  // If never claimed, start at day 1
  if (!dailyRewards || !dailyRewards.lastClaimDate || dailyRewards.currentStreak === 0) {
    return 1;
  }

  const { lastClaimDate, currentStreak } = dailyRewards;
  const now = new Date();
  const lastClaim = new Date(lastClaimDate);
  const hoursSinceLastClaim = (now - lastClaim) / (1000 * 60 * 60);

  // If more than 48 hours, streak is broken - reset to day 1
  if (hoursSinceLastClaim > 48) {
    return 1;
  }

  // Next day in sequence
  const nextDay = currentStreak + 1;

  // If completed day 7, cycle back to day 1
  if (nextDay > 7) {
    return 1;
  }

  return nextDay;
};
