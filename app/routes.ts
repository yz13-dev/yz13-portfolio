import {
  type RouteConfig,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("/", "./routes/(root)/page.tsx"),
  layout("./routes/auth/layout.tsx", [
    route("/auth/signin", "./routes/auth/signin/page.tsx"),
    route("/auth/signup", "./routes/auth/signup/page.tsx"),
  ]),
  layout("./routes/order/layout.tsx", [
    route("/order/busy", "./routes/order/busy/page.tsx"),
    route("/order/website", "./routes/order/website/page.tsx"),
  ])
] satisfies RouteConfig;
