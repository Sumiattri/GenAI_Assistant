import Chatbox from "../../Components/AuthUserComp/Chatbox";
import VisitorNavbar from "../../Components/VisitorComp/VisitorNavbar";
import { useState } from "react";
import VisitorSidebar from "../../Components/VisitorComp/VisitorSidebar";
import { motion } from "motion/react";

function LandingPage() {
  const [expanded, setExpanded] = useState(false);

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
