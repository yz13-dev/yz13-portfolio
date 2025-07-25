import {
  type RouteConfig,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("/", "./routes/page.tsx"),
  layout("./routes/auth/layout.tsx", [
    route("/auth/signin", "./routes/auth/signin/page.tsx"),
    route("/auth/signup", "./routes/auth/signup/page.tsx"),
  ]),
] satisfies RouteConfig;
