"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { sections } from "@/lib/translations";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const TRIGGER_MARKER = "[TRIGGER_MATRIX]";


const LOADING_DOTS_MESSAGE: Message = {
  id: "loading",
  role: "assistant",
  content: "...",
  pending: true,
};

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

// ── Message Bubble ─────────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const isPending = message.pending;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(
        "flex items-start gap-2.5",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar icon */}
      <div
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-blue-600 text-white"
            : "bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700"
        )}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : (
          <Bot className="h-3.5 w-3.5" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-blue-600 text-white"
            : "rounded-tl-sm bg-zinc-800/80 text-zinc-100 ring-1 ring-zinc-700/60",
          !isUser && "font-[family-name:var(--font-mono)] text-[0.8rem]"
        )}
      >
        {isPending ? (
          <LoadingDots />
        ) : (
          <span className="whitespace-pre-wrap">{message.content}</span>
        )}
      </div>
    </motion.div>
  );
}

// ── Loading dots ───────────────────────────────────────────────────────────────

function LoadingDots() {
  return (
    <span className="flex items-center gap-1 py-0.5" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-1.5 w-1.5 rounded-full bg-zinc-400"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function RagChat() {
  const { t, lang } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([{
    id: "init",
    role: "assistant",
    content: t(sections.chatGreeting.en, sections.chatGreeting.es),
  }]);

  // Update the initial greeting when language changes
  useEffect(() => {
    const greeting = t(sections.chatGreeting.en, sections.chatGreeting.es);
    setMessages((prev) => prev.map((m) => m.id === "init" ? { ...m, content: greeting } : m));
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat container (NOT the page)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: text,
    };

    // Build history from current messages (excluding the initial greeting and pending)
    const history = messages
      .filter((m) => m.id !== "init" && !m.pending)
      .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.content }));

    setInput("");
    setMessages((prev) => [...prev, userMessage, LOADING_DOTS_MESSAGE]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, lang }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const assistantId = generateId();

      // Replace loading dots with empty assistant message to stream into
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "loading"),
        { id: assistantId, role: "assistant", content: "" },
      ]);

      // Stream chunks
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        // Update the assistant message with accumulated text (hide marker while streaming)
        const displayText = accumulated.replace(TRIGGER_MARKER, "").trimEnd();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: displayText } : m
          )
        );
      }

      // Final flush: check for trigger
      if (accumulated.includes(TRIGGER_MARKER)) {
        const cleanText = accumulated.replace(TRIGGER_MARKER, "").trimEnd();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: cleanText } : m
          )
        );
        window.dispatchEvent(new CustomEvent("triggerMatrix"));
      }
    } catch (err) {
      console.error("[RagChat] Stream error:", err);
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "loading"),
        {
          id: generateId(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section
      id="chat"
      className="w-full py-20 px-4 flex flex-col items-center scroll-mt-16"
      aria-label="AI chat section"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t(sections.chatTitle.en, sections.chatTitle.es)}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {t(sections.chatSubtitle.en, sections.chatSubtitle.es)}
        </p>
      </motion.div>

      {/* Chat card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
        className="w-full max-w-[700px]"
      >
        <Card className="flex flex-col gap-0 overflow-hidden">
          {/* Messages area */}
          <CardContent className="p-0">
            <div
              ref={scrollContainerRef}
              className="h-[400px] overflow-y-auto px-4 py-4 scroll-smooth"
            >
              <div className="flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>

          {/* Input row */}
          <div className="flex items-center gap-2 border-t border-border bg-muted/30 px-4 py-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={t(sections.chatPlaceholder.en, sections.chatPlaceholder.es)}
              aria-label="Chat input"
              className={cn(
                "flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none",
                "placeholder:text-muted-foreground/60",
                "focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-[border-color,box-shadow] duration-150"
              )}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                "bg-blue-600 text-white",
                "hover:bg-blue-500 active:scale-95",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
                "transition-all duration-150"
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
