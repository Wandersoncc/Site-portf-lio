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
   HERO — typewriter da frase de abertura
   ============================================================ */
const typed = document.getElementById('typed');
const PHRASE = ' Desce por ela e conhecerás a minha busca — algoritmos, lógica e teimosia.';
if (prefersReduced) {
  typed.textContent = PHRASE;
} else {
  let ci = 0;
  setTimeout(function typeStep() {
    typed.textContent = PHRASE.slice(0, ci++);
    if (ci <= PHRASE.length) setTimeout(typeStep, 32);
  }, 1400);   // começa após os portões abrirem
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

/* ============================================================
   NOVAS INTERAÇÕES E ELEMENTOS VISUAIS
   ============================================================ */

/* ---------- Preloader: abre os portões ---------- */
(function preloader() {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  if (prefersReduced) { pre.style.display = 'none'; return; }
  const open = () => { pre.classList.add('done'); setTimeout(() => pre.remove(), 1300); };
  if (document.readyState === 'complete') setTimeout(open, 600);
  else window.addEventListener('load', () => setTimeout(open, 600));
  // garante remoção mesmo se 'load' demorar
  setTimeout(open, 3500);
})();

/* ---------- Spotlight que segue o mouse ---------- */
const spotlight = document.getElementById('spotlight');
if (spotlight && !prefersReduced) {
  window.addEventListener('pointermove', (e) => {
    spotlight.style.setProperty('--sx', e.clientX + 'px');
    spotlight.style.setProperty('--sy', e.clientY + 'px');
  }, { passive: true });
}

/* ---------- HUD: nível e XP conforme a rolagem ---------- */
const hud = document.getElementById('hud');
const hudXp = document.getElementById('hudXp');
const hudLvl = document.getElementById('hudLvl');
function updateHud() {
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);   // 0..1
  if (hud) hud.classList.toggle('visible', h.scrollTop > 120);
  const level = Math.min(5, Math.floor(p * 5) + 1);
  const within = (p * 5) % 1;                                        // progresso no nível
  if (hudXp) hudXp.style.width = (within * 100).toFixed(0) + '%';
  if (hudLvl) hudLvl.textContent = 'Nv ' + level;
}
window.addEventListener('scroll', updateHud, { passive: true });
updateHud();

/* ---------- Cards que viram (clique/toque/teclado) ---------- */
document.querySelectorAll('.relic').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
  });
});

/* ---------- Dragão interativo: faíscas + rugido ---------- */
function spawnSpark(x, y) {
  const s = document.createElement('div');
  s.className = 'spark';
  s.style.left = x + 'px'; s.style.top = y + 'px';
  document.body.appendChild(s);
  const ang = Math.random() * Math.PI * 2;
  const dist = 20 + Math.random() * 50;
  const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 30;
  s.animate([
    { transform: 'translate(0,0) scale(1)', opacity: 1 },
    { transform: `translate(${dx}px,${dy}px) scale(0)`, opacity: 0 }
  ], { duration: 600 + Math.random() * 400, easing: 'cubic-bezier(.2,.7,.2,1)' })
   .onfinish = () => s.remove();
}
const dragonScene = document.querySelector('.scene-band-dragon');
if (dragonScene && !prefersReduced) {
  let last = 0;
  dragonScene.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - last > 50) { spawnSpark(e.clientX, e.clientY); last = now; }
  });
  dragonScene.addEventListener('click', (e) => {
    for (let i = 0; i < 20; i++) setTimeout(() => spawnSpark(e.clientX + (Math.random()-.5)*80, e.clientY + (Math.random()-.5)*50), i * 18);
    unlock('Dragão Desperto', 'Tu acordaste a besta adormecida');
  });
}

/* ---------- Toast de conquista ---------- */
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastSub = document.getElementById('toastSub');
const unlocked = new Set();
let toastTimer;
function unlock(title, sub) {
  if (!toast || unlocked.has(title)) return;
  unlocked.add(title);
  toastTitle.textContent = title;
  toastSub.textContent = sub || '';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}
// conquista ao chegar em cada capítulo
const chapterAchievements = {
  limiar:  ['Limiar Cruzado', 'Deste o primeiro passo'],
  descida: ['Nas Profundezas', 'Desceste à caverna do saber'],
  arsenal: ['Guardião do Arsenal', 'Encontraste as relíquias'],
  bosque:  ['Sábio do Bosque', 'Colheste o conhecimento'],
  portao:  ['Fim da Estrada', 'Chegaste ao Grande Portão']
};
document.querySelectorAll('.chapter[id]').forEach(c => {
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && chapterAchievements[e.target.id]) {
        const [t, s] = chapterAchievements[e.target.id];
        unlock(t, s);
      }
    });
  }, { threshold: 0.55 }).observe(c);
});

/* ---------- Botão voltar ao topo ---------- */
const toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', () => toTop.classList.toggle('visible', window.scrollY > 600), { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));
}

/* ---------- Easter egg: Konami Code → modo dragão ---------- */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kseq = [];
window.addEventListener('keydown', (e) => {
  kseq.push(e.key); kseq = kseq.slice(-KONAMI.length);
  if (KONAMI.every((k, i) => k === kseq[i])) {
    document.body.classList.toggle('dragon-mode');
    unlock('Código Secreto!', 'Modo Dragão ' + (document.body.classList.contains('dragon-mode') ? 'ativado' : 'desativado'));
  }
});

/* ---------- Poeira dourada flutuante (canvas) ---------- */
(function dust() {
  if (prefersReduced) return;
  const canvas = document.getElementById('dust');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, motes;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    motes = Array.from({ length: Math.min(50, Math.floor(w / 30)) }, () => ({
      x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.4+0.4,
      vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25,
      a: Math.random()*0.5+0.2, tw: Math.random()*Math.PI*2
    }));
  }
  function tick() {
    ctx.clearRect(0,0,w,h);
    for (const m of motes) {
      m.x += m.vx; m.y += m.vy; m.tw += 0.03;
      if (m.x < 0) m.x = w; if (m.x > w) m.x = 0;
      if (m.y < 0) m.y = h; if (m.y > h) m.y = 0;
      const alpha = (m.a + Math.sin(m.tw)*0.2).toFixed(2);
      ctx.beginPath(); ctx.fillStyle = `rgba(240,208,96,${alpha})`;
      ctx.shadowBlur = 6; ctx.shadowColor = 'rgba(240,208,96,.6)';
      ctx.arc(m.x, m.y, m.r, 0, Math.PI*2); ctx.fill();
    }
    ctx.shadowBlur = 0; requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resize); resize(); tick();
})();

/* ============================================================
   CENAS ASCII — ajusta o tamanho da fonte para preencher a
   largura do contêiner (sem rolagem horizontal, responsivo)
   ============================================================ */
(function sceneBands() {
  const bands = document.querySelectorAll('.scene-band');
  if (!bands.length) return;
  const CHAR_W = 0.60;   // largura do glifo monospace ≈ 0.6em

  function fit(pre) {
    const cols = pre.dataset.cols | 0;
    if (!cols) return;
    const w = pre.parentElement.clientWidth;        // = 100vw
    pre.style.fontSize = (w / (cols * CHAR_W)) + 'px';
  }

  function fitAll() { bands.forEach(b => { const p = b.querySelector('.ascii-scene'); if (p.dataset.cols) fit(p); }); }

  // carrega cada fragmento colorido sob demanda ao se aproximar da viewport
  const loadObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const band = entry.target;
      obs.unobserve(band);
      const pre = band.querySelector('.ascii-scene');
      fetch(band.dataset.scene)
        .then(r => r.ok ? r.text() : Promise.reject(r.status))
        .then(htmlFrag => {
          pre.innerHTML = htmlFrag;
          // conta colunas pela maior linha (sem contar as tags)
          let cols = 0;
          htmlFrag.split('\n').forEach(line => {
            const plain = line.replace(/<[^>]*>/g, '');
            if (plain.length > cols) cols = plain.length;
          });
          pre.dataset.cols = cols;
          fit(pre);
          band.classList.add('loaded');
        })
        .catch(() => { band.style.display = 'none'; });   // falha silenciosa
    });
  }, { rootMargin: '300px 0px' });

  bands.forEach(b => loadObserver.observe(b));
  window.addEventListener('resize', fitAll, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
})();
