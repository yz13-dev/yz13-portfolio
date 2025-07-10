import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./styles/globals.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  },
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "image/x-icon",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "YZ13 – разработчик" },
    { name: "description", content: "Нужен разработчик?" },
    { name: "keywords", content: "YZ13, Web Development, Developer, Разработчик" },
    { name: "author", content: "YZ13" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "og:title", content: "YZ13 – разработчик" },
    { name: "og:description", content: "Нужен разработчик?" },
    { name: "og:site_name", content: "YZ13" },
    { name: "og:type", content: "website" },
    { name: "og:url", content: "https://yz13.ru" },
    { name: "og:image", content: "/og/og.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@YZ13_DEV" },
    { name: "twitter:creator", content: "@YZ13_DEV" },
    { name: "twitter:title", content: "YZ13 – разработчик" },
    { name: "twitter:description", content: "Нужен разработчик?" },
    { name: "twitter:image", content: "/og/og.png" },
    { name: "robots", content: "index, follow" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="inter-font">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
