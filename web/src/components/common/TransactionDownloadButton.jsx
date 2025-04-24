import React from 'react';
import IconButton from './IconButton';
import DownloadIcon from '../icons/DownloadIcon';
import { useGameContext } from '../../contexts/GameContext';

/**
 * A specialized button component for downloading game transactions as CSV
 * 
 * @param {Object} props Component props
 * @param {string} props.title Custom tooltip text (optional)
 * @param {Object} props.gameState Game state object (optional, will use context if not provided)
 */
const TransactionDownloadButton = ({ 
  title = "Download Transaction Log as CSV",
  gameState: propGameState,
  ...restProps 
}) => {
  // Use provided gameState or get from context
  const contextValue = useGameContext();
  const gameState = propGameState || contextValue?.gameState;

  const downloadTransactionsCSV = () => {
    if (!gameState || !gameState.gameTransactions) return;
    
    // Create CSV header
    let csvContent = "Player,Transaction Type,Amount,Round,Timestamp\n";
    
    // Collect all transactions into a single array with player info
    const allTransactions = [];
    
    Object.entries(gameState.gameTransactions).forEach(([playerId, transactions]) => {
      if (!transactions || !Array.isArray(transactions)) return;
      
      const playerName = transactions[0]?.playerName || gameState.players[playerId]?.name || 'Unknown Player';
      
      transactions.forEach(tx => {
        allTransactions.push({
          playerId,
          playerName,
          ...tx,
          // Ensure timestamp is a Date object for sorting
          timestampObj: tx.timestamp ? new Date(tx.timestamp) : new Date(0)
        });
      });
    });
    
    // Sort all transactions by timestamp in ascending order
    allTransactions.sort((a, b) => a.timestampObj - b.timestampObj);
    
    // Add sorted transaction data to CSV
    allTransactions.forEach(tx => {
      // Format date for display
      const timestamp = tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'N/A';
      // Escape any commas in the player name
      const escapedName = tx.playerName.includes(',') ? `"${tx.playerName}"` : tx.playerName;
      // Format the transaction reason as a clean transaction type
      let transactionType = 'Transaction';
      if (tx.reason) {
        // Extract the action part from the reason (e.g., "Ante in round 1" -> "Ante")
        const reasonParts = tx.reason.split(' ');
        transactionType = reasonParts[0]; // Take the first word as the type
        
        // Special case for "Won bet" which is two words
        if (reasonParts[0] === 'Won') {
          transactionType = 'Win';
        }
        // Special case for penalty reasons
        else if (tx.reason.includes('penalty')) {
          transactionType = 'Penalty';
        }
      }
      // Add the transaction row
      csvContent += `${escapedName},${transactionType},${tx.amount},${tx.round || 'N/A'},${timestamp}\n`;
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `game-${gameState.id}-transactions.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <IconButton
      icon={<DownloadIcon color="white" size={20} />}
      title={title}
      onClick={downloadTransactionsCSV}
      variant="default"
      {...restProps}
    />
  );
};

export default TransactionDownloadButton;
