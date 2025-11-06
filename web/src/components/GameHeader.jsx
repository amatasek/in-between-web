import { useEffect, useState } from 'react';
import styles from './styles/GameHeader.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import CurrencyAmount from './common/CurrencyAmount';
import PreferencesButton from './common/PreferencesButton';
import RulesButton from './common/RulesButton';
import PlayerStatsButton from './common/PlayerStatsButton';
import StoreButton from './StoreButton';
import IconButton from './common/IconButton';
import { LogOut, Zap } from 'lucide-react';
import GameSummaryModal from './GameSummaryModal';
import StoreModal from './StoreModal';

const GameHeader = ({ handleLeaveGame, onModalStateChange }) => {
  const { gameState, gameId } = useGameContext();
  const { socket } = useSocket();
  const { user } = useAuth();

  // Get the current user's balance from game state (real-time) or fallback to auth context
  const currentUserId = socket?.auth?.userId;
  const currentPlayer = currentUserId && gameState?.players ? gameState.players[currentUserId] : null;
  const playerBalance = currentPlayer?.balance ?? user?.balance ?? 0;

  // Check if user is ready (committed to current hand)
  const isPlayerReady = currentPlayer?.isReady || false;

  // Check if user has premium subscription
  const isPremium = user?.subscription?.isPremium;
  const [showGameSummary, setShowGameSummary] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // Notify parent when modal state changes
  useEffect(() => {
    const isModalOpen = showGameSummary || showStoreModal || isPreferencesOpen || isRulesOpen || isStatsOpen;
    if (onModalStateChange) {
      onModalStateChange(isModalOpen);
    }
  }, [showGameSummary, showStoreModal, isPreferencesOpen, isRulesOpen, isStatsOpen, onModalStateChange]);
  
  return (
    <div className={styles.headerContainer}>
      {/* Single responsive layout */}
      <div className={styles.header}>
        {/* Left: Logo and game ID */}
        <div className={styles.headerLeft}>
          <h1 className={styles.gameTitle}>In Between <span className="live-tag small">LIVE</span></h1>
          <p className={styles.gameIdText}>
            <span 
              className={styles.gameIdLink} 
              onClick={() => setShowGameSummary(true)}
              title="Click to view game summary"
              data-gamepad-focusable="true"
              tabIndex="0"
            >
              Game #{gameId}
            </span>
          </p>
        </div>
        
        {/* Right: Balance and buttons */}
        <div className={styles.headerRight}>
          <div className={styles.controlsStack}>
            <div className={styles.balanceDisplay}>
              {isPremium && (
                <div className={styles.xpBonusIndicator}>
                  <Zap size={16} strokeWidth={2.5} className={styles.xpBonusIcon} />
                  <span className={styles.xpBonusText}>2x XP</span>
                </div>
              )}
              <div className={styles.balanceLeft}>
                <CurrencyAmount amount={Number(playerBalance)} size="small" />
              </div>
            </div>
            <div className={styles.controlsGroup}>
              <StoreButton onClick={() => setShowStoreModal(true)} data-gamepad-focusable="true" />
              <PlayerStatsButton
                onModalStateChange={setIsStatsOpen}
                data-gamepad-focusable="true"
              />
              <RulesButton
                onModalStateChange={setIsRulesOpen}
                data-gamepad-focusable="true"
              />
              <PreferencesButton
                inGame={true}
                onModalStateChange={setIsPreferencesOpen}
                data-gamepad-focusable="true"
              />
              <IconButton
                icon={<LogOut size={20} style={{ color: 'white' }} />}
                title="Leave Game"
                onClick={handleLeaveGame}
                variant="danger"
                disabled={isPlayerReady}
                data-gamepad-focusable="true"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Game Summary Modal */}
      {showGameSummary && (
        <GameSummaryModal 
          onClose={() => setShowGameSummary(false)} 
          gameData={gameState}
        />
      )}
      
      {/* Store Modal */}
      {showStoreModal && (
        <StoreModal
          onClose={() => setShowStoreModal(false)}
        />
      )}
    </div>
  );
};

export default GameHeader;
