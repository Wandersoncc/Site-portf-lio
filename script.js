/* ============================================================
   A Jornada · interações
   ============================================================ */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Ano no rodapé ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   PLAYER DE MÚSICA
   Duas faixas livres de direitos (Pixabay). Play/parar + trocar.
   ============================================================ */
const TRACKS = [
  { src: 'audio/middle-earth.mp3',   name: 'A Terra-média' },
  { src: 'audio/finding-mithril.mp3', name: 'Em Busca da Mithril' }
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
  }).catch(() => {
    // navegador bloqueou autoplay; o usuário precisa clicar
    player.classList.remove('playing');
  });
}

function stop() {
  audio.pause();
  player.classList.remove('playing');
  playToggle.setAttribute('aria-label', 'Tocar a música');
}

playToggle.addEventListener('click', () => {
  if (audio.paused) {
    if (!audio.src) loadTrack(0, false);
    play();
  } else {
    stop();
  }
});

trackSwap.addEventListener('click', () => {
  const wasPlaying = !audio.paused;
  loadTrack(current + 1, wasPlaying);
  if (!wasPlaying) trackName.textContent = TRACKS[current].name;
});

// prepara a primeira faixa sem tocar (respeita a política de autoplay)
loadTrack(0, false);

// tenta iniciar a música no primeiro gesto do usuário (clique/tecla/scroll)
let triedAutoStart = false;
function autoStartOnce() {
  if (triedAutoStart) return;
  triedAutoStart = true;
  // só inicia se o usuário ainda não interagiu com o player
  if (audio.paused && !player.contains(document.activeElement)) play();
  window.removeEventListener('pointerdown', autoStartOnce);
  window.removeEventListener('keydown', autoStartOnce);
  window.removeEventListener('wheel', autoStartOnce);
}
window.addEventListener('pointerdown', autoStartOnce);
window.addEventListener('keydown', autoStartOnce);
window.addEventListener('wheel', autoStartOnce, { passive: true });

/* ============================================================
   BARRA DE PROGRESSO DA JORNADA
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
   MENU DE RUNAS — aparece após o 1º capítulo (meio-termo)
   ============================================================ */
const runeNav = document.getElementById('runeNav');
const estrada = document.getElementById('estrada');

const navVisObserver = new IntersectionObserver(([entry]) => {
  // mostra o menu quando a seção "A Estrada" sai da tela
  runeNav.classList.toggle('visible', !entry.isIntersecting);
}, { threshold: 0.3 });
navVisObserver.observe(estrada);

// destaca a runa do capítulo atual
const chapters = document.querySelectorAll('.chapter[id]');
const navLinks = runeNav.querySelectorAll('a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { threshold: 0.5 });
chapters.forEach(c => activeObserver.observe(c));

/* ============================================================
   PARALLAX no hero
   ============================================================ */
if (!prefersReduced) {
  const layers = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    layers.forEach(l => {
      const speed = parseFloat(l.dataset.speed) || 0.2;
      l.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
}

/* ============================================================
   REVEAL ao rolar + animação das barras de skill
   ============================================================ */
const revealTargets = document.querySelectorAll(
  '.chapter-banner, .portal-layout, .descent-step, .relic, .rune-skill, .contact-form, .footer-art'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelector?.('.rune-bar')?.classList.add('animate');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

if (prefersReduced) {
  revealTargets.forEach(el => el.classList.add('visible'));
  document.querySelectorAll('.rune-bar').forEach(b => b.classList.add('animate'));
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
    formStatusEl.textContent = '✖ O corvo não pode voar com pergaminhos em branco.';
    return;
  }
  const nome = form.nome.value.trim().split(' ')[0];
  formStatusEl.style.color = 'var(--gold)';
  formStatusEl.textContent = `✦ A mensagem foi selada, ${nome}. O corvo parte ao anoitecer. ✦`;
  form.reset();
});

/* ============================================================
   FUNDO DE BRASAS (canvas)
   ============================================================ */
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
      x: Math.random() * w, y: h + Math.random() * h,
      r: Math.random() * 2 + 0.6, vy: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.4, life: Math.random(),
      hue: Math.random() > 0.5 ? 42 : 20
    };
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.y -= p.vy; p.x += p.vx + Math.sin(p.y * 0.01) * 0.3; p.life += 0.004;
      if (p.y < -10) Object.assign(p, spawn(), { y: h + 10 });
      const alpha = 0.5 + Math.sin(p.life * Math.PI) * 0.4;
      const light = p.hue === 42 ? '201,162,39' : '212,84,30';
      ctx.beginPath();
      ctx.fillStyle = `rgba(${light},${alpha.toFixed(2)})`;
      ctx.shadowBlur = 10; ctx.shadowColor = `rgba(${light},0.8)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resize);
  resize(); tick();
})();
