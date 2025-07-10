import { GoPlus } from "react-icons/go";
import { useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

function Chatbox() {
  const textareaRef = useRef(null);
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0];

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // reset height
    textarea.style.height = textarea.scrollHeight + "px"; // adjust to content
  };
  return (
    <div className="w-full h-full flex flex-col ">
      {!user && (
        <div className="basis-8/10  flex pt-55 justify-center ">
          <div className=" h-25 xlg:w-[45%] lg:w-[54%]   flex flex-col gap-y-0 justify-center items-center text-white font-poppins  lg:text-[36px] md:text-[33px] sm:text-3xl xsm:text-2xl text-lg font-medium tracking-wide">
            <p className="">
              Meet{" "}
              <span className="bg-gradient-to-r from-[#4285F4] to-[#ff596a] bg-clip-text text-transparent ">
                GenAI
              </span>
              ,
            </p>
            <p>your personal AI assistant</p>
          </div>
        </div>
      )}
      {user && (
        <div className="basis-8/10  flex pt-55 justify-center">
          <div className=" h-25 w-[45%] flex flex-col gap-y-0 justify-center items-center text-white font-poppins text-[36px] font-medium tracking-wide">
            <p className="bg-gradient-to-r from-[#4285F4] to-[#ff596a] bg-clip-text text-transparent ">
              Hello , {firstName}
            </p>
          </div>
        </div>
      )}
      <div className="basis-2/10 flex items-center justify-center ">
        <div className="w-[80%]  h-20 flex items-center justify-center">
          <div className="border border-[#4A5050] w-[70%] rounded-full py-[8px] items-center flex px-3 gap-4   ">
            <div className="p-2 rounded-full hover:bg-[#262729]">
              <GoPlus className="text-gray-400 text-2xl cursor-pointer " />
            </div>
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              rows="1"
              placeholder="Ask GenAI..."
              className="text-white w-full bg-transparent resize-none overflow-hidden focus:outline-none"
            ></textarea>
            <div className="p-2 rounded-full hover:bg-[#262729]">
              <IoMdSend className="text-gray-200 text-2xl cursor-pointer " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
