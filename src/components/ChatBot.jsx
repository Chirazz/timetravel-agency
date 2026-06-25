import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Clock } from "lucide-react";
import {
  getBotResponse,
  welcomeMessage,
  quickReplies,
} from "../data/chatbotKnowledge.js";

// Formats a Date as a short HH:MM timestamp.
const formatTime = (date) =>
  date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

// Creates a message object for the conversation history.
let messageId = 0;
const createMessage = (from, text) => ({
  id: ++messageId,
  from, // "bot" | "user"
  text,
  time: new Date(),
});

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  // The welcome message is present from the start so it shows automatically
  // the first time the visitor opens the chat.
  const [messages, setMessages] = useState(() => [
    createMessage("bot", welcomeMessage),
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeout = useRef(null);

  // Auto-scroll to the latest message whenever the history or typing changes.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Focus the input when the window opens.
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Clear any pending typing timer on unmount.
  useEffect(() => () => clearTimeout(typingTimeout.current), []);

  // Show only the quick replies before the visitor has asked anything.
  const showQuickReplies = useMemo(
    () => messages.length <= 1 && !isTyping,
    [messages.length, isTyping],
  );

  // Sends a message and simulates the assistant's reply locally.
  const sendMessage = (rawText) => {
    const text = rawText.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, createMessage("user", text)]);
    setInput("");
    setIsTyping(true);

    // Simulate a natural "thinking" delay before answering.
    typingTimeout.current = setTimeout(() => {
      const reply = getBotResponse(text);
      setMessages((prev) => [...prev, createMessage("bot", reply)]);
      setIsTyping(false);
    }, 900);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating circular launcher button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gold text-noir shadow-lg shadow-gold/40 transition-shadow hover:shadow-xl hover:shadow-gold/60 sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Assistant TimeTravel"
            className="fixed bottom-24 right-4 z-[60] flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-gold/30 bg-noir-soft shadow-2xl shadow-black/60 sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gold/15 bg-noir/80 px-4 py-3 backdrop-blur">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Clock size={20} strokeWidth={1.5} />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-noir-soft bg-emerald-400" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-base font-semibold text-offwhite">
                  Chronos
                </p>
                <p className="text-xs text-gold/80">Assistant de voyage temporel</p>
              </div>
            </div>

            {/* Messages history */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-grid px-4 py-4"
            >
              {messages.map((message) => (
                <Bubble key={message.id} message={message} />
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gold/20 bg-noir px-3 py-2.5">
                      <Dot delay={0} />
                      <Dot delay={0.15} />
                      <Dot delay={0.3} />
                    </div>
                    <span className="text-[11px] text-offwhite/40">
                      Assistant en train d'écrire…
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick replies */}
              {showQuickReplies && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => sendMessage(reply)}
                      className="rounded-full border border-gold/40 px-3 py-1.5 text-xs text-gold transition-colors hover:bg-gold hover:text-noir"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-gold/15 bg-noir/80 px-3 py-3 backdrop-blur"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message…"
                aria-label="Votre message"
                className="flex-1 rounded-full border border-white/10 bg-noir px-4 py-2.5 text-sm text-offwhite placeholder:text-offwhite/40 focus:border-gold/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Envoyer"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-noir transition-all hover:shadow-lg hover:shadow-gold/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// A single chat bubble with its timestamp.
function Bubble({ message }) {
  const isBot = message.from === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}
    >
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isBot
            ? "rounded-bl-sm border border-gold/20 bg-noir text-offwhite/90"
            : "rounded-br-sm bg-gold text-noir"
        }`}
      >
        {message.text}
      </div>
      <span className="mt-1 px-1 text-[10px] text-offwhite/35">
        {formatTime(message.time)}
      </span>
    </motion.div>
  );
}

// Animated dot for the "typing" indicator.
function Dot({ delay }) {
  return (
    <motion.span
      className="block h-1.5 w-1.5 rounded-full bg-gold"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, delay }}
    />
  );
}
