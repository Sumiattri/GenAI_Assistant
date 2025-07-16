import Chatbox from "../../Components/AuthUserComp/Chatbox";
import UserNavbar from "../../Components/AuthUserComp/UserNavbar";
import UserSidebar from "../../Components/AuthUserComp/UserSidebar";
import { useState } from "react";
import MobileSidebar from "../../Components/AuthUserComp/MobileSidebar";
import { AnimatePresence } from "framer-motion";

function LandingPage() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div className="flex flex-row h-[100dvh] w-screen bg-[#1b1c1d] ">
        <UserSidebar expanded={expanded} setExpanded={setExpanded} />

        <div className="  w-full h-full flex flex-col ">
          <UserNavbar expanded={expanded} setExpanded={setExpanded} />
          <Chatbox />
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <MobileSidebar expanded={expanded} setExpanded={setExpanded} />
        )}
      </AnimatePresence>
    </>
  );
}

export default LandingPage;
