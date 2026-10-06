import { upstream } from "./route.mjs";

const cfg = { owner: "Marcos1995", domain: "midominio.es", apexRepo: "subdominios" };
const cases = [
  ["ventana.midominio.es", "/", "https://Marcos1995.github.io/ventana/"],
  ["ventana.midominio.es", "/app.js", "https://Marcos1995.github.io/ventana/app.js"],
  ["midominio.es", "/", "https://Marcos1995.github.io/subdominios/"],
  ["www.midominio.es", "/", null],
  ["a.b.midominio.es", "/", null],
  ["otro.es", "/", null]
];

for (const [host, path, want] of cases) {
  const got = upstream(host, path, cfg);
  if (got !== want) {
    console.error("FALLO", host, path, "got", got, "want", want);
    process.exit(1);
  }
}
console.log("ok", cases.length);
