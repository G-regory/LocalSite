// hooks/useApiKey.ts
"use client";
import { useLocalStorage } from "react-use";

export const useApiKey = () => {
  const [apiKey, setApiKey] = useLocalStorage<string | null>(
    "openrouter_api_key",
    null
  );
  return { apiKey, setApiKey };
};
