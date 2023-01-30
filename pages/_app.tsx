import { AppProps } from "next/app";
import { GoogleAnalytics } from "nextjs-google-analytics";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
};

export default App;
