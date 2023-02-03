import { useEffect, useReducer } from "react";

const quotesFileUrl =
  "https://raw.githubusercontent.com/MauricioRobayo/quotes-to-live-by/main/quotes-to-live-by.json";
const fetchQuotes = fetchCache();
export interface Quote {
  quote: string;
  author: string;
}
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
type State =
  | QuoteSuccessResponse
  | QuoteErrorResponse
  | QuoteIdleResponse
  | QuoteLoadingResponse;

const initialState: State = {
  status: "idle",
  quotes: undefined,
  error: undefined,
};
type Action =
  | {
      type: "loading";
    }
  | { type: "idle" }
  | { type: "error"; payload: number }
  | {
      type: "success";
      payload: Quote[];
    };
const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case "error":
      return {
        status: "error",
        quotes: undefined,
        error: action.payload,
      };
    case "success":
      return {
        status: "success",
        quotes: action.payload,
        error: undefined,
      };
    case "idle":
    case "loading":
      return {
        status: action.type,
        quotes: undefined,
        error: undefined,
      };
    default:
      return prevState;
  }
};
export function useQuotes(): State {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const abortController = new AbortController();

    async function getQuotes() {
      dispatch({ type: "loading" });
      try {
        const data = await fetchQuotes(quotesFileUrl);
        dispatch({ type: "success", payload: shuffleArray(data.quotes) });
      } catch (err) {
        dispatch({ type: "error", payload: 1 });
      }
    }

    getQuotes();

    return () => {
      abortController.abort();
    };
  }, []);

  return state;
}

function shuffleArray<T>(arr: T[]): T[] {
  const arrCopy = arr.slice();
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}

function fetchCache() {
  const cache: Record<string, Promise<any>> = {};

  return async (url: string, options?: RequestInit) => {
    return (cache[url] ??= fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    }));
  };
}
