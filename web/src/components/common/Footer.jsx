import { useEffect, useState } from 'react';
import { getVersionInfo } from '../../utils/version';
import { openInBrowser } from '../../utils/openInBrowser';
import { WEB_URL } from '../../config';
import styles from './Footer.module.css';

const Footer = () => {
  const [versionInfo, setVersionInfo] = useState(null);

  useEffect(() => {
    getVersionInfo().then(setVersionInfo);
  }, []);

  return (
    <div className={styles.footer}>
      <div className={styles.footerLinks}>
        <button type="button" onClick={() => openInBrowser(`${WEB_URL}/terms`)} className={styles.footerLink}>Terms of Service</button>
        <span className={styles.footerDivider}>•</span>
        <button type="button" onClick={() => openInBrowser(`${WEB_URL}/privacy`)} className={styles.footerLink}>Privacy Policy</button>
      </div>
      {versionInfo && (
        <div className={styles.footerVersion}>{versionInfo.display}</div>
      )}
    </div>
  );
};

export default Footer;
