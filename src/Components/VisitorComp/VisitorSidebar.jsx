import { TbLayoutSidebar } from "react-icons/tb";
import { useState } from "react";
import { motion } from "motion/react";

import { useGoogleLogin } from "../../auth/auth";

function VisitorSidebar({ setExpanded, expanded }) {
  const [iconClicked, setIconClicked] = useState(false);
  const handleGoogleLogin = useGoogleLogin();

  return (
    <motion.div
      initial={false}
      animate={{ width: expanded ? "22vw" : "5vw" }}
      className={` bg-[#282A2C] overflow-hidden`}
    >
      <div
        className="text-white text-xl cursor-pointer relative  h-23  "
        onMouseEnter={() => {
          if (expanded) {
            setExpanded(true);
          }
        }}
      >
        <TbLayoutSidebar
          onClick={() => {
            setIconClicked(!iconClicked);
            setExpanded(!expanded);
          }}
          className="absolute top-5 left-3 rounded-full text-5xl hover:bg-[#3D3F42] transition-colors duration-150 p-3 box-border"
        />
      </div>
      <div
        className="  w-full  h-[calc(100vh-68px)]  relative "
        onMouseEnter={() => {
          setExpanded(true);
        }}
        onMouseLeave={() => {
          if (iconClicked) {
            return;
          }
          setExpanded(false);
        }}
      >
        <div
          className={`absolute top-17 left-5   ${
            !expanded ? "opacity-0" : "opacity-100"
          } bg-[#3D3F42] rounded-3xl pb-15 w-55 px-6 py-4 text-[13px] font-light text-white   transition-opacity duration-300 `}
        >
          <div>
            Sign in to start saving your chats Once you're signed in, you can
            access your recent chats here.
          </div>
          <button
            className="absolute bottom-3 left-3 rounded-full px-3 text-blue-300  py-[8px]  text-sm font-normal mt-2 cursor-pointer hover:bg-gray-500"
            onClick={handleGoogleLogin}
          >
            Sign in
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default VisitorSidebar;
