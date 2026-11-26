import { renderToString } from "react-dom/server";
import App, { describeRoute, routeIds } from "./App";

export const routes = ["/", "/cv/", ...routeIds.map(id => "/projets/" + id + "/"), "/404.html"];
export const render = (path: string) => renderToString(<App path={path} />);
export { describeRoute };
