// content.js - Gestionnaire de contenu dynamique
class ContentManager {
  constructor() {
    this.pageData = this.getPageData();
    this.init();
  }

  init() {
    this.generateHeader();
    this.generateMainContent();
    this.generateFooter();
  }

  getPageData() {
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '') || 'index';

    const pages = {
      'index': {
        title: 'Principes SOLID',
        subtitle: 'Un principe par page. Design original. Pensé pour les devs modernes.',
        showCards: true
      },
      'singleResponsability': {
        title: 'Responsabilité Unique',
        backLink: 'index.html',
        content: this.getSOLIDContent('S')
      },
      'openClosed': {
        title: 'Ouvert/Fermé',
        backLink: 'index.html',
        content: this.getSOLIDContent('O')
      },
      'liskovSubstitution': {
        title: 'Substitution de Liskov',
        backLink: 'index.html',
        content: this.getSOLIDContent('L')
      },
      'interfaceSegregation': {
        title: 'Ségrégation des Interfaces',
        backLink: 'index.html',
        content: this.getSOLIDContent('I')
      },
      'dependencyInversion': {
        title: 'Inversion des Dépendances',
        backLink: 'index.html',
        content: this.getSOLIDContent('D')
      }
    };

    return pages[pageName] || pages['index'];
  }

  generateHeader() {
    const header = document.createElement('header');

    // Ajouter le lien de retour si nécessaire
    if (this.pageData.backLink) {
      const backLink = document.createElement('a');
      backLink.href = this.pageData.backLink;
      backLink.className = 'back-link';
      backLink.textContent = '← Retour';
      document.body.insertBefore(backLink, header);
    }

    const h1 = document.createElement('h1');
    h1.textContent = this.pageData.title;
    header.appendChild(h1);

    if (this.pageData.subtitle) {
      const intro = document.createElement('p');
      intro.className = 'intro';
      intro.textContent = this.pageData.subtitle;
      header.appendChild(intro);
    }

    document.body.appendChild(header);
  }

  generateMainContent() {
    const main = document.createElement('main');

    if (this.pageData.showCards) {
      main.appendChild(this.createPrincipleCards());
    } else if (this.pageData.content) {
      main.innerHTML = this.pageData.content;
    }

    document.body.appendChild(main);
  }

  createPrincipleCards() {
    const section = document.createElement('section');
    section.className = 'principle-list';

    const principles = [
      { href: 'pages/singleResponsability.html', text: 'S - Responsabilité Unique' },
      { href: 'pages/openClosed.html', text: 'O - Ouvert/Fermé' },
      { href: 'pages/liskovSubstitution.html', text: 'L - Substitution de Liskov' },
      { href: 'pages/interfaceSegregation.html', text: 'I - Ségrégation des Interfaces' },
      { href: 'pages/dependencyInversion.html', text: 'D - Inversion des Dépendances' }
    ];

    principles.forEach(principle => {
      const card = document.createElement('a');
      card.href = principle.href;
      card.className = 'card';
      card.textContent = principle.text;
      section.appendChild(card);
    });

    return section;
  }

  generateFooter() {
    const footer = document.createElement('footer');
    const p = document.createElement('p');
    p.textContent = '© 2025 Otscheck. Code sobre, solide, utile, mobile.';
    footer.appendChild(p);
    document.body.appendChild(footer);
  }

  getSOLIDContent(principle) {
    const contents = {
      'S': `
        <section>
          <h2>Définition</h2>
          <p>Chaque module ou classe ne doit avoir qu'une seule raison de changer. C'est-à-dire qu'il ne doit avoir qu'une seule responsabilité bien définie.</p>

          <h2>Pourquoi c'est important ?</h2>
          <p>Ce principe est la base de la conception modulaire. En donnant une seule responsabilité à chaque classe, on obtient du code plus maintenable, testable et réutilisable.</p>

          <h2>Exemple sans le principe (non SOLID)</h2>
          <pre><code>// Mauvais exemple - trop de responsabilités
class Rapport {
  private data: any[];

  constructor(data: any[]) {
    this.data = data;
  }

  generatePDF(): void {
    // Génère le PDF - RESPONSABILITÉ 1
    console.log("Génération du PDF...");
  }

  saveToFile(filePath: string): void {
    // Sauvegarde le fichier - RESPONSABILITÉ 2
    console.log(\`Sauvegarde vers \${filePath}...\`);
  }

  sendByEmail(email: string): void {
    // Envoie par email - RESPONSABILITÉ 3
    console.log(\`Envoi par email à \${email}...\`);
  }

  validateData(): boolean {
    // Valide les données - RESPONSABILITÉ 4
    return this.data.length > 0;
  }

  formatData(): string {
    // Formate les données - RESPONSABILITÉ 5
    return this.data.join(', ');
  }
}</code></pre>

          <h2>Exemple corrigé (SOLID)</h2>
          <pre><code>// Bon exemple - une responsabilité par classe
interface RapportData {
  data: any[];
  title: string;
}

class Rapport {
  constructor(private data: RapportData) {}

  getData(): RapportData {
    return this.data;
  }

  getFormattedData(): string {
    return this.data.data.join(', ');
  }
}

class RapportValidator {
  static validate(rapport: Rapport): boolean {
    const data = rapport.getData();
    return data.data.length > 0 && data.title.length > 0;
  }
}

class RapportGenerator {
  static generatePDF(rapport: Rapport): void {
    console.log(\`Génération PDF pour: \${rapport.getData().title}\`);
  }
}

class FileManager {
  static saveToFile(rapport: Rapport, filePath: string): void {
    console.log(\`Sauvegarde du rapport vers \${filePath}\`);
  }
}

class EmailService {
  static sendRapport(rapport: Rapport, email: string): void {
    console.log(\`Envoi du rapport à \${email}\`);
  }
}</code></pre>
        </section>
      `,
      'O': `
        <section>
          <h2>Définition</h2>
          <p>Les entités logicielles (classes, modules, fonctions) doivent être <strong>ouvertes à l'extension</strong> mais <strong>fermées à la modification</strong>.</p>

          <h2>Pourquoi c'est important ?</h2>
          <p>Ce principe permet de créer du code plus stable et maintenable. Au lieu de modifier du code existant (risque d'introduire des bugs), on étend les fonctionnalités en ajoutant du nouveau code.</p>

          <h2>Exemple sans le principe (non SOLID)</h2>
          <pre><code>// Mauvais exemple - modification du code existant
class CalculateurSalaire {
  calculerSalaire(employe) {
    if (employe.type === 'developpeur') {
      return employe.salaireBase * 1.2;
    } else if (employe.type === 'manager') {
      return employe.salaireBase * 1.5;
    } else if (employe.type === 'stagiaire') {
      return employe.salaireBase * 0.8;
    }
    // Chaque nouveau type nécessite une modification
  }
}</code></pre>

          <h2>Exemple corrigé (SOLID)</h2>
          <pre><code>// Bon exemple - extension sans modification
interface Employe {
  calculerSalaire(): number;
}

class Developpeur implements Employe {
  constructor(private salaireBase: number) {}

  calculerSalaire(): number {
    return this.salaireBase * 1.2;
  }
}

class Manager implements Employe {
  constructor(private salaireBase: number) {}

  calculerSalaire(): number {
    return this.salaireBase * 1.5;
  }
}

class Directeur implements Employe {
  constructor(private salaireBase: number) {}

  calculerSalaire(): number {
    return this.salaireBase * 2.0;
  }
}</code></pre>
        </section>
      `,
      'L': `
        <section>
          <h2>Définition</h2>
          <p>Si S est un sous-type de T, alors les objets de type T peuvent être remplacés par des objets de type S sans altérer les propriétés souhaitables du programme.</p>

          <h2>Pourquoi c'est important ?</h2>
          <p>Ce principe garantit que l'héritage est utilisé correctement et que le polymorphisme fonctionne comme attendu.</p>

          <h2>Exemple qui viole le principe</h2>
          <pre><code>// Violation du principe Liskov
class Rectangle {
  constructor(protected largeur: number, protected hauteur: number) {}

  setLargeur(largeur: number) {
    this.largeur = largeur;
  }

  setHauteur(hauteur: number) {
    this.hauteur = hauteur;
  }

  getAire(): number {
    return this.largeur * this.hauteur;
  }
}

class Carre extends Rectangle {
  setLargeur(largeur: number) {
    super.setLargeur(largeur);
    super.setHauteur(largeur);
  }

  setHauteur(hauteur: number) {
    super.setHauteur(hauteur);
    super.setLargeur(hauteur);
  }
}</code></pre>
        </section>
      `,
      'I': `
        <section>
          <h2>Définition</h2>
          <p>Un client ne devrait pas être forcé d'implémenter une interface qu'il n'utilise pas, ou dépendre de méthodes qu'il n'utilise pas.</p>

          <h2>Pourquoi c'est important ?</h2>
          <p>Ce principe évite la dépendance à du code inutile et réduit le couplage entre les composants.</p>

          <h2>Exemple qui viole le principe</h2>
          <pre><code>// Violation du principe ISP
interface MachineMultifonction {
  imprimer(document: string): void;
  scanner(document: string): string;
  faxer(document: string, numero: string): void;
  photocopier(document: string): string;
}

class ImprimanteSimple implements MachineMultifonction {
  imprimer(document: string): void {
    console.log(\`Impression: \${document}\`);
  }

  scanner(document: string): string {
    throw new Error("Cette imprimante ne scanne pas !");
  }

  faxer(document: string, numero: string): void {
    throw new Error("Cette imprimante ne faxe pas !");
  }

  photocopier(document: string): string {
    throw new Error("Cette imprimante ne photocopie pas !");
  }
}</code></pre>
        </section>
      `,
      'D': `
        <section>
          <h2>Définition</h2>
          <p>Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau. Les deux doivent dépendre d'abstractions.</p>

          <h2>Pourquoi c'est important ?</h2>
          <p>Ce principe permet de créer du code plus flexible, testable et maintenable.</p>

          <h2>Exemple qui viole le principe</h2>
          <pre><code>// Violation du principe DIP
class MySQLDatabase {
  connect() { /* connexion MySQL */ }
  query(sql: string) { /* exécution requête */ }
}

class UserService {
  private db = new MySQLDatabase(); // Dépendance directe !

  getUser(id: number) {
    this.db.connect();
    return this.db.query(\`SELECT * FROM users WHERE id = \${id}\`);
  }
}</code></pre>

          <h2>Exemple corrigé (SOLID)</h2>
          <pre><code>// Solution respectant DIP
interface Database {
  connect(): void;
  query(sql: string): any;
}

class UserService {
  constructor(private db: Database) {} // Injection de dépendance !

  getUser(id: number) {
    this.db.connect();
    return this.db.query(\`SELECT * FROM users WHERE id = \${id}\`);
  }
}</code></pre>
        </section>
      `
    };

    return contents[principle] || '<p>Contenu non disponible</p>';
  }
}

// Initialiser le content manager
document.addEventListener('DOMContentLoaded', () => {
  new ContentManager();
});
