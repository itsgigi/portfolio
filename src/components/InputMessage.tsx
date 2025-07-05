import { IoSend } from "react-icons/io5";
import { useState } from "react";
import type { Message } from "../utils/types";
import { useGetGeminiResponse } from "../hooks/useGetGeminiResponse";

interface InputMessageProps {
    messages: Message[];
    setMessages: (newMessages: Message[]) => void;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
  }
  

const InputMessage = ({ messages, setMessages, isLoading, setIsLoading }: InputMessageProps) => {
    const [input, setInput] = useState("");
    const { getGeminiResponse } = useGetGeminiResponse();

    const updateInput = (newText: string) => {
        setInput(newText);
      };
    
      async function handleSend() {
        if (!input.trim()) return;
    
        const userMsg: Message = { sender: "user", content: input };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);
    
        // Format for Gemini
        const geminiFormatted = [
          ...updatedMessages.map((m) => ({
            role: m.sender === "user" ? "user" as const : "assistant" as const,
            content: m.content,
          })),
        ];
    
        try {
          const reply = await getGeminiResponse(geminiFormatted);
          if (reply) {
            const aiReply: Message = { sender: "system", content: reply };
            setMessages([...updatedMessages, aiReply]);
          } else {
            setMessages([...updatedMessages, { sender: "system", content: "Oops! Error getting response." }]);
          }
        } catch (e) {
          setMessages([...updatedMessages, { sender: "system", content: "Oops! Error getting response. " + e }]);
        } finally {
          setIsLoading(false);
        }
    }
      
  return (
    <div className="virtual-keyboard-container">
        <div className="flex justify-center text-black">
            <input
            type="text"
            value={input}
            onChange={(e) => updateInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="bg-white rounded-full w-[85%] mx-2 p-1 px-3"
            />
            <button
            onClick={handleSend}
            className="bg-green-600 rounded-full p-2"
            disabled={isLoading}
            >
            <IoSend color="white" />
            </button>
        </div>
    </div>
  )
}

export default InputMessage
