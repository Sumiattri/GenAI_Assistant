import { GoPlus } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchAIResponse } from "../../redux/chatSlice";
import ChatInterface from "../AuthUserComp/ChatInterface";
import { MdAutoAwesome } from "react-icons/md";

function VisitorChatbox() {
  const textareaRef = useRef(null);

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const [guest, setGuest] = useState(false);

  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setGuest(true);
    const userMessage = { role: "user", content: input };
    const recentMessages = messages.slice(-1);

    dispatch(addMessage(userMessage));
    await dispatch(fetchAIResponse([...recentMessages, userMessage]));
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      setInput("");
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // reset height
    textarea.style.height = textarea.scrollHeight + "px"; // adjust to content
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="w-full  h-full flex flex-col  overflow-y-auto hide-scrollbar">
      {!guest && (
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

      {messages.length > 0 && (
        <div className={` basis-8/10   overflow-x-hidden  overflow-y-auto `}>
          <ChatInterface messages={messages} messagesEndRef={messagesEndRef} />

          {loading && (
            <div className="text-gray-400 text-sm self-start ">
              <div className="flex items-center gap-2 lg:w-[50vw] md:w-[67vw] sm:w-[85vw] w-[95vw] mx-auto ">
                {" "}
                <MdAutoAwesome className="text-blue-400" /> GenAI is thinking...
              </div>
            </div>
          )}
        </div>
      )}
      <div className="basis-2/10  flex items-center justify-center   ">
        <div className=" relative  flex  items-center flex-col justify-end ">
          <div className="border    lg:w-[50vw] md:w-[67vw] sm:w-[85vw] w-[95vw] border-[#4A5050]   rounded-full py-[8px] items-center flex px-3 gap-4 shadow-sm shadow-amber-100  ">
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
              className={`text-white  max-h-20 w-full bg-transparent resize-none overflow-y-scroll  focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
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

export default VisitorChatbox;
