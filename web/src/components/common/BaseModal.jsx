import React from 'react';
import { createPortal } from 'react-dom';
import styles from './BaseModal.module.css';

// BaseModal: Shared modal structure for all app modals
export default function BaseModal({ title, onClose, children, footer, className = '', overlayStyle, ...props }) {
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
        )}
        <div className={styles.content}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );

  // Render modal using portal to document.body to avoid transform context issues
  return createPortal(modalContent, document.body);
}
