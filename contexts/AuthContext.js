import React, { useState, useEffect, useContext } from 'react';
import firebase from '../utils/firebase';
import 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [dbUser, setDbUser] = useState('');
  const [loading, setLoading] = useState(true);

  const signup = (email, password, username) => {
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

  const login = (email, password) => {
    fetch(`/api/users/${email}`)
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
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    dbUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
