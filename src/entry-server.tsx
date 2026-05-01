import { renderToString } from "react-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { StaticRouter } from "react-router";
import PublicApp from "./PublicApp";
import { getPublicPrerenderRoutes } from "./lib/publicSite";

type HelmetContext = {
  helmet?: HelmetServerState;
};

export function getPrerenderRoutes() {
  return getPublicPrerenderRoutes();
}

export function render(url: string) {
  const helmetContext: HelmetContext = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <PublicApp />
      </StaticRouter>
    </HelmetProvider>,
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.priority.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return {
    appHtml,
    head,
  };
}
