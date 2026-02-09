// Arquivo principal JavaScript para o site MTS
// Utilizando padrões de arquitetura limpa e código otimizado

class MTSApp {
  constructor() {
    this.init();
  }

  init() {
    // Inicializar todas as funcionalidades
    this.initPreloader();
    this.initNavigation();
    this.initParticles();
    this.initHeroAnimations();
    this.initScrollReveal();
    this.init3DElements();
    this.initStatisticsCounter();
    this.initSmoothScroll();
    this.initFormHandlers();
    this.initProductGallery();
    this.initServiceHover();
    this.initMouseMove3D();
    this.initParallaxEffects();
  }

  // Preloader
  initPreloader() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          preloader.style.opacity = "0";
          setTimeout(() => {
            preloader.style.display = "none";
          }, 500);
        }, 1000);
      });
    }
  }

  // Navegação responsiva
  initNavigation() {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    // Efeito de scroll na navbar
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    // Scroll suave para links da navegação
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Fechar menu mobile
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse.classList.contains("show")) {
            const navbarToggler = document.querySelector(".navbar-toggler");
            navbarToggler.click();
          }
        }
      });
    });
  }

  // Partículas de fundo
  initParticles() {
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#0468af" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#0468af",
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
        },
        retina_detect: true,
      });
    }
  }

  // Animações do Hero
  initHeroAnimations() {
    const heroTitle = document.querySelector(".hero-title");
    const heroButtons = document.querySelectorAll(".hero-buttons .btn");
    const techSphere = document.querySelector(".tech-sphere");

    if (heroTitle) {
      // Efeito de digitação no título
      this.typeWriterEffect(heroTitle, 50);
    }

    if (heroButtons.length > 0) {
      // Animação nos botões
      heroButtons.forEach((button, index) => {
        setTimeout(() => {
          button.classList.add("animate-bounce");
        }, 300 + index * 200);
      });
    }

    if (techSphere) {
      // Adicionar elementos 3D interativos à esfera
      this.create3DOrbitElements();
    }
  }

  // Efeito de digitação
  typeWriterEffect(element, speed) {
    const text = element.textContent;
    element.textContent = "";
    element.style.display = "block";

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  // Criar elementos 3D na esfera
  create3DOrbitElements() {
    const orbits = document.querySelectorAll(".orbit");
    const icons = [
      "fas fa-server",
      "fas fa-laptop-code",
      "fas fa-database",
      "fas fa-network-wired",
      "fas fa-cloud",
      "fas fa-mobile-alt",
    ];

    orbits.forEach((orbit, index) => {
      const orbitItem = orbit.querySelector(".orbit-item");
      if (orbitItem) {
        orbitItem.innerHTML = `<i class="${icons[index]}"></i>`;
      }
    });
  }

  // Efeitos de revelação ao scroll
  initScrollReveal() {
    const revealElements = document.querySelectorAll(
      ".service-card, .product-card, .feature-item, .about-content, .contact-info"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in-up-smooth");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(50px)";
      element.style.transition = "all 0.8s ease-out";
      observer.observe(element);
    });
  }

  // Elementos 3D interativos
  init3DElements() {
    this.create3DGrid();
    this.create3DHelix();
    this.create3DParticles();
    this.init3DCardEffects();
  }

  // Criar grid 3D
  create3DGrid() {
    const gridContainer = document.querySelector(".tech-grid");
    if (gridContainer) {
      const technologies = [
        { icon: "fab fa-html5", name: "HTML5" },
        { icon: "fab fa-css3-alt", name: "CSS3" },
        { icon: "fab fa-js", name: "JavaScript" },
        { icon: "fab fa-php", name: "PHP" },
        { icon: "fas fa-database", name: "Database" },
        { icon: "fas fa-server", name: "Servers" },
      ];

      technologies.forEach((tech, index) => {
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item floating";
        gridItem.style.animationDelay = `${index * 0.2}s`;
        gridItem.innerHTML = `
                    <i class="${tech.icon}"></i>
                    <span class="tech-name">${tech.name}</span>
                `;
        gridContainer.appendChild(gridItem);
      });
    }
  }

  // Criar hélice 3D
  create3DHelix() {
    const helixContainer = document.querySelector(".helix-container");
    if (helixContainer) {
      for (let i = 0; i < 20; i++) {
        const element = document.createElement("div");
        element.className = "helix-element";
        element.style.setProperty("--rotation", `${i * 18}deg`);
        element.style.setProperty("--height", `${i * 10}px`);
        helixContainer.appendChild(element);
      }
    }
  }

  // Criar partículas 3D
  create3DParticles() {
    const particlesContainer = document.querySelector(".particles-3d");
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "particle-3d";
        particle.style.setProperty("--angle", `${i * 12}deg`);
        particle.style.setProperty("--radius", `${50 + Math.random() * 100}px`);
        particle.style.setProperty("--delay", `${i * 0.2}s`);
        particlesContainer.appendChild(particle);
      }
    }
  }

  // Efeitos 3D nos cards
  init3DCardEffects() {
    const cards = document.querySelectorAll(".service-card, .product-card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      });
    });
  }

  // Contador de estatísticas
  initStatisticsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute("data-count"));
          this.animateNumber(element, 0, target, 2000);
          observer.unobserve(element);
        }
      });
    });

    statNumbers.forEach((element) => {
      observer.observe(element);
    });
  }

  // Animação de números
  animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Scroll suave
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Manipuladores de formulário
  initFormHandlers() {
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSubmitForm(contactForm);
      });
    }
  }

  // Submissão de formulário
  async handleSubmitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Mostrar loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    try {
      // Simular envio (substituir por chamada real)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mostrar sucesso
      this.showNotification("Mensagem enviada com sucesso!", "success");
      form.reset();
    } catch (error) {
      this.showNotification(
        "Erro ao enviar mensagem. Tente novamente.",
        "error"
      );
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  // Mostrar notificações
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
            }"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

    document.body.appendChild(notification);

    // Animação de entrada
    setTimeout(() => notification.classList.add("show"), 100);

    // Fechar automaticamente
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Fechar ao clicar
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      });
  }

  // Galeria de produtos
  initProductGallery() {
    // Será implementado no arquivo products.js
  }

  // Efeitos de hover nos serviços
  initServiceHover() {
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("hover-lift");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("hover-lift");
      });
    });
  }

  // Efeito 3D com movimento do mouse
  initMouseMove3D() {
    const elements = document.querySelectorAll(".mouse-move-3d");

    document.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      elements.forEach((element) => {
        const speed = element.dataset.speed || 0.05;
        const rotateX = y * 10 * speed;
        const rotateY = x * 10 * speed;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
  }

  // Efeitos de parallax
  initParallaxEffects() {
    const parallaxElements = document.querySelectorAll(".parallax-element");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${rate * speed}px)`;
      });
    });
  }
}

// Inicializar a aplicação quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.mtsApp = new MTSApp();
});

// Adicionar classes utilitárias
class MTSUtils {
  static generateId() {
    return "id_" + Math.random().toString(36).substr(2, 9);
  }

  static formatPrice(price) {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(price);
  }

  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

// Exportar utilitários
window.MTSUtils = MTSUtils;
