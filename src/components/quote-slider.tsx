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

  const refreshQuote = () => {
    if (!quotes) {
      return;
    }
    setCurrentQuoteIndex(
      (currentQuoteIndex) => (currentQuoteIndex + 1) % quotes.length
    );
  };

  return (
    <div className="sm:text-center py-2 sm:py-8 m-auto grid sm:place-items-center">
      <Blockquote
        quote={quotes[currentQuoteIndex].quote}
        author={quotes[currentQuoteIndex].author}
      />
      <button
        className="justify-self-start sm:justify-self-center"
        type="button"
        onClick={refreshQuote}
      >
        <RefreshIcon className="hidden sm:block" />
        <div className="text-4xl sm:hidden bg-gray-200 dark:bg-slate-700 w-12 h-12 rounded-full grid place-items-center">
          <svg
            width="1rem"
            height="1rem"
            version="1.1"
            id="XMLID_287_"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 24"
            className="fill-current bg-opacity-20"
          >
            <g id="next">
              <g>
                <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 		" />
              </g>
            </g>
          </svg>
        </div>
      </button>
    </div>
  );
}
