import React, { useState, useEffect } from 'react';
import BaseModal from './common/BaseModal';
import baseModalStyles from './common/BaseModal.module.css';
import styles from './styles/StoreModal.module.css';
import storeService from '../services/StoreService';

const StoreModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('coins');
  const [coinOfferings, setCoinOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCoinOfferings();
  }, []);

  const loadCoinOfferings = async () => {
    try {
      setLoading(true);
      setError(null);
      const offerings = await storeService.getCoinOfferings();
      setCoinOfferings(offerings);
    } catch (err) {
      console.error('Failed to load coin offerings:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (productId) => {
    try {
      setPurchasing(productId);
      setError(null);
      
      const result = await storeService.processPurchase(productId);
      
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

  const formatCoins = (amount) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  if (loading) {
    return (
      <BaseModal title="Store" onClose={onClose} style={{ maxWidth: 800, maxHeight: '80vh' }}>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#a0b9d6' }}>Loading products...</div>
      </BaseModal>
    );
  }

  return (
    <BaseModal title="Store" onClose={onClose} style={{ maxWidth: 800, maxHeight: '80vh' }}>
      {/* Tab Navigation */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'coins' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('coins')}
          data-gamepad-focusable="true"
        >
          Coin Packs
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
        <div>
          <div className={baseModalStyles.sectionHeader}>Available Coin Packs</div>
          
          {coinOfferings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#a0b9d6' }}>
              No coin packs available at the moment.
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gap: '1rem', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' 
            }}>
              {coinOfferings.map((offering) => (
                <div
                  key={offering.id}
                  className={baseModalStyles.settingItem}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    minHeight: '280px'
                  }}
                >
                  {/* Product Image */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '80px',
                    marginBottom: '1rem' 
                  }}>
                    {offering.imageUrl && (
                      <img
                        src={offering.imageUrl}
                        alt={offering.name}
                        style={{
                          width: '64px',
                          height: '64px',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div style={{ 
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: '1rem' 
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#FFD700',
                      margin: '0 0 0.5rem 0',
                      textAlign: 'center'
                    }}>
                      {formatCoins(offering.coinAmount)} Coins
                    </h3>
                    <p style={{
                      color: '#a0b9d6',
                      fontSize: '0.875rem',
                      margin: '0 0 0.75rem 0',
                      textAlign: 'center',
                      lineHeight: '1.4'
                    }}>
                      {offering.description}
                    </p>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#bcdcff',
                      textAlign: 'center'
                    }}>
                      {formatPrice(offering.priceUSD)}
                    </div>
                  </div>
                  
                  {/* Purchase Button */}
                  <button
                    onClick={() => handlePurchase(offering.id)}
                    disabled={purchasing === offering.id}
                    className={baseModalStyles.primaryButton}
                    style={{
                      width: '100%',
                      opacity: purchasing === offering.id ? 0.6 : 1,
                      cursor: purchasing === offering.id ? 'not-allowed' : 'pointer'
                    }}
                    data-gamepad-focusable="true"
                  >
                    {purchasing === offering.id ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={styles.loadingSpinner} style={{
                          marginRight: '0.5rem'
                        }}></div>
                        Processing...
                      </span>
                    ) : (
                      'Purchase'
                    )}
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