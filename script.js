/* ============================================================
   Portfólio Medieval · interações
   ============================================================ */

/* ---------- Ano no rodapé ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Menu mobile ---------- */
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
// fecha o menu ao clicar num link
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  })
);

/* ---------- Reveal ao rolar + barras de skill ---------- */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealTargets = document.querySelectorAll(
  '.section, .about, .timeline-item, .project-card, .skill, .contact-form, .footer'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // anima barras de skill quando a seção aparece
      entry.target.querySelectorAll?.('.skill-bar').forEach(bar => bar.classList.add('animate'));
      if (entry.target.classList.contains('skill')) {
        entry.target.querySelector('.skill-bar')?.classList.add('animate');
      }
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

if (prefersReduced) {
  revealTargets.forEach(el => el.classList.add('visible'));
  document.querySelectorAll('.skill-bar').forEach(b => b.classList.add('animate'));
} else {
  revealTargets.forEach(el => io.observe(el));
}

/* ---------- Validação do formulário ---------- */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const fields = form.querySelectorAll('input, textarea');
  fields.forEach(f => {
    const wrap = f.closest('.field');
    const ok = f.checkValidity() && f.value.trim() !== '';
    wrap.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    status.style.color = 'var(--ember)';
    status.textContent = '✖ O corvo não pode voar com pergaminhos em branco.';
    return;
  }

  const nome = form.nome.value.trim().split(' ')[0];
  status.style.color = 'var(--gold)';
  status.textContent = `✦ A mensagem foi selada, ${nome}. O corvo parte ao anoitecer. ✦`;
  form.reset();
});

/* ---------- Fundo de brasas (canvas) ---------- */
(function embers() {
  if (prefersReduced) return;
  const canvas = document.getElementById('embers');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor(w / 18));
    particles = Array.from({ length: count }, spawn);
  }

  function spawn() {
    return {
      x: Math.random() * w,
      y: h + Math.random() * h,
      r: Math.random() * 2 + 0.6,
      vy: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      life: Math.random(),
      hue: Math.random() > 0.5 ? 42 : 20 // dourado ou brasa
    };
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.y -= p.vy;
      p.x += p.vx + Math.sin(p.y * 0.01) * 0.3;
      p.life += 0.004;
      if (p.y < -10) Object.assign(p, spawn(), { y: h + 10 });

      const alpha = 0.5 + Math.sin(p.life * Math.PI) * 0.4;
      const light = p.hue === 42 ? '201,162,39' : '212,84,30';
      ctx.beginPath();
      ctx.fillStyle = `rgba(${light},${alpha.toFixed(2)})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${light},0.8)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();
  tick();
})();
