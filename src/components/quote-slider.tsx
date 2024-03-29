import { useState } from "react";
import { Quote, useQuotes } from "@/hooks/use-quote";
import { Loader } from "@/components/loader";
import { RefreshIcon } from "@/components/refresh-icon";
import { Blockquote } from "@/components/blockquote";

const defaultQuote: Quote = {
  quote:
    "Mastery is not a function of genius or talent. It is a function of time and intense focus applied to a particular field of knowledge.",
  author: "Robert Greene",
};

export function QuoteSlider() {
  const { status, quotes } = useQuotes();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const refreshQuote = () => {
    if (quotes) {
      setCurrentQuoteIndex(
        (currentQuoteIndex) => (currentQuoteIndex + 1) % quotes.length
      );
    }
  };

  if (status === "idle" || status === "loading") {
    return (
      <div className="sm:text-center py-4 sm:py-8 m-auto grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="sm:text-center py-4 sm:py-8 m-auto grid place-items-center">
        <Blockquote quote={defaultQuote.quote} author={defaultQuote.author} />
      </div>
    );
  }

  return (
    <div className="text-center py-2 sm:py-8 m-auto grid place-items-center">
      <Blockquote
        quote={quotes[currentQuoteIndex].quote}
        author={quotes[currentQuoteIndex].author}
      />
      <button
        className="justify-self-center"
        type="button"
        onClick={refreshQuote}
      >
        <RefreshIcon />
      </button>
    </div>
  );
}
