/* ═══════════════════════════════════════════════
   PORTFOLIO JAVASCRIPT — Erfan Hamzei
═══════════════════════════════════════════════ */

const qs  = s => document.querySelector(s);
const qsa = s => document.querySelectorAll(s);
const mob = () => window.innerWidth < 769;

/* ── LOADING SCREEN ── */
(function () {
  const loader = qs('#loader');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    loader.classList.add('out');
    document.body.style.overflow = '';
  }, 2850);
})();

/* ── CUSTOM CURSOR (desktop only) ── */
(function () {
  if (mob()) return;
  const glow = qs('#cursor-glow');
  const ring = qs('#cursor-ring');
  const dot  = qs('#cursor-dot');
  let gx = -999, gy = -999, rx = -999, ry = -999;

  document.addEventListener('mousemove', e => {
    gx = e.clientX; gy = e.clientY;
    glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
    dot.style.left  = gx + 'px'; dot.style.top  = gy + 'px';
  });

  (function animRing() {
    rx += (gx - rx) * 0.115; ry += (gy - ry) * 0.115;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  const hoverEls = qsa('a, button, .pcard, .acard, .clink, .chip, .stat-card, .tl-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '52px'; ring.style.height = '52px';
      ring.style.borderColor = 'rgba(0,255,136,0.5)';
      dot.style.transform = 'translate(-50%,-50%) scale(2)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = ''; ring.style.height = '';
      ring.style.borderColor = '';
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
})();

/* ── NAVBAR ── */
(function () {
  const nav  = qs('#nav');
  const hbg  = qs('#hbg');
  const menu = qs('#mob-menu');
  const mobs = qsa('#mob-menu .mob-l');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  hbg.addEventListener('click', () => {
    const open = hbg.classList.toggle('open');
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    hbg.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobs.forEach(a => a.addEventListener('click', () => {
    hbg.classList.remove('open');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    hbg.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  // Active section highlight
  const sections = qsa('section[id]');
  const navAs    = qsa('.nav-links a');
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navAs.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + id));
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => secObs.observe(s));
})();

/* ── NEURAL NETWORK CANVAS ── */
(function () {
  const canvas = qs('#neural');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];
  const COUNT = mob() ? 38 : 72;
  const DIST  = mob() ? 95 : 130;
  const SPEED = 0.28;
  const mouse = { x: -2000, y: -2000 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  for (let i = 0; i < COUNT; i++) {
    nodes.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r:  Math.random() * 1.8 + 0.8,
      phase: Math.random() * Math.PI * 2,
      ps:   0.008 + Math.random() * 0.012
    });
  }

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -2000; mouse.y = -2000; });

  function tick() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.phase += a.ps;

      // Mouse repulsion
      const mdx = a.x - mouse.x, mdy = a.y - mouse.y;
      const md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 170) {
        const f = (170 - md) / 170 * 0.55;
        a.vx += (mdx / md) * f;
        a.vy += (mdy / md) * f;
      }

      // Clamp speed
      const sp = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
      if (sp > 1.8) { a.vx = a.vx / sp * 1.8; a.vy = a.vy / sp * 1.8; }

      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;

      // Connections
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          const alpha = (1 - d / DIST) * 0.32;
          ctx.strokeStyle = `rgba(0,255,136,${alpha})`;
          ctx.lineWidth = 0.55;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const n of nodes) {
      const pulse = 0.5 + 0.5 * Math.sin(n.phase);
      const alpha = 0.22 + 0.52 * pulse;
      const rad   = n.r * (0.7 + 0.3 * pulse);
      ctx.beginPath();
      ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,136,${alpha})`;
      ctx.fill();
      if (pulse > 0.82) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${0.035 * pulse})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ── SCROLL REVEAL ── */
(function () {
  const els = qsa('.rv, .rvl, .rvr, .rvs');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseFloat(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('v'), delay);
      io.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();

/* ── STAGGERED GRID DELAYS ── */
(function () {
  ['.proj-grid', '.stats-grid', '.about-cards', '.sk-grid'].forEach(sel => {
    const parent = qs(sel);
    if (!parent) return;
    parent.querySelectorAll('.rv, .rvs').forEach((el, i) => {
      el.dataset.delay = i * 75;
    });
  });
})();

/* ── SKILL CHIP WAVE ── */
(function () {
  const cats = qsa('.sk-cat');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const chips = e.target.querySelectorAll('.chip');
      chips.forEach((c, i) => {
        setTimeout(() => {
          c.style.transition = `opacity 0.42s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms, transform 0.42s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms, color 0.2s ease, border-color 0.2s ease, background 0.2s ease`;
          c.classList.add('v');
        }, i * 45);
      });
      io.unobserve(e.target);
    });
  }, { threshold: 0.18 });
  cats.forEach(c => io.observe(c));
})();

/* ── COUNTER ANIMATION ── */
(function () {
  const cards = qsa('.stat-card');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target.querySelector('.cnt');
      const target = parseInt(e.target.dataset.target, 10);
      let start = null;
      const dur = 1400;
      const step = ts => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  cards.forEach(c => io.observe(c));
})();

/* ── TIMELINE LINE FILL ── */
(function () {
  const fill = qs('#tl-fill');
  const wrap = qs('.tl-wrap');
  if (!fill || !wrap) return;
  function update() {
    const r  = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    const p  = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.25)));
    fill.style.height = (p * 100) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── PROJECT CARD MOUSE GLOW ── */
(function () {
  qsa('.pcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });
})();

/* ── MAGNETIC BUTTONS ── */
(function () {
  if (mob()) return;
  qsa('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

/* ── SMOOTH HASH SCROLL ── */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const t = document.querySelector(a.getAttribute('href'));
  if (!t) return;
  e.preventDefault();
  t.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ═══════════════════════════════════════════════
   CONTACT FORM — EmailJS Integration
   ───────────────────────────────────────────────
   1. Sign up free at https://www.emailjs.com
   2. Add an Email Service (Gmail / Outlook / etc.)
   3. Create an Email Template — use these variables:
        {{from_name}}  {{from_email}}  {{subject}}  {{message}}
   4. Replace the three placeholders below.
═══════════════════════════════════════════════ */

(function () {
  const EJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← replace
  const EJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← replace
  const EJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← replace

  /* ── Init EmailJS ── */
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EJS_PUBLIC_KEY);
  }

  const form    = document.getElementById('form-contact');
  const btn     = document.getElementById('form-send-btn');
  const msgArea = document.getElementById('f-message');
  const charNum = document.getElementById('char-num');

  if (!form) return;

  /* ── Character counter ── */
  if (msgArea && charNum) {
    msgArea.addEventListener('input', () => {
      const len = msgArea.value.length;
      charNum.textContent = len;
      const cc = msgArea.closest('.inp-g').querySelector('.char-count');
      cc && cc.classList.toggle('near', len > 850);
    });
  }

  /* ── Field validation ── */
  function validateField(inp) {
    const g = inp.closest('.inp-g');
    if (!g) return true;
    let ok = inp.checkValidity();
    if (inp.type === 'email' && ok) {
      ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
    }
    g.classList.toggle('has-error', !ok && inp.value !== '');
    return ok;
  }

  form.querySelectorAll('input, textarea').forEach(inp => {
    inp.addEventListener('blur',  () => validateField(inp));
    inp.addEventListener('input', () => {
      if (inp.closest('.inp-g').classList.contains('has-error')) validateField(inp);
    });
  });

  /* ── Validate all on submit ── */
  function validateAll() {
    let allOk = true;
    form.querySelectorAll('input[required], textarea[required]').forEach(inp => {
      const g = inp.closest('.inp-g');
      const ok = inp.checkValidity() && inp.value.trim() !== '';
      if (!ok) { g.classList.add('has-error'); allOk = false; }
      else      { g.classList.remove('has-error'); }
    });
    return allOk;
  }

  /* ── Button state helper ── */
  function setState(state) {
    btn.classList.remove('sending', 'sent', 'errored');
    btn.disabled = false;
    if (state === 'sending') { btn.classList.add('sending'); btn.disabled = true; }
    if (state === 'sent')    { btn.classList.add('sent'); }
    if (state === 'error')   { btn.classList.add('errored'); }
  }

  /* ── Submit ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateAll()) return;

    setState('sending');

    if (typeof emailjs === 'undefined') {
      /* EmailJS not loaded — show config reminder */
      setTimeout(() => {
        setState('error');
        setTimeout(() => setState('idle'), 3500);
      }, 900);
      console.warn('EmailJS not loaded. Set your keys in script.js and include the EmailJS SDK in index.html.');
      return;
    }

    emailjs.sendForm(EJS_SERVICE_ID, EJS_TEMPLATE_ID, form)
      .then(() => {
        setState('sent');
        form.reset();
        if (charNum) charNum.textContent = '0';
        setTimeout(() => setState('idle'), 4000);
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        setState('error');
        setTimeout(() => setState('idle'), 4000);
      });
  });
})();
