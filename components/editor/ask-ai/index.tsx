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
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [hasAsked, setHasAsked] = useState(false);
  const [provider, setProvider] = useLocalStorage("provider", getDefaultProvider());
  const [model, setModel] = useLocalStorage("model", getDefaultModel());
  const [openProvider, setOpenProvider] = useState(false);
  const [providerError, setProviderError] = useState("");
  const [openProModal, setOpenProModal] = useState(false);
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

    const abortController = new AbortController();
    setController(abortController);
    try {
      onNewPrompt(prompt);
      
      const request = await fetch(getApiEndpoint("/api/ask-ai-local"), { // Use ask-ai-local
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
        },
        signal: abortController.signal,
      });

      const res = await request.json();

      if (!res.ok) {
        throw new Error(res.error || "An unknown error occurred from the API.");
      }

      toast.success("AI responded successfully");
      if (res.html) {
        setHtml(res.html);
        onSuccess(res.html, prompt);
      }
      setPrompt("");
      setHasAsked(true);

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        toast.error(error.message);
      }
    } finally {
      setisAiWorking(false);
    }
  };

  const stopController = () => {
    if (controller) {
      controller.abort();
      setController(null);
      setisAiWorking(false);
    }
  };

  const isSameHtml = useMemo(() => {
    return isTheSameHtml(html);
  }, [html]);

  return (
    <div className="px-3">
      <div className="relative bg-neutral-800 border border-neutral-700 rounded-2xl ring-[4px] focus-within:ring-neutral-500/30 focus-within:border-neutral-600 ring-transparent z-10 w-full group">
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
                  AI is working...
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
    </div>
  );
}
