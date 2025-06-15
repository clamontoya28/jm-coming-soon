// Creazione stelle dinamiche (non più necessaria con lo sfondo 4K)
// Invece aggiungiamo l'elemento per lo sfondo stellato 4K
function createStarsBackground() {
    const starsBg = document.createElement('div');
    starsBg.classList.add('stars-bg');
    document.body.appendChild(starsBg);
}

// Animazioni al scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.remove('fade-out');
            } else {
                entry.target.classList.add('fade-out');
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });
    
    // Osserva tutte le sezioni principali
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Osserva gli elementi della timeline
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
    
    // Osserva gli elementi con classe fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll effect
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Menu mobile
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Effetto parallax per lo sfondo stellato
function setupParallax() {
    const starsBg = document.querySelector('.stars-bg');
    if (starsBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            starsBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    createStarsBackground();
    animateOnScroll();
    setupNavbar();
    setupMobileMenu();
    setupParallax();
    
    // Attiva la prima sezione (hero) immediatamente
    document.querySelector('.hero').classList.add('active');
});