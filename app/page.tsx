import { cacheLife } from "next/cache";
import { Suspense } from "react";
import Heading from "@/app/components/Heading";
import { Quote } from "@/app/components/Quote";

export default async function Home() {
  "use cache";
  cacheLife("max");
  const quotes = await fetchQuotes();
  return (
    <div className="px-4 sm:px-0 text-center max-w-md mx-auto mt-36">
      <div className="flex flex-col gap-8">
        <Heading size="large" />
        <Suspense>
          <Quote quotes={quotes} />
        </Suspense>
      </div>
    </div>
  );
}

async function fetchQuotes() {
  const response = await fetch(
    "https://raw.githubusercontent.com/MauricioRobayo/quotes-to-live-by/main/quotes-to-live-by.json",
  );
  const data = await response.json();
  return data.quotes;
}
