import { useEffect, useReducer } from "react";

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
    async function fetchQuotes() {
      dispatch({ type: "loading" });
      const response = await fetch(quotesFileUrl);
      if (!response.ok) {
        dispatch({ type: "error", payload: response.status });
        return;
      }

      const data = await response.json();
      dispatch({ type: "success", payload: shuffleArray(data.quotes) });
    }

    fetchQuotes();
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
