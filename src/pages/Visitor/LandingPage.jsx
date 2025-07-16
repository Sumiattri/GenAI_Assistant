// import Chatbox from "../../Components/AuthUserComp/Chatbox";
import VisitorChatbox from "../../Components/VisitorComp/VisitorChatbox";
import VisitorNavbar from "../../Components/VisitorComp/VisitorNavbar";
import { useState, useEffect } from "react";
import VisitorSidebar from "../../Components/VisitorComp/VisitorSidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import VisMobileSidebar from "../../Components/VisitorComp/VisMobileSidebar";

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
    <>
      <div className="flex flex-row min-h-[100dvh]  w-screen bg-[#1b1c1d] ">
        <VisitorSidebar setExpanded={setExpanded} expanded={expanded} />

        <div className="  w-full h-full flex flex-col ">
          <VisitorNavbar setExpanded={setExpanded} expanded={expanded} />
          <VisitorChatbox />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <VisMobileSidebar setExpanded={setExpanded} expanded={expanded} />
        )}
      </AnimatePresence>
    </>
  );
}

export default LandingPage;
