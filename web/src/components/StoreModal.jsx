import { useEffect, useState } from 'react';
import BaseModal from './common/BaseModal';
import CurrencyAmount from './common/CurrencyAmount';
import styles from './styles/StoreModal.module.css';
import storeService from '../services/StoreService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const StoreModal = ({ onClose }) => {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('coins');
  const [coinOfferings, setCoinOfferings] = useState([]);
  const [upgradeOfferings, setUpgradeOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      loadCoinOfferings();
      loadUpgradeOfferings();
    }
  }, [token]);

  const loadCoinOfferings = async () => {
    try {
      setLoading(true);
      setError(null);
      const offerings = await storeService.getOfferingsByType('coin', token);

      // Inject "Watch Ad" offering at the beginning
      const watchAdOffering = {
        id: 'watch-ad',
        coinAmount: 300,
        priceUSD: 0,
        name: 'Watch Ad',
        description: 'Watch a short video ad to earn free coins!',
        imageUrl: null,
        isAd: true
      };

      setCoinOfferings([watchAdOffering, ...offerings]);
    } catch (err) {
      console.error('Failed to load coin offerings:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadUpgradeOfferings = async () => {
    try {
      const offerings = await storeService.getOfferingsByType('upgrade', token);
      setUpgradeOfferings(offerings);
    } catch (err) {
      console.error('Failed to load upgrade offerings:', err);
    }
  };

  const handlePurchase = async (productId) => {
    try {
      setPurchasing(productId);
      setError(null);

      // Handle watch ad separately
      if (productId === 'watch-ad') {
        console.log('Watch ad clicked - Ad integration coming soon!');
        showToast('Ad feature coming soon! You would earn 300 coins by watching a short video.');
        setPurchasing(null);
        return;
      }

      const result = await storeService.processPurchase(productId, token);

      // Show success message or handle success
      console.log('Purchase successful:', result);

      // Close modal on successful purchase
      onClose();

    } catch (err) {
      console.error('Purchase failed:', err);
      setError(err.message || 'Purchase failed. Please try again.');
    } finally {
      setPurchasing(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <BaseModal title="Store" onClose={onClose} style={{ maxWidth: 800, height: '80vh' }}>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#a0b9d6' }}>Loading products...</div>
      </BaseModal>
    );
  }

  return (
    <BaseModal title="Store" onClose={onClose} style={{ maxWidth: 800, height: '80vh' }}>
        {/* Tab Navigation */}
        <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'coins' ? 'active' : ''}`}
          onClick={() => setActiveTab('coins')}
          data-gamepad-focusable="true"
        >
          Coin Packs
        </button>
        <button
          className={`tab-button ${activeTab === 'upgrade' ? 'active' : ''}`}
          onClick={() => setActiveTab('upgrade')}
          data-gamepad-focusable="true"
        >
          Upgrades
        </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid #e74c3c',
            borderRadius: '8px',
            color: '#ffb3b3'
          }}>
            {error}
          </div>
        )}

        {/* Coin Packs Tab Content */}
        {activeTab === 'coins' && (
          <div className="tab-content">
          {coinOfferings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#a0b9d6' }}>
              No coin packs available at the moment.
            </div>
          ) : (
            <div
              className={styles.coinPacksGrid}
              data-gamepad-scrollable="true"
              tabIndex="0"
            >
              {coinOfferings.map((offering) => (
                <div
                  key={offering.id}
                  className={`panel-alt ${styles.coinPackCard}`}
                >
                  <h3 className={styles.coinAmount}>
                    <CurrencyAmount amount={offering.coinAmount} size="large" />
                  </h3>

                  <div className={styles.productImage}>
                    {offering.imageUrl && (
                      <img
                        src={offering.imageUrl}
                        alt={offering.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>

                  <p className={styles.productDescription}>
                    {offering.description}
                  </p>

                  <div className={`${styles.productPrice} ${offering.isAd ? styles.free : styles.paid}`}>
                    {offering.isAd ? 'FREE' : formatPrice(offering.priceUSD)}
                  </div>

                  <button
                    onClick={() => handlePurchase(offering.id)}
                    disabled={purchasing === offering.id}
                    className={offering.isAd ? styles.adButton : "btn btn-primary"}
                    data-gamepad-focusable="true"
                  >
                    {purchasing === offering.id
                      ? 'Processing...'
                      : (offering.isAd ? 'Watch Ad' : 'Purchase')}
                  </button>
                </div>
              ))}
            </div>
          )}
          </div>
        )}

        {/* Upgrades Tab Content */}
        {activeTab === 'upgrade' && (
          <div className="tab-content">
          {upgradeOfferings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#a0b9d6' }}>
              No upgrades available at the moment.
            </div>
          ) : (
            <div
              className={styles.coinPacksGrid}
              data-gamepad-scrollable="true"
              tabIndex="0"
            >
              {upgradeOfferings.map((offering) => (
                <div
                  key={offering.id}
                  className={`panel-alt ${styles.coinPackCard}`}
                >
                  <h3 className={styles.coinAmount}>
                    {offering.name}
                  </h3>

                  <div className={styles.productImage}>
                    {offering.imageUrl && (
                      <img
                        src={offering.imageUrl}
                        alt={offering.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>

                  <p className={styles.productDescription}>
                    {offering.description}
                  </p>

                  <div className={`${styles.productPrice} ${styles.paid}`}>
                    {formatPrice(offering.priceUSD)}/month
                  </div>

                  <button
                    onClick={() => handlePurchase(offering.id)}
                    disabled={purchasing === offering.id}
                    className="btn btn-primary"
                    data-gamepad-focusable="true"
                  >
                    {purchasing === offering.id ? 'Processing...' : 'Subscribe'}
                  </button>
                </div>
              ))}
            </div>
          )}
          </div>
        )}
    </BaseModal>
  );
};

export default StoreModal;