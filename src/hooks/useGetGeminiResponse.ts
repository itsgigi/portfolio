import { useState, useCallback } from 'react';

interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiResponse {
  message: string;
}

export const useGetGeminiResponse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getGeminiResponse = useCallback(async (geminiMessages: GeminiMessage[]): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch("https://my-portfolio-be-nine.vercel.app/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: geminiMessages }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data: GeminiResponse = await res.json();
      return data.message;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getGeminiResponse,
    isLoading,
    error,
  };
};