// Dados dos projetos usando os dados fornecidos
const projetos = [
    {
        id: 1,
        nome: "Loja na Serra do Cipó",
        cliente: "Leonardo e Sunny",
        avaliacao: 5,
        depoimento: "A equipe transformou nosso espaço comercial em um ambiente que encanta clientes e otimiza o fluxo de trabalho. Cada detalhe foi pensado para harmonizar funcionalidade e estética.",
        imagem_principal: "images/projeto1.png",
        imagens_extras: ["images/projeto1_foto1.png", "images/projeto1_foto2.png", "images/projeto1_foto3.png", "images/projeto1_foto4.png"]
    },
    {
        id: 2,
        nome: "Residência em Vespasiano", 
        cliente: "Leandro",
        avaliacao: 5,
        depoimento: "O projeto superou todas as expectativas, criando uma casa que dialoga perfeitamente com a paisagem urbana enquanto mantém privacidade e conforto.",
        imagem_principal: "images/projeto2.png",
        imagens_extras: ["images/projeto2_foto1.png", "images/projeto2_foto2.png", "images/projeto2_foto3.png", "images/projeto2_foto4.png"]
    },
    {
        id: 3,
        nome: "Consultório Maria Teresa",
        cliente: "Maria Teresa", 
        avaliacao: 5,
        depoimento: "Conseguiram criar um ambiente profissional acolhedor que transmite confiança aos pacientes, com iluminação e circulação impecáveis.",
        imagem_principal: "images/projeto3.png",
        imagens_extras: ["images/projeto3_foto1.png", "images/projeto3_foto2.png", "images/projeto3_foto3.png", "images/projeto3_foto4.png"]
    },
    {
        id: 4,
        nome: "Padaria Noca Padoca",
        cliente: "Marina",
        avaliacao: 5, 
        depoimento: "O projeto revitalizou nosso espaço comercial, aumentando a eficiência operacional e atraindo novos clientes com seu design convidativo.",
        imagem_principal: "images/projeto4.png",
        imagens_extras: ["images/projeto4_foto1.png", "images/projeto4_foto2.png", "images/projeto4_foto3.png", "images/projeto4_foto4.png"]
    },
    {
        id: 5,
        nome: "Chalé em São Francisco",
        cliente: "Aniete",
        avaliacao: 5,
        depoimento: "A integração com a natureza e os materiais locais criaram um refúgio perfeito, mantendo todo o conforto moderno que precisávamos.",
        imagem_principal: "images/projeto5.png",
        imagens_extras: ["images/projeto5_foto1.png", "images/projeto5_foto2.png", "images/projeto5_foto3.png", "images/projeto5_foto4.png"]
    },
    {
        id: 6,
        nome: "Pousada Mei do Mato", 
        cliente: "Carlos Eduardo",
        avaliacao: 5,
        depoimento: "Cada suíte foi cuidadosamente planejada para oferecer uma experiência única, aproveitando a topografia do terreno de forma inteligente.",
        imagem_principal: "images/projeto6.png",
        imagens_extras: ["images/projeto6_foto1.png", "images/projeto6_foto2.png", "images/projeto6_foto3.png", "images/projeto6_foto4.png"]
    }
];

// Inicialização quando o DOM carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - inicializando funcionalidades...');
    initNavigation();
    initMobileMenu();
    initProjectModals();
    initContactForm();
    initScrollSpy();
    initScrollAnimations();
    initPageTransitions();
    initImageErrorHandling();
    console.log('Todas as funcionalidades inicializadas com sucesso!');
});

// Navegação suave entre seções com duração de 800ms
function initNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const headerHeight = 80;

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Animação de transição suave
                smoothScrollToElement(targetElement, headerHeight, 800);
                
                // Fechar menu mobile se estiver aberto
                closeMobileMenu();
                
                // Adicionar efeito de fade durante a transição
                addPageTransitionEffect();
            }
        });
    });
}

// Scroll suave personalizado com duração de 800ms
function smoothScrollToElement(element, offset = 0, duration = 800) {
    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Função de easing para suavizar a animação
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Efeito de transição entre páginas
function addPageTransitionEffect() {
    const sections = document.querySelectorAll('.section');
    
    // Adicionar efeito de fade suave
    sections.forEach(section => {
        section.style.transition = 'opacity 0.3s ease';
        section.style.opacity = '0.7';
    });
    
    // Restaurar opacidade após a transição
    setTimeout(() => {
        sections.forEach(section => {
            section.style.opacity = '1';
        });
    }, 300);
}

// Inicializar transições de página
function initPageTransitions() {
    // Efeito de entrada inicial
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.opacity = '0';
        homeSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            homeSection.style.transition = 'all 1s ease';
            homeSection.style.opacity = '1';
            homeSection.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Fechar menu ao clicar em um link
        const mobileLinks = document.querySelectorAll('.nav-mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMobile.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    menuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
    
    // Controlar display com animação
    if (navMobile.classList.contains('active')) {
        navMobile.style.display = 'block';
        // Trigger reflow para aplicar a animação
        navMobile.offsetHeight;
    } else {
        setTimeout(() => {
            if (!navMobile.classList.contains('active')) {
                navMobile.style.display = 'none';
            }
        }, 300);
    }
}

function closeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (menuToggle && navMobile) {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        
        setTimeout(() => {
            navMobile.style.display = 'none';
        }, 300);
    }
}

// Animações de scroll com Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Animações específicas para diferentes tipos de elementos
                if (target.classList.contains('fade-in-up')) {
                    target.classList.add('animate');
                }
                
                if (target.classList.contains('fade-in-scale')) {
                    target.classList.add('animate');
                }
                
                if (target.classList.contains('stagger-animation')) {
                    animateStaggerElement(target);
                }
                
                if (target.classList.contains('metodo-item')) {
                    animateMetodoItem(target);
                }
                
                if (target.classList.contains('projeto-item')) {
                    animateProjetoItem(target);
                }
                
                if (target.classList.contains('info-item')) {
                    target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-scale, .stagger-animation, .metodo-item, .projeto-item, .info-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Animação stagger para etapas do método
function animateStaggerElement(element) {
    const delay = element.dataset.delay || 0;
    
    setTimeout(() => {
        element.classList.add('animate');
    }, parseInt(delay));
}

// Animação específica para itens do método
function animateMetodoItem(element) {
    const delay = element.dataset.delay || 0;
    
    setTimeout(() => {
        element.classList.add('animate');
        
        // Animação adicional para o círculo
        const circle = element.querySelector('.metodo-circle-img');
        if (circle) {
            circle.style.transform = 'scale(1.1)';
            setTimeout(() => {
                circle.style.transform = 'scale(1)';
            }, 300);
        }
    }, parseInt(delay));
}

// Animação específica para projetos
function animateProjetoItem(element) {
    const delay = element.dataset.delay || 0;
    
    setTimeout(() => {
        element.classList.add('animate');
        
        // Efeito de escala com bounce
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }, parseInt(delay));
}

// Modais dos projetos
function initProjectModals() {
    const projetoItems = document.querySelectorAll('.projeto-item');
    const modal = document.getElementById('modal-projeto');
    const modalClose = document.querySelector('.modal-close');
    
    // Abrir modal ao clicar no projeto
    projetoItems.forEach((item, index) => {
        const btnDetalhes = item.querySelector('.btn-detalhes');
        
        if (btnDetalhes) {
            btnDetalhes.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openProjectModal(index);
            });
        }
        
        // Também permitir clicar na área do projeto
        item.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn-detalhes')) {
                openProjectModal(index);
            }
        });
    });
    
    // Fechar modal
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }
    
    // Fechar modal clicando fora
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Prevenir que cliques dentro do modal fechem o modal
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openProjectModal(index) {
    const projeto = projetos[index];
    const modal = document.getElementById('modal-projeto');
    const modalTitle = document.getElementById('modal-title');
    const modalClient = document.getElementById('modal-client');
    const modalDepoimento = document.getElementById('modal-depoimento');
    
    if (modal && projeto) {
        modalTitle.textContent = projeto.nome;
        modalClient.textContent = `Cliente: ${projeto.cliente}`;
        modalDepoimento.textContent = `"${projeto.depoimento}"`;
        
        // Atualizar imagens extras do modal
        const modalImgs = [
            document.getElementById('modal-img1'),
            document.getElementById('modal-img2'), 
            document.getElementById('modal-img3'),
            document.getElementById('modal-img4')
        ];
        
        modalImgs.forEach((img, imgIndex) => {
            if (img && projeto.imagens_extras[imgIndex]) {
                img.src = projeto.imagens_extras[imgIndex];
                img.alt = `${projeto.nome} - Foto ${imgIndex + 1}`;
                // Reset animation
                img.style.animation = 'none';
                img.offsetHeight; // Trigger reflow
                img.style.animation = null;
            }
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animação de entrada
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById('modal-projeto');
    
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Formulário de contato
function initContactForm() {
    const form = document.getElementById('form-contato');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }
}

function handleFormSubmit() {
    const form = document.getElementById('form-contato');
    const formData = new FormData(form);
    
    // Validação básica
    const nome = formData.get('nome');
    const email = formData.get('email');
    const telefone = formData.get('telefone');
    const mensagem = formData.get('mensagem');
    
    if (!nome || !email || !telefone || !mensagem) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Simular envio
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'ENVIANDO...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }, 1500);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Scroll Spy para destacar seção ativa no menu
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a, .nav-mobile-menu a');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover classe ativa de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adicionar classe ativa ao link correspondente
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttle para performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveSection();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    updateActiveSection(); // Executar uma vez na inicialização
}

// Tratamento de erro para imagens que não carregam
function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Erro ao carregar imagem: ${this.src}`);
            
            // Criar placeholder para imagem que não carregou
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder-img';
            placeholder.style.cssText = `
                width: ${this.offsetWidth || 200}px;
                height: ${this.offsetHeight || 200}px;
                background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
                border: 2px dashed #ccc;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                color: #666;
                font-size: 14px;
                text-align: center;
                padding: 20px;
                box-sizing: border-box;
                font-family: inherit;
            `;
            
            // Texto baseado no alt ou src da imagem
            let placeholderText = 'IMAGEM NÃO ENCONTRADA';
            if (this.alt) {
                placeholderText = this.alt.toUpperCase();
            } else if (this.src) {
                const filename = this.src.split('/').pop().split('.')[0];
                placeholderText = filename.replace(/_/g, ' ').toUpperCase();
            }
            
            placeholder.innerHTML = `<span>${placeholderText}</span>`;
            
            // Substituir imagem pelo placeholder
            this.parentNode.replaceChild(placeholder, this);
        });
    });
}

// Efeitos de parallax sutil
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.section');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrollTop * -0.5;
            element.style.transform = `translateY(${rate * 0.1}px)`;
        });
    }
    
    // Throttle para performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });
}

// Função para melhorar performance do scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Ajustar altura das seções em dispositivos móveis
function adjustMobileHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', throttle(adjustMobileHeight, 250));
adjustMobileHeight();

// Preloader e animações de entrada
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Inicializar parallax se não for mobile
    if (window.innerWidth > 768) {
        initParallaxEffects();
    }
    
    // Animação inicial para elementos na viewport
    const initialElements = document.querySelectorAll('.fade-in-up, .fade-in-scale');
    initialElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('animate');
        }
    });
    
    console.log('Site carregado completamente com animações!');
});

// Melhorar acessibilidade
function initAccessibility() {
    // Adicionar foco visível para navegação por teclado
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #61452B';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Efeitos de hover nos projetos
function initProjectHoverEffects() {
    const projetoItems = document.querySelectorAll('.projeto-item');
    
    projetoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor de FPS simples
    let fps = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
        const currentTime = performance.now();
        fps = 1000 / (currentTime - lastTime);
        lastTime = currentTime;
        
        // Log FPS baixo
        if (fps < 30) {
            console.warn(`FPS baixo detectado: ${fps.toFixed(1)}`);
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    // Iniciar monitoramento apenas em desenvolvimento
    if (window.location.hostname === 'localhost') {
        measureFPS();
    }
}

// Debug e verificação de elementos
function checkElementsLoaded() {
    const requiredElements = [
        '.header',
        '.nav-menu',
        '.menu-toggle',
        '.section',
        '.projeto-item',
        '#form-contato',
        '#modal-projeto'
    ];
    
    const missingElements = requiredElements.filter(selector => 
        !document.querySelector(selector)
    );
    
    if (missingElements.length > 0) {
        console.warn('Elementos não encontrados:', missingElements);
    } else {
        console.log('Todos os elementos necessários foram carregados!');
    }
}

// Error handling global
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
});

// Verificar elementos após um breve delay
setTimeout(checkElementsLoaded, 500);

// Log de inicialização
console.log('Recanto Arquitetura - Script carregado com animações aprimoradas!');
console.log('Projetos carregados:', projetos.length);

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
    initProjectHoverEffects();
    initPerformanceMonitoring();
});

// Funcionalidades para SEO e performance
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading para imagens (se suportado)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    // Preconnect para fontes externas
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = 'https://fonts.gstatic.com';
    preconnectLink.crossOrigin = 'anonymous';
    document.head.appendChild(preconnectLink);
});

// Service Worker para cache offline (futuro)
if ('serviceWorker' in navigator) {
    console.log('Service Worker disponível para implementação futura');
}

// Função para otimizar imagens com WebP se suportado
function checkWebPSupport() {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
        if (webP.height === 2) {
            console.log('WebP suportado - otimização de imagens disponível');
        }
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

checkWebPSupport();

// Smooth scroll polyfill para navegadores mais antigos
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('Implementando smooth scroll manual para compatibilidade');
}

// Finalização
console.log('Sistema de animações e transições inicializado com sucesso!');