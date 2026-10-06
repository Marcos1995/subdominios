<!-- managed-by-telegram-cursor-bot:agent-kit -->
# Contexto del proyecto

## Produccion
- URL: https://github.com/Marcos1995/subdominios
- Vista: https://Marcos1995.github.io/subdominios/ (repo público; Chrome)
- Vista local: `index.html`

## Estado
- Convención: el nombre del repo público es el subdominio (`ventana` → `ventana.<dominio>`).
- `worker.js` hace de proxy hacia `https://<owner>.github.io/<repo>/`. El apex sirve este repo.
- Una sola vez: dominio real en `config.js` y `wrangler.toml`, nameservers del dominio (sigue en Hostinger) a Cloudflare, `npx wrangler deploy`. Hasta entonces el dominio de ejemplo es `midominio.es`.
- Hostinger no crea el vhost con un DNS wildcard; por eso el comodín vive en Cloudflare, no en el panel de subdominios.
- `index.html` lista los repos públicos de Marcos1995 con la API de GitHub (sin token).

## Stack
- HTML estático (GitHub Pages) y un Worker de Cloudflare. Sin dependencias de pago.
- Node solo para `node route.test.mjs`.

## Comandos utiles
- Instalar: no hace falta
- Test: `node route.test.mjs`
- Dev: abrir `index.html`
- Worker: `npx wrangler deploy` (tras poner el dominio en `wrangler.toml`)

## Notas para el agente
- No trates `midominio.es` como el dominio real: es el hueco de `config.js`.
- No des de alta subdominios uno a uno en hPanel: el panel de Hostinger no enruta un host desconocido.
- Laya eligió un monorepo y se anuló (imposible en Hostinger). Siguiente: Worker. Confianza baja; ver `docs/DECISIONES.md`.
- Lean kit (ver AGENTS.md)
