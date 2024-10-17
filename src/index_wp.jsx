import React from "react";
import ReactDOMClient from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import { increment } from "./components/util";
import { App } from "./App";

console.log(increment(1));

// client-side rendering
if (typeof document !== "undefined") {
  ReactDOMClient.createRoot(document.getElementById("root")).render(<App />);
}

// for SSR/SSG, not impacting client-side rendering though
// TODO: this is very naive since:
// - we need to assemble the HTML, css and js entries manually
// - the routing is not covered if this needs to be used in app level
export default (locals) => {
  return  ReactDOMServer.renderToStaticMarkup(
      <html lang="en">
        <head>
          {/*
          <link rel="stylesheet" href="/styles.css"/>
          */}
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>React Webpack Dynamic Import</title>
          <script>
            global = globalThis 
          </script>
          <script defer="defer" src="/main.bundle.js"></script>
        </head>
        <body>
            <div id='root'>
              <App />
            </div>
        </body>
      </html>
  );
};
