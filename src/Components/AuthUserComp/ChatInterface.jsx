import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown (tables, strikethrough, task lists)
import rehypeHighlight from "rehype-highlight";
import SvgComponent from "../../utils/SvgComponent";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

const ChatInterface = ({ messages, messagesEndRef }) => {
  console.log(messages);
  return (
    <div className=" flex flex-col ">
      {messages?.map((msg, i) => (
        <div
          key={i}
          ref={messagesEndRef}
          // The main message bubble container
          className={`text-white py-2 my-5 rounded-b-3xl  ${
            msg.role === "user"
              ? "bg-[#333537] max-w-[50%] self-end rounded-l-3xl px-6" // User message styles (right aligned)
              : "rounded-r-3xl self-start   px-3" // <--- AI message styles: Re-added max-w, further reduced px
          }`}
        >
          {msg.role === "assistant" ? (
            // Wrapper for Markdown content with prose styles
            <div className="flex flex-col">
              <div className=" flex gap-2 ">
                <div className=" min-w-10">
                  <SvgComponent />
                </div>
                <div className="prose prose-invert max-w-none font-[font2] text-[15px] font-extralight">
                  <ReactMarkdown
                    children={msg.content}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]} // Apply rehypeHighlight for code block processing
                    components={{
                      // Custom components (you can keep these or simplify further if needed)
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-3xl font-bold mt-6 mb-4"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-2xl font-semibold mt-4 mb-2"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-xl font-medium mt-3 mb-1"
                          {...props}
                        />
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
                          <code
                            className=" text-white px-1 py-0.5 rounded-3xl"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-[#282A2C] p-4 rounded overflow-x-auto my-2">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        ),
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2 px-10">
                <BiLike /> <BiDislike />{" "}
              </div>
            </div>
          ) : (
            // User messages
            <div className="whitespace-pre-wrap font-[font2]">
              {msg.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatInterface;
