// Sistema de Produtos MTS
class MTSProducts {
  constructor() {
    this.products = [];
    this.currentProduct = null;
    this.init();
  }

  init() {
    this.loadProducts();
    this.renderProducts();
    this.bindEvents();
    this.initModal();
  }

  loadProducts() {
    // Produtos da MTS - Equipamentos de Informática
    this.products = [
      {
        id: 1,
        name: "Notebook Dell Inspiron 15",
        model: "Inspiron 15 3501",
        category: "Computadores",
        price: 180000,
        originalPrice: 200000,
        image: "fas fa-laptop",
        features: [
          "Intel Core i5 11ª Geração",
          "8GB RAM DDR4",
          "512GB SSD",
          'Tela 15.6" Full HD',
          "Windows 11 Home",
          "Garantia 2 anos",
        ],
        description:
          "Notebook potente para trabalho e estudos, com processador Intel Core i5 de última geração, memória RAM de 8GB e armazenamento SSD de 512GB para máxima performance.",
        inStock: true,
        rating: 4.8,
        reviews: 24,
      },
      {
        id: 2,
        name: "Computador Desktop Completo",
        model: "MTS PC Pro",
        category: "Computadores",
        price: 150000,
        originalPrice: 175000,
        image: "fas fa-desktop",
        features: [
          "Intel Core i3 10ª Geração",
          "4GB RAM DDR4",
          "1TB HDD",
          'Monitor 19.5"',
          "Teclado e Mouse",
          "Windows 10 Pro",
        ],
        description:
          "Computador desktop completo ideal para escritório e uso doméstico, com tudo que você precisa para trabalhar com eficiência.",
        inStock: true,
        rating: 4.6,
        reviews: 18,
      },
      {
        id: 3,
        name: "Mouse Gamer RGB",
        model: "MTS Gaming Mouse X1",
        category: "Periféricos",
        price: 8500,
        originalPrice: 12000,
        image: "fas fa-mouse",
        features: [
          "Sensor óptico 16000 DPI",
          "Iluminação RGB personalizável",
          "6 botões programáveis",
          "Design ergonômico",
          "Cabo trançado 1.8m",
          "Compatível com Windows/Mac",
        ],
        description:
          "Mouse gamer profissional com sensor de alta precisão e iluminação RGB personalizável para sua melhor experiência de jogo.",
        inStock: true,
        rating: 4.9,
        reviews: 32,
      },
      {
        id: 4,
        name: "Teclado Mecânico",
        model: "MTS Mech Pro",
        category: "Periféricos",
        price: 15000,
        originalPrice: 20000,
        image: "fas fa-keyboard",
        features: [
          "Switches mecânicos Blue",
          "Iluminação RGB por tecla",
          "104 teclas anti-ghosting",
          "Suporte para macros",
          "Construção em alumínio",
          "Compatível com todos sistemas",
        ],
        description:
          "Teclado mecânico profissional com switches Blue para resposta tátil precisa e iluminação RGB personalizável.",
        inStock: true,
        rating: 4.7,
        reviews: 15,
      },
      {
        id: 5,
        name: 'Monitor LED 24"',
        model: "MTS Display 24F",
        category: "Monitores",
        price: 45000,
        originalPrice: 55000,
        image: "fas fa-tv",
        features: [
          "Tela LED 24 polegadas",
          "Resolução Full HD 1920x1080",
          "Taxa de atualização 75Hz",
          "Tempo de resposta 5ms",
          "Portas HDMI e VGA",
          "Ajuste de altura e inclinação",
        ],
        description:
          "Monitor LED de 24 polegadas com resolução Full HD, ideal para trabalho, estudos e entretenimento com excelente qualidade de imagem.",
        inStock: true,
        rating: 4.5,
        reviews: 21,
      },
      {
        id: 6,
        name: "Impressora Multifuncional",
        model: "MTS Print Pro 500",
        category: "Impressão",
        price: 65000,
        originalPrice: 75000,
        image: "fas fa-print",
        features: [
          "Impressão, cópia e digitalização",
          "Conectividade Wi-Fi",
          "Impressão frente e verso",
          'Tela LCD touchscreen 3.7"',
          "Compatível com smartphones",
          "Cartuchos de tinta individual",
        ],
        description:
          "Impressora multifuncional com conectividade Wi-Fi, perfeita para escritórios e uso doméstico com alta qualidade de impressão.",
        inStock: false,
        rating: 4.4,
        reviews: 12,
      },
      {
        id: 7,
        name: "Roteador Wi-Fi 6",
        model: "MTS Router X6",
        category: "Rede",
        price: 25000,
        originalPrice: 32000,
        image: "fas fa-wifi",
        features: [
          "Tecnologia Wi-Fi 6 (802.11ax)",
          "Velocidade até 3000Mbps",
          "Cobertura para até 200m²",
          "4 antenas externas",
          "4 portas Gigabit LAN",
          "Segurança WPA3",
        ],
        description:
          "Roteador Wi-Fi 6 de última geração com velocidades ultrarrápidas e cobertura ampliada para sua casa ou escritório.",
        inStock: true,
        rating: 4.8,
        reviews: 28,
      },
      {
        id: 8,
        name: "HD Externo 1TB",
        model: "MTS Storage 1TB",
        category: "Armazenamento",
        price: 18000,
        originalPrice: 22000,
        image: "fas fa-hdd",
        features: [
          "Capacidade 1TB",
          "Conexão USB 3.0",
          "Compatível com Windows/Mac/Linux",
          "Design portátil",
          "Proteção contra quedas",
          "Backup automático",
        ],
        description:
          "HD externo de 1TB para backup seguro dos seus arquivos importantes, com conexão USB 3.0 para transferências rápidas.",
        inStock: true,
        rating: 4.6,
        reviews: 19,
      },
    ];
  }

  renderProducts() {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.innerHTML = "";

    this.products.forEach((product) => {
      const productCard = this.createProductCard(product);
      container.appendChild(productCard);
    });
  }

  createProductCard(product) {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-4";

    const hasDiscount = product.price < product.originalPrice;
    const discountPercent = hasDiscount
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

    col.innerHTML = `
            <div class="product-card animate-card" data-product-id="${
              product.id
            }">
                <div class="product-image">
                    <i class="${product.image}"></i>
                    ${
                      hasDiscount
                        ? `<span class="discount-badge">-${discountPercent}%</span>`
                        : ""
                    }
                    ${
                      !product.inStock
                        ? '<span class="out-of-stock">Esgotado</span>'
                        : ""
                    }
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-model">Modelo: ${product.model}</div>
                    <div class="product-price">
                        ${MTSUtils.formatPrice(product.price)}
                        ${
                          hasDiscount
                            ? `<span class="original-price">${MTSUtils.formatPrice(
                                product.originalPrice
                              )}</span>`
                            : ""
                        }
                    </div>
                    <div class="product-rating">
                        <div class="stars">
                            ${this.renderStars(product.rating)}
                        </div>
                        <span class="reviews">(${
                          product.reviews
                        } avaliações)</span>
                    </div>
                    <ul class="product-features">
                        ${product.features
                          .slice(0, 3)
                          .map(
                            (feature) =>
                              `<li><i class="fas fa-check"></i> ${feature}</li>`
                          )
                          .join("")}
                        ${
                          product.features.length > 3
                            ? `<li><i class="fas fa-plus"></i> +${
                                product.features.length - 3
                              } recursos</li>`
                            : ""
                        }
                    </ul>
                    <div class="product-actions">
                        <button class="btn btn-product btn-product-primary view-details" data-product-id="${
                          product.id
                        }">
                            <i class="fas fa-eye me-1"></i>Ver Detalhes
                        </button>
                        ${
                          product.inStock
                            ? `<button class="btn btn-product btn-product-outline whatsapp-order" data-product-id="${product.id}">
                                <i class="fab fa-whatsapp me-1"></i>Encomendar
                            </button>`
                            : `<button class="btn btn-product btn-product-outline" disabled>
                                <i class="fas fa-times me-1"></i>Indisponível
                            </button>`
                        }
                    </div>
                </div>
            </div>
        `;

    return col;
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "";

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }

    return stars;
  }

  bindEvents() {
    // Delegação de eventos para botões dinâmicos
    document.addEventListener("click", (e) => {
      if (e.target.closest(".view-details")) {
        const productId = e.target.closest(".view-details").dataset.productId;
        this.showProductModal(parseInt(productId));
      }

      if (e.target.closest(".whatsapp-order")) {
        const productId = e.target.closest(".whatsapp-order").dataset.productId;
        this.orderViaWhatsApp(parseInt(productId));
      }
    });
  }

  initModal() {
    this.modal = new bootstrap.Modal(document.getElementById("productModal"));
    this.modalTitle = document.getElementById("productModalTitle");
    this.modalBody = document.getElementById("productModalBody");
    this.whatsappBtn = document.getElementById("whatsappOrderBtn");

    // Evento do botão WhatsApp no modal
    this.whatsappBtn?.addEventListener("click", () => {
      if (this.currentProduct) {
        this.orderViaWhatsApp(this.currentProduct.id);
      }
    });
  }

  showProductModal(productId) {
    this.currentProduct = this.products.find((p) => p.id === productId);
    if (!this.currentProduct) return;

    this.modalTitle.textContent = this.currentProduct.name;

    const hasDiscount =
      this.currentProduct.price < this.currentProduct.originalPrice;
    const discountPercent = hasDiscount
      ? Math.round(
          ((this.currentProduct.originalPrice - this.currentProduct.price) /
            this.currentProduct.originalPrice) *
            100
        )
      : 0;

    this.modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="modal-product-image">
                        <i class="${this.currentProduct.image}"></i>
                        ${
                          hasDiscount
                            ? `<span class="modal-discount-badge">-${discountPercent}% OFF</span>`
                            : ""
                        }
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="modal-product-info">
                        <h4>${this.currentProduct.name}</h4>
                        <p class="model">Modelo: ${
                          this.currentProduct.model
                        }</p>
                        <p class="category">Categoria: ${
                          this.currentProduct.category
                        }</p>
                        
                        <div class="price-section">
                            <div class="current-price">${MTSUtils.formatPrice(
                              this.currentProduct.price
                            )}</div>
                            ${
                              hasDiscount
                                ? `<div class="original-price">${MTSUtils.formatPrice(
                                    this.currentProduct.originalPrice
                                  )}</div>
                                 <div class="savings">Você economiza: ${MTSUtils.formatPrice(
                                   this.currentProduct.originalPrice -
                                     this.currentProduct.price
                                 )}</div>`
                                : ""
                            }
                        </div>
                        
                        <div class="rating-section">
                            <div class="stars">${this.renderStars(
                              this.currentProduct.rating
                            )}</div>
                            <span class="rating-value">${
                              this.currentProduct.rating
                            }/5</span>
                            <span class="reviews">(${
                              this.currentProduct.reviews
                            } avaliações)</span>
                        </div>
                        
                        <p class="description">${
                          this.currentProduct.description
                        }</p>
                        
                        <div class="stock-status">
                            ${
                              this.currentProduct.inStock
                                ? '<span class="in-stock"><i class="fas fa-check-circle"></i> Em estoque</span>'
                                : '<span class="out-of-stock"><i class="fas fa-times-circle"></i> Esgotado</span>'
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-12">
                    <h5>Características Principais:</h5>
                    <ul class="features-list">
                        ${this.currentProduct.features
                          .map(
                            (feature) =>
                              `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
                          )
                          .join("")}
                    </ul>
                </div>
            </div>
        `;

    this.modal.show();
  }

  orderViaWhatsApp(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const message = `Olá! Estou interessado no produto:

*${product.name}*
Modelo: ${product.model}
Preço: ${MTSUtils.formatPrice(product.price)}

Gostaria de mais informações sobre disponibilidade e formas de pagamento.`;

    const phoneNumber = "+244923898014";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp em nova aba
    window.open(whatsappUrl, "_blank");

    // Fechar modal se estiver aberto
    if (this.modal) {
      this.modal.hide();
    }

    // Mostrar notificação
    if (window.mtsApp) {
      window.mtsApp.showNotification(
        "Redirecionando para o WhatsApp...",
        "info"
      );
    }
  }

  // Métodos utilitários
  filterByCategory(category) {
    return this.products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  filterByPrice(minPrice, maxPrice) {
    return this.products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.model.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.features.some((feature) =>
          feature.toLowerCase().includes(searchTerm)
        )
    );
  }

  getProductsByRating(minRating) {
    return this.products.filter((product) => product.rating >= minRating);
  }

  // Estatísticas
  getStatistics() {
    return {
      totalProducts: this.products.length,
      inStock: this.products.filter((p) => p.inStock).length,
      outOfStock: this.products.filter((p) => !p.inStock).length,
      averageRating: (
        this.products.reduce((sum, p) => sum + p.rating, 0) /
        this.products.length
      ).toFixed(1),
      priceRange: {
        min: Math.min(...this.products.map((p) => p.price)),
        max: Math.max(...this.products.map((p) => p.price)),
      },
    };
  }
}

// Inicializar produtos quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.mtsProducts = new MTSProducts();

  // Adicionar estilos específicos para produtos
  const productStyles = `
        .product-card {
            transition: all 0.3s ease;
        }
        
        .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(4, 104, 175, 0.2);
        }
        
        .discount-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            box-shadow: 0 2px 10px rgba(40, 167, 69, 0.3);
        }
        
        .out-of-stock {
            position: absolute;
            top: 15px;
            right: 15px;
            background: linear-gradient(135deg, #dc3545, #e74c3c);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .original-price {
            text-decoration: line-through;
            color: #6c757d;
            font-size: 0.9rem;
            margin-left: 10px;
        }
        
        .product-rating {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 10px 0;
        }
        
        .stars i {
            color: #ffc107;
        }
        
        .reviews {
            color: #6c757d;
            font-size: 0.9rem;
        }
        
        .modal-product-image {
            position: relative;
            height: 250px;
            background: linear-gradient(135deg, #0468af, #1e008a);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        .modal-product-image i {
            font-size: 5rem;
            color: white;
            z-index: 2;
        }
        
        .modal-discount-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 8px 15px;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 700;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
        }
        
        .price-section {
            margin: 15px 0;
        }
        
        .current-price {
            font-size: 2rem;
            font-weight: 800;
            color: #0468af;
        }
        
        .savings {
            color: #28a745;
            font-weight: 600;
            margin-top: 5px;
        }
        
        .rating-section {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 15px 0;
        }
        
        .rating-value {
            font-weight: 700;
            color: #0468af;
        }
        
        .features-list {
            list-style: none;
            padding: 0;
        }
        
        .features-list li {
            margin: 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .features-list i {
            color: #28a745;
        }
        
        .stock-status {
            margin-top: 15px;
        }
        
        .in-stock {
            color: #28a745;
            font-weight: 600;
        }
        
        .out-of-stock {
            color: #dc3545;
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .modal-product-image {
                height: 200px;
            }
            
            .modal-product-image i {
                font-size: 3rem;
            }
            
            .current-price {
                font-size: 1.5rem;
            }
        }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = productStyles;
  document.head.appendChild(styleSheet);
});
