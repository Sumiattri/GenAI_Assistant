import LandingPage from "./pages/Visitor/LandingPage";
import ProtectedRoute from "./Route/ProtectedRoute";
import Home from "./pages/User/Home";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
