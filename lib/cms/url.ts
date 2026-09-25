const PRODUCTION_ORIGIN = "https://centraltexasholisticcarepllc.com";
const WWW_ORIGIN = "https://www.centraltexasholisticcarepllc.com";

function isLocalhost(value: string | undefined): boolean {
  return Boolean(value && /localhost|127\.0\.0\.1/.test(value));
}

export function getPublicSiteURL(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_ORIGIN;
}

export function getServerURL(): string {
  const site = getPublicSiteURL();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  if (process.env.VERCEL) {
    if (server && !isLocalhost(server)) return server.replace(/\/$/, "");
    return site.replace(/\/$/, "");
  }

  if (server) return server.replace(/\/$/, "");
  return "http://localhost:3000";
}

export function getCorsOrigins(): string[] {
  const origins = new Set<string>([PRODUCTION_ORIGIN, WWW_ORIGIN, getPublicSiteURL()]);

  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }

  if (!process.env.VERCEL) {
    origins.add("http://localhost:3000");
  }

  return [...origins].filter(Boolean);
}

export function normalizeCmsPath(path: string | null | undefined): string {
  if (!path) return "/";
  const segments = path.split("/").filter((segment) => segment.length > 0);
  if (segments.some((segment) => segment === "null" || segment === "undefined")) {
    return "/";
  }
  return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

export function publicPathFromCms(path: string): string {
  const normalized = normalizeCmsPath(path);
  return normalized === "/" ? "/" : `${normalized}/`;
}
