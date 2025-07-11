/*=============== IMPROVED MOBILE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navLinks = document.querySelectorAll('.nav__link');

// Show menu
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.classList.add('menu-open'); // Prevent scrolling
    });
}

// Hide menu
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    }
});

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the blur-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header');
}
window.addEventListener('scroll', blurHeader);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrolltop class
    this.scrollY >= 350 ? scrollTop.classList.add('show-scroll')
                        : scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () =>{
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link');
        }else{
            sectionsClass.classList.remove('active-link');
        }                                                    
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== SMOOTH SCROLLING ===============*/
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*=============== ANIMATED COUNTER ===============*/
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const animateCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (target === 98 ? '%' : target === 5 ? '+' : target === 100 ? '+' : '');
                }
            };
            
            updateCounter();
            observer.unobserve(counter);
        }
    });
};

const counterObserver = new IntersectionObserver(animateCounter, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat__number').forEach(counter => {
    counterObserver.observe(counter);
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const revealOptions = {
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: false
};

// Initialize ScrollReveal if available
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal();
    
    sr.reveal('.hero__data', {
        ...revealOptions,
        delay: 600,
        origin: 'top'
    });
    
    sr.reveal('.about__image', {
        ...revealOptions,
        origin: 'left'
    });
    
    sr.reveal('.about__content', {
        ...revealOptions,
        origin: 'right'
    });
    
    sr.reveal('.service__card', {
        ...revealOptions,
        origin: 'bottom',
        interval: 100
    });
    
    sr.reveal('.pricing__card', {
        ...revealOptions,
        origin: 'bottom',
        interval: 100
    });
    
    sr.reveal('.case__study', {
        ...revealOptions,
        origin: 'left',
        interval: 200
    });
    
    sr.reveal('.contact__info', {
        ...revealOptions,
        origin: 'left'
    });
    
    sr.reveal('.contact__form', {
        ...revealOptions,
        origin: 'right'
    });
} else {
    // Fallback animation for elements
    const observeElements = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const elementObserver = new IntersectionObserver(observeElements, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    document.querySelectorAll('.service__card, .pricing__card, .case__study, .skill__item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        elementObserver.observe(el);
    });
}

/*=============== FORM HANDLING ===============*/
const contactForm = document.querySelector('.contact__form');
const formInputs = document.querySelectorAll('.form__input, .form__textarea, .form__select');
const submitButton = document.querySelector('.form__submit');

// Form validation
const validateForm = () => {
    let isValid = true;
    
    formInputs.forEach(input => {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        
        // Remove previous error styling
        input.classList.remove('form__input--error');
        
        if (isRequired && !value) {
            input.classList.add('form__input--error');
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('form__input--error');
                isValid = false;
            }
        }
    });
    
    return isValid;
};

// Add error styles to CSS if not present
if (!document.querySelector('style[data-form-validation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-form-validation', 'true');
    style.textContent = `
        .form__input--error,
        .form__textarea--error,
        .form__select--error {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
        }
        
        .form__submit--loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .form__submit--loading::after {
            content: '';
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            display: inline-block;
            animation: spin 1s linear infinite;
            margin-left: 0.5rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification--success {
            background-color: #27ae60;
        }
        
        .notification--error {
            background-color: #e74c3c;
        }
        
        .notification--show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}

// Show notification
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('notification--show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('notification--show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 4000);
};

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        submitButton.classList.add('form__submit--loading');
        submitButton.textContent = 'Sending...';
        
        try {
            const formData = new FormData(this);
            
            // Submit to Netlify
            const response = await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });
            
            if (response.ok) {
                showNotification('Thank you for your inquiry! I will get back to you within 24 hours.', 'success');
                this.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Oops! There was a problem submitting your form. Please try again or email me directly.', 'error');
        } finally {
            // Reset button state
            submitButton.classList.remove('form__submit--loading');
            submitButton.innerHTML = 'Send Inquiry <i class="button__icon">→</i>';
        }
    });
}

/*=============== TYPING ANIMATION ===============*/
const typingElement = document.querySelector('.hero__title-accent');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

/*=============== PARALLAX EFFECT ===============*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero__shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/*=============== LAZY LOADING IMAGES ===============*/
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    blurHeader();
    scrollUp();
    scrollActive();
}, 16)); // ~60fps

/*=============== ACCESSIBILITY IMPROVEMENTS ===============*/
// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    }
});

// Focus management for mobile menu
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const trapFocus = (element) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
};

/*=============== PRELOADER ===============*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

/*=============== ERROR HANDLING ===============*/
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Optionally show user-friendly error message
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

/*=============== ANALYTICS TRACKING ===============*/
// Track button clicks and form submissions
document.addEventListener('click', (e) => {
    if (e.target.matches('.button, .nav__link, .footer__link')) {
        // Add analytics tracking here
        console.log('Button clicked:', e.target.textContent.trim());
    }
});

console.log('Lan Le Portfolio - Updated JavaScript loaded successfully! 🚀');