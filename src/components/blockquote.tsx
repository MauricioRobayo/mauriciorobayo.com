import Balancer from "react-wrap-balancer";

interface BlockquoteProps {
  quote: string;
  author: string;
}
export function Blockquote({ quote, author }: BlockquoteProps) {
  return (
    <figure className="max-w-screen-md mx-auto text-center">
      <blockquote className="not-prose border-none font-serif">
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
