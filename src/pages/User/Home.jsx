import Chatbox from "../../Components/AuthUserComp/Chatbox";
import UserNavbar from "../../Components/AuthUserComp/UserNavbar";
import UserSidebar from "../../Components/AuthUserComp/UserSidebar";
import { useState } from "react";

function LandingPage() {
  return (
    <div className="flex flex-row h-screen w-screen bg-[#1b1c1d] ">
      <UserSidebar />

      <div className="  w-full h-full flex flex-col ">
        <UserNavbar />
        <Chatbox />
      </div>
    </div>
  );
}

export default LandingPage;
