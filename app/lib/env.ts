// @ts-nocheck
export function env(variable: string, defaultValue: string = ""): string {
  if (typeof Netlify === "undefined") {
    return process.env[variable] ?? defaultValue;
  }

  return Netlify.env.get(variable) ?? defaultValue;
}
