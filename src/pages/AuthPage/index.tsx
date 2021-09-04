import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../services/firebase";

export const AuthPage = (): JSX.Element => {
  const [user, setUser] = useState<firebase.User>();
  const { signInWithGoogle } = useAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user: firebase.User | null) => {
      console.log(user);
      setUser(user!);
    });
  }, []);

  return (
    <div className="container text-center">
      {user ? (
        <div>Logged In</div>
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
