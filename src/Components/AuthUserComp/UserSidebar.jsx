import { TbLayoutSidebar } from "react-icons/tb";
import { motion } from "motion/react";
import { FaRegPenToSquare } from "react-icons/fa6";

import { setChatId, resetChat, setMessages } from "../../redux/chatSlice";
import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getUserChats } from "../../firebase/fireStoreUtils";
import { getMessagesFromFirestore } from "../../firebase/fireStoreUtils";

function UserSidebar({ expanded, setExpanded }) {
  const dispatch = useDispatch();

  const [iconClicked, setIconClicked] = useState(false);
  const [chatList, setChatList] = useState([]);
  const { activeChatId, messages } = useSelector((state) => state.chat);

  useEffect(() => {
    const fetchChats = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const chats = await getUserChats(userId);
      setChatList(chats);
      // console.log(chats);
    };

    fetchChats();
  }, [activeChatId, messages]);

  const handleChatSelect = async (chatId) => {
    dispatch(setChatId(chatId));
    localStorage.setItem("activeChatId", chatId); // ⏺️ Persist selected chat

    const userId = auth.currentUser?.uid;
    const messages = await getMessagesFromFirestore(userId, chatId);
    dispatch(setMessages(messages));
    console.log(messages);
  };

  const handleNewChat = () => {
    dispatch(resetChat()); // Clear messages
    dispatch(setChatId(null)); // Clear active chatId
    localStorage.removeItem("activeChatId"); // Clear saved ID
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: expanded ? "22vw" : "7vw" }}
      className={` bg-[#282A2C] overflow-hidden lg:inline-block hidden`}
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
          className={`absolute top-5 left-5 text-white  ${
            !expanded ? "opacity-0" : "opacity-100"
          }  font-light transition-opacity duration-300 w-55 text-[13px] `}
        >
          <div
            className=" py-2 rounded-3xl hover:bg-[#808080] flex justify-start pl-4 items-center gap-2 cursor-pointer"
            onClick={handleNewChat}
          >
            <FaRegPenToSquare /> <span>New Chat</span>
          </div>
        </div>
        <div
          className={`absolute top-17 left-1    ${
            !expanded ? "opacity-0" : "opacity-100"
          }   pb-15 w-62   py-4 pl-4 text-[14px] font-light text-[#808080]  transition-opacity duration-300 `}
        >
          <p className=" pb-5 pl-4 font-medium">Recent</p>

          <div className="chat-history flex flex-col gap-1">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className="chat-item cursor-pointer hover:bg-[#3D3F42] rounded-3xl"
                onClick={() => handleChatSelect(chat.id)}
              >
                <div
                  className={` pl-4  py-2 whitespace-nowrap overflow-hidden ${
                    activeChatId === chat.id
                      ? "bg-[#1E3760] rounded-3xl text-[15px] text-white font-[font2]"
                      : "text-[14px] text-[#b4b7ba]"
                  } `}
                >
                  {`${chat.title}...` || "Untitled Chat"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default UserSidebar;
