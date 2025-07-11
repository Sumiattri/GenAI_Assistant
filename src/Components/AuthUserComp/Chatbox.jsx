import { GoPlus } from "react-icons/go";

import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchAIResponse } from "../../redux/chatSlice";

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
    console.log(messages);
  }, [messages, loading]);

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
        <>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-600 text-white self-end"
                  : "bg-gray-800 text-gray-200 self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-gray-400 text-sm self-start">
              GenAI is typing...
            </div>
          )}
        </>
      )}
      <div className="basis-2/10 flex items-center justify-center ">
        <div className="w-[80%]  h-20 flex items-center justify-center">
          <div className="border border-[#4A5050] w-[70%] rounded-full py-[8px] items-center flex px-3 gap-4   ">
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
              className="text-white w-full bg-transparent resize-none overflow-hidden focus:outline-none"
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
