# subdominios

Cada repo público de Marcos1995 puede abrirse en `https://<repo>.<dominio>` sin crear el subdominio en Hostinger.

El dominio sigue registrado en Hostinger. Una vez, los nameservers pasan a Cloudflare (plan gratis) y `npx wrangler deploy` publica `worker.js`. El nombre del repo es el subdominio. El worker pide la página a GitHub Pages.

El dominio de ejemplo es `midominio.es` (`config.js` y `wrangler.toml`). Cámbialo por el dominio real antes de desplegar.

## Setup

```bash
node route.test.mjs
npx wrangler deploy
```

## Docs

- `PROJECT.md` — memoria del repo para agentes
- `AGENTS.md` — reglas (Karpathy) + flujo
- `docs/DECISIONES.md` — decisiones (skill `laya`)
- `graphify-out/` — mapa del código (se regenera en cada commit)
