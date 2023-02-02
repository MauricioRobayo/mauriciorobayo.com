import Balancer from "react-wrap-balancer";

interface Blockquote {
  quote: string;
  author: string;
}
export function Blockquote({ quote, author }: Blockquote) {
  return (
    <figure className="max-w-screen-md mx-auto text-center">
      <blockquote className="not-prose border-none">
        <p className="text-2xl italic prose-md">
          <Balancer>{quote}</Balancer>
        </p>
      </blockquote>
      {author ? (
        <figcaption className="flex items-center justify-center mt-6 space-x-3">
          <cite className="pr-3 not-italic font-medium text-gray-900 dark:text-white">
            {author}
          </cite>
        </figcaption>
      ) : null}
    </figure>
  );
}
