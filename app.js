// Dados dos projetos atualizados
const projetos = [
    {
        nome: "Loja na Serra do Cipó",
        cliente: "Leonardo e Sunny",
        avaliacao: 5,
        depoimento: "Transformaram nossa loja em um espaço acolhedor que reflete perfeitamente a essência da região. Os clientes adoram o ambiente!"
    },
    {
        nome: "Residência em Vespasiano", 
        cliente: "Leandro",
        avaliacao: 5,
        depoimento: "Realizaram o sonho da casa própria com funcionalidade e beleza. Cada ambiente foi pensado para nossa família."
    },
    {
        nome: "Consultório Maria Teresa",
        cliente: "Maria Teresa", 
        avaliacao: 5,
        depoimento: "Criaram um ambiente profissional e acolhedor que transmite confiança aos meus pacientes. Superou minhas expectativas!"
    },
    {
        nome: "Padaria Noca Padoca",
        cliente: "Marina",
        avaliacao: 5, 
        depoimento: "O projeto da padaria ficou incrível! Funcional para o trabalho e atrativo para os clientes. Aumentou muito nosso movimento."
    },
    {
        nome: "Chalé em São Francisco",
        cliente: "Aniete",
        avaliacao: 5,
        depoimento: "Nosso refúgio na montanha ficou perfeito! Integrado com a natureza e extremamente aconchegante para a família."
    },
    {
        nome: "Pousada Mei do Mato", 
        cliente: "Carlos Eduardo",
        avaliacao: 5,
        depoimento: "A pousada ficou excepcional! Os hóspedes elogiam constantemente o ambiente e a funcionalidade dos espaços."
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
    initAnimations();
});

// Navegação suave
function initNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const headerHeight = 80;

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                closeMobileMenu();
            }
        });
    });
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
    
    // Forçar display
    if (navMobile.classList.contains('active')) {
        navMobile.style.display = 'block';
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

// Modais dos projetos - CORRIGIDO
function initProjectModals() {
    const projetoItems = document.querySelectorAll('.projeto-item');
    const modal = document.getElementById('modal-projeto');
    const modalClose = document.querySelector('.modal-close');
    
    // Abrir modal ao clicar no projeto
    projetoItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            openProjectModal(index);
        });
    });
    
    // Fechar modal - CORRIGIDO
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
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
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animação de entrada
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById('modal-projeto');
    
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 200);
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
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Simular envio
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'ENVIANDO...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Scroll Spy para destacar seção ativa
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

// Animações de entrada
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.metodo-item, .projeto-item, .form-group, .info-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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

// Preloader simples
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Pequena animação de entrada
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
        }, index * 100);
    });
});

// Função para ajustar altura das seções em dispositivos móveis
function adjustMobileHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', throttle(adjustMobileHeight, 250));
adjustMobileHeight();

// Função para destacar navegação ativa
function highlightActiveNav() {
    const navLinks = document.querySelectorAll('.nav-menu a, .nav-mobile-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

// Função para melhorar acessibilidade
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

// Função para melhorar performance de imagens
function optimizeImages() {
    const placeholderImages = document.querySelectorAll('.placeholder-img');
    
    // Adicionar lazy loading se necessário
    placeholderImages.forEach(img => {
        img.style.willChange = 'transform';
    });
}

// Função para adicionar efeitos de hover nos projetos
function initProjectHoverEffects() {
    const projetoItems = document.querySelectorAll('.projeto-item');
    
    projetoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    highlightActiveNav();
    initAccessibility();
    optimizeImages();
    initProjectHoverEffects();
});

// Debug
console.log('Script carregado com sucesso!');

// Error handling global
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
});

// Verificar elementos após carregamento
setTimeout(() => {
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
        console.log('Todos os elementos foram carregados com sucesso!');
    }
}, 1000);