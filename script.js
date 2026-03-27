// ─── NAVBAR ────────────────────────────────────────────
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

burger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  burger.classList.toggle('active');
  mobileNav.setAttribute('aria-hidden', !isOpen);
});

// Cerrar menú al hacer click en un link
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileNav.classList.remove('open');
  });
});

// ─── TABS (KITS) ────────────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('tab-panel--active'));

    tab.classList.add('tab--active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById('tab-' + target).classList.add('tab-panel--active');

    // re-trigger fade-up animations in new panel
    document.querySelectorAll('#tab-' + target + ' .fade-up').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });
  });
});

// ─── SIMULADOR ────────────────────────────────────────
const simTipo     = document.getElementById('sim-tipo');
const simCantidad = document.getElementById('sim-cantidad');
const simResult   = document.getElementById('sim-result');
const simKitName  = document.getElementById('sim-kit-name');
const simKitDesc  = document.getElementById('sim-kit-desc');
const simWpBtn    = document.getElementById('sim-wp-btn');

const kitsData = {
  'casa': {
    '1-4':  { nombre: 'Kit Básico para Casa', desc: '4 cámaras HD + DVR 4 canales + disco 1TB.', msg: 'Hola%2C+quiero+el+Kit+B%C3%A1sico+para+casa+%284+c%C3%A1maras%29' },
    '5-8':  { nombre: 'Kit Estándar para Casa', desc: '8 cámaras HD + DVR 8 canales + disco 2TB + alertas.', msg: 'Hola%2C+quiero+el+Kit+Est%C3%A1ndar+para+casa+%288+c%C3%A1maras%29' },
    '9-16': { nombre: 'Kit Pro para Casa', desc: '12–16 cámaras 4K + NVR + monitor 27" incluido.', msg: 'Hola%2C+quiero+el+Kit+Pro+para+casa' },
    '17+':  { nombre: 'Sistema Personalizado', desc: 'Para tu caso necesitamos hacer un relevamiento. ¡Consultanos!', msg: 'Hola%2C+necesito+un+sistema+personalizado' }
  },
  'negocio': {
    '1-4':  { nombre: 'Kit Básico Comercio', desc: '4 cámaras HD + DVR + disco 1TB + acceso remoto.', msg: 'Hola%2C+quiero+el+Kit+B%C3%A1sico+para+comercio' },
    '5-8':  { nombre: 'Kit Negocio Pro', desc: '8 cámaras HD + DVR + monitor + grabación 24/7.', msg: 'Hola%2C+quiero+el+Kit+Negocio+Pro' },
    '9-16': { nombre: 'Kit Pro Comercio', desc: '16 cámaras 4K + NVR + IA detección de personas.', msg: 'Hola%2C+quiero+el+Kit+Pro+para+comercio' },
    '17+':  { nombre: 'Sistema Personalizado', desc: 'Para tu caso necesitamos hacer un relevamiento. ¡Consultanos!', msg: 'Hola%2C+necesito+un+sistema+personalizado+para+comercio' }
  },
  'deposito': {
    '1-4':  { nombre: 'Kit Estándar Depósito', desc: '4 cámaras 4K + NVR + visión nocturna 40m.', msg: 'Hola%2C+quiero+el+Kit+Est%C3%A1ndar+para+dep%C3%B3sito' },
    '5-8':  { nombre: 'Kit Pro Industrial', desc: '8 cámaras 4K + NVR + disco 4TB + UPS incluido.', msg: 'Hola%2C+quiero+el+Kit+Pro+Industrial' },
    '9-16': { nombre: 'Sistema Personalizado', desc: '16 cámaras 4K + NVR alta capacidad + IA.', msg: 'Hola%2C+necesito+un+sistema+personalizado+para+dep%C3%B3sito' },
    '17+':  { nombre: 'Sistema Personalizado', desc: 'Para tu caso necesitamos hacer un relevamiento. ¡Consultanos!', msg: 'Hola%2C+necesito+un+sistema+grande+para+dep%C3%B3sito' }
  }
};

function updateSimulator() {
  const tipo     = simTipo.value;
  const cantidad = simCantidad.value;
  if (!tipo || !cantidad) { simResult.classList.remove('visible'); return; }

  const kit = kitsData[tipo]?.[cantidad];
  if (!kit) return;

  simKitName.textContent = kit.nombre;
  simKitDesc.textContent = kit.desc;
  simWpBtn.href = 'https://wa.me/5491171157353?text=' + kit.msg;
  simResult.classList.add('visible');
}

simTipo.addEventListener('change', updateSimulator);
simCantidad.addEventListener('change', updateSimulator);

// ─── CONTADORES ────────────────────────────────────────
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ─── FADE UP + COUNTERS (Intersection Observer) ────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Activar contadores dentro del elemento
      entry.target.querySelectorAll('.counter').forEach(animateCounter);

      // Si el propio elemento es un counter
      if (entry.target.classList.contains('counter')) {
        animateCounter(entry.target);
      }

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
document.querySelectorAll('.counter').forEach(el => observer.observe(el));

// ─── ACTIVE TAB KITS: activar fade-up inicial ──────────
document.querySelectorAll('#tab-casa .fade-up').forEach(el => {
  setTimeout(() => observer.observe(el), 100);
});
