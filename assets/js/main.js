/**
 * Archivo JavaScript principal para el sitio web profesional de Closer de Ventas
 * Maneja navegación, integración con Calendly, e interacciones enfocadas en ventas
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Inicializa la aplicación
 */
function initializeApp() {
    setupMobileNavigation();
    setupSmoothScrolling();
    setupScrollEffects();
    setupCalendlyIntegration();
    setupSalesTracking();
    setupIntersectionObserver();
    initializeCaseStudies();
    initializeParallaxWave();
    initializeRoleAnimation();
}

/**
 * Setup Calendly Integration
 */
function setupCalendlyIntegration() {
    // Load Calendly widget script
    loadCalendlyScript();
    
    // Setup Calendly button click handlers
    const calendlyButtons = document.querySelectorAll('.calendly-btn');
    
    calendlyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Track button click
            trackCalendlyClick(this);
            
            // Get Calendly URL (you'll need to replace with your actual Calendly link)
            const calendlyUrl = this.getAttribute('data-calendly-url') || 'https://calendly.com/your-link';
            
            // Open Calendly popup
            if (window.Calendly) {
                window.Calendly.initPopupWidget({
                    url: calendlyUrl,
                    parentElement: document.body,
                    prefill: {
                        name: '',
                        email: '',
                        customAnswers: {
                            a1: 'Llamada de Estrategia de Ventas'
                        }
                    },
                    utm: {
                        utmCampaign: 'sitio-web-ventas',
                        utmSource: 'direct',
                        utmMedium: 'website'
                    }
                });
            } else {
                // Fallback: open in new tab
                window.open(calendlyUrl, '_blank');
            }
        });
    });
}

/**
 * Load Calendly script dynamically
 */
function loadCalendlyScript() {
    if (!document.querySelector('script[src*="calendly"]')) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);
        
        // Load Calendly CSS
        const link = document.createElement('link');
        link.href = 'https://assets.calendly.com/assets/external/widget.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
}

/**
 * Track Calendly button clicks for analytics
 * @param {HTMLElement} button - The clicked button
 */
function trackCalendlyClick(button) {
    const buttonLocation = button.closest('section')?.id || 'unknown';
    const buttonText = button.textContent.trim();
    
    // Console log for demo (replace with actual analytics)
    console.log('Calendly CTA clicked:', {
        location: buttonLocation,
        text: buttonText,
        timestamp: new Date().toISOString()
    });
    
    // Example: Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calendly_click', {
            event_category: 'conversion',
            event_label: buttonLocation,
            value: 1
        });
    }
    
    // Example: Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Programar', {
            content_name: 'Llamada de Estrategia',
            content_category: 'ventas'
        });
    }
}

/**
 * Configura seguimiento y análisis enfocados en ventas
 */
function setupSalesTracking() {
    // Track scroll depth for engagement
    let maxScroll = 0;
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            console.log(`Scroll depth: ${scrollPercent}%`);
            
            // Track engagement milestones
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll_depth', {
                    event_category: 'engagement',
                    event_label: `${scrollPercent}%`,
                    value: scrollPercent
                });
            }
        }
    });
    
    // Track time on page
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        console.log(`Time on page: ${timeOnPage} seconds`);
    });
    
    // Track case study interactions
    document.addEventListener('click', function(event) {
        if (event.target.closest('.view-btn')) {
            const caseStudyId = event.target.closest('.view-btn').getAttribute('data-id');
            console.log(`Case study viewed: ${caseStudyId}`);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'case_study_view', {
                    event_category: 'engagement',
                    event_label: `case_${caseStudyId}`,
                    value: 1
                });
            }
        }
    });
}

/**
 * Mobile Navigation Toggle
 */
function setupMobileNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !navMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Smooth Scrolling for Navigation Links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
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
}

/**
 * Header Scroll Effects
 */
function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to header when scrolling
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Update Active Navigation Link Based on Scroll Position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Form Validation and Handling
 */
function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                handleFormSubmission(formObject);
            }
        });
    }
}

/**
 * Validate Contact Form
 * @param {Object} formData - Form data object
 * @returns {boolean} - Validation result
 */
function validateForm(formData) {
    const { name, email, message } = formData;
    let isValid = true;
    
    // Clear previous error messages
    clearFormErrors();
    
    // Validate name
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Show field error message
 * @param {string} fieldName - Field name
 * @param {string} message - Error message
 */
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Create error element if it doesn't exist
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.style.borderColor = '#dc3545';
}

/**
 * Clear all form error messages
 */
function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    errorMessages.forEach(error => error.remove());
    formFields.forEach(field => {
        field.style.borderColor = '#e9ecef';
    });
}

/**
 * Handle form submission
 * @param {Object} formData - Form data object
 */
function handleFormSubmission(formData) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/**
 * Populate Skills Section
 */
function populateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    
    if (skillsGrid) {
        const skills = [
            'HTML5',
            'CSS3',
            'JavaScript',
            'React',
            'Node.js',
            'Python',
            'Git',
            'Figma'
        ];
        
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.textContent = skill;
            skillsGrid.appendChild(skillElement);
        });
    }
}

/**
 * Intersection Observer for Animations
 */
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .about-content, .portfolio-item, .contact-content'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// CSS for animations (added dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Parallax Wave Background Effect
function initializeParallaxWave() {
    const hero = document.querySelector('.hero::before') || document.querySelector('.hero');
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrolled / documentHeight;
        
        // Move background from left (0%) to right (100% of the extra width)
        // Since we made the background 200vw, we can move it 100vw to the left
        const translateX = -scrollProgress * 100; // Move from 0 to -100vw
        
        // Apply the transform to the hero::before pseudo-element via CSS custom property
        document.documentElement.style.setProperty('--parallax-x', `${translateX}vw`);
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial call
    updateParallax();
}

// Animated Roles Text Animation
function initializeRoleAnimation() {
    const roles = [
        'Closer de ventas',
        'Profesor de español',
        'Surfista',
        'Tripulante de cabina',
        'Humano'
    ];
    
    const rolesContainer = document.getElementById('roles-container');
    if (!rolesContainer) return;
    
    let currentRoleIndex = 0;
    let animationTimeout;
    
    function createRoleElement(text) {
        const roleElement = document.createElement('div');
        roleElement.className = 'role-text';
        roleElement.textContent = text;
        return roleElement;
    }
    
    function animateNextRole() {
        if (currentRoleIndex >= roles.length) {
            // Animation complete, all roles displayed
            return;
        }
        
        const roleElement = createRoleElement(roles[currentRoleIndex]);
        rolesContainer.appendChild(roleElement);
        
        // Determine animation type
        const isLastRole = currentRoleIndex === roles.length - 1;
        const animationClass = isLastRole ? 'roll-in' : 'slide-in';
        
        // Trigger animation
        setTimeout(() => {
            roleElement.classList.add(animationClass);
        }, 100);
        
        currentRoleIndex++;
        
        // Schedule next role
        const delay = isLastRole ? 1000 : 800;
        animationTimeout = setTimeout(animateNextRole, delay);
    }
    
    function startAnimation() {
        clearTimeout(animationTimeout);
        animateNextRole();
    }
    
    // Start the animation sequence
    startAnimation();
}

// Inicializar parallax cuando el DOM se carga
document.addEventListener('DOMContentLoaded', function() {
    initializeParallaxWave();
    initializeRoleAnimation();
});
