/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback } from "react";
import { IoSend } from "react-icons/io5";
import type { Message } from "../utils/types";

interface VirtualKeyboardProps {
  messages: Message[];
  setMessages: (newMessages: Message[]) => void;
}

export default function VirtualKeyboard({ messages, setMessages }: VirtualKeyboardProps) {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["⇧", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
    ["123", "🌐", "space", "return"]
  ];

  const [text, setText] = useState(""); // text from virtual keyboard
  const [shift, setShift] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use a single source of truth: combined text input
  const [input, setInput] = useState("");

  const updateInput = (newText: string) => {
    setText(newText);
    setInput(newText);
  };

  async function handleSend() {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setText("");
    setIsLoading(true);

    // Format for Gemini
    const geminiFormatted = [
      ...updatedMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    ];

    try {
      const reply = await getGeminiResponse(geminiFormatted);
      const aiReply: Message = { sender: "system", content: reply };
      setMessages([...updatedMessages, aiReply]);
    } catch (e) {
      setMessages([...updatedMessages, { sender: "system", content: "Oops! Error getting response. " + e }]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleClick = (key: string) => {
    if (key === "⌫") {
      updateInput(text.slice(0, -1));
    } else if (key === "⇧") {
      setShift(!shift);
    } else if (key === "space") {
      updateInput(text + " ");
    } else if (key === "return") {
      handleSend();
    } else if (key.length === 1) {
      const char = shift ? key.toUpperCase() : key.toLowerCase();
      updateInput(text + char);
      if (shift) setShift(false);
    }
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      // Let input field handle this natively
      return;
    } else if (e.key === "Enter") {
      handleSend();
    }
  }, []);  

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);  

  async function getGeminiResponse(geminiMessages: any) {
    const res = await fetch("http://localhost:3001/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: geminiMessages }),
    });
    const data = await res.json();
    return data.message;
  }

  // When were you born?
  // Where do you work?

  return (
    <div className="virtual-keyboard-container">
      {/* Input bar */}
      <div className="flex justify-center text-black">
        <input
          type="text"
          value={input}
          onChange={(e) => updateInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything..."
          className="bg-white rounded-full w-[85%] mx-2 p-1"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 rounded-full p-2"
          disabled={isLoading}
        >
          <IoSend color="white" />
        </button>
      </div>

      {/* Virtual Keyboard */}
      <div className="virtual-keyboard text-black">
        {keys.map((row, i) => (
          <div key={i} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                className={`key ${key === "return" ? "return-key" : ""} ${key === "space" ? "space-key" : ""}`}
                onClick={() => handleClick(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
