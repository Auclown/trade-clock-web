import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../services/firebase";

export const AuthPage = (): JSX.Element => {
  const [user, setUser] = useState<firebase.User>();
  const [token, setToken] = useState<string>();
  const { signInWithGoogle } = useAuth();

  useEffect(() => {
    auth.onAuthStateChanged(async (user: firebase.User | null) => {
      const token = await user?.getIdToken();

      setToken(token);
      setUser(user!);
    });
  }, []);

  useEffect(() => {
    const ws: WebSocket = new WebSocket("ws://localhost:8080");
    ws.onopen = function () {
      ws.send(token!);
      ws.close();
    };
  }, [token]);

  return (
    <div className="container text-center">
      {user ? (
        <button
          className="w-1/3 h-12 border rounded-lg border-gray-300 shadow-md"
          onClick={() => {
            console.log(`[token]: ${token}`);
          }}
        >
          Signed In
        </button>
      ) : (
        <button
          className="w-1/3 h-12 border rounded-lg border-gray-300 shadow-md"
          onClick={async () => {
            await signInWithGoogle();
          }}
        >
          Sign In With Google
        </button>
      )}
    </div>
  );
};
