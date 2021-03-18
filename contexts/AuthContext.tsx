import React, { useState, useEffect, useContext } from 'react';
import fb from 'firebase';
import firebase from '@/utils/firebase';
import 'firebase/auth';
import User from '@/types/User';

export interface AuthContext {
  authUser: fb.User | null | undefined;
  dbUser: User | undefined;
  signup: (
    email: string,
    password: string,
    username: string
  ) => Promise<fb.auth.UserCredential>;
  login: (email: string, password?: string) => any;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  provider?: React.Provider<AuthContext>;
  consumer?: React.Consumer<AuthContext>;
}

const AuthContext: React.Context<AuthContext | undefined> = React.createContext<
  AuthContext | undefined
>(undefined);

export const useAuth = () => {
  return useContext<AuthContext | undefined>(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<fb.User | null>();
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
      .then(user => {
        setDbUser(user);
      });

    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password?: string) => {
    fetch(`/api/users?email=${email}`)
      .then(res => res.json())
      .then(user => {
        setDbUser(user);
      });

    if (password !== '')
      return firebase.auth().signInWithEmailAndPassword(email, password!);
  };

  const logout = () => {
    setDbUser(undefined);
    return firebase.auth().signOut();
  };

  const resetPassword = (email: string) => {
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

  // Type '(email: string, password?: string | undefined) => Promise<fb.auth.UserCredential> | undefined'
  // is no'(email: string, password?: string | undefined) => Promise<UserCredential>'.

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
