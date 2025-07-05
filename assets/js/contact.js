/**
 * Contact Form JavaScript Module
 * Handles advanced contact form functionality and integrations
 */

/**
 * Contact form configuration
 */
const contactConfig = {
    emailService: 'demo', // Change to your preferred email service
    validationRules: {
        name: {
            minLength: 2,
            maxLength: 50,
            required: true
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            required: true
        },
        message: {
            minLength: 10,
            maxLength: 1000,
            required: true
        }
    },
    messages: {
        success: "Thank you for your message! I'll get back to you within 24 hours.",
        error: "Sorry, there was an error sending your message. Please try again.",
        validation: {
            name: "Please enter a valid name (2-50 characters)",
            email: "Please enter a valid email address",
            message: "Please enter a message (10-1000 characters)"
        }
    }
};

/**
 * Initialize Contact Module
 */
function initializeContact() {
    setupFormEnhancements();
    setupEmailValidation();
    setupCharacterCounter();
    setupFormAnalytics();
}

/**
 * Setup form enhancements
 */
function setupFormEnhancements() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Add form enhancements
    addFormLabels();
    addLoadingSpinner();
    setupFormPersistence();
    setupKeyboardNavigation();
}

/**
 * Add floating labels to form inputs
 */
function addFormLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const placeholder = input.getAttribute('placeholder');
        
        if (placeholder && !group.querySelector('label')) {
            // Create label
            const label = document.createElement('label');
            label.setAttribute('for', input.id);
            label.textContent = placeholder;
            label.className = 'form-label';
            
            // Style the label
            label.style.cssText = `
                position: absolute;
                top: 15px;
                left: 15px;
                background-color: white;
                padding: 0 5px;
                color: #666;
                font-size: 14px;
                transition: all 0.3s ease;
                pointer-events: none;
                z-index: 1;
            `;
            
            // Position the group relatively
            group.style.position = 'relative';
            
            // Insert label
            group.insertBefore(label, input);
            
            // Handle focus and blur events
            input.addEventListener('focus', () => {
                label.style.top = '-8px';
                label.style.fontSize = '12px';
                label.style.color = 'var(--primary-color)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.top = '15px';
                    label.style.fontSize = '14px';
                    label.style.color = '#666';
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                label.style.top = '-8px';
                label.style.fontSize = '12px';
                label.style.color = 'var(--primary-color)';
            }
        }
    });
}

/**
 * Add loading spinner
 */
function addLoadingSpinner() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Create spinner element
    const spinner = document.createElement('div');
    spinner.className = 'form-spinner';
    spinner.style.cssText = `
        display: none;
        width: 20px;
        height: 20px;
        border: 2px solid #ffffff;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 10px;
    `;
    
    submitButton.appendChild(spinner);
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .form-loading .form-spinner {
            display: inline-block;
        }
        
        .form-loading button[type="submit"] {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Setup real-time email validation
 */
function setupEmailValidation() {
    const emailInput = document.getElementById('email');
    if (!emailInput) return;
    
    let validationTimeout;
    
    emailInput.addEventListener('input', function() {
        clearTimeout(validationTimeout);
        
        validationTimeout = setTimeout(() => {
            validateEmailReal(this.value);
        }, 500);
    });
}

/**
 * Validate email in real-time
 * @param {string} email - Email to validate
 */
function validateEmailReal(email) {
    const emailInput = document.getElementById('email');
    const validationIcon = emailInput.parentNode.querySelector('.validation-icon') || 
                          createValidationIcon(emailInput.parentNode);
    
    if (!email) {
        validationIcon.style.display = 'none';
        return;
    }
    
    const isValid = contactConfig.validationRules.email.pattern.test(email);
    
    validationIcon.style.display = 'block';
    
    if (isValid) {
        validationIcon.innerHTML = '<i class="fas fa-check" style="color: #28a745;"></i>';
        emailInput.style.borderColor = '#28a745';
    } else {
        validationIcon.innerHTML = '<i class="fas fa-times" style="color: #dc3545;"></i>';
        emailInput.style.borderColor = '#dc3545';
    }
}

/**
 * Create validation icon
 * @param {HTMLElement} parent - Parent element
 * @returns {HTMLElement} - Validation icon element
 */
function createValidationIcon(parent) {
    const icon = document.createElement('div');
    icon.className = 'validation-icon';
    icon.style.cssText = `
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        display: none;
    `;
    parent.style.position = 'relative';
    parent.appendChild(icon);
    return icon;
}

/**
 * Setup character counter for message field
 */
function setupCharacterCounter() {
    const messageField = document.getElementById('message');
    if (!messageField) return;
    
    const maxLength = contactConfig.validationRules.message.maxLength;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 12px;
        color: #666;
        margin-top: 5px;
    `;
    
    messageField.parentNode.appendChild(counter);
    
    // Update counter on input
    messageField.addEventListener('input', function() {
        const currentLength = this.value.length;
        counter.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength * 0.9) {
            counter.style.color = '#dc3545';
        } else if (currentLength > maxLength * 0.7) {
            counter.style.color = '#ffc107';
        } else {
            counter.style.color = '#666';
        }
    });
    
    // Initialize counter
    const event = new Event('input');
    messageField.dispatchEvent(event);
}

/**
 * Setup form data persistence
 */
function setupFormPersistence() {
    const form = document.getElementById('contact-form');
    const formFields = form.querySelectorAll('input, textarea');
    
    // Load saved data
    formFields.forEach(field => {
        const savedValue = localStorage.getItem(`contact_form_${field.name}`);
        if (savedValue && field.type !== 'submit') {
            field.value = savedValue;
            
            // Trigger label animation if exists
            const label = field.parentNode.querySelector('.form-label');
            if (label && savedValue) {
                label.style.top = '-8px';
                label.style.fontSize = '12px';
                label.style.color = 'var(--primary-color)';
            }
        }
    });
    
    // Save data on input
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.type !== 'submit') {
                localStorage.setItem(`contact_form_${this.name}`, this.value);
            }
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        setTimeout(() => {
            formFields.forEach(field => {
                localStorage.removeItem(`contact_form_${field.name}`);
            });
        }, 1000);
    });
}

/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
    const form = document.getElementById('contact-form');
    const formFields = form.querySelectorAll('input, textarea, button');
    
    formFields.forEach((field, index) => {
        field.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                // Custom tab behavior can be added here if needed
            }
            
            if (event.key === 'Enter' && field.tagName !== 'TEXTAREA') {
                event.preventDefault();
                const nextField = formFields[index + 1];
                if (nextField) {
                    nextField.focus();
                } else {
                    form.querySelector('button[type="submit"]').click();
                }
            }
        });
    });
}

/**
 * Setup form analytics (basic tracking)
 */
function setupFormAnalytics() {
    const form = document.getElementById('contact-form');
    const formFields = form.querySelectorAll('input, textarea');
    
    const analytics = {
        formStarted: false,
        fieldInteractions: {},
        startTime: null,
        errors: []
    };
    
    // Track form start
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            if (!analytics.formStarted) {
                analytics.formStarted = true;
                analytics.startTime = Date.now();
                console.log('Form interaction started');
            }
            
            if (!analytics.fieldInteractions[this.name]) {
                analytics.fieldInteractions[this.name] = {
                    focused: 0,
                    timeSpent: 0,
                    focusStart: Date.now()
                };
            }
            
            analytics.fieldInteractions[this.name].focused++;
            analytics.fieldInteractions[this.name].focusStart = Date.now();
        });
        
        field.addEventListener('blur', function() {
            if (analytics.fieldInteractions[this.name]) {
                const timeSpent = Date.now() - analytics.fieldInteractions[this.name].focusStart;
                analytics.fieldInteractions[this.name].timeSpent += timeSpent;
            }
        });
    });
    
    // Track form submission
    form.addEventListener('submit', function() {
        const totalTime = Date.now() - analytics.startTime;
        console.log('Form Analytics:', {
            ...analytics,
            totalTime: totalTime,
            completionRate: Object.keys(analytics.fieldInteractions).length / formFields.length
        });
    });
}

/**
 * Enhanced form submission with better error handling
 * @param {Object} formData - Form data
 * @returns {Promise} - Submission promise
 */
async function submitContactForm(formData) {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
        // Add loading state
        form.classList.add('form-loading');
        submitButton.disabled = true;
        
        // Simulate API call (replace with actual implementation)
        await simulateFormSubmission(formData);
        
        // Success handling
        showFormSuccess();
        form.reset();
        clearFormPersistence();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormError(error.message);
    } finally {
        // Remove loading state
        form.classList.remove('form-loading');
        submitButton.disabled = false;
    }
}

/**
 * Simulate form submission (replace with actual service)
 * @param {Object} formData - Form data
 * @returns {Promise} - Submission promise
 */
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure for demo
            if (Math.random() > 0.1) { // 90% success rate
                resolve({ success: true, id: Date.now() });
            } else {
                reject(new Error('Network error occurred'));
            }
        }, 2000);
    });
}

/**
 * Show form success message
 */
function showFormSuccess() {
    showFormMessage(contactConfig.messages.success, 'success');
}

/**
 * Show form error message
 * @param {string} errorMessage - Error message
 */
function showFormError(errorMessage) {
    const message = errorMessage || contactConfig.messages.error;
    showFormMessage(message, 'error');
}

/**
 * Show form message
 * @param {string} message - Message text
 * @param {string} type - Message type
 */
function showFormMessage(message, type) {
    const form = document.getElementById('contact-form');
    
    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.style.cssText = `
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-weight: 500;
        background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;
    messageElement.textContent = message;
    
    // Insert at top of form
    form.insertBefore(messageElement, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

/**
 * Clear form persistence data
 */
function clearFormPersistence() {
    const form = document.getElementById('contact-form');
    const formFields = form.querySelectorAll('input, textarea');
    
    formFields.forEach(field => {
        localStorage.removeItem(`contact_form_${field.name}`);
    });
}

// Initialize contact module when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeContact();
});
