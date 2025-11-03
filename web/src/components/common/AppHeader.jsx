/**
 * A shared header component for the In-Between game
 * Used across auth and lobby screens for consistent branding
 */
const AppHeader = () => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', margin: 0, fontWeight: 'bold' }}>
        In Between <span className="live-tag large">LIVE</span>
      </h1>
    </div>
  );
};

export default AppHeader;
