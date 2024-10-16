import React from "react";
import ReactDOM from "react-dom/client";
import { increment } from "./components/util";
import { App } from "./App";
import { Router, RouterContext, Route, browserHistory, match } from "react-router";

console.log(increment(1));

const Routes = ( <Route path='/' component={App}></Route>);

const PageTemplate = ({ children }) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/styles.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div id="outlet" className="container">
          {this.props.children}
        </div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  );
};

if (typeof document !== "undefined") {
  ReactDOM.createRoot(document.getElementById("root")).render(<Router history={browserHistory} routes={Routes} />);
}

export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match(
    {
      routes: Routes,
      location: location,
    },
    function (error, redirectLocation, renderProps) {
      var html = ReactDOMServer.renderToStaticMarkup(
        <PageTemplate>
          <RouterContext {...renderProps} />
        </PageTemplate>
      );
      callback(null, html);
    }
  );
};
