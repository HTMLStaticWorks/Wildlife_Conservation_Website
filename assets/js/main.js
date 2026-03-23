/**
 * Wildlife Conservation Non-Profit - Main Interactive Logic
 * Handles Navbar, Theme Toggle, Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initThemeToggle();
    initScrollReveal();
    initForms();
    initHero3D();
    initRTL();
});

/**
 * RTL Toggle Functionality
 */
function initRTL() {
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const root = document.documentElement;

    // Check saved RTL state
    const isRTL = localStorage.getItem('wildlife-rtl') === 'true';
    if (isRTL) {
        root.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentRTL = root.getAttribute('dir') === 'rtl';
            const newRTL = !currentRTL;
            
            if (newRTL) {
                root.setAttribute('dir', 'rtl');
                localStorage.setItem('wildlife-rtl', 'true');
            } else {
                root.removeAttribute('dir');
                localStorage.setItem('wildlife-rtl', 'false');
            }
        });
    });
}

/**
 * 3D Text Effect for Hero Sections
 */
function initHero3D() {
    const heroElements = document.querySelectorAll('.hero-content h1, .hero-content p');
    
    heroElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = ''; // Clear original text
        
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'hero-3d-word animated';
            
            // Inner span for 3D depth effect
            const innerSpan = document.createElement('span');
            innerSpan.textContent = word;
            
            // Add a non-breaking space after the word (except the last one)
            const space = (index < words.length - 1) ? ' ' : '';
            
            wordSpan.style.setProperty('--delay', `${index * 0.1}s`);
            wordSpan.appendChild(innerSpan);
            
            element.appendChild(wordSpan);
            
            if (space) {
                element.appendChild(document.createTextNode(' '));
            }
        });
    });

    // Optional: Mouse Tilt interaction for hero section
    const heroSections = document.querySelectorAll('.hero-section');
    heroSections.forEach(hero => {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = hero.getBoundingClientRect();
            
            // Calculate relative position (-1 to 1)
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            
            // Apply slight tilt to hero content
            const content = hero.querySelector('.hero-content');
            if (content) {
                content.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
            }
        });

        hero.addEventListener('mouseleave', () => {
            const content = hero.querySelector('.hero-content');
            if (content) {
                content.style.transform = `rotateY(0) rotateX(0)`;
            }
        });
    });
}

/**
 * Navbar Toggle & Hamburger behavior
 */
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    if (navbar) {
        // Sticky Navbar on Scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
                navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.padding = '20px 0';
                navbar.style.boxShadow = 'var(--shadow-soft)';
            }
        });
    }

    // Handle Mobile Responsive Placements (Login Button & Theme Toggle)
    const handleMobileElements = () => {
        const loginBtn = document.querySelector('.login-btn');
        const rtlToggle = document.querySelector('.rtl-toggle-main'); // Separating main from mobile
        if (!themeToggle || !navLinks) return;

        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Move into hamburger menu
            if (loginBtn && !navLinks.contains(loginBtn)) {
                navLinks.appendChild(loginBtn);
            }
            if (!navLinks.contains(themeToggle)) {
                navLinks.appendChild(themeToggle);
            }
            if (rtlToggle && !navLinks.contains(rtlToggle)) {
                navLinks.appendChild(rtlToggle);
            }
        } else {
            // Move back to header
            const navRight = document.querySelector('.nav-actions');
            if (navRight) {
                const hamburgerChild = navRight.querySelector('.hamburger');
                
                // Keep Login Button BEFORE Theme Toggle
                if (loginBtn && !navRight.contains(loginBtn)) {
                    navRight.insertBefore(loginBtn, hamburgerChild || themeToggle);
                }
                if (!navRight.contains(themeToggle)) {
                    if (hamburgerChild) {
                        navRight.insertBefore(themeToggle, hamburgerChild);
                    } else {
                        navRight.appendChild(themeToggle);
                    }
                }
                if (rtlToggle && !navRight.contains(rtlToggle)) {
                    if (hamburgerChild) {
                        navRight.insertBefore(rtlToggle, hamburgerChild);
                    } else {
                        navRight.appendChild(rtlToggle);
                    }
                }
            }
        }
    };

    window.addEventListener('resize', handleMobileElements);
    handleMobileElements();
}

/**
 * Theme Toggle Functionality
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    
    // ALWAYS establish theme from local storage, even if toggle button isn't on the page
    const savedTheme = localStorage.getItem('wildlife-theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    // Only attach click listener if the button exists
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('wildlife-theme', newTheme);
            updateToggleIcon(newTheme);
        });
    }
}

function updateToggleIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
}

/**
 * Form Validation
 */
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}
