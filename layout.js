// layout.js - Système de génération automatique du layout
class LayoutManager {
  constructor() {
    this.particles = [];
    this.shapes = [];
    this.init();
  }

  init() {
    this.generateParticles();
    this.generateShapes();
    this.optimizeForMobile();
  }

  generateParticles() {
    const particleConfigs = [
      { count: 8, left: '10%', delay: 0 },
      { count: 8, left: '20%', delay: 2 },
      { count: 8, left: '30%', delay: 4 },
      { count: 8, left: '40%', delay: 6 },
      { count: 8, left: '50%', delay: 8 },
      { count: 8, left: '60%', delay: 10 },
      { count: 8, left: '70%', delay: 12 },
      { count: 8, left: '80%', delay: 14 },
      { count: 8, left: '90%', delay: 16 }
    ];

    particleConfigs.forEach(config => {
      for (let i = 0; i < config.count; i++) {
        this.createParticle(config.left, i * 2 + config.delay);
      }
    });
  }

  createParticle(left, delay) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = left;
    particle.style.animationDelay = `${delay}s`;
    document.body.appendChild(particle);
    this.particles.push(particle);
  }

  generateShapes() {
    const shapeConfigs = [
      { type: 'triangle', top: '20%', left: '15%' },
      { type: 'circle', top: '60%', right: '20%' },
      { type: 'square', top: '40%', left: '70%' },
      { type: 'triangle', top: '80%', right: '10%' },
      { type: 'circle', top: '30%', left: '5%' }
    ];

    shapeConfigs.forEach(config => {
      this.createShape(config);
    });
  }

  createShape(config) {
    const shape = document.createElement('div');
    shape.className = `shape ${config.type}`;
    shape.style.top = config.top;
    if (config.left) shape.style.left = config.left;
    if (config.right) shape.style.right = config.right;
    document.body.appendChild(shape);
    this.shapes.push(shape);
  }

  optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Réduire le nombre de particules sur mobile
      this.particles.forEach((particle, index) => {
        if (index % 3 !== 0) {
          particle.style.display = 'none';
        }
      });

      // Réduire le nombre de formes sur mobile
      this.shapes.forEach((shape, index) => {
        if (index > 2) {
          shape.style.display = 'none';
        }
      });
    }

    // Écouter les changements de taille d'écran
    window.addEventListener('resize', () => {
      const nowMobile = window.innerWidth <= 768;
      if (nowMobile !== isMobile) {
        location.reload(); // Recharger pour appliquer les optimisations
      }
    });
  }

  // Méthode pour nettoyer les éléments générés
  cleanup() {
    this.particles.forEach(particle => particle.remove());
    this.shapes.forEach(shape => shape.remove());
    this.particles = [];
    this.shapes = [];
  }
}

// Initialiser le layout manager quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  new LayoutManager();
});

// Fonction utilitaire pour créer des éléments de navigation
function createBackLink(href, text = '← Retour') {
  const link = document.createElement('a');
  link.href = href;
  link.className = 'back-link';
  link.textContent = text;
  return link;
}

// Fonction pour créer un header standard
function createStandardHeader(title, subtitle = '') {
  const header = document.createElement('header');

  const h1 = document.createElement('h1');
  h1.textContent = title;
  header.appendChild(h1);

  if (subtitle) {
    const intro = document.createElement('p');
    intro.className = 'intro';
    intro.textContent = subtitle;
    header.appendChild(intro);
  }

  return header;
}

// Exposer les fonctions utilitaires globalement
window.LayoutUtils = {
  createBackLink,
  createStandardHeader
};
