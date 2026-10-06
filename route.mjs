export const RESERVED = new Set([
  "www", "ftp", "mail", "smtp", "pop", "imap",
  "autoconfig", "autodiscover", "webmail", "ns1", "ns2"
]);

const LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export function upstream(host, path, cfg) {
  const name = String(host || "").split(":")[0].toLowerCase();
  const domain = String(cfg.domain || "").toLowerCase();
  if (!domain || !cfg.owner) return null;

  let repo = cfg.apexRepo;
  if (name === domain) {
    repo = cfg.apexRepo;
  } else if (name.endsWith("." + domain)) {
    const sub = name.slice(0, -(domain.length + 1));
    if (!sub || sub.includes(".") || RESERVED.has(sub) || !LABEL.test(sub)) return null;
    repo = sub;
  } else {
    return null;
  }

  const p = path && path.startsWith("/") ? path : "/" + (path || "");
  return `https://${cfg.owner}.github.io/${repo}${p}`;
}
