import { TooltipProvider } from "@yz13/ui/tooltip";
import { cn } from "@yz13/ui/utils";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Links, LinksFunction, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration } from "react-router";
import Modal from "./components/settings/modal";
import ThemeWatcher from "./components/theme-watcher";
import { DateProvider } from "./components/time/time";
import { useStore, useThemeStore } from "./hooks/use-theme";
import "./styles/globals.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://api.yz13.ru", crossOrigin: "use-credentials" },
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
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
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
    { name: "theme-color", media: "(prefers-color-scheme: light)", content: "#ffffff" },
    { name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#000000" },
    { name: "color-scheme", content: "light dark" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "robots", content: "index, max-image-preview:large" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {

  const theme = useStore(useThemeStore, (state) => state)

  return (
    <html
      lang="en"
      className={cn(
        "overscroll-none",
        theme?.theme === "dark" && "dark",
        theme?.theme === "light" && "light",
      )}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="inter-sans pixelify-sans jetbrains-mono">
        <ThemeWatcher />
        <NuqsAdapter>
          <DateProvider>
            <TooltipProvider>
              <Modal />
              {children}
            </TooltipProvider>
          </DateProvider>
        </NuqsAdapter>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
