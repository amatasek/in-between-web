import React from 'react';
import styles from './styles/TurnSummaryPanel.module.css';
import CardMini from './CardMini';
import CurrencyAmount from './common/CurrencyAmount';
import Username from './Username';

const TurnSummaryPanel = ({ summary }) => {
  if (!summary) return null;

  const getOutcomeClass = (action) => {
    switch (action) {
      case 'win': return styles.win;
      case 'lose': return styles.lose;
      case 'penalty':
      case 'triple_penalty': return styles.penalty;
      case 'pass': return styles.pass;
      default: return styles.default;
    }
  };

  const getActionText = (action) => {
    switch (action) {
      case 'win': return 'WON';
      case 'lose': return 'LOST';
      case 'penalty': return 'PENALTY';
      case 'triple_penalty': return 'TRIPLE PENALTY';
      case 'pass': return 'PASSED';
      case 'bet': return 'BET';
      default: return action?.toUpperCase() || '';
    }
  };

  const getAmount = () => {
    if (summary.winAmount) return summary.winAmount / 2;
    if (summary.lossAmount) return summary.lossAmount;
    if (summary.betAmount) return summary.betAmount;
    return 0;
  };

  return (
    <div 
      className={`panel-alt ${styles.turnPanel} ${getOutcomeClass(summary.action)}`}
    >
      <div className={styles.leftSection}>
        <div className={styles.cardsContainer}>
          <CardMini card={summary.cards?.left} />
          {summary.cards?.middle && (
            <CardMini card={summary.cards?.middle} />
          )}
          <CardMini card={summary.cards?.right} />
        </div>
        <span className={styles.playerName}><Username username={summary.playerName} /></span>
        <span className={styles.action}>{getActionText(summary.action)}</span>
      </div>
      
      {getAmount() > 0 && (
        <div className={styles.amount}>
          <CurrencyAmount amount={getAmount()} size="small" />
        </div>
      )}
    </div>
  );
};

export default TurnSummaryPanel;