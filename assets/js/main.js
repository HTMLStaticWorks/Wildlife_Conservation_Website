/**
 * Wildlife Conservation Non-Profit - Main Interactive Logic
 * Handles Navbar, Theme Toggle, Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initThemeToggle();
    initScrollReveal();
    initForms();
});

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
