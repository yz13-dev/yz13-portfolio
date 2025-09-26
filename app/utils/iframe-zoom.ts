



export function initIframe(id: string, zoom: number) {
  const iframe = document.getElementById(id) as HTMLIFrameElement | null;
  const parent = iframe?.parentElement;

  if (!parent) return;
  if (!iframe) return;

  const contentWindow = iframe.contentWindow;

  if (!contentWindow) return;

  const doc = contentWindow.document.documentElement;

  doc.style.setProperty("--iframe-zoom", `${zoom}`);
  doc.style.setProperty("transform", `scale(${zoom})`);
  doc.style.setProperty("transform-origin", "0 0");

  doc.style.setProperty("width", `calc(100%/${zoom})`);
  doc.style.setProperty("height", `calc(100%/${zoom})`);

  doc.style.setProperty("overflow", "hidden");
}
