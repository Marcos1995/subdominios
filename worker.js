import { upstream } from "./route.mjs";

export default {
  async fetch(request, env) {
    const cfg = {
      owner: (env && env.OWNER) || "Marcos1995",
      domain: (env && env.DOMAIN) || "midominio.es",
      apexRepo: "subdominios"
    };
    const url = new URL(request.url);
    const target = upstream(url.hostname, url.pathname + url.search, cfg);
    if (!target) {
      return new Response("Ese nombre no es un subdominio válido.", {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }
    const res = await fetch(target, {
      headers: { "user-agent": request.headers.get("user-agent") || "subdominios" },
      redirect: "follow"
    });
    const headers = new Headers(res.headers);
    headers.delete("content-security-policy");
    headers.set("access-control-allow-origin", "*");
    return new Response(res.body, { status: res.status, headers });
  }
};
