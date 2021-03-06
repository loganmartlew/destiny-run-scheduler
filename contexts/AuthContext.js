import React, { useState, useEffect, useContext } from 'react';
import firebase from '../utils/firebase';
import 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  const resetPassword = email => {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
