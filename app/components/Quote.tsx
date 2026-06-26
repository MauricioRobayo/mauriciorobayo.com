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

    setQuoteIndex(0);
  }, [shuffledQuotes]);

  const activeQuote = shuffledQuotes[quoteIndex];
  if (!activeQuote) return null;

  return (
    <div className="flex flex-col gap-4 items-center">
      <div key={quoteIndex} className="flex flex-col gap-2 animate-fade-in">
        <blockquote
          cite={activeQuote.quote}
          className="text-pretty font-serif font-light italic"
        >
          {activeQuote.quote}
        </blockquote>
        {activeQuote.author && (
          <p className="text-sm font-light text-gray-500 dark:text-gray-400/85 font-serif before:content-['~'] after:inline-block after:scale-x-[-1] before:mr-1 after:content-['~'] after:ml-1">
            {activeQuote.author}
          </p>
        )}
      </div>
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
