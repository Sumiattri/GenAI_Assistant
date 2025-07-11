import { GoPlus } from "react-icons/go";

import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchAIResponse } from "../../redux/chatSlice";
import ChatInterface from "./ChatInterface";

function Chatbox() {
  const textareaRef = useRef(null);
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0];
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // reset height
    textarea.style.height = textarea.scrollHeight + "px"; // adjust to content
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    dispatch(addMessage(userMessage));
    dispatch(fetchAIResponse([...messages, userMessage]));
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="w-full h-full flex flex-col  overflow-y-auto hide-scrollbar">
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
      {user && messages.length === 0 && (
        <div className="basis-8/10  flex pt-55 justify-center">
          <div className=" h-25 w-[45%] flex flex-col gap-y-0 justify-center items-center text-white font-poppins text-[36px] font-medium tracking-wide">
            <p className="bg-gradient-to-r from-[#4285F4] to-[#ff596a] bg-clip-text text-transparent ">
              Hello , {firstName}
            </p>
          </div>
        </div>
      )}
      {user && messages.length > 0 && (
        <div className="basis-8/10  px-70  overflow-y-auto hide-scrollbar">
          <ChatInterface messages={messages} messagesEndRef={messagesEndRef} />

          {loading && (
            <div className="text-gray-400 text-sm self-start">
              GenAI is typing...
            </div>
          )}
        </div>
      )}
      <div className="basis-2/10 flex items-center justify-center ">
        <div className="w-[80%]  h-20 flex items-center justify-center">
          <div className="border border-[#4A5050] w-[70%] rounded-full py-[8px] items-center flex px-3 gap-4 shadow-sm shadow-amber-100  ">
            <div className="p-2 rounded-full hover:bg-[#262729]">
              <GoPlus className="text-gray-400 text-2xl cursor-pointer " />
            </div>
            <textarea
              value={input}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInput(e.target.value)}
              ref={textareaRef}
              onInput={handleInput}
              rows="1"
              placeholder="Ask GenAI..."
              className="text-white max-h-20 w-full bg-transparent resize-none overflow-y-scroll  focus:outline-none"
            />
            <div className="p-2 rounded-full hover:bg-[#262729]">
              <IoMdSend
                onClick={handleSend}
                className="text-gray-200 text-2xl cursor-pointer "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
