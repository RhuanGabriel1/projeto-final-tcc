import { getAuth, sendPasswordResetEmail } from "firebase/auth";

class ForgotPasswordFirebase {
  static resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(getAuth(), email);
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default ForgotPasswordFirebase;
