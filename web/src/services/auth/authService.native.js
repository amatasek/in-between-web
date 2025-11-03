import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

export const authService = {
  async signInWithApple() {
    const result = await FirebaseAuthentication.signInWithApple();
    return result.user;
  },

  async signInWithGoogle() {
    const result = await FirebaseAuthentication.signInWithGoogle();
    return result.user;
  },

  async signInWithFacebook() {
    const result = await FirebaseAuthentication.signInWithFacebook({
      useLimitedLogin: true
    });
    return result.user;
  },

  async signInWithEmail(email, password) {
    const result = await FirebaseAuthentication.signInWithEmailAndPassword({ email, password });
    return result.user;
  },

  async createAccountWithEmail(email, password) {
    const result = await FirebaseAuthentication.createUserWithEmailAndPassword({ email, password });
    return result.user;
  },

  async getCurrentUser() {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user;
  },

  async signOut() {
    await FirebaseAuthentication.signOut();
  },

  async sendPasswordResetEmail(email) {
    await FirebaseAuthentication.sendPasswordResetEmail({ email });
  },

  getErrorMessage(error) {
    const errors = {
      'auth/invalid-email': 'Invalid email address',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/email-already-in-use': 'An account with this email already exists',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/operation-not-allowed': 'This sign-in method is not enabled',
      'auth/popup-closed-by-user': 'Sign-in cancelled',
      'auth/cancelled-popup-request': 'Sign-in cancelled',
      'auth/popup-blocked': 'Pop-up blocked. Please allow pop-ups and try again'
    };

    return errors[error?.code] || error?.message || 'An error occurred during authentication';
  }
};
