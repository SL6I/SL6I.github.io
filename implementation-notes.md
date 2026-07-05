# Implementation Notes — Portfolio Final Build (2026-07-05)

Implemented by Claude following `CODEX_MASTER_PROMPT.md` (all phases).

## What was built

- **Phase 1 — Dual theme.** All colors/shadows/glows tokenized in `styles/main.css`. Dark "Electric" is default; light "Studio" activates via `[data-theme="light"]`. Toggle button (animated sun/moon) in desktop nav + mobile menu on every page. Order of precedence: localStorage → OS `prefers-color-scheme` → dark. Inline head script on every page prevents flash-of-wrong-theme; `meta[theme-color]` stays in sync. Theme switch cross-fades for 0.4 s via a temporary `html.theme-anim` class (disabled under reduced motion).
- **Phase 2 — Index restructure.** Oversized light-weight section headings; About gained a 4-up stats grid (GPA 3.97 · 7 projects · 45+ trained · Oxford '26); Experience rebuilt as an alternating card timeline on a central line (single column on mobile) + added the ML Training Instructor entry; Stack gained a 12-icon monochrome brand grid (inline SVGs from simple-icons: Python, PyTorch, TensorFlow, OpenCV, Hugging Face, scikit-learn, FastAPI, NumPy, pandas, Git, n8n, Gradio); Projects now has all 7 projects, every one linking to a case page. Featured stat corrected from "9 AI subsystems" to "6 AI models" per `05_NeoBalady_Smart_City_AI.md` (doc wins).
- **Phase 3 — 7 case pages** under `/projects/` from one template: problem → how it works (numbered steps) → results (stat cards) → stack, plus prev/next loop, contact CTA, per-page title/description/canonical/OG/JSON-LD. All numbers traced to the content docs.
- **Phase 4 — Site-wide.** 404 redesigned (theme-aware, standalone). `sitemap.xml` (8 URLs), `robots.txt`. CV workflow (`cv.tex`, `.github/workflows/update-cv.yml`) untouched.
- **Phase 5 — QA.** All 9 pages pass html-validate; every internal link and anchor resolves; external links verified against the content docs (only SL6I / SuperSl6 accounts used; no phone number anywhere).

## Deviations & decisions

- `aria-label` on `<ul>` elements kept (html-validate's `aria-label-misuse` rule disabled for the check): the `list` role supports author naming per ARIA 1.2, and the labels help screen-reader users.
- Case pages for Reject Me First / SHARES / SmartGrader have **no external links** (none exist in the docs) — see TODOs below.
- Light-theme accent is `#007A99` (darkened cyan) for WCAG AA contrast on paper-white; the neon `#00E5FF` stays dark-theme-only.
- Instructor timeline entry has no dates (not in any source doc) — labeled "3-day program".

## TODO(SULTAN)

1. GitHub link for **Reject Me First** (index card + `projects/reject-me-first.html`).
2. Repo/demo links for **SHARES** (index card + `projects/shares-lip-reading.html`).
3. Repo/demo links for **SmartGrader** (`projects/smartgrader.html`), if public.
4. Dates of the 3-day ML training you led (Experience timeline).
5. Review both themes visually and push to GitHub when happy.

## What a reviewer should check first

Theme toggle on every page (no flash on load, smooth cross-fade), the zigzag timeline at desktop and mobile widths, the 7 project cards' case links, and the case-page prev/next loop.
