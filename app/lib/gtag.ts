export function gtag(...args: any[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

export function event(name: string, params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;

  gtag("event", name, params);
}
