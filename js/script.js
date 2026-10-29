/**
 * ONG APC - Ação pelos Povos e Conservação
 * Script principal do site
 */
document.addEventListener('DOMContentLoaded', function () {
    // ===== Header scroll effect =====
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ===== Menu mobile =====
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        const navLinks = nav.querySelectorAll('.nav-link, .dropdown-menu a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    const parent = this.closest('.dropdown');
                    if (parent && this.classList.contains('nav-link')) {
                        parent.classList.toggle('open');
                        return;
                    }
                }
                
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== Smooth scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Formulário de contato =====
    // Desativado porque o envio agora é feito pelo FormSubmit
    /*
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // ... código antigo ...
        });
    }
    */

    // ===== Animação de entrada =====
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };
    
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.action-card, .news-card, .about-content, .about-image-placeholder'
    );
    
    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===== Carrossel da página de notícia =====
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (track && slides.length > 0) {
        let current = 0;
        const total = slides.length;

        if (dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer ? dotsContainer.querySelectorAll('button') : [];

        function goTo(index) {
            current = (index + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    }

    // ===== Mensagem de sucesso após envio do formulário =====
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('enviado') === '1') {
        const msg = document.createElement('div');
        msg.textContent = 'Sua mensagem foi enviada com sucesso!';
        msg.style.cssText = 'position:fixed;top:90px;left:50%;transform:translateX(-50%);background:#52CCA3;color:white;padding:16px 28px;border-radius:10px;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.15);z-index:9999;text-align:center;max-width:90%;';
        document.body.appendChild(msg);

        setTimeout(function () {
            msg.remove();
            const cleanUrl = window.location.origin + window.location.pathname + '#contato';
            window.history.replaceState({}, document.title, cleanUrl);
        }, 5000);
    }
});
