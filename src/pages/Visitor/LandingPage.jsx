import Chatbox from "../../Components/AuthUserComp/Chatbox";
import VisitorNavbar from "../../Components/VisitorComp/VisitorNavbar";

import VisitorSidebar from "../../Components/VisitorComp/VisitorSidebar";
function LandingPage() {
  return (
    <div className="flex flex-row h-screen w-screen bg-[#1b1c1d] ">
      <div className="basis-[5vw] bg-[#282A2C] hover:basis-[22vw] transition-all duration-200 ease-in-out">
        <VisitorSidebar />
      </div>
      <div className="basis-[95vw]  w-full h-full flex flex-col">
        <VisitorNavbar />
        <Chatbox />
      </div>
    </div>
  );
}

export default LandingPage;
