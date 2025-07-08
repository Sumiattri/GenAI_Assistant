import LandingPage from "./pages/Visitor/LandingPage";
import LoginPage from "./pages/User/LoginPage";

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
      <Route path="/login" element={<LoginPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
