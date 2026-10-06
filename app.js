const cfg = window.SUB || { owner: "Marcos1995", domain: "midominio.es", apexRepo: "subdominios" };

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

async function loadRepos(owner) {
  const all = [];
  let url = `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&type=owner`;
  while (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    all.push(...await res.json());
    const link = res.headers.get("link") || "";
    const next = link.match(/<([^>]+)>;\s*rel="next"/);
    url = next ? next[1] : "";
  }
  return all;
}

function counts(list, key) {
  const out = {};
  for (const repo of list) {
    const k = key(repo);
    out[k] = (out[k] || 0) + 1;
  }
  return out;
}

function paintLang(list) {
  const box = document.getElementById("chart-lang");
  const title = document.getElementById("chart-lang-title");
  if (!list.length) {
    title.textContent = "Ningún repo en este filtro";
    box.innerHTML = "";
    return;
  }
  const bag = counts(list, (r) => r.language || "Sin lenguaje");
  const rows = Object.entries(bag).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es"));
  const total = list.length || 1;
  const top = rows[0];
  title.textContent = rows.length === 1
    ? `Los ${list.length} repos de esta vista están en ${top[0]}`
    : `${top[0]} agrupa ${top[1]} de ${list.length} repos de esta vista`;
  box.innerHTML = rows.map(([name, n]) => {
    const pct = Math.round((100 * n) / total);
    return `<div>
      <div class="flex justify-between text-label-sm font-label-sm mb-1">
        <span class="text-text-primary font-bold">${esc(name)}</span>
        <span class="text-text-muted">${n} repos (${pct}%)</span>
      </div>
      <div class="w-full bg-surface-subtle h-3 rounded-full overflow-hidden">
        <div class="bg-surface-dark h-full rounded-full" style="width:${pct}%"></div>
      </div>
    </div>`;
  }).join("");
}

function paintPages(list) {
  const box = document.getElementById("chart-pages");
  const title = document.getElementById("chart-pages-title");
  if (!list.length) {
    title.textContent = "Ningún repo en este filtro";
    box.innerHTML = "";
    return;
  }
  const on = list.filter((r) => r.has_pages).length;
  const off = list.length - on;
  title.textContent = off === 0
    ? `Los ${list.length} repos de esta vista tienen GitHub Pages`
    : `${on} de ${list.length} repos de esta vista tienen GitHub Pages`;
  const wOn = list.length ? Math.round((100 * on) / list.length) : 0;
  const wOff = 100 - wOn;
  box.innerHTML = `
    <div class="w-full h-8 bg-surface-subtle rounded-xl flex overflow-hidden p-1 gap-1 border border-border-subtle">
      <div class="bg-surface-dark rounded-lg flex items-center justify-center text-text-on-dark font-label-sm text-label-sm" style="width:${wOn}%">${wOn}% Pages</div>
      ${off ? `<div class="bg-surface-subtle rounded-lg flex items-center justify-center text-text-muted font-label-sm text-label-sm" style="width:${wOff}%">${wOff}%</div>` : ""}
    </div>
    <div class="grid grid-cols-2 gap-3 pt-2">
      <div class="p-3 bg-surface-subtle rounded-xl border border-border-subtle">
        <div class="text-headline-sm font-headline-sm text-surface-dark">${on} repos</div>
        <div class="text-label-sm font-label-sm text-text-muted">Con GitHub Pages</div>
      </div>
      <div class="p-3 bg-surface-subtle rounded-xl border border-border-subtle">
        <div class="text-headline-sm font-headline-sm text-text-muted">${off} repos</div>
        <div class="text-label-sm font-label-sm text-text-muted">Sin Pages</div>
      </div>
    </div>`;
}

function paintRows(list) {
  const box = document.getElementById("repo-list");
  if (!list.length) {
    box.innerHTML = '<p class="text-text-muted">Ningún repo en este filtro.</p>';
    return;
  }
  box.innerHTML = list.map((repo) => {
    const lang = repo.language || "Sin lenguaje";
    const desc = repo.description || "Sin descripción en GitHub";
    const host = `${repo.name}.${cfg.domain}`;
    const letter = esc(repo.name.slice(0, 1).toUpperCase());
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='64' height='64' rx='12' fill='%2318E667'/><text x='32' y='42' text-anchor='middle' font-size='28' font-family='Public Sans,sans-serif' fill='%23032612'>${letter}</text></svg>`;
    const thumb = `data:image/svg+xml,${svg}`;
    const estado = repo.has_pages ? "Pages publicado" : "Sin Pages";
    return `<article class="repo-card bg-surface-card rounded-2xl p-4 border border-border-subtle shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-start gap-3.5">
        <img class="w-16 h-16 rounded-xl object-cover border border-border-subtle flex-shrink-0" src="${esc(thumb)}" alt="Miniatura de ${esc(repo.name)}">
        <div class="space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <a class="font-headline-sm text-headline-sm text-text-primary hover:underline" href="${esc(repo.html_url)}">${esc(repo.name)}</a>
            <span class="px-2 py-0.5 rounded-full bg-surface-subtle font-label-sm text-label-sm font-bold">${esc(lang)}</span>
          </div>
          <p class="text-body-sm font-body-sm text-text-muted">${esc(desc)}</p>
          <div class="host font-code-data text-code-data text-primary font-semibold">${esc(host)}</div>
        </div>
      </div>
      <span class="inline-flex items-center gap-1 text-label-sm font-label-sm text-on-tertiary-container bg-surface-container px-2.5 py-1 rounded-full w-fit">${esc(estado)}</span>
    </article>`;
  }).join("");
}

function paintFilters(all, current) {
  const bag = counts(all, (r) => r.language || "Sin lenguaje");
  const names = Object.keys(bag).sort((a, b) => a.localeCompare(b, "es"));
  const box = document.getElementById("language-filter");
  const opts = [["all", `Todos (${all.length})`], ...names.map((n) => [n, `${n} (${bag[n]})`])];
  box.innerHTML = opts.map(([id, label]) => {
    const on = id === current;
    const cls = on
      ? "bg-surface-dark text-text-on-dark"
      : "bg-surface-subtle text-text-primary hover:bg-border-subtle";
    return `<button class="filter-btn px-3 py-1 rounded-full font-label-sm text-label-sm ${cls}" data-filter="${esc(id)}" type="button">${esc(label)}</button>`;
  }).join("");
}

function show(all, filter) {
  const list = filter === "all" ? all : all.filter((r) => (r.language || "Sin lenguaje") === filter);
  document.getElementById("kpi-repos").textContent = String(list.length);
  document.getElementById("kpi-cover").textContent = String(list.length);
  const pill = document.getElementById("kpi-repos-pill");
  pill.innerHTML = filter === "all"
    ? '<span class="text-primary-container font-bold">▲</span> salen solos al publicar'
    : `<span class="text-primary-container font-bold">▼</span> filtro: ${list.length} de ${all.length} públicos`;
  paintLang(list);
  paintPages(list);
  paintRows(list);
  paintFilters(all, filter);
  boxClicks(all);
}

function boxClicks(all) {
  document.getElementById("language-filter").onclick = (ev) => {
    const btn = ev.target.closest("button");
    if (!btn) return;
    show(all, btn.getAttribute("data-filter"));
  };
}

function fail(msg) {
  document.getElementById("kpi-repos").textContent = "sin dato";
  document.getElementById("kpi-cover").textContent = "sin dato";
  document.getElementById("chart-lang-title").textContent = "Sin dato de lenguajes";
  document.getElementById("chart-pages-title").textContent = "Sin dato de Pages";
  document.getElementById("repo-empty").textContent = msg;
}

document.querySelectorAll(".js-paso").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("sec-paso").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const themeBtn = document.getElementById("theme-switch");
function syncTheme() {
  themeBtn.setAttribute("aria-pressed", document.documentElement.classList.contains("dark") ? "true" : "false");
}
syncTheme();
themeBtn.addEventListener("click", () => {
  const dark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
  syncTheme();
});

document.getElementById("tab-resumen").addEventListener("click", () => document.getElementById("sec-resumen").scrollIntoView({ behavior: "smooth" }));
document.getElementById("tab-repos").addEventListener("click", () => document.getElementById("sec-repos").scrollIntoView({ behavior: "smooth" }));
document.getElementById("tab-paso").addEventListener("click", () => document.getElementById("sec-paso").scrollIntoView({ behavior: "smooth" }));

document.documentElement.classList.add("js");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
}

document.getElementById("host-hint").textContent = `*.${cfg.domain} · cambia el dominio en config.js`;

loadRepos(cfg.owner).then((all) => {
  all.sort((a, b) => String(b.pushed_at).localeCompare(String(a.pushed_at)));
  const sample = all[0];
  if (sample) {
    document.getElementById("paso-copy").innerHTML =
      `El dominio sigue registrado en Hostinger. Una vez se cambian los nameservers a Cloudflare y se despliega el worker, <span class="font-code-data font-bold text-primary-container">${esc(sample.name)}.${esc(cfg.domain)}</span> sirve el repo público <span class="font-code-data font-bold text-primary-container">${esc(sample.name)}</span>. No hace falta crear el subdominio en el panel.`;
  }
  const when = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
  document.getElementById("fuente").textContent =
    `Fuente: api.github.com/users/${cfg.owner}/repos · ${when}. No incluye repos privados. El 0 y el 1 de las tarjetas son el alta (nameservers), no un conteo de repos.`;
  show(all, "all");
}).catch(() => fail("Sin dato: la API pública de GitHub no respondió."));
