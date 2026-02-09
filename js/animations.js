// Animações JavaScript Avançadas para MTS
class MTSAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initIntersectionObserver();
    this.initHoverEffects();
    this.initTextAnimations();
    this.initBackgroundAnimations();
    this.initCursorEffects();
    this.initLoadingAnimations();
  }

  // Animações de scroll
  initScrollAnimations() {
    // Efeito de parallax nos elementos
    const parallaxElements = document.querySelectorAll("[data-parallax]");
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    });

    // Animação de progresso na barra de rolagem
    this.initScrollIndicator();
  }

  initScrollIndicator() {
    const progressContainer = document.createElement("div");
    progressContainer.className = "scroll-progress-container";
    progressContainer.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressContainer);

    const progressBar = progressContainer.querySelector(".scroll-progress-bar");

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    });
  }

  // Intersection Observer para animações
  initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observar elementos animáveis
    const animatableElements = document.querySelectorAll("[data-animate]");
    animatableElements.forEach((element) => {
      observer.observe(element);
    });
  }

  animateElement(element) {
    const animationType = element.dataset.animate;
    const delay = element.dataset.delay || 0;

    setTimeout(() => {
      element.classList.add("animated", animationType);

      // Remover classe após animação para permitir reanimação
      element.addEventListener(
        "animationend",
        () => {
          element.classList.add("animation-complete");
        },
        { once: true }
      );
    }, delay);
  }

  // Efeitos de hover avançados
  initHoverEffects() {
    const hoverElements = document.querySelectorAll("[data-hover-effect]");

    hoverElements.forEach((element) => {
      const effectType = element.dataset.hoverEffect;

      element.addEventListener("mouseenter", () => {
        this.applyHoverEffect(element, effectType, "enter");
      });

      element.addEventListener("mouseleave", () => {
        this.applyHoverEffect(element, effectType, "leave");
      });
    });
  }

  applyHoverEffect(element, effectType, direction) {
    switch (effectType) {
      case "glow":
        if (direction === "enter") {
          element.style.boxShadow = "0 0 30px rgba(4, 104, 175, 0.6)";
          element.style.transform = "scale(1.05)";
        } else {
          element.style.boxShadow = "";
          element.style.transform = "";
        }
        break;

      case "float":
        if (direction === "enter") {
          element.style.transform = "translateY(-10px)";
        } else {
          element.style.transform = "";
        }
        break;

      case "rotate":
        if (direction === "enter") {
          element.style.transform = "rotate(5deg)";
        } else {
          element.style.transform = "";
        }
        break;

      case "pulse":
        if (direction === "enter") {
          element.style.animation = "pulse 1s infinite";
        } else {
          element.style.animation = "";
        }
        break;
    }
  }

  // Animações de texto
  initTextAnimations() {
    const textElements = document.querySelectorAll("[data-text-animation]");

    textElements.forEach((element) => {
      const animationType = element.dataset.textAnimation;
      const text = element.textContent;

      switch (animationType) {
        case "typewriter":
          this.typewriterEffect(element, text);
          break;

        case "split":
          this.splitTextAnimation(element, text);
          break;

        case "fade":
          this.fadeTextAnimation(element, text);
          break;
      }
    });
  }

  typewriterEffect(element, text) {
    element.textContent = "";
    let i = 0;
    const speed = 50;

    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  splitTextAnimation(element, text) {
    element.innerHTML = text
      .split("")
      .map((char) => `<span class="char">${char}</span>`)
      .join("");

    const chars = element.querySelectorAll(".char");
    chars.forEach((char, index) => {
      char.style.animationDelay = `${index * 0.05}s`;
    });
  }

  fadeTextAnimation(element, text) {
    element.innerHTML = text
      .split(" ")
      .map((word) => `<span class="word">${word}</span>`)
      .join(" ");

    const words = element.querySelectorAll(".word");
    words.forEach((word, index) => {
      word.style.animationDelay = `${index * 0.2}s`;
    });
  }

  // Animações de fundo
  initBackgroundAnimations() {
    this.createGradientBackground();
    this.initBackgroundParticles();
  }

  createGradientBackground() {
    const gradientElement = document.createElement("div");
    gradientElement.className = "animated-gradient";
    document.body.appendChild(gradientElement);
  }

  initBackgroundParticles() {
    const particleContainer = document.createElement("div");
    particleContainer.className = "background-particles";
    document.body.appendChild(particleContainer);

    // Criar partículas
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 20}s`;
      particleContainer.appendChild(particle);
    }
  }

  // Efeitos de cursor personalizado
  initCursorEffects() {
    if (window.innerWidth > 768) {
      // Apenas em desktop
      this.createCustomCursor();
      this.initCursorHoverEffects();
    }
  }

  createCustomCursor() {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Esconder cursor padrão
    document.body.style.cursor = "none";
  }

  initCursorHoverEffects() {
    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .nav-link"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        document.querySelector(".custom-cursor").classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        document
          .querySelector(".custom-cursor")
          .classList.remove("cursor-hover");
      });
    });
  }

  // Animações de carregamento
  initLoadingAnimations() {
    this.createLoadingScreen();
    this.initElementLoading();
  }

  createLoadingScreen() {
    const loadingScreen = document.createElement("div");
    loadingScreen.className = "loading-screen";
    loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">MTS</div>
                <div class="loading-text">Carregando...</div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        `;
    document.body.appendChild(loadingScreen);

    // Simular carregamento
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 2000);
  }

  initElementLoading() {
    const lazyElements = document.querySelectorAll("[data-lazy]");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.classList.add("loaded");
          observer.unobserve(element);
        }
      });
    });

    lazyElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Métodos utilitários
  static createRippleEffect(element, x, y) {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = x - element.offsetLeft + "px";
    ripple.style.top = y - element.offsetTop + "px";
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  static animateCounter(element, start, end, duration) {
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

  static smoothScrollTo(element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Inicializar animações quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.mtsAnimations = new MTSAnimations();
});

// Adicionar CSS para as animações
const animationStyles = `
    /* Scroll Progress Indicator */
    .scroll-progress-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(255,255,255,0.2);
        z-index: 9999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #0468af, #1e008a, #00c3ff);
        width: 0%;
        transition: width 0.1s ease;
    }
    
    /* Animated Gradient Background */
    .animated-gradient {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(-45deg, #0468af, #1e008a, #00c3ff, #0468af);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
        opacity: 0.05;
        z-index: -1;
        pointer-events: none;
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    /* Background Particles */
    .background-particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }
    
    .particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: #0468af;
        border-radius: 50%;
        animation: particleFloat 20s linear infinite;
        opacity: 0.6;
    }
    
    @keyframes particleFloat {
        0% { 
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { 
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
        }
    }
    
    /* Custom Cursor */
    .custom-cursor {
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid #0468af;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        z-index: 9999;
        mix-blend-mode: difference;
    }
    
    .custom-cursor.cursor-hover {
        transform: translate(-50%, -50%) scale(1.5);
        background: rgba(4, 104, 175, 0.2);
    }
    
    /* Loading Screen */
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0468af, #1e008a);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    
    .loading-content {
        text-align: center;
        color: white;
    }
    
    .loading-logo {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .loading-text {
        font-size: 1.2rem;
        margin-bottom: 30px;
        opacity: 0.8;
    }
    
    .loading-bar {
        width: 300px;
        height: 4px;
        background: rgba(255,255,255,0.2);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .loading-progress {
        height: 100%;
        background: linear-gradient(90deg, #00c3ff, #0468af);
        width: 0%;
        animation: loadingProgress 2s ease-in-out infinite;
    }
    
    @keyframes loadingProgress {
        0% { width: 0%; }
        50% { width: 70%; }
        100% { width: 100%; }
    }
    
    /* Text Animation Styles */
    .char {
        display: inline-block;
        animation: charAppear 0.5s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes charAppear {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .word {
        display: inline-block;
        animation: wordFade 0.8s ease forwards;
        opacity: 0;
    }
    
    @keyframes wordFade {
        to {
            opacity: 1;
        }
    }
    
    /* Ripple Effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(4, 104, 175, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Element Loading */
    [data-lazy] {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    [data-lazy].loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Animation Classes */
    .animated {
        animation-duration: 0.8s;
        animation-fill-mode: both;
    }
    
    .fadeInUp {
        animation-name: fadeInUp;
    }
    
    .fadeInLeft {
        animation-name: fadeInLeft;
    }
    
    .fadeInRight {
        animation-name: fadeInRight;
    }
    
    .zoomIn {
        animation-name: zoomIn;
    }
    
    .bounceIn {
        animation-name: bounceIn;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes bounceIn {
        from, 20%, 40%, 60%, 80%, to {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            transform: scale3d(.3, .3, .3);
        }
        20% {
            transform: scale3d(1.1, 1.1, 1.1);
        }
        40% {
            transform: scale3d(.9, .9, .9);
        }
        60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03);
        }
        80% {
            transform: scale3d(.97, .97, .97);
        }
        to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
    }
    
    /* Responsive Adjustments */
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
        
        .loading-logo {
            font-size: 2rem;
        }
        
        .loading-bar {
            width: 200px;
        }
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement("style");
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
