import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("./layout/MainLayout.tsx", [
    route("/", "./routes/_index.tsx"),
    route("/anime/:id", "./routes/anime_.$anime.tsx"),
  ]),
] satisfies RouteConfig;
