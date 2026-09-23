// Initialize EmailJS
// Replace "YOUR_PUBLIC_KEY" with your actual Public Key from EmailJS dashboard
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Drawer Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('hidden');
        });

        // Close drawer when clicking any link inside it
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.add('hidden');
            });
        });
    }

    // 2. Dynamic Year in Footer
    const yearSpan = document.getElementById('yearSpan');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. EmailJS Form Handling
    const inquiryForm = document.getElementById('inquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    const formNotification = document.getElementById('formNotification');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disable button and show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }

            // Replace EmailJS credentials
            emailjs.sendForm('service_e0g2xi8', 'template_9l5unfo', this)
                .then(() => {
                    // Success
                    if (formNotification) {
                        formNotification.classList.remove('hidden');
                    }
                    inquiryForm.reset();
                })
                .catch((error) => {
                    // Error
                    alert("Failed to send inquiry. Please call us directly at +234 703 502 0023.");
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    // Re-enable button
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Inquiry';
                    }
                });
        });
    }
});

// 4. Category Filtering Functionality
function filterCategory(categoryName) {
    const filterButtons = document.querySelectorAll('.filter-tab');
    
    // Update active tab styles
    filterButtons.forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === categoryName.toLowerCase() || 
           (categoryName === 'All' && btn.textContent.trim() === 'All')) {
            btn.className = "filter-tab active px-4 py-2 rounded-lg text-xs font-bold bg-gold text-navy-dark transition";
        } else {
            btn.className = "filter-tab px-4 py-2 rounded-lg text-xs font-bold text-slate-300 bg-navy-card hover:text-gold transition border border-slate-800";
        }
    });

    // Smooth scroll down to the listings section if coming from top category cards
    const listingsSection = document.getElementById('listings');
    if (listingsSection && window.scrollY < listingsSection.offsetTop - 200) {
        listingsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
