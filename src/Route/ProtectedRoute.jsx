import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SpinnerOverlay from "../utils/SpinnerOverlay";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
