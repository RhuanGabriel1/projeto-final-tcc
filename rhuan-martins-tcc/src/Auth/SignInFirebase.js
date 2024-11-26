import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

class SignIn {
    static signInEmail(email, password) {
        return signInWithEmailAndPassword(getAuth(), email, password);
    }
}

export default SignIn;
