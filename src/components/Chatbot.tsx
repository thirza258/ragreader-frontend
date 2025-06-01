import { useState } from "react";
import service from "../services/service";
import ReactMarkdown from "react-markdown";
import { ChatResponse } from "../interface";

function Chatbot() {
  const [messages, setMessages] = useState<{ text: string; user: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() !== "" && !chatLoading) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, user: "me" },
      ]);
      setInput("");
      setChatLoading(true);

      try {
        const response: ChatResponse = await service.generateChat(input);

        if (response.status !== 200) {
          throw new Error(response.message);
        }


        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data, user: "bot" },
        ]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, something went wrong.", user: "bot" },
        ]);
      } finally {
        setChatLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.user === "me" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block px-4 py-2 rounded ${
                msg.user === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {chatLoading && <p className="text-center text-gray-500">Loading...</p>}
      </div>
      <div className="flex-shrink-0 flex p-4 bg-white shadow-md">
        <input
          type="text"
          className="flex-grow border rounded px-4 py-2 mr-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !chatLoading ? sendMessage() : null
          }
          placeholder="Type your message here"
          disabled={chatLoading}
        />
        <button
          className={`px-4 py-2 rounded ${
            chatLoading ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
          onClick={sendMessage}
          disabled={chatLoading}
        >
          {chatLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
