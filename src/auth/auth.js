import { auth, googleProvider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useGoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // console.log("Logged in user:", user);

      // ✅ Proper redirect
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return handleGoogleLogin;
};
