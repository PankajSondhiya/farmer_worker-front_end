import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";

import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDc4HvOkeGDyQPRF-rycnbhKSXbDglqie0",
  authDomain: "farmerworkerrelationship.firebaseapp.com",
  projectId: "farmerworkerrelationship",
  storageBucket: "farmerworkerrelationship.firebasestorage.app",
  messagingSenderId: "78194273543",
  appId: "1:78194273543:web:0eaccac69b7e8b994ee9a2",
  measurementId: "G-CRZ56ZRTDH",
};

const app = initializeApp(firebaseConfig);
const FirebaseContext = createContext();
export const auth = getAuth(app);
export const useFireBase = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {
  const firebaseSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email.password);
  };
  const firebaseLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const createNewPassword = (oobcode, newPassword) => {
    return confirmPasswordReset(auth, oobcode, newPassword);
  };
  return (
    <FirebaseContext.Provider
      value={{
        firebaseSignUp,
        firebaseLogin,
        resetPassword,
        createNewPassword,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
