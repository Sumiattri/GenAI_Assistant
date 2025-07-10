import Chatbox from "../../Components/AuthUserComp/Chatbox";
import VisitorNavbar from "../../Components/VisitorComp/VisitorNavbar";
import { useState, useEffect } from "react";
import VisitorSidebar from "../../Components/VisitorComp/VisitorSidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <div className="flex flex-row h-screen w-screen bg-[#1b1c1d] ">
      <VisitorSidebar setExpanded={setExpanded} expanded={expanded} />

      <div className="  w-full h-full flex flex-col ">
        <VisitorNavbar />
        <Chatbox />
      </div>
    </div>
  );
}

export default LandingPage;
