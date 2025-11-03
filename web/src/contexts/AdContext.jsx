import { createContext, useContext, useMemo } from 'react';

const AdContext = createContext();

export const AdProvider = ({ children }) => {
  // TODO: Replace with actual premium user check
  // const { user } = useAuth();
  // const showAds = !user?.isPremium;

  const showAds = true; // Set to false to simulate premium/ad-free experience

  const value = useMemo(() => ({ showAds }), [showAds]);

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within AdProvider');
  }
  return context;
};
