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
    handleScroll(); // Estado inicial

    // ===== Menu mobile =====
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Fechar menu ao clicar em um link
        const navLinks = nav.querySelectorAll('.nav-link, .dropdown-menu a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                // Em mobile, se for um dropdown, apenas abre/fecha o submenu
                if (window.innerWidth <= 768) {
                    const parent = this.closest('.dropdown');
                    if (parent && this.classList.contains('nav-link')) {
                        parent.classList.toggle('open');
                        // Não fecha o menu principal se for dropdown
                        return;
                    }
                }
                
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== Smooth scroll para âncoras =====
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

    // ===== Formulário de contato (simulação) =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Simulação de envio – substitua por integração real (Formspree, EmailJS, backend etc.)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(function () {
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.\n\n(Nota: este é um formulário de demonstração. Configure um serviço de envio real.)');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    // ===== Animação simples de entrada (Intersection Observer) =====
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
    
    // Elementos que receberão animação
    const animatedElements = document.querySelectorAll(
        '.symbol-card, .action-card, .defend-item, .stat-card, .news-card, .about-content, .about-image-placeholder'
    );
    
    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Classe que revela o elemento
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
