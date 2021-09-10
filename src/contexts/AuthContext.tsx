import { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  // getRedirectResult,
} from "firebase/auth";
import { auth } from "../services/firebase";

type User = firebase.User;

export type AuthContent = {
  user: User | undefined | null;
  signInWithGoogle: () => Promise<void>;
  signInWebsocket: () => void;
  signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContent>({
  user: undefined,
  signInWithGoogle: async () => undefined!,
  signInWebsocket: () => undefined,
  signout: async () => undefined,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const signInWebsocket = () => {
    const provider = new GoogleAuthProvider();
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = async () => {
      const user = await signInWithRedirect(auth, provider);
      ws.send(user);
      ws.close();
    };
  };

  const signout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user: firebase.User | null) => {
        setCurrentUser(user!);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const value = {
    user: currentUser,
    signInWithGoogle,
    signInWebsocket,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
