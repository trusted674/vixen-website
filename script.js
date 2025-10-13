// Update Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple Form Submission Handler (using Formspree)
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
            formStatus.innerHTML = '<p style="color: green;">Thanks for your booking request! I will get back to you soon.</p>';
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formStatus.innerHTML = '<p style="color: red;">Oops! There was a problem sending your message. Please try again or email me directly.</p>';
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

form.addEventListener("submit", handleSubmit);

// Smooth Scrolling for Navigation Links
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
