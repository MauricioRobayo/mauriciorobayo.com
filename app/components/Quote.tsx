"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface Quote {
  author: string;
  quote: string;
}
interface QuoteProps {
  quotes: Quote[];
}
export function Quote({ quotes }: QuoteProps) {
  const [activeQuote, setActiveQuote] = useState<Quote | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setActiveQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [quotes]);

  if (!activeQuote) return null;

  return (
    <div className="flex flex-col gap-4 items-center">
      <blockquote
        key={activeQuote.quote}
        cite={activeQuote.author}
        className="text-pretty animate-fade-in"
      >
        {activeQuote.quote}
      </blockquote>
      <button
        type="button"
        onClick={() => {
          setActiveQuote(quotes[Math.floor(Math.random() * quotes.length)]);
          setRotation((prev) => prev + 180);
        }}
        aria-label="Get a new quote"
      >
        <RefreshCw
          size={16}
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </button>
    </div>
  );
}
