# Graph Report - subdominios  (2026-10-06)

## Corpus Check
- 19 files · ~7,650 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .mdc 2, .toml 1)

## Summary
- 78 nodes · 75 edges · 17 communities (12 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- app.js
- route.mjs
- Debug
- Contexto del proyecto
- Dashboard brief (for the Stitch prompt)
- Verify (UI)
- Web design
- Agent rules
- Build judgments with Laya
- Laya
- Review
- subdominios
- DESIGN.md
- DECISIONES.md

## God Nodes (most connected - your core abstractions)
1. `show()` - 6 edges
2. `Debug` - 6 edges
3. `Contexto del proyecto` - 6 edges
4. `Dashboard brief (for the Stitch prompt)` - 5 edges
5. `esc()` - 4 edges
6. `paintLang()` - 4 edges
7. `paintFilters()` - 4 edges
8. `upstream()` - 4 edges
9. `fetch()` - 4 edges
10. `Verify (UI)` - 4 edges

## Surprising Connections (you probably didn't know these)
- `fetch()` --calls--> `upstream()`  [EXTRACTED]
  worker.js → route.mjs

## Import Cycles
- None detected.

## Communities (17 total, 5 thin omitted)

### Community 0 - "app.js"
Cohesion: 0.28
Nodes (9): boxClicks(), counts(), esc(), paintFilters(), paintLang(), paintPages(), paintRows(), show() (+1 more)

### Community 1 - "route.mjs"
Cohesion: 0.36
Nodes (5): RESERVED, cases, cfg, upstream(), fetch()

### Community 2 - "Debug"
Cohesion: 0.29
Nodes (6): 1. Root cause, 2. Compare, 3. Hypothesis, 4. Fix, Debug, Red flags → back to step 1

### Community 3 - "Contexto del proyecto"
Cohesion: 0.29
Nodes (6): Comandos utiles, Contexto del proyecto, Estado, Notas para el agente, Produccion, Stack

### Community 4 - "Dashboard brief (for the Stitch prompt)"
Cohesion: 0.33
Nodes (5): Anatomy (always), Charts without libraries (inline SVG, no CDN), CSS, Dashboard brief (for the Stitch prompt), Data honesty (non-negotiable)

### Community 5 - "Verify (UI)"
Cohesion: 0.40
Nodes (4): 1. Screenshots, 2. Look, 3. Fix and repeat, Verify (UI)

### Community 6 - "Web design"
Cohesion: 0.40
Nodes (4): Before HECHO, Steps, Style = `DESIGN.md`, Web design

### Community 7 - "Agent rules"
Cohesion: 0.50
Nodes (3): Agent rules, Flujo, Think → Simple → Surgical → Verify (Karpathy)

### Community 8 - "Build judgments with Laya"
Cohesion: 0.50
Nodes (3): Build judgments with Laya, Call, Design

### Community 9 - "Laya"
Cohesion: 0.50
Nodes (3): Laya, Reply (decision-only requests), Steps

### Community 10 - "Review"
Cohesion: 0.50
Nodes (3): Check, Do, Review

### Community 11 - "subdominios"
Cohesion: 0.50
Nodes (3): Docs, Setup, subdominios

## Knowledge Gaps
- **36 isolated node(s):** `themeBtn`, `RESERVED`, `cfg`, `cases`, `1. Root cause` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 54 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `themeBtn`, `RESERVED`, `cfg` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._