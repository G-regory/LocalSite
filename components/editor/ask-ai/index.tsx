"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "react-use";
import { ArrowUp } from "lucide-react";
import { FaStopCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Settings } from "./settings";
import Loading from "@/components/loading";
import { isTheSameHtml } from "@/lib/compare-html-diff";
import { getDefaultProvider, getDefaultModel } from "@/lib/client-config";

interface AskAIProps {
  html: string;
  setHtml: (html: string) => void;
  onSuccess: (html: string, prompt: string) => void;
  onNewPrompt: (prompt: string) => void;
}

export function AskAI({ html, setHtml, onSuccess, onNewPrompt }: AskAIProps) {
  const [prompt, setPrompt] = useState("");
  const [isAiWorking, setisAiWorking] = useState(false);
  const [provider, setProvider] = useLocalStorage("provider", getDefaultProvider());
  const [model, setModel] = useLocalStorage("model", getDefaultModel());
  const [controller, setController] = useState<AbortController | null>(null);

  const callAi = async () => {
    if (isAiWorking || !prompt.trim()) return;
    
    setisAiWorking(true);
    const abortController = new AbortController();
    setController(abortController);

    try {
      onNewPrompt(prompt);
      
      const response = await fetch("/api/ask-ai-local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, provider, model, html: isTheSameHtml(html) ? "" : html }),
        signal: abortController.signal,
      });

      const textResponse = await response.text();

      if (!response.ok) {
        // Try to parse error from JSON, otherwise show raw text
        try {
            const errorData = JSON.parse(textResponse);
            throw new Error(errorData.error || "Unknown API error");
        } catch (parseError) {
            throw new Error(`API returned non-JSON error (${response.status}): ${textResponse.slice(0, 100)}...`);
        }
      }

      const data = JSON.parse(textResponse);
      if (data.ok && data.html) {
        setHtml(data.html);
        onSuccess(data.html, prompt);
        toast.success("AI responded successfully");
      } else {
        throw new Error(data.error || "AI response was not successful.");
      }

      setPrompt("");
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error(error.message);
        console.error("[callAi] Error:", error);
      }
    } finally {
      setisAiWorking(false);
      setController(null);
    }
  };

  const stopController = () => {
    if (controller) {
      controller.abort();
    }
  };

  return (
    <div className="px-3">
      <div className="relative bg-neutral-800 border border-neutral-700 rounded-2xl ring-[4px] focus-within:ring-neutral-500/30 focus-within:border-neutral-600 ring-transparent z-10 w-full group">
        <div className="w-full relative flex items-center justify-between">
          {isAiWorking && (
            <div className="absolute bg-neutral-800 rounded-lg bottom-0 left-4 w-[calc(100%-30px)] h-full z-10 flex items-center justify-between">
              <div className="flex items-center justify-start gap-2">
                <Loading overlay={false} className="!size-4" />
                <p className="text-neutral-400 text-sm">AI is working...</p>
              </div>
              <div
                className="text-xs text-neutral-400 px-1 py-0.5 rounded-md border border-neutral-600 flex items-center justify-center gap-1.5 bg-neutral-800 hover:brightness-110 transition-all duration-200 cursor-pointer"
                onClick={stopController}
              >
                <FaStopCircle />
                Stop
              </div>
            </div>
          )}
          <input
            type="text"
            disabled={isAiWorking}
            className="w-full bg-transparent text-sm outline-none text-white placeholder:text-neutral-400 p-4"
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) callAi();
            }}
          />
        </div>
        <div className="flex items-center justify-end gap-2 px-4 pb-3">
          <Settings
            provider={provider as string}
            model={model as string}
            onChange={setProvider}
            onModelChange={setModel}
          />
          <Button size="iconXs" disabled={isAiWorking || !prompt.trim()} onClick={callAi}>
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
