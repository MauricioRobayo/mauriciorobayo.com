import Balancer from "react-wrap-balancer";

interface BlockquoteProps {
  quote: string;
  author: string;
}
export function Blockquote({ quote, author }: BlockquoteProps) {
  return (
    <figure>
      <blockquote className="not-prose border-none font-serif p-0 text-2xl italic prose-md">
        <Balancer>{quote}</Balancer>
      </blockquote>
      {author ? (
        <figcaption className="mt-6">
          <cite className="not-italic font-medium text-gray-900 dark:text-white">
            {author}
          </cite>
        </figcaption>
      ) : null}
    </figure>
  );
}
