import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

class SignUp {
    static signUp(email, password) {
        return createUserWithEmailAndPassword(getAuth(), email, password);
    }
}

export default SignUp;
