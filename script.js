document.addEventListener('DOMContentLoaded', () => {
    


    // --- Loading Bar ---
    const loadingBar = document.getElementById('loading-bar');
    if (loadingBar) {
        loadingBar.addEventListener('animationend', () => {
            loadingBar.remove();
        });
    }

    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navOverlayLinks = document.querySelectorAll('.nav-overlay-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('nav-open');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    navOverlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
            if (hamburger) hamburger.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
        });
    });

    // --- Scroll Behaviors ---
    const navbar = document.querySelector('.navbar');
    const heroImg = document.querySelector('.hero-img-main');
    const galleryItems = document.querySelectorAll('.g-item');
    const craftWatermark = document.querySelector('.craft-watermark');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Navbar fade-in
        if (navbar) {
            if (scrolled > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Parallax on hero image (desktop only)
        if (heroImg && window.innerWidth > 1024) {
            heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // Gallery tilt on scroll (non-touch)
        if (!isTouch() && window.innerWidth > 768) {
            galleryItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const center = window.innerHeight / 2;
                const offset = (rect.top - center) / center;
                // Cap rotation
                let rotation = offset * 2;
                if (rotation > 2) rotation = 2;
                if (rotation < -2) rotation = -2;
                
                item.style.transform = `rotateZ(${rotation}deg)`;
            });
        }
    }, { passive: true });


    // --- Intersection Observer (Scroll Reveals) ---
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Special observer for craft watermark
    if (craftWatermark) {
        const watermarkObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0.04';
                }
            });
        }, { threshold: 0.3 });
        watermarkObserver.observe(craftWatermark);
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
