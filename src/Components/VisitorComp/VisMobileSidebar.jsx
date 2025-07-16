import { motion } from "motion/react";
import { useGoogleLogin } from "../../auth/auth";

function VisMobileSidebar({ setExpanded, expanded }) {
  const handleGoogleLogin = useGoogleLogin();

  return (
    <div className="absolute inset-0 lg:hidden ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        // exit={{ x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-black/50 z-10"
        onClick={() => setExpanded(false)}
      ></motion.div>

      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={` bg-[#282A2C] overflow-hidden z-11  absolute inset-0  md:w-[40vh] sm:w-[50vw] w-[80vw] h-[100vh]`}
      >
        <div className="  w-full  h-[calc(100vh-68px)]  relative ">
          <div
            className={`absolute top-17 left-10   ${
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
    </div>
  );
}

export default VisMobileSidebar;
