import React from 'react';
import BaseModal from './common/BaseModal';
import baseModalStyles from './common/BaseModal.module.css';
import { ICONS } from '../constants/UIConstants';

/**
 * Game Rules Modal that displays the rules of the game
 * @param {Object} props - Component props
 * @param {function} props.onClose - Function to call when the modal is closed
 */
const GameRulesModal = ({ onClose }) => {
  return (
    <BaseModal
      title="Game Rules"
      onClose={onClose}
      style={{ maxWidth: 600 }}
    >
      <div className={baseModalStyles.content} style={{ maxHeight: '60vh', overflowY: 'auto', padding: '0' }}>
        <div style={{ marginBottom: 22 }}>
          <div className={baseModalStyles.sectionHeader}>Objective</div>
          <div className={baseModalStyles.settingDescription}>
            The goal is to bet on whether the third card will have a value that falls "in between" the first two cards.
          </div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <div className={baseModalStyles.sectionHeader}>Card Values</div>
          <div className={baseModalStyles.settingDescription}>
            Cards are valued numerically: 2-10 as face value, Jack = 11, Queen = 12, King = 13, and Ace = 1 or 14 (player's choice).
          </div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <div className={baseModalStyles.sectionHeader}>Game Flow</div>
          <div className={baseModalStyles.settingDescription}>
            <ol style={{ paddingLeft: 20, margin: 0 }}>
              <li>Each player antes up to join the round.</li>
              <li>The player to the right of the dealer goes first.</li>
              <li>Two cards are dealt face up.</li>
              <li>Player decides whether to bet or pass.</li>
              <li>If a bet is placed, the third card is revealed.</li>
              <li>Bets are settled.</li>
              <li>Next player goes.</li>
              <li>If the pot is empty, players ante up again to start a new round.</li>
            </ol>
          </div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <div className={baseModalStyles.sectionHeader}>Betting</div>
          <div className={baseModalStyles.settingDescription}>
            If you think the third card will fall between the first two cards, you can bet up to the pot amount.<br/>
            If you win, you receive the amount of your bet from the pot.<br/>
            If you lose, your bet is added to the pot.
          </div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <div className={baseModalStyles.sectionHeader}>POT Button</div>
          <div className={baseModalStyles.settingDescription}>
            The POT button allows you to bet the entire pot amount at once for maximum winnings.
          </div>
        </div>
        <div style={{ marginBottom: 6 }}>
          <div className={baseModalStyles.sectionHeader}>Special Rules</div>
          <div className={baseModalStyles.settingDescription}>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li><strong>Ace Choice:</strong> If the first card is an Ace, you can choose to play it as low (1) or high (14).</li>
              <li><strong>Second Chance:</strong> If the first two cards are the same, you can chose to ante again to see another hand.</li>
            </ul>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default GameRulesModal;