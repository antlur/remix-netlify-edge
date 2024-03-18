"use client";
import { useEffect } from "react";

export default function useResizeIframes() {
  useEffect(() => {
    const iframes = document.querySelectorAll("iframe.iframe-resize");
    iframes.forEach((iframe) => {
      try {
        iframe.width = iframe.contentWindow.document.body.scrollWidth.toString() + "px";
        iframe.height = iframe.contentWindow.document.body.scrollHeight.toString() + "px";
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  return null;
}
