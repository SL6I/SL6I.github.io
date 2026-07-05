/* sl6i.github.io — interactions
   1. Custom cursor (dot + ring) and mouse spotlight — desktop pointers only
   2. Scroll reveals (IntersectionObserver)
   3. Nav: scrolled state, active section, mobile menu
   4. Copy-email button
   No dependencies. Everything degrades: without JS the page is complete. */

(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ============ 0. Theme (dark "Electric" / light "Studio") ============
     The <head> inline script already set data-theme before first paint;
     here we wire the toggles and keep meta[theme-color] in sync.
     View Transitions cross-fade the theme; .theme-anim is the fallback. */

  const THEME_KEY = "theme";
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const THEME_COLORS = { dark: "#060609", light: "#F5F5F3" };
  let themeAnimTimer;

  function paintTheme(theme) {
    const root = document.documentElement;
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    themeMeta?.setAttribute("content", THEME_COLORS[theme]);
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(theme === "light"));
      btn.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
      const label = btn.querySelector(".tt-label");
      if (label) label.textContent = theme === "light" ? "dark mode" : "light mode";
    });
  }

  function applyTheme(theme, animate) {
    const root = document.documentElement;
    clearTimeout(themeAnimTimer);

    if (!animate || reducedMotion) {
      root.classList.remove("theme-anim");
      paintTheme(theme);
      return;
    }

    if (document.startViewTransition) {
      try {
        document.startViewTransition(() => paintTheme(theme));
        return;
      } catch {
        /* fall through to the CSS fallback */
      }
    }

    root.classList.add("theme-anim");
    paintTheme(theme);
    themeAnimTimer = setTimeout(() => root.classList.remove("theme-anim"), 340);
  }

  applyTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark", false);

  document.querySelectorAll(".theme-toggle").forEach((btn) =>
    btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      try { localStorage.setItem(THEME_KEY, next); } catch { /* private mode */ }
      applyTheme(next, true);
    })
  );

  // follow the OS while the visitor hasn't chosen explicitly
  const lightMQ = window.matchMedia("(prefers-color-scheme: light)");
  lightMQ.addEventListener?.("change", (e) => {
    try { if (localStorage.getItem(THEME_KEY)) return; } catch { return; }
    applyTheme(e.matches ? "light" : "dark", true);
  });

  /* ============ 1. Cursor + spotlight ============ */

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  const spotlight = document.getElementById("spotlight");

  if (finePointer && !reducedMotion && dot && ring) {
    let mx = innerWidth / 2, my = innerHeight / 3;   // mouse position
    let rx = mx, ry = my;                            // ring position (lerped)
    let visible = false;

    dot.style.opacity = "0";
    ring.style.opacity = "0";

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      spotlight.style.setProperty("--mx", `${mx}px`);
      spotlight.style.setProperty("--my", `${my}px`);
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });

    (function followRing() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      requestAnimationFrame(followRing);
    })();

    // grow the ring over interactive elements
    const interactive = "a, button, [role='button']";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactive)) ring.classList.add("hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactive)) ring.classList.remove("hover");
    });
  }

  /* ============ 2. Scroll reveals ============ */

  const revealIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealIO.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

  /* ============ 3. Nav ============ */

  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // active section highlighting
  const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
  const sectionIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`)
      );
    }),
    { rootMargin: "-40% 0px -55% 0px" }
  );
  document.querySelectorAll("main section[id]:not(#top)").forEach((s) => sectionIO.observe(s));

  // mobile menu
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }
  setMenu(false);
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true")
  );
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) setMenu(false);
  });

  /* ============ 4. Copy email ============ */

  const copyBtn = document.getElementById("copy-email");
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      const prev = copyBtn.textContent;
      copyBtn.textContent = "copied \u2713";
      setTimeout(() => (copyBtn.textContent = prev), 1600);
    } catch {
      location.href = `mailto:${copyBtn.dataset.email}`;
    }
  });

  /* ============ 5. Scroll progress bar ============ */

  const progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    const updProgress = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progressBar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
    };
    addEventListener("scroll", updProgress, { passive: true });
    addEventListener("resize", updProgress, { passive: true });
    updProgress();
  }

  /* ============ 6. Side dot navigation (index only) ============ */

  (function initSideNav() {
    const secs = [...document.querySelectorAll("main section[id]")];
    if (secs.length < 3) return;
    const side = document.createElement("nav");
    side.className = "side-nav";
    side.setAttribute("aria-label", "Sections");
    side.innerHTML = secs
      .map((s) => `<a href="#${s.id}" data-sec="${s.id}" aria-label="${s.id}"></a>`)
      .join("");
    document.body.appendChild(side);
    const dots = [...side.children];
    const dotIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        dots.forEach((d) => d.classList.toggle("active", d.dataset.sec === e.target.id));
      }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    secs.forEach((s) => dotIO.observe(s));
  })();

  /* ============ 7. Typed focus word (old-site style) ============ */

  (function initTypedWord() {
    const el = document.getElementById("typed-word");
    if (!el) return;
    const words = ["Deep Learning", "Computer Vision", "LLMs & RAG", "Speech AI", "AI Agents"];
    if (reducedMotion) { el.textContent = words[0]; return; }
    let wi = 0, ci = words[0].length, deleting = true;
    setTimeout(function tick() {
      const w = words[wi];
      ci += deleting ? -1 : 1;
      el.textContent = w.slice(0, ci);
      let d = deleting ? 42 : 70 + Math.random() * 55;
      if (!deleting && ci === w.length) { d = 1900; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; d = 320; }
      setTimeout(tick, d);
    }, 1700);
  })();

  /* ============ 8. Count-up stats ============ */

  (function initCountUp() {
    const vals = [...document.querySelectorAll(".stat-value")];
    if (!vals.length || reducedMotion) return;
    const countIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        countIO.unobserve(e.target);
        animateCount(e.target);
      }),
      { threshold: 0.6 }
    );
    vals.forEach((v) => countIO.observe(v));

    function animateCount(el) {
      const node = el.firstChild;
      if (!node || node.nodeType !== 3) return;
      const m = node.textContent.match(/^([^0-9]*)([0-9][\d,]*(?:\.\d+)?)(.*)$/);
      if (!m) return;
      const target = parseFloat(m[2].replace(/,/g, ""));
      const dec = (m[2].split(".")[1] || "").length;
      const commas = m[2].includes(",");
      const D = 900;
      const t0 = performance.now();
      requestAnimationFrame(function frame(t) {
        const k = Math.min(1, (t - t0) / D);
        const e = 1 - Math.pow(1 - k, 3);
        let v = (target * e).toFixed(dec);
        if (commas) v = Number(v).toLocaleString("en-US", { minimumFractionDigits: dec });
        node.textContent = m[1] + v + m[3];
        if (k < 1) requestAnimationFrame(frame);
      });
    }
  })();

  /* ============ 9. Hero particles (theme-aware, calm) ============ */

  (function initParticles() {
    const hero = document.querySelector(".hero");
    if (!hero || reducedMotion) return;
    const cv = document.createElement("canvas");
    cv.className = "hero-particles";
    cv.setAttribute("aria-hidden", "true");
    hero.appendChild(cv);
    const ctx = cv.getContext("2d");
    const N = 42;
    let w, h, pts;
    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--cyan").trim();
    let col = accent();
    new MutationObserver(() => (col = accent()))
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const size = () => { w = cv.width = hero.offsetWidth; h = cv.height = hero.offsetHeight; };
    const reset = () => {
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        a: Math.random() * 0.35 + 0.1,
      }));
    };
    size(); reset();
    addEventListener("resize", () => { size(); reset(); }, { passive: true });
    (function tick() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, w, h);
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
          ctx.globalAlpha = p.a;
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 6.2832);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(tick);
    })();
  })();
})();
