import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './BaseModal.module.css';

// Track number of open modals globally
let openModalCount = 0;

// BaseModal: Shared modal structure for all app modals
export default function BaseModal({ title, onClose, children, footer, headerButtons, className = '', overlayStyle, ...props }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (++openModalCount === 1) document.body.classList.add('modal-open');
    return () => { if (--openModalCount === 0) document.body.classList.remove('modal-open'); };
  }, []);
  
  const modalContent = (
    <div className={styles.overlay} style={overlayStyle} onClick={onClose}>
      <div
        className={`${styles.modal} ${className}`}
        onClick={e => e.stopPropagation()}
        {...props}
      >
        {title && (
          <div className={styles.header}>
            <h2>{title}</h2>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {headerButtons}
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close"
                type="button"
                data-gamepad-focusable="true"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <div className={styles.content}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );

  // Render modal using portal to document.body to avoid transform context issues
  return createPortal(modalContent, document.body);
}
