// Dados dos projetos usando os dados fornecidos
const projetos = [
    {
        id: 1,
        nome: "Loja na Serra do Cipó",
        cliente: "Leonardo e Sunny",
        avaliacao: 5,
        depoimento: "A equipe transformou nosso espaço comercial em um ambiente que encanta clientes e otimiza o fluxo de trabalho.",
        imagem_principal: "images/projeto1.png",
        imagens_extras: ["images/projeto1_foto1.png", "images/projeto1_foto2.png", "images/projeto1_foto3.png", "images/projeto1_foto4.png"]
    },
    {
        id: 2,
        nome: "Residência em Vespasiano", 
        cliente: "Leandro",
        avaliacao: 5,
        depoimento: "O projeto superou todas as expectativas, criando uma casa que dialoga perfeitamente com a paisagem urbana.",
        imagem_principal: "images/projeto2.png",
        imagens_extras: ["images/projeto2_foto1.png", "images/projeto2_foto2.png", "images/projeto2_foto3.png", "images/projeto2_foto4.png"]
    },
    {
        id: 3,
        nome: "Consultório Maria Teresa",
        cliente: "Maria Teresa", 
        avaliacao: 5,
        depoimento: "Conseguiram criar um ambiente profissional acolhedor que transmite confiança aos pacientes.",
        imagem_principal: "images/projeto3.png",
        imagens_extras: ["images/projeto3_foto1.png", "images/projeto3_foto2.png", "images/projeto3_foto3.png", "images/projeto3_foto4.png"]
    },
    {
        id: 4,
        nome: "Padaria Noca Padoca",
        cliente: "Marina",
        avaliacao: 5, 
        depoimento: "O projeto revitalizou nosso espaço comercial, aumentando a eficiência operacional.",
        imagem_principal: "images/projeto4.png",
        imagens_extras: ["images/projeto4_foto1.png", "images/projeto4_foto2.png", "images/projeto4_foto3.png", "images/projeto4_foto4.png"]
    },
    {
        id: 5,
        nome: "Chalé em São Francisco",
        cliente: "Aniete",
        avaliacao: 5,
        depoimento: "A integração com a natureza criou um refúgio perfeito com conforto moderno.",
        imagem_principal: "images/projeto5.png",
        imagens_extras: ["images/projeto5_foto1.png", "images/projeto5_foto2.png", "images/projeto5_foto3.png", "images/projeto5_foto4.png"]
    },
    {
        id: 6,
        nome: "Pousada Mei do Mato", 
        cliente: "Carlos Eduardo",
        avaliacao: 5,
        depoimento: "Cada suíte foi planejada para oferecer experiência única aproveitando a topografia.",
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
    initImageErrorHandling();
    console.log('Todas as funcionalidades inicializadas com sucesso!');
});

// Navegação suave entre seções
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
    
    // Controlar display
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
            }
        });
        
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
                background-color: #f0f0f0;
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
    console.log('Site carregado completamente!');
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
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
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
console.log('Recanto Arquitetura - Script carregado com sucesso!');
console.log('Projetos carregados:', projetos.length);

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
    initProjectHoverEffects();
});

// Smooth scroll polyfill para navegadores mais antigos
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('Smooth scroll não suportado nativamente - usando implementação manual');
    
    function smoothScrollTo(targetY, duration = 800) {
        const startY = window.scrollY;
        const difference = targetY - startY;
        const startTime = performance.now();
        
        function step() {
            const progress = (performance.now() - startTime) / duration;
            const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startY + difference * Math.min(ease, 1));
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
}

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

// Verificar se todas as imagens estão com os caminhos corretos
function verificarCaminhosImagens() {
    console.log('=== VERIFICAÇÃO DOS CAMINHOS DE IMAGENS ===');
    
    // Verificar imagens principais
    const imagensPrincipais = [
        'images/logo_recanto_header.png',
        'images/recanto_home_logo.png', 
        'images/logo_recanto_footer.png',
        'images/foto_socio1.png',
        'images/foto_socio2.png'
    ];
    
    console.log('Imagens principais esperadas:');
    imagensPrincipais.forEach(img => console.log(`- ${img}`));
    
    // Verificar imagens do método
    const imagensMetodo = [
        'images/metodo_estudo.png',
        'images/metodo_anteprojeto.png', 
        'images/metodo_executivo.png',
        'images/metodo_detalhamento.png',
        'images/metodo_execucao.png'
    ];
    
    console.log('Imagens do método esperadas:');
    imagensMetodo.forEach(img => console.log(`- ${img}`));
    
    // Verificar imagens dos projetos
    console.log('Imagens dos projetos esperadas:');
    for (let i = 1; i <= 6; i++) {
        console.log(`- images/projeto${i}.png`);
        for (let j = 1; j <= 4; j++) {
            console.log(`- images/projeto${i}_foto${j}.png`);
        }
    }
    
    console.log('=== FIM DA VERIFICAÇÃO ===');
}

// Executar verificação após carregamento
setTimeout(verificarCaminhosImagens, 1000);