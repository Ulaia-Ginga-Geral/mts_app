// Chatbot MTS - Assistente Virtual (Desktop only)
class MTSChatbot {
  constructor() {
    this.isOpen = false;
    this.conversation = [];
    this.userContext = {
      name: null,
      email: null,
      interest: null,
    };
    this.inactivityTimer = null;
    this.autoOpenTimer = null;
    this.init();
  }

  // Check if device is desktop (screen width >= 769px)
  isDesktop() {
    return window.innerWidth >= 769;
  }

  init() {
    // Only initialize on desktop devices
    if (!this.isDesktop()) {
      return;
    }
    this.setupElements();
    this.bindEvents();
    this.loadConversation();
    this.setupTypingIndicator();
    this.setupAutoOpen();
    this.setupInactivityTimer();
  }

  setupElements() {
    this.chatbotToggle = document.getElementById("chatbotToggle");
    this.chatbotWindow = document.getElementById("chatbotWindow");
    this.chatbotMessages = document.getElementById("chatbotMessages");
    this.chatbotInput = document.getElementById("chatbotInput");
    this.chatbotSend = document.getElementById("chatbotSend");
    this.chatbotClose = document.getElementById("chatbotClose");
  }

  setupAutoOpen() {
    // Verificar se é desktop
    const isDesktop = window.innerWidth >= 992;

    if (isDesktop) {
      // Abrir automaticamente após 3 segundos apenas em desktop
      this.autoOpenTimer = setTimeout(() => {
        if (!this.isOpen) {
          this.openChatbot();
          // Adicionar mensagem de boas-vindas automática
          setTimeout(() => {
            if (this.isOpen) {
              this.addMessage(
                "👋 Olá! Sou o assistente MTS. Estou aqui para ajudar você com informações sobre nossos serviços e produtos!"
              );
            }
          }, 1000);
        }
      }, 3000);
    }
  }

  setupInactivityTimer() {
    // Resetar timer de inatividade
    const resetInactivityTimer = () => {
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer);
      }

      if (this.isOpen) {
        // Fechar após 10 segundos de inatividade
        this.inactivityTimer = setTimeout(() => {
          if (this.isOpen) {
            this.closeChatbot();
          }
        }, 10000);
      }
    };

    // Resetar timer quando houver interação
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keypress", resetInactivityTimer);
    document.addEventListener("click", resetInactivityTimer);

    // Iniciar timer inicial
    resetInactivityTimer();
  }

  bindEvents() {
    // Abrir/fechar chatbot
    this.chatbotToggle.addEventListener("click", () => this.toggleChatbot());
    this.chatbotClose.addEventListener("click", () => this.closeChatbot());

    // Enviar mensagem
    this.chatbotSend.addEventListener("click", () => this.sendMessage());
    this.chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });

    // Fechar ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        !this.chatbotWindow.contains(e.target) &&
        !this.chatbotToggle.contains(e.target) &&
        this.isOpen
      ) {
        this.closeChatbot();
      }
    });
  }

  toggleChatbot() {
    if (this.isOpen) {
      this.closeChatbot();
    } else {
      this.openChatbot();
    }
  }

  openChatbot() {
    this.isOpen = true;
    this.chatbotWindow.classList.add("active");
    this.chatbotToggle.classList.add("active");
    this.chatbotInput.focus();

    // Adicionar classe para animação
    setTimeout(() => {
      this.chatbotWindow.classList.add("animate-in");
    }, 10);

    // Scroll para o final
    this.scrollToBottom();
  }

  closeChatbot() {
    this.isOpen = false;
    this.chatbotWindow.classList.remove("active", "animate-in");
    this.chatbotToggle.classList.remove("active");
  }

  sendMessage() {
    const message = this.chatbotInput.value.trim();
    if (!message) return;

    // Adicionar mensagem do usuário
    this.addMessage(message, "user");
    this.chatbotInput.value = "";

    // Salvar conversa
    this.saveConversation();

    // Simular pensando
    this.showTypingIndicator();

    // Processar resposta do bot
    setTimeout(() => {
      this.processUserMessage(message);
      this.hideTypingIndicator();
    }, 1000 + Math.random() * 1000);
  }

  addMessage(text, sender = "bot") {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    // Processar mensagens com links e formatação
    const processedText = this.processMessageText(text);
    messageDiv.innerHTML = `<p>${processedText}</p>`;

    this.chatbotMessages.appendChild(messageDiv);
    this.scrollToBottom();

    // Adicionar animação
    setTimeout(() => {
      messageDiv.style.opacity = "1";
      messageDiv.style.transform = "translateY(0)";
    }, 10);
  }

  processMessageText(text) {
    // Converter links em âncoras
    let processed = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" class="message-link">$1</a>'
    );

    // Converter emails
    processed = processed.replace(
      /([\w.-]+@[\w.-]+\.[\w]+)/g,
      '<a href="mailto:$1" class="message-link">$1</a>'
    );

    // Converter números de telefone
    processed = processed.replace(
      /(\+?\d{3,4}[\s.-]?\d{3,4}[\s.-]?\d{3,4})/g,
      '<a href="tel:$1" class="message-link">$1</a>'
    );

    return processed;
  }

  processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    let response = "";

    // Verificar palavras-chave para diferentes intenções
    if (
      this.containsAny(lowerMessage, [
        "olá",
        "ola",
        "oi",
        "bom dia",
        "boa tarde",
        "boa noite",
      ])
    ) {
      response = this.getGreetingResponse();
    } else if (
      this.containsAny(lowerMessage, [
        "serviço",
        "serviços",
        "hospedagem",
        "sites",
        "servidor",
        "formação",
      ])
    ) {
      response = this.getServiceResponse();
    } else if (
      this.containsAny(lowerMessage, [
        "produto",
        "produtos",
        "equipamento",
        "computador",
        "notebook",
      ])
    ) {
      response = this.getProductResponse();
    } else if (
      this.containsAny(lowerMessage, [
        "preço",
        "precos",
        "custo",
        "valor",
        "quanto",
      ])
    ) {
      response = this.getPriceResponse();
    } else if (
      this.containsAny(lowerMessage, [
        "contato",
        "telefone",
        "email",
        "whatsapp",
        "falar",
      ])
    ) {
      response = this.getContactResponse();
    } else if (
      this.containsAny(lowerMessage, [
        "sobre",
        "empresa",
        "mts",
        "quem é",
        "quem são",
      ])
    ) {
      response = this.getAboutResponse();
    } else if (
      this.containsAny(lowerMessage, [
        "ajuda",
        "ajudar",
        "problema",
        "dúvida",
        "duvida",
      ])
    ) {
      response = this.getHelpResponse();
    } else if (
      this.containsAny(lowerMessage, ["obrigado", "obrigada", "grato", "valeu"])
    ) {
      response = this.getThankYouResponse();
    } else {
      response = this.getDefaultResponse();
    }

    // Adicionar mensagem do bot
    this.addMessage(response);

    // Salvar conversa
    this.conversation.push({
      sender: "user",
      message: message,
      timestamp: new Date().toISOString(),
    });

    this.conversation.push({
      sender: "bot",
      message: response,
      timestamp: new Date().toISOString(),
    });

    this.saveConversation();
  }

  containsAny(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword));
  }

  getGreetingResponse() {
    const greetings = [
      "Olá! 👋 Bem-vindo à MTS! Sou seu assistente virtual e estou aqui para ajudar. Como posso auxiliar você hoje?",
      "Oi! 🤖 Prazer em conhecê-lo! Estou aqui para responder todas as suas dúvidas sobre os nossos serviços de tecnologia e informática.",
      "Olá! ✨ Obrigado por entrar em contato com a MTS. Estou pronto para ajudar você com soluções em hospedagem web, criação de sites, servidores e muito mais!",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  getServiceResponse() {
    return "🌐 Oferecemos diversos serviços de tecnologia:<br><br>💻 <strong>Hospedagem Web</strong> - Servidores compartilhados de alta performance<br><br>🎯 <strong>Criação de Sites</strong> - Design responsivo e desenvolvimento web personalizado<br><br>🔧 <strong>Montagem de Servidores</strong> - Infraestrutura completa para sua empresa<br><br>📚 <strong>Formação Técnica</strong> - Cursos especializados em TI<br><br>สนใจ_qual serviço específico deseja conhecer mais?";
  }

  getProductResponse() {
    return "🛍️ Na nossa loja temos vários produtos de informática de qualidade!<br><br>💼 <strong>Computadores e Notebooks</strong> - Marcas confiáveis<br><br>📱 <strong>Periféricos</strong> - Mouses, teclados, monitores<br><br>💾 <strong>Componentes</strong> - Peças originais<br><br>🔌 <strong>Acessórios</strong> - Cabos, carregadores, proteções<br><br>Quer ver nosso catálogo completo? Posso te mostrar os produtos disponíveis!";
  }

  getPriceResponse() {
    return "💰 Nossos preços variam conforme o serviço/produto escolhido:<br><br>• Hospedagem web: A partir de 15.000 Kz/mês<br>• Criação de sites: A partir de 80.000 Kz<br>• Servidores: Orçamento personalizado<br>• Formação: A partir de 25.000 Kz<br>• Equipamentos: Preços especiais<br><br>Para um orçamento específico, posso conectar você com nosso comercial no WhatsApp! 📱";
  }

  getContactResponse() {
    return "📞 Informações de contato:<br><br>📱 <strong>WhatsApp:</strong> +244 923 898 014<br>📧 <strong>Email:</strong> comercial@mts.it.ao<br>📍 <strong>Localização:</strong> Cassequel do Lorena, Angola<br><br>Horário de atendimento: Segunda a Sexta, 8h às 18h<br><br>Posso te ajudar a enviar uma mensagem diretamente para nosso comercial?";
  }

  getAboutResponse() {
    return "🏢 <strong>Sobre a MTS:</strong><br><br>• Empresa angolana especializada em tecnologia<br>• Anos de experiência no mercado local<br>• Soluções completas de hospedagem web<br>• Desenvolvimento de sites profissionais<br>• Montagem e configuração de servidores<br>• Formação técnica em informática<br>• Venda de equipamentos de qualidade<br><br>Nossa missão é transformar ideias em soluções digitais de excelência! 🚀";
  }

  getHelpResponse() {
    return "🆘 Estou aqui para ajudar! Posso te auxiliar com:<br><br>• Informações sobre nossos serviços<br>• Preços e orçamentos<br>• Dúvidas técnicas<br>• Processo de contratação<br>• Suporte inicial<br><br>Me conta mais sobre o que você precisa que eu te ajudo da melhor forma! 💡";
  }

  getThankYouResponse() {
    return "😊 Fico feliz em ter ajudado! Se precisar de mais alguma coisa, estou sempre aqui. A MTS agradece seu contato e está pronta para oferecer as melhores soluções em tecnologia para o seu negócio! 🚀";
  }

  getDefaultResponse() {
    const responses = [
      "🤔 Não tenho certeza se entendi completamente. Você poderia reformular sua pergunta? Posso te ajudar com informações sobre nossos serviços, produtos, preços ou contato.",
      "💡 Para te ajudar melhor, posso te mostrar:<br>• Nossos serviços de hospedagem e desenvolvimento<br>• Produtos de informática disponíveis<br>• Informações de contato<br>• Preços e orçamentos<br><br>Sobre o que você gostaria de saber?",
      "🤖 Estou aprendendo a entender melhor suas perguntas! Enquanto isso, posso te ajudar com informações sobre a MTS. Que tal me perguntar sobre nossos serviços ou produtos?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  showTypingIndicator() {
    this.typingIndicator = document.createElement("div");
    this.typingIndicator.className = "message bot-message typing-indicator";
    this.typingIndicator.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
    this.chatbotMessages.appendChild(this.typingIndicator);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    if (this.typingIndicator) {
      this.typingIndicator.remove();
      this.typingIndicator = null;
    }
  }

  setupTypingIndicator() {
    // Adicionar estilos para o indicador de digitação
    const style = document.createElement("style");
    style.textContent = `
            .typing-indicator {
                display: flex;
                align-items: center;
                padding: 12px 15px;
            }
            
            .typing-dots {
                display: flex;
                gap: 4px;
            }
            
            .typing-dots span {
                width: 8px;
                height: 8px;
                background: #0468af;
                border-radius: 50%;
                animation: typingDot 1.4s ease-in-out infinite;
            }
            
            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typingDot {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-8px); }
            }
        `;
    document.head.appendChild(style);
  }

  scrollToBottom() {
    this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
  }

  saveConversation() {
    localStorage.setItem(
      "mts-chatbot-conversation",
      JSON.stringify(this.conversation)
    );
  }

  loadConversation() {
    const saved = localStorage.getItem("mts-chatbot-conversation");
    if (saved) {
      this.conversation = JSON.parse(saved);
      // Recriar mensagens salvas
      this.conversation.forEach((msg) => {
        this.addMessage(msg.message, msg.sender === "user" ? "user" : "bot");
      });
    }
  }

  // Funções especiais do chatbot
  suggestServices() {
    setTimeout(() => {
      this.addMessage(
        "💡 Posso te sugerir alguns de nossos serviços mais populares:"
      );
      setTimeout(() => {
        this.addMessage(
          "1. 🌐 Hospedagem web compartilhada - Perfeita para sites pessoais e pequenas empresas"
        );
      }, 1000);
      setTimeout(() => {
        this.addMessage(
          "2. 💻 Criação de sites responsivos - Design moderno que funciona em todos os dispositivos"
        );
      }, 2000);
      setTimeout(() => {
        this.addMessage(
          "3. 🔧 Servidores personalizados - Infraestrutura sob medida para sua empresa"
        );
      }, 3000);
    }, 500);
  }

  sendToWhatsApp(message) {
    const phoneNumber = "+244923898014";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }

  // Comandos especiais
  handleSpecialCommands(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("ver produtos")) {
      this.addMessage("🛍️ Claro! Vou te mostrar nossa área de produtos...");
      setTimeout(() => {
        document
          .querySelector("#products")
          .scrollIntoView({ behavior: "smooth" });
        this.closeChatbot();
      }, 1000);
      return true;
    }

    if (lowerMessage.includes("ver serviços")) {
      this.addMessage("🌐 Vou te mostrar nossos serviços...");
      setTimeout(() => {
        document
          .querySelector("#services")
          .scrollIntoView({ behavior: "smooth" });
        this.closeChatbot();
      }, 1000);
      return true;
    }

    if (lowerMessage.includes("falar com comercial")) {
      const contactMessage =
        "Olá! Gostaria de informações sobre os serviços da MTS.";
      this.addMessage("📞 Conectando você com nosso comercial...");
      setTimeout(() => {
        this.sendToWhatsApp(contactMessage);
        this.closeChatbot();
      }, 1000);
      return true;
    }

    return false;
  }
}

// Inicializar chatbot quando o DOM estiver pronto (desktop only)
document.addEventListener("DOMContentLoaded", () => {
  // Only initialize chatbot on desktop devices
  if (window.innerWidth >= 769) {
    window.mtsChatbot = new MTSChatbot();
  }
});

// Adicionar estilos CSS para o chatbot
const chatbotStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: linear-gradient(135deg, #28a745, #20c997);
    }
    
    .notification-error {
        background: linear-gradient(135deg, #dc3545, #e74c3c);
    }
    
    .notification-info {
        background: linear-gradient(135deg, #0468af, #1e008a);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .message-link {
        color: #0468af;
        text-decoration: none;
        font-weight: 600;
    }
    
    .message-link:hover {
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            top: 10px;
        }
    }
`;

// Adicionar estilos ao head
const styleSheet = document.createElement("style");
styleSheet.textContent = chatbotStyles;
document.head.appendChild(styleSheet);
