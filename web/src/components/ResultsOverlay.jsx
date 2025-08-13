import React, { useEffect, useState } from 'react';
import styles from './styles/ResultsOverlay.module.css';
import CurrencyAmount from './common/CurrencyAmount';
import AnimatedRain from './common/AnimatedRain';

const ResultsOverlay = ({ result, players }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    // Start animation
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 3000);
    return () => clearTimeout(timer);
  }, [result]);
  
  if (!result) return null;
  
  const playerName = players[result.playerId]?.name || 'Player';
  
  // Use the outcome property like ResultsPanel does
  const outcome = result.outcome; // 'win', 'lose', or 'tie'
  
  // Render win result
  if (outcome === 'win') {
    // Scale animation intensity based on win amount (up to $500)
    const winAmount = result.winnings || 0;
    const winIntensity = Math.min(winAmount / 500, 1); // 0 to 1 scale
    
    // More particles for bigger wins (10-50 confetti, 5-25 coins)
    const confettiCount = Math.floor(10 + (winIntensity * 40));
    const coinCount = Math.floor(5 + (winIntensity * 20));
    
    return (
      <div className={styles.resultsContainer}>
        {/* Animations container - fills the whole table */}
        <div className={styles.animationContainer}>
          <AnimatedRain 
            type="confetti"
            count={confettiCount}
            animationDuration={3}
            items={['#ffd700', '#ffed4e', '#fff', '#ff6b6b', '#4CAF50']}
          />
          <AnimatedRain 
            type="coin"
            count={coinCount}
            animationDuration={2}
          />
        </div>
        
        {/* Bottom message bar */}
        <div className={styles.messageArea}>
          <div className={`panel ${styles.resultBar} ${styles.winBar}`}>
            <span className={styles.playerName}>{playerName}</span>
            <span className={styles.resultText}>WINS</span>
            {result.winnings && result.winnings > 0 && (
              <span className={styles.winAmount}>
                <CurrencyAmount amount={result.winnings / 2} size="small" />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Render loss result
  if (outcome === 'lose') {
    // Scale animation based on loss amount (up to $500)
    const lossAmount = result.betAmount || 0;
    const lossIntensity = Math.min(lossAmount / 500, 1); // 0 to 1 scale
    
    // More emojis for bigger losses (8-30 based on amount)
    const emojiCount = Math.floor(8 + (lossIntensity * 22));
    
    // Different emoji sets based on loss amount
    const mildLossEmojis = ['😢', '😔', '😕', '👎', '📉', '💔', '🗑️', '🤦‍♂️'];
    const moderateLossEmojis = ['😭', '😩', '🤦', '💸', '📉', '😤', '😣', '🗑️', '🤡', '💩', '🙈'];
    const severeLossEmojis = ['🤡', '💩', '😂', '🤣', '🗑️', '💀', '☠️', '🪦', '⚰️', '🤪', '😵‍💫', '🙃', '🤮'];
    
    let lossEmojis;
    if (lossAmount < 50) {
      lossEmojis = mildLossEmojis;
    } else if (lossAmount < 200) {
      lossEmojis = moderateLossEmojis;
    } else {
      lossEmojis = severeLossEmojis;
    }
    
    return (
      <div className={styles.resultsContainer}>
        {/* Animations container */}
        <div className={styles.animationContainer}>
          <AnimatedRain 
            type="emoji"
            items={lossEmojis}
            count={emojiCount}
            animationDuration={2.5}
          />
        </div>
        
        {/* Bottom message bar */}
        <div className={styles.messageArea}>
          <div className={`panel ${styles.resultBar} ${styles.lossBar}`}>
            <span className={styles.playerName}>{playerName}</span>
            <span className={styles.resultText}>LOST</span>
            {result.betAmount && result.betAmount > 0 && (
              <span className={styles.lossAmount}>
                <CurrencyAmount amount={result.betAmount} size="small" />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Render tie/penalty result
  const penaltyAmount = (result.betAmount || 0) * (result.isTripleAceTie ? 3 : 2);
  
  // More intense animation for triple ace tie
  const warningCount = result.isTripleAceTie ? 15 : 8;
  const warningEmojis = result.isTripleAceTie 
    ? ['💀', '☠️', '⚠️', '🚨', '⛔', '💥', '🔥', '😱', '🎰', '💸']
    : ['⚠️', '🚨', '⛔', '🔴', '❌', '💥', '🎯', '🎲'];
  
  return (
    <div className={styles.resultsContainer}>
      {/* Caution tapes container - absolute positioned across whole table */}
      <div className={styles.cautionTapeContainer}>
        <div className={styles.cautionTape}>
          <span>{result.isTripleAceTie ? 'TRIPLE PENALTY' : 'PENALTY'}</span>
          <span>{result.isTripleAceTie ? 'TRIPLE PENALTY' : 'PENALTY'}</span>
          <span>{result.isTripleAceTie ? 'TRIPLE PENALTY' : 'PENALTY'}</span>
        </div>
        <div className={styles.cautionTape}>
          <span>{result.isTripleAceTie ? 'TRIPLE PENALTY' : 'PENALTY'}</span>
          <span>{result.isTripleAceTie ? 'TRIPLE PENALTY' : 'PENALTY'}</span>
          <span>{result.isTripleAceTie ? 'TRIPLE PENALTY' : 'PENALTY'}</span>
        </div>
      </div>
      
      {/* Animations container */}
      <div className={styles.animationContainer}>
        <AnimatedRain 
          type="emoji"
          items={warningEmojis}
          count={warningCount}
          animationDuration={result.isTripleAceTie ? 2 : 3}
        />
      </div>
      
      {/* Bottom message bar */}
      <div className={styles.messageArea}>
        <div className={`panel ${styles.resultBar} ${styles.penaltyBar}`}>
          <span className={styles.playerName}>{playerName}</span>
          <span className={styles.resultText}>{result.isTripleAceTie ? 'TRIPLE' : ''}</span>
          <span className={styles.penaltyText}>{result.isTripleAceTie ? '3x' : '2x'} PENALTY</span>
          <span className={styles.penaltyAmount}>
            <CurrencyAmount amount={penaltyAmount} size="small" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultsOverlay;