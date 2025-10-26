import React, { useState, useEffect } from 'react';
import BaseModal from './common/BaseModal';
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
                  className="panel-alt"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px',
                    minHeight: '280px'
                  }}
                >
                  {/* Coin Amount Header */}
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#FFD700',
                    margin: '0 0 1rem 0',
                    textAlign: 'center'
                  }}>
                    {formatCoins(offering.coinAmount)} Coins
                  </h3>
                  
                  {/* Product Image */}
                  {offering.imageUrl && (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      marginBottom: '1rem' 
                    }}>
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
                    </div>
                  )}
                  
                  {/* Description */}
                  <p style={{
                    color: '#a0b9d6',
                    fontSize: '0.875rem',
                    margin: '0 0 1rem 0',
                    textAlign: 'center',
                    lineHeight: '1.4',
                    flex: '1'
                  }}>
                    {offering.description}
                  </p>
                  
                  {/* Price */}
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: '#bcdcff',
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}>
                    {formatPrice(offering.priceUSD)}
                  </div>
                  
                  {/* Purchase Button */}
                  <button
                    onClick={() => handlePurchase(offering.id)}
                    disabled={purchasing === offering.id}
                    className="btn btn-primary"
                    data-gamepad-focusable="true"
                  >
                    {purchasing === offering.id ? 'Processing...' : 'Purchase'}
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