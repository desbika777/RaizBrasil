// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegação mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Header transparente/sólido baseado no scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Observador para fade-in
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Adiciona animação fade-in aos elementos
    const animatedElements = document.querySelectorAll('.feature-card, .product-item, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Contador animado para estatísticas (se houver)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Efeito parallax sutil no hero
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // Animação de digitação para o hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Carousel automático para produtos (se implementado)
    const productGrid = document.querySelector('.products-grid');
    if (productGrid) {
        // Adiciona efeito hover 3D aos produtos
        const productItems = document.querySelectorAll('.product-item');
        
        productItems.forEach(item => {
            item.addEventListener('mousemove', function(e) {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            item.addEventListener('mouseleave', function() {
                item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
    
    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula envio do formulário
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simula delay de envio
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem Enviada!';
                submitBtn.style.background = '#28a745';
                
                // Reset após 3 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
        
        // Validação em tempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.required && !this.value.trim()) {
                    this.style.borderColor = '#ff6b6b';
                    this.style.boxShadow = '0 0 5px rgba(255, 107, 107, 0.3)';
                } else {
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(255, 107, 107)') {
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                }
            });
        });
    }
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
    
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            // Easter egg ativado!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
            
            // Adiciona animação rainbow ao CSS temporariamente
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.head.removeChild(style);
            }, 10000);
        }
    });
    
    // Adiciona ripple effect aos botões
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
        
        // Remove o ripple após a animação
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
    
    // Adiciona CSS para o ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Aplica ripple effect a todos os botões
    const buttons = document.querySelectorAll('.btn, .btn-view');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Product Carousel Functionality
    initializeCarousels();
    
    function initializeCarousels() {
        const carousels = document.querySelectorAll('.product-carousel');
        
        carousels.forEach((carousel, carouselIndex) => {
            const slides = carousel.querySelectorAll('.carousel-slide');
            const indicators = carousel.querySelectorAll('.indicator');
            const prevBtn = carousel.querySelector('.carousel-btn.prev');
            const nextBtn = carousel.querySelector('.carousel-btn.next');
            
            let currentSlide = 0;
            
            // Auto-slide every 4 seconds
            let autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 4000);
            
            // Pause auto-slide on hover
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            // Resume auto-slide on mouse leave
            carousel.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    nextSlide();
                }, 4000);
            });
            
            function updateSlides() {
                slides.forEach((slide, index) => {
                    slide.classList.remove('active', 'prev');
                    
                    if (index === currentSlide) {
                        slide.classList.add('active');
                    } else if (index < currentSlide) {
                        slide.classList.add('prev');
                    }
                });
                
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
            }
            
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlides();
            }
            
            function prevSlide() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlides();
            }
            
            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                updateSlides();
            }
            
            // Event listeners
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => goToSlide(index));
            });
            
            // Touch/swipe support
            let startX = 0;
            let endX = 0;
            
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = startX - endX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            }
        });
    }
    
    // Performance: debounce para eventos de scroll e resize
    function debounce(func, wait) {
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
    
    // Aplica debounce aos eventos de scroll
    const debouncedScroll = debounce(function() {
        // Lógica de scroll otimizada aqui
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Preload de imagens importantes
    const criticalImages = [
        // Lista de URLs de imagens críticas para preload
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Hero Carousel Functionality
    function initializeHeroCarousel() {
        const heroSlides = document.querySelectorAll('.hero-slide');
        const prevBtn = document.getElementById('heroPrev');
        const nextBtn = document.getElementById('heroNext');
        const indicators = document.querySelectorAll('.hero-carousel-indicators .indicator');
        
        if (!heroSlides.length) return;
        
    let currentSlide = 0;
    let isTransitioning = false;
    let autoSlideInterval;
    let restartTimeout;
    const AUTO_SLIDE_DELAY = 5500; // tempo base entre slides (reduzido de 6500)
    const RESTART_DELAY_NEXT = 5000; // pausa após avançar manualmente (antes 6000)
    const RESTART_DELAY_PREV = 6500; // pausa mais longa ao voltar (antes 8000)
    const RESTART_DELAY_INDICATOR = 5500; // pausa após clicar em indicador (antes 7000)
        
        // Update slide display
        function updateSlides() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            heroSlides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next');
                
                if (index === currentSlide) {
                    slide.classList.add('active');
                } else if (index === (currentSlide - 1 + heroSlides.length) % heroSlides.length) {
                    slide.classList.add('prev');
                } else if (index === (currentSlide + 1) % heroSlides.length) {
                    slide.classList.add('next');
                }
            });
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Reset transition flag after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }
        
        // Next slide
        function nextSlide() {
            if (isTransitioning) return;
            currentSlide = (currentSlide + 1) % heroSlides.length;
            updateSlides();
        }
        
        // Previous slide
        function prevSlide() {
            if (isTransitioning) return;
            currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
            updateSlides();
        }
        
        // Go to specific slide
        function goToSlide(index) {
            if (isTransitioning || index === currentSlide) return;
            currentSlide = index;
            updateSlides();
        }
        
        // Auto-slide functionality
        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        function scheduleRestart(delay) {
            clearTimeout(restartTimeout);
            restartTimeout = setTimeout(() => {
                startAutoSlide();
            }, delay);
        }
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoSlide();
                scheduleRestart(RESTART_DELAY_PREV);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoSlide();
                scheduleRestart(RESTART_DELAY_NEXT);
            });
        }
        
        // Indicator click events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                stopAutoSlide();
                scheduleRestart(RESTART_DELAY_INDICATOR);
            });
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const heroCarousel = document.querySelector('.hero-carousel');
        
        if (heroCarousel) {
            heroCarousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            heroCarousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const swipeDistance = touchStartX - touchEndX;
                
                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance > 0) {
                        nextSlide(); // Swipe left - next slide
                    } else {
                        prevSlide(); // Swipe right - previous slide
                    }
                    stopAutoSlide();
                    scheduleRestart(RESTART_DELAY_NEXT);
                }
            }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoSlide();
                scheduleRestart(RESTART_DELAY_PREV);
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoSlide();
                scheduleRestart(RESTART_DELAY_NEXT);
            }
        });
        
        // Pause auto-slide when hovering over carousel
        const heroContainer = document.querySelector('.hero-carousel-container');
        if (heroContainer) {
            heroContainer.addEventListener('mouseenter', stopAutoSlide);
            heroContainer.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Initialize
        updateSlides();
        startAutoSlide();
        
        // Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoSlide(); // retoma quando volta à viewport
                } else {
                    stopAutoSlide(); // pausa quando sai
                }
            });
        });
        
        if (heroContainer) {
            observer.observe(heroContainer);
        }
    }
    
    // Initialize hero carousel
    initializeHeroCarousel();
    
    // Console message para desenvolvedores
    console.log(`
    🌱 RAIZ BRASIL - Desenvolvido com 💚
    
    Site criado com tecnologias modernas:
    - HTML5 Semântico
    - CSS3 com Grid e Flexbox
    - JavaScript ES6+
    - Animações CSS e JavaScript
    - Design Responsivo
    - Performance Otimizada
    
    "Do Sol ao Solo, a Nossa Camisa é Brasil" 🇧🇷
    `);
    
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registrado com sucesso:', registration.scope);
            })
            .catch(function(error) {
                console.log('Falha ao registrar ServiceWorker:', error);
            });
    });
}

// Função para compartilhamento social
function shareContent(platform, text, url) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Adiciona funcionalidade de compartilhamento aos links sociais
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    const currentUrl = window.location.href;
    const shareText = 'Confira a Raiz Brasil - Do Sol ao Solo, a Nossa Camisa é Brasil! 🇧🇷';
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href.includes('instagram')) {
                // Instagram não suporta compartilhamento direto via URL
                alert('Visite nosso Instagram @raizbrasil');
            } else if (href.includes('facebook')) {
                shareContent('facebook', shareText, currentUrl);
            } else if (href.includes('whatsapp')) {
                shareContent('whatsapp', shareText, currentUrl);
            }
        });
    });
});
