import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import SpinnerOverlay from "../utils/SpinnerOverlay";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setTimeout(() => {
        setLoading(false);
      }, 300);
    });

    return () => unsubscribe();
  }, []);
  if (loading) {
    return <SpinnerOverlay />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
