const ChatInterface = ({ messages, messagesEndRef }) => {
  console.log(messages);
  return (
    <div className=" flex flex-col ">
      {messages?.map((msg, i) => (
        <div
          key={i}
          ref={messagesEndRef}
          className={`text-white px-6 py-2 my-5  rounded-b-3xl rounded-l-3xl   ${
            msg.role === "user"
              ? "bg-[#333537] max-w-[50%]  self-end"
              : " text-[15px] font-extralight"
          }`}
        >
          <div className="whitespace-pre-wrap font-[font2] ">{msg.content}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatInterface;
