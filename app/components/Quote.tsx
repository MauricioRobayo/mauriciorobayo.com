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
  const [quoteIndex, setQuoteIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (shuffledQuotes.length === 0) {
      return;
    }

    setQuoteIndex(0);
  }, [shuffledQuotes]);

  if (quoteIndex === null) return null;
  const activeQuote = shuffledQuotes[quoteIndex];
  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        key={quoteIndex}
        className="text-balance font-serif font-light flex flex-col gap-2 animate-fade-in"
      >
        <blockquote cite={activeQuote.quote} className="italic">
          {activeQuote.quote}
        </blockquote>
        {activeQuote.author && (
          <p className="text-sm text-gray-500 dark:text-gray-400/85 font-serif before:content-['~'] after:inline-block after:scale-x-[-1] before:mr-1 after:content-['~'] after:ml-1">
            {activeQuote.author}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          if (shuffledQuotes.length > 0) {
            setQuoteIndex((prev) => ((prev ?? 0) + 1) % shuffledQuotes.length);
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
