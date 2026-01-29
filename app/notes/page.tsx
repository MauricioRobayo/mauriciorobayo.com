import { ViewTransition } from "react";

export default function Page() {
  return (
    <ViewTransition>
      <h2 className="uppercase text-xl sm:text-2xl font-bold tracking-widest">
        Mauricio Robayo
      </h2>
      <div>Notes</div>
    </ViewTransition>
  );
}
