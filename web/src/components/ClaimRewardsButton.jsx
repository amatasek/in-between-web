import { Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isEligibleForDailyReward } from '../utils/dailyRewardHelpers';
import styles from './styles/ClaimRewardsButton.module.css';

const ClaimRewardsButton = ({ onClick }) => {
  const { user } = useAuth();

  // Don't show the button if user is not eligible
  if (!user || !isEligibleForDailyReward(user.dailyRewards)) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.claimButton}
      onClick={onClick}
      data-gamepad-focusable="true"
    >
      <Gift size={16} />
      <span>Claim</span>
    </button>
  );
};

export default ClaimRewardsButton;
