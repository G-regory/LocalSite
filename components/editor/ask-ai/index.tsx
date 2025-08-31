"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useMemo } from "react";
import classNames from "classnames";
import { toast } from "sonner";
import { useLocalStorage, useUpdateEffect } from "react-use";
import { ArrowUp, ChevronDown, Crosshair } from "lucide-react";
import { FaStopCircle } from "react-icons/fa";

import ProModal from "@/components/pro-modal";
import { Button } from "@/components/ui/button";
import { MODELS } from "@/lib/providers";
import { HtmlHistory } from "@/types";
import { InviteFriends } from "@/components/invite-friends";
import { Settings } from "@/components/editor/ask-ai/settings";
import { LoginModal } from "@/components/login-modal";
import { ReImagine } from "@/components/editor/ask-ai/re-imagine";
import Loading from "@/components/loading";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { SelectedHtmlElement } from "./selected-html-element";
import { FollowUpTooltip } from "./follow-up-tooltip";
import { isTheSameHtml } from "@/lib/compare-html-diff";
import { getApiEndpoint, getDefaultProvider, getDefaultModel } from "@/lib/client-config";

export function AskAI({
  html,
  setHtml,
  onScrollToBottom,
  isAiWorking,
  setisAiWorking,
  isEditableModeEnabled = false,
  selectedElement,
  setSelectedElement,
  setIsEditableModeEnabled,
  onNewPrompt,
  onSuccess,
}: {
  html: string;
  setHtml: (html: string) => void;
  onScrollToBottom: () => void;
  isAiWorking: boolean;
  onNewPrompt: (prompt: string) => void;
  htmlHistory?: HtmlHistory[];
  setisAiWorking: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: (h: string, p: string, n?: number[][]) => void;
  isEditableModeEnabled: boolean;
  setIsEditableModeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  selectedElement?: HTMLElement | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}) {
  const refThink = useRef<HTMLDivElement | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [hasAsked, setHasAsked] = useState(false);
  const [, setPreviousPrompt] = useState("");
  const [provider, setProvider] = useLocalStorage("provider", getDefaultProvider());
  const [model, setModel] = useLocalStorage("model", getDefaultModel());
  const [openProvider, setOpenProvider] = useState(false);
  const [providerError, setProviderError] = useState("");
  const [openProModal, setOpenProModal] = useState(false);
  const [think, setThink] = useState<string | undefined>(undefined);
  const [openThink, setOpenThink] = useState(false);
  const [isThinking, setIsThinking] = useState(true);
  const [controller, setController] = useState<AbortController | null>(null);
  const [isFollowUp, setIsFollowUp] = useState(true);

  const selectedModel = useMemo(() => {
    return MODELS.find((m: { value: string }) => m.value === model);
  }, [model]);

  const callAi = async (redesignMarkdown?: string) => {
    if (isAiWorking) return;
    if (!redesignMarkdown && !prompt.trim()) return;
    setisAiWorking(true);
    setProviderError("");
    setThink("");
    setOpenThink(false);
    setIsThinking(true);

    let contentResponse = "";
    let lastRenderTime = 0;

    const abortController = new AbortController();
    setController(abortController);
    try {
      onNewPrompt(prompt);
      
      const request = await fetch(getApiEndpoint("/api/ask-ai"), {
        method: "POST",
        body: JSON.stringify({
          prompt,
          provider,
          model,
          html: isTheSameHtml(html) ? "" : html,
          redesignMarkdown,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": window.location.hostname,
        },
        signal: abortController.signal,
      });

      if (request && request.body) {
        const reader = request.body.getReader();
        const decoder = new TextDecoder("utf-8");
        
        const read = async () => {
          const { done, value } = await reader.read();
          if (done) {
            toast.success("AI responded successfully");
            setPreviousPrompt(prompt);
            setPrompt("");
            setisAiWorking(false);
            setHasAsked(true);
            if (audio.current) {
              try {
                await audio.current.play();
              } catch (e) {
                // Ignore play() interrupt error
              }
            }
            onSuccess(contentResponse, prompt);
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          contentResponse += chunk;
          
          setIsThinking(false);
          const now = Date.now();
          if (now - lastRenderTime > 100) { // Render more frequently
            setHtml(contentResponse);
            lastRenderTime = now;
          }
          
          read();
        };

        read();
      } else {
        throw new Error("The request body is empty.");
      }
    } catch (error: any) {
      setisAiWorking(false);
      if (error.name !== 'AbortError') {
        toast.error(error.message);
      }
      if (error.openLogin) {
        setOpen(true);
      }
    }
  };

  const stopController = () => {
    if (controller) {
      controller.abort();
      setController(null);
      setisAiWorking(false);
      setThink("");
      setOpenThink(false);
      setIsThinking(false);
    }
  };

  useUpdateEffect(() => {
    if (refThink.current) {
      refThink.current.scrollTop = refThink.current.scrollHeight;
    }
  }, [think]);

  useUpdateEffect(() => {
    if (!isThinking) {
      setOpenThink(false);
    }
  }, [isThinking]);

  const isSameHtml = useMemo(() => {
    return isTheSameHtml(html);
  }, [html]);

  return (
    <div className="px-3">
      <div className="relative bg-neutral-800 border border-neutral-700 rounded-2xl ring-[4px] focus-within:ring-neutral-500/30 focus-within:border-neutral-600 ring-transparent z-10 w-full group">
        {think && (
          <div className="w-full border-b border-neutral-700 relative overflow-hidden">
            <header
              className="flex items-center justify-between px-5 py-2.5 group hover:bg-neutral-600/20 transition-colors duration-200 cursor-pointer"
              onClick={() => {
                setOpenThink(!openThink);
              }}
            >
              <p className="text-sm font-medium text-neutral-300 group-hover:text-neutral-200 transition-colors duration-200">
                {isThinking ? "LocalSite is thinking..." : "LocalSite's plan"}
              </p>
              <ChevronDown
                className={classNames(
                  "size-4 text-neutral-400 group-hover:text-neutral-300 transition-all duration-200",
                  {
                    "rotate-180": openThink,
                  }
                )}
              />
            </header>
            <main
              ref={refThink}
              className={classNames(
                "overflow-y-auto transition-all duration-200 ease-in-out",
                {
                  "max-h-[0px]": !openThink,
                  "min-h-[250px] max-h-[250px] border-t border-neutral-700":
                    openThink,
                }
              )}
            >
              <p className="text-[13px] text-neutral-400 whitespace-pre-line px-5 pb-4 pt-3">
                {think}
              </p>
            </main>
          </div>
        )}
        {selectedElement && (
          <div className="px-4 pt-3">
            <SelectedHtmlElement
              element={selectedElement}
              isAiWorking={isAiWorking}
              onDelete={() => setSelectedElement(null)}
            />
          </div>
        )}
        <div className="w-full relative flex items-center justify-between">
          {isAiWorking && (
            <div className="absolute bg-neutral-800 rounded-lg bottom-0 left-4 w-[calc(100%-30px)] h-full z-1 flex items-center justify-between max-lg:text-sm">
              <div className="flex items-center justify-start gap-2">
                <Loading overlay={false} className="!size-4" />
                <p className="text-neutral-400 text-sm">
                  AI is {isThinking ? "thinking" : "coding"}...{" "}
                </p>
              </div>
              <div
                className="text-xs text-neutral-400 px-1 py-0.5 rounded-md border border-neutral-600 flex items-center justify-center gap-1.5 bg-neutral-800 hover:brightness-110 transition-all duration-200 cursor-pointer"
                onClick={stopController}
              >
                <FaStopCircle />
                Stop generation
              </div>
            </div>
          )}
          <input
            type="text"
            disabled={isAiWorking}
            className={classNames(
              "w-full bg-transparent text-sm outline-none text-white placeholder:text-neutral-400 p-4",
              {
                "!pt-2.5": selectedElement && !isAiWorking,
              }
            )}
            placeholder={
              selectedElement
                ? `Ask LocalSite about ${selectedElement.tagName.toLowerCase()}...`
                : hasAsked
                ? "Ask LocalSite for edits"
                : "Ask LocalSite anything..."
            }
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                callAi();
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-2 px-4 pb-3">
          <div className="flex-1 flex items-center justify-start gap-1.5">
            <ReImagine onRedesign={(md) => callAi(md)} />
            {!isSameHtml && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="xs"
                    variant={isEditableModeEnabled ? "default" : "outline"}
                    onClick={() => {
                      setIsEditableModeEnabled?.(!isEditableModeEnabled);
                    }}
                    className={classNames("h-[28px]", {
                      "!text-neutral-400 hover:!text-neutral-200 !border-neutral-600 !hover:!border-neutral-500":
                        !isEditableModeEnabled,
                    })}
                  >
                    <Crosshair className="size-4" />
                    Edit
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  align="start"
                  className="bg-neutral-950 text-xs text-neutral-200 py-1 px-2 rounded-md -translate-y-0.5"
                >
                  Select an element on the page to ask LocalSite edit it
                  directly.
                </TooltipContent>
              </Tooltip>
            )}
            <InviteFriends />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Settings
              provider={provider as string}
              model={model as string}
              onChange={setProvider}
              onModelChange={setModel}
              open={openProvider}
              error={providerError}
              isFollowUp={!isSameHtml && isFollowUp}
              onClose={() => setOpenProvider(false)}
            />
            <Button
              size="iconXs"
              disabled={isAiWorking || !prompt.trim()}
              onClick={() => callAi()}
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>
        <LoginModal open={open} onClose={() => setOpen(false)} html={html} />
        <ProModal
          html={html}
          open={openProModal}
          onClose={() => setOpenProModal(false)}
        />
        {!isSameHtml && (
          <div className="absolute top-0 right-0 -translate-y-[calc(100%+8px)] select-none text-xs text-neutral-400 flex items-center justify-center gap-2 bg-neutral-800 border border-neutral-700 rounded-md p-1 pr-2.5">
            <label
              htmlFor="diff-patch-checkbox"
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <Checkbox
                id="diff-patch-checkbox"
                checked={isFollowUp}
                onCheckedChange={(e) => {
                  if (e === true && !isSameHtml && selectedModel?.isThinker) {
                    setModel(MODELS[0].value);
                  }
                  setIsFollowUp(e === true);
                }}
              />
              Diff-Patch Update
            </label>
            <FollowUpTooltip />
          </div>
        )}
      </div>
      <audio ref={audio} id="audio" className="hidden">
        <source src="/success.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
