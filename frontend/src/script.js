/* ===========================
   CYBERPUNK PORTFOLIO - SCRIPT
   =========================== */

/* ====== TERMINAL INTRO ====== */
(function runTerminal() {
  const body = document.getElementById('terminal-body');
  const overlay = document.getElementById('terminal-overlay');
  if (!body || !overlay) return;

  const lines = [
    { delay: 0,    type: 'cmd',  text: 'sudo ./boot_portfolio.sh' },
    { delay: 400,  type: 'out',  text: '[  OK  ] Initializing kernel modules...' },
    { delay: 700,  type: 'out',  text: '[  OK  ] Loading cyberpunk UI layer...' },
    { delay: 1050, type: 'out',  text: '[  OK  ] Mounting file systems...' },
    { delay: 1350, type: 'out',  text: '[  OK  ] Establishing secure connection...' },
    { delay: 1650, type: 'out',  text: '[  OK  ] Decrypting identity: RADJI Massiatou' },
    { delay: 1950, type: 'out',  text: '[  OK  ] Loading modules: HTML · CSS · JS · Python · SQL · C' },
    { delay: 2250, type: 'out',  text: '[  OK  ] All systems nominal.' },
    { delay: 2600, type: 'cmd',  text: 'echo "Welcome to the Matrix"' },
    { delay: 2900, type: 'green', text: '>>> Welcome to the Matrix <<<' },
    { delay: 3200, type: 'green', text: '>>> System ready. Launching portfolio...' },
  ];

  let printed = 0;

  lines.forEach(({ delay, type, text }) => {
    setTimeout(() => {
      const span = document.createElement('span');
      span.className = 'terminal-line';

      if (type === 'cmd') {
        span.innerHTML = `<span class="prompt">massiatou@hacker:~$ </span><span class="cmd">${text}</span>`;
      } else if (type === 'out') {
        span.innerHTML = `<span class="out">${text}</span>`;
      } else if (type === 'green') {
        span.innerHTML = `<span style="color:#b400ff;font-weight:bold">${text}</span>`;
      } else if (type === 'err') {
        span.innerHTML = `<span class="err">${text}</span>`;
      }

      body.appendChild(span);
      body.scrollTop = body.scrollHeight;
      printed++;

      if (printed === lines.length) {
        setTimeout(() => {
          overlay.classList.add('hidden');
          document.body.style.overflow = '';
          initAnimations();
        }, 700);
      }
    }, delay);
  });

  document.body.style.overflow = 'hidden';
})();

/* ====== TYPING EFFECT ====== */
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Software Engineer in Training',
    'System Architecture Enthusiast',
    'Problem Solver & Builder',
    'Passionate Coder',
    'Basketball Player & Singer',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pause = false;

  function tick() {
    if (pause) { setTimeout(tick, 1200); pause = false; return; }

    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; pause = true; }
      setTimeout(tick, 75);
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        pause = true;
      }
      setTimeout(tick, 35);
    }
  }

  tick();
}

/* ====== PARTICLE CANVAS ====== */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  const PARTICLE_COUNT = Math.min(60, Math.floor(W * H / 20000));
  const particles = [];

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedY = -(Math.random() * 0.5 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.5 ? '#b400ff' : '#00ff88';
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
  });
}

/* ====== NAVBAR ====== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  toggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Active link highlight
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if (active) {
            active.style.color = 'var(--neon)';
            active.style.textShadow = '0 0 8px var(--neon-glow)';
          }
        } else {
          const link = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if (link) { link.style.color = ''; link.style.textShadow = ''; }
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => observer.observe(s));
}

/* ====== SCROLL REVEAL ====== */
function initReveal() {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-child, .skill-card, .passion-card').forEach(el => {
    revealObserver.observe(el);
  });
}

/* ====== CONTACT FORM ====== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<span class="btn-icon">&#9203;</span> Transmission en cours...';
    btn.disabled = true;
    status.className = 'form-status';
    status.textContent = '';

    const data = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      message: form.querySelector('#message').value.trim(),
    };

    try {
      const apiBase = typeof __API_URL__ !== 'undefined' ? __API_URL__ : '';
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.ok) {
        status.className = 'form-status success';
        status.textContent = '>> Message envoyé avec succès ! Je vous répondrai très bientôt.';
        form.reset();
      } else {
        status.className = 'form-status error';
        status.textContent = `>> Erreur : ${json.error || 'Échec de l\'envoi. Veuillez réessayer.'}`;
      }
    } catch {
      status.className = 'form-status error';
      status.textContent = '>> Erreur réseau. Vérifiez votre connexion et réessayez.';
    } finally {
      btn.innerHTML = original;
      btn.disabled = false;
      setTimeout(() => { status.className = 'form-status'; status.textContent = ''; }, 6000);
    }
  });
}

/* ====== SMOOTH SCROLL ====== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ====== CURSOR GLOW (desktop) ====== */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;width:300px;height:300px;pointer-events:none;
    border-radius:50%;background:radial-gradient(circle,rgba(180,0,255,0.06) 0%,transparent 70%);
    transform:translate(-50%,-50%);z-index:0;transition:opacity .3s;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ====== INIT ====== */
function initAnimations() {
  initTyping();
  initParticles();
  initNavbar();
  initReveal();
  initContactForm();
  initSmoothScroll();
  initCursorGlow();
}
