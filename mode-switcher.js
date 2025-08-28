// mode-switcher.js - Permet de basculer entre les modes
class ModeSwitcher {
  constructor() {
    this.init();
  }

  init() {
    this.createModeToggle();
    this.checkCurrentMode();
  }

  createModeToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'mode-toggle';
    toggle.innerHTML = '🔄 Mode';
    toggle.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      padding: 10px 15px;
      background: rgba(184, 115, 51, 0.9);
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    `;

    toggle.addEventListener('mouseenter', () => {
      toggle.style.transform = 'scale(1.05)';
      toggle.style.background = 'rgba(184, 115, 51, 1)';
    });

    toggle.addEventListener('mouseleave', () => {
      toggle.style.transform = 'scale(1)';
      toggle.style.background = 'rgba(184, 115, 51, 0.9)';
    });

    toggle.addEventListener('click', () => this.toggleMode());

    document.body.appendChild(toggle);
  }

  checkCurrentMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === 'static') {
      this.showStaticMode();
    } else {
      this.showOptimizedMode();
    }
  }

  toggleMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentMode = urlParams.get('mode');

    if (currentMode === 'static') {
      urlParams.set('mode', 'optimized');
    } else {
      urlParams.set('mode', 'static');
    }

    window.location.search = urlParams.toString();
  }

  showStaticMode() {
    // Masquer les éléments générés par JS
    const particles = document.querySelectorAll('.particle');
    const shapes = document.querySelectorAll('.shape');

    particles.forEach(p => p.style.display = 'none');
    shapes.forEach(s => s.style.display = 'none');

    // Afficher les éléments statiques
    this.showStaticElements();

    this.updateToggleText('Mode Statique');
  }

  showOptimizedMode() {
    // Les éléments sont déjà générés par layout.js et content.js
    this.updateToggleText('Mode Optimisé');
  }

  showStaticElements() {
    // Recréer les éléments statiques pour la démonstration
    const staticParticles = [
      { left: '10%', delay: 0 },
      { left: '20%', delay: 2 },
      { left: '30%', delay: 4 },
      { left: '40%', delay: 6 },
      { left: '50%', delay: 8 },
      { left: '60%', delay: 10 },
      { left: '70%', delay: 12 },
      { left: '80%', delay: 14 },
      { left: '90%', delay: 16 }
    ];

    staticParticles.forEach(config => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = config.left;
      particle.style.animationDelay = `${config.delay}s`;
      document.body.appendChild(particle);
    });

    const staticShapes = [
      { type: 'triangle', top: '20%', left: '15%' },
      { type: 'circle', top: '60%', right: '20%' },
      { type: 'square', top: '40%', left: '70%' },
      { type: 'triangle', top: '80%', right: '10%' },
      { type: 'circle', top: '30%', left: '5%' }
    ];

    staticShapes.forEach(config => {
      const shape = document.createElement('div');
      shape.className = `shape ${config.type}`;
      shape.style.top = config.top;
      if (config.left) shape.style.left = config.left;
      if (config.right) shape.style.right = config.right;
      document.body.appendChild(shape);
    });
  }

  updateToggleText(text) {
    const toggle = document.getElementById('mode-toggle');
    if (toggle) {
      toggle.innerHTML = `🔄 ${text}`;
    }
  }
}

// Initialiser le mode switcher
document.addEventListener('DOMContentLoaded', () => {
  new ModeSwitcher();
});
