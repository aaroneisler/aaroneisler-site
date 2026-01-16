"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm an AI trained on Aaron Eisler's professional background. Ask me anything about his experience, skills, leadership style, or fit for specific roles.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What kind of leadership style does Aaron have?",
    "Tell me about his AI and automation experience",
    "What's his biggest achievement?",
    "Is he a good fit for a CTO role?",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden animate-scale-in"
        style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)'
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{ padding: 'var(--space-lg)', borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <h2
              className="font-semibold"
              style={{ fontSize: 'var(--text-lg)' }}
            >
              Ask AI about Aaron
            </h2>
            <p className="text-sm" style={{ color: 'var(--secondary)' }}>
              Get detailed answers about experience, skills, and fit
            </p>
          </div>
          <button
            onClick={onClose}
            className="transition-all hover:scale-110"
            style={{
              padding: 'var(--space-sm)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--state-hover)'
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto space-y-4"
          style={{ padding: 'var(--space-lg)' }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className="max-w-[80%]"
                style={{
                  padding: 'var(--space-md)',
                  borderRadius: message.role === "user"
                    ? 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)'
                    : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
                  background: message.role === "user" ? 'var(--primary)' : 'var(--card)',
                  color: message.role === "user" ? 'var(--on-primary)' : 'inherit',
                  border: message.role === "user" ? 'none' : '1px solid var(--border)'
                }}
              >
                <p className="text-sm whitespace-pre-wrap" style={{ lineHeight: 'var(--phi)' }}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div
                style={{
                  padding: 'var(--space-md)',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)'
                }}
              >
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: 'var(--secondary)' }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: 'var(--secondary)', animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: 'var(--secondary)', animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div style={{ padding: '0 var(--space-lg) var(--space-sm)' }}>
            <p
              className="text-xs"
              style={{ color: 'var(--secondary)', marginBottom: 'var(--space-sm)' }}
            >
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-xs transition-all hover:scale-[1.02]"
                  style={{
                    padding: '0.5em 1em',
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          style={{ padding: 'var(--space-lg)', borderTop: '1px solid var(--border)' }}
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Aaron's experience, skills, or fit..."
              className="flex-1 focus:outline-none transition-colors"
              style={{
                padding: '0.618em 1em',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)'
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                padding: '0.618em 1em',
                background: 'var(--primary)',
                color: 'var(--on-primary)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
