import { useState } from "react";

const quotesFileUrl =
  "https://raw.githubusercontent.com/MauricioRobayo/quotes-to-live-by/main/quotes-to-live-by.json";

export function Quote() {
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(0);
  const quotes = [
    "hello, world!",
    "All I wanna do is go the distance. Hear that ring bell and I'm still standing",
  ];
  const changeQuote = () => {
    setSelectedQuoteIndex(
      (selectedQuoteIndex) => (selectedQuoteIndex + 1) % quotes.length
    );
  };
  return (
    <div className="text-center py-16 text-gray-400" onClick={changeQuote}>
      {quotes[selectedQuoteIndex]}
    </div>
  );
}
