import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown (tables, strikethrough, task lists)
import rehypeHighlight from "rehype-highlight";
import SvgComponent from "../../utils/SvgComponent";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { useState, useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

const ChatInterface = ({ messages, messagesEndRef, loading }) => {
  const [reactionState, setReactionState] = useState({});

  const handleLike = (i) => {
    setReactionState((prev) => ({
      ...prev,
      [i]: { liked: true, disliked: false },
    }));
  };

  const handleDislike = (i) => {
    setReactionState((prev) => ({
      ...prev,
      [i]: { liked: false, disliked: true },
    }));
  };

  const handleUnlike = (i) => {
    setReactionState((prev) => ({
      ...prev,
      [i]: { liked: false, disliked: false },
    }));
  };

  const [animate, setAnimate] = useState(false);

  const [typedContent, setTypedContent] = useState("");

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg || lastMsg.role !== "assistant") return;

    const fullText = lastMsg.content;
    let index = 0;

    setTypedContent(""); // reset

    const interval = setInterval(() => {
      // 👇 Add check to not overflow
      if (index <= fullText.length) {
        setTypedContent(fullText.slice(0, index)); // ✅ always slice from 0
        index++;
      } else {
        clearInterval(interval);
      }
    }, 15); // adjust speed

    return () => clearInterval(interval);
  }, [messages]);

  function handleClick() {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 200);
  }

  return (
    <div className=" flex flex-col lg:w-[50vw] md:w-[67vw] sm:w-[85vw] w-[90vw] mx-auto  ">
      {messages?.map((msg, i) => (
        <div
          key={i}
          ref={messagesEndRef}
          // The main message bubble container
          className={`text-white py-2 sm:mb-8 mb-2 mt-2 sm:mt-5 rounded-b-3xl  ${
            msg.role === "user"
              ? "bg-[#333537] max-w-[90%] self-end rounded-l-3xl px-6" // User message styles (right aligned)
              : "rounded-r-3xl self-start " // <--- AI message styles: Re-added max-w, further reduced px
          }`}
        >
          {msg.role === "assistant" ? (
            // Wrapper for Markdown content with prose styles
            <div className="flex flex-col gap-5  ">
              <div className=" flex gap-3 ">
                <div className=" sm:min-w-10  min-w-7  -mt-[5px]">
                  <SvgComponent className="text-[2px]" />
                </div>
                <div className="prose prose-invert max-w-none font-[font2]   sm:text-[15px] text-sm font-extralight">
                  <ReactMarkdown
                    children={
                      i === messages.length - 1 ? typedContent : msg.content // 👈 Only type the last assistant message
                    }
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]} // Apply rehypeHighlight for code block processing
                    components={{
                      // Custom components (you can keep these or simplify further if needed)
                      h1: ({ node, ...props }) => (
                        <h1 className=" font-bold mt-6 mb-4" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className=" font-semibold mt-4 mb-2" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className=" font-medium mt-3 mb-1" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="my-2 text-base leading-relaxed"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-outside" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-outside" {...props} />
                      ),
                      li: ({ node, ...props }) => <li {...props} />,
                      code: ({ inline, className, children, ...props }) =>
                        inline ? (
                          <code className="text-white  rounded " {...props}>
                            {children}
                          </code>
                        ) : (
                          <div className="w-full max-w-full overflow-x-auto rounded-xl  ">
                            <pre className="whitespace-pre-wrap break-words  text-xs">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>
                        ),
                    }}
                  />
                </div>
              </div>
              <div
                className={`${
                  !reactionState ? "opacity-0" : ""
                } flex gap-2 px-14 text-gray-400 text-lg `}
              >
                {reactionState[i]?.liked ? (
                  <BiSolidLike
                    className={`hover:cursor-pointer text-[#A8C7FA]`}
                    onClick={() => handleUnlike(i)}
                  />
                ) : (
                  <BiLike
                    className={`hover:cursor-pointer`}
                    onClick={() => handleLike(i)}
                  />
                )}

                {reactionState[i]?.disliked ? (
                  <BiSolidDislike
                    className="hover:cursor-pointer text-[#A8C7FA]"
                    onClick={() => handleUnlike(i)}
                  />
                ) : (
                  <BiDislike
                    className="hover:cursor-pointer"
                    onClick={() => handleDislike(i)}
                  />
                )}
              </div>
            </div>
          ) : (
            // User messages
            <div className="whitespace-pre-wrap font-[font2] sm:text-[15px] text-sm font-extralight">
              {msg.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatInterface;
