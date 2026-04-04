"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, RefreshCw } from "lucide-react";
import { SUGGESTED_QUESTIONS, DEMO_RESPONSES } from "@/lib/chatContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "👋 Hi! I'm Abdullah's AI assistant. I can answer any questions about his background, projects, skills, and experience. What would you like to know?",
};

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "4px", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-primary)" }}
        />
      ))}
    </div>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputLocal, setInputLocal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => document.getElementById("chat-input-ext")?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputLocal("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg]
            .filter((m) => m.id !== "welcome")
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I didn't quite catch that. Could you try again?",
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Oops! My backend seems to be throwing an error. Please try again later.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputLocal);
  };

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInputLocal("");
  };

  const handleSuggestedClick = (q: string) => {
    sendMessage(q);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        id="chat-widget-btn"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 200,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "var(--gradient-accent)",
          border: "none",
          cursor: "pointer",
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-accent)",
          color: "white",
        }}
        aria-label="Open AI chat"
      >
        {/* Pulse ring */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "var(--gradient-accent)",
            opacity: 0.4,
          }}
          animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Bot size={26} />
        {/* Sparkle badge */}
        <div style={{
          position: "absolute", top: "-2px", right: "-2px",
          width: "18px", height: "18px",
          borderRadius: "50%",
          background: "#f59e0b",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "2px solid var(--bg-primary)",
        }}>
          <Sparkles size={9} color="white" />
        </div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="chat-panel"
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 200,
              width: "min(380px, calc(100vw - 2rem))",
              height: "min(560px, calc(100vh - 6rem))",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid var(--border-default)",
              background: "var(--gradient-accent)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1.5px solid rgba(255,255,255,0.3)",
                flexShrink: 0,
              }}>
                <Bot size={18} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "white", lineHeight: 1.2 }}>
                  Abdullah&apos;s AI
                </p>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)" }}>
                  Ask me anything about his work
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button onClick={resetChat} aria-label="Reset chat"
                  style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px",
                    padding: "0.4rem", color: "white", cursor: "pointer", display: "flex" }}>
                  <RefreshCw size={14} />
                </button>
                <button onClick={() => setIsOpen(false)} aria-label="Close chat"
                  style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px",
                    padding: "0.4rem", color: "white", cursor: "pointer", display: "flex" }}>
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    className={msg.role === "user" ? "chat-message-user" : "chat-message-ai"}
                    style={{
                      maxWidth: "82%",
                      padding: "0.65rem 0.9rem",
                      fontSize: "0.85rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div style={{ display: "flex" }}>
                  <div className="chat-message-ai" style={{ padding: "0.65rem 0.9rem" }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div style={{ padding: "0 1rem 0.75rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestedClick(q)}
                    style={{
                      fontSize: "0.72rem", fontWeight: 500,
                      padding: "0.3rem 0.7rem",
                      borderRadius: "999px",
                      background: "var(--accent-subtle)",
                      border: "1px solid var(--accent-light)",
                      color: "var(--accent-primary)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleManualSubmit}
              style={{
                padding: "0.75rem 1rem",
                borderTop: "1px solid var(--border-default)",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <input
                id="chat-input-ext"
                ref={inputRef}
                type="text"
                value={inputLocal}
                onChange={(e) => setInputLocal(e.target.value)}
                placeholder="Ask about my experience..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "0.6rem 0.9rem",
                  borderRadius: "10px",
                  border: "1.5px solid var(--border-default)",
                  background: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  fontSize: "0.85rem",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--accent-primary)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "var(--border-default)"; }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!inputLocal.trim() || isLoading}
                style={{
                  width: "40px", height: "40px",
                  borderRadius: "10px",
                  background: inputLocal.trim() && !isLoading ? "var(--gradient-accent)" : "var(--bg-tertiary)",
                  border: "none",
                  cursor: inputLocal.trim() && !isLoading ? "pointer" : "not-allowed",
                  color: inputLocal.trim() && !isLoading ? "white" : "var(--text-muted)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
