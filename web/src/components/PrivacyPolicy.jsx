import { useEffect } from 'react';
import styles from './styles/LegalPage.module.css';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | In-Between';

    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'Privacy Policy for In-Between card game. Learn how we collect, use, and protect your personal information, and your rights under GDPR and CCPA.';

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        <p className={styles.lastUpdated}>
          <em>Last Updated: October 31, 2025</em>
        </p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Applied Method, LLC ("we," "us," or "our") operates the In-Between card game platform
            (the "Service"). This Privacy Policy explains how we collect, use, disclose, and protect
            your personal information when you use our Service.
          </p>
          <p>
            By using the Service, you agree to the collection and use of information in accordance
            with this Privacy Policy. If you do not agree with this Privacy Policy, please do not
            use the Service.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>
            We collect several types of information to provide and improve our Service.
          </p>

          <h3>2.1 Personal Information</h3>
          <p>
            When you create an account or use the Service, we collect:
          </p>
          <ul>
            <li><strong>Email address</strong> - Provided by your social login provider (Google, Facebook, or Apple)</li>
            <li><strong>Username</strong> - Your chosen display name within the game</li>
            <li><strong>Profile picture</strong> - Either uploaded by you or retrieved from your social login provider</li>
            <li><strong>OAuth provider ID</strong> - A unique identifier from Google, Facebook, or Apple used for authentication</li>
          </ul>

          <h3>2.2 Gameplay Data</h3>
          <p>
            To provide game functionality and track your progress, we collect:
          </p>
          <ul>
            <li>Game history and match results</li>
            <li>Win/loss records and player rankings</li>
            <li>Achievements earned and experience points (XP)</li>
            <li>In-game purchases and virtual currency balance</li>
            <li>Chat messages (for moderation purposes)</li>
            <li>Game preferences and settings</li>
          </ul>

          <h3>2.3 Technical Information</h3>
          <p>
            We automatically collect certain technical information when you use the Service:
          </p>
          <ul>
            <li>IP address</li>
            <li>Device type, model, and operating system</li>
            <li>Browser type and version</li>
            <li>Session data and timestamps</li>
            <li>Cookies and local storage data</li>
            <li>Error logs and crash reports</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>
            We use the collected information for the following purposes:
          </p>

          <h3>Account Management</h3>
          <p>
            Creating and maintaining user accounts, authenticating users, and managing account security.
          </p>

          <h3>Gameplay</h3>
          <p>
            Providing game functionality, matchmaking, leaderboards, statistics tracking, and
            achievement systems.
          </p>

          <h3>Communication</h3>
          <p>
            Sending service updates, notifications about game events, responding to support requests,
            and communicating important changes to our Terms or Privacy Policy.
          </p>

          <h3>Analytics</h3>
          <p>
            Understanding user behavior, improving game features, identifying bugs, and optimizing
            the user experience through analytics tools like Google Analytics.
          </p>

          <h3>Content Moderation</h3>
          <p>
            Reviewing user-generated content (usernames, profile pictures, chat messages) to enforce
            our Terms of Service and maintain a safe gaming environment.
          </p>

          <h3>Monetization</h3>
          <p>
            Processing in-game purchases, managing virtual currency, and displaying advertisements
            through Google AdSense (when implemented).
          </p>

          <h3>Legal Compliance</h3>
          <p>
            Complying with legal obligations, protecting our rights, preventing fraud, and responding
            to legal requests from law enforcement or government agencies.
          </p>
        </section>

        <section>
          <h2>4. Third-Party Services</h2>
          <p>
            We share data with the following third-party services to provide the Service:
          </p>

          <h3>4.1 Social Login Providers</h3>
          <p>
            We use OAuth authentication through <strong>Google</strong>, <strong>Facebook</strong>,
            and <strong>Apple</strong> to allow you to sign in with your existing accounts. When you
            use social login:
          </p>
          <ul>
            <li>We receive limited profile data (email address, name, profile picture)</li>
            <li>These providers have their own privacy policies governing their data practices</li>
            <li>We do not have access to your social media passwords</li>
            <li>You can revoke our access through your social provider's settings at any time</li>
          </ul>

          <h3>4.2 Analytics Services</h3>
          <p>
            We use <strong>Google Analytics</strong> to understand how users interact with the Service.
            Google Analytics collects:
          </p>
          <ul>
            <li>IP addresses (anonymized where possible)</li>
            <li>Device information and browser details</li>
            <li>User behavior data (page views, session duration, interactions)</li>
            <li>Traffic sources and referral information</li>
          </ul>
          <p>
            You can opt out of Google Analytics using browser extensions like the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>

          <h3>4.3 Advertising Services</h3>
          <p>
            We may display advertisements through <strong>Google AdSense</strong>. When implemented,
            Google may:
          </p>
          <ul>
            <li>Use cookies to serve personalized ads based on your interests</li>
            <li>Collect information about your visits to our Service and other websites</li>
            <li>Allow you to opt out of personalized advertising through your{' '}
              <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>
            </li>
          </ul>

          <h3>4.4 Payment Processors</h3>
          <p>
            For in-game purchases, we use <strong>Stripe</strong> and app store payment systems
            (Apple App Store, Google Play Store). Payment information is handled directly by these
            processors and is not stored on our servers. We only receive confirmation of successful
            transactions and limited transaction details.
          </p>
        </section>

        <section>
          <h2>5. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to provide and improve the Service:
          </p>

          <h3>Essential Cookies</h3>
          <p>
            Required for authentication and session management. These cookies are necessary for the
            Service to function and cannot be disabled.
          </p>

          <h3>Preference Cookies</h3>
          <p>
            Store your settings and preferences (such as game settings, volume preferences, and
            display options) to provide a personalized experience.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            Used by Google Analytics to track usage patterns and help us understand how users
            interact with the Service.
          </p>

          <h3>Advertising Cookies</h3>
          <p>
            If advertising is enabled, these cookies may be used to serve personalized ads based on
            your interests and browsing behavior.
          </p>

          <p>
            Most web browsers allow you to control cookies through their settings. However, disabling
            cookies may limit your ability to use certain features of the Service.
          </p>
        </section>

        <section>
          <h2>6. Your Rights Under GDPR (EU Users)</h2>
          <p>
            If you are located in the European Economic Area (EEA), you have the following rights
            under the General Data Protection Regulation (GDPR):
          </p>

          <h3>Right to Access</h3>
          <p>
            You have the right to request a copy of the personal data we hold about you.
          </p>

          <h3>Right to Rectification</h3>
          <p>
            You can request that we correct any inaccurate or incomplete personal data.
          </p>

          <h3>Right to Erasure ("Right to be Forgotten")</h3>
          <p>
            You can request that we delete your personal data, subject to certain legal exceptions.
          </p>

          <h3>Right to Restriction of Processing</h3>
          <p>
            You can request that we limit the processing of your personal data in certain circumstances.
          </p>

          <h3>Right to Data Portability</h3>
          <p>
            You can request to receive your personal data in a structured, commonly used, and
            machine-readable format, and have it transferred to another service provider.
          </p>

          <h3>Right to Object</h3>
          <p>
            You can object to processing of your personal data based on legitimate interests or for
            direct marketing purposes.
          </p>

          <h3>Right to Withdraw Consent</h3>
          <p>
            Where processing is based on your consent, you have the right to withdraw that consent
            at any time.
          </p>

          <p>
            <strong>To exercise any of these rights, please contact us at{' '}
            <a href="mailto:support@appliedmethod.com">support@appliedmethod.com</a>.</strong> We
            will respond to your request within 30 days.
          </p>

          <p>
            You also have the right to lodge a complaint with your local data protection authority
            if you believe we have violated your privacy rights.
          </p>
        </section>

        <section>
          <h2>7. Your Rights Under CCPA (California Users)</h2>
          <p>
            If you are a California resident, you have the following rights under the California
            Consumer Privacy Act (CCPA):
          </p>

          <h3>Right to Know</h3>
          <p>
            You have the right to request disclosure of the categories and specific pieces of personal
            information we have collected about you, the sources from which we collected it, our
            business purposes for collecting it, and the categories of third parties with whom we
            share it.
          </p>

          <h3>Right to Delete</h3>
          <p>
            You have the right to request deletion of your personal information, subject to certain
            legal exceptions.
          </p>

          <h3>Right to Opt-Out of Sale</h3>
          <p>
            <strong>We do not sell your personal information.</strong> However, if we ever decide to
            do so in the future, we will provide a clear "Do Not Sell My Personal Information" link
            on our website.
          </p>

          <h3>Right to Non-Discrimination</h3>
          <p>
            You have the right to not be discriminated against for exercising your CCPA rights. We
            will not deny you service, charge different prices, or provide a different level of
            service for exercising your privacy rights.
          </p>

          <h3>Categories of Information Collected</h3>
          <p>
            We collect the following categories of personal information:
          </p>
          <ul>
            <li>Identifiers (email, username, OAuth IDs)</li>
            <li>Commercial information (purchase history, virtual currency balance)</li>
            <li>Internet or network activity (gameplay data, browsing behavior)</li>
            <li>Geolocation data (IP address)</li>
          </ul>

          <p>
            <strong>To exercise any of these rights, please contact us at{' '}
            <a href="mailto:support@appliedmethod.com">support@appliedmethod.com</a>.</strong> We
            will verify your identity before processing your request and respond within 45 days.
          </p>
        </section>

        <section>
          <h2>8. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide the Service and
            fulfill the purposes described in this Privacy Policy:
          </p>

          <ul>
            <li>
              <strong>Active accounts:</strong> Data is retained while your account remains active
            </li>
            <li>
              <strong>Game history:</strong> Gameplay data is retained for leaderboards, statistics,
              and historical records
            </li>
            <li>
              <strong>Deleted accounts:</strong> Personal data is deleted within 90 days of account
              deletion, except where we are legally required to retain it (e.g., for tax or legal
              compliance purposes)
            </li>
            <li>
              <strong>Backup data:</strong> Data may persist in backup systems for up to 12 months
              after deletion
            </li>
          </ul>

          <p>
            If you would like to request earlier deletion of your data, please contact us at{' '}
            <a href="mailto:support@appliedmethod.com">support@appliedmethod.com</a>.
          </p>
        </section>

        <section>
          <h2>9. Security Measures</h2>
          <p>
            We take the security of your personal information seriously and implement industry-standard
            measures to protect it:
          </p>

          <ul>
            <li>
              <strong>Authentication Security:</strong> We use secure OAuth authentication through
              trusted providers (Google, Facebook, Apple) and do not store passwords on our servers
            </li>
            <li>
              <strong>Encryption in Transit:</strong> All data transmitted between your device and
              our servers is encrypted using HTTPS/TLS
            </li>
            <li>
              <strong>Database Security:</strong> Our CouchDB database is protected with access controls
              and authentication
            </li>
            <li>
              <strong>JWT Authentication:</strong> Session tokens use industry-standard JSON Web Tokens
              for secure authentication
            </li>
            <li>
              <strong>Regular Updates:</strong> We keep our software and dependencies up to date with
              security patches
            </li>
          </ul>

          <p>
            However, no method of transmission over the internet or electronic storage is 100% secure.
            While we strive to protect your personal information, we cannot guarantee absolute security.
            You are responsible for maintaining the security of your account credentials.
          </p>
        </section>

        <section>
          <h2>10. Children's Privacy (COPPA Compliance)</h2>
          <p>
            The Service is not directed to children under the age of 13, and we do not knowingly
            collect personal information from children under 13.
          </p>
          <p>
            If you are under 13 years old, please do not use the Service or provide any personal
            information to us. If we discover that we have collected personal information from a
            child under 13 without parental consent, we will take steps to delete that information
            as quickly as possible.
          </p>
          <p>
            If you are a parent or guardian and believe that your child under 13 has provided us with
            personal information, please contact us immediately at{' '}
            <a href="mailto:support@appliedmethod.com">support@appliedmethod.com</a> so we can take
            appropriate action.
          </p>
        </section>

        <section>
          <h2>11. International Data Transfers</h2>
          <p>
            The Service is hosted on Render.com, a US-based hosting provider. Your personal information
            may be transferred to, stored, and processed in the United States or other countries where
            our service providers operate.
          </p>
          <p>
            These countries may have data protection laws that differ from the laws of your country.
            By using the Service, you consent to the transfer of your information to the United States
            and other countries where we operate.
          </p>
          <p>
            For users in the European Economic Area (EEA), we take steps to ensure that international
            data transfers comply with applicable data protection laws, including the use of standard
            contractual clauses when appropriate.
          </p>
        </section>

        <section>
          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices,
            technology, legal requirements, or other factors.
          </p>
          <p>
            When we make material changes to this Privacy Policy, we will:
          </p>
          <ul>
            <li>Update the "Last Updated" date at the top of this page</li>
            <li>Notify you by email (to the address associated with your account)</li>
            <li>Display a prominent notice on the Service</li>
            <li>Provide at least 30 days' notice before the changes take effect</li>
          </ul>
          <p>
            Your continued use of the Service after the effective date of the updated Privacy Policy
            constitutes your acceptance of the changes. If you do not agree with the updated Privacy
            Policy, you should stop using the Service and may request deletion of your account.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to stay informed about how
            we protect your information.
          </p>
        </section>

        <section>
          <h2>13. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our
            data practices, please contact us at:
          </p>
          <p>
            <strong>Applied Method, LLC</strong><br />
            1111B S Governors Ave STE 26981<br />
            Dover, DE 19904<br />
            United States<br />
            Email: <a href="mailto:support@appliedmethod.com">support@appliedmethod.com</a>
          </p>
          <p>
            We will respond to your inquiry as soon as possible, typically within 30 days.
          </p>
        </section>

        <div className={styles.footer}>
          <p>
            Thank you for trusting In-Between with your personal information. We are committed to
            protecting your privacy and providing a safe, enjoyable gaming experience.
          </p>
        </div>
      </div>
    </article>
  );
}
