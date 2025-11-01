import { useEffect } from 'react';
import styles from './styles/LegalPage.module.css';

export default function TermsOfService() {
  useEffect(() => {
    document.title = 'Terms of Service | In-Between';

    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'Terms of Service for In-Between card game platform. Read our user agreement, eligibility requirements, and acceptable use policy.';

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Terms of Service</h1>
        <p className={styles.lastUpdated}>
          <em>Last Updated: October 31, 2025</em>
        </p>

        <section>
          <h2>1. Introduction and Acceptance</h2>
          <p>
            Welcome to In-Between, a multiplayer card game platform operated by Applied Method, LLC
            ("we," "us," or "our"). By accessing or using our Service, you agree to be bound by
            these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and Applied Method, LLC.
            Your continued use of the Service indicates your acceptance of these Terms and any future
            modifications.
          </p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 13 years old to use the Service. By using the Service, you represent
            and warrant that you are at least 13 years old. If you are under 13, you are not permitted
            to use the Service.
          </p>
          <p>
            If we discover that a user is under 13 years old, we will immediately terminate their
            account and delete their personal information in accordance with applicable law.
          </p>
        </section>

        <section>
          <h2>3. Account Registration and Security</h2>
          <p>
            To access certain features of the Service, you may be required to create an account using
            one of our supported social login providers (Google, Facebook, or Apple). You agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information during registration</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access to your account</li>
            <li>Accept responsibility for all activities that occur under your account</li>
            <li>Not share your account with others or allow others to access your account</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms or engage
            in suspicious activity.
          </p>
        </section>

        <section>
          <h2>4. Acceptable Use Policy</h2>
          <p>
            You agree to use the Service in a manner consistent with all applicable laws and regulations.
            We actively moderate content and reserve the right to review and remove inappropriate content,
            including usernames, profile pictures, and chat messages.
          </p>
          <p><strong>Prohibited activities include, but are not limited to:</strong></p>
          <ul>
            <li>Harassment, bullying, or abusive behavior toward other users</li>
            <li>Using offensive, inappropriate, or misleading usernames</li>
            <li>Uploading inappropriate or offensive profile pictures</li>
            <li>Cheating, exploiting bugs, or manipulating game mechanics for unfair advantage</li>
            <li>Attempting to gain unauthorized access to other accounts or our systems</li>
            <li>Using automated scripts, bots, or other tools to interact with the Service</li>
            <li>Spamming, advertising, or soliciting other users for commercial purposes</li>
            <li>Posting or sharing illegal, harmful, or malicious content</li>
            <li>Impersonating other users, moderators, or Applied Method, LLC representatives</li>
          </ul>
          <p>
            Violation of this Acceptable Use Policy may result in content removal, account suspension,
            or permanent termination without notice or refund.
          </p>
        </section>

        <section>
          <h2>5. Virtual Currency and Purchases</h2>
          <p>
            The Service may offer virtual currency, cosmetic items, or other digital goods for purchase.
            All purchases are final and non-refundable except where required by law.
          </p>
          <p><strong>You acknowledge and agree that:</strong></p>
          <ul>
            <li>Virtual currency and digital items have no real-world monetary value</li>
            <li>Virtual currency cannot be transferred, exchanged, or redeemed outside the Service</li>
            <li>We reserve the right to modify prices, offerings, and availability at any time</li>
            <li>Purchases are subject to the policies of third-party app stores (Apple App Store, Google Play Store)</li>
            <li>No refunds will be provided for unused virtual currency or items upon account termination</li>
            <li>We are not responsible for unauthorized purchases made through your account</li>
          </ul>
          <p>
            If you believe you have been charged in error, please contact us at{' '}
            <a href="mailto:support@appliedmethod.com">support@appliedmethod.com</a> within 30 days
            of the transaction.
          </p>
        </section>

        <section>
          <h2>6. Intellectual Property Rights</h2>
          <p>
            All content, features, and functionality of the Service, including but not limited to text,
            graphics, logos, icons, images, audio clips, video clips, data compilations, software, and
            the compilation thereof (collectively, "Content"), are owned by Applied Method, LLC and are
            protected by United States and international copyright, trademark, patent, trade secret, and
            other intellectual property laws.
          </p>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable license to access and use
            the Service for your personal, non-commercial use. You may not:
          </p>
          <ul>
            <li>Copy, modify, distribute, sell, or lease any part of the Service</li>
            <li>Reverse engineer, decompile, or disassemble the Service or its software</li>
            <li>Remove or modify any copyright, trademark, or other proprietary notices</li>
            <li>Use the Service for any commercial purpose without our written permission</li>
          </ul>
          <p>
            By submitting user-generated content (such as usernames, chat messages, or profile pictures),
            you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and
            display such content solely for the purpose of operating and improving the Service.
          </p>
        </section>

        <section>
          <h2>7. User-Generated Content and Moderation</h2>
          <p>
            The Service may allow you to create, submit, or display content such as usernames, profile
            pictures, and chat messages. You retain ownership of your user-generated content, but you
            grant us the rights described in Section 6.
          </p>
          <p>
            We actively moderate content and reserve the right to review, remove, or modify any
            user-generated content that violates these Terms or is deemed inappropriate. However, we
            are not obligated to monitor all content and are not responsible for user-generated content.
          </p>
          <p>
            You are solely responsible for your content and the consequences of posting it. You represent
            and warrant that you own or have the necessary rights to post your content and that it does
            not violate any third-party rights or applicable laws.
          </p>
        </section>

        <section>
          <h2>8. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that:
          </p>
          <ul>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results obtained from using the Service will be accurate or reliable</li>
            <li>Any errors in the Service will be corrected</li>
            <li>The Service will meet your requirements or expectations</li>
          </ul>
          <p>
            We are not responsible for issues caused by third-party services, including social login
            providers, payment processors, or hosting providers. Your use of the Service is at your
            sole risk.
          </p>
        </section>

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, APPLIED METHOD, LLC, ITS OFFICERS, DIRECTORS,
            EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL,
            ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE.
          </p>
          <p>
            IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE
            (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY, OR ONE HUNDRED DOLLARS ($100),
            WHICHEVER IS GREATER.
          </p>
          <p>
            We are not liable for:
          </p>
          <ul>
            <li>Loss or corruption of virtual currency or account data</li>
            <li>Unauthorized access to your account due to your failure to maintain security</li>
            <li>Service interruptions or downtime</li>
            <li>Actions or omissions of third-party service providers</li>
            <li>Conduct of other users</li>
          </ul>
          <p>
            Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of
            the above limitations may not apply to you.
          </p>
        </section>

        <section>
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Applied Method, LLC, its officers, directors,
            employees, agents, and affiliates from and against any claims, liabilities, damages, losses,
            costs, expenses, or fees (including reasonable attorneys' fees) arising from:
          </p>
          <ul>
            <li>Your use or misuse of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another person or entity</li>
            <li>Your user-generated content</li>
            <li>Your breach of any representation or warranty contained in these Terms</li>
          </ul>
          <p>
            We reserve the right to assume exclusive defense and control of any matter subject to
            indemnification by you, and you agree to cooperate with our defense of such claims.
          </p>
        </section>

        <section>
          <h2>11. Dispute Resolution and Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of
            Delaware, United States, without regard to its conflict of law provisions.
          </p>
          <p>
            Any disputes arising out of or relating to these Terms or the Service shall be resolved
            through binding arbitration in accordance with the rules of the American Arbitration
            Association. The arbitration shall take place in Delaware, and the arbitrator's
            decision shall be final and binding.
          </p>
          <p>
            You agree to waive any right to a jury trial and to participate in a class action lawsuit
            against Applied Method, LLC. Each party shall bear its own costs and attorneys' fees, unless
            otherwise awarded by the arbitrator.
          </p>
          <p>
            Notwithstanding the above, either party may seek injunctive or equitable relief in a court
            of competent jurisdiction to prevent actual or threatened infringement, misappropriation, or
            violation of intellectual property rights.
          </p>
        </section>

        <section>
          <h2>12. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account and access to the Service at any
            time, with or without cause, and with or without notice, for any reason including but not
            limited to:
          </p>
          <ul>
            <li>Violation of these Terms</li>
            <li>Fraudulent, abusive, or illegal activity</li>
            <li>Extended periods of inactivity</li>
            <li>Requests from law enforcement or government agencies</li>
            <li>Technical or security issues</li>
          </ul>
          <p>
            You may terminate your account at any time by contacting us at{' '}
            <a href="mailto:support@appliedmethod.com">support@appliedmethod.com</a>. Upon termination:
          </p>
          <ul>
            <li>Your right to use the Service will immediately cease</li>
            <li>Your account data will be deleted in accordance with our Privacy Policy</li>
            <li>Any unused virtual currency or items will be forfeited without refund</li>
            <li>Sections of these Terms that by their nature should survive termination will survive</li>
          </ul>
        </section>

        <section>
          <h2>13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make material changes, we will
            notify you by email (to the address associated with your account) or by posting a notice on
            the Service at least 30 days before the changes take effect.
          </p>
          <p>
            Your continued use of the Service after the effective date of the modified Terms constitutes
            your acceptance of the changes. If you do not agree to the modified Terms, you must stop
            using the Service and may terminate your account.
          </p>
          <p>
            We encourage you to review these Terms periodically to stay informed of any updates.
          </p>
        </section>

        <section>
          <h2>14. Miscellaneous</h2>
          <p>
            <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute
            the entire agreement between you and Applied Method, LLC regarding the Service.
          </p>
          <p>
            <strong>Severability:</strong> If any provision of these Terms is found to be invalid or
            unenforceable, the remaining provisions will remain in full force and effect.
          </p>
          <p>
            <strong>Waiver:</strong> Our failure to enforce any right or provision of these Terms will
            not constitute a waiver of such right or provision.
          </p>
          <p>
            <strong>Assignment:</strong> You may not assign or transfer these Terms or your rights under
            these Terms without our prior written consent. We may assign these Terms without restriction.
          </p>
          <p>
            <strong>Contact Information:</strong> For questions, concerns, or notices regarding these Terms,
            please contact us at:
          </p>
          <p>
            Applied Method, LLC<br />
            1111B S Governors Ave STE 26981<br />
            Dover, DE 19904<br />
            United States<br />
            Email: <a href="mailto:support@appliedmethod.com">support@appliedmethod.com</a>
          </p>
        </section>

        <div className={styles.footer}>
          <p>
            By using In-Between, you acknowledge that you have read, understood, and agree to be bound
            by these Terms of Service.
          </p>
        </div>
      </div>
    </article>
  );
}
