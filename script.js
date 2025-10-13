// Update Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple Form Submission Handler (using FormSubmit)
const form = document.getElementById('booking-form');
const formStatus = document.getElementById('form-status');

async function handleSubmit(event) {
    event.preventDefault();
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    // Change button text to show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerHTML = '<p style="color: green; padding: 1rem; background: #f0f9f5; border-radius: 5px; border: 1px solid #26a17b;">Thanks for your booking request! I will verify your USDT payment and get back to you soon.</p>';
            form.reset();
            
            // Reset payment selection
            const paymentRadios = document.querySelectorAll('input[name="payment_status"]');
            paymentRadios.forEach(radio => radio.checked = false);
            
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formStatus.innerHTML = '<p style="color: red; padding: 1rem; background: #fef0f0; border-radius: 5px; border: 1px solid #e74c3c;">Oops! There was a problem sending your message. Please try again or email me directly at predominatrix2@gmail.com</p>';
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Add form submission event listener if form exists
if (form) {
    form.addEventListener("submit", handleSubmit);
}

// Copy USDT Address Function
function copyUSDTAddress() {
    const usdtAddress = document.getElementById('usdtAddress');
    
    // Select the text
    usdtAddress.select();
    usdtAddress.setSelectionRange(0, 99999);
    
    // Copy to clipboard
    navigator.clipboard.writeText(usdtAddress.value).then(function() {
        // Show success message
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#1e8567';
        button.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.classList.remove('copied');
        }, 2000);
        
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy address. Please select and copy manually.');
    });
}

// Payment validation
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const paymentMethod = document.querySelector('input[name="payment_status"]:checked');
            if (!paymentMethod) {
                e.preventDefault();
                alert('Please confirm you have sent the full USDT payment to book your session.');
                return;
            }
            
            // Additional service validation
            const service = document.getElementById('service');
            if (service && !service.value) {
                e.preventDefault();
                alert('Please select a service.');
                return;
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Auto-focus on first form field when reaching booking section
document.addEventListener('DOMContentLoaded', function() {
    const bookingSection = document.getElementById('booking');
    const firstFormField = document.getElementById('name');
    
    if (bookingSection && firstFormField) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Booking section is in view
                    console.log('Booking section in view');
                }
            });
        });
        
        observer.observe(bookingSection);
    }
});

// Form field validation styling
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('.booking-form input, .booking-form select, .booking-form textarea');
    
    formFields.forEach(field => {
        // Add focus styling
        field.addEventListener('focus', function() {
            this.style.borderColor = '#d4af37';
            this.style.boxShadow = '0 0 5px rgba(212, 175, 55, 0.3)';
        });
        
        // Remove focus styling
        field.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
        
        // Real-time validation styling
        field.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#26a17b';
            } else {
                this.style.borderColor = '#e74c3c';
            }
        });
    });
});

// Service price calculator (optional feature)
function calculateServicePrice() {
    const serviceSelect = document.getElementById('service');
    const priceDisplay = document.createElement('div');
    priceDisplay.id = 'price-display';
    priceDisplay.style.marginTop = '10px';
    priceDisplay.style.padding = '10px';
    priceDisplay.style.background = '#f0f9f5';
    priceDisplay.style.borderRadius = '5px';
    priceDisplay.style.border = '1px solid #26a17b';
    priceDisplay.style.display = 'none';
    
    if (serviceSelect) {
        serviceSelect.parentNode.appendChild(priceDisplay);
        
        serviceSelect.addEventListener('change', function() {
            const prices = {
                'coffee': '70 USDT / hour',
                'meet': '150 USDT / event',
                'collab': '150 USDT / 2 hours',
                'flyme': '2000 USDT / experience'
            };
            
            const selectedPrice = prices[this.value];
            if (selectedPrice) {
                priceDisplay.textContent = `Service Fee: ${selectedPrice}`;
                priceDisplay.style.display = 'block';
            } else {
                priceDisplay.style.display = 'none';
            }
        });
    }
}

// Initialize price calculator when page loads
document.addEventListener('DOMContentLoaded', function() {
    calculateServicePrice();
});

// Mobile menu functionality (if you add a mobile menu later)
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768 && navMenu) {
        // You can add mobile menu toggle functionality here later
        console.log('Mobile menu ready for enhancement');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});

// Window resize handler
window.addEventListener('resize', initMobileMenu);