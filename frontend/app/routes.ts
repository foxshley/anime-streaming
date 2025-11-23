import { layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	layout("./layout/MainLayout.tsx", [
		route("/", "./routes/_index.tsx"),
		route("/anime/:id", "./routes/anime_.$anime.tsx"),
	]),

	layout("./layout/WatchLayout.tsx", [
		route("/watch/:id", "./routes/watch.tsx"),
	]),
] satisfies RouteConfig;
