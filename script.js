/* ============================================================
   A Jornada · interações
   ============================================================ */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Ano no rodapé ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   PLAYER DE MÚSICA — duas faixas, play/parar + trocar
   ============================================================ */
const TRACKS = [
  { src: 'audio/middle-earth.mp3',    name: 'Canto da Estrada' },
  { src: 'audio/finding-mithril.mp3', name: 'O Veio Perdido' }
];
const audio      = document.getElementById('bgAudio');
const player     = document.getElementById('player');
const playToggle = document.getElementById('playToggle');
const trackSwap  = document.getElementById('trackSwap');
const trackName  = document.getElementById('trackName');
let current = 0;

function loadTrack(i, autoplay) {
  current = (i + TRACKS.length) % TRACKS.length;
  audio.src = TRACKS[current].src;
  trackName.textContent = TRACKS[current].name;
  if (autoplay) play();
}
function play() {
  audio.play().then(() => {
    player.classList.add('playing');
    playToggle.setAttribute('aria-label', 'Parar a música');
  }).catch(() => player.classList.remove('playing'));
}
function stop() {
  audio.pause();
  player.classList.remove('playing');
  playToggle.setAttribute('aria-label', 'Tocar a música');
}
playToggle.addEventListener('click', () => {
  if (audio.paused) { if (!audio.src) loadTrack(0, false); play(); }
  else stop();
});
trackSwap.addEventListener('click', () => {
  const wasPlaying = !audio.paused;
  loadTrack(current + 1, wasPlaying);
});
loadTrack(0, false);

// inicia a trilha no primeiro gesto do usuário (política de autoplay)
let triedAutoStart = false;
function autoStartOnce() {
  if (triedAutoStart) return;
  triedAutoStart = true;
  if (audio.paused && !player.contains(document.activeElement)) play();
  window.removeEventListener('pointerdown', autoStartOnce);
  window.removeEventListener('keydown', autoStartOnce);
  window.removeEventListener('wheel', autoStartOnce);
}
window.addEventListener('pointerdown', autoStartOnce);
window.addEventListener('keydown', autoStartOnce);
window.addEventListener('wheel', autoStartOnce, { passive: true });

/* ============================================================
   HERO — título acende letra a letra + typewriter
   ============================================================ */
const letters = document.querySelectorAll('#heroTitle span');
letters.forEach((s, i) => {
  if (prefersReduced) { s.classList.add('lit'); return; }
  setTimeout(() => s.classList.add('lit'), 250 + i * 110);
});

const typed = document.getElementById('typed');
const PHRASE = ' Desce por ela e conhecerás a minha busca — algoritmos, lógica e teimosia.';
if (prefersReduced) {
  typed.textContent = PHRASE;
} else {
  let ci = 0;
  const startDelay = 250 + letters.length * 110 + 300;
  setTimeout(function typeStep() {
    typed.textContent = PHRASE.slice(0, ci++);
    if (ci <= PHRASE.length) setTimeout(typeStep, 32);
  }, startDelay);
}

/* ============================================================
   BARRA DE PROGRESSO
   ============================================================ */
const progressBar = document.getElementById('progressBar');
function updateProgress() {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
  progressBar.style.width = (scrolled * 100).toFixed(2) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ============================================================
   MENU DE RUNAS + destaque de capítulo
   ============================================================ */
const runeNav = document.getElementById('runeNav');
const estrada = document.getElementById('estrada');
new IntersectionObserver(([entry]) => {
  runeNav.classList.toggle('visible', !entry.isIntersecting);
}, { threshold: 0.3 }).observe(estrada);

const navLinks = runeNav.querySelectorAll('a');
document.querySelectorAll('.chapter[id]').forEach(c => {
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { threshold: 0.5 }).observe(c);
});

/* ============================================================
   PARALLAX + brilho do cursor + estrela cadente
   ============================================================ */
const cursorGlow = document.getElementById('cursorGlow');
if (!prefersReduced) {
  // parallax
  const layers = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    layers.forEach(l => {
      const speed = parseFloat(l.dataset.speed) || 0.2;
      l.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });

  // brilho que segue o mouse
  window.addEventListener('pointermove', (e) => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  window.addEventListener('pointerleave', () => cursorGlow.style.opacity = '0');

  // estrela cadente de tempos em tempos
  const star = document.getElementById('shootingStar');
  function shoot() {
    star.style.top = (Math.random() * 40 + 2) + '%';
    star.classList.remove('shoot');
    void star.offsetWidth;        // reinicia a animação
    star.classList.add('shoot');
    setTimeout(shoot, 6000 + Math.random() * 9000);
  }
  setTimeout(shoot, 3000);
}

/* ============================================================
   TILT 3D + reflexo nos cards do Arsenal
   ============================================================ */
if (!prefersReduced) {
  document.querySelectorAll('.relic.tilt').forEach(card => {
    const sheen = card.querySelector('.relic-sheen');
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(800px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 8}deg) translateY(-6px)`;
      if (sheen) { sheen.style.setProperty('--mx', px * 100 + '%'); sheen.style.setProperty('--my', py * 100 + '%'); }
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

/* ============================================================
   REVEAL + barras de skill + contador de porcentagem
   ============================================================ */
const revealTargets = document.querySelectorAll(
  '.chapter-banner, .portal-layout, .descent-step, .relic, .rune-skill, .contact-form, .footer-quote'
);
revealTargets.forEach(el => el.classList.add('reveal'));

function countUp(el, to) {
  const dur = 1400; const start = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(p * to) + '%';
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const bar = entry.target.querySelector?.('.rune-bar');
      if (bar) bar.classList.add('animate');
      const pct = entry.target.querySelector?.('.pct[data-to]');
      if (pct) countUp(pct, parseInt(pct.dataset.to, 10));
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

if (prefersReduced) {
  revealTargets.forEach(el => el.classList.add('visible'));
  document.querySelectorAll('.rune-bar').forEach(b => b.classList.add('animate'));
  document.querySelectorAll('.pct[data-to]').forEach(p => p.textContent = p.dataset.to + '%');
} else {
  revealTargets.forEach(el => io.observe(el));
}

/* ============================================================
   VALIDAÇÃO DO FORMULÁRIO
   ============================================================ */
const form = document.getElementById('contactForm');
const formStatusEl = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('input, textarea').forEach(f => {
    const wrap = f.closest('.field');
    const ok = f.checkValidity() && f.value.trim() !== '';
    wrap.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    formStatusEl.style.color = 'var(--ember)';
    formStatusEl.textContent = '✖ A mensagem não pode seguir com pergaminhos em branco.';
    return;
  }
  const nome = form.nome.value.trim().split(' ')[0];
  formStatusEl.style.color = 'var(--gold)';
  formStatusEl.textContent = `✦ A mensagem foi selada, ${nome}. Ela parte ao anoitecer. ✦`;
  form.reset();
});

/* ============================================================
   FUNDO DE BRASAS
   ============================================================ */
(function embers() {
  if (prefersReduced) return;
  const canvas = document.getElementById('embers');
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = Array.from({ length: Math.min(90, Math.floor(w / 18)) }, spawn);
  }
  function spawn() {
    return { x: Math.random()*w, y: h+Math.random()*h, r: Math.random()*2+0.6,
      vy: Math.random()*0.6+0.2, vx: (Math.random()-0.5)*0.4, life: Math.random(),
      hue: Math.random() > 0.5 ? 42 : 20 };
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.y -= p.vy; p.x += p.vx + Math.sin(p.y*0.01)*0.3; p.life += 0.004;
      if (p.y < -10) Object.assign(p, spawn(), { y: h+10 });
      const alpha = 0.5 + Math.sin(p.life*Math.PI)*0.4;
      const light = p.hue === 42 ? '201,162,39' : '212,84,30';
      ctx.beginPath(); ctx.fillStyle = `rgba(${light},${alpha.toFixed(2)})`;
      ctx.shadowBlur = 10; ctx.shadowColor = `rgba(${light},0.8)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    }
    ctx.shadowBlur = 0; requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resize); resize(); tick();
})();
