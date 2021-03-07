import React, { useState, useEffect, useContext } from 'react';
import fb from 'firebase'
import firebase from '../utils/firebase';
import 'firebase/auth';

import User from '../types/User';

const AuthContext = React.createContext(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState<fb.User>();
  const [dbUser, setDbUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string, username: string) => {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email }),
    })
      .then(res => res.json())
      .then(user => setDbUser(user));

    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    fetch(`/api/users?email=${email}`)
      .then(res => res.json())
      .then(user => {
        setDbUser(user);
      });

    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    setDbUser(undefined);
    return firebase.auth().signOut();
  };

  const resetPassword = email => {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setAuthUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContext = {
    authUser,
    dbUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export interface AuthContext {
  authUser: fb.User,
  dbUser: User,
  signup,
  login,
  logout,
  resetPassword,
}