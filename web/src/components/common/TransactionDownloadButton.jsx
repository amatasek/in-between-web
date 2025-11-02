import IconButton from './IconButton';
import DownloadIcon from '../icons/DownloadIcon';

// Optional import - only used if gameState not provided via props
let useGameContext;
try {
  useGameContext = require('../../contexts/GameContext').useGameContext;
} catch {
  // Context not available - will rely on props
  useGameContext = () => ({ gameState: null });
}

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
  // Use provided gameState or try to get from context if available
  let contextValue;
  try {
    contextValue = useGameContext ? useGameContext() : { gameState: null };
  } catch {
    // Context not available
    contextValue = { gameState: null };
  }
  
  // Handle both the original gameState format and our new gameData format
  const gameData = propGameState || contextValue?.gameState;
  
  // Extract data based on structure
  // For historical games from the API, the structure might be slightly different
  const gameTransactions = gameData?.gameTransactions || gameData?.gameData?.gameTransactions || [];
  const gameId = gameData?._id || gameData?.id || 'unknown';

  const downloadTransactionsCSV = () => {
    // Ensure we have transactions as an array
    const transactions = Array.isArray(gameTransactions) ? gameTransactions : [];
    
    if (transactions.length === 0) return;
    
    // Create CSV header
    let csvContent = "Player,Transaction Type,Amount,Round,Timestamp\n";
    
    // Make a copy of transactions for sorting
    const sortedTransactions = [...transactions].map(tx => ({
      ...tx,
      // Ensure timestamp is a Date object for sorting
      timestamp: tx.timestamp ? new Date(tx.timestamp) : new Date()
    }));
    
    // Sort all transactions by timestamp in ascending order
    sortedTransactions.sort((a, b) => a.timestamp - b.timestamp);
    
    // Add sorted transaction data to CSV
    sortedTransactions.forEach(tx => {
      // Format date for display
      const timestamp = tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'N/A';
      
      // Escape any commas in the player name
      const playerName = tx.playerName || tx.player || 'Unknown Player';
      const escapedName = playerName.includes(',') ? `"${playerName}"` : playerName;
      
      // Use the transactionType field if available, otherwise derive it from reason
      let transactionType = tx.transactionType || 'Transaction';
      
      // If we need to derive the transaction type from the reason
      if (!tx.transactionType && tx.reason) {
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
    link.setAttribute('download', `game-${gameId}-transactions.csv`);
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
