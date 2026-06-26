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
    setActiveQuote(getRandomQuote(quotes));
  }, [quotes]);

  if (!activeQuote) return null;

  return (
    <div className="flex flex-col gap-4 items-center">
      <blockquote
        key={activeQuote.quote}
        cite={activeQuote.author}
        className="text-pretty animate-fade-in italic"
      >
        {activeQuote.quote}
      </blockquote>
      <p className="text-sm font-light text-zinc-600 dark:text-zinc-400">
        ~ {activeQuote.author}
      </p>
      <button
        type="button"
        onClick={() => {
          setActiveQuote(getRandomQuote(quotes, activeQuote.quote));
          setRotation((prev) => prev + 180);
        }}
        aria-label="Get a new quote"
      >
        <RefreshCw
          size={16}
          className="transition-transform duration-300 ease-in-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </button>
    </div>
  );
}

function getRandomQuote(quotes: Quote[], currentQuote?: string) {
  if (quotes.length <= 1) {
    return quotes[0];
  }

  const candidateQuotes = quotes.filter(
    (quote) => quote.quote !== currentQuote,
  );
  const sourceQuotes = candidateQuotes.length > 0 ? candidateQuotes : quotes;
  return sourceQuotes[Math.floor(Math.random() * sourceQuotes.length)];
}
