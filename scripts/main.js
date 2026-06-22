/**
 * Sultan Alaqili — Portfolio V2 + Micro-details + Extra polish
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageIntro();
  initCursor();
  initSpotlight();
  initNav();
  initReveal();
  initParticles();
  initTyping();
  initDragScroll();
  initCardGlow();
  initCardTilt();
  initSmoothScroll();
  initMagnetic();
  initCopyEmail();
  initBackToTop();
  initButtonRipple();
  initLiveClock();
  initScrollProgress();
  initSideNav();
  initCountUp();
  initTextScramble();
  initStaggerTags();
  initKeyboardNav();
  initParallaxHero();
});

/* ==================
   PAGE INTRO
   ================== */
function initPageIntro() {
  const intro = document.getElementById('page-intro');
  if (!intro) return;
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    intro.classList.add('done');
    document.body.style.overflow = '';
  }, 1800);
  intro.addEventListener('transitionend', () => intro.remove());
}

/* ==================
   PAGE SPOTLIGHT
   ================== */
function initSpotlight() {
  const spot = document.getElementById('page-spotlight');
  if (!spot || isMobile()) return;
  document.addEventListener('mousemove', e => {
    spot.style.setProperty('--spot-x', e.clientX + 'px');
    spot.style.setProperty('--spot-y', e.clientY + 'px');
  });
}

/* ==================
   CUSTOM CURSOR
   ================== */
function initCursor() {
  if (isMobile()) return;
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function follow() {
    rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(follow);
  })();

  function bind() {
    document.querySelectorAll('a,button,.b-card,.soc,.btn,.tag,.proj-arrow,.copy-email,.side-dot').forEach(el => {
      el.removeEventListener('mouseenter', hoverOn);
      el.removeEventListener('mouseleave', hoverOff);
      el.addEventListener('mouseenter', hoverOn);
      el.addEventListener('mouseleave', hoverOff);
    });
  }
  function hoverOn() { ring.classList.add('hover'); }
  function hoverOff() { ring.classList.remove('hover'); }
  bind();
  setTimeout(bind, 2500);
}

/* ==================
   NAVBAR
   ================== */
function initNav() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  const links = menu.querySelectorAll('a[href^="#"]');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('stuck', y > 60);
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => { if (y >= s.offsetTop - 120) current = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('on');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  links.forEach(a => a.addEventListener('click', () => {
    toggle.classList.remove('on'); menu.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

/* ==================
   SCROLL REVEAL
   ================== */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ==================
   SMOOTH SCROLL
   ================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ==================
   PARTICLES
   ================== */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;
  let mouse = { x: null, y: null };

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);

  if (!isMobile()) {
    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
  }

  const colors = ['0,240,255', '77,107,254', '180,77,255', '255,45,170', '163,255,18'];

  class P {
    constructor() { this.init(); }
    init() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.25; this.vy = (Math.random() - 0.5) * 0.25;
      this.a = Math.random() * 0.4 + 0.1; this.ba = this.a;
      this.c = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (mouse.x !== null) {
        const dx = mouse.x - this.x, dy = mouse.y - this.y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 180) { const f = (180-d)/180; this.a = this.ba + f*0.5; this.x -= (dx/d)*f*0.6; this.y -= (dy/d)*f*0.6; }
        else { this.a += (this.ba - this.a) * 0.04; }
      }
      if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${this.c},${this.a})`; ctx.fill();
    }
  }

  // Fewer particles on mobile
  const count = isMobile() ? Math.min(40, Math.floor((W*H)/18000)) : Math.min(100, Math.floor((W*H)/9000));
  const pts = Array.from({ length: count }, () => new P());

  function lines() {
    const maxDist = isMobile() ? 90 : 130;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < maxDist) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,240,255,${(1-d/maxDist)*0.1})`;
          ctx.lineWidth = 0.4;
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => { p.update(); p.draw(); });
    lines();
    raf = requestAnimationFrame(loop);
  }
  loop();
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) loop(); } else { cancelAnimationFrame(raf); raf = null; }
  }).observe(canvas);
}

/* ==================
   TYPING EFFECT
   ================== */
function initTyping() {
  const el = document.getElementById('typed');
  if (!el) return;
  const words = ['Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Multi-Agent Systems', 'Speech & Audio AI'];
  let wi = 0, ci = 0, deleting = false, paused = false;
  function tick() {
    const w = words[wi];
    if (paused) { paused = false; deleting = true; setTimeout(tick, 1800); return; }
    if (deleting) { el.textContent = w.substring(0, --ci); if (ci === 0) { deleting = false; wi = (wi+1)%words.length; setTimeout(tick, 300); return; } }
    else { el.textContent = w.substring(0, ++ci); if (ci === w.length) { paused = true; setTimeout(tick, 80); return; } }
    setTimeout(tick, deleting ? 25 : 55);
  }
  setTimeout(tick, 2200);
}

/* ==================
   DRAG-TO-SCROLL
   ================== */
function initDragScroll() {
  const wrap = document.getElementById('proj-scroll');
  if (!wrap) return;
  let isDown = false, startX, scrollL;
  wrap.addEventListener('mousedown', e => { isDown = true; wrap.style.cursor = 'grabbing'; startX = e.pageX - wrap.offsetLeft; scrollL = wrap.scrollLeft; });
  wrap.addEventListener('mouseleave', () => { isDown = false; wrap.style.cursor = 'grab'; });
  wrap.addEventListener('mouseup', () => { isDown = false; wrap.style.cursor = 'grab'; });
  wrap.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); wrap.scrollLeft = scrollL - ((e.pageX - wrap.offsetLeft) - startX) * 1.5; });

  const left = document.getElementById('proj-left');
  const right = document.getElementById('proj-right');
  if (left) left.addEventListener('click', () => wrap.scrollBy({ left: -440, behavior: 'smooth' }));
  if (right) right.addEventListener('click', () => wrap.scrollBy({ left: 440, behavior: 'smooth' }));
}

/* ==================
   CARD GLOW + TILT
   ================== */
function initCardGlow() {
  document.querySelectorAll('.b-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });
}

function initCardTilt() {
  if (isMobile()) return;
  document.querySelectorAll('.b-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(800px) rotateX(${(y-0.5)*-6}deg) rotateY(${(x-0.5)*6}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/* ==================
   MAGNETIC BUTTONS
   ================== */
function initMagnetic() {
  if (isMobile()) return;
  document.querySelectorAll('.btn, .soc, .proj-arrow').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) * 0.25;
      const dy = (e.clientY - (r.top + r.height/2)) * 0.25;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ==================
   BUTTON RIPPLE
   ================== */
function initButtonRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.left = (e.clientX - r.left) + 'px';
      ripple.style.top = (e.clientY - r.top) + 'px';
      ripple.style.width = ripple.style.height = Math.max(r.width, r.height) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/* ==================
   COPY EMAIL + TOAST
   ================== */
function initCopyEmail() {
  document.querySelectorAll('.copy-email').forEach(el => {
    el.addEventListener('click', async e => {
      e.preventDefault();
      const toast = document.getElementById('toast');
      try { await navigator.clipboard.writeText('sultanalothale22@gmail.com'); }
      catch { /* fallback */ const ta = document.createElement('textarea'); ta.value = 'sultanalothale22@gmail.com'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
      if (toast) { toast.textContent = '✓  Email copied to clipboard'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); }
    });
  });
}

/* ==================
   BACK TO TOP + Progress Ring
   ================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  const ring = btn.querySelector('.ring-fill');
  const circ = 2 * Math.PI * 20;

  function update() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? y / h : 0;
    btn.classList.toggle('visible', y > 400);
    if (ring) ring.style.strokeDashoffset = circ * (1 - p);
  }
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ==================
   LIVE CLOCK
   ================== */
function initLiveClock() {
  const el = document.getElementById('live-clock');
  if (!el) return;
  function update() {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  update(); setInterval(update, 1000);
}

/* ==================
   SCROLL PROGRESS BAR (new)
   ================== */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  function update() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
}

/* ==================
   SIDE DOT NAVIGATION (new)
   ================== */
function initSideNav() {
  const nav = document.getElementById('side-nav');
  if (!nav || isMobile()) return;
  const dots = nav.querySelectorAll('.side-dot');
  const sections = Array.from(dots).map(d => document.querySelector(d.dataset.section));

  function update() {
    const y = window.scrollY + window.innerHeight / 2;
    let activeIdx = 0;
    sections.forEach((s, i) => {
      if (s && y >= s.offsetTop) activeIdx = i;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));
  }

  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();

  dots.forEach(d => {
    d.addEventListener('click', () => {
      const t = document.querySelector(d.dataset.section);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ==================
   COUNT-UP ANIMATION (new)
   ================== */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
}

function animateCount(el) {
  const target = el.dataset.count;
  const suffix = el.dataset.suffix || '';
  const isFloat = target.includes('.');
  const end = parseFloat(target);
  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * end;
    el.textContent = (isFloat ? current.toFixed(2) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ==================
   TEXT SCRAMBLE on hover (new)
   ================== */
function initTextScramble() {
  document.querySelectorAll('.scramble-hover').forEach(el => {
    const original = el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';
    let interval;

    el.addEventListener('mouseenter', () => {
      let iteration = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        el.textContent = original.split('').map((char, i) => {
          if (i < iteration) return original[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        if (iteration >= original.length) clearInterval(interval);
        iteration += 1/2;
      }, 30);
    });

    el.addEventListener('mouseleave', () => {
      clearInterval(interval);
      el.textContent = original;
    });
  });
}

/* ==================
   STAGGER TAGS (new)
   ================== */
function initStaggerTags() {
  document.querySelectorAll('.skill-tags, .proj-tags').forEach(container => {
    const tags = container.querySelectorAll('.tag');
    tags.forEach((tag, i) => {
      tag.style.opacity = '0';
      tag.style.transform = 'translateY(10px) scale(0.9)';
      tag.style.transition = `all 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`;
    });
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.tag').forEach(tag => {
          tag.style.opacity = '1';
          tag.style.transform = 'translateY(0) scale(1)';
        });
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-tags, .proj-tags').forEach(c => obs.observe(c));
}

/* ==================
   KEYBOARD NAV (new)
   ================== */
function initKeyboardNav() {
  const sections = ['#hero', '#about', '#experience', '#projects', '#skills', '#contact'];
  document.addEventListener('keydown', e => {
    // Don't capture if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Number keys 1-6 for section nav
    const num = parseInt(e.key);
    if (num >= 1 && num <= sections.length) {
      const t = document.querySelector(sections[num - 1]);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    }

    // 'T' to toggle back to top
    if (e.key === 't' || e.key === 'T') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ==================
   PARALLAX HERO (new)
   ================== */
function initParallaxHero() {
  if (isMobile()) return;
  const hero = document.querySelector('.hero-content');
  const blobs = document.querySelectorAll('.blob');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > window.innerHeight) return; // skip after hero

    // Hero content moves up slightly faster
    hero.style.transform = `translateY(${y * 0.15}px)`;
    hero.style.opacity = 1 - (y / (window.innerHeight * 0.8));

    // Blobs at different parallax speeds
    blobs.forEach((blob, i) => {
      const speed = 0.05 + i * 0.03;
      blob.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
}

/* ==================
   UTILITY
   ================== */
function isMobile() {
  return 'ontouchstart' in window || window.innerWidth <= 768;
}
