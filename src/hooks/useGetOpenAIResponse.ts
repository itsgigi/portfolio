import { useState, useCallback } from 'react';

interface OpenAIMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  message: string;
}

export const useGetOpenAIResponse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOpenAIResponse = useCallback(async (messages: OpenAIMessage[]): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("https://my-portfolio-be-nine.vercel.app/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: OpenAIResponse = await res.json();
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
    getOpenAIResponse,
    isLoading,
    error,
  };
};
