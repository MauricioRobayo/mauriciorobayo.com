import { useEffect, useState } from "react";

const quotesFileUrl =
  "https://raw.githubusercontent.com/MauricioRobayo/quotes-to-live-by/main/quotes-to-live-by.json";

export interface Quote {
  quote: string;
  author: string;
}
type QuoteStatus = "loading" | "idle" | "success" | "error";
interface QuoteSuccessResponse {
  status: "success";
  quotes: Quote[];
  error: undefined;
}
interface QuoteErrorResponse {
  status: "error";
  error: number;
  quotes: undefined;
}
interface QuoteIdleResponse {
  status: "idle";
  error: undefined;
  quotes: undefined;
}
interface QuoteLoadingResponse {
  status: "loading";
  error: undefined;
  quotes: undefined;
}
export function useQuotes():
  | QuoteSuccessResponse
  | QuoteErrorResponse
  | QuoteIdleResponse
  | QuoteLoadingResponse {
  const [quotes, setQuotes] = useState<Quote[]>();
  const [status, setStatus] = useState<QuoteStatus>("idle");
  const [error, setError] = useState<number>();

  useEffect(() => {
    async function fetchQuotes() {
      setStatus("loading");
      const response = await fetch(quotesFileUrl);
      if (!response.ok) {
        setStatus("error");
        setError(response.status);
        return;
      }

      const data = await response.json();
      setStatus("success");
      setQuotes(shuffleArray(data.quotes));
    }

    fetchQuotes();
  }, []);

  if (error) {
    return {
      error,
      status: "error",
      quotes: undefined,
    };
  }

  if (quotes) {
    return {
      quotes,
      status: "success",
      error: undefined,
    };
  }

  if (status === "idle") {
    return {
      status: "idle",
      quotes: undefined,
      error: undefined,
    };
  }

  return {
    status: "loading",
    quotes: undefined,
    error: undefined,
  };
}

function shuffleArray<T>(arr: T[]): T[] {
  const arrCopy = arr.slice();
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}
