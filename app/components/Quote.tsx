"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Quote {
  author: string;
  quote: string;
}
interface QuoteProps {
  quotes: Quote[];
}
export function Quote({ quotes }: QuoteProps) {
  const shuffledQuotes = useMemo(() => shuffleQuotes(quotes), [quotes]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (shuffledQuotes.length === 0) {
      return;
    }

    setQuoteIndex((prev) => prev % shuffledQuotes.length);
  }, [shuffledQuotes.length]);

  const activeQuote = shuffledQuotes[quoteIndex];
  if (!activeQuote) return null;

  return (
    <div className="flex flex-col gap-4 items-center">
      <blockquote
        key={`${activeQuote.quote}-${quoteIndex}`}
        cite={activeQuote.author}
        className="text-pretty animate-fade-in font-serif italic"
      >
        {activeQuote.quote}
      </blockquote>
      <p className="text-sm font-light text-zinc-600 dark:text-zinc-400">
        ~ {activeQuote.author} ~
      </p>
      <button
        type="button"
        onClick={() => {
          if (shuffledQuotes.length > 0) {
            setQuoteIndex((prev) => (prev + 1) % shuffledQuotes.length);
          }
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

function shuffleQuotes(quotes: Quote[]) {
  const shuffledQuotes = [...quotes];

  for (
    let currentIndex = shuffledQuotes.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledQuotes[currentIndex], shuffledQuotes[randomIndex]] = [
      shuffledQuotes[randomIndex],
      shuffledQuotes[currentIndex],
    ];
  }

  return shuffledQuotes;
}
