// EmailJS Initialization
(function(){
    emailjs.init({
        publicKey: "Iv_wgKOfEI_xvLJJM",
    });
})();

// Mobile Menu Toggle (Fixed element IDs)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');

if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
    });
}

// Form Submit Handler
const inquiryForm = document.getElementById('inquiryForm');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const notification = document.getElementById('formNotification');

        // Change button state to loading
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        }

        // Send email via EmailJS
        emailjs.sendForm('service_e0g2xi8', 'template_bwa6pwc', this)
            .then(function() {
                // Show success notification message
                if (notification) {
                    notification.classList.remove('hidden');
                }
                inquiryForm.reset();
                
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Inquiry';
                }
            }, function(error) {
                alert('Failed to send inquiry. Please try again or call us directly.');
                console.error('EmailJS Error:', error);
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Inquiry';
                }
            });
    });
}

// Automatically update footer year
const yearSpan = document.getElementById('yearSpan');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
